import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextButton } from "./NextButton";

describe("NextButton", () => {
  it("クリックで onClick が呼ばれる", async () => {
    const onClick = jest.fn();
    render(<NextButton onClick={onClick} label="スタート" />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled=true のときクリックしても onClick が呼ばれない", async () => {
    const onClick = jest.fn();
    render(<NextButton onClick={onClick} disabled={true} label="スタート" />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("ボタンがレンダリングされる", () => {
    render(<NextButton onClick={() => {}} label="スタート" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("label に指定したテキストが表示される", () => {
    render(<NextButton onClick={() => {}} label="スタート" />);
    expect(screen.getByRole("button", { name: /スタート/ })).toBeInTheDocument();
  });

  it("label を変えると別のテキストが表示される", () => {
    render(<NextButton onClick={() => {}} label="他の質問へ" />);
    expect(screen.getByRole("button", { name: /他の質問/ })).toBeInTheDocument();
  });
});
