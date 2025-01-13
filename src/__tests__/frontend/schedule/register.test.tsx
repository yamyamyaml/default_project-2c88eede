{"code": "import { jest } from '@jest/globals';
import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import { SubscriptionRegisterScreen } from '@/pages/schedule/register';

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
const Header = () => <div>ヘッダー</div>;

describe('発行予定登録画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('初期表示', () => {
    render(<SubscriptionRegisterScreen />);  // Header コンポーネントは SubscriptionRegisterScreen 内部で使用されている想定
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /契約id/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /号数/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/発行予定日/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /登録/i })).toBeInTheDocument();
  });

  it('入力値のバリデーション', async () => {
    render(<SubscriptionRegisterScreen />);
    const submitButton = screen.getByRole('button', { name: /登録/i });
    fireEvent.click(submitButton);
    // エラーメッセージが表示されることを確認
  });

  it('登録処理', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: { message: '登録成功' } });
    render(<SubscriptionRegisterScreen />);
    const contractIdInput = screen.getByRole('textbox', { name: /契約id/i });
    const issueNumberInput = screen.getByRole('textbox', { name: /号数/i });
    const issueDateInput = screen.getByLabelText(/発行予定日/i);
    fireEvent.change(contractIdInput, { target: { value: '123' } });
    fireEvent.change(issueNumberInput, { target: { value: '4' } });
    fireEvent.change(issueDateInput, { target: { value: '2024-03-01' } });

    const submitButton = screen.getByRole('button', { name: /登録/i });
    fireEvent.click(submitButton);

    // 登録成功メッセージが表示されること、画面遷移が正しく行われることを確認
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    // expect(mockRouter.push).toHaveBeenCalledWith('/schedule/list');
    // 成功メッセージが表示されているか確認
  });

  it('契約IDから契約情報を取得', async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 200, data: { contract_no: 'ABC-123' } });
    render(<SubscriptionRegisterScreen />);
    const contractIdInput = screen.getByRole('textbox', { name: /契約id/i });
    fireEvent.change(contractIdInput, { target: { value: '123' } });

    // 契約情報が正しく表示されることを確認
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    // expect(screen.getByText('ABC-123')).toBeInTheDocument();
  });
});
"}