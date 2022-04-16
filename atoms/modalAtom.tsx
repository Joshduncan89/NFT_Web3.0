import { atom, RecoilState } from "recoil";

export const setModalOpen = atom({
  key: "setModalOpen",
  default: false,
});

export const newNftImage: RecoilState<string> = atom({
  key: "newNftImage",
  default: "",
});
