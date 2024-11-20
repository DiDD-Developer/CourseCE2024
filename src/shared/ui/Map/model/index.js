import { Swiper } from "swiper";
import { Pagination } from "swiper/modules";
import {
  iconsPresets,
  classNames as defaultClassNames,
  yandexMapCustomEventNames,
  iconShapeCfg as defaultIconShapeCfg,
} from "../config/constants.js";
import { checkMapInstance } from "../config/lib/checkMapInstance.js";
import { getExternalScript } from "#shared/lib/utils/getExtetnalScript";
import { DeleteIcon } from "#shared/ui/Icons/index";
import { EditBallonIcon } from "#shared/ui/Icons/ui/EditBallonIcon.js";
// import { Spinner } from "#shared/ui/Spinner/index.js";

export class YandexMap {
  constructor({
    containerSelector,
    apiKey,
    center = [55.751574, 37.573856],
    zoom = 10,
    lang = "ru_RU",
    apiUrl = "https://api-maps.yandex.ru/2.1/?apikey",
    classNames,
    iconShapeCfg,
  }) {
    this.containerSelector = containerSelector;
    this.apiKey = apiKey;
    this.center = center;
    this.zoom = zoom;
    this.lang = lang;
    this.apiUrl = apiUrl;
    this.instance = null;
    this.iconsPresets = iconsPresets;
    this.currentBalloon = null;
    this.currentMarkerIdOpen = null;
    this.classNames = classNames ?? defaultClassNames;
    this.iconShapeCfg = iconShapeCfg ?? defaultIconShapeCfg;
    this.attrs = {
      ballon: "data-js-ballon",
    };
  }

  getBallonLayout() {
    if (window.ymaps) {
      const ballonLayout = window.ymaps.templateLayoutFactory.createClass(
        `<div class="${this.classNames.ballonLayout}">$[[options.contentLayout observeSize]]</div>`,
        {
          build: function () {
            ballonLayout.superclass.build.call(this);
          },
          clear: function () {
            ballonLayout.superclass.clear.call(this);
          },
        }
      );
      return ballonLayout;
    }
    throw new Error("ymaps not ready");
  }

  getBallonContent({ id, children }) {
    if (window.ymaps) {
      const ballonContent = window.ymaps.templateLayoutFactory.createClass(
        `<div class="${this.classNames.ballonContent}" data-js-ballon="${id}"> 
                ${children}
            </div>`,
        {
          build: function () {
            ballonContent.superclass.build.call(this);

            // Инициализация Swiper после создания балуна
            try {
              const ballonContainer = document.querySelector(
                `[data-js-ballon="${id}"]`
              );

              if (!ballonContainer) {
                throw new Error(`Ballon container with id "${id}" not found.`);
              }

              const swiperEl = ballonContainer.querySelector(".swiper");
              if (!swiperEl) {
                console.warn(
                  "Swiper element not found in the ballon container."
                );
                return;
              }

              new Swiper(swiperEl, {
                direction: "horizontal", // Горизонтальный свайп
                modules: [Pagination],
                loop: true,
                pagination: {
                  el: ballonContainer.querySelector(".swiper-pagination"),
                  clickable: true,
                },
                navigation: {
                  nextEl: ballonContainer.querySelector(".swiper-button-next"),
                  prevEl: ballonContainer.querySelector(".swiper-button-prev"),
                },
                scrollbar: {
                  el: ballonContainer.querySelector(".swiper-scrollbar"),
                  draggable: true,
                },
              });

              console.warn(`Swiper initialized for ballon with id "${id}"`);
            } catch (e) {
              console.error("Error initializing Swiper inside balloon:", e);
            }
          },
          clear: function () {
            ballonContent.superclass.clear.call(this);
          },
        }
      );
      return ballonContent;
    }
    throw new Error("ymaps not ready");
  }

  createSwiper(ballonId) {
    try {
      const ballonContainer = document.querySelector(
        `[data-js-ballon="${ballonId}"]`
      );

      if (!ballonContainer) {
        throw new Error(`Ballon container with id "${ballonId}" not found.`);
      }

      const swiperEl = ballonContainer.querySelector(".swiper");
      if (!swiperEl) {
        throw new Error("Swiper element not found in the ballon container.");
      }

      new Swiper(swiperEl, {
        direction: "horizontal", // для горизонтального свайпа
        loop: true,

        pagination: {
          el: ballonContainer.querySelector(".swiper-pagination"),
          clickable: true,
        },

        navigation: {
          nextEl: ballonContainer.querySelector(".swiper-button-next"),
          prevEl: ballonContainer.querySelector(".swiper-button-prev"),
        },
        scrollbar: {
          el: ballonContainer.querySelector(".swiper-scrollbar"),
          draggable: true,
        },
      });

      console.warn(`Swiper initialized for ballon with id "${ballonId}"`);
    } catch (e) {
      console.error("Error initializing Swiper:", e);
    }
  }

  getMarkerLayout(typeMarker) {
    if (window.ymaps) {
      const customLayout = window.ymaps.templateLayoutFactory.createClass(
        `<div class="${this.classNames.mark}">
         ${this.iconsPresets[typeMarker] ? this.iconsPresets[typeMarker] : typeMarker}
       </div>`
      );

      return customLayout;
    }
    throw new Error("ymaps not ready");
  }

