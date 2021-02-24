import DropDown from "../../DropDown/DropDown";
import { Text } from "theme-ui";
import { motion } from "framer-motion";

const items = [
  { id: 1, text: "LifeStyle" },
  { id: 2, text: "Fashion" },
  { id: 3, text: "Model" },
  { id: 4, text: "Art" },
  { id: 5, text: "All" },
];

const CategoryDropDown = (props: { showDropDown: boolean }) => {
  const { showDropDown } = props;
  return (
    <DropDown showDropDown={showDropDown} top={15}>
      <div style={{ overflowY: "auto" }}>
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
      </div>
    </DropDown>
  );
};

export default CategoryDropDown;
