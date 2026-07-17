
export type GuestStatus = | "pending"
    | "sent"
    | "opened"
    | "failed";

export interface Guest {
    id: string;
    recipient: string;
    phone:string;
    slug: string;
    status: GuestStatus;
}