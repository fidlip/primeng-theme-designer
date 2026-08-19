export interface Json {
  [key: string]: JsonPropertyType;
}

export function isJson(json: unknown): json is Json {
  return !!json && typeof json === "object";
}

export type JsonPropertyType = string | number | boolean | Json | null | Array<JsonPropertyType>;

export function isJsonProperty(jsonProperty: unknown): jsonProperty is JsonPropertyType {
  return !!jsonProperty
    && (isJson(jsonProperty)
      || typeof jsonProperty === "string"
      || typeof jsonProperty === "number"
      || typeof jsonProperty === "boolean"
      || Array.isArray(jsonProperty)
    );
}
