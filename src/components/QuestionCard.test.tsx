import { render, screen } from "@testing-library/react";
import { QuestionCard } from "./QuestionCard";
import { Question } from "@/types";

const mockQuestions: Question[] = [
  { id: 1, text: "テスト用の質問文です" },
];

const mockQuestionsMultiple: Question[] = [
  { id: 1, text: "質問1です" },
  { id: 2, text: "質問2です" },
  { id: 3, text: "質問3です" },
];

describe("QuestionCard", () => {
  it("質問文が表示される", () => {
    render(<QuestionCard questions={mockQuestions} />);
    expect(screen.getByText("テスト用の質問文です")).toBeInTheDocument();
  });

  it("エラーなくレンダリングされる", () => {
    const { container } = render(<QuestionCard questions={mockQuestions} />);
    expect(container).toBeTruthy();
  });

  it("isAnimating=true のときもエラーなくレンダリングされる", () => {
    render(<QuestionCard questions={mockQuestions} isAnimating={true} />);
    expect(screen.getByText("テスト用の質問文です")).toBeInTheDocument();
  });

  it("複数の質問文がすべて表示される", () => {
    render(<QuestionCard questions={mockQuestionsMultiple} />);
    expect(screen.getByText("質問1です")).toBeInTheDocument();
    expect(screen.getByText("質問2です")).toBeInTheDocument();
    expect(screen.getByText("質問3です")).toBeInTheDocument();
  });
});
