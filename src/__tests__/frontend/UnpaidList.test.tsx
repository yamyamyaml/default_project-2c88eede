{"code": "import { jest } from '@jest/globals';
import axios from 'axios';
import { render, screen, act } from '@testing-library/react';
import UnpaidList from '@/pages/UnpaidList';

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

describe('未入金一覧画面', () => {
  it('ヘッダーとサイドバーが表示されること', async () => {
    render(<UnpaidList />);    
    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByRole('navigation')).toBeTruthy();
  });

  it('データ取得処理が正常に完了すること', async () => {
    const mockData = [{
      subscription_id: 1,
      contract_no: 'TEST001',
      expected_payment_date: '2024-05-20',
      confirmed_payment_date: null,
      customer_id: 101,
      name: 'テスト太郎',
    }];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
      ok: true,
    });

    render(<UnpaidList />);
    await act(() => Promise.resolve());

    expect(screen.getByText('TEST001')).toBeInTheDocument();
    expect(screen.getByText('テスト太郎')).toBeInTheDocument();
  });

  it('入金データ消込ボタンがクリックできること', async () => {
    render(<UnpaidList />);
    await act(() => Promise.resolve());

    const button = screen.getByText('入金データ消込');
    expect(button).toBeInTheDocument();

    act(() => {
      button.click();
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/PaymentMatching'); 
  });
});"}