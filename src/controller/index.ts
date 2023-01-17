import axios from "axios";

export const getRepositoryList = async (keyword: string, nextPage: number) => {
  const res = await axios.get(
    `https://api.github.com/search/repositories?q=${keyword}t&page=${nextPage}&per_page=30`
    // "https://api.github.com/repos/hyun-jii/CRESCENDO/issues"
    // https://api.github.com/repos/microsoft/typescript/issues
  );
  return res.data;
};
