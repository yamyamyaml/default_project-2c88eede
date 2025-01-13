{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import ShippingGenerateList from '@/pages/shipping/generate_list';

// ヘッダーコンポーネントのモック
jest.mock('@/components/common/Header', () => () => <div>Header</div>);

// Axios のモック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('発送リスト生成画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('画面が表示されること', () => {
    render(<ShippingGenerateList />);
    expect(screen.getByText('発送リスト生成画面')).toBeInTheDocument();
  });

  it('ヘッダーが表示されること', () => {
    render(<ShippingGenerateList />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });


  it('発送リスト生成ボタンをクリックすると、APIリクエストが送信されること', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: {}, status: 200 });
    render(<ShippingGenerateList />);

    fireEvent.click(screen.getByRole('button', { name: /発送リスト生成/i }));

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });


});
"}