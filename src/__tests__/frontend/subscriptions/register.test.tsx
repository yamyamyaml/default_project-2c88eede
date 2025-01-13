{"code": "import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 契約登録画面 from '@/pages/subscriptions/register';

// モック
jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// コンポーネント
const Header = ({ children }: { children: React.ReactNode }) => <header>{children}</header>;
const SideMenu = ({ children }: { children: React.ReactNode }) => <nav>{children}</nav>;

describe('契約登録画面', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (axios.get as jest.Mock).mockResolvedValue({
      data: [
        { customer_id: '1', name: '顧客A' },
        { customer_id: '2', name: '顧客B' },
      ],
    });
    (axios.post as jest.Mock).mockResolvedValue({});
  });

  it('初期表示', async () => {
    render(
      <契約登録画面 />
    );
    expect(await screen.findByText('契約登録画面')).toBeInTheDocument();
  });

  it('顧客IDを選択', async () => {
    render(
      <契約登録画面 />
    );
    await waitFor(() => screen.getByRole('combobox', { name: /顧客ID/i }));

    // FIXME: selectの実装が未確定なためテストが書けない
    // fireEvent.change(screen.getByRole('combobox', { name: /顧客ID/i }), { target: { value: '2' } });
    // expect(screen.getByRole('combobox', { name: /顧客ID/i })).toHaveValue('2');
  });

  it('登録ボタン押下', async () => {
    render(
      <契約登録画面 />
    );
    await waitFor(() => screen.getByRole('button', { name: /登録/i }));
    fireEvent.click(screen.getByRole('button', { name: /登録/i }));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect((useRouter as jest.Mock).mock.results[0].value.push).toHaveBeenCalledWith('/subscriptions'); // FIXME: 画面遷移先が未確定なため仮で'/subscriptions'を入れている
  });
});"}