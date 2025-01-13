{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import RegisterResponse from '@/pages/alerts/[alertId]/registerResponse';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

jest.mock('next/navigation');
jest.mock('axios');

// モックデータ
const mockAlertData = {
  alert_id: '1',
  alert_type: 'error',
  alert_message: 'エラーが発生しました',
  alert_time: '2024-07-24 10:00:00',
  status: 'open',
};

// Axios のモック設定
axios.get.mockResolvedValue({ data: mockAlertData });
axios.post.mockResolvedValue({ status: 200 });

describe('アラート対応登録画面', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('コンポーネントが正しくレンダリングされる', async () => {
    render(
      <RegisterResponse params={{ alertId: '1' }} />
    );

    // HeaderとFooterが表示されているか確認
    expect(screen.getByRole('heading', { name: 'ヘッダー' })).toBeInTheDocument(); // HeaderのテストID
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // FooterのテストID

    // アラート情報が表示されているか確認
    expect(await screen.findByText('エラーが発生しました')).toBeVisible();

    // フォームとボタンが表示されているか確認
    expect(screen.getByRole('textbox', { name: '対応内容' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '登録' })).toBeInTheDocument();
  });

  it('対応内容を入力して登録ボタンをクリックするとAPIが呼び出される', async () => {
    render(
        <RegisterResponse params={{ alertId: '1' }} />
    );

    const responseInput = screen.getByRole('textbox', { name: '対応内容' });
    const registerButton = screen.getByRole('button', { name: '登録' });

    fireEvent.change(responseInput, { target: { value: '対応完了' } });
    fireEvent.click(registerButton);

    // API 呼び出しの確認
    expect(axios.post).toHaveBeenCalledWith('/api/alerts/1/responses', {
      response_text: '対応完了',
    });

    // 登録完了後のリダイレクト
    expect(useRouter().push).toHaveBeenCalledWith('/alerts');
  });
});"}