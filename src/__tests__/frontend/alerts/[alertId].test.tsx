{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import アラート詳細画面 from '@/pages/alerts/[alertId]';

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: () => '/alerts/1',
  useSearchParams: () => new URLSearchParams(),
}));

const Header = () => <header>ヘッダー</header>;
const Footer = () => <footer>フッター</footer>;

describe('アラート詳細画面', () => {
  const mockAlertData = {
    alert_id: 1,
    alert_type: 'エラー',
    alert_message: 'エラーが発生しました',
    alert_time: '2024-07-20T10:00:00Z',
    status: '未対応',
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (axios.get as jest.Mock).mockResolvedValue({ data: mockAlertData });
  });

  it('アラート詳細情報が表示される', async () => {
    render(
      <アラート詳細画面 />
    );
    await screen.findByText('エラーが発生しました');
    expect(screen.getByText('エラー')).toBeInTheDocument();
    expect(screen.getByText('2024-07-20T10:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('未対応')).toBeInTheDocument();
  });

  it('アラート対応登録ボタンをクリックするとアラート対応登録画面に遷移する', async () => {
    render(
      <アラート詳細画面 />
    );
    await screen.findByText('エラーが発生しました');
    fireEvent.click(screen.getByRole('button', { name: 'アラート対応登録' }));
    expect((useRouter as jest.Mock)().push).toHaveBeenCalledWith('/alert-response/1');
  });

  it('アラート履歴ボタンをクリックするとアラート履歴画面に遷移する', async () => {
    render(
      <アラート詳細画面 />
    );
    await screen.findByText('エラーが発生しました');
    fireEvent.click(screen.getByRole('button', { name: 'アラート履歴' }));
    expect((useRouter as jest.Mock)().push).toHaveBeenCalledWith('/alert-history/1');
  });

  it('ヘッダーとフッターが表示される', async () => {
    render(
      <アラート詳細画面 />
    );
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('フッター')).toBeInTheDocument();
  });
});"}