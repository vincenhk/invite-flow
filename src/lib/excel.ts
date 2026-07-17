import * as XLSX from 'xlsx';

export function readExcel<T>(file: File): Promise<T[]> {
    console.log(file)
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const target = event.target;
            if (!target || !target.result) {
                return reject(new Error("Failed to load file"));
            }

            try {
                const data = target.result as ArrayBuffer;

                const workbook = XLSX.read(data, {type: 'array'});

                if (!workbook.SheetNames.length) {
                    throw new Error("Workbook has no sheets.");
                }

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json<T>(worksheet, {
                    defval: "" //default supaya attr tidak hilang.
                });
                console.log("SAMPAI", jsonData);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}