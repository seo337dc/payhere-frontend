import { Card, Divider, Avatar } from "antd";

import * as S from "@Components/app/RepositoryCard.style";

import type { TRepository } from "@Type";

interface TProps {
  repo: TRepository;
  isAdd: boolean;
  addRepo: (repo: TRepository) => void;
  delRepo: (repo: TRepository) => void;
}

function RepositoryCard({ repo, isAdd, addRepo, delRepo }: TProps) {
  return (
    <Card key={repo.id} title={<h3>{repo.full_name}</h3>} size="small">
      <S.Body>{repo.description}</S.Body>
      <Divider />
      <S.Footer>
        <div>
          <Avatar src={repo.owner.avatar_url} />
        </div>

        <div>
          {isAdd && <S.CustomCheckIcon onClick={() => delRepo(repo)} />}
          {!isAdd && <S.CustomPlusIcon onClick={() => addRepo(repo)} />}
        </div>
      </S.Footer>

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
  );
}

export default RepositoryCard;
