import ResponseDto from "../responseDto";

// 로그인 하면 토큰받아옴.
export default interface SignInResponseDto extends ResponseDto {
  token: string;
  expirationTime: number;
}
