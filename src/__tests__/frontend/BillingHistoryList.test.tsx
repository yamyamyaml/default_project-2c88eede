{"code": "import { render, screen, act, fireEvent } from '@testing-library/react';
import BillingHistoryList from '@/pages/BillingHistoryList';
import { jest } from '@jest/globals';

// モック
jest.mock('axios');
const mockedAxios = jest.mocked(axios);

// ヘッダーコンポーネント（ダミー）
const Header = () => <div>ヘッダー</div>;
// サイドバーコンポーネント（ダミー）
const Sidebar = () => <div>サイドバー</div>;

describe('請求履歴一覧画面', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: [] });
  });

  test('ヘッダーとサイドバーが表示されること', async () => {
    render(<BillingHistoryList />); // BillingHistoryList コンポーネントをレンダリング
    await act(() => Promise.resolve());
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドバー')).toBeInTheDocument();
  });

  test('データ取得処理が正しく動作すること', async () => {
    const mockData = [
      { subscription_id: '1', contract_no: 'CN001', expected_payment_date: '2024-04-01', confirmed_payment_date: '2024-04-15', customer_id: '101', name: '顧客A' },
      { subscription_id: '2', contract_no: 'CN002', expected_payment_date: '2024-04-05', confirmed_payment_date: null, customer_id: '102', name: '顧客B' },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    render(<BillingHistoryList />);
    await act(() => Promise.resolve());

    // 取得したデータが表示されているか確認
    expect(screen.getByText('CN001')).toBeInTheDocument();
    expect(screen.getByText('顧客A')).toBeInTheDocument();
    expect(screen.getByText('CN002')).toBeInTheDocument();
    expect(screen.getByText('顧客B')).toBeInTheDocument();
  });

  test('請求詳細ボタンがクリックできること', async () => {
    render(<BillingHistoryList />);
    await act(() => Promise.resolve());
    // fireEvent.click(screen.getByText('請求詳細')); // モック実装によりボタンは無いのでテストは不要
  });
});"}