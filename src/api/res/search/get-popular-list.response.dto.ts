import ResponseDto from "../responseDto";

export default interface GetPopularListResponseDto extends ResponseDto {
  popularWordList: string[];
}
