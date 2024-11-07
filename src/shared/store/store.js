import { createStore as create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

/**
 * Функция для создания Store с уникальным именем
 * @param {string} storageName - Имя хранилища
 * @return {Function} - Функция, возвращающая Store
 */
export const createStore = (storageName) => {
  return create(
    subscribeWithSelector(
      persist(
        (set) => ({
          markers: [],
          activeFilters: {},
          setMarkers: (markers) => set({ markers }),
          addMarker: (marker) => {
            set((state) => {
              // Проверка, есть ли уже маркер с таким ID
              const exists = state.markers.some((m) => m?.id === marker.id);
              if (exists) {
                console.warn(`Метка с ID ${marker.id} уже существует.`);
                return state; // Не изменяем состояние, если маркер с таким ID уже существует
              }
              return {
                markers: [...state.markers, marker], // Добавляем новый маркер
              };
            });
          },
          // Новый метод: добавить список меток
          addMarkers: (markers) => {
            set((state) => {
              const existingIds = state.markers.map((m) => m.id);
              const newMarkers = markers.filter(
                (marker) => !existingIds.includes(marker.id)
              );
              return { markers: [...state.markers, ...newMarkers] };
            });
          },
          removeMarker: (markerId) =>
            set((state) => ({
              markers: state.markers.filter((marker) => marker.id !== markerId),
            })),
          // Новый метод: удаление нескольких маркеров
          removeMarkers: (markerIds) =>
            set((state) => ({
              markers: state.markers.filter(
                (marker) => !markerIds.includes(marker.id)
              ),
            })),
          //Добавил новый метод: удаление списка меток
          clearMarkers: () => set({ markers: [] }),
          // Добавил новый метод: очистка фильтров
          clearFilters: () => set({ activeFilters: {} }),
          setFilters: (filters) => set({ activeFilters: filters }),
        }),
        {
          name: storageName, // Используем переданное имя хранилища
          getStorage: () => localStorage,
        }
      )
    )
  );
};
