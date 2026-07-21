import {normalizePhoneNumber} from "@/lib/normalize";

export function buildWhatsappUrl(
    phone: string,
    message: string
): string {

    const normalized = normalizePhoneNumber(phone);

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${normalized}?text=${encodedMessage}`;
}