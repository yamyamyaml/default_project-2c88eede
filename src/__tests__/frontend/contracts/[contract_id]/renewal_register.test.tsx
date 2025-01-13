{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import RenewalRegister from '@/pages/contracts/[contract_id]/renewal_register';

// ヘッダーコンポーネント
const Header = () => <header>ヘッダー</header>;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockRouter = {
  push: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/contracts/1',
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockedAxios.get.mockResolvedValue({
    data: {
      subscription_id: 1,
      contract_no: 'TEST001',
      contract_date: '2024-01-01',
      // ... other data
    },
  });
  mockedAxios.post.mockResolvedValue({ data: {} });
});

describe('契約更新登録画面', () => {
  test('初期表示', async () => {
    render(<RenewalRegister />);    
    expect(await screen.findByText('契約更新登録画面')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /契約番号/ })).toBeInTheDocument();
  });

  test('契約情報取得', async () => {
    render(<RenewalRegister />);
    expect(mockedAxios.get).toHaveBeenCalledWith('/api/subscriptions/1');
    expect(await screen.findByRole('textbox', { name: /契約番号/ })).toHaveValue('TEST001');
  });

  test('契約更新登録', async () => {
    render(<RenewalRegister />);
    fireEvent.change(screen.getByRole('textbox', { name: /契約番号/ }), { target: { value: 'TEST002' } });
    fireEvent.click(screen.getByRole('button', { name: /登録/ }));
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/subscriptions', {
      contract_no: 'TEST002',
      // ... other updated data
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/contracts');
  });

  test('ヘッダーコンポーネントが表示される', async () => {
    render(<RenewalRegister />);
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
  });
});"}