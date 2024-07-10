import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Account {
  email?: string;
  auth_token?: string;
  refresh_token?: string;
  id?: number | undefined;
}

interface AccountStore {
  account: Account;
  setAccount: (account: Account) => void;
  clearAccount: () => void;
  updateField: (field: string, value: string) => void;
}

export const useAccountStore = create<
  AccountStore,
  [["zustand/persist", AccountStore]]
>(
  persist(
    (set) => ({
      account: {
        email: "",
        auth_token: "",
        refresh_token: "",
        id: undefined,
      },
      setAccount: (account) => set({ account }),
      clearAccount: () =>
        set({ account: { email: "", auth_token: "", id: undefined } }),
      updateField: (field, value) =>
        set((state) => ({ account: { ...state.account, [field]: value } })),
    }),
    {
      name: "account-storage",
    }
  )
);
