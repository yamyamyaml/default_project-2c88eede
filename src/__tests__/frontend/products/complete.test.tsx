{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import ProductComplete from '@/pages/products/complete';

describe('ProductComplete Component Test', () => {
  test('商品登録完了画面のレンダリング', () => {
    render(<ProductComplete />); 
    expect(screen.getByText('商品登録が完了しました。')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '商品一覧へ戻る' })).toBeInTheDocument();
  });

  test('商品一覧へ戻るボタンクリック時の遷移', () => {
    render(<ProductComplete />);
    fireEvent.click(screen.getByRole('button', { name: '商品一覧へ戻る' }));
    expect(mockRouter.push).toHaveBeenCalledWith('/products');
  });
});"}