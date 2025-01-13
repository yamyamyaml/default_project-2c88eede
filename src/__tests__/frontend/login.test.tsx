{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import Login from '@/pages/login';

describe('Login Component Test', () => {
  test('renders login form with user ID, password fields, and login button', () => {
    render(<Login />);
    expect(screen.getByLabelText('ユーザーID')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
  });

  test('calls login function with correct user ID and password on button click', async () => {
    const mockLogin = jest.fn();
    render(<Login loginFunc={mockLogin} />);

    fireEvent.change(screen.getByLabelText('ユーザーID'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('パスワード'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }));

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'password');
  });

  test('displays error message when login fails', async () => {
    const mockLogin = jest.fn().mockRejectedValue(new Error('ログイン失敗'));
    render(<Login loginFunc={mockLogin} />);

    fireEvent.change(screen.getByLabelText('ユーザーID'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('パスワード'), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }));

    // エラーメッセージが表示されるか確認
    expect(await screen.findByText('ログイン失敗')).toBeVisible();

  });
});"}