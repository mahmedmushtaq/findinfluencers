import { Button } from "theme-ui";

const skillBtnStyle = {
  //   marginRight: 10,
  //   marginLeft: 20,
  height: 40,
  outline: "none",
  cursor: "pointer",
};

const SubmitProjectBtn = (props: { sx?: any }) => {
  return (
    <Button
      style={{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
      sx={{
        ...props.sx,
      }}
    >
      Submit Project
    </Button>
  );
};

export default SubmitProjectBtn;
