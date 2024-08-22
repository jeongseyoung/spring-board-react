import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./req/auth";
import { SignInResponseDto, SignUpResponseDto } from "./res/auth";
import { ResponseDto } from "./res";
import { GetSignInUserResponseDto } from "./res/user";

//export {};
//export const DOMAIN = "http://localhost:4000";
export const API_DOMAIN = "/api/v1";
export const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
export const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

const authorization = (accessToken: string) => {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};

export const signInRequest = async (requestBody: SignInRequestDto) => {
  console.log("signInRequest");
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
  console.log("signUpRequest");
  const result = await axios
    .post(SIGN_UP_URL(), requestBody)
    .then((response) => {
      const responseBody: SignUpResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

export const getSignInUserRequest = async (accessToken: string) => {
  const result = await axios
    .get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
    .then((response) => {
      const responseBody: GetSignInUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};
