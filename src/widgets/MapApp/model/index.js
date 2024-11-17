import { API_ENDPOINTS } from "#shared/config/constants.js"; //добавил путь до constans.js, чтобы получить API_ENDPOINTS
import { StoreService } from "#shared/lib/services/StoreService";
import { yandexMapCustomEventNames } from "#shared/ui/Map/config/constants";
import { YandexMap } from "#shared/ui/Map/model";

export class MapApp {
  constructor(storageName, apiClient) {
    this.storeService = new StoreService(storageName);
    this.apiClient = apiClient; // Сохраняем ApiClient как зависимость
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
      const layout = this.yandexMap.getLayoutContentForBallon(res);
      this.yandexMap.renderCustomBallon(mark, layout);
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
}
