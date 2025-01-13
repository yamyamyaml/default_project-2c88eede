{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';
import 消込承認画面 from '@/pages/billing/payment/approve';
import Header from '@/components/common/Header';
import SideMenu from '@/components/common/SideMenu';

jest.mock('next/navigation');
jest.mock('@/components/common/Header');
jest.mock('@/components/common/SideMenu');

const useRouterMock = useRouter as jest.Mock;

beforeEach(() => {
  useRouterMock.mockReturnValue({
    push: jest.fn(),
  });
});

describe('消込承認画面', () => {
  it('HeaderとSideMenuが表示されること', () => {
    render(<消込承認画面 />);
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Headerをチェック
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // SideMenuをチェック
  });

  it('承認ボタンクリックでアラートが表示されること', () => {
    render(<消込承認画面 />);
    window.alert = jest.fn();
    fireEvent.click(screen.getByText('承認'));
    expect(window.alert).toHaveBeenCalledWith('消込承認処理を実行しました。');
  });


});
"}