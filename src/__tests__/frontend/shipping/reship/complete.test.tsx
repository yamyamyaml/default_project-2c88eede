{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import Complete from '@/pages/shipping/reship/complete';

// モック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

describe('再発送指示完了画面', () => {
  it('完了メッセージが表示されること', () => {
    render(<Complete />);
    expect(screen.getByText('再発送指示が完了しました。')).toBeInTheDocument();
  });

  it('メニューへ戻るボタンをクリックするとメニュー画面へ遷移すること', () => {
    render(<Complete />);
    const button = screen.getByRole('button', { name: 'メニューへ戻る' });
    fireEvent.click(button);
    expect(mockRouter.push).toHaveBeenCalledWith('/shipping/menu'); // 遷移先のパス
  });

  describe('Header コンポーネント', () => {
    it('Header コンポーネントが表示されること', () => {
      render(<Complete />);
      // Header コンポーネントの内容に応じて適切な検証を行う
      expect(screen.getByRole('heading', { name: 'ヘッダー' })).toBeInTheDocument(); // 例
    });
  });

  describe('Footer コンポーネント', () => {
    it('Footer コンポーネントが表示されること', () => {
      render(<Complete />);
      // Footer コンポーネントの内容に応じて適切な検証を行う
      expect(screen.getByText('フッター')).toBeInTheDocument(); // 例
    });
  });
});
"}