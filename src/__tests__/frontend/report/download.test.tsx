{"code": "import { render, screen, fireEvent } from \"@testing-library/react\";
import Download from \"@/pages/report/download\";
import { jest } from '@jest/globals';

// ヘッダーコンポーネントのモック
jest.mock('@/components/common/Header', () => () => <div>ヘッダーモック</div>);

// サイドメニューコンポーネントのモック
jest.mock('@/components/common/SideMenu', () => () => <div>サイドメニューモック</div>);

describe(\"ダウンロード画面\", () => {
  test(\"ダウンロードリンクが存在すること\", () => {
    render(<Download />); 
    expect(screen.getByRole('link', { name: 'ダウンロード' })).toBeInTheDocument();
  });

  test(\"ダウンロードリンククリックでイベントが発火すること\", async () => {
    const mockDownload = jest.fn();
    render(<Download handleDownload={mockDownload} />);
    fireEvent.click(screen.getByRole('link', { name: 'ダウンロード' }));
    expect(mockDownload).toHaveBeenCalledTimes(1);
  });
});"}