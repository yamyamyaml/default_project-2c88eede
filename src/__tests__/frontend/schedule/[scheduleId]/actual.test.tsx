{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import Actual from '@/pages/schedule/[scheduleId]/actual';

// ヘッダーコンポーネント（モック）
const Header = ({ children }: { children: React.ReactNode }) => <header>{children}</header>;
// サイドメニューコンポーネント（モック）
const SideMenu = ({ children }: { children: React.ReactNode }) => <aside>{children}</aside>;

describe('発行実績登録画面', () => {
  // モック
  const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: jest.fn(),
      back: jest.fn(),
    }));
    fetch.mockResolvedValueOnce({
      json: async () => ({
        schedule_id: '1',
        issue_no: '1',
        scheduled_date: '2024-05-01',
        actual_date: '2024-05-01',
        is_sent: true,
      }),
    });
  });

  it('コンポーネントが正しくレンダリングされる', async () => {
    render(
      <Actual params={{ scheduleId: '1' }} />
    );
    expect(await screen.findByText('発行実績登録画面')).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /登録/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /キャンセル/i })).toBeInTheDocument();
  });

  it('ヘッダーとサイドメニューが表示される', async () => {
    render(
      <Actual params={{ scheduleId: '1' }} />
    );
    expect(screen.getByRole('header')).toBeInTheDocument();
    expect(screen.getByRole('aside')).toBeInTheDocument();
  });

  it('登録ボタンのクリックでデータが送信される', async () => {
    render(
      <Actual params={{ scheduleId: '1' }} />
    );
    const actualDateInput = await screen.findByLabelText('発行日');
    fireEvent.change(actualDateInput, { target: { value: '2024-05-02' } });
    const sentCheckbox = await screen.findByLabelText('発送完了');
    fireEvent.click(sentCheckbox);

    fetch.mockResolvedValueOnce({
      json: async () => ({
        message: '登録しました',
      }),
    });
    const registerButton = await screen.findByRole('button', { name: /登録/i });
    fireEvent.click(registerButton);
    expect(fetch).toHaveBeenCalledWith('/api/schedule/1/actual', {
      method: 'POST',
      body: JSON.stringify({ actual_date: '2024-05-02', is_sent: true }),
    });
  });

  it('キャンセルボタンのクリックで前の画面に戻る', async () => {
    render(<Actual params={{ scheduleId: '1' }} />);    const backButton = await screen.findByRole('button', { name: /キャンセル/i });
    fireEvent.click(backButton);
    const router = useRouter.getMockImplementation()();
    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it('エラーメッセージが表示される', async () => {
    fetch.mockRejectedValueOnce(new Error('エラーが発生しました'));

    render(<Actual params={{ scheduleId: '1' }} />);
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument();
  });
});"}