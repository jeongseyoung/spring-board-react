import { BoardListItem } from "types/interface";
import ResponseDto from "../responseDto";

export default interface GetSearchBoardListResponseDto extends ResponseDto {
  searchList: BoardListItem[];
}
