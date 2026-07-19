import {Guest} from "@/types/guest";

export interface UrlMapping {
    key: string;
    source: keyof Guest;
}