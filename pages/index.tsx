import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { Card, Input, Empty, Divider, Avatar, message } from "antd";
import { CheckCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { throttle } from "lodash";

import { getRepositoryList } from "@Controller";
import { saveRepoListAtom } from "@Atom";
import { TRepository, TSearchRepoResult } from "@Type";

function Home() {
  const [saveRepoList, setSaveRepoList] =
    useRecoilState<TRepository[]>(saveRepoListAtom);

  const [keyword, setKeyword] = useState("");
  const nextPageRef = useRef(1);
  const [repositories, setRespositories] = useState<TSearchRepoResult>(null);

  const { refetch, isLoading } = useQuery<TSearchRepoResult>(
    ["repositories"],
    () => getRepositoryList(keyword, nextPageRef.current),
    {
      enabled: false,
      onSuccess: (result) => {
        if (repositories) {
          setRespositories({
            ...result,
            items: repositories.items.concat(result.items),
          });
        }

        if (!repositories) setRespositories(result);

        if (nextPageRef.current > 1) {
          // 현재 위치를 기준으로 가로200px, 세로300px 스크롤 이동
          window.scrollBy(0, 10);
        }
        nextPageRef.current++;
      },
    }
  );

  const onSearch = () => {
    setRespositories(null);
    nextPageRef.current = 1;
    refetch();
  };

  const handleScroll = throttle(() => {
    if (isLoading) {
      return;
    }

    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      document.documentElement && document.documentElement.scrollTop;

    // 전체의 높이(스크롤 전체) - (스크롤 위치 높이 + 화면 높이)
    if (scrollHeight - innerHeight - scrollTop < 200) {
      refetch();
    }
  }, 300);

  const handleAddSaveRepo = (repo: TRepository) => {
    if (saveRepoList.length >= 4) {
      message.warning(`등록할 수 있는 레포지토리 개수는 4개입니다.`);
      return;
    }
    const result = saveRepoList.concat(repo);
    setSaveRepoList(result);
    window.localStorage.setItem("saveRepoList", JSON.stringify(result));
    message.info(`[${repo.full_name}]레포지토리를 등록하였습니다.`);
  };

  const handleDelSaveRepo = (repo: TRepository) => {
    const result = saveRepoList.filter((data) => data.id !== repo.id);
    setSaveRepoList(result);
    window.localStorage.setItem("saveRepoList", JSON.stringify(result));
    message.info(`[${repo.full_name}]레포지토리를 제거하였습니다.`);
  };

  const findSaveRepo = (saveRepo: TRepository, repo: TRepository) => {
    if (saveRepo.id === repo.id) return true;
  };

  useEffect(() => {
    if (isLoading) return;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    const localSaveRepoStr = window.localStorage.getItem("saveRepoList");
    const parseSaveRepoList = JSON.parse(localSaveRepoStr) as TRepository[];
    setSaveRepoList(parseSaveRepoList);
  }, []);

  return (
    <Container>
      <Input.Search
        placeholder="레포지토리를 검색하세요."
        value={keyword}
        enterButton
        onSearch={onSearch}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {!repositories && <CustomEmpty />}
      {repositories &&
        repositories.items.map((repo) => (
          <Card key={repo.id} title={<h3>{repo.full_name}</h3>} size="small">
            <Text>{repo.description}</Text>

            <Divider />

            <Footer>
              <div>
                <Avatar src={repo.owner.avatar_url} />
              </div>
              <div>
                {saveRepoList.some((saveRepo) =>
                  findSaveRepo(saveRepo, repo)
                ) ? (
                  <CustomCheckIcon onClick={() => handleDelSaveRepo(repo)} />
                ) : (
                  <CustomPlusIcon onClick={() => handleAddSaveRepo(repo)} />
                )}
              </div>
            </Footer>
            {/* <p>git 주소 : {repo.url}</p>
          <p>설명 : {repo.description}</p>
          <p>날짜 : {repo.updated_at}</p>
          <p>이슈 수 : {repo.open_issues_count}</p>
          <div>
            // <div>이미지 {repo.owner.avatar_url}</div>
            <div>id {repo.owner.login}</div>
            <div>레포지토리 주소 {repo.owner.repos_url}</div>
            <div>화면 주소 {repo.owner.html_url}</div>
          </div> */}
          </Card>
        ))}
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 800px;
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Text = styled.div`
  width: 650px;
  min-height: 40px;
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

const Footer = styled.div`
  /* border: 1px solid black; */
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomEmpty = styled(Empty)`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CustomPlusIcon = styled(PlusCircleOutlined)`
  font-size: 25px;
  cursor: pointer;
`;

const CustomCheckIcon = styled(CheckCircleFilled)`
  font-size: 25px;
  cursor: pointer;
`;
