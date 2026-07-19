import {Guest} from "@/types/guest";

export interface GuestImportState {
    guests: Guest[];
    fileName?: string;
}