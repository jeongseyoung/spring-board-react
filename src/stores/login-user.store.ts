import { User } from "types/interface";
import { create } from "zustand"; // 전역 상태 관리
import { persist } from "zustand/middleware";

interface LoginUserStore {
  loginUser: User | null;
  setLoginUser: (loginUser: User) => void;
  resetLoginUser: () => void;
}
// 전역(global) 상태 관리*****************************************************************/
// export const useLoginUserStore = create<LoginUserStore>((set) => ({
//   loginUser: null,
//   setLoginUser: (loginUser) => set((state) => ({ ...state, loginUser })),
//   resetLoginUser: () => set((state) => ({ ...state, loginUser: null })),
// }));

// export const useLoginUserStore = create<LoginUserStore>((set) => ({
//   loginUser: null,
//   setLoginUser: (loginUser) => set((state) => ({ ...state, loginUser })),
//   resetLoginUser: () => set((state) => ({ ...state, loginUser: null })),
// }));

// url 직접 입력해서 페이지 이동 -> loginUser초기화 됨?

export const useLoginUserStore = create<LoginUserStore>()(
  persist(
    (set) => ({
      loginUser: null,
      setLoginUser: (loginUser) => set((state) => ({ ...state, loginUser })),
      resetLoginUser: () => set((state) => ({ ...state, loginUser: null })),
    }),
    {
      name: "user-storage",
    }
  )
);
