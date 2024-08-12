export default interface BoardListItem {
  boardNumber: number;
  title: string;
  content: string;
  boardTitleImage: string | null;
  favoriteCnt: number;
  commentCnt: number;
  viewCnt: number;
  writeDatetime: string;
  writerNickname: string;
  writerProfileImage: string | null;
}
