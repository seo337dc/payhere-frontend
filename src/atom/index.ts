import { atom } from "recoil";
import { v1 } from "uuid";

import { TRepository } from "@Type";

export const saveRepoListAtom = atom<TRepository[]>({
  key: `saveRepoListAtom/${v1()}`,
  default: [],
});
