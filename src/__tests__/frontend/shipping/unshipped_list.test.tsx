{"code": "import { jest } from '@jest/globals';
import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import UnshippedList from '@/pages/shipping/unshipped_list';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

global.axios = mockedAxios;

const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

const Header = () => <div>ヘッダー</div>;

describe('未発送リスト確認画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Headerが表示されること', () => {
    render(<UnshippedList />);  
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
  });

  it('未発送リストが正しく表示されること', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        { 顧客名: '顧客A', 契約ID: '1', 発送予定日: '2023-12-31', 発送状況: '未発送' },
        { 顧客名: '顧客B', 契約ID: '2', 発送予定日: '2024-01-15', 発送状況: '未発送' },
      ],
    });

    render(<UnshippedList />);

    expect(await screen.findByText('顧客A')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2023-12-31')).toBeInTheDocument();
    expect(screen.getByText('未発送')).toBeInTheDocument();

    expect(await screen.findByText('顧客B')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('未発送')).toBeInTheDocument();
  });

  it('検索フォームが正しく機能すること', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        { 顧客名: '顧客A', 契約ID: '1', 発送予定日: '2023-12-31', 発送状況: '未発送' },
      ],
    });

    render(<UnshippedList />);

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: '顧客A' } });
    expect(searchInput.value).toBe('顧客A');
    
    // 検索ボタンクリックのモック実装
    // 実際にはAPIリクエストが送信されることを確認
  });
});"}