import { invoke } from "@tauri-apps/api/tauri";
import { TAURI_STORE_PATH } from "@/constants";

export interface Store {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string) => Promise<void>;
}

const storeTauri: Store = {
  get: (key) => {
    return invoke<string | null>("plugin:store|get", {
      path: TAURI_STORE_PATH,
      key,
    });
  },
  set: (key, value) => {
    return invoke<void>("plugin:store|set", {
      path: TAURI_STORE_PATH,
      key,
      value,
    });
  },
};

const storeWeb: Store = {
  get: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  set: (key, value) => {
    return Promise.resolve(localStorage.setItem(key, value));
  },
};

const store = process.env.NEXT_PUBLIC_TAURI ? storeTauri : storeWeb;

export default store;
