import "./styles.js";
import { API_URL, API_ENDPOINTS } from "#shared/config/constants";
import { ApiClient } from "#shared/lib/services/ApiClient.js";
import { ChoiceSelectModel } from "#shared/ui/CustomSelect/model/index.js";
import { MapApp } from "#widgets/MapApp/model/index.js";

async function initMSW() {
  if (process.env.NODE_ENV === "development") {
    const { getMocks } = await import("#shared/api/browser");
    await getMocks();

    console.debug("msw ready");
  } else {
    return Promise.resolve();
  }
}

function domReady() {
  return new Promise((res) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", res);
    } else {
      res();
    }
  });
}

Promise.all([initMSW(), domReady()]).then(() => {
  window.App = {};
  const apiClient = new ApiClient(API_URL);
  new ChoiceSelectModel();
  window.App.ChoiceSelectModel = ChoiceSelectModel;
  new MapApp("store-map-markers", apiClient);
  apiClient.get(API_ENDPOINTS.marks.list).then((res) => console.debug(res));
});
