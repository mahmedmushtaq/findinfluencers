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

interface PropsType {
  showDropDown: boolean;
  setSelectedCategory: Function;
  categoriesList: { id: string; name: string }[];
}

const CategoryDropDown = (props: PropsType) => {
  const { showDropDown, setSelectedCategory, categoriesList } = props;
  return (
    <DropDown showDropDown={showDropDown} top={15}>
      <div style={{ overflowY: "auto" }}>
        {categoriesList.map((item) => (
          <Text
            key={item.id}
            sx={{
              fontFamily: "gilroy",
              pb: 1,
              pt: 1,
              textTransform: "capitalize",
              ":hover": { color: "primary" },
            }}
            onClick={() => setSelectedCategory(item)}
          >
            {item.name}
          </Text>
        ))}
      </div>
    </DropDown>
  );
};

export default CategoryDropDown;
