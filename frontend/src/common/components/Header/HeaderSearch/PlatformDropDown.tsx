import DropDown from "../../DropDown/DropDown";
import { Text } from "theme-ui";

const items = [
  { id: 1, text: "TikTok" },
  { id: 2, text: "Instagram" },
  { id: 3, text: "Youtube" },
  { id: 4, text: "More" },
];

interface PropsType {
  showDropDown: boolean;
  setSelectedPlatform: Function;
  platformsList: { id: string; name: string }[];
}

const PlatformDropDown = (props: PropsType) => {
  const { showDropDown, setSelectedPlatform, platformsList } = props;
  return (
    <DropDown showDropDown={showDropDown} top={15}>
      {platformsList.map((item) => (
        <Text
          key={item.id}
          sx={{
            fontFamily: "gilroy",
            pb: 1,
            pt: 1,
            textTransform: "capitalize",
            ":hover": { color: "primary" },
          }}
          onClick={() => setSelectedPlatform(item)}
        >
          {item.name}
        </Text>
      ))}
    </DropDown>
  );
};

export default PlatformDropDown;
