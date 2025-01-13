{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import ShippingMain from '@/pages/shipping/index';

describe('発送管理メイン画面 コンポーネントテスト', () => {
  test('コンポーネントが正しくレンダリングされるか', () => {
    render(<ShippingMain />); 
    expect(screen.getByText('発送管理メイン画面')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /発送リスト生成/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /未発送リスト確認/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /再発送指示/ })).toBeInTheDocument();
  });

  test('ボタンクリックで画面遷移が正しく行われるか', () => {
    render(<ShippingMain />);

    fireEvent.click(screen.getByRole('button', { name: /発送リスト生成/ }));
    expect(mockRouter.push).toHaveBeenCalledWith('/shipping/create');

    fireEvent.click(screen.getByRole('button', { name: /未発送リスト確認/ }));
    expect(mockRouter.push).toHaveBeenCalledWith('/shipping/unshipped');

    fireEvent.click(screen.getByRole('button', { name: /再発送指示/ })).toHaveBeenCalledWith('/shipping/resend');
  });

  test('Header, Footer コンポーネントが表示されるか', () => {
      render(<ShippingMain />);
      // HeaderとFooterコンポーネントの内容を特定できる要素が存在することを確認
      expect(screen.getByText('共通ヘッダー')).toBeInTheDocument();
      expect(screen.getByText('共通フッター')).toBeInTheDocument();
    });
});
"}