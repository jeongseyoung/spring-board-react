import { User } from "types/interface";
import ResponseDto from "../responseDto";

export default interface GetSignInUserResponseDto extends ResponseDto, User {} // ResponseDto의 code, message와 user의 email, nickname을 사용하겠다고 선언.
