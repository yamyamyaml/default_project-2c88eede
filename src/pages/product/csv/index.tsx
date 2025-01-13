import { useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/SideMenu';

const ProductCSV: NextPage = () => {
  const router = useRouter();
  const [isLoadingCSV, setIsLoadingCSV] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');

  const downloadCSV = async () => {
    setIsLoadingCSV(true);
    setDownloadError('');

    try {
      const { data, error } = await supabase.functions.invoke('export_csv', {
        body: JSON.stringify({ product_id: productId, product_name: productName }),
      });

      if (error) {
        throw error;
      }

      if (data) {
        // CSVダウンロード処理
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error: any) {
      setDownloadError('エラーが発生しました。' + error.message);
    } finally {
      setIsLoadingCSV(false);
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="w-full">
        <Header />
        <main className="p-4">
          <h2 className="text-xl font-bold mb-4">商品CSV出力</h2>
          {downloadError && <div role="alert" className="text-red-500 mb-4">{downloadError}</div>}
          <div>
            <label htmlFor="productId" className="block mb-2">商品ID</label>
            <input
              type="text"
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />
          </div>
          <div>
            <label htmlFor="productName" className="block mb-2">商品名</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border rounded p-2 w-full mb-4"
            />
          </div>

          <button
            onClick={downloadCSV}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isLoadingCSV}
          >
            ダウンロード
          </button>
          {isLoadingCSV && (
            <div role="progressbar" className="mt-4" aria-label="処理中...">
              処理中...
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductCSV;
