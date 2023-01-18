import { useRecoilValue } from "recoil";
import { Card, Divider } from "antd";
import styled from "styled-components";
import parser from "react-html-parser";

import type { TRepository, TIssue } from "@Type";

import { saveRepoListAtom } from "@Atom";

interface TProps {
  issue: TIssue;
}

function IssueCard({ issue }: TProps) {
  const saveRepoList = useRecoilValue<TRepository[]>(saveRepoListAtom);

  const handleClickIssue = (issue: TIssue) => window.open(issue.html_url, "");

  const repoName = (issue: TIssue) => {
    const findRepoInfo = saveRepoList.find(
      (repo) => repo.url === issue.repository_url
    );
    if (findRepoInfo) return findRepoInfo.full_name;
    return "-";
  };

  return (
    <CustomCard
      key={issue.id}
      title={<H3>{issue.title}</H3>}
      size="small"
      onClick={() => handleClickIssue(issue)}
    >
      <RepositoryName>
        <strong>레포지토리명:</strong>
        <span className="name">{repoName(issue)}</span>
      </RepositoryName>
      <CustomDivider style={{ margin: "10px 0" }} />
      <Body>{parser(issue.body)}</Body>
    </CustomCard>
  );
}

export default IssueCard;

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

const Body = styled.div`
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

const CustomDivider = styled(Divider)`
  margin: 10px 0 important;
`;
