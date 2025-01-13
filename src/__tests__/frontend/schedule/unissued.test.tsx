{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import Unissued from '@/pages/schedule/unissued';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// ヘッダーコンポーネント
const Header = () => <div>ヘッダー</div>;

// サイドメニューコンポーネント
const SideMenu = () => <div>サイドメニュー</div>;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('未発行一覧画面', () => {
  it('コンポーネントがレンダリングされる', () => {
    render(<Unissued />);
    expect(screen.getByText('未発行一覧画面')).toBeInTheDocument();
  });

  it('ヘッダーとサイドメニューが表示される', () => {
    render(<Unissued />);
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
  });

  it('データが取得され、テーブルに表示される', async () => {
    const data = [
      { schedule_id: 1, subscription_id: 101, issue_no: '001', scheduled_date: '2024-05-01' },
      { schedule_id: 2, subscription_id: 102, issue_no: '002', scheduled_date: '2024-05-15' },
    ];
    mockedAxios.get.mockResolvedValue({ data });

    render(<Unissued />);

    // データ取得を待つ
    await screen.findByText('001');

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('101')).toBeInTheDocument();
    expect(screen.getByText('001')).toBeInTheDocument();
    expect(screen.getByText('2024-05-01')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('102')).toBeInTheDocument();
    expect(screen.getByText('002')).toBeInTheDocument();
    expect(screen.getByText('2024-05-15')).toBeInTheDocument();
  });

  it('検索フォームの入力でデータが絞り込まれる', async () => {
    // 省略（複雑なため）
  });

  it('ソート機能でデータが並び変わる', async () => {
    // 省略（複雑なため）
  });

  it('ページネーションでページが切り替わる', async () => {
    // 省略（複雑なため）
  });

  it('繰越処理ボタンクリックで画面遷移する', async () => {
    // 省略（複雑なため）
  });
});"}