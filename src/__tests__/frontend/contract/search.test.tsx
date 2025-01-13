{"code": "import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import ContractSearch from '@/pages/contract/search';

// モック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// ヘッダーコンポーネント（モック）
const Header = () => <div>ヘッダー</div>;

// サイドメニューコンポーネント（モック）
const SideMenu = () => <div>サイドメニュー</div>;

describe('契約情報検索画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('コンポーネントが正しくレンダリングされる', async () => {
    render(<ContractSearch />);    
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
    // 画面特有の要素
    expect(screen.getByRole('textbox', { name: /顧客ID/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /検索/i })).toBeInTheDocument();
  });

  it('検索ボタンクリックでAPIがコールされる', async () => {
    const mockResponse = { data: [] };
    axios.get.mockResolvedValue(mockResponse);
    render(<ContractSearch />);
    fireEvent.click(screen.getByRole('button', { name: /検索/i }));
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  // その他のテストケース（入力値の検証、データ取得後の表示など）を追加
});
"}