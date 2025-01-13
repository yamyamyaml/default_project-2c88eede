{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import SplitBillingSetting from '@/pages/billing/split/setting';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

const Header = () => <div>ヘッダー</div>;
const SideMenu = () => <div>サイドメニュー</div>;

describe('分割請求設定画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({
      data: {
        subscription_id: '1',
        contract_no: 'TEST20240101',
      },
      status: 200,
      statusText: 'OK',
    });
  });

  it('初期表示の確認', async () => {
    render(<SplitBillingSetting />);    
    expect(await screen.findByText('分割請求設定画面')).toBeInTheDocument();
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
  });

  it('契約ID入力と設定ボタン押しの確認', async () => {
    render(<SplitBillingSetting />);

    const contractIdInput = await screen.findByLabelText('契約ID');
    fireEvent.change(contractIdInput, { target: { value: 'TEST20240102' } });
    expect(contractIdInput).toHaveValue('TEST20240102');

    const submitButton = await screen.findByRole('button', { name: '設定' });
    fireEvent.click(submitButton);

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/subscriptions', {
      params: { contract_no: 'TEST20240102' },
    });
  });
});"}