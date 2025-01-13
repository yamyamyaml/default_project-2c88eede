{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import Resend from '@/pages/shipping/resend';
import Header from '@/components/common/Header'; // Headerコンポーネントをインポート

// モック
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('再発送指示画面', () => {
  it('Headerコンポーネントが表示されること', () => {
    render(<Resend />); // HeaderコンポーネントはResendコンポーネント内でレンダリングされる
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Headerコンポーネントの存在確認
  });

  it('発送IDの入力ができること', () => {
    render(<Resend />);
    const inputElement = screen.getByLabelText('発送ID');
    fireEvent.change(inputElement, { target: { value: '12345' } });
    expect(inputElement).toHaveValue('12345');
  });

  it('再発送ボタンをクリックすると、再発送処理が実行されること', async () => {
    render(<Resend />);
    const buttonElement = screen.getByRole('button', { name: '再発送' });
    fireEvent.click(buttonElement);
    // 再発送処理のロジックをテスト
    // 例: API呼び出しのモックなどを使い、期待する動作が行われることを確認
  });

  // その他のテストケース (バリデーション、エラー処理など)
});"}