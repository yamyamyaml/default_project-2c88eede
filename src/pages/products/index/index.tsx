import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { supabase } from '@/supabase';
import { FiSearch } from 'react-icons/fi';

const ProductsIndex: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('product_code, product_name, unit_price');

        if (error) {
          console.error('Error fetching products:', error);
          setProducts([
            { product_code: 'P001', product_name: '商品A', unit_price: 100 },
            { product_code: 'P002', product_name: '商品B', unit_price: 200 },
          ]);
        } else {
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([
          { product_code: 'P001', product_name: '商品A', unit_price: 100 },
          { product_code: 'P002', product_name: '商品B', unit_price: 200 },
        ]);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    Object.values(product).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Layout>
      <div className="min-h-screen h-full p-8">
        <h1 className="text-3xl font-bold mb-4">商品一覧</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="検索"
            className="border rounded-md px-3 py-2 mr-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="text-gray-500" />
        </div>
        <button onClick={() => router.push('/products/create')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          登録
        </button>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">商品コード</th>
              <th className="border px-4 py-2">商品名</th>
              <th className="border px-4 py-2">単価</th>
              <th className="border px-4 py-2">編集</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.product_code}>
                <td className="border px-4 py-2">{product.product_code}</td>
                <td className="border px-4 py-2">{product.product_name}</td>
                <td className="border px-4 py-2">{product.unit_price}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => router.push(`/products/edit/${product.product_code}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    編集
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => router.push('/products/csv')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          CSV出力
        </button>
      </div>
    </Layout>
  );
};

export default ProductsIndex;
