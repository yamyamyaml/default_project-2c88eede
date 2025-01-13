import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabase';

const ProductDetail = () => {
  const router = useRouter();
  const { product_code } = router.query;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (product_code) {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('product_code', product_code)
            .single();

          if (error) {
            throw error;
          }

          setProduct(data);
        } catch (error) {
          setError('エラーが発生しました。');
          setProduct({
            product_code: "SCR-095",
            product_name: "サンプル商品名",
            product_description: "サンプル商品の詳細説明です。",
            unit_price: 1000,
            tax_rate: 0.1
          });        
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [product_code]);

  if (loading) {
    return (
      <div className="min-h-screen h-full flex items-center justify-center">
        <h1 className='text-xl font-bold'>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
       <div className="min-h-screen h-full flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full p-8">
      <h1 className="text-3xl font-bold mb-4">商品詳細</h1>

      <dl className="divide-y divide-gray-200">
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">商品コード</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{product.product_code}</dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">商品名</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{product.product_name}</dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">商品詳細</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{product.product_description}</dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">単価</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{product.unit_price}</dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt className="text-sm font-medium text-gray-500">税率</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{product.tax_rate}</dd>
        </div>
      </dl>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push(`/products/${product.product_code}/edit`)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          編集
        </button>
        <button
          onClick={() => router.push('/products')}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          一覧へ戻る
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
