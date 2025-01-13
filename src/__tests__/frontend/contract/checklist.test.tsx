{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import axios from 'axios';
import ContractChecklist from '@/pages/contract/checklist';

// ヘッダーコンポーネント
const Header = () => <div>Header</div>;

// サイドメニューコンポーネント
const SideMenu = () => <div>SideMenu</div>;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockRouter = {
  push: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockedAxios.get.mockResolvedValue({ data: { subscription_id: '1', contract_no: '123' } });
});

describe('契約チェックリスト生成画面', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<ContractChecklist />);  
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('SideMenu')).toBeInTheDocument();
  });

  it('契約IDを入力してチェックリストが生成される', async () => {
    render(<ContractChecklist />);
    const input = screen.getByLabelText('契約ID') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'SCR-074' } });
    const button = screen.getByText('生成') as HTMLButtonElement;
    fireEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve, 0)); // 非同期処理を待つ

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/subscriptions', { params: { id: 'SCR-074' } });
  });


  it('契約IDがない場合、エラーメッセージが表示される', async () => {
    mockedAxios.get.mockRejectedValue(new Error('契約IDが見つかりません'));
    render(<ContractChecklist />);
    const button = screen.getByText('生成') as HTMLButtonElement;
    fireEvent.click(button);
    await new Promise((resolve) => setTimeout(resolve, 0));

    // エラーメッセージが表示されるか確認
    expect(screen.getByText('契約IDが見つかりません')).toBeVisible();
  });
});"}