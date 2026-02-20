import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

describe("Home（メインページ）", () => {
  it("ページ表示時にタイトルが表示される", () => {
    render(<Home />);
    expect(screen.getByText(/アイスブレイクタイム/)).toBeInTheDocument();
  });

  it("ページ表示時に質問が1問表示される", () => {
    render(<Home />);
    expect(screen.getByText(/Q\.1/)).toBeInTheDocument();
  });

  it("「次の質問へ！」ボタンが表示される", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /次の質問/ })).toBeInTheDocument();
  });

  it("初期状態では履歴が表示されない", () => {
    render(<Home />);
    expect(screen.queryByText(/これまでの質問/)).not.toBeInTheDocument();
  });

  it("ボタンクリックで質問番号が増える", async () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /次の質問/ });
    await userEvent.click(button);
    expect(screen.getByText(/Q\.2/)).toBeInTheDocument();
  });

  it("ボタンクリック後に履歴セクションが表示される", async () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /次の質問/ });
    await userEvent.click(button);
    expect(screen.getByText(/これまでの質問/)).toBeInTheDocument();
  });

  it("ボタンを3回押すと履歴が3件になる", async () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /次の質問/ });
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
  });
});
