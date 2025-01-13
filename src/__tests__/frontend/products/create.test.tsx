{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import ProductCreate from '@/pages/products/create';

// Fetch のモック
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
  text: () => Promise.resolve(\"\"),
  ok: true,
  status: 200,
  statusText: \"OK\",
})) as jest.Mock;

// Axios のモック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Next.js の Router モック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

global.mockNextRouter = mockRouter;
global.axios = mockedAxios;

const Layout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('商品登録画面', () => {
  test('商品登録フォームの入力と登録確認ボタンの動作確認', async () => {
    render(
      <Layout>
        <ProductCreate />
      </Layout>
    );

    // 商品コード、商品名、商品詳細、単価、税率の入力フィールドを取得
    const productCodeInput = screen.getByLabelText('商品コード') as HTMLInputElement;
    const productNameInput = screen.getByLabelText('商品名') as HTMLInputElement;
    const productDescriptionInput = screen.getByLabelText('商品詳細') as HTMLTextAreaElement;
    const unitPriceInput = screen.getByLabelText('単価') as HTMLInputElement;
    const taxRateInput = screen.getByLabelText('税率') as HTMLInputElement;

    // 入力フィールドに値を入力
    fireEvent.change(productCodeInput, { target: { value: 'test-product-code' } });
    fireEvent.change(productNameInput, { target: { value: 'テスト商品' } });
    fireEvent.change(productDescriptionInput, { target: { value: 'テスト商品の詳細' } });
    fireEvent.change(unitPriceInput, { target: { value: '1000' } });
    fireEvent.change(taxRateInput, { target: { value: '0.1' } });

    // 登録確認ボタンをクリック
    const registButton = screen.getByRole('button', { name: '登録確認' });
    fireEvent.click(registButton);

    // Axios の post メソッドが想定したデータで呼び出されているか確認
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/products', {
      product_code: 'test-product-code',
      product_name: 'テスト商品',
      product_description: 'テスト商品の詳細',
      unit_price: 1000,
      tax_rate: 0.1,
    });
     expect(mockRouter.push).toHaveBeenCalledWith('/products/confirm');
  });
});
"}