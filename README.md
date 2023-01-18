# payhere-frontend

페이히어 과제

# 과제 설명
- https://www.notion.so/abd0c97a29e542588b22ce21baf56952

# 과제 결과
- https://payhere-frontend.vercel.app/

# 실행 방법
1. npm install 혹은 yarn install
2. npm run build 혹은 yarn build
3. npm run dev  혹은 yarn dev

# 사용한 프레임워크 or 라이브러리
1. core : Next.js, React, typescript
2. state, fetch : react-query, recoil
3. style : scss, styled-component
4. lib : react-html-parse
5. ui : antd ui

# 구현 기능
1. 검색창에 Repository명을 입력해서 Repository를 검색할 수 있다.
2. 검색된 Public Repository를 등록할 수 있다.
    - 등록 개수는 최대 4개로 제한하며, 최대 개수 초과 등록 시 이를 사용자에게 알려준다.
    - 웹은 LocalStorage, 앱은 Async Storage 등 로컬 저장소를 활용한다. (웹 혹은 앱 선택)
3. 등록된 Repository를 삭제할 수 있다.
4. 등록된 각각의 Public Repository의 issue를 한 페이지에서 모아서 볼 수 있다.
    - 각 issue 마다 제목, Repository 명은 필수로 표현되어야 한다. 그 이외의 데이터 중 필요하다고 생각되는 부분은 추가한다.
    - 해당 issue를 클릭하면 Github의 상세 페이지로 이동할 수 있다.
    - 페이지네이션을 통해서 계속해서 issue를 모아서 볼 수 있다.

# 구현 설명
0. 기본적으로 화면 ui는 antd ui 라이브러리를 활용하여 구현했습니다.

1. 검색창에 Repository명을 입력해서 Repository를 검색 (완료)
- github api에서 기본적으로 30개씩 데이터를 받아오기에 양이 너무 많고, 다음 페이지에 대한 여부를 확인하기 어려워 무한스크롤로 적용하였습니다.

2. 검색된 Public Repository 등록(완료)
- LocalStorage와 recoil로 데이터를 저장해서 브라우저를 종료 후에도 계속 유지하도록 구현했습니다.

3. 등록된 Repository를 삭제할 수 있다.(완료)
- LocalStorage와 recoil 둘다 데이터 삭제 가능하도록 구현
- 사용자가 어떤 레포지토리를 등록 했는지 모를 수 있으므로, 등록 된 레포지토리 리스트를 노출하는 모달창을 활용했습니다. 당연히 등록한 레포지토리도 삭제 가능합니다.

4. 등록된 각각의 Public Repository의 issue를 한 페이지에서 모아서 볼 수 있다. (완료)
- issue 제목, Repository명은 default로 노출되며, issue의 내용을 일부 노출 할 수 있도록 react-html-parse라이브러리를 활용하여 적용했습니다.
- issue를 클릭 시, 해당 이슈 상세페이지로 이동하도록 구혔습니다.
- 페이지네이션은 antd에서 제공하는 라이브러리로 적용했습니다.
