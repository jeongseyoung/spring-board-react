import { FavoriteListItem } from "types/interface";
import ResponseDto from "../responseDto";

export default interface GetFavoriteListResponseDto extends ResponseDto {
  favoriteList: FavoriteListItem[];
}
