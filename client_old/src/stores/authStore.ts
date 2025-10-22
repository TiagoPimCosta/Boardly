import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  loginData?: string;
}

interface AuthAction {
  setLoginData: (user?: string) => void;
  clearLoginData: () => void;
}

const initialStoreState: AuthState = {
  loginData: undefined,
};

type AuthStore = AuthState & AuthAction;

const useStore = create<AuthStore>()(
  persist(
    immer((set) => ({
      ...initialStoreState,
      setLoginData: (user) => {
        set((state) => {
          state.loginData = user;
        });
      },
      clearLoginData: () => {
        set((state) => {
          state.loginData = undefined;
        });
      },
    })),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStore;
