import { render, screen } from "@testing-library/react";
import { HistoryList } from "./HistoryList";
import { Question } from "@/types";

const mockHistory: Question[] = [
  { id: 1, text: "最初の質問", category: "humor" },
  { id: 2, text: "2番目の質問", category: "light" },
];

describe("HistoryList", () => {
  it("history が空のとき、セクションが表示されない", () => {
    const { container } = render(<HistoryList history={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("history が1件以上のとき、リストが表示される", () => {
    render(<HistoryList history={mockHistory} />);
    expect(screen.getByText(/最初の質問/)).toBeInTheDocument();
    expect(screen.getByText(/2番目の質問/)).toBeInTheDocument();
  });

  it("history の件数分のアイテムが表示される", () => {
    render(<HistoryList history={mockHistory} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
  });

  it("同じ質問が複数回 history にあっても正常表示される", () => {
    const duplicate: Question[] = [
      { id: 1, text: "同じ質問", category: "humor" },
      { id: 1, text: "同じ質問", category: "humor" },
    ];
    render(<HistoryList history={duplicate} />);
    expect(screen.getAllByText(/同じ質問/)).toHaveLength(2);
  });
});
