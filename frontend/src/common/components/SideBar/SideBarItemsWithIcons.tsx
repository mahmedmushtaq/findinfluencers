import { SideBarPropsType } from "./sideBarProps";
import SideBar from "./SideBar";
import { Flex, NavLink as LinkStyle, Divider, Box } from "theme-ui";
import Link from "next/link";

interface DataType {
  text: string | any;
  icon: any;
  link: string;
  id: string | number;
}

interface SideBarItemsWithIconProps extends SideBarPropsType {
  data: DataType[];
}

const SideBarItemWithIcon = (props: SideBarItemsWithIconProps) => {
  const {
    openSideBar: showSideBar,
    setOpenSideBar: setShowSideBar,
    direction,
    data,
  } = props;
  return (
    
      <SideBar
        direction={direction}
        openSideBar={showSideBar}
        setOpenSideBar={setShowSideBar}
      >
        <Flex
          sx={{
            flexDirection: "column",
            mt: 15,
          }}
        >
          {data.map((data) => (
            <LinkStyle
              key={data.id}
              style={{ margin: "4px", padding: "1px 0" }}
              sx={{ fontFamily: "gilroy", fontSize: 1 }}
              ml={2}
              mr={2}
            >
              <Link href={`${data.link}`}>
                <div>
                  <Flex>
                    {<data.icon />}
                    <b style={{ marginLeft: 4 }}> {data.text}</b>
                  </Flex>
                  <Divider />
                </div>
              </Link>
            </LinkStyle>
          ))}
        </Flex>
      </SideBar>
    
  );
};

export default SideBarItemWithIcon;
