import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';

const ProductEdit = () => {
  const router = useRouter();
  const [product, setProduct] = useState({
    product_code: '',
    product_name: '',
    product_description: '',
    unit_price: 0,
    tax_rate: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      // 実際にはURLから商品コードを取得
      const productCode = router.query.product_code;

      if (productCode) {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('product_code', productCode)
            .single();

          if (error) {
            console.error('商品取得エラー:', error);
          } else {
            setProduct(data);
          }
        } catch (error) {
          console.error('商品取得エラー:', error);
        }
      }
    };

    fetchProduct();
  }, [router.query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('products')
        .upsert(product);

      if (error) {
        console.error('商品登録/更新エラー:', error);
      } else {
        router.push('/products');
      }
    } catch (error) {
      console.error('商品登録/更新エラー:', error);
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <header>
      </header>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">商品登録・修正</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="product_code" className="block text-gray-700 font-bold mb-2">商品コード</label>
            <input type="text" id="product_code" name="product_code" value={product.product_code} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="product_name" className="block text-gray-700 font-bold mb-2">商品名</label>
            <input type="text" id="product_name" name="product_name" value={product.product_name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="product_description" className="block text-gray-700 font-bold mb-2">説明</label>
            <textarea id="product_description" name="product_description" value={product.product_description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="unit_price" className="block text-gray-700 font-bold mb-2">単価</label>
            <input type="number" id="unit_price" name="unit_price" value={product.unit_price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="tax_rate" className="block text-gray-700 font-bold mb-2">税率</label>
            <input type="number" id="tax_rate" name="tax_rate" value={product.tax_rate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">登録</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProductEdit;
