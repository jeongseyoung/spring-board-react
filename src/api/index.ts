import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./req/auth";
import { SignInResponseDto, SignUpResponseDto } from "./res/auth";
import { ResponseDto } from "./res";
import { GetSignInUserResponseDto } from "./res/user";
import { PostBoardRequestDto } from "./req/board";
import { request } from "http";
import { PostBoardResponseDto } from "./res/board";

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

// board 게시물 작성 요청
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
export const postBoardRequest = async (
  requestBody: PostBoardRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(POST_BOARD_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: PostBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 로그인 유저 정보 가져오기
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

////  file  ////

const FILE_UPLOAD_URL = () => `/file/upload`;
const multipartFormData = {
  headers: { "Content-type": "multipart/fomr-data" },
};

export const fileUploadRequest = async (data: FormData) => {
  console.log("FILE_UPLOAD_URL()", FILE_UPLOAD_URL(), "/ data", data);

  const result = await axios
    .post(FILE_UPLOAD_URL(), data, multipartFormData)
    .then((response) => {
      const responseBody: string = response.data;
      return responseBody;
    })
    .catch((err) => {
      return null;
    });
  return result;
};
