import { CommentListItem } from "types/interface";
import ResponseDto from "../responseDto";

export default interface GetCommentListResponseDto extends ResponseDto {
  commentList: CommentListItem[];
}
