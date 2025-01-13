{"code": "import { render, screen, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ContractDetail from '@/pages/contracts/[contract_id]';

jest.mock('next/navigation');
jest.mock('axios');

// モックデータ
const mockContractData = {
  subscription_id: 1,
  contract_no: 'C-001',
  contract_date: '2024-01-15',
  customer_id: 101,
  customer_name: 'テスト顧客',
  product_code: 'PROD-001',
  start_issue_no: '1',
  end_issue_no: '12',
  total_issues: 12,
  sent_issues: 0,
  remaining_issues: 12,
  last_sent_issue_no: null,
  continuation_flag: true,
  application_method: 'Web',
  payment_method: 'クレジットカード',
  contract_pattern: '月額',
  expected_payment_date: '2024-02-10',
  confirmed_payment_date: null,
  cancellation_type: null,
  gift_shipping_flag: false,
  renewal_notice_flag: false,
};

// ヘッダーコンポーネントのモック
const Header = () => <div>ヘッダー</div>;

describe('契約詳細画面', () => {
  beforeEach(() => {
    // Router のモック設定
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
    });

    // Axios のモック設定
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mockContractData,
      ok: true,
    } as Response);
  });

  it('契約詳細情報が正しく表示されること', async () => {
    await act(async () => render(<ContractDetail params={{ contract_id: '1' }} />));

    expect(screen.getByText('契約番号：C-001')).toBeInTheDocument();
    expect(screen.getByText('契約日：2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('顧客名：テスト顧客')).toBeInTheDocument();
    // ... その他の契約詳細情報の確認
  });

  it('ヘッダーが表示されること', async () => {
    render(<ContractDetail params={{ contract_id: '1' }} />);
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
  });

  // ... その他のテストケース（ボタンの動作確認など）
});
"}