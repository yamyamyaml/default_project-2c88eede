{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import AlertHistory from '@/pages/alerts/[alertId]/alertHistory';
import { jest } from '@jest/globals';

// モック
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
jest.mock('axios');

describe('アラート履歴画面', () => {
  const sampleAlertHistoryData = [
    { alert_id: '1', response_text: '対応1', response_time: '2024-07-20 10:00:00', response_user: 'user1' },
    { alert_id: '1', response_text: '対応2', response_time: '2024-07-20 11:00:00', response_user: 'user2' },
  ];

  beforeEach(() => {
    // axios のモック設定
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: sampleAlertHistoryData,
    });
  });

  it('アラート履歴一覧が表示されること', async () => {
    render(<AlertHistory />); // モックデータをAlertHistoryコンポーネントに渡す
    expect(await screen.findByText('アラート対応履歴一覧')).toBeInTheDocument();
    // モックデータに基づいて期待する要素が存在することを検証
    expect(await screen.findByText('対応1')).toBeInTheDocument();
    expect(await screen.findByText('対応2')).toBeInTheDocument();
  });

  it('HeaderとFooterが表示されること', async () => {
    render(<AlertHistory />);
    expect(screen.getByRole('heading')).toBeInTheDocument(); // Headerの存在確認
    expect(screen.getByText(/© 2024定期購読管理システム/i)).toBeInTheDocument(); // Footerの存在確認
  });

  // エラーハンドリングのテスト
  it('データ取得エラー時にエラーメッセージが表示されること', async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error('データ取得エラー'));
    render(<AlertHistory />);
    expect(await screen.findByText('データ取得エラー')).toBeInTheDocument();
  });
});
"}