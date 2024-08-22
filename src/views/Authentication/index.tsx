import React, {
  useState,
  KeyboardEvent,
  useRef,
  ChangeEvent,
  useEffect,
} from "react";
import "./style.css";
import { InputBox } from "components/InputBox";
import { SignInRequestDto, SignUpRequestDto } from "api/req/auth";
import { signInRequest, signUpRequest } from "api";
import { SignInResponseDto, SignUpResponseDto } from "api/res/auth";
import { ResponseDto } from "api/res";
import { useCookies } from "react-cookie";
import { MAIN_PATH } from "constant";
import { useNavigate } from "react-router-dom";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";

// component: 인증 화면 컴포넌트
export default function Authentication() {
  // state: 화면 상태
  const [view, setView] = useState<"sign-in" | "sign-up">("sign-in");

  // state : 쿠키 상태
  const [cookies, setCookies] = useCookies();

  // component: sign in card 컴포넌트
  const SignInCard = () => {
    // state : 이메일, 패스워드 요소 참조 상태
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    // state : 이메일, 비밀번호 상태
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // state : 비밀번호 타입 - 비밀번호 옆에 버튼 누르면 비밀번호 노출, 다시 누르면 *****
    const [passwordType, setPasswordType] = useState<"text" | "password">(
      "password"
    ); // 초기값은 *******상태
    // state : 패스워드 버튼 아이콘 상태
    const [passwordButtonIcon, setPassWordButtonIcon] = useState<
      "eye-light-off-icon" | "eye-light-on-icon"
    >("eye-light-off-icon");
    // state : 에러 상태
    const [error, setError] = useState<boolean>(false);
    // function navigator
    const navigator = useNavigate();
    // function : sign in response 처리 함수
    const signInResponse = (
      responseBody: SignInResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) {
        alert("네트워크 이상입니다.");
        return;
      }

      const { code } = responseBody;
      if (code === "DBE") alert("DB오류");
      if (code === "SF" || code === "VF") setError(true);
      if (code !== "SU") return;

      const { token, expirationTime } = responseBody as SignInResponseDto; // -> responseBody: SignInResponseDto ??
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);

      setCookies("accessToken", token, { expires, path: MAIN_PATH() });
      navigator(MAIN_PATH());
    };
    // event handler : 이메일 변경 이벤트 처리
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setEmail(value);
    };
    // event handler : 이메일 변경 이벤트 처리
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setPassword(value);
    };
    // event handler : 로그인, 패스워드 버튼 클릭 이벤트 처리
    const onSignInButtonHandler = () => {
      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody).then(signInResponse);
    };
    const onPasswordButtonClickHandler = () => {
      if (passwordType === "text") {
        setPasswordType("password");
        setPassWordButtonIcon("eye-light-off-icon");
      } else {
        setPasswordType("text");
        setPassWordButtonIcon("eye-light-on-icon");
      }
    };
    // event handler : 회원가입 링크 클릭 이벤트 처리
    const onSignUpLinkClickHandler = () => {
      setView("sign-up");
    };
    // event handler : 이메일, 패스워드 input key down 이벤트
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };
    const onPasswordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      onSignInButtonHandler();
    };

    //render
    return (
      <div className="auth-card">
        <div className="auth-card-box">
          <div className="auth-card-top">
            <div className="auth-card-title-box">
              <div className="auth-card-title">{"로그인"}</div>
            </div>
            <InputBox
              ref={emailRef}
              label="e-mail"
              placeholder="e-mail을 입력하세요"
              type="text"
              error={error}
              value={email}
              onChange={onEmailChangeHandler}
              onKeyDown={onEmailKeyDownHandler}
            />
            <InputBox
              ref={passwordRef}
              label="password"
              placeholder="비밀번호를 입력하세요"
              type={passwordType}
              error={error}
              value={password}
              onChange={onPasswordChangeHandler}
              icon={passwordButtonIcon}
              onButtonClick={onPasswordButtonClickHandler}
              onKeyDown={onPasswordKeyDownHandler}
            />
          </div>
          <div className="auth-card-bottom">
            {error && (
              <div className="auth-sign-in-error-box">
                <div className="auth-sign-in-error-message">
                  {"잘못 입력하셨습니다.\n확인해주세요"}
                </div>
              </div>
            )}
            <div
              className="black-large-full-button"
              onClick={onSignInButtonHandler}
            >
              {"로그인"}
            </div>
            <div className="auth-description-box">
              <div className="auth-description">
                {"신규 사용자인가요? "}
                <span
                  className="auth-description-link"
                  onClick={onSignUpLinkClickHandler}
                >
                  {"회원가입"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // component : sign up card 컴포넌트
  const SignUpCard = () => {
    // state : 이메일, 패스워드, 패스워드, 닉네임, 핸드폰번호, 주소, 상세주소 요소 참조 상태
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);
    const nicknameRef = useRef<HTMLInputElement | null>(null);
    const telNumberRef = useRef<HTMLInputElement | null>(null);
    const addressRef = useRef<HTMLInputElement | null>(null);
    const addressDetailRef = useRef<HTMLInputElement | null>(null);

    // state : 페이지 번호 상태
    const [page, setPage] = useState<1 | 2>(1);

    // state : 이메일, 패스워드, 패스워드, 패스워드체크, 닉네임, 핸드폰번호, 주소, 상세주소, 개인정보동의 타입 상태 상태
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [telNumber, setTelNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [addressDetail, setAddressDetail] = useState<string>("");
    const [passwordType, setPasswordType] = useState<"text" | "password">(
      "password"
    );
    const [passwordCheckType, setPasswordCheckType] = useState<
      "text" | "password"
    >("password");
    const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);

    // state : 에러체크
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isPasswordError, setPasswordError] = useState<boolean>(false);
    const [isPasswordCheckError, setPasswordCheckError] =
      useState<boolean>(false);
    const [isNicknameError, setNicknameError] = useState<boolean>(false);
    const [isTelNumberError, setTelNumberError] = useState<boolean>(false);
    const [isAddressError, setAddressError] = useState<boolean>(false);
    const [isAgreedPersonalError, setAgreedPersonalError] =
      useState<boolean>(false);

    // state : 에러 메세지
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [passwordErrorMessage, setPasswordErrorMessage] =
      useState<string>("");
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =
      useState<string>("");
    const [nicknameErrorMessage, setNicknameErrorMessage] =
      useState<string>("");
    const [telNumberErrorMessage, setTelNumberErrorMessage] =
      useState<string>("");
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>("");

    // function : 다음(daum) 주소 검색 팝업 오픈 함수
    const open = useDaumPostcodePopup(); // 주소 검색 팝업창 오픈!

    // function : sign up response 처리 함수
    const signUpResponse = (
      responseBody: SignUpResponseDto | ResponseDto | null
    ) => {
      if (!responseBody) {
        alert("네트워크 이상");
        return;
      }
      const { code } = responseBody;
      if (code === "DE") {
        setEmailError(true);
        setEmailErrorMessage("이메일 중복");
      }
      if (code === "DN") {
        setNicknameError(true);
        setNicknameErrorMessage("닉네임 중복");
      }
      if (code === "DT") {
        setTelNumberError(true);
        setTelNumberErrorMessage("중복된 휴대폰 번호");
      }
      if (code === "VF") alert("모든 값을 입력하세요");
      if (code === "DBE") alert("DB 오류");

      if (code !== "SU") return;

      setView("sign-in");
    };

    // event handler : 이메일, 패스워드, 패스워드체크, 닉네임, 핸드폰번호, 주소, 상세주소 변경 change 이벤트 처리
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmail(value);
      setEmailError(false);
      setEmailErrorMessage("");
    };
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPassword(value);
      setPasswordError(false);
      setPasswordCheckErrorMessage("");
    };
    const onPasswordCheckChangeHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const { value } = event.target;
      setPasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage("");
    };
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setNickname(value);
      setNicknameError(false);
      setNicknameErrorMessage("");
    };
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTelNumber(value);
      setTelNumberError(false);
      setTelNumberErrorMessage("");
    };
    const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setAddress(value);
      setAddressError(false);
      setAddressErrorMessage("");
    };
    const onAddressDetailChangeHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const { value } = event.target;
      setAddressDetail(value);
    };

    // event handler : 개인정보 동의 체크박스 클릭 이벤트 처리
    const onAgreedPersonalClickHandler = () => {
      setAgreedPersonal(!agreedPersonal);
      setAgreedPersonalError(false);
    };

    // event handler : 키 다운 이벤트
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };
    const onPasswordKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    };
    const onPasswordCheckKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      onNextButtonButtonClickHandler();
    };
    const onNicknameKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!telNumberRef.current) return;
      telNumberRef.current.focus();
    };

    const onTelNumberKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      // if (!addressRef.current) return;
      // addressRef.current.focus();
      onAddressButtonClickHandler();
    };
    const onAddressKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      if (!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    };
    const onAddressDetailKeyDownHandler = (
      event: KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key !== "Enter") return;
      // if (!passwordRef.current) return;
      onSignUpButtonClickHandler(); // 이건 내가적은거
    };
    // event handler : 주소 버튼 클릭 이벤트 처리
    const onAddressButtonClickHandler = () => {
      open({ onComplete });
    };

    // event handler : 다음 단계 버튼 클릭 이벤트 처리 (다음페이지)
    const onNextButtonButtonClickHandler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@[-.]?[a-zA-Z0-9]*\.[a-zA-Z]{2,4}$/;
      const isEmailPatter = emailPattern.test(email);
      if (!isEmailPatter) {
        setEmailError(true);
        setEmailErrorMessage("이메일 주소 형식에 맞춰주세요");
      }
      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage("비밀번호는 8자 이상으로");
      }
      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage("비밀번호가 일치하지 않음");
      }
      if (!isEmailPatter || !isCheckedPassword || isEqualPassword) return;

      setPage(2);
    };
    //event handler : 이전페이지로
    const prevPage = () => {
      setPage(1);
    };
    // event handler : 회원가입 버튼 클릭 이벤트 처리
    const onSignUpButtonClickHandler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@[-.]?[a-zA-Z0-9]*\.[a-zA-Z]{2,4}$/;
      const isEmailPatter = emailPattern.test(email);
      if (!isEmailPatter) {
        setEmailError(true);
        setEmailErrorMessage("이메일 주소 형식에 맞춰주세요");
      }
      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword) {
        setPasswordError(true);
        setPasswordErrorMessage("비밀번호는 8자 이상으로");
      }
      const isEqualPassword = password === passwordCheck;
      if (!isEqualPassword) {
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage("비밀번호가 일치하지 않음");
      }
      if (!isEmailPatter || !isCheckedPassword || isEqualPassword) {
        setPage(1);
        return;
      }
      const hasNickname = nickname.trim().length !== 0;
      if (!hasNickname) {
        setNicknameError(true);
        setNicknameErrorMessage("닉네임을 입력해 주세요");
      }

      const telNumberPattern = /^[0-9]{11,13}$/;
      const isTelNumberPattern = telNumberPattern.test(telNumber);
      if (!isTelNumberPattern) {
        setTelNumberError(true);
        setTelNumberErrorMessage("숫자만 입력 가능");
      }
      const hasAddress = address.trim().length > 0;
      if (!hasAddress) {
        setAddressError(true);
        setAddressErrorMessage("주소를 입력하세요");
      }
      if (!agreedPersonal) setAddressError(true);
      if (!hasNickname || !isTelNumberPattern || !agreedPersonal) return;

      const requestBody: SignUpRequestDto = {
        email,
        password,
        nickname,
        telNumber,
        address,
        addressDetail,
        agreedPersonal,
      };
      signUpRequest(requestBody).then(signUpResponse);
    };

    // event handler : 로그인 링크 클릭 이벤트 처리
    const onSignInLinkClickHandler = () => {
      setView("sign-in");
    };

    // event handler : 다음(daum) 주소 검색 완료 이벤트 처리
    const onComplete = (data: Address) => {
      const { address } = data;
      setAddress(address);
      setAddressError(false);
      setAddressErrorMessage("");
      if (!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    };

    // effect : 페이지가 변경될 때 마다 실행될 함수 (??)
    useEffect(() => {
      if (page === 2) {
        if (!nicknameRef.current) return;
        nicknameRef.current.focus();
      }
    }, [page]);

    // render
    return (
      <div className="auth-card">
        <div className="auth-card-box">
          <div className="auth-card-top">
            <div className="auth-card-title-box">
              <div className="auth-card-title">{"회원가입"}</div>
              <div className="auth-card-page">{`${page}/2`}</div>
            </div>
            {page === 1 && (
              <>
                <InputBox
                  ref={emailRef}
                  label="이메일 주소*"
                  type="text"
                  placeholder="이메일을 입력하세요."
                  value={email}
                  onChange={onEmailChangeHandler}
                  error={isEmailError}
                  message={emailErrorMessage}
                  onKeyDown={onEmailKeyDownHandler}
                />
                <InputBox
                  ref={passwordRef}
                  label="비밀번호*"
                  type={passwordType}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={onPasswordChangeHandler}
                  error={isPasswordError}
                  message={passwordErrorMessage}
                  onKeyDown={onPasswordKeyDownHandler}
                />
                <InputBox
                  ref={passwordCheckRef}
                  label="비밀번호 확인*"
                  type={passwordCheckType}
                  placeholder="비밀번호를 다시 입력하세요"
                  value={passwordCheck}
                  onChange={onPasswordCheckChangeHandler}
                  error={isPasswordCheckError}
                  message={passwordCheckErrorMessage}
                  onKeyDown={onPasswordCheckKeyDownHandler}
                />
              </>
            )}
            {page === 2 && (
              <>
                <InputBox
                  ref={nicknameRef}
                  label="닉네임*"
                  type="text"
                  placeholder="닉네임 입력"
                  value={nickname}
                  onChange={onNicknameChangeHandler}
                  error={isNicknameError}
                  message={nicknameErrorMessage}
                  onKeyDown={onNicknameKeyDownHandler}
                />
                <InputBox
                  ref={telNumberRef}
                  label="핸드폰번호*"
                  type="text"
                  placeholder="핸드폰 번호 입력"
                  value={telNumber}
                  onChange={onTelNumberChangeHandler}
                  error={isTelNumberError}
                  message={telNumberErrorMessage}
                  onKeyDown={onTelNumberKeyDownHandler}
                />
                <InputBox
                  ref={addressRef}
                  label="주소*"
                  type="text"
                  placeholder="우편번호 찾기?"
                  value={address}
                  onChange={onAddressChangeHandler}
                  error={isAddressError}
                  message={addressErrorMessage}
                  icon="expand-right-light-icon"
                  onButtonClick={onAddressButtonClickHandler}
                  onKeyDown={onAddressKeyDownHandler}
                />
                <InputBox
                  ref={addressDetailRef}
                  label="상세주소"
                  type="text"
                  placeholder="상세주소 입력"
                  value={addressDetail}
                  onChange={onAddressDetailChangeHandler}
                  error={false}
                  onKeyDown={onAddressDetailKeyDownHandler}
                />
              </>
            )}
          </div>
          <div className="auth-card-bottom">
            {page === 1 && (
              <div
                className="black-large-full-button"
                onClick={onNextButtonButtonClickHandler}
              >
                {"다음단계"}
              </div>
            )}
            {page === 2 && (
              <>
                <div className="auth-consent-box">
                  <div
                    className="auth-check-box"
                    onClick={onAgreedPersonalClickHandler}
                  >
                    <div
                      className={`icon ${
                        agreedPersonal
                          ? "check-round-fill-icon"
                          : "check-ring-light-icon"
                      }`}
                    ></div>
                  </div>
                  <div
                    className={
                      isAgreedPersonalError
                        ? "auth-consent-title-error"
                        : "auth-consent-title"
                    }
                  >
                    {"개인정보동의"}
                  </div>
                  <div className="auth-consent-link">{"더보기> "}</div>
                  <div className="auth-prevpage" onClick={prevPage}>
                    {"이전으로"}
                  </div>
                </div>
                <div
                  className="black-large-full-button"
                  onClick={onSignUpButtonClickHandler}
                >
                  {"가입하기"}
                </div>
              </>
            )}
            <div className="auth-description-box">
              <div className="auth-description">
                {"이미 게정이 있으신가요? "}
                <span
                  className="auth-description-link"
                  onClick={onSignInLinkClickHandler}
                >
                  {"로그인"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div id="auth-wrapper">
      <div className="auth-container">
        <div className="auth-jumbotron-box">
          <div className="auth-jumbotron-contents">
            <div className="auth-logo-icon"></div>
            <div className="auth-jumbotron-text-box">
              <div className="auth-jumbotron-text">{"welcome"}</div>
              <div className="auth-jumbotron-text">{"zz"}</div>
            </div>
          </div>
        </div>
        <div>
          {view === "sign-in" && <SignInCard />}
          {view === "sign-up" && <SignUpCard />}
        </div>
      </div>
    </div>
  );
}
