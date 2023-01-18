import { Card, Divider, Avatar } from "antd";
import styled from "styled-components";

import * as S from "@Components/app/RepositoryCard.style";

import type { TRepository } from "@Type";

interface TProps {
  repo: TRepository;
  isAdd: boolean;
  addRepo: (repo: TRepository) => void;
  delRepo: (repo: TRepository) => void;
}

const { Meta } = Card;

function RepositoryCard({ repo, isAdd, addRepo, delRepo }: TProps) {
  return (
    <Card
      style={{ width: 350, maxHeight: "400px" }}
      key={repo.id}
      title={<S.Title>{repo.full_name}</S.Title>}
      size="small"
      actions={[
        isAdd ? (
          <S.CustomCheckIcon onClick={() => delRepo(repo)} />
        ) : (
          <S.CustomPlusIcon onClick={() => addRepo(repo)} />
        ),
      ]}
    >
      <Meta
        avatar={<Avatar src={repo.owner.avatar_url} />}
        title={repo.owner.login}
        description={
          <S.Desc>
            <div>{repo.description}</div>
          </S.Desc>
        }
      />
    </Card>
  );
}

export default RepositoryCard;

const Desc = styled.div`
  min-height: 100px;
`;
