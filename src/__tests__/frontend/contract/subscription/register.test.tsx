{"code": "import { render, screen, fireEvent, act } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import ContractRegister from '@/pages/contract/subscription/register';

// ヘッダーコンポーネント（モック）
const Header = ({ children }: { children?: React.ReactNode }) => <header>{children}</header>;
// サイドメニューコンポーネント（モック）
const SideMenu = ({ children }: { children?: React.ReactNode }) => <aside>{children}</aside>;

describe('契約情報登録画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('コンポーネントが正しくレンダリングされる', async () => {
    render(<ContractRegister />); // モック化したコンポーネントを渡す
    expect(screen.getByRole('heading', { name: /契約情報登録/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /登録/i })).toBeInTheDocument();
  });

  it('入力フィールドの値が正しく更新される', async () => {
    render(<ContractRegister />); // モック化したコンポーネントを渡す
    const contractNoInput = screen.getByLabelText('契約番号');
    fireEvent.change(contractNoInput, { target: { value: 'TEST-001' } });
    expect(contractNoInput).toHaveValue('TEST-001');
  });

  it('getDataが正しく動作する', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });
    render(<ContractRegister />); // モック化したコンポーネントを渡す
    await act(() => {});  // 非同期処理の完了を待つ
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith('/api/customers', { params: { items: ['customer_id', 'customer_code', 'name'] } });
    expect(axios.get).toHaveBeenCalledWith('/api/products', { params: { items: ['product_code', 'product_name'] } });
  });

  it('postDataが正しく動作する', async () => {
    (axios.post as jest.Mock).mockResolvedValue({ status: 200 });
    render(<ContractRegister />); // モック化したコンポーネントを渡す
    const submitButton = screen.getByRole('button', { name: /登録/i });
    fireEvent.click(submitButton);
    await act(() => {}); // 非同期処理の完了を待つ
    // TODO: postData の詳細なテスト内容を追記
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  it('共通コンポーネントが表示される', () => {
    render(<ContractRegister />); // モック化したコンポーネントを渡す
    expect(screen.getByRole('header')).toBeInTheDocument();
    expect(screen.getByRole('aside')).toBeInTheDocument(); // aside要素はSideMenuなので、SideMenuが表示されていることを確認
  });
});
"}