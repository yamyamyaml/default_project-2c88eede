{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import ProductEdit from '@/pages/products/edit';

// ヘッダーコンポーネント
const Header = ({ children }: { children?: React.Node }) => <header>{children}</header>;

// モック
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    ok: true,
    status: 200,
    statusText: 'OK',
  })
) as jest.Mock;
jest.mock('axios');

const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('商品登録・修正画面', () => {
  it('商品情報を正常に登録できる', async () => {
    render(<ProductEdit />);    
    // fetch モックを設定（正常系）
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          product_code: 'test_code',
          product_name: 'test_name',
          product_description: 'test_description',
          unit_price: 1000,
          tax_rate: 0.1,
        }),
      });

    // 入力フィールドとボタン要素を取得
    const productCodeInput = screen.getByLabelText('商品コード');
    const productNameInput = screen.getByLabelText('商品名');
    const descriptionInput = screen.getByLabelText('説明');
    const unitPriceInput = screen.getByLabelText('単価');
    const taxRateInput = screen.getByLabelText('税率');
    const submitButton = screen.getByRole('button', { name: '登録' });

    // 商品情報を入力
    fireEvent.change(productCodeInput, { target: { value: 'test_code' } });
    fireEvent.change(productNameInput, { target: { value: 'test_name' } });
    fireEvent.change(descriptionInput, { target: { value: 'test_description' } });
    fireEvent.change(unitPriceInput, { target: { value: 1000 } });
    fireEvent.change(taxRateInput, { target: { value: 0.1 } });

    // 登録ボタンをクリック
    fireEvent.click(submitButton);

    // 登録処理が成功したことを確認
    // 例: 画面遷移, 成功メッセージの表示などを確認
    expect(mockRouter.push).toHaveBeenCalledWith('/products');
  });

   it('ヘッダーが表示される', () => {
    render(<ProductEdit />);
    expect(screen.getByRole('header')).toBeInTheDocument();
  });
});"}