import { renderHook, act } from "@testing-library/react";
import { useIceBreak } from "./useIceBreak";
import { questions } from "@/data/questions";

describe("useIceBreak", () => {
  it("初期化時に questions の中の1つが currentQuestion に設定される", () => {
    const { result } = renderHook(() => useIceBreak());
    const ids = questions.map((q) => q.id);
    expect(ids).toContain(result.current.currentQuestion.id);
  });

  it("初期化時に history は空配列である", () => {
    const { result } = renderHook(() => useIceBreak());
    expect(result.current.history).toHaveLength(0);
  });

  it("初期化時に questionNumber は 1 である", () => {
    const { result } = renderHook(() => useIceBreak());
    expect(result.current.questionNumber).toBe(1);
  });

  it("nextQuestion を呼ぶと history に前の質問が追加される", () => {
    const { result } = renderHook(() => useIceBreak());
    const first = result.current.currentQuestion;

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0]).toEqual(first);
  });

  it("nextQuestion を呼ぶと questionNumber が +1 される", () => {
    const { result } = renderHook(() => useIceBreak());

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.questionNumber).toBe(2);
  });

  it("nextQuestion を複数回呼ぶと history が積み上がる", () => {
    const { result } = renderHook(() => useIceBreak());

    act(() => { result.current.nextQuestion(); });
    act(() => { result.current.nextQuestion(); });
    act(() => { result.current.nextQuestion(); });

    expect(result.current.history).toHaveLength(3);
    expect(result.current.questionNumber).toBe(4);
  });

  it("nextQuestion 後の currentQuestion は questions の中の1つである", () => {
    const { result } = renderHook(() => useIceBreak());
    const ids = questions.map((q) => q.id);

    act(() => {
      result.current.nextQuestion();
    });

    expect(ids).toContain(result.current.currentQuestion.id);
  });
});
