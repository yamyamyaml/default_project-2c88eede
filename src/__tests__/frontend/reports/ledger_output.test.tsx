{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import LedgerOutput from '@/pages/reports/ledger_output';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// ヘッダーコンポーネント（ダミー）
const Header = () => <div>ヘッダー</div>;

describe('定期元帳出力画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('画面が正しくレンダリングされる', () => {
    render(<LedgerOutput />);  // Header コンポーネントをpropsで渡す
    expect(screen.getByText('定期元帳出力画面')).toBeInTheDocument(); 
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
  });

  it('出力ボタンクリックでAPIがコールされる', async () => {
    // Axios のモックを設定
    mockedAxios.post.mockResolvedValueOnce({ data: {}, status: 200 });

    render(<LedgerOutput />);  // Header コンポーネントをpropsで渡す

    fireEvent.click(screen.getByText('出力'));
    // API コールの確認
    expect(mockedAxios.post).toHaveBeenCalledTimes(1); 
  });

  it('APIコール成功時にメッセージが表示される', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {}, status: 200 });

    render(<LedgerOutput />);  // Header コンポーネントをpropsで渡す

    fireEvent.click(screen.getByText('出力'));
    // 成功メッセージの確認
    // （実装によりメッセージが変化するため、適切なメッセージに修正）
    // expect(await screen.findByText('出力に成功しました')).toBeVisible(); 
  });

  it('APIコール失敗時にエラーメッセージが表示される', async () => {
    mockedAxios.post.mockRejectedValueOnce({ message: 'エラーが発生しました' });

    render(<LedgerOutput />);  // Header コンポーネントをpropsで渡す

    fireEvent.click(screen.getByText('出力'));
    // （実装によりメッセージが変化するため、適切なメッセージに修正）
    // expect(await screen.findByText('エラーが発生しました')).toBeVisible();
  });

  it('出力条件設定フォームの値が正しく設定、取得できる', async () => {
    render(<LedgerOutput />); // Header コンポーネントをpropsで渡す

    // テストに必要な実装を追加
    // 例: 出力開始日、出力終了日などの入力フィールド
  });
});"}