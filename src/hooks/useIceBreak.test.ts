import { renderHook, act } from "@testing-library/react";
import { useIceBreak } from "./useIceBreak";
import { questions } from "@/data/questions";

describe("useIceBreak", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("初期化時に isStarted は false である", () => {
    const { result } = renderHook(() => useIceBreak());
    expect(result.current.isStarted).toBe(false);
  });

  it("初期化時に isAnimating は false である", () => {
    const { result } = renderHook(() => useIceBreak());
    expect(result.current.isAnimating).toBe(false);
  });

  it("初期化時に currentQuestions は questions の中の1つである", () => {
    const { result } = renderHook(() => useIceBreak());
    const ids = questions.map((q) => q.id);
    expect(ids).toContain(result.current.currentQuestions[0].id);
  });

  it("nextQuestion を呼ぶと isStarted が true になる", () => {
    const { result } = renderHook(() => useIceBreak());
    act(() => {
      result.current.nextQuestion();
    });
    expect(result.current.isStarted).toBe(true);
  });

  it("nextQuestion を呼ぶと isAnimating が true になる", () => {
    const { result } = renderHook(() => useIceBreak());
    act(() => {
      result.current.nextQuestion();
    });
    expect(result.current.isAnimating).toBe(true);
  });

  it("アニメーション完了後に isAnimating が false になる", () => {
    const { result } = renderHook(() => useIceBreak());
    act(() => {
      result.current.nextQuestion();
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current.isAnimating).toBe(false);
  });

  it("アニメーション完了後の currentQuestions は questions の中の1つである", () => {
    const { result } = renderHook(() => useIceBreak());
    act(() => {
      result.current.nextQuestion();
    });
    act(() => {
      jest.runAllTimers();
    });
    const ids = questions.map((q) => q.id);
    expect(ids).toContain(result.current.currentQuestions[0].id);
  });
});
