{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import Generate from '@/pages/billing/generate';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('請求書自動生成画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<Generate />); // モック化したコンポーネントをレンダリング
    expect(screen.getByText('請求書自動生成画面')).toBeInTheDocument(); // 画面タイトルが存在することを確認
  });

  it('請求書生成ボタンがクリックされたときにAPIリクエストが送信される', async () => {
    // モックデータ
    const mockResponse = { data: { message: '請求書が生成されました' } };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<Generate />);

    // ボタンクリックをシミュレート
    fireEvent.click(screen.getByText('請求書生成'));

    // APIリクエストが正しいエンドポイントに送信されたことを確認
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/billings', {});

    // 請求書生成成功メッセージが表示されることを確認
    expect(await screen.findByText('請求書が生成されました')).toBeVisible();
  });

  it('キャンセルボタンがクリックされたときに前の画面に戻る', () => {
    render(<Generate />);

    const mockRouter = {
      back: jest.fn()
    };
    jest.mock('next/navigation', () => ({
      useRouter: () => mockRouter,
    }));

    fireEvent.click(screen.getByText('キャンセル'));
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  describe('Header.tsx', () => {
    it('Header コンポーネントが表示される', () => {
      render(<Generate />);
      expect(screen.getByRole('heading', { name: 'ヘッダー' })).toBeInTheDocument();
    });
  });

  describe('SideMenu.tsx', () => {
    it('SideMenu コンポーネントが表示される', () => {
      render(<Generate />);
      expect(screen.getByRole('navigation', { name: 'サイドメニュー' })).toBeInTheDocument();
    });
  });
});
"}