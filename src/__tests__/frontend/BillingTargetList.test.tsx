{"code": "import { render, screen, act, fireEvent } from '@testing-library/react';
import BillingTargetList from '@/pages/BillingTargetList';
import { jest } from '@jest/globals';

// モック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

const Header = () => <div>Header</div>;
const Sidebar = () => <div>Sidebar</div>;

describe('BillingTargetList', () => {
  test('HeaderとSidebarが表示される', () => {
    render(<BillingTargetList />);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  test('データ取得', async () => {
    const mockData = [{
      subscription_id: '1',
      customer_id: '1',
      contract_no: '001',
      start_issue_no: '1',
      end_issue_no: '12',
      total_issues: 12,
      sent_issues: 0,
      remaining_issues: 12,
      contract_pattern: 'monthly',
    }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true
      })
    ) as jest.Mock;

    render(<BillingTargetList />);
    await act(() => Promise.resolve());

    expect(screen.getByText('001')).toBeInTheDocument();
  });

  test('検索機能', async () => {
    render(<BillingTargetList />);    
    const searchInput = screen.getByRole('textbox', { name: /契約番号で検索/i });
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });

  test('ボタンクリックで画面遷移', async () => {
    render(<BillingTargetList />);
    const button = screen.getByRole('button', { name: /請求書プレビュー/i });
    fireEvent.click(button);
    expect(mockRouter.push).toHaveBeenCalled();
  });
});
"}