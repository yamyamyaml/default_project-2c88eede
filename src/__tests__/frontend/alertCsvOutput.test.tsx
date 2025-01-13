{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
alertCsvOutput.tsx

// モック
jest.mock('axios');
jest.mock('next/navigation');

// コンポーネント
const Header = () => <header>ヘッダー</header>;
const Footer = () => <footer>フッター</footer>;
const AlertCsvOutput = () => {
  const router = useRouter();
  const handleCsvDownload = async () => {
    try {
      const response = await axios.get('/api/alerts/csv');
      // CSVダウンロード処理（モック）
      console.log('CSVダウンロード:', response.data);
    } catch (error) {
      console.error('CSVダウンロードエラー:', error);
    }
  };

  return (
    <div>
      <Header />
      <button onClick={handleCsvDownload}>CSV出力</button>
      <Footer />
    </div>
  );
};

// テスト
describe('アラートCSV出力画面', () => {
  it('CSV出力ボタンをクリックするとCSVダウンロード処理が実行される', async () => {
    // モックの設定
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockResolvedValue({ data: 'CSVデータ' });
    const mockConsoleLog = jest.spyOn(console, 'log');
    const mockConsoleError = jest.spyOn(console, 'error');
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // レンダリング
    render(<AlertCsvOutput />);

    // CSV出力ボタンをクリック
    await act(async () => {
      fireEvent.click(screen.getByText('CSV出力'));
    });

    // 期待値の確認
    expect(mockAxiosGet).toHaveBeenCalledWith('/api/alerts/csv');
    expect(mockConsoleLog).toHaveBeenCalledWith('CSVダウンロード:', 'CSVデータ');
    expect(mockConsoleError).not.toHaveBeenCalled();
  });

  it('CSVダウンロードでエラーが発生した場合、コンソールにエラーメッセージが出力される', async () => {
    // モックの設定
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockRejectedValue(new Error('エラーが発生しました'));
    const mockConsoleLog = jest.spyOn(console, 'log');
    const mockConsoleError = jest.spyOn(console, 'error');
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // レンダリング
    render(<AlertCsvOutput />);

    // CSV出力ボタンをクリック
    await act(async () => {
      fireEvent.click(screen.getByText('CSV出力'));
    });

    // 期待値の確認
    expect(mockAxiosGet).toHaveBeenCalledWith('/api/alerts/csv');
    expect(mockConsoleLog).not.toHaveBeenCalled();
    expect(mockConsoleError).toHaveBeenCalledWith('CSVダウンロードエラー:', new Error('エラーが発生しました'));
  });

  it('HeaderとFooterが表示される', () => {
    render(<AlertCsvOutput />);
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('フッター')).toBeInTheDocument();
  });
});"}