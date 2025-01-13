import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout } from '@/components/Layout';

const ProductComplete = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/products');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Layout>
      <div className="min-h-screen h-full flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl text-green-700 font-bold mb-4">商品登録が完了しました。</h2>
          <p className="text-gray-700 mb-6">3秒後に商品一覧画面へ自動遷移します。</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            商品一覧へ戻る
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductComplete;