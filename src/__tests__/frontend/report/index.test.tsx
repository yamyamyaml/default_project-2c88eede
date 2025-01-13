{"code": "import { render, screen, fireEvent } from \"@testing-library/react\";
import \"@testing-library/jest-dom\";
import ReportIndex from \"@/pages/report/index\";
import { useRouter } from \"next/navigation\";

jest.mock(\"next/navigation\", () => ({
  useRouter: jest.fn(),
}));

// モック
jest.mock(\"@/components/Header\", () => () => <div>ヘッダーモック</div>);
jest.mock(\"@/components/SideMenu\", () => () => <div>サイドメニューモック</div>);

describe(\"レポート出力画面\", () => {
  test(\"レポート種別選択ボタンのクリックでレポート種別選択画面へ遷移\", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<ReportIndex />);

    // レポート種別選択ボタンをクリック
    fireEvent.click(screen.getByRole(\"button\", { name: \"レポート種別選択へ\" }));

    // 画面遷移が呼び出されたことを確認
    expect(push).toHaveBeenCalledWith(\"/report/select\");
  });

  test(\"ヘッダーとサイドメニューが表示される\", () => {
    render(<ReportIndex />);

    // ヘッダーが表示されていることを確認
    expect(screen.getByText(\"ヘッダーモック\")).toBeInTheDocument();

    // サイドメニューが表示されていることを確認
    expect(screen.getByText(\"サイドメニューモック\")).toBeInTheDocument();
  });
});"}