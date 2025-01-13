import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

const CSVComplete = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="min-h-screen h-full flex flex-col justify-center items-center space-y-4 bg-gray-100">
        <div className="text-2xl font-bold text-green-600">CSV出力が完了しました。</div>
        <button
          onClick={() => router.push('/products')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          商品一覧へ戻る
        </button>
      </div>
    </Layout>
  );
};

export default CSVComplete;