{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import SpecialBillingManagementScreen from '@/pages/billing/special/manage';

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

// Router のモック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// グローバル変数の設定
declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
      mockRouter: typeof mockRouter;
    }
  }
  var mockRouter: typeof mockRouter;
}

global.mockRouter = mockRouter;

// コンポーネント
const Header = () => <div>ヘッダー</div>;
const SideMenu = () => <div>サイドメニュー</div>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('特別請求管理画面', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<SpecialBillingManagementScreen />);    
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
  });

  it('データ取得処理が正しく実行される', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ subscription_id: '1', contract_no: 'CN001' }),
    });

    render(<SpecialBillingManagementScreen />);

    // データ取得を待つ
    await screen.findByText('契約番号: CN001');

    expect(global.fetch).toHaveBeenCalledWith('/api/subscriptions?items=subscription_id,contract_no');
  });


  it('設定ボタンのクリックで post リクエストが送信される', async () => {
    mockedAxios.post.mockResolvedValue({ data: {} });

    render(<SpecialBillingManagementScreen />);
    fireEvent.click(screen.getByRole('button', { name: '設定' }));

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});
"}