{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';
import 発行スケジュール管理TOP from '@/pages/schedule/index';
import Header from '@/components/common/Header';
import SideMenu from '@/components/common/SideMenu';

jest.mock('next/navigation');
jest.mock('@/components/common/Header');
jest.mock('@/components/common/SideMenu');

describe('発行スケジュール管理TOP', () => {
  const mockedRouter = useRouter as jest.Mocked<typeof useRouter>;

  beforeEach(() => {
    mockedRouter.push.mockClear();
    (Header as jest.Mock).mockClear();
    (SideMenu as jest.Mock).mockClear();

    render(
      <発行スケジュール管理TOP />
    );
  });

  it('renders without crashing', () => {
    expect(screen.getByRole('heading', { name: '発行スケジュール管理TOP' })).toBeInTheDocument();
  });

  it('navigates to 発行スケジュール一覧', () => {
    const link = screen.getByRole('link', { name: '発行スケジュール一覧' });
    fireEvent.click(link);
    expect(mockedRouter.push).toHaveBeenCalledWith('/schedule/list');
  });

  it('navigates to 未発行一覧', () => {
    const link = screen.getByRole('link', { name: '未発行一覧' });
    fireEvent.click(link);
    expect(mockedRouter.push).toHaveBeenCalledWith('/schedule/unissued');
  });

  it('navigates to 登録画面', () => {
    const button = screen.getByRole('button', { name: '登録' });
    fireEvent.click(button);
    expect(mockedRouter.push).toHaveBeenCalledWith('/schedule/register');
  });

  it('renders Header and SideMenu components', () => {
    expect(Header).toHaveBeenCalledTimes(1);
    expect(SideMenu).toHaveBeenCalledTimes(1);
  });
});"}