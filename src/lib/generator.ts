import {Settings} from "@/features/settings/settings";
import {generateSlug} from "@/lib/slug";
import {generateUrlEncode} from "@/lib/urlEncode";

export function generateInvitationUrl(
    recipient: string,
    settings: Settings): string {
    switch (settings.strategy) {
        case "slug":
            return settings.baseUrl + generateSlug(recipient);
        case "url-encode":
            return settings.baseUrl + generateUrlEncode(recipient);
    }
    return "/invitation";
}