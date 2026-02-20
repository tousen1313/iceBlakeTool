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
    render(<QuestionCard question={mockQuestion} questionNumber={1} />);
    expect(screen.getByText("テスト用の質問文です")).toBeInTheDocument();
  });

  it("質問番号が Q.{n} 形式で表示される", () => {
    render(<QuestionCard question={mockQuestion} questionNumber={3} />);
    expect(screen.getByText("Q.3")).toBeInTheDocument();
  });

  it("エラーなくレンダリングされる", () => {
    const { container } = render(
      <QuestionCard question={mockQuestion} questionNumber={1} />
    );
    expect(container).toBeTruthy();
  });
});
