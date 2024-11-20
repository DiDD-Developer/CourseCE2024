import { API_ENDPOINTS } from "#shared/config/constants.js"; //добавил путь до constans.js, чтобы получить API_ENDPOINTS
import { StoreService } from "#shared/lib/services/StoreService";
import { getDebouncedFn } from "#shared/lib/utils";
import { yandexMapCustomEventNames } from "#shared/ui/Map/config/constants";
import { YandexMap } from "#shared/ui/Map/model";

export class MapApp {
  constructor(storageName, apiClient) {
    this.storeService = new StoreService(storageName);
    this.apiClient = apiClient; // Сохраняем ApiClient как зависимость
    this.apiGeoUrl = "https://geocode-maps.yandex.ru/1.x/?apikey";
    this.apiKey = "923d4771-168e-498b-aaa7-f8397276bed8";
    this.inputAddress = document.querySelector("#searchAddress"); //TODO: вынести в фильтр.
    console.debug(this.inputAddress, "!!!");
    this.yandexMap = new YandexMap({
      containerSelector: "#map1",
      apiUrl: "https://api-maps.yandex.ru/2.1/?apikey",
      apiKey: "923d4771-168e-498b-aaa7-f8397276bed8",
      lang: "ru_RU",
      center: [53.751574, 57.573856], //Выставил координаты метки, чтобы все время не передвигать карту к ней
      zoom: 7, //Уменьшил зум с 10 до 7, чтобы было лучше видно метки
    });

    this.yandexMap
      .initMap()
      .then(async () => {
        this.yandexMap.renderMarks(this.storeService.getMarkers()); //Рендерим метки из стора
        const marks = await this.getMarks();
        this.storeService.updateStore("addMarkers", marks);
      })
      .catch((e) => console.error(e));

    this.#bindYandexMapEvents();
    this.subscribeForStoreService();
    this.#bindEvents(); //TODO: bindFilterEvents
    // Инициализация: сразу загружаем метки
    this.fetchMarkers();
  }

  // Метод для загрузки меток с сервера
  async fetchMarkers() {
    try {
      // Формируем полный путь к API, используя API_URL и API_ENDPOINTS
      const apiEndpoint = `${API_ENDPOINTS.marks.list}`; //Получаю данные из файла, находящегося в src/shared/api/index.js

      // Запрос к API для получения меток
      const response = await this.apiClient.get(apiEndpoint);

      // Проверка, что запрос успешен
      if (response.isSuccess) {
        // Добавляем метки в стор
        this.storeService.updateStore("addMarkers", response.data.marks);
        console.debug(
          "Markers fetched and added to store",
          response.data.marks
        );
      } else {
        console.error("Ошибка при загрузке меток:", response);
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса меток:", error);
    }
  }

  async getMarks() {
    return this.apiClient
      .get(API_ENDPOINTS.marks.list)
      .then((res) => res?.data?.marks);
  }

  async handleMarkerClick(e) {
    const {
      detail: { id, mark },
    } = e;

    try {
      const res = await this.apiClient.get(API_ENDPOINTS.marks.detail, {
        id: id,
      });
      const info = this.yandexMap.getLayoutContentForBallon(res);
      this.yandexMap.renderCustomBallon(id, mark, info);
    } catch (e) {
      console.error(e);
    }
  }

  handleMarkersChanged() {
    console.debug("метки изменились", this.storeService.getMarkers());
    this.yandexMap.renderMarks(this.storeService.getMarkers());
  }

  handleFiltersChanged() {
    console.debug("фильтры изменились", this.storeService.getFilters());
    this.yandexMap.renderMarks(this.storeService.getFilters());
  }

  handleCenterMapByAddress(address) {
    console.debug(address, "address");
    //TODO: как-то проверять что yandexMap и переписать на apiClient (добавить параметр ingoreBaseUrl)
    // this.apiClient.get(this.apiGeoUrl, {
    //   apikey: this.apiKey,
    //   geocode: encodeURIComponent(address),
    //   format: "json",
    // });

    fetch(
      `${this.apiGeoUrl}=${this.apiKey}&geocode=${encodeURIComponent(address)}&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const coords =
          data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.Point?.pos?.split(
            " "
          );
        if (coords) {
          const lat = parseFloat(coords[1]);
          const lon = parseFloat(coords[0]);
          this.yandexMap.centerMapByCords([lat, lon]);
        }
      })
      .catch((e) => console.error(e));
  }

  subscribeForStoreService() {
    this.markerSubscription = this.storeService.subscribeToMarkers(() => {
      this.handleMarkersChanged();
    });
    this.filterSubscription = this.storeService.subscribeToFilters(() => {
      this.handleFiltersChanged();
    });
  }

  unsubscribeFromStoreService() {
    this.markerSubscription?.();
    this.subscribeOnStoreChange?.();
  }

  #bindYandexMapEvents() {
    document.addEventListener(yandexMapCustomEventNames.markClicked, (e) => {
      this.handleMarkerClick(e);
    });
  }

  //TODO: переписать на фильтры
  #bindEvents() {
    const debouncedHandleMapByAddress = getDebouncedFn(
      this.handleCenterMapByAddress,
      1000
    ).bind(this);
    if (this.inputAddress)
      this.inputAddress.addEventListener("input", (e) => {
        debouncedHandleMapByAddress(e.target.value);
      });
  }
}
