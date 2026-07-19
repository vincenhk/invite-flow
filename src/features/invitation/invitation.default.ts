import {InvitationSettings} from "@/features/invitation/invitation-settings";


export const defaultInvitationSettings: InvitationSettings = {
    baseUrl: "",
    strategy: "QUERY",
    mapping: [
        {
            key: "to",
            source: "recipient"
        }
    ]
};