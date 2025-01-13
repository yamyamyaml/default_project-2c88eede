{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import Generate from '@/pages/contract/renewal/generate';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('契約更新案内書類生成画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('初期表示の確認', async () => {
    render(<Generate />); // target
    expect(screen.getByText('契約更新案内書類生成')).toBeInTheDocument(); // 画面タイトル
    expect(screen.getByLabelText('契約ID')).toBeInTheDocument(); // 契約ID入力フィールド
    expect(screen.getByRole('button', { name: '生成' })).toBeInTheDocument(); // 生成ボタン
  });

  it('契約ID入力と生成ボタン押下時の処理', async () => {
    const mockGetData = jest.fn().mockResolvedValue({
      data: {
        subscription_id: '123',
        contract_no: 'ABC-123',
      },
    });
    mockedAxios.get.mockImplementation(mockGetData);

    render(<Generate />); // target

    const contractIdInput = screen.getByLabelText('契約ID');
    fireEvent.change(contractIdInput, { target: { value: '123' } });

    const generateButton = screen.getByRole('button', { name: '生成' });
    fireEvent.click(generateButton);

    expect(mockGetData).toHaveBeenCalledWith('/api/subscriptions/123'); // API呼び出し確認

  });

  it('データ取得エラー時の処理', async () => {
    const mockGetData = jest.fn().mockRejectedValue(new Error('APIエラー'));
    mockedAxios.get.mockImplementation(mockGetData);

    render(<Generate />); // target

    const contractIdInput = screen.getByLabelText('契約ID');
    fireEvent.change(contractIdInput, { target: { value: '123' } });

    const generateButton = screen.getByRole('button', { name: '生成' });
    fireEvent.click(generateButton);

    // エラー処理の確認
  });
});
"}