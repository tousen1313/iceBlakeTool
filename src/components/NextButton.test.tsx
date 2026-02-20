import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextButton } from "./NextButton";

describe("NextButton", () => {
  it("クリックで onClick が呼ばれる", async () => {
    const onClick = jest.fn();
    render(<NextButton onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled=true のときクリックしても onClick が呼ばれない", async () => {
    const onClick = jest.fn();
    render(<NextButton onClick={onClick} disabled={true} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("ボタンがレンダリングされる", () => {
    render(<NextButton onClick={() => {}} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("ボタンに aria-label が設定されている", () => {
    render(<NextButton onClick={() => {}} />);
    expect(screen.getByRole("button", { name: /次の質問/ })).toBeInTheDocument();
  });
});
