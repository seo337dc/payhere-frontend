import axios from "axios";

export const getRepositoryList = async () => {
  const res = await axios.get(
    "https://api.github.com/search/repositories?q=a&page=1"
  );
  return res.data;
};
