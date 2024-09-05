import ResponseDto from "../responseDto";

export default interface GetRelationListResponseDto extends ResponseDto {
  relativeWordList: string[];
}
