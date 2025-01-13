{"code": "import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContractCheckList from '@/pages/contracts/checklist';

describe('契約チェックリスト画面', () => {
  test('契約チェックリストが表示されること', async () => {
    const mockData = [{
      subscription_id: 1,
      contract_no: 'TEST-001',
      contract_date: '2024-01-01',
      customer_id: 123,
      product_code: 'PROD-001',
      start_issue_no: '1',
      end_issue_no: '12',
      total_issues: 12,
      sent_issues: 0,
      remaining_issues: 12,
      last_sent_issue_no: null,
      continuation_flag: true,
      application_method: 'WEB',
      payment_method: 'クレジットカード',
      contract_pattern: '年間',
      expected_payment_date: '2024-01-15',
      confirmed_payment_date: null,
      cancellation_type: null,
      gift_shipping_flag: false,
      renewal_notice_flag: false,
    }];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
        ok: true,
        status: 200,
        statusText: 'OK',
      })
    ) as jest.Mock;

    render(<ContractCheckList />);    
    await waitFor(() => expect(screen.getByText('TEST-001')).toBeInTheDocument());
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('PROD-001')).toBeInTheDocument();
  });

  test('Headerコンポーネントが表示されること', async () => {
    render(<ContractCheckList />);    
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

});
"}