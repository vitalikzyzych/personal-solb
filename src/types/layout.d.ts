import React, {
  Dispatch,
  HTMLAttributeAnchorTarget,
  ReactElement,
  ReactNode,
  SetStateAction,
} from "react";
import { NextPage } from "next";
import type { Demo } from "./demo";
import { Toast } from "primereact/toast";

/* Next & Layout Types */
type Page<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type ChildContainerProps = {
  children: ReactNode;
};

/* Exported types */
export type MenuMode =
  | "static"
  | "overlay"
  | "horizontal"
  | "slim"
  | "slim-plus"
  | "reveal"
  | "drawer";

export type ColorScheme = "light" | "dark";

export type MenuProfilePosition = "start" | "end";

/* Breadcrumb Types */
export interface AppBreadcrumbProps {
  className?: string;
}

export interface Breadcrumb {
  labels?: string[];
  to?: string;
}

export interface BreadcrumbItem {
  label: string;
  to?: string;
  items?: BreadcrumbItem[];
}

/* Context Types */
export type LayoutState = {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  overlaySubmenuActive: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  menuHoverActive: boolean;
  sidebarActive: boolean;
  anchored: boolean;
  topbarMenuActive: boolean;
  menuProfileActive: boolean;
  rightMenuActive: boolean;
  profileSidebarVisible: boolean;
  resetMenu: boolean;
};

export type LayoutConfig = {
  ripple: boolean;
  inputStyle: "outlined" | "filled";
  menuMode: MenuMode;
  colorScheme: ColorScheme;
  theme: string;
  scale: number;
  menuTheme: string;
  topbarTheme: string;
};

export interface LayoutContextProps {
  layoutConfig: LayoutConfig;
  setLayoutConfig: Dispatch<SetStateAction<LayoutConfig>>;
  layoutState: LayoutState;
  setLayoutState: Dispatch<SetStateAction<LayoutState>>;
  onMenuProfileToggle: () => void;
  onMenuToggle: () => void;
  onTopbarMenuToggle: () => void;
  showRightSidebar: () => void;
  isSlim: () => boolean;
  isSlimPlus: () => boolean;
  isHorizontal: () => boolean;
  isDesktop: () => boolean;
  isSidebarActive: () => boolean;
  breadcrumbs?: Breadcrumb[];
  setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>;
  showConfigSidebar: () => void;
  showSidebar: () => void;
}

export interface MailContextProps {
  mails: Demo.Mail[];
  toastRef: React.RefObject<Toast>;
  updateMails: (data: Demo.Mail[]) => void;
  clearMailActions: (mail: Demo.Mail) => void;
  onStar: (id: number) => void;
  onArchive: (id: number) => void;
  onBookmark: (id: number) => void;
  onDelete: (id: number) => void;
  onDeleteMultiple: (mailArray: Demo.Mail[]) => void;
  onArchiveMultiple: (mailArray: Demo.Mail[]) => void;
  onSpamMultiple: (mailArray: Demo.Mail[]) => void;
  onTrash: (id: number) => void;
  onSend: (mail: Demo.Mail) => void;
}

export interface MenuContextProps {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}

export interface ChatContextProps {
  users: Demo.User[];
  setUsers: Dispatch<SetStateAction<Demo.User[]>>;
  activeUser: Demo.User;
  setActiveUser: Dispatch<SetStateAction<User>>;
  getChatData: () => Promise<Demo.User[]>;
  changeActiveChat: (user: Demo.User) => void;
  sendMessage: (message: Demo.Message) => void;
}

export interface TaskContextProps {
  dialogConfig: Demo.DialogConfig;
  selectedTask: Demo.Task | null;
  tasks: Demo.Task[];
  members: Demo.Member[];
  setTasks: Dispatch<SetStateAction<Demo.Task[]>>;
  setMembers: Dispatch<SetStateAction<Demo.Member[]>>;
  setDialogConfig: Dispatch<SetStateAction<DialogConfig>>;
  setSelectedTask: Dispatch<SetStateAction<Demo.Task | null>>;
  getTasks: () => Promise<Demo.Task[]>;
  getMembers: () => Promise<Demo.Member[]>;
  addTask: (task: Demo.Task) => void;
  editTask: (task: Demo.Task) => void;
  removeTask: (id: number) => void;
  onTaskSelect: (task: Demo.Task) => void;
  markAsCompleted: (task: Demo.Task) => void;
  showDialog: (header: string, newTask: boolean) => void;
  closeDialog: () => void;
}

/* AppConfig Types */
export interface AppConfigProps {
  minimal?: boolean;
}

/* AppTopbar Types */
export type NodeRef = MutableRefObject<ReactNode>;
export interface AppTopbarRef {
  menubutton?: HTMLButtonElement | null;
  topbarmenu?: HTMLDivElement | null;
  topbarmenubutton?: HTMLButtonElement | null;
}

/* AppMenu Types */
type CommandProps = {
  originalEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
  item: MenuModelItem;
};

export interface MenuProps {
  model: MenuModel[];
}

export interface MenuModel {
  label?: string;
  icon?: string;
  items?: MenuModel[];
  badge?: integer;
  to?: string;
  url?: string;
  target?: HTMLAttributeAnchorTarget;
  seperator?: boolean;
  badgeClassName?: string;
  badgeStyle?: CSSProperties;
  className?: string;
  visible?: boolean;
  disabled?: boolean;
}

export interface UseSubmenuOverlayPositionProps {
  target: HTMLElement | null;
  overlay: HTMLElement | null;
  container: HTMLElement | null;
  when?: unknown;
}

export interface AppMenuItem extends MenuModel {
  items?: AppMenuItem[];
  badge?: "updated" | "new";
  badgeClass?: string;
  class?: string;
  preventExact?: boolean;
  visible?: boolean;
  disabled?: boolean;
  replaceUrl?: boolean;
  command?: ({ originalEvent, item }: CommandProps) => void;
}

export interface AppMenuItemProps {
  item?: AppMenuItem;
  parentKey?: string;
  index?: number;
  root?: boolean;
  className?: string;
}
