{"code": "import { jest } from '@jest/globals';
import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import RequestHistory from '@/pages/customer/request';

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
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// ヘッダーコンポーネント
const Header = () => <div>ヘッダー</div>;

// サイドメニューコンポーネント
const SideMenu = () => <div>サイドメニュー</div>;

// グローバル変数の設定
declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
      mockNextRouter: typeof mockRouter;
    }
  }
  var mockNextRouter: typeof mockRouter;
  var axios: typeof mockedAxios;
}

global.mockNextRouter = mockRouter;
global.axios = mockedAxios;

// テスト前の共通セットアップ
beforeEach(() => {
  jest.clearAllMocks();
});

describe('特別リクエスト履歴管理画面', () => {
  it('ヘッダーとサイドメニューが表示される', () => {
    render(<RequestHistory />);  
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
  });

  it('データ取得処理が正しく実行される', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ data: [] }),
      ok: true,
    });

    render(<RequestHistory />);

    // データ取得処理の完了を待つ
    await new Promise((resolve) => setTimeout(resolve, 0));  

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/customers'), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('記録ボタンのクリックでリクエストが送信される', async () => {
    render(<RequestHistory />);
    fireEvent.click(screen.getByRole('button', { name: '記録' }));
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});"}