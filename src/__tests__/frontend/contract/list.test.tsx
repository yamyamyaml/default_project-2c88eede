{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import ContractList from '@/pages/contract/list';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// ヘッダーコンポーネント（モック）
const Header = () => <div>ヘッダー</div>;

// サイドメニューコンポーネント（モック）
const SideMenu = () => <div>サイドメニュー</div>;

describe('契約情報一覧画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({
      data: [
        { customer_id: 1, customer_code: 'C001', name: '顧客A', subscription_id: 101, contract_no: 'CN001', contract_date: '2024-01-01', product_code: 'P001' },
        { customer_id: 2, customer_code: 'C002', name: '顧客B', subscription_id: 102, contract_no: 'CN002', contract_date: '2024-02-15', product_code: 'P002' },
      ],
    });
  });

  it('契約情報が正しく表示されること', async () => {
    render(<ContractList />); // テスト対象コンポーネント
    await screen.findByText('顧客A');
    await screen.findByText('CN001');
    await screen.findByText('2024-01-01');
    await screen.findByText('P001');
    await screen.findByText('顧客B');
    await screen.findByText('CN002');
    await screen.findByText('2024-02-15');
    await screen.findByText('P002');
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
  });

  it('データ取得エラー時にエラーメッセージが表示されること', async () => {
    mockedAxios.get.mockRejectedValue(new Error('データ取得エラー'));
    render(<ContractList />);
    await screen.findByText('データ取得エラー');
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
  });
});"}