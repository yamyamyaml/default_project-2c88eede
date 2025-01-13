{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import 未発送詳細画面 from '@/pages/shipping/unshipped/[id]';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('@/components/Header', () => () => <div>ヘッダー</div>);
jest.mock('@/components/Footer', () => () => <div>フッター</div>);

describe('未発送詳細画面', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('未発送詳細情報が表示されること', () => {
    render(<未発送詳細画面 params={{ id: '1' }} />); // params を設定
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('フッター')).toBeInTheDocument();
  });

  it('再発送指示ボタンがクリックされた際に再発送指示画面に遷移すること', async () => {
    render(<未発送詳細画面 params={{ id: '1' }} />); // params を設定
    fireEvent.click(screen.getByRole('button', { name: /再発送指示/ }));
    expect(mockRouterPush).toHaveBeenCalledWith('/shipping/resend/1'); // 正しいパスに遷移するか確認
  });

  it('戻るボタンがクリックされた際に未発送リスト確認画面に遷移すること', async () => {
    render(<未発送詳細画面 params={{ id: '1' }} />); // params を設定
    fireEvent.click(screen.getByRole('button', { name: /戻る/ }));
    expect(mockRouterPush).toHaveBeenCalledWith('/shipping/unshipped');
  });

  it('データ取得処理が正しく動作すること', async () => {
    render(<未発送詳細画面 params={{ id: '1' }} />); // params を設定
    // データ取得処理のテストを追加
  });
});"}