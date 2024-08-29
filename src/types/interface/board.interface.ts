export default interface Board {
  boardNumber: number;
  title: string;
  content: string;
  boardImageList: string[];
  writeDatetime: string;
  writerEmail: string;
  writeNickname: string;
  writerProfileImage: string | null;
}
