import { MouseEvent } from "react";
import { Dispatch, SetStateAction } from "react";
export interface ProfileState {
  data: [];
  error: string | null;
}
export interface UserProfile {
  avatar_url?: string;
  first_name?: string;
  email?: string;
  groups?: any[];
  id?: string;
  language?: string;
  last_name?: string;
  role?: string;
  status?: string;
  // eslint-disable-next-line
  team?: {};
}
export interface AccountModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  setOpenedPassword: Dispatch<SetStateAction<boolean>>;
  setOpenAuthentication: Dispatch<SetStateAction<boolean>>;
}
export interface TopBarProps {
  userProfile: UserProfile | null;
}

export interface DashboardProps {
  userProfile: UserProfile | null;
}

export interface NotificationModalProps {
  setOpenAuthentication: Dispatch<SetStateAction<boolean>>;
  setOpenedAccount: Dispatch<SetStateAction<boolean>>;
}

export interface RealTimeNotificationModalProps {
  setOpenAuthentication: Dispatch<SetStateAction<boolean>>;
  setOpenedAccount: Dispatch<SetStateAction<boolean>>;
  setNotificationData: Dispatch<SetStateAction<any[]>>;
  setDot: Dispatch<SetStateAction<boolean>>;
  notificationData: any[];
}
export interface TeamProps {
  userProfile: UserProfile | null;
}
export interface DrawerViewProps {
  drawerOpen: boolean;
  toggleDrawer: (open: boolean) => () => void;
  handleClick: (event: MouseEvent<HTMLElement>) => void;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  userProfile: UserProfile | null;
}
export interface MenuViewProps {
  open: boolean;
  handleClose: () => void;
  handleMenuItem: (item: string) => void;
  anchorEl: HTMLElement | null;
}

export interface MobileViewProps {
  toggleDrawer: (open: boolean) => () => void;
}
export interface UserProps {
  handleClick: (event: MouseEvent<HTMLElement>) => void;
  avatar: string;
  firstName: string;
}
export interface DesktopViewProps {
  dot: number;
  selectedItem: string;
  handleClick: (event: MouseEvent<HTMLElement>) => void;
  setItem: (val: string) => void;
  userProfile: UserProfile | null;
  setOpenAuthenticationBefore: Dispatch<SetStateAction<boolean>>;
  setOpenedAccount: Dispatch<SetStateAction<boolean>>;
}
export interface TabletViewProps {
  selectedItem: string;
  handleClick: (event: MouseEvent<HTMLElement>) => void;
  setItem: (val: string) => void;
  userProfile: UserProfile | null;
  setOpenAuthenticationBefore: Dispatch<SetStateAction<boolean>>;
  setOpenedAccount: Dispatch<SetStateAction<boolean>>;
}
export interface AccessUser {
  id: number;
  userName: string;
  member_id: string;
  user_id?: string;
  avatar_url: string;
  dob: null;
  email: string;
  first_name: string;
  last_name: string;
  language: string;
  last_activity_time: string;
  gender: string;
}

export interface MainTableProps {
  loadData: (
    order: string,
    filed: string,
    page: number,
    pageSize: number,
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  members: any[];
  totalPages: number;
  totalRecords: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any[];
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  group: string;
  getJournalData: () => void;
  setAccessUser: ([]) => void;
}

export interface TableHeaderProps {
  membersCount: number;
  changeOrder: (field: string) => void;
}

export interface PlotChartRecord {
  reading_time: string;
  spo2: number;
  heart_rate: number;
}

export interface PlotChartDataSet {
  spo2: number;
  Heart_Rate: number;
  name: string;
  time: string;
}

export interface Group {
  id: string;
  name: string;
  coach_name?: string;
  category?: string;
  category_id?: string;
}

export interface Player {
  first_name: string;
  last_name?: string;
}

export interface Note {
  id: string;
  title: string;
  reading_time: string;
  Group: Group;
  Player: Player;
  note: string;
}

export interface NotesProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  note: Record<string, Note[]>;
  date: Date;
  setNoteDetails: Dispatch<SetStateAction<Note>>;
  setReadJournal: Dispatch<SetStateAction<boolean>>;
  getJournalData: () => Promise<void>;
  isTabView: boolean;
}
export interface GroupJournal {
  id: string;
  name: string;
}

export interface PlayerJournal {
  user_id: string;
  team_id: string;
  first_name: string;
  last_name?: string;
  name: string;
}

export interface NoteJournal {
  id: string;
  group_id: string;
  player_id: string;
  reading_time: string;
  title: string;
  note: string;
  is_group_note: boolean;
  visibility: "private" | "group";
  display_date: string;
}

export interface JournalAddNoteProps {
  getJournalData: () => void;
  selectedDate: Date;
  noteDetails: Note | null;
  readJournal: boolean;
  setReadJournal: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  open: boolean;
}

export interface AlertState {
  showAlert: boolean;
  severity: "success" | "error";
  message: string;
}
export interface SearchInterfaceProps {
  onSearch: (query: string, team: string) => void;
  // eslint-disable-next-line
  groupData: any[];
  setGroup: Dispatch<SetStateAction<string>>;
  group: string;
  formName: string;
}

export interface ToolBarProps {
  // eslint-disable-next-line
  groupData: any[];
  setGroup: Dispatch<SetStateAction<string>>;
  group: string;
  formName: string;
  isTabView: boolean;
  isNormalTabView: boolean;
  searchPlayers: (order: string, filed: string, query: string) => void;
  setSearchValue: Dispatch<SetStateAction<string>>;
  accessUser: any;
  fData: any
}

export interface FormControlComponent2 {
  // eslint-disable-next-line
  groupData: any[];
  setGroup: Dispatch<SetStateAction<string>>;
  group: string;
  formName: string;
  isTabView: boolean;
  isNormalTabView: boolean;
}

export interface FormControlInterfaceProps {
  // onSearch: (query: string, team: string) => void;
  // eslint-disable-next-line
  groupData: any[];
  setGroup: Dispatch<SetStateAction<string>>;
  group: string;
  formName: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
export interface AddUserModalProps {
  setOpenDevices: Dispatch<SetStateAction<boolean>>;
  openDevices: boolean;
}
