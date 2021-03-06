import { Box, Flex, Text } from "theme-ui";
import { X } from "react-feather";

interface PropsType {
  category: {
    id: string;
    name: string;
  };
  deleteSelectedCategory: Function;
}

const CategoryItem = (props: PropsType) => {
  return (
    <Flex>
      <Text>{props.category.name}</Text>
      <Box>
        <X
          onClick={() => props.deleteSelectedCategory(props.category.id)}
          style={{ cursor: "pointer" }}
        />
      </Box>
    </Flex>
  );
};

export default CategoryItem;