  #createMap() {
    this.instance = new window.ymaps.Map(
      document.querySelector(this.containerSelector),
      {
        center: this.center,
        zoom: this.zoom,
        type: "yandex#map",
        controls: [],
      },
      {
        suppressMapOpenBlock: true, // Скрыть кнопку открытия карты на Яндексе
      }
    );
    this.#bindEvents();
    return this.instance;
  }

  async initMap() {
    try {
      if (window.ymaps) {
        return this.#createMap();
      }
      //Ждём когда подгрузится внешний скрипт для Yandex API
      await getExternalScript(
        `${this.apiUrl}=${this.apiKey}&lang=${this.lang}`
      );
      //Ждём когда будет готова карта (ожидаем ymaps -> карту)
      await new Promise((resolve, reject) => {
        window.ymaps.ready(() => {
          try {
            resolve(this.#createMap());
          } catch (e) {
            reject(e);
          }
        });
      });
      // Возвращаем карту, если успешно инициализирована
      return this.instance;
    } catch (error) {
      console.error("Ошибка при загрузке API Яндекс.Карт:", error);
    }
  }

  isExistMapInstance() {
    if (!this.instance) {
      console.warn("Карта не инициализирована");
      return false;
    }
    return true;
  }

  @checkMapInstance
  addMark({ id, cords, type: typeMarker, onClick } = {}) {
    const placemark = new window.ymaps.Placemark(
      cords,
      { id },
      {
        balloonLayout: this.getBallonLayout(),
        balloonContentLayout: this.getBallonContent({
          id,
          children: `<h1>Загрузка...</h1>`, //Spinner(),
        }),
        hasBalloon: true,
        iconLayout: this.getMarkerLayout(typeMarker),
        iconShape: this.iconShapeCfg,
      }
    );

    placemark.events.add("click", (event) => {
      if (onClick && typeof onClick === "function") onClick(id, event);
    });

    placemark.events.add("balloonopen", () => {
      // Если на карте уже открыт балун, закрываем его
      if (this.currentBalloon) {
        this.currentBalloon.balloon.close();
      }
      // Обновляем ссылку на текущий открытый балун
      this.currentBalloon = placemark;
      this.currentMarkerIdOpen = id;
    });

    placemark.events.add("balloonclose", () => {
      this.currentBalloon = null;
      this.currentMarkerIdOpen = null;
    });

    this.instance.geoObjects.add(placemark);
  }

  handleMarkerClick(id, e) {
    const targetPlacemark = e.get("target");

    if (this.currentBalloon && this.currentMarkerIdOpen === id) return;

    const customEvent = new CustomEvent(yandexMapCustomEventNames.markClicked, {
      detail: {
        id,
        mark: targetPlacemark,
      },
    });

    document.dispatchEvent(customEvent);
  }

  renderCustomBallon(id, mark, info) {
    mark.options.set(
      "balloonContentLayout",
      this.getBallonContent({
        id,
        children: `${info}`,
      })
    );
  }

  getLayoutContentForBallon(info) {
    console.warn("Вот здесь мы начинаем формировать верстку");
    const imagesHtml = info.data.images
      .map(
        (src) => `
        <div class="swiper-slide">
          <img src="${src}" alt="Image" style="width: 100%; height: auto;" />
        </div>
      `
      )
      .join("");
    return `
      <div class="swiper ${this.classNames.ballonSwiperContent}">
        <div class="swiper-wrapper">
          ${imagesHtml}
        </div>
        <!-- Добавляем элементы управления -->
        <div class="swiper-pagination"></div>
        <div class="swiper-scrollbar"></div>
      </div>
      <div class="${this.classNames.ballonContent}">
        <h1 class="${this.classNames.ballonTitle}">${info.data.title}</h1>
        <div class="${this.classNames.ballonMark}">
          ${this.iconsPresets[info.data.type] ? this.iconsPresets[info.data.type] : info.data.type}
          <p class="${this.classNames.ballonMarkText}">Бар</p>
        </div>
        <p class="${this.classNames.ballonMarkTextAddress}">${info.data.address.street}, ${info.data.address.house}</p>
        <p class="${this.classNames.ballonMarkText1}">${info.data.comment}</p>
        <div class="${this.classNames.ballonMarksEditAndDelete}">
          <p class="${this.classNames.ballonMarkText1}">${EditBallonIcon({ iconColor: "var(--colorBlack)" })} Редактировать</p>
          <div style="margin-right: 10px;">${DeleteIcon({ iconColor: "var(--colorChiliRed)" })}</div>
        </div>
      </div>
    `;
  }

  @checkMapInstance
  renderMarks(marks) {
    marks.forEach((mark) => {
      this.addMark({
        id: mark.id,
        cords: mark.cords,
        type: mark.type,
        onClick: (id, e) => {
          this.handleMarkerClick(id, e);
        },
      });
    });
  }

  handleCloseCurrentBallon() {
    if (this.currentBalloon) {
      this.currentBalloon.balloon.close();
    }
    this.currentBalloon = null;
    this.currentMarkerIdOpen = null;
  }

  @checkMapInstance
  centerMapByCords(cords, zoom = 15) {
    try {
      this.instance.setCenter(cords, zoom);
    } catch (e) {
      console.error(e);
    }
  }

  #bindEvents() {
    this.instance.events.add("click", () => {
      this.handleCloseCurrentBallon(); //TODO: а надо ли оставлять эту функцию для закрытия балуна при клике на карту? надо подумать
    });
  }
}
