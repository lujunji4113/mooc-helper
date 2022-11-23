import ky from "ky";
import { getClient } from "@tauri-apps/api/http";
import mapValues from "lodash/mapValues";
import store from "./store";
import type { HttpOptions } from "@tauri-apps/api/http";

interface RequestOptions extends HttpOptions {
  timeout?: number;
}

async function requestWeb<T>(options: RequestOptions) {
  const mobToken = await store.get("mob-token");

  const response = await ky(options.url, {
    prefixUrl: "/api",
    method: options.method,
    headers: {
      ...options.headers,
      "edu-app-type": "android",
    },
    searchParams: {
      ...options.query,
      "mob-token": mobToken ?? "",
    },
    json: options.body,
    timeout: options.timeout,
  });

  const data = await response.json<T>();

  return data;
}

async function requestTauri<T>(options: RequestOptions) {
  const { url, query, ...other } = options;

  const mobToken = await store.get("mob-token");

  const handledQuery = mapValues(
    {
      ...query,
      "mob-token": mobToken ?? "",
    },
    (value) => String(value)
  );

  const client = await getClient();
  const response = await client.request<T>({
    url: `https://www.icourse163.org/${url}`,
    headers: {
      "edu-app-type": "android",
    },
    query: handledQuery,
    ...other,
  });

  return response.data;
}

const request = process.env.NEXT_PUBLIC_TAURI ? requestTauri : requestWeb;

export default request;
