{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import CSVComplete from '@/pages/products/csvcomplete';

describe('CSVComplete Component Test', () => {
  test('CSV出力完了画面 renders correctly', () => {
    render(<CSVComplete />);
    expect(screen.getByText('CSV出力が完了しました。')).toBeInTheDocument();
    expect(screen.getByText('商品一覧へ戻る')).toBeInTheDocument();
  });

  test('商品一覧へ戻る button navigates to product list', () => {
    render(<CSVComplete />);
    const router = require('next/navigation').useRouter(); /* eslint-disable-line */
    fireEvent.click(screen.getByText('商品一覧へ戻る'));
    expect(router.push).toHaveBeenCalledWith('/products');
  });
});"}