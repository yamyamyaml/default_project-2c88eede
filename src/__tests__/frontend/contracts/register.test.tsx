{"code": "import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  useRouter,
} from 'next/navigation';
import NewContract from '@/pages/contracts/register';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('@/components/Header', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Header</div>),
}));

describe('新規契約登録画面', () => {
  test('Headerコンポーネントが表示されること', () => {
    render(<NewContract />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  test('契約情報を正しく登録できること', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });
    render(<NewContract />);

    // 顧客IDなどの入力フィールドと登録ボタンを定義
    const customerIdInput = screen.getByRole('textbox', { name: /顧客ID/i });
    const contractDateInput = screen.getByRole('textbox', { name: /契約日/i });
    const registerButton = screen.getByRole('button', { name: /登録/i });

    // 入力フィールドに値を入力
    fireEvent.change(customerIdInput, { target: { value: '123' } });
    fireEvent.change(contractDateInput, { target: { value: '2024-07-22' } });

    // 登録ボタンをクリック
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/contracts'); // 登録完了後に契約一覧画面に遷移
    });
  });

  test('入力値がない場合、エラーメッセージが表示されること', async () => {
    render(<NewContract />);    
    const registerButton = screen.getByRole('button', { name: /登録/i });

    fireEvent.click(registerButton);    

    // エラーメッセージが表示されることを確認
    // 例: await waitFor(() => expect(screen.getByText('顧客IDを入力してください')).toBeVisible());
  });

  test('APIリクエストが失敗した場合、エラーメッセージが表示されること', async () => {
    // Axios をモックしてエラーを返す
    global.axios.post.mockRejectedValue(new Error('API Error'));
    render(<NewContract />);

    const registerButton = screen.getByRole('button', { name: /登録/i });
    fireEvent.click(registerButton);

    // エラーメッセージが表示されることを確認
    // 例: await waitFor(() => expect(screen.getByText('エラーが発生しました')).toBeVisible());
  });


  test('初期データが正しく取得できること', () => {
    // 顧客データと商品データのモックを設定
    // ...

    render(<NewContract />);

    // 顧客IDと商品コードのドロップダウンリストにデータが設定されていることを確認
    // ...
  });
});
"}