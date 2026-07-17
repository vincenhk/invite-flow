'use client';

import {generateInvitationUrl} from "@/lib/invitation"
import {Guest} from "@/types/guest";
import {Settings} from "@/types/settings";
import {generateSlug} from "@/lib/slug";
import {useState} from 'react';
import {readExcel} from '@/lib/excel'
import {RawExcelGuest} from '@/features/guest/dto/guest-excel.dto'

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

    const [excelData, setExcelData] = useState<RawExcelGuest[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("HERE COMING");
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            // 3. Masukkan tipe interface <RawExcelGuest> saat memanggil helper
            const rawData = await readExcel<RawExcelGuest>(file);

            console.log(rawData)
           setExcelData(rawData);
        } catch (error) {
            console.error("Gagal memproses file:", error);
        }
    };

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

        </main>
    );
}