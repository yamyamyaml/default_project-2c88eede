{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import PaymentDetail from '@/pages/PaymentDetail';
import { jest } from '@jest/globals';

// ヘッダーコンポーネントのモック
jest.mock('@/components/Header', () => () => <div>ヘッダーモック</div>);

// サイドバーコンポーネントのモック
jest.mock('@/components/Sidebar', () => () => <div>サイドバーモック</div>);

describe('入金詳細画面', () => {
  const mockData = {
    subscription_id: '1',
    contract_no: 'TEST-001',
    expected_payment_date: '2024-05-30',
    confirmed_payment_date: '2024-06-01',
    customer_id: '101',
    name: 'テスト太郎',
  };

  beforeEach(() => {
    // fetchのモックを設定
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true,
      })
    ) as jest.Mock;
  });

  it('入金詳細情報が表示されること', async () => {
    render(<PaymentDetail />); // PaymentDetail コンポーネントをレンダリング

    // データが画面に表示されていることを確認
    expect(await screen.findByText('契約番号: TEST-001')).toBeInTheDocument();
    expect(await screen.findByText('入金予定日: 2024-05-30')).toBeInTheDocument();
    expect(await screen.findByText('入金確認日: 2024-06-01')).toBeInTheDocument();
    expect(await screen.findByText('顧客ID: 101')).toBeInTheDocument();
    expect(await screen.findByText('名前: テスト太郎')).toBeInTheDocument();

    // ヘッダーとサイドバーが表示されていることを確認
    expect(screen.getByText('ヘッダーモック')).toBeInTheDocument();
    expect(screen.getByText('サイドバーモック')).toBeInTheDocument();
  });

  it('fetchが失敗した場合エラーメッセージが表示されること', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Fetch Error'))
    ) as jest.Mock;

    render(<PaymentDetail />);

    // エラーメッセージが表示されていることを確認
    expect(await screen.findByText('エラーが発生しました。')).toBeInTheDocument();
  });
});"}