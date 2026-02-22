import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

jest.mock("@/components/TodayFact", () => ({
  TodayFact: () => null,
}));

describe("Home（メインページ）", () => {
  it("ページ表示時にタイトルが表示される", () => {
    render(<Home />);
    expect(screen.getByText(/アイスブレイク/)).toBeInTheDocument();
  });

  it("ページ表示時に main 要素が存在する", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("初期状態で「スタート」ボタンが表示される", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /スタート/ })).toBeInTheDocument();
  });

  it("初期状態でプレースホルダーテキストが表示される", () => {
    render(<Home />);
    expect(screen.getByText(/スタートを押してください/)).toBeInTheDocument();
  });

  it("スタートボタンクリック後に「他の質問へ」ボタンが表示される", async () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /スタート/ });
    await userEvent.click(button);
    expect(screen.getByRole("button", { name: /他の質問/ })).toBeInTheDocument();
  });
});
