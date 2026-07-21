export interface MessageTemplate {
    id: string;
    name: string;
    content: string;
}

export const DEFAULT_MESSAGE = `Shalom {recipient},

Dengan penuh sukacita kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.

Silakan membuka undangan berikut:

{url}

Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i dapat hadir.

Tuhan memberkati.`;