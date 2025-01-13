import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { SideMenu } from "@/components/common/SideMenu";

interface DownloadProps {
  handleDownload?: () => void;
}

const Download: React.FC<DownloadProps> = ({ handleDownload }) => {

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow bg-gray-100">
        <Header />
        <main className="p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">レポートダウンロード</h2>
            <p className="mb-6">以下のリンクからレポートをダウンロードしてください。</p>
            <a
              href="#"
              onClick={handleDownload}
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              role="link"
              download
            >
              ダウンロード
            </a>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Download;