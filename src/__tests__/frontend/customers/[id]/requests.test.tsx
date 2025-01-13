{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SpecialRequestsHistory from '@/pages/customers/[id]/requests';

jest.mock('next/navigation');
jest.mock('axios');

const mockRouter = useRouter() as jest.Mocked<typeof useRouter>;

const Header = () => <div>Header</div>;
const SideBar = () => <div>SideBar</div>;

describe('特別リクエスト履歴画面', () => {
  const specialRequests = [
    { request_id: 1, customer_id: 1, request_type: 'タイプA', request_date: '2024-07-24', description: 'リクエスト詳細A', status: '対応済み' },
    { request_id: 2, customer_id: 1, request_type: 'タイプB', request_date: '2024-07-25', description: 'リクエスト詳細B', status: '未対応' },
  ];

  beforeEach(() => {
    mockRouter.push.mockClear();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ special_requests: specialRequests }),
        ok: true,
        status: 200,
        statusText: 'OK',
      })
    ) as jest.Mock;
  });

  it('ヘッダーとサイドバーが表示されること', async () => {
    render(<SpecialRequestsHistory />);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('SideBar')).toBeInTheDocument();
  });

  it('特別リクエスト履歴リストが表示されること', async () => {
    render(<SpecialRequestsHistory />);
    expect(await screen.findByText('リクエスト詳細A')).toBeInTheDocument();
    expect(await screen.findByText('リクエスト詳細B')).toBeInTheDocument();
  });

  it('新規登録ボタンを押下すると、新規登録画面に遷移すること', async () => {
    render(<SpecialRequestsHistory />);
    fireEvent.click(screen.getByText('新規登録'));
    expect(mockRouter.push).toHaveBeenCalledWith('/customers/[id]/requests/new');
  });

  it('データ取得に失敗した場合、エラーメッセージが表示されること', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    ) as jest.Mock;

    render(<SpecialRequestsHistory />);

    expect(await screen.findByText('エラーが発生しました。')).toBeInTheDocument();
  });
});"}