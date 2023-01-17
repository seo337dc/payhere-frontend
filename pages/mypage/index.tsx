import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { useQueries } from "@tanstack/react-query";
import styled from "styled-components";
import parser from "react-html-parser";
import { Card, Empty, Divider, Pagination } from "antd";

import { saveRepoListAtom } from "@Atom";
import { getRepoIssueList } from "@Controller";
import { TRepository, TIssue } from "@Type";

import type { UseQueryResult } from "@tanstack/react-query";

function MyPage() {
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

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const handleClickIssue = (issue: TIssue) => {
    window.open(issue.html_url, "");
  };

  const repoName = (issue: TIssue) => {
    const findRepoInfo = saveRepoList.find(
      (repo) => repo.url === issue.repository_url
    );
    if (findRepoInfo) return findRepoInfo.full_name;
    return "-";
  };

  useEffect(() => {
    const localSaveRepoStr = window.localStorage.getItem("saveRepoList");
    const parseSaveRepoList = JSON.parse(localSaveRepoStr) as TRepository[];
    setSaveRepoList(parseSaveRepoList || []);
  }, []);

  const isLoading = results.some((result) => result.isLoading);

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

  return (
    <Container>
      {issueList.length === 0 && <CustomEmpty />}
      {issueList.length > 0 &&
        issueList.slice(offset, offset + limit).map((issue) => (
          <CustomCard
            key={issue.id}
            title={<H3>{issue.title}</H3>}
            size="small"
            onClick={() => handleClickIssue(issue)}
          >
            <RepositoryName>
              <strong>repo:</strong>
              <span className="name">{repoName(issue)}</span>
            </RepositoryName>
            <CustomDivider style={{ margin: "10px 0" }} />
            <Text>{parser(issue.body)}</Text>
          </CustomCard>
        ))}
      {issueList.length > 0 && (
        <PagenationWrap>
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
        </PagenationWrap>
      )}
    </Container>
  );
}

export default MyPage;

const Container = styled.div`
  width: 800px;
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CustomCard = styled(Card)`
  cursor: pointer;
`;

const H3 = styled.div`
  width: 650px;
  height: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Text = styled.div`
  width: 650px;
  min-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  color: rgb(140, 140, 140);
`;

const RepositoryName = styled.div`
  .name {
    margin-left: 5px;
    color: rgb(140, 140, 140);
  }
`;

const CustomEmpty = styled(Empty)`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PagenationWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CustomDivider = styled(Divider)`
  margin: 10px 0 important;
`;
