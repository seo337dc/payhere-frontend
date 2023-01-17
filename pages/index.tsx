import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import Test from "../src/Test";
import { getRepositoryList } from "@Controller";
import { respositoryListAtom } from "@Atom";

function Home() {
  const [respositoryList, setRespositoryList] =
    useRecoilState<[]>(respositoryListAtom);

  const { data, refetch } = useQuery(
    ["repositories"],
    () => getRepositoryList(),
    {
      enabled: false,
      onSuccess: (result) => {
        console.log("result", result);
        if (result.items) setRespositoryList(result.items);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  console.log("respositoryList", respositoryList);

  return (
    <div>
      <Test />
    </div>
  );
}

export default Home;
