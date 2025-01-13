{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import CarryOver from '@/pages/schedule/carryover';

// モック
jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// ヘッダーコンポーネント
const Header = () => <div>ヘッダー</div>;

// サイドメニューコンポーネント
const SideMenu = () => <div>サイドメニュー</div>;

describe('次期契約への繰越対応画面', () => {
  test('コンポーネントが正しくレンダリングされる', () => {
    render(<CarryOver />); 
    expect(screen.getByText('次期契約への繰越対応画面')).toBeInTheDocument();
    expect(screen.getByText('契約ID')).toBeInTheDocument();
    expect(screen.getByText('未発行情報')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '繰越' })).toBeInTheDocument();
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
  });

  test('入力値が正しく処理される', async () => {
    render(<CarryOver />);
    const contractIdInput = screen.getByLabelText('契約ID');
    const unissuedInfoInput = screen.getByLabelText('未発行情報');
    fireEvent.change(contractIdInput, { target: { value: '123' } });
    fireEvent.change(unissuedInfoInput, { target: { value: '未発行情報テスト' } });
    expect(contractIdInput).toHaveValue('123');
    expect(unissuedInfoInput).toHaveValue('未発行情報テスト');
  });

  test('繰越ボタンクリック時の処理', async () => {
    const mockPush = jest.fn();
    jest.mock('next/navigation', () => ({
      useRouter: () => ({
        push: mockPush,
      }),
    }));

    render(<CarryOver />);
    const carryOverButton = screen.getByRole('button', { name: '繰越' });
    fireEvent.click(carryOverButton);

  });

  test('データ取得処理', async () => {
    render(<CarryOver />);  
  });
});"}