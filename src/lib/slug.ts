export function generateSlug(recipient:string): string{
    return recipient.trim()
        .toLowerCase()
        .replace(" ", "-");
}