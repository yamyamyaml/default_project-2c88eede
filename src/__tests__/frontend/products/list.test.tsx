{"code": "import { render, screen, fireEvent, act } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import ProductList from '@/pages/products/list';

// ヘッダーコンポーネント（モック）
const Header = () => <div>ヘッダー</div>;

// サイドメニューコンポーネント（モック）
const SideMenu = () => <div>サイドメニュー</div>;

// モックデータ
const mockProductData = [
  { product_code: 'P001', product_name: '商品A', product_description: '商品Aの説明', unit_price: 100, tax_rate: 0.1 },
  { product_code: 'P002', product_name: '商品B', product_description: '商品Bの説明', unit_price: 200, tax_rate: 0.1 },
];

// Axios のモック設定
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// テスト前の共通セットアップ
beforeEach(() => {
  jest.clearAllMocks();
  mockedAxios.get.mockResolvedValue({ data: mockProductData });
});

describe('ProductList コンポーネントのテスト', () => {
  it('商品リストが正しく表示されるか', async () => {
    render(<ProductList />);
    await act(() => Promise.resolve());

    expect(screen.getByText('商品A')).toBeInTheDocument();
    expect(screen.getByText('商品B')).toBeInTheDocument();
  });

  it('ヘッダーとサイドメニューが表示されるか', async () => {
    render(<ProductList />);
    await act(() => Promise.resolve());

    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
  });

  it('データ取得エラー時の処理', async () => {
    const errorMessage = 'データ取得エラー';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    render(<ProductList />);
    await act(() => Promise.resolve());

    // エラーメッセージが表示されるか確認
    expect(screen.getByText(errorMessage)).toBeInTheDocument();

  });
});"}