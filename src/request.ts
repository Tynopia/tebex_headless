import type { GenericObject, Route } from "./types.js";

const BASE_URL = "https://headless.tebex.io";

export class TebexApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown
  ) {
    super(`Tebex API error ${status}`);
    this.name = "TebexApiError";
  }
}

export async function request<T, Body = unknown>(
  webstoreIdentifier: string,
  privateKey: string | undefined,
  method: string,
  identifier: string | null,
  route: Route,
  path?: string,
  params?: Record<string, GenericObject>,
  body?: Body
): Promise<T> {
  const url = new URL(`${BASE_URL}/api/${route}/${identifier ?? ""}${path ?? ""}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      if (typeof value === "boolean") {
        url.searchParams.set(key, value ? "1" : "0");
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (webstoreIdentifier && privateKey) {
    headers["Authorization"] = `Basic ${btoa(`${webstoreIdentifier}:${privateKey}`)}`;
  }

  const response = await fetch(url.toString(), {
    method: method.toUpperCase(),
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const json = text.length > 0 ? (JSON.parse(text) as unknown) : undefined;

  if (!response.ok) {
    throw new TebexApiError(response.status, json);
  }

  return json as T;
}
