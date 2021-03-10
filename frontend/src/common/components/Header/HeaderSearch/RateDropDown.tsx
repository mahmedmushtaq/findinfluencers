import DropDown from "../../DropDown/DropDown";
import { Slider, Box, Text } from "theme-ui";
import { useState } from "react";
interface PropsType {
  rateRange: number[];
  showDropDown: boolean;
  setSelectedRate: Function;
}

const PriceDropDown = (props: PropsType) => {
  const { showDropDown, rateRange, setSelectedRate } = props;
  const [priceState, setPriceState] = useState(rateRange[0]);

  const onChange = (e) => {
    const minValue = +e.target.value;
    setPriceState(minValue);
    setSelectedRate([minValue, rateRange[1]]);
  };

  return (
    <DropDown showDropDown={showDropDown} top={15}>
      <Box pl={4} pr={4} pb={4} pt={2}>
        <Text>Select Price</Text>
        <Text color="primary">${priceState}/hr</Text>
        <Slider
          min={rateRange[0]}
          max={rateRange[1]}
          defaultValue={priceState}
          onChange={onChange}
        />
      </Box>
    </DropDown>
  );
};

export default PriceDropDown;
