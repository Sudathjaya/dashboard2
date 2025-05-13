export const API_ENDPOINT = {
  USER_LOGIN: "/user/login",
  AUTH_REFRESH: "/auth/refresh",
  FORGOT_PASSWORD: "/user/forgot_password",
  USER_PROFILE: "/user/profile",
  TEAM_DASHBOARD: "/team/dashboard",
  TEAM_DATA: "/team/data",
  JOURNAL: "/journal",
  GROUP_CATEGORY: '/group/categories',
  CREATE_GROUP: '/group/create',
  TEAM_PLAYERS: '/team/players',
  ADD_PLAYERS: '/group/add_player',
  GROUP: '/group',
  UPDATE_GROUP: '/group/update',
  TEAM_PLAY_VISIBILITY: '/team/player_visibility',
  TEAM_MEMBER: '/team/members',
  NOTIFICATIONS_LIST: '/notifications/list',
  NOTIFICATIONS_MARK_AS_SEEN: '/notifications/mark_as_seen',
  NOTIFICATIONS_ACTION_COMPLETE: '/actions/complete',
  USER_UPDATE: '/user/update',
  ACTIONS_LIST: '/actions/list',
  ACTIONS_APPROVALS: '/actions/approval',
  SAVE_IMAGE: '/profile/image',
  USER_INVITE: '/user/invite',
  TEAM_ADMINS: '/team/admins',
  TEAM_INVITE: '/team/invite',
  TEAM_CHANGE_ROLE: "/team/change_role",
  PLAYER_ALL: '/v1/player/all',
  DASHBOARD_PLAYERS_VITALS:'/v1/dashboard/player-vitals',
  ADD_JOURNAL: '/journal/add'
};

export const ROUTE_ENDPOINT = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  FORGOT_PASSWORD_CONFIRM: "/forgotPasswordConfirm",
};

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://dev-teams-api.oxiwear.com";
export const DOMAIN =
  process.env.NEXT_PUBLIC_DOMAIN_URL || "dev.oxiwear.fitness";

export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: "Email is required!",
  INVALID_EMAIL: "Email must be a valid email.",
  PASSWORD_REQUIRED: "Password is required!",
  EMAIL_SENT_FAILED: "Email sent failed!",
  NOT_FOUND_EMAIL: "Sorry, the email you entered doesn’t match our records.",
  INVALID_LOGIN_RESPONSE: "Invalid login response.",
  UNKNOWN_ERROR: "An unknown error occurred.",
  AUTHENTICATION_FAILED: "Authentication failed",
};

export const MESSAGES = {
  EMAIL_SENT_SUCCESS: "Email sent Successfully!",
};
export const STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

export const HTTP_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const STRINGS = {
  STAY_LOGGED_IN: "Stay logged in",
  SIGN_IN: "Sign In",
  FORGOT_PASSWORD: "Forgot Password",
  RESET_PASSWORD: "Reset your password",
  NEXT: "Next",
  PAGINATION_TEXT_FIVE_ITEMS: "View 5 items",
  PAGINATION_TEXT_TEN_ITEMS: "View 10 items",
  PAGINATION_TEXT_TOWENTY_ITEMS: "View 20 items",
};

export const TEXTS = {
  AUTHENTICATED: "authenticated",
};

export const MENU_ITEMS = [
  { title: "Dashboard", value: "dashboard" },
  { title: "Team", value: "team" },
  { title: "Players", value: "player" }
];
export const USER_MENU_ITEMS = [
  "Account",
  "Coach Management",
  "Subscription",
  "Support",
  "Logout",
];
export const DASHBOARD = "dashboard";
export const TEAM = "Team";
export const PLAYERS = "Players";

//Mocks
export const mockAvt =
  "https://dev-oxiwear-static.s3.amazonaws.com/profile/4107e7adfcd631e0e03276c3230d9478?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUDKJ747QFGR2KQQM%2F20241103%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241103T123846Z&X-Amz-Expires=86400&X-Amz-Signature=5af53b5238ad57892e5a09583fbeb2bcba353d408d9adf69f39f8e2838e25e02&X-Amz-SignedHeaders=host";
export const mockUserName = "Pathum";
export const DOT = 4;
