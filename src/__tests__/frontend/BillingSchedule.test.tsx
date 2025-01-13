{"code": "import { render, screen, act } from '@testing-library/react';
import BillingSchedule from '@/pages/BillingSchedule';
import { jest } from '@jest/globals';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('@/components/Header', () => () => <div>ヘッダーモック</div>);
jest.mock('@/components/Sidebar', () => () => <div>サイドバーモック</div>);

describe('BillingSchedule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('請求スケジュール一覧が表示されること', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        { pricing_id: 1, subscription_id: 1, set_price: 1000, set_quantity: 1, total_amount: 1000, tax_amount: 100, tax_inclusive_total: 1100 },
        { pricing_id: 2, subscription_id: 2, set_price: 2000, set_quantity: 2, total_amount: 4000, tax_amount: 400, tax_inclusive_total: 4400 },
      ],
    });

    render(<BillingSchedule />);  
    await act(() => Promise.resolve());

    expect(screen.getByText('ヘッダーモック')).toBeInTheDocument();
    expect(screen.getByText('サイドバーモック')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('4000')).toBeInTheDocument();
  });

  it('データ取得エラー時にエラーメッセージが表示されること', async () => {
    mockedAxios.get.mockRejectedValue(new Error('APIエラー'));

    render(<BillingSchedule />);
    await act(() => Promise.resolve());

    expect(screen.getByText('ヘッダーモック')).toBeInTheDocument();
    expect(screen.getByText('サイドバーモック')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('エラーが発生しました。');
  });
});
"}