import {RawExcelGuest} from "@/features/guest/dto/guest-excel.dto";
import {Guest} from "@/types/guest";
import {generateSlug} from "@/lib/slug";

export function toGuestFromExcel(dto: RawExcelGuest): Guest{
    const recipient = dto.Recipient.trim();

    return {
        id: crypto.randomUUID(),
        recipient: recipient,
        phone: typeof dto.Phone === 'number' ? dto.Phone.toString() : dto.Phone,
        slug: generateSlug(recipient),
        status:"pending"
    }
}