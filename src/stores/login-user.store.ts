import { User } from "types/interface";
import { create } from "zustand"; // 전역 상태 관리

interface LoginUserStore {
  loginUser: User | null;
  setLoginUser: (loginUser: User) => void;
  resetLoginUser: () => void;
}
// 전역(global) 상태 관리*****************************************************************/
export const useLoginUserStore = create<LoginUserStore>((set) => ({
  loginUser: null,
  setLoginUser: (loginUser) => set((state) => ({ ...state, loginUser })),
  resetLoginUser: () => set((state) => ({ ...state, loginUser: null })),
}));
