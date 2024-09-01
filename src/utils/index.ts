export const convertUrlToFile = async (url: string) => {
  console.log("url", url);
  const response = await fetch(url);
  const data = await response.blob();
  // ex) abc.com/board/3/d3lkbcn-sece2k3n.jpg
  const extend = url.split(".").pop(); // 확장자 추출 -> .jpg -> jpg
  const fileName = url.split("/").pop(); // abc.com / board / 3 /d3lkbcn-sece2k3n.jpg -> pop ->  d3lkbcn-sece2k3n.jpg 추출
  const meta = { type: `image/${extend}` };

  return new File([data], fileName as string, meta);
};

export const convertUrlsToFile = async (urls: string[]) => {
  const files: File[] = []; // File 형식의 빈 배열 하나 만들고
  for (const url of urls) {
    const file = await convertUrlToFile(url);
    files.push(file);
  }
  return files; // []
};
