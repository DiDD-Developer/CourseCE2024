import { API_ENDPOINTS } from "#shared/config/constants.js"; //добавил путь до constans.js, чтобы получить API_ENDPOINTS
import { StoreService } from "#shared/lib/services/StoreService";
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
      center: [55.751574, 37.573856],
      zoom: 10,
    });

    this.yandexMap
      .initMap()
      .then((res) => {
        console.debug("Карта инциализирована", res, this.yandexMap.instance);
        this.yandexMap.addMark();
      })
      .catch((e) => console.error(e));

    this.yandexMap.addMark();
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

  handleMarkersChanged() {
    console.debug("метки изменились", this.storeService.getMarkers());
  }

  handleFiltersChanged() {
    console.debug("фильтры изменились", this.storeService.getFilters());
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
}
