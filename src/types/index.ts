export interface TSearchRepoResult {
  incomplete_results: boolean;
  total_count: number;
  items: TRepository[];
}

export interface TRepository {
  id: number;
  description: string;
  full_name: string; //"duxianwei520/react";
  updated_at: string; //"2023-01-16T10:50:13Z";
  url: string; //"https://api.github.com/repos/duxianwei520/react";
  open_issues_count: number;
  owner: TOwner;
}

export interface TOwner {
  id: number; // 3249653;
  avatar_url: string; // "https://avatars.githubusercontent.com/u/3249653?v=4";
  html_url: string; // "https://github.com/duxianwei520";
  login: string; // duxianwei520;
  repos_url: string; // "https://api.github.com/users/duxianwei520/repos";
}
