import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./req/auth";
import { SignInResponseDto, SignUpResponseDto } from "./res/auth";
import { ResponseDto } from "./res";

//export {};
export const DOMAIN = "http://localhost:4000";
export const API_DOMAIN = `${DOMAIN}/api/v1`;
export const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
export const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then((response) => {
      const responseBody: SignInResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_URL(), requestBody)
    .then((res) => {
      const responseBody: SignUpResponseDto = res.data;
    })
    .catch((error) => {});
};
