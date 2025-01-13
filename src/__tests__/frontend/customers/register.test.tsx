{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import CustomerRegister from '@/pages/customers/register';

// ヘッダーコンポーネントのモック
jest.mock('@/components/Header', () => () => <div>ヘッダーモック</div>);

// Axios のモック設定
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Router のモック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

describe('顧客情報登録画面', () => {
  beforeEach(() => {
    mockedAxios.post.mockResolvedValue({ status: 200, data: { message: '登録成功' } });
  });

  it('コンポーネントが正しくレンダリングされる', () => {
    render(<CustomerRegister />);    
    expect(screen.getByText('顧客情報登録画面')).toBeInTheDocument();
    expect(screen.getByText('ヘッダーモック')).toBeInTheDocument(); // モックヘッダーの確認
  });

  it('入力値が正しく状態に反映される', async () => {
    render(<CustomerRegister />);

    const nameInput = screen.getByLabelText('氏名') as HTMLInputElement;
    const emailInput = screen.getByLabelText('メールアドレス') as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'テスト太郎' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(nameInput.value).toBe('テスト太郎');
    expect(emailInput.value).toBe('test@example.com');
  });

  it('登録ボタンクリックでAPIがコールされる', async () => {
    render(<CustomerRegister />);
    const submitButton = screen.getByRole('button', { name: '登録' });
    fireEvent.click(submitButton);
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/customers', expect.any(Object));
    await expect(mockedAxios.post('/api/customers', expect.any(Object))).resolves.toHaveProperty('status',200);
  });

});
"}