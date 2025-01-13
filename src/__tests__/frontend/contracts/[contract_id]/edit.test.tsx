{"code": "import { jest } from '@jest/globals';
import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Edit from '@/pages/contracts/[contract_id]/edit';

jest.mock('axios');
jest.mock('next/navigation');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockRouter = useRouter as jest.MockedFunction<typeof useRouter>;

// モックデータ
const mockContractData = {
  subscription_id: 1,
  contract_no: 'TEST-001',
  contract_date: '2024-01-01',
  // ... other fields
};

describe('契約情報編集画面', () => {
  beforeEach(() => {
    // モックの設定
    mockedAxios.get.mockResolvedValue({ data: mockContractData });
    mockRouter.push = jest.fn();
  });

  it('コンポーネントが正しくレンダリングされる', async () => {
    render(<Edit params={{ contract_id: '1' }} />);    
    // Header コンポーネントが表示されている
    expect(screen.getByRole('banner')).toBeInTheDocument();
    // ローディング表示
    expect(screen.getByText('読み込み中...') ).toBeVisible();
    // データ取得完了後
    await screen.findByText(mockContractData.contract_no);
    expect(screen.getByText(mockContractData.contract_no)).toBeVisible();
  });

  it('契約情報を変更して保存できる', async () => {
    render(<Edit params={{ contract_id: '1' }} />);
    await screen.findByText(mockContractData.contract_no);

    const newContractNo = 'TEST-002';
    fireEvent.change(screen.getByLabelText('契約番号'), { target: { value: newContractNo } });
    fireEvent.click(screen.getByRole('button', { name: '保存' }));

    expect(mockedAxios.post).toHaveBeenCalledWith('/api/contracts/1', {
      contract_no: newContractNo,
      // ... other fields
    });

    // 保存成功時の画面遷移
    expect(mockRouter.push).toHaveBeenCalledWith('/contracts');
  });

  it('エラーが発生した場合エラーメッセージが表示される', async () => {
    mockedAxios.post.mockRejectedValue(new Error('保存に失敗しました'));
    render(<Edit params={{ contract_id: '1' }} />);
    await screen.findByText(mockContractData.contract_no);
    fireEvent.click(screen.getByRole('button', { name: '保存' }));
    // エラーメッセージが表示される
    await screen.findByText('保存に失敗しました');

  });

});"}