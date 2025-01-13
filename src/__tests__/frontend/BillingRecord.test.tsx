{"code": "import { render, screen, act } from '@testing-library/react';
import BillingRecord from '@/pages/BillingRecord';
import { jest } from '@jest/globals';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock('@/components/Header', () => () => <div>Header</div>);
jest.mock('@/components/Sidebar', () => () => <div>Sidebar</div>);

describe('請求書送付記録画面', () => {
  test('ヘッダーとサイドバーが表示されること', async () => {
    render(<BillingRecord />); 
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  test('データが正しくフェッチされ、テーブルに表示されること', async () => {
    const mockData = [
      { subscription_id: '1', contract_no: 'CNTRCT-001', expected_payment_date: '2024-03-15', confirmed_payment_date: '2024-03-16' },
      { subscription_id: '2', contract_no: 'CNTRCT-002', expected_payment_date: '2024-03-22', confirmed_payment_date: '2024-03-23' },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true,
      })
    );

    render(<BillingRecord />);
    await act(() => Promise.resolve());

    expect(screen.getByText('CNTRCT-001')).toBeInTheDocument();
    expect(screen.getByText('CNTRCT-002')).toBeInTheDocument();
    expect(screen.getByText('2024-03-15')).toBeInTheDocument();
    expect(screen.getByText('2024-03-16')).toBeInTheDocument();
    expect(screen.getByText('2024-03-22')).toBeInTheDocument();
    expect(screen.getByText('2024-03-23')).toBeInTheDocument();
  });

  test('データフェッチエラー時にエラーメッセージが表示されること', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject({
        message: 'Fetch Error',
      })
    );

    render(<BillingRecord />);
    await act(() => Promise.resolve());

    expect(screen.getByText('エラーが発生しました。')).toBeInTheDocument();
  });
});"}