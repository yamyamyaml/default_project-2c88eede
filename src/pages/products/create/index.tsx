import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Layout } from '@/components/Layout';

const ProductCreate = () => {
  const router = useRouter();
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState<number | undefined>();
  const [taxRate, setTaxRate] = useState<number | undefined>();

  const handleProductCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductCode(e.target.value);
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductDescription(e.target.value);
  };

  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnitPrice(Number(e.target.value));
  };

  const handleTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaxRate(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', {
        product_code: productCode,
        product_name: productName,
        product_description: productDescription,
        unit_price: unitPrice,
        tax_rate: taxRate,
      });
      router.push('/products/confirm');
    } catch (error) {
      console.error(error);
      // エラー処理を実装
    }
  };

  return (
    <Layout>
      <div className="min-h-screen h-full p-4">
        <h1 className="text-2xl font-bold mb-4">商品登録</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productCode" className="block text-gray-700 font-bold mb-2">商品コード</label>
            <input
              type="text"
              id="productCode"
              value={productCode}
              onChange={handleProductCodeChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">商品名</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={handleProductNameChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">商品詳細</label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={handleProductDescriptionChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="unitPrice" className="block text-gray-700 font-bold mb-2">単価</label>
            <input
              type="number"
              id="unitPrice"
              value={unitPrice}
              onChange={handleUnitPriceChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="taxRate" className="block text-gray-700 font-bold mb-2">税率</label>
            <input
              type="number"
              id="taxRate"
              value={taxRate}
              onChange={handleTaxRateChange}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            登録確認
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ProductCreate;
