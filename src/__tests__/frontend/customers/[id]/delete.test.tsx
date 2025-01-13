{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import CustomerDelete from '@/pages/customers/[id]/delete';

// モック
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
jest.mock('axios');

describe('CustomerDelete Component', () => {
  const mockId = '1';

  beforeEach(() => {
    // モックのリセット
    jest.clearAllMocks();
    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue({ status: 200 });
    // URL パラメータのモックを設定
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
      query: { id: mockId },
      push: jest.fn(),
    } as any);
  });

  it('顧客削除確認画面が表示されること', () => {
    render(<CustomerDelete />);    
    expect(screen.getByText('顧客削除確認')).toBeInTheDocument();
  });

  it('削除ボタン押下で顧客が削除され、一覧画面に遷移すること', async () => {
    render(<CustomerDelete />);    
    fireEvent.click(screen.getByText('削除'));
    expect(axios.delete).toHaveBeenCalledWith(`/api/customers/${mockId}`);
    expect(require('next/router').useRouter().push).toHaveBeenCalledWith('/customers');
  });

    it('キャンセルボタン押下で一覧画面に遷移すること', async () => {
      render(<CustomerDelete />);
      fireEvent.click(screen.getByText('キャンセル'));
      expect(require('next/router').useRouter().push).toHaveBeenCalledWith('/customers');
    });

  it('削除APIエラー時にエラーメッセージが表示されること', async () => {
    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockRejectedValue(new Error('API Error'));
    render(<CustomerDelete />);
    fireEvent.click(screen.getByText('削除'));
    // エラーメッセージが表示されるか確認
    // 例: expect(screen.getByText('顧客削除に失敗しました。')).toBeInTheDocument();
    // 適切なエラー処理の内容に合わせてテストを追加
  });
});"}