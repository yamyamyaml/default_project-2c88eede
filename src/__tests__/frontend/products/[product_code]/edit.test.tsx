{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import ProductEdit from '@/pages/products/[product_code]/edit';

// モック
jest.mock('axios');
const mockedAxios = jest.mocked(axios);

// モックデータ
const productData = {
  product_code: 'test-code',
  product_name: 'テスト商品',
  product_description: 'テスト商品の詳細',
  unit_price: 1000,
  tax_rate: 0.1,
};

// Layoutコンポーネント
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <div>ヘッダー</div>
    {children}
    <div>フッター</div>
  </div>
);

describe('商品修正画面', () => {
  beforeEach(() => {
    // Axios モックの設定
    mockedAxios.get.mockResolvedValue({ data: productData });
    mockedAxios.post.mockResolvedValue({ status: 200 });
  });

  it('商品情報が正しく表示されること', async () => {
    render(
        <Layout>
            <ProductEdit />
        </Layout>
    );
    // ローディング表示の確認
    expect(screen.getByRole('heading', { name: /読み込み中/i })).toBeInTheDocument();

    // 商品情報の表示確認
    expect(await screen.findByLabelText('商品コード')).toHaveValue(productData.product_code);
    expect(await screen.findByLabelText('商品名')).toHaveValue(productData.product_name);
    expect(await screen.findByLabelText('商品詳細')).toHaveValue(productData.product_description);
    expect(await screen.findByLabelText('単価')).toHaveValue(productData.unit_price);
    expect(await screen.findByLabelText('税率')).toHaveValue(productData.tax_rate);
  });

  it('商品情報を修正して送信できること', async () => {
    render(
        <Layout>
            <ProductEdit />
        </Layout>
    );
    await screen.findByLabelText('商品コード')

    // 商品情報の変更
    fireEvent.change(screen.getByLabelText('商品名'), { target: { value: '変更後の商品名' } });
    fireEvent.change(screen.getByLabelText('商品詳細'), { target: { value: '変更後の商品詳細' } });
    fireEvent.change(screen.getByLabelText('単価'), { target: { value: '2000' } });
    fireEvent.change(screen.getByLabelText('税率'), { target: { value: '0.2' } });

    // 送信ボタンクリック
    fireEvent.click(screen.getByRole('button', { name: '修正確認' }));

    // Axios post が呼び出されたことの確認
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/products', {
      product_code: 'test-code',
      product_name: '変更後の商品名',
      product_description: '変更後の商品詳細',
      unit_price: 2000,
      tax_rate: 0.2,
    });
  });
});"}