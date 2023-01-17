import { atom } from "recoil";
import { v1 } from "uuid";

export const respositoryListAtom = atom<[]>({
  key: `stepConbuildTypedition/${v1()}`,
  default: [],
});
