import {Guest} from "@/types/guest";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

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

    return (
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {guests.map((guest) => (
                    <TableRow key={guest.id}>
                        <TableCell>{guest.recipient}</TableCell>
                        <TableCell>{guest.phone}</TableCell>
                        <TableCell>{guest.slug}</TableCell>
                        <TableCell>{guest.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}