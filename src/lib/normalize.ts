export function normalizePhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("0")) {
        return "62" + cleaned.substring(1);
    }

    return cleaned;
}