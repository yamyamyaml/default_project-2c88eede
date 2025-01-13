{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import CustomerSearch from '@/pages/customers/search';

// モック
jest.mock('@/components/Header', () => () => <div data-testid=\"header\">Header</div>);
jest.mock('@/components/SideBar', () => () => <div data-testid=\"sidebar\">SideBar</div>);

describe('顧客検索画面', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<CustomerSearch />);  
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('顧客IDで検索できる', async () => {
    render(<CustomerSearch />);
    const customerIdInput = screen.getByLabelText('顧客ID') as HTMLInputElement;
    fireEvent.change(customerIdInput, { target: { value: '123' } });
    const searchButton = screen.getByRole('button', { name: '検索' });
    fireEvent.click(searchButton);
  });

  it('氏名で検索できる', async () => {
    render(<CustomerSearch />);
    const customerNameInput = screen.getByLabelText('氏名') as HTMLInputElement;
    fireEvent.change(customerNameInput, { target: { value: '山田太郎' } });
    const searchButton = screen.getByRole('button', { name: '検索' });
    fireEvent.click(searchButton);
  });

  it('電話番号で検索できる', async () => {
    render(<CustomerSearch />);
    const customerPhoneInput = screen.getByLabelText('電話番号') as HTMLInputElement;
    fireEvent.change(customerPhoneInput, { target: { value: '090-1234-5678' } });
    const searchButton = screen.getByRole('button', { name: '検索' });
    fireEvent.click(searchButton);
  });
});"}