{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import ScheduleDetail from '@/pages/schedule/[scheduleId]';

jest.mock('next/navigation');

// モックデータ
const scheduleData = {
  id: 'SCR-043',
  category: '発行スケジュール管理',
  screenName: '発行スケジュール詳細',
  description: '登録された発行スケジュールの詳細情報を表示する画面。',
  \"Screen components\": '詳細情報表示エリア、発行実績登録ボタン、編集ボタン、削除ボタン、戻るボタン',
  operatingProcedure: '発行スケジュール一覧で詳細ボタンを押すと表示される。発行実績登録は発行実績登録ボタンから、編集は編集ボタンから、削除は削除ボタンから遷移する。戻るボタンで一覧に戻る。',
  user: '発送担当者',
  accessRight: 'loged-in user',
  fileName: 'schedule/[scheduleId].tsx',
  getData: '[{\"table\":\"schedule\", \"items\": [\"schedule_id\", \"subscription_id\", \"issue_no\", \"scheduled_date\", \"actual_date\", \"is_sent\"]}]',
  postData: null,
  commonComponent: '[\"Header.tsx\", \"SideMenu.tsx\"]',
  relatedBackendHandles: [],
  schedule_id: '1',
  subscription_id: '123',
  issue_no: '1',
  scheduled_date: '2024-05-10',
  actual_date: '2024-05-15',
  is_sent: true,
};

// ヘッダーコンポーネントのモック
const Header = () => <div>ヘッダー</div>;

// サイドメニューコンポーネントのモック
const SideMenu = () => <div>サイドメニュー</div>;

describe('ScheduleDetail Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      back: jest.fn(),
    });

    // fetch モックの設定
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(scheduleData),
    });
  });

  it('スケジュール詳細情報が正しく表示されること', async () => {
    render(<ScheduleDetail params={{ scheduleId: '1' }} searchParams={{}} />); // params を渡す
    expect(await screen.findByText('発行スケジュール詳細')).toBeInTheDocument();
    expect(screen.getByText('定期購読ID: 123')).toBeInTheDocument();
    expect(screen.getByText('号数: 1')).toBeInTheDocument();
    expect(screen.getByText('予定日: 2024-05-10')).toBeInTheDocument();
    expect(screen.getByText('実績日: 2024-05-15')).toBeInTheDocument();
    expect(screen.getByText('発送済み: true')).toBeInTheDocument();
  });

  it('戻るボタンが正しく機能すること', async () => {
    render(<ScheduleDetail params={{ scheduleId: '1' }} searchParams={{}} />);
    const backButton = await screen.findByRole('button', { name: '戻る' });
    fireEvent.click(backButton);
    expect((useRouter as jest.Mock).mock.results[0].value.back).toHaveBeenCalledTimes(1);
  });

  it('ヘッダーとサイドメニューが表示される', async () => {
    render(<ScheduleDetail params={{ scheduleId: '1' }} searchParams={{}} />);
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
  });


  it('データ取得エラー時にエラーメッセージが表示されること', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('APIエラー'));
    render(<ScheduleDetail params={{ scheduleId: '1' }} searchParams={{}} />);
    expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument();
  });


});
"}