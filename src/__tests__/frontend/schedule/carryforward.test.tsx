{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import CarryForward from '@/pages/schedule/carryforward';

// モック
jest.mock('@/components/Header', () => () => <div>Header</div>);
jest.mock('@/components/SideMenu', () => () => <div>SideMenu</div>);

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// テストデータ
const mockScheduleData = [
  { schedule_id: 1, subscription_id: 'SUB-001', issue_no: '001', scheduled_date: '2024-05-01', is_carried_forward: false },
  { schedule_id: 2, subscription_id: 'SUB-002', issue_no: '002', scheduled_date: '2024-05-15', is_carried_forward: false },
];

// APIモック
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: mockScheduleData }),
    ok: true,
  })
) as jest.Mock;

describe('繰越処理画面', () => {
  test('コンポーネントが正しくレンダリングされる', async () => {
    render(<CarryForward />); // getServerSidePropsはモックしない
    expect(await screen.findByText('繰越対象一覧')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('SideMenu')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '繰越実行' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument();
  });

  test('繰越対象が正しく表示される', async () => {
    render(<CarryForward />);

    // データ取得を待つ
    await screen.findAllByRole('cell');
    expect(screen.getByText('SUB-001')).toBeInTheDocument();
    expect(screen.getByText('001')).toBeInTheDocument();
    expect(screen.getByText('2024-05-01')).toBeInTheDocument();
    expect(screen.getByText('SUB-002')).toBeInTheDocument();
    expect(screen.getByText('002')).toBeInTheDocument();
    expect(screen.getByText('2024-05-15')).toBeInTheDocument();

  });

  test('繰越実行ボタンのクリックでAPIがコールされる', async () => {
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    render(<CarryForward />);
    await screen.findAllByRole('cell');

    fireEvent.click(screen.getByRole('button', { name: '繰越実行' }));
    expect(mockFetch.mock.calls.length).toBe(1);

  });

  test('キャンセルボタンのクリックで前の画面に戻る', async () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush
    })
    render(<CarryForward />);
    await screen.findAllByRole('cell');
    fireEvent.click(screen.getByRole('button', { name: 'キャンセル' }));
    expect(mockRouterPush).toHaveBeenCalledWith('/schedule/unissued_list');
  });
});"}