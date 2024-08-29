import { Board } from "types/interface";
import ResponseDto from "../responseDto";

export default interface GetBoardResponseDto extends ResponseDto, Board {}
