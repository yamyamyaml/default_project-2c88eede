{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import ShippingOutput from '@/pages/reports/shipping_output';

// ヘッダーコンポーネントのモック
jest.mock('@/components/common/Header', () => {
  return () => <div>Header Mock</div>;
});

// Axios のモック設定
const mockedAxios = axios as jest.Mocked<typeof axios>;
beforeEach(() => {
  mockedAxios.get.mockResolvedValue({ data: [] });
});

describe('発送データ出力画面', () => {
  test('コンポーネントがレンダリングされる', () => {
    render(<ShippingOutput />);  // モックヘッダーとモックデータを使用
    expect(screen.getByText('Header Mock')).toBeInTheDocument(); // モックヘッダーが表示される
  });

  test('出力ボタンクリックでデータ取得が実行される', async () => {
    render(<ShippingOutput />); // モックヘッダーとモックデータを使用

    // 出力ボタンクリックをシミュレート
    fireEvent.click(screen.getByRole('button', { name: /出力/ }));

    // モック関数が呼ばれたことを確認
    expect(mockedAxios.get).toHaveBeenCalled();
  });
});"}