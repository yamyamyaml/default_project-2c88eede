{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import CustomerRegister from '@/pages/customer/register';

// Fetch のモック
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    ok: true,
    status: 200,
    statusText: 'OK',
  })
) as jest.Mock;

// Axios のモック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Router のモック
const mockRouter = {
  push: jest.fn(),
  prefetch: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
}));

// ヘッダーコンポーネント（モック）
const Header = () => <div>Header</div>;
// サイドメニューコンポーネント（モック）
const SideMenu = () => <div>SideMenu</div>;

global.mockRouter = mockRouter;
global.axios = mockedAxios;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('顧客情報登録・修正画面', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<CustomerRegister />);  
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('SideMenu')).toBeInTheDocument();
  });

  it('顧客情報を登録できる', async () => {
    render(<CustomerRegister />);
    // 入力フィールドとボタンを取得
    const nameInput = screen.getByRole('textbox', { name: /氏名/i });
    const submitButton = screen.getByRole('button', { name: /登録/i });

    // 顧客情報を入力
    fireEvent.change(nameInput, { target: { value: '山田太郎' } });

    // 登録ボタンをクリック
    fireEvent.click(submitButton);

    // Axios の post メソッドが呼ばれたことを確認
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  //it('顧客情報を修正できる', async () => {
    // TODO: 修正機能の実装後にテストを追加
  //});
});"}