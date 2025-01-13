{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import CustomerList from '@/pages/customers/list';

// Fetch のモック
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
  text: () => Promise.resolve(\"\"),
  ok: true,
  status: 200,
  statusText: \"OK\",
})) as jest.Mock;

// Axios のモック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Router のモック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// ヘッダーコンポーネントのモック
jest.mock('@/components/Header', () => () => <div data-testid=\"header-mock\">ヘッダーモック</div>);

describe('顧客一覧画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.get.mockResolvedValue({ data: [] });
  });

  it('ヘッダーが表示されること', async () => {
    render(<CustomerList />);  
    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
  });

  it('顧客データがAPIから取得され、表示されること', async () => {
    const mockData = [
      { customer_id: 1, name: '顧客A', phone: '090-1234-5678', email: 'a@example.com' },
      { customer_id: 2, name: '顧客B', phone: '090-9876-5432', email: 'b@example.com' },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    render(<CustomerList />);

    expect(mockedAxios.get).toHaveBeenCalledWith('/api/customers');

    // APIレスポンス後のレンダリングを待つ
    await screen.findByText('顧客A');
    await screen.findByText('顧客B');
  });

  it('エラーが発生した場合、エラーメッセージが表示されること', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('APIエラー'));

    render(<CustomerList />);
    await screen.findByText('エラーが発生しました。');
  });

// 追加：検索機能のテスト
it('顧客名を検索できること', async () => {
    const mockData = [
      { customer_id: 1, name: '顧客A', phone: '090-1234-5678', email: 'a@example.com' },
      { customer_id: 2, name: '顧客B', phone: '090-9876-5432', email: 'b@example.com' },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    render(<CustomerList />);
    await screen.findByText('顧客A');
    await screen.findByText('顧客B');

    const searchInput = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: '顧客A' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' }); // エンターキーイベント

    await screen.findByText('顧客A');
    expect(screen.queryByText('顧客B')).not.toBeInTheDocument();
  });
});
"}