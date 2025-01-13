{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import CustomerNew from '@/pages/customers/new';

// Fetch のモック
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
  text: () => Promise.resolve(''),
  ok: true,
  status: 200,
  statusText: 'OK',
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

describe('顧客新規登録画面', () => {
  it('各入力項目が表示されること', () => {
    render(<CustomerNew />);

    expect(screen.getByRole('textbox', { name: /氏名/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /フリガナ/i })).toBeInTheDocument();
    // ... その他の入力項目についても同様のテストを追加
  });

  it('登録ボタンがクリックされた際にデータが送信されること', async () => {
    render(<CustomerNew />);

    const submitButton = screen.getByRole('button', { name: /登録/i });
    fireEvent.click(submitButton);

    // Axios の post メソッドが期待通りの引数で呼び出されていることを確認
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/customers', expect.any(Object));
  });

  // ... その他のテストケース（バリデーション、エラー処理など）を追加
});
"}