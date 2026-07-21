import { Guest } from "@/types/guest";

export function buildMessage(
    guest: Guest,
    invitationUrl: string,
    template: string
): string {

    return template
        .replaceAll("{recipient}", guest.recipient)
        .replaceAll("{url}", invitationUrl);
}