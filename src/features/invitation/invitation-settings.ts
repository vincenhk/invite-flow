import {UrlMapping} from "@/features/invitation/url-mapping";

export type UrlStrategy = | 'QUERY' | 'PATH';

export interface InvitationSettings {
    baseUrl: string;
    strategy: UrlStrategy;
    mapping: UrlMapping[];
}