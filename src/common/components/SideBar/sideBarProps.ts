export interface SideBarPropsType {
  openSideBar: boolean;
  setOpenSideBar: Function;
  children?: any;
  direction?: "right" | "left";
  width?: number;
  bg?: string;
}
