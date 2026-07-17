export type urlStrategy = | "slug" | "url-encode";

export interface Settings {
    baseUrl: string;
    strategy: urlStrategy;
}