import React from "react";
import "./style.css";

//component footer layout
export default function Footer() {
  //eventhandler 인스타,네이버 아이콘 버튼 클릭 이벤트 처리
  const onInstaNaverButton = (str: string) => {
    if (str == "i") window.open("https://www.instagram.com");
    else window.open("https://blog.naver.com");
  };
  return (
    <div id="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-box">
            <div className="icon-box">
              <div className="icon logo-light-icon"></div>
            </div>
            <div className="footer-logo-text">{"helloooooooooooozzz"}</div>
          </div>
          <div className="footer-link-box">
            <div className="footer-email-link">{"ss@ss.com"}</div>
            <div
              className="icon-button"
              onClick={() => onInstaNaverButton("i")}
            >
              <div className="icon insta-icon"></div>
            </div>
            <div
              className="icon-button"
              onClick={() => onInstaNaverButton("n")}
            >
              <div className="icon naver-blog-icon"></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">
            {"Copyright All Rights Reserved"}
          </div>
        </div>
      </div>
    </div>
  );
}
