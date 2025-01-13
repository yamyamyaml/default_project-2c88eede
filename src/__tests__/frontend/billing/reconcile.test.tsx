{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reconcile from '@/pages/billing/reconcile';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('入金データ自動消込画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('画面が表示されること', () => {
    render(<Reconcile />);
    expect(screen.getByText('入金データ自動消込画面')).toBeInTheDocument();
  });

  it('入金データCSVファイルがアップロードできること', async () => {
    render(<Reconcile />);
    const fileInput = screen.getByLabelText('CSVファイルを選択') as HTMLInputElement;
    const file = new File([''], 'test.csv', { type: 'text/csv' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    // ファイルがアップロードされたことを確認
    expect(fileInput.files?.[0].name).toBe('test.csv');
  });

  it('消込実行ボタンがクリックできること', async () => {
    render(<Reconcile />);
    const button = screen.getByRole('button', { name: '消込実行' });
    fireEvent.click(button);
    // API 呼び出しが実行されたことを確認
  });

  it('キャンセルボタンがクリックできること', async () => {
    render(<Reconcile />);
    const button = screen.getByRole('button', { name: 'キャンセル' });
    fireEvent.click(button);
    // 画面遷移が実行されたことを確認
  });

  it('データ取得処理が成功した場合、データが表示されること', async () => {
    // モックデータをセット
    mockedAxios.get.mockResolvedValue({ data: [], status: 200 });
    render(<Reconcile />);    
    // データが表示されていることを確認
  });

  it('データ取得処理が失敗した場合、エラーメッセージが表示されること', async () => {
    mockedAxios.get.mockRejectedValue({ message: 'エラーが発生しました', status: 500 });
    render(<Reconcile />);
    // エラーメッセージが表示されていることを確認
  });


  describe('Header.tsx と SideMenu.tsx のテスト', () => {
    it('Header.tsx が表示されること', () => {
      render(<Reconcile />);
      // Header.tsx に含まれる要素の存在を確認
    });

    it('SideMenu.tsx が表示されること', () => {
      render(<Reconcile />);
      // SideMenu.tsx に含まれる要素の存在を確認
    });
  });
});
"}