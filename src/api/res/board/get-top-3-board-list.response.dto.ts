import { BoardListItem } from "types/interface";
import ResponseDto from "../responseDto";

export default interface GetTop3BoardListResponseDto extends ResponseDto {
  top3List: BoardListItem[];
}
