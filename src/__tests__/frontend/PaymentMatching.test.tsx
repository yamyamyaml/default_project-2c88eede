{"code": "import { render, screen, fireEvent, act } from '@testing-library/react';
import PaymentMatching from '@/pages/PaymentMatching';
import { jest } from '@jest/globals';

// モック
jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('PaymentMatching コンポーネントのテスト', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('コンポーネントが正常にレンダリングされるか', async () => {
    render(<PaymentMatching />);
    expect(screen.getByText('入金データ消込')).toBeInTheDocument(); // 画面タイトル
  });

  // 入金データのアップロードと消込候補の表示テスト
  it('入金データがアップロードされ、消込候補が表示される', async () => {
    // モックデータ
    const mockData = [
      { subscription_id: '1', contract_no: 'CN-001', expected_payment_date: '2024-07-01', confirmed_payment_date: null },
      { subscription_id: '2', contract_no: 'CN-002', expected_payment_date: '2024-07-15', confirmed_payment_date: null },
    ];

    mockedAxios.get.mockResolvedValue({ data: mockData });

    render(<PaymentMatching />);

    // データの取得を待つ
    await act(async () => {
      // 必要に応じて非同期処理を待つための処理を追加
    });

    expect(screen.getByText('CN-001')).toBeInTheDocument();
    expect(screen.getByText('CN-002')).toBeInTheDocument();
  });

  it('消込承認ボタンがクリックされた際に処理が実行されるか', async () => {
    const mockOnSubmit = jest.fn();
    render(<PaymentMatching onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText('消込承認'));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('エラーメッセージが表示されるか', async () => {
    const mockErrorMessage = 'エラーが発生しました';
    render(<PaymentMatching errorMessage={mockErrorMessage} />);

    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });
});
"}