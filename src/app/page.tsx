'use client';

import {generateInvitationUrl} from "@/lib/invitation"
import {Guest} from "@/types/guest";
import {Settings} from "@/types/settings";
import {generateSlug} from "@/lib/slug";
import {useEffect, useState} from 'react';
import {readExcel} from '@/lib/excel'
import {RawExcelGuest} from '@/features/guest/dto/guest-excel.dto'
import {toGuestFromExcel} from '@/mapper/guest.mapper'
import GuestImportPanel from "@/features/upload/GuestImportPanel";
import InvitationSettingPanel from "@/features/invitation/components/InvitationSettingPanel";

export default function HomePage() {

    const recipient = "Vincentius Hendri Kurniawan";

    const guest: Guest = {
        id: "1",
        recipient: recipient,
        phone: "08882198622",
        slug: generateSlug(recipient),
        status: "pending"
    };


    const setting: Settings = {
        baseUrl: "https://kaliefinvitation.com/vincen-gita/?to=",
        strategy: "url-encode"
    }

    const url = generateInvitationUrl(guest.recipient, setting);

    /**** EXCEL HANDLER **********************/

    const [excelData, setExcelData] = useState<Guest[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("HERE COMING");
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const rawData = await readExcel<RawExcelGuest>(file);
            const mappedGuest = rawData.map(toGuestFromExcel);

            console.log("mappedGuest", mappedGuest);
            setExcelData(mappedGuest);
            // console.log("excelData", excelData);

        } catch (error) {
            console.error("Gagal memproses file:", error);
        }
    };


    useEffect(() => {
            if (excelData.length > 0) {
            console.log("State excelData terupdate di render baru:", excelData);
        }
    }, [excelData]);

    return (
        <main className="p-10 space-y-4">
            <h1 className="text-2xl font-bold">Invite Flow</h1>

            {/* Perbaikan: Mengakses properti spesifik dari objek guest */}
            <div>
                <p><strong>Penerima:</strong> {guest.recipient}</p>
                <p><strong>Status:</strong> {guest.status}</p>
                <p><strong>Object:</strong> {JSON.stringify(guest)}</p>
            </div>

            <div>
                <p><strong>Link Undangan:</strong></p>
                <a href={url} className="text-blue-600 underline break-all">
                    {url}
                </a>
            </div>

            <div className="border p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Upload File Excel</h3>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            {excelData.length > 0 && (
                <div className="mt-4 border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold mb-2">Daftar Tamu dari Excel ({excelData.length}):</h4>
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                        {excelData.map((g) => (
                            <li key={g.id} className="text-sm border-b pb-1">
                                {g.recipient} ({g.phone}) - <span className="text-yellow-600">{g.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <GuestImportPanel/>
            <InvitationSettingPanel/>
        </main>
    );
}