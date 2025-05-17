import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import ClientForm from "@/app/components/ClientForm";

export default function Home() {
  // const filePath = path.join(process.cwd(), "public", "resume.xlsx");
  // const fileBuffer = fs.readFileSync(filePath);

  // const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  // const sheet = workbook.Sheets[workbook.SheetNames[0]];
  // const data: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">CVGenius: Резюме из Excel</h1>

      <ClientForm />

      <div className="overflow-auto border rounded mt-8">
        {/* <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              {data[0].map((cell, idx) => (
                <th key={idx} className="border px-4 py-2 text-left">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border px-4 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </main>
  );
}
