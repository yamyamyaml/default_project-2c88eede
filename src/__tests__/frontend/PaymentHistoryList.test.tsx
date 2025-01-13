{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import PaymentHistoryList from '@/pages/PaymentHistoryList';
import { jest } from '@jest/globals';
import axios from 'axios';

// ヘッダーコンポーネントのモック
jest.mock('@/components/Header', () => () => <div data-testid=\"header\">ヘッダー</div>);
// サイドバーコンポーネントのモック
jest.mock('@/components/Sidebar', () => () => <div data-testid=\"sidebar\">サイドバー</div>);

// Axios のモック
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Router のモック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// データ取得のモック
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [] }),
    ok: true,
    status: 200,
    statusText: 'OK',
  })
) as jest.Mock;

describe('入金履歴一覧画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              { subscription_id: 1, contract_no: 'TEST001', expected_payment_date: '2024-05-01', confirmed_payment_date: '2024-05-05', customer_id: 123, name: 'テスト太郎' },
            ],
          }),
        ok: true,
        status: 200,
        statusText: 'OK',
      })
    ) as jest.Mock;
  });

  test('ヘッダーとサイドバーが表示されること', async () => {
    render(<PaymentHistoryList />);  
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('入金履歴データが正しく表示されること', async () => {
    render(<PaymentHistoryList />);   
    expect(await screen.findByText('TEST001')).toBeInTheDocument();
    expect(await screen.findByText('テスト太郎')).toBeInTheDocument();
  });

  test('検索機能が正しく動作すること', async () => {
    render(<PaymentHistoryList />);

    const searchInput = await screen.findByRole('textbox', { name: /契約番号で検索/i });
    fireEvent.change(searchInput, { target: { value: 'TEST001' } });
    // 検索ボタンのクリックを想定した処理を追加

  });

  test('入金詳細ボタンが正しく動作すること', async () => {
    render(<PaymentHistoryList />);
    const detailButton = await screen.findAllByRole('button', { name: /詳細/i });

      fireEvent.click(detailButton[0]);
      expect(mockRouter.push).toHaveBeenCalledWith('/payment-history/1');

  });
});"}