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
  icon?: string; //있어도 되고 없어도 되고

  onButtonClick?: () => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export const InputBox = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const { label, type, error, placeholder, value, icon, message } = props;
    const { setValue, onButtonClick, onKeyDown } = props;

    //event handler: input값 변경 이벤트 처리 함수
    const onChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValue(value);
    };

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
            ref={ref} // 엔터치면 다음 칸으로 이동!
            type={type}
            className="input"
            placeholder={placeholder}
            value={value}
            onChange={onChangeHanlder}
            onKeyDown={onKeyDownHandler}
          />
          {onButtonClick !== undefined && (
            <div className="icon-button">
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
