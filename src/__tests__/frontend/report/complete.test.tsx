{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ReportComplete from '@/pages/report/complete';

jest.mock('next/navigation');

// ヘッダーコンポーネントのモック
jest.mock('@/components/Header', () => () => <div data-testid=\"header\">Header</div>);

// サイドメニューコンポーネントのモック
jest.mock('@/components/SideMenu', () => () => <div data-testid=\"side-menu\">SideMenu</div>);

describe('ReportComplete Component', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('renders the component correctly', () => {
    render(<ReportComplete />);

    expect(screen.getByText('レポート出力完了')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'メニューへ' })).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('side-menu')).toBeInTheDocument();
  });

  it('navigates to the menu page when the button is clicked', () => {
    render(<ReportComplete />);

    fireEvent.click(screen.getByRole('button', { name: 'メニューへ' }));

    expect(mockRouterPush).toHaveBeenCalledWith('/menu');
  });
});"}