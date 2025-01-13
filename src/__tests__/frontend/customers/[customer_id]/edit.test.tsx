{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import axios from 'axios';
import CustomerEdit from '@/pages/customers/[customer_id]/edit';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// ヘッダーコンポーネント（モック）
const Header = () => <div>ヘッダー</div>;

// テストデータ
const customerData = {
  id: \"1\",
  customer_code: \"C001\",
  name: \"テスト太郎\",
  furigana: \"テストタロウ\",
  gender: \"男性\",
  birth_date: \"1990-01-01\",
  age: 33,
  organization_name: \"テスト会社\",
  representative_name: \"\",
  job_title: \"\",
  postal_code: \"100-0001\",
  address1: \"東京都千代田区千代田1-1-1\",
  address2: \"\",
  email: \"test@example.com\",
  phone: \"03-1234-5678\",
  notes: \"\",
  warning_flag: false,
};

// コンポーネントのレンダリング
const setup = async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: customerData });
  render(<CustomerEdit params={{ customer_id: '1' }} />);
  await screen.findByText('顧客情報編集画面');
};

// テストスイート
describe('顧客情報編集画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('顧客情報が正しく表示されること', async () => {
    await setup();
    expect(screen.getByText('テスト太郎')).toBeInTheDocument();
    expect(screen.getByText('テストタロウ')).toBeInTheDocument();
    // ... その他のフィールド
  });

  it('顧客情報を編集できること', async () => {
    await setup();
    const nameInput = screen.getByLabelText('氏名') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'テスト次郎' } });
    expect(nameInput.value).toBe('テスト次郎');
    // ... その他のフィールド
  });

  it('保存ボタンがクリックされたときにデータが送信されること', async () => {
    await setup();
    const saveButton = screen.getByRole('button', { name: '保存' });
    mockedAxios.post.mockResolvedValueOnce({});
    fireEvent.click(saveButton);
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    // ... 送信データの検証
  });

    it('ヘッダーコンポーネントが表示されること', async () => {
    await setup();
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
  });

});
"}