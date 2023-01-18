import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { useQueries } from "@tanstack/react-query";
import { Pagination, Spin } from "antd";

import IssueCard from "@Components/app/IssueCard";

import { saveRepoListAtom } from "@Atom";
import { getRepoIssueList } from "@Controller";

import * as CS from "@Style/common.style";

import type { TRepository, TIssue } from "@Type";
import type { UseQueryResult } from "@tanstack/react-query";

function Issue() {
  const [saveRepoList, setSaveRepoList] =
    useRecoilState<TRepository[]>(saveRepoListAtom);

  const results = useQueries<UseQueryResult[]>({
    queries: saveRepoList.map((repo) => {
      return {
        queryKey: ["issue", repo.id],
        queryFn: () => getRepoIssueList(repo.full_name),
      };
    }),
  });

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const isLoading = results.some((data) => data.isLoading);

  const issueList = useMemo(() => {
    if (isLoading) return [] as TIssue[];

    const successData = results
      .filter((resultData) => resultData.isSuccess)
      .map((resultData) => resultData.data);

    if (successData && successData.length > 0) {
      const joinIssueList = successData.reduce((acc: TIssue[], cur: TIssue) => {
        return acc.concat(cur) as TIssue[];
      });
      return joinIssueList as TIssue[];
    }

    return [] as TIssue[];
  }, [results]);

  useEffect(() => {
    const localSaveRepoStr = window.localStorage.getItem("saveRepoList");
    const parseSaveRepoList = JSON.parse(localSaveRepoStr) as TRepository[];
    setSaveRepoList(parseSaveRepoList || []);
  }, []);

  return (
    <Spin spinning={isLoading} tip="데이터를 조회 중입니다.">
      <CS.Container>
        {issueList.length === 0 && <CS.CustomEmpty />}
        {issueList.length > 0 &&
          issueList
            .slice(offset, offset + limit)
            .map((issue) => <IssueCard issue={issue} />)}
      </CS.Container>
      {issueList.length > 0 && (
        <CS.PagenationWrap>
          <Pagination
            defaultCurrent={page}
            total={issueList.length}
            pageSize={limit}
            pageSizeOptions={[5, 10, 20, 30, 40, 50, 10]}
            onChange={(pageData, pageSize) => {
              setPage(pageData);
              setLimit(pageSize);
            }}
          />
        </CS.PagenationWrap>
      )}
    </Spin>
  );
}

export default Issue;
