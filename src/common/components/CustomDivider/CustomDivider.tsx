import { Divider } from "theme-ui";
const CustomDivider = (props: {
  direction: "horizontal" | "vertical";
  width?: number;
  height?: number;
  bg?: string;
  style?: any;
}) => {
  const { direction, width, height, bg, style } = props;
  const defaultWidth = direction === "horizontal" ? width || 100 : width || 2;
  const defaultHeight = direction === "vertical" ? height || 100 : height || 2;
  const defaultStyle = style || {};
  const defaultBg = bg || "text";
  return (
    <Divider
      bg={defaultBg}
      style={{
        width: defaultWidth,
        height: defaultHeight,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        ...defaultStyle,
      }}
    />
  );
};

export default CustomDivider;
