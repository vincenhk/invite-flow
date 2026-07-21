import {Guest} from "@/types/guest";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {buildMessage} from "@/features/invitation/builder/message.builder";
import {buildWhatsappUrl} from "@/features/whatsapp/whatsapp.builder";
import {buildQueryUrl} from "@/features/invitation/invitation-url.builder";

interface GuestTableProps {
    guests: Guest[];
}

export default function GuestTable({guests}: GuestTableProps) {

    if (guests.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No guests imported yet.
            </div>
        );
    }

    function handleSend(guest: Guest) {
        const invitationUrl =
            buildQueryUrl(
                guest,
                settings
            );
        const message =
            buildMessage(
                guest,
                invitationUrl,
                messageTemplate
            );
        const whatsappUrl =
            buildWhatsappUrl(
                guest.phone,
                message
            );

        window.open(
            whatsappUrl,
            "_blank"
        );

    }

    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {guests.map((guest) => (
                    <TableRow key={guest.id}>
                        <TableCell>{guest.recipient}</TableCell>
                        <TableCell>{guest.phone}</TableCell>
                        <TableCell>{guest.slug}</TableCell>
                        <TableCell>{guest.status}</TableCell>
                        <TableCell>
                            <Button onClick={() => handleSend(guest)}>
                                Send
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}