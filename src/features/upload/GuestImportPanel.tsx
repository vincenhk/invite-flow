'use client';

import {ChangeEvent, useRef, useState} from "react";
import {readExcel} from "@/lib/excel";
import {RawExcelGuest} from "@/features/guest/dto/guest-excel.dto";
import {toGuestFromExcel} from "@/mapper/guest.mapper";
import {GuestImportState} from "@/features/guest/guest-import.state";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import GuestTable from "@/components/GuestTable";

export default function GuestImportPanel() {
    const [importState, setImportState] = useState<GuestImportState>({
        guests: []
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const rawData = await readExcel<RawExcelGuest>(file);
            const mappedGuests = rawData.map(toGuestFromExcel);
            console.log("mappedGuests", mappedGuests);

            setImportState({
                guests: mappedGuests,
                fileName: file.name,
            });

        } catch (e) {
            console.error("Failed process file, errMessage:", e);
        }
    };

    // 2. Fungsi untuk memicu klik pada input tersembunyi
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Import Guest</CardTitle>
                    <CardDescription>Upload daftar tamu dari Excel.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx, .xls"
                        className="hidden"
                        onChange={handleUpload}
                    />

                    <div className="flex flex-col items-center gap-2">
                        <Button onClick={triggerFileInput} type="button">
                            Upload Excel
                        </Button>
                        {importState.fileName && (
                            <p className="text-xs text-gray-500 mt-1">
                                File: <span className="font-medium text-gray-700">{importState.fileName}</span>
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <GuestTable guests={importState.guests}/>
        </div>
    );
}