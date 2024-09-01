// 커스텀 훅 custom HOOK
// 앞에 use 붙이면됨

import { useEffect, useState } from "react";

const usePagination = <T>(countPerPage: number) => {
  // state : 전체 객체 리스트 상태
  const [totalList, setTotalList] = useState<T[]>([]); // 어떤 타입인지는 받아와서 결정 -> <T>
  // state : 보여줄 객체 리스트 상태
  const [viewList, setViewList] = useState<T[]>([]);
  // state : 현재 페이지 번호 상태
  const [currentPage, setCurretPage] = useState<number>(1);

  // state : 전체 페이지 번호 리스트 상태
  const [totalPageList, setTotalPageList] = useState<number[]>([1]);
  // state : 보여줄 페이지 번호 리스트 상태
  const [viewPageList, setViewPageList] = useState<number[]>([1]);
  // state : 현재 section 상태
  const [currentSection, setCurrentSection] = useState<number>(1);
  // state : 전체 section 상태
  const [totalSection, setTotalSection] = useState<number>(1);

  // function : 보여줄 객체 리스트 추출 함수 (게시물 수)
  const setView = () => {
    const FIRST_INDEX = countPerPage * (currentPage - 1);
    const LAST_INDEX =
      totalList.length > countPerPage * currentPage
        ? countPerPage * currentPage
        : totalList.length;

    const viewList = totalList.slice(FIRST_INDEX, LAST_INDEX);
    setViewList(viewList);
  };
  // function : 보여줄 페이지 리스트(section) 추출 함수 (여기선 10개)
  const setViewPage = () => {
    const FIRST_INDEX = 10 * (currentSection - 1);
    const LAST_INDEX =
      totalPageList.length > 10 * currentSection
        ? 10 * currentSection
        : totalPageList.length;

    const viewPageList = totalPageList.slice(FIRST_INDEX, LAST_INDEX);
    setViewPageList(viewPageList);
  };

  // effect : totalList가 변경될 때마다 실행
  useEffect(() => {
    const totalPage = Math.ceil(totalList.length / countPerPage); // countPerPage -> 페이지당 게시물 수?
    const totalPageList: number[] = [];
    for (let p = 1; p <= totalPage; p++) totalPageList.push(p);
    setTotalPageList(totalPageList);

    const totalSection = totalList.length / (countPerPage * 10); // 섹션당 10개 ( < 1, 2, 3, 4, 5, 6, 7, 8 ,9, 10 > 이런식)
    setTotalSection(totalSection);

    setCurretPage(1);
    setCurrentSection(1);

    setView();
    setViewPage();
  }, [totalList]);

  // effect : current page가 변경될 때 실행
  useEffect(setView, [currentPage]);
  // effect : current section가 변경될 때 실행
  useEffect(setViewPage, [currentPage]);
  //58 장 33:40 섹션 변경 useEffect 부분 [currentPage] -> [currentSection] 으로 변경되어 있는지 확인해보시길 바랍니다~!
  return {
    currentPage,
    setCurretPage,
    currentSection,
    setCurrentSection,
    viewList,
    viewPageList,
    totalSection,
    setTotalList,
  };
};

export default usePagination;
