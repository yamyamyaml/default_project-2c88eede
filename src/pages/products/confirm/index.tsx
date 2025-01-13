import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '@/supabase';

const ProductConfirm: React.FC = () => {
  const router = useRouter();
  const [productData, setProductData] = useState<any | null>(null);

  useState(() => {
    // Replace with actual data fetching logic from Supabase or context
    setProductData({
      product_code: 'product001',
      product_name: 'サンプル商品',
      product_description: 'サンプル商品の説明',
      unit_price: 1000,
      tax_rate: 0.1,
    });
  }, []);

  const handleRegister = async () => {
    // Replace with actual Supabase insert logic
    try {
      // const { data, error } = await supabase
      //   .from('products')
      //   .insert([productData]);
      // if (error) {
      //   console.error("Error inserting product:", error);
      //   // Handle error, e.g., display error message
      //   return;
      // }
      router.push('/products/complete');
    } catch (error) {
      console.error("Error inserting product:", error);
      // Handle error
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen h-full bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">商品登録確認</h2>
        {productData && (
          <div>
            <p className="mb-2">商品コード: {productData.product_code}</p>
            <p className="mb-2">商品名: {productData.product_name}</p>
            <p className="mb-2">商品説明: {productData.product_description}</p>
            <p className="mb-2">単価: {productData.unit_price}</p>
            <p className="mb-2">税率: {productData.tax_rate}</p>
          </div>
        )}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handleBack}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            戻る
          </button>
          <button
            onClick={handleRegister}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductConfirm;
