import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";

const ReportIndex = () => {
  const router = useRouter();

  const handleReportTypeSelectClick = () => {
    router.push("/report/select");
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow bg-gray-100">
        <Header />
        <main className="p-4">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                <button
                  onClick={handleReportTypeSelectClick}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  レポート種別選択へ
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportIndex;