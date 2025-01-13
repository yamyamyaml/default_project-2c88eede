{"code": "import { jest } from '@jest/globals';
import axios from 'axios';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SpecialBillingSetting from '@/pages/SpecialBillingSetting';

// モック
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => mockRouter),
}));

const mockRouter = {
  push: jest.fn(),
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
global.axios = mockedAxios;

// ヘッダーコンポーネント
const Header = () => <header>ヘッダー</header>;

// サイドバーコンポーネント
const Sidebar = () => <aside>サイドバー</aside>;

describe('特別請求設定画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({ data: [] });
    mockedAxios.post.mockResolvedValue({ data: [] });
  });

  it('初期表示', async () => {
    render(<SpecialBillingSetting />);  
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドバー')).toBeInTheDocument();
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/subscriptions', {
        params: { subscriptionId: undefined },
    });
  });

  it('契約ID入力', async () => {
    render(<SpecialBillingSetting />);
    const contractIdInput = screen.getByLabelText('契約ID') as HTMLInputElement;
    fireEvent.change(contractIdInput, { target: { value: 'test-id' } });
    expect(contractIdInput.value).toBe('test-id');
  });

  it('特別請求設定保存', async () => {
    render(<SpecialBillingSetting />);
    const saveButton = screen.getByRole('button', { name: '保存' });
    fireEvent.click(saveButton);
    expect(mockedAxios.post).toHaveBeenCalled();
  });

  it('請求スケジュール設定表示', async () => {
    render(<SpecialBillingSetting />);
    // 請求スケジュール設定の表示確認
    expect(screen.getByText('請求スケジュール設定')).toBeInTheDocument();
  });

});
"}