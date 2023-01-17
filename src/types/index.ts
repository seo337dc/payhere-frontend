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
  html_url: string; // https://github.com/atom/atom
  owner: TOwner;
}

export interface TOwner {
  id: number; // 3249653;
  avatar_url: string; // "https://avatars.githubusercontent.com/u/3249653?v=4";
  html_url: string; // "https://github.com/duxianwei520";
  login: string; // duxianwei520;
  repos_url: string; // "https://api.github.com/users/duxianwei520/repos";
}

export interface TUser {
  avatar_url: string; // "https://avatars.githubusercontent.com/u/26921489?v=4";
  events_url: string; //  "https://api.github.com/users/confused-Techie/events{/privacy}";
  followers_url: string; //  "https://api.github.com/users/confused-Techie/followers";
  following_url: string; //  "https://api.github.com/users/confused-Techie/following{/other_user}";
  gists_url: string; //  "https://api.github.com/users/confused-Techie/gists{/gist_id}";
  gravatar_id: string; //  "";
  html_url: string; //  "https://github.com/confused-Techie";
  id: number; // 26921489;
  login: string; //  "confused-Techie";
  node_id: string; //  "MDQ6VXNlcjI2OTIxNDg5";
  organizations_url: string; //  "https://api.github.com/users/confused-Techie/orgs";
  received_events_url: string; //  "https://api.github.com/users/confused-Techie/received_events";
  repos_url: string; //  "https://api.github.com/users/confused-Techie/repos";
  site_admin: boolean; //  false;
  starred_url: string; // "https://api.github.com/users/confused-Techie/starred{/owner}{/repo}";
  subscriptions_url: string; //  "https://api.github.com/users/confused-Techie/subscriptions";
  type: string; //  "User";
  url: string; //  "https://api.github.com/users/confused-Techie";
}
export interface TIssue {
  id: number;
  body: string;
  created_at: string;
  title: string;
  url: string; // "https://api.github.com/"
  repository_url: string;
  html_url: string;
  number: number;
  user: TUser;
}
