{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import 定期元帳出力条件画面 from '@/pages/report/ledger';

// ヘッダーコンポーネント
const Header = () => <header>ヘッダー</header>;

// サイドメニューコンポーネント
const SideMenu = () => <nav>サイドメニュー</nav>;

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Router モック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// テスト前の共通セットアップ
beforeEach(() => {
  jest.clearAllMocks();
  mockedAxios.get.mockResolvedValue({ data: {} });
});

describe('定期元帳出力条件画面', () => {
  it('コンポーネントが正常にレンダリングされる', () => {
    render(<定期元帳出力条件画面 />);  
    expect(screen.getByText('定期元帳出力条件画面')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ヘッダー' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'サイドメニュー' })).toBeInTheDocument();
  });

  it('ダウンロードボタンクリックでダウンロード画面へ遷移', async () => {
    render(<定期元帳出力条件画面 />);
    fireEvent.click(screen.getByText('ダウンロード'));
    expect(mockRouter.push).toHaveBeenCalledWith('/download');
  });
});"}