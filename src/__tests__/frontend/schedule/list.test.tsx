{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ScheduleList from '@/pages/schedule/list';

jest.mock('next/navigation');
jest.mock('axios');

const useRouterMock = useRouter as jest.Mock;
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('発行スケジュール一覧画面', () => {
  beforeEach(() => {
    useRouterMock.mockReturnValue({
      push: jest.fn(),
    });
    mockedAxios.get.mockResolvedValue({
      data: [
        { subscription_id: 1, contract_no: 'CNTRCT-001', product_name: 'Product A', schedule_id: 1, issue_no: 'ISSUE-001', scheduled_date: '2024-05-01', actual_date: null },
        { subscription_id: 2, contract_no: 'CNTRCT-002', product_name: 'Product B', schedule_id: 2, issue_no: 'ISSUE-002', scheduled_date: '2024-05-15', actual_date: '2024-05-14' },
      ],
    });
  });

  it('テーブルが表示されること', async () => {
    render(<ScheduleList />);
    expect(await screen.findByRole('table')).toBeInTheDocument();
  });

  it('データが正しく表示されること', async () => {
    render(<ScheduleList />);
    expect(await screen.findByText('CNTRCT-001')).toBeInTheDocument();
    expect(await screen.findByText('Product A')).toBeInTheDocument();
    expect(await screen.findByText('ISSUE-001')).toBeInTheDocument();
    expect(await screen.findByText('2024-05-01')).toBeInTheDocument();
    expect(await screen.findByText('CNTRCT-002')).toBeInTheDocument();
    expect(await screen.findByText('Product B')).toBeInTheDocument();
    expect(await screen.findByText('ISSUE-002')).toBeInTheDocument();
    expect(await screen.findByText('2024-05-15')).toBeInTheDocument();
    expect(await screen.findByText('2024-05-14')).toBeInTheDocument();
  });

  it('ヘッダーコンポーネントが表示されること', async () => {
    render(<ScheduleList />);
    expect(screen.getByRole('banner')).toBeVisible(); // Header.tsx
  });

  it('サイドメニューコンポーネントが表示されること', async () => {
    render(<ScheduleList />);
    expect(screen.getByRole('navigation')).toBeVisible(); // SideMenu.tsx
  });

  it('発行予定登録ボタンがクリックできること', async () => {
    render(<ScheduleList />);
    const button = await screen.findByRole('button', { name: /発行予定登録/i });
    fireEvent.click(button);
    expect(useRouterMock().push).toHaveBeenCalledWith('/schedule/register');
  });


  it('詳細ボタンがクリックできること', async () => {
    render(<ScheduleList />);
    const detailButton = await screen.findAllByRole('button', { name: /詳細/i });
    fireEvent.click(detailButton[0]);
    expect(useRouterMock().push).toHaveBeenCalledWith('/schedule/1'); // schedule_id
  });

  it('未発行一覧へのリンクがクリックできること', async () => {
    render(<ScheduleList />);
    const link = await screen.findByRole('link', { name: /未発行一覧/i });
    fireEvent.click(link);
    expect(useRouterMock().push).toHaveBeenCalledWith('/schedule/unissued');
  });
});
"}