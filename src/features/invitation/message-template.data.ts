import {MessageTemplate} from "./message-template";

export const DEFAULT_TEMPLATES: MessageTemplate[] = [
    {
        id: "catholic",
        name: "Catholic",
        content:
            `Shalom {recipient},
            Dengan penuh sukacita kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami.
            
            Silakan membuka undangan berikut:
            
            {url}
            
            Terima kasih.
            Tuhan memberkati.`
    }

];