{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import New from '@/pages/customers/[id]/requests/new';

// Fetch のモック
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
  text: () => Promise.resolve(\"\"),
  ok: true,
  status: 200,
  statusText: \"OK\",
})) as jest.Mock;

// Axios のモック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Router のモック
const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

// グローバル変数の設定
declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
      mockRouter: typeof mockRouter;
    }
  }
  var mockRouter: typeof mockRouter;
}

global.mockRouter = mockRouter;

// テスト前の共通セットアップ
beforeEach(() => {
  jest.clearAllMocks();
});

describe('特別リクエスト登録画面', () => {
  test('リクエスト内容を入力して登録できる', async () => {
    render(<New />); 

    // 各入力フィールド
    const requestTypeInput = screen.getByLabelText('リクエスト種別');
    const requestDateInput = screen.getByLabelText('リクエスト日');
    const descriptionInput = screen.getByLabelText('リクエスト内容');

    // 値を入力
    fireEvent.change(requestTypeInput, { target: { value: '不具合報告' } });
    fireEvent.change(requestDateInput, { target: { value: '2024-07-24' } });
    fireEvent.change(descriptionInput, { target: { value: '〇〇機能に不具合が発生しています。' } });

    // 登録ボタンをクリック
    const submitButton = screen.getByRole('button', { name: '登録' });
    fireEvent.click(submitButton);

    // モックAPIの呼び出しを検証
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    // リクエストデータの内容を検証
    expect(mockedAxios.post).toHaveBeenCalledWith('/api/special_requests', {
      customer_id: expect.any(String),
      request_type: '不具合報告',
      request_date: '2024-07-24',
      description: '〇〇機能に不具合が発生しています。',
      status: '未対応'
    });
    
     // 画面遷移を検証
    expect(mockRouter.push).toHaveBeenCalledWith('/customers/[id]/requests'); // TODO: 正しい遷移先を指定
  });
});"}