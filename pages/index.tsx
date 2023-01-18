import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { Input, message, Spin, Modal } from "antd";
import { throttle } from "lodash";
import styled from "styled-components";

import RepositoryCard from "@Components/app/RepositoryCard";
import MoveToTopBtn from "@Components/basic/MoveToTopBtn";
import DetailSaveListBtn from "@Components/basic/DetailSaveListBtn";

import { getRepositoryList } from "@Controller";
import { saveRepoListAtom } from "@Atom";

import * as CS from "@Style/common.style";

import type { TRepository, TSearchRepoResult } from "@Type";

const btnProps = { style: { display: "none" } };

function Home() {
  const [saveRepoList, setSaveRepoList] =
    useRecoilState<TRepository[]>(saveRepoListAtom);

  const [keyword, setKeyword] = useState("");
  const nextPageRef = useRef(1);
  const [repositories, setRespositories] = useState<TSearchRepoResult>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refetch, isLoading, isFetching } = useQuery<TSearchRepoResult>(
    ["repositories"],
    () => getRepositoryList(keyword, nextPageRef.current),
    {
      // enabled: true,
      onSuccess: (result) => {
        if (repositories) {
          setRespositories({
            ...result,
            items: repositories.items.concat(result.items),
          });
        }

        if (!repositories) setRespositories(result);

        // 현재 위치를 기준으로 가로200px, 세로300px 스크롤 이동
        if (nextPageRef.current > 1) window.scrollBy(0, 10);

        nextPageRef.current++;
      },
    }
  );

  const onSearch = () => {
    setRespositories(null);
    nextPageRef.current = 1;
    refetch();
  };

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

  const findSaveRepo = (repo: TRepository) => {
    if (!saveRepoList || saveRepoList.length === 0) return;

    return saveRepoList.some((saveRepo) => {
      if (saveRepo.id === repo.id) return true;
      return false;
    });
  };

  const handleScroll = throttle(() => {
    if (isLoading) return;

    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      document.documentElement && document.documentElement.scrollTop;

    // 전체의 높이(스크롤 전체) - (스크롤 위치 높이 + 화면 높이)
    if (scrollHeight - innerHeight - scrollTop < 200) refetch();
  }, 300);

  useEffect(() => {
    if (isLoading) return;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    const localSaveRepoStr = window.localStorage.getItem("saveRepoList");
    const parseSaveRepoList = JSON.parse(localSaveRepoStr) as TRepository[];
    setSaveRepoList(parseSaveRepoList || []);
  }, []);

  return (
    <Spin spinning={isFetching} tip="데이터를 검색 중입니다.">
      <Input.Search
        style={{ width: 750 }}
        placeholder="레포지토리를 검색하세요."
        value={keyword}
        enterButton
        onSearch={onSearch}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <CS.Container>
        {!repositories && <CS.CustomEmpty />}
        {repositories &&
          repositories.items.map((repo, index) => (
            <RepositoryCard
              key={`${repo.id}_${index}`}
              repo={repo}
              isAdd={findSaveRepo(repo)}
              addRepo={handleAddSaveRepo}
              delRepo={handleDelSaveRepo}
            />
          ))}
      </CS.Container>
      <MoveToTopBtn />

      {saveRepoList.length > 0 && <DetailSaveListBtn setOpen={setIsOpen} />}

      <Modal
        width="770px"
        visible={isOpen}
        cancelButtonProps={btnProps}
        okButtonProps={btnProps}
        onCancel={() => setIsOpen(false)}
      >
        <ModalInfo>
          {saveRepoList.map((repo, idx) => (
            <RepositoryCard
              key={`${repo.id}_${idx}`}
              repo={repo}
              isAdd={findSaveRepo(repo)}
              addRepo={handleAddSaveRepo}
              delRepo={handleDelSaveRepo}
            />
          ))}
        </ModalInfo>
      </Modal>
    </Spin>
  );
}

export default Home;

const ModalInfo = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;
