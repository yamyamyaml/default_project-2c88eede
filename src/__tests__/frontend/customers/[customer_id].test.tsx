{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import CustomerDetail from '@/pages/customers/[customer_id]';
import { jest } from '@jest/globals';

describe('CustomerDetail Component', () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
  }

  const Header = () => <div>Header</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    global.mockNextRouter = mockRouter
  });

  it('renders customer details correctly', async () => {
    // モックデータ
    const customerData = {
      customer_id: '1',
      customer_code: 'C001',
      name: '山田太郎',
      furigana: 'ヤマダタロウ',
      gender: '男性',
      birth_date: '1990-01-01',
      age: 33,
      organization_name: 'テスト株式会社',
      representative_name: '代表取締役',
      job_title: '営業部長',
      postal_code: '100-0001',
      address1: '東京都千代田区千代田1-1-1',
      address2: 'テストビル',
      email: 'test@example.com',
      phone: '03-1234-5678',
      notes: '特記事項',
      warning_flag: true,
    };

    // Axios モックの設定
    jest.spyOn(global.axios, 'get').mockResolvedValue({ data: customerData });

    render(<CustomerDetail params={{ customer_id: '1' }} commonComponents={{ Header }}/>);

    // 各項目が正しく表示されているか確認
    expect(await screen.findByText('顧客ID')).toBeInTheDocument();
    expect(await screen.findByText(customerData.customer_id)).toBeInTheDocument();
    expect(await screen.findByText('顧客コード')).toBeInTheDocument();
    expect(await screen.findByText(customerData.customer_code)).toBeInTheDocument();
    expect(await screen.findByText('氏名')).toBeInTheDocument();
    expect(await screen.findByText(customerData.name)).toBeInTheDocument();
    // ... 他の項目についても同様に確認
  });

  it('handles API errors gracefully', async () => {
    // Axios モックでエラーを返すように設定
    jest.spyOn(global.axios, 'get').mockRejectedValue(new Error('API Error'));

    render(<CustomerDetail params={{ customer_id: '1' }} commonComponents={{ Header }}/>);

    // エラーメッセージが表示されているか確認
    expect(await screen.findByText('エラーが発生しました。')).toBeInTheDocument();
  });

  // 編集ボタンのテスト
  it('navigates to edit screen on edit button click', async () => {
    render(<CustomerDetail params={{ customer_id: '1' }} commonComponents={{ Header }}/>);

    // 編集ボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: '編集' }));

    // 正しいパスに遷移したか確認
    expect(mockRouter.push).toHaveBeenCalledWith('/customers/1/edit');
  });
});
"}