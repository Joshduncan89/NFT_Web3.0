import { atom, RecoilState } from "recoil";

export const setModalOpen = atom({
  key: "setModalOpen",
  default: false,
});

export const newNftImage: RecoilState<string | undefined> = atom({
  key: "newNftImage",
  default: undefined,
});
