import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./req/auth";
import { SignInResponseDto, SignUpResponseDto } from "./res/auth";
import { ResponseDto } from "./res";
import { GetSignInUserResponseDto } from "./res/user";
import {
  PatchBoardRequestDto,
  PostBoardRequestDto,
  PostCommentRequestDto,
} from "./req/board";
import { request } from "http";
import {
  PostBoardResponseDto,
  GetBoardResponseDto,
  IncreaseViewCountResponseDto,
  GetFavoriteListResponseDto,
  GetCommentListResponseDto,
  PutFavoriteResponseDto,
  PostCommentResponseDto,
  DeleteBoardResponseDto,
  PatchBoardResponseDto,
  GetTop3BoardListResponseDto,
  GetLatestBoardListResponseDto,
  GetSearchBoardListResponseDto,
  GetPopularListResponseDto,
} from "./res/board";
import { access } from "fs";
import { GetRelationListResponseDto } from "./res/search";

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
      console.log("postBoardRequest");
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
    .catch((error) => {
      if (!error.response) return null;
      //const responseBody: ResponseDto = error.response.data;
      //return responseBody;
    });
  return result;
};

// 게시물 출력
const GET_BOARD_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}`;
export const getBoardRequest = async (boardNumber: string | number) => {
  const result = await axios
    .get(GET_BOARD_URL(boardNumber))
    .then((response) => {
      const responseBody: GetBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 게시물 조회수 +1
const INCREASE_BOARD_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;
export const IncreaseViewCountResponse = async (
  boardNumber: string | number
) => {
  const result = await axios
    .get(INCREASE_BOARD_URL(boardNumber))
    .then((response) => {
      const responseBody: IncreaseViewCountResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 좋아요 리스트
const GET_FAVORITE_LIST_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
export const getFavoriteListRequest = async (boardNumber: string | number) => {
  const result = await axios
    .get(GET_FAVORITE_LIST_URL(boardNumber))
    .then((response) => {
      const responseBody: GetFavoriteListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 댓글 리스트
const GET_COMMENT_LIST_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}/comment-list`;
export const getCommentListRequest = async (boardNumber: string | number) => {
  const result = await axios
    .get(GET_COMMENT_LIST_URL(boardNumber))
    .then((response) => {
      const responseBody: GetCommentListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 좋아요 +1
const PUT_FAVORITE_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}/favorite`;
export const PutFavoriteRequest = async (
  boardNumber: string | number,
  accessToken: string
) => {
  const result = await axios
    .put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
    .then((response) => {
      const responseBody: PutFavoriteResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 댓글 작성
const POST_COMMENT_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}/comment`;
export const PostCommentRequest = async (
  boardNumber: string | number,
  requestBody: PostCommentRequestDto,
  accessToken: string
) => {
  const result = await axios
    .post(
      POST_COMMENT_URL(boardNumber),
      requestBody,
      authorization(accessToken)
    )
    .then((response) => {
      const responseBody: PostCommentResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 게시물 삭제 delete
const DELETE_BOARD_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}`;
export const DeleteBoardRequest = async (
  boardNumber: string | number,
  accessToken: string
) => {
  const result = await axios
    .delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
    .then((response) => {
      const responseBody: DeleteBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 게시물 업데이트, patch
const PATCH_BOARD_URL = (boardNumber: string | number) =>
  `${API_DOMAIN}/board/${boardNumber}`;
export const patchBoardRequest = async (
  boardNumber: string | number,
  requestBody: PatchBoardRequestDto,
  accessToken: string
) => {
  const result = await axios
    .patch(
      PATCH_BOARD_URL(boardNumber),
      requestBody,
      authorization(accessToken)
    )
    .then((response) => {
      const responseBody: PatchBoardResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 최근
const GET_LATEST_BOARD_LIST_URL = () => `${API_DOMAIN}/board/latest-list`;
export const getLastestListRequest = async () => {
  const result = await axios
    .get(GET_LATEST_BOARD_LIST_URL())
    .then((response) => {
      const responseBody: GetLatestBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// top3
const GET_TOP3_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top-3`;
export const getTop3ListRequest = async () => {
  const result = await axios
    .get(GET_TOP3_BOARD_LIST_URL())
    .then((response) => {
      const responseBody: GetTop3BoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// 인기 검색어
const GET_POPULAR_WORD_LIST_URL = () => `${API_DOMAIN}/search/popularword-list`;
export const getPopularWordListRequest = async () => {
  const result = await axios
    .get(GET_POPULAR_WORD_LIST_URL())
    .then((response) => {
      const responseBody: GetPopularListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.respose) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};
// search
const GET_SEARCH_BOARD_LIST_URL = (
  searchWord: string,
  preSearchWord: string | null
) =>
  `${API_DOMAIN}/board/search-list/${searchWord}` +
  `${preSearchWord ? "/" + preSearchWord : ""}`;
export const getSearchBoardListRequest = async (
  searchWord: string,
  preSearchWord: string | null
) => {
  const result = await axios
    .get(GET_SEARCH_BOARD_LIST_URL(searchWord, preSearchWord))
    .then((response) => {
      const responseBody: GetSearchBoardListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// search relation list
const GET_RELATION_LIST_URL = (searchWord: string) =>
  `${API_DOMAIN}/search/${searchWord}/relation-list`;
export const getRelationListRequest = async (searchWord: string) => {
  const result = await axios
    .get(GET_RELATION_LIST_URL(searchWord))
    .then((response) => {
      const responseBody: GetRelationListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};
