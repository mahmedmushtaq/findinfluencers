import { NavBar, Footer } from "../../components";
const BasicLayout = (props: { children?: any }) => {
  return (
    <div
      style={{
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div style={{ width: "90%", margin: "0 auto" }}>
        <NavBar />
        <div style={{ width: "100%" }}>{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default BasicLayout;
