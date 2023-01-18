import axios from "axios";

const BASE_URL = "https://api.github.com";

export const getRepositoryList = async (keyword: string, nextPage: number) => {
  const res = await axios.get(
    `${BASE_URL}/search/repositories?q=${keyword}t&page=${nextPage}`
  );
  return res.data;
};

export const getRepoIssueList = async (fullName: string) => {
  const res = await axios.get(`${BASE_URL}/repos/${fullName}/issues`);
  return res.data;
};
