import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  forwardRef,
} from "react";
import "./style.css";

interface Props {
  label: string;
  type: "text" | "password";
  placeholder: string;
  value: string;
  error: boolean;
  message?: string;
  icon?: "eye-light-off-icon" | "eye-light-on-icon" | "expand-right-light-icon"; // ? -> 있어도 되고 없어도 되고?????

  onButtonClick?: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const InputBox = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const { label, type, error, placeholder, value, icon, message } = props;
    const { onChange, onButtonClick, onKeyDown } = props;

    //event handler: input키 이벤트 처리 함수
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (!onKeyDown) return;
      onKeyDown(event);
    };

    return (
      <div className="inputbox">
        <div className="inputbox-label">{label}</div>
        <div
          className={error ? "inputbox-container-error" : "inputbox-cotainer"}
        >
          <input
            ref={ref} // 엔터치면 다음 칸으로 이동!  ???
            className="input"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDownHandler}
          />
          {onButtonClick !== undefined && (
            <div className="icon-button" onClick={onButtonClick}>
              {icon !== undefined && <div className={`icon ${icon}`}></div>}
            </div>
          )}
        </div>
        {message !== undefined && (
          <div className="inputbox-message">{message}</div>
        )}
      </div>
    );
  }
);
