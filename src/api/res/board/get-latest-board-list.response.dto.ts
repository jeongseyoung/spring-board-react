import { BoardListItem } from "types/interface";
import ResponseDto from "../responseDto";

export default interface GetLatestBoardListResponseDto extends ResponseDto {
  latestList: BoardListItem[];
}
