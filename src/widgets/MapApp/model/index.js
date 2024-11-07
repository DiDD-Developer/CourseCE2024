import { API_ENDPOINTS } from "#shared/config/constants.js"; //добавил путь до constans.js, чтобы получить API_ENDPOINTS
import { StoreService } from "#shared/lib/services/StoreService";

export class MapApp {
  constructor(storageName, apiClient) {
    this.storeService = new StoreService(storageName);
    this.apiClient = apiClient; // Сохраняем ApiClient как зависимость
    this.subscribeForStoreService();
    // Инициализация: сразу загружаем метки
    this.fetchMarkers();

    console.debug(
      "Тут будем реализовывать логику нашего виджета, вот готовый стор сервис ->",
      this.storeService
    );

    setTimeout(() => {
      this.storeService.updateStore("addMarker", { id: 33144, value: "test" });
    }, 5000);
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
