import { render, screen } from "@testing-library/react";
import { QuestionCard } from "./QuestionCard";
import { Question } from "@/types";

const mockQuestion: Question = {
  id: 1,
  text: "テスト用の質問文です",
  category: "humor",
};

describe("QuestionCard", () => {
  it("質問文が表示される", () => {
    render(<QuestionCard question={mockQuestion} />);
    expect(screen.getByText("テスト用の質問文です")).toBeInTheDocument();
  });

  it("エラーなくレンダリングされる", () => {
    const { container } = render(<QuestionCard question={mockQuestion} />);
    expect(container).toBeTruthy();
  });

  it("isAnimating=true のときもエラーなくレンダリングされる", () => {
    render(<QuestionCard question={mockQuestion} isAnimating={true} />);
    expect(screen.getByText("テスト用の質問文です")).toBeInTheDocument();
  });
});
