import { create } from 'zustand';

interface AuthState {
  agreeTerms: boolean;
  setAgreeTerms: (value: boolean) => void;
}

export const useTermsAndConditionStore = create<AuthState>((set) => ({
  agreeTerms: false,
  setAgreeTerms: (value) => set({ agreeTerms: value }),
}));
