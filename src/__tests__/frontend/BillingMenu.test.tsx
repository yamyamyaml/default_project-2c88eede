{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import BillingMenu from '@/pages/BillingMenu';
import { jest } from '@jest/globals';

describe('BillingMenu Component Test', () => {
  // モック
  const mockPush = jest.fn();

  beforeEach(() => {
    // モック関数のクリア
    mockPush.mockClear();
    // next/router のモック
    global.mockNextRouter = {
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    }
  });

  const Header = () => <header>ヘッダー</header>;
  const Sidebar = () => <aside>サイドバー</aside>;

  it('請求対象一覧ボタンのテスト', () => {
    render(<BillingMenu />);    
    fireEvent.click(screen.getByText('請求対象一覧'));
    expect(mockPush).toHaveBeenCalledWith('/BillingList');
  });

  it('未入金一覧ボタンのテスト', () => {
    render(<BillingMenu />);
    fireEvent.click(screen.getByText('未入金一覧'));
    expect(mockPush).toHaveBeenCalledWith('/UnpaidList');
  });

  it('請求履歴一覧ボタンのテスト', () => {
    render(<BillingMenu />);
    fireEvent.click(screen.getByText('請求履歴一覧'));
    expect(mockPush).toHaveBeenCalledWith('/BillingHistory');
  });

  it('HeaderとSidebarが表示されるか確認', () => {
    render(<><Header /><BillingMenu /><Sidebar /></>);
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドバー')).toBeInTheDocument();
  });
});
"}