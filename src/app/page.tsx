import ClientForm from "@/app/components/ClientForm";
import Link from "next/link";

export default function Home() {
  // const filePath = path.join(process.cwd(), "public", "resume.xlsx");
  // const fileBuffer = fs.readFileSync(filePath);

  // const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  // const sheet = workbook.Sheets[workbook.SheetNames[0]];
  // const data: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">CVGenius: Резюме из Excel</h1>

        <div className="mb-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Доступные шаблоны</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-white p-4 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-medium mb-2">Профессиональный шаблон</h3>
              <p className="text-sm text-gray-600 mb-4">Классический дизайн резюме с чистым и структурированным форматом. Идеально для сфер IT, финансов и управления.</p>
              <Link 
                href="/resume" 
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Просмотр шаблона
              </Link>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200 shadow-sm opacity-50">
              <h3 className="font-medium mb-2">Креативный шаблон</h3>
              <p className="text-sm text-gray-600 mb-4">Современный дизайн для творческих профессий с возможностью добавления графического портфолио.</p>
              <button 
                disabled
                className="inline-block bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
              >
                Скоро в доступе
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Загрузить данные из Excel</h2>
          <ClientForm />
        </div>
      </div>
    </main>
  );
}
