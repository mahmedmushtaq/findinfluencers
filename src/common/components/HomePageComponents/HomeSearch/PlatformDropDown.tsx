import DropDown from "../../DropDown/DropDown";
import { Text } from "theme-ui";
import { motion } from "framer-motion";

const items = [
  { id: 1, text: "TikTok" },
  { id: 2, text: "Instagram" },
  { id: 3, text: "Youtube" },
  { id: 4, text: "More" },
];

const PlatformDropDown = (props: { showDropDown: boolean }) => {
  const { showDropDown } = props;
  return (
    <DropDown showDropDown={showDropDown} top={15}>
      {items.map((item) => (
        <Text
          key={item.id}
          sx={{
            fontFamily: "gilroy",
            pb: 1,
            pt: 1,
            ":hover": { color: "primary" },
          }}
        >
          {item.text}
        </Text>
      ))}
    </DropDown>
  );
};

export default PlatformDropDown;
