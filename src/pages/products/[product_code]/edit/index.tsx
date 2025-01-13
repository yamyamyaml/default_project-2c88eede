import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Layout } from '@/components/Layout';
import { supabase } from '@/supabase';

const ProductEdit = () => {
  const router = useRouter();
  const { product_code } = router.query;
  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
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
      } catch (error: any) {
        setError(error);
        setProduct({
          product_code: 'test-code',
          product_name: 'テスト商品',
          product_description: 'テスト商品の詳細',
          unit_price: 1000,
          tax_rate: 0.1,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (product_code) {
      fetchProduct();
    }
  }, [product_code]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
          .from('products')
          .update({
            product_name: event.currentTarget.product_name.value,
            product_description: event.currentTarget.product_description.value,
            unit_price: Number(event.currentTarget.unit_price.value),
            tax_rate: Number(event.currentTarget.tax_rate.value),
          })
          .eq('product_code', product_code)

      if (error) {
        throw error
      }

      router.push('/products');
    } catch (error: any) {
      setError(error);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <h1 role="heading">読み込み中...</h1>
      </Layout>
    );
  }

  if (error) {
    return (
        <Layout>
            <div>エラー: {error.message}</div>
        </Layout>
    );
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <label htmlFor="product_code">商品コード:</label>
        <input type="text" id="product_code" name="product_code" defaultValue={product.product_code} readOnly /><br />
        <label htmlFor="product_name">商品名:</label>
        <input type="text" id="product_name" name="product_name" defaultValue={product.product_name} required /><br />
        <label htmlFor="product_description">商品詳細:</label>
        <textarea id="product_description" name="product_description" defaultValue={product.product_description} required /><br />
        <label htmlFor="unit_price">単価:</label>
        <input type="number" id="unit_price" name="unit_price" defaultValue={product.unit_price} required /><br />
        <label htmlFor="tax_rate">税率:</label>
        <input type="number" id="tax_rate" name="tax_rate" defaultValue={product.tax_rate} required /><br />
        <button type="submit">修正確認</button>
      </form>
    </Layout>
  );
};

export default ProductEdit;
