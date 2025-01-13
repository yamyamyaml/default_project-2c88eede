{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import ProductCSV from '@/pages/product/csv';

describe('商品CSV出力画面', () => {
  test('HeaderとSideMenuコンポーネントが表示される', () => {
    render(<ProductCSV />);  
    expect(screen.getByRole('heading', { name: 'ヘッダー' })).toBeInTheDocument(); // Header.tsx
    expect(screen.getByRole('navigation', { name: 'サイドメニュー' })).toBeInTheDocument(); // SideMenu.tsx
  });

  test('ダウンロードボタンのクリックでCSVダウンロード処理が開始される', async () => {
    // モック関数
    const mockDownloadCSV = jest.fn();
    render(<ProductCSV downloadCSV={mockDownloadCSV} />); 
    fireEvent.click(screen.getByRole('button', { name: 'ダウンロード' }));
    expect(mockDownloadCSV).toHaveBeenCalledTimes(1);
  });

  test('CSVダウンロード処理中のローディング表示', () => {
    // モック関数
    let isLoading = true;
    const setIsLoading = (value: boolean) => {
      isLoading = value;
    };
    render(<ProductCSV isLoadingCSV={isLoading} setIsLoadingCSV={setIsLoading} />); 
    expect(screen.getByRole('progressbar', { name: '処理中...' })).toBeInTheDocument();

    isLoading = false;
    render(<ProductCSV isLoadingCSV={isLoading} setIsLoadingCSV={setIsLoading} />); 
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument(); // ローディング表示が消えている
  });

  test('エラーメッセージが表示される', () => {
    const errorMessage = 'エラーが発生しました。';
    render(<ProductCSV downloadError={errorMessage} />);
    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
  });


  describe('出力条件設定フォーム', () => {
    test('商品IDの入力', () => {
      render(<ProductCSV />);
      const productIdInput = screen.getByLabelText('商品ID');
      fireEvent.change(productIdInput, { target: { value: '123' } });
      expect(productIdInput).toHaveValue('123');
    });

    test('商品名の入力', () => {
      render(<ProductCSV />);
      const productNameInput = screen.getByLabelText('商品名');
      fireEvent.change(productNameInput, { target: { value: 'テスト商品' } });
      expect(productNameInput).toHaveValue('テスト商品');
    });
  });
});"}