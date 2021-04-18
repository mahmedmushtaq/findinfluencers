import { Button } from "@theme-ui/components";
import { borderBottomLeftRadiusMobile } from "../../../../styles/commonStyle";

const CustomButton = (props) => {
  return (
    <Button
      sx={{
        borderBottomLeftRadius: borderBottomLeftRadiusMobile,
        ":focus": {
          outline: "none",
          border: "none",
        },
        ...props.sx,
      }}
      {...props}
    />
  );
};

export default CustomButton;
