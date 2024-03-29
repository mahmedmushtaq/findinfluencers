import withSession from "../../../src/lib/session";

export default withSession(async (req, res) => {
  if (req.method === "GET") {
    console.log("destroy session");
    req.session.destroy();
    res.json({ isLoggedIn: false });
  }
});
