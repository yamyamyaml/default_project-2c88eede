import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Product {
  product_code: string;
  product_name: string;
  product_description: string;
  unit_price: number;
  tax_rate: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('product_code, product_name, product_description, unit_price, tax_rate');
        if (error) {
          throw error;
        }
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
        setProducts([
          { product_code: 'P001', product_name: '商品A', product_description: '商品Aの説明', unit_price: 100, tax_rate: 0.1 },
          { product_code: 'P002', product_name: '商品B', product_description: '商品Bの説明', unit_price: 200, tax_rate: 0.1 },
        ]);
      }
    };
    fetchData();
  }, []);

  const Header = () => <div>ヘッダー</div>;
  const SideMenu = () => <div>サイドメニュー</div>;

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="w-full">
        <Header />
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4">商品マスタ管理画面</h1>
          {error && <div className="text-red-500">{error}</div>}
          {products && (
            <table className="min-w-full border-separate border-spacing-x-2">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">商品コード</th>
                  <th className="border border-gray-300 px-4 py-2">商品名</th>
                  <th className="border border-gray-300 px-4 py-2">商品説明</th>
                  <th className="border border-gray-300 px-4 py-2">単価</th>
                  <th className="border border-gray-300 px-4 py-2">税率</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.product_code}>
                    <td className="border border-gray-300 px-4 py-2">{product.product_code}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.product_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.product_description}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.unit_price}</td>
                    <td className="border border-gray-300 px-4 py-2">{product.tax_rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
}
