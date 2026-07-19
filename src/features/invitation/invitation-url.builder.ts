import {Guest} from "@/types/guest";
import {InvitationSettings} from "@/features/invitation/invitation-settings";
import {generateUrlEncode} from "@/lib/urlEncode";

export function buildInvitationUrl(guest: Guest, setting: InvitationSettings): string {

    switch (setting.strategy) {
        case "QUERY" :
            return buildQueryUrl(guest, setting);
        case "PATH":
            return buildPathUrl(guest, setting);
        default:
            throw new Error("Unsupported strategy: " + setting.strategy);
    }
}


function buildQueryUrl(guest: Guest, setting: InvitationSettings): string {
    const baseUrl = setting.baseUrl;
    const urlMapping = setting.mapping;

    if (!baseUrl) return "";
    if (urlMapping.length === 0) return "";

    /**
     * Create some chamber for pool the param.
     * ***/
    const queryParams: string[] = [];

    for (const {key, source} of urlMapping) {
        const value = guest[source]?.toString();

        if (!value == null) continue;
        queryParams.push(`${key}=${generateUrlEncode(value)}`);
    }

    if (queryParams.length === 0) return baseUrl;

    /** Get ending from base url
     * if include ?, continue the parameter
     * if unincluded ?, make one query search
     * ***************************************/
    const separator = baseUrl.includes("?") ? "&" : "?"

    /**
     * Break the chamber turn to horizontal with join "&" separator
     * queryParams.join("&")
     * **/
    return `${baseUrl}?${separator}&${queryParams.join("&")}`;
}

function buildPathUrl(guest: Guest, setting: InvitationSettings): string {
    return "";
}