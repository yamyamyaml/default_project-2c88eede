{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import ShippingComplete from '@/pages/shipping/complete';

describe('発送リスト出力完了画面', () => {
  test('完了メッセージが表示されること', () => {
    render(<ShippingComplete />);
    expect(screen.getByText('発送リストの出力が完了しました。')).toBeInTheDocument();
  });

  test('メニューへ戻るボタンが表示され、クリックするとメニュー画面へ遷移すること', () => {
    render(<ShippingComplete />);
    const menuButton = screen.getByRole('button', { name: 'メニューへ戻る' });
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(mockRouter.push).toHaveBeenCalledWith('/menu'); // メニュー画面へのパス
  });

  describe('Header.tsx', () => {
    test('Headerが表示されること', () => {
      render(<ShippingComplete />);
      // Header.tsx の特定の要素を getByRole などで取得し、存在を確認
      expect(screen.getByRole('heading', { name: '共通ヘッダー' })).toBeInTheDocument(); // 例：ヘッダーに表示されるタイトル
    });
  });

  describe('Footer.tsx', () => {
    test('Footerが表示されること', () => {
      render(<ShippingComplete />);
      // Footer.tsx の特定の要素を getByRole などで取得し、存在を確認
      expect(screen.getByText('©️ 2023 会社名')).toBeInTheDocument(); // 例：フッターに表示される著作権情報
    });
  });
});"}