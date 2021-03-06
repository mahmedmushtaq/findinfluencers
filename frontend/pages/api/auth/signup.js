import fetch from "isomorphic-fetch";
import withSession from "../../../src/lib/session";

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    const { email, password, full_name, role } = req.body;

    if (!email || !password || !full_name || !role) {
      res.send({
        message: "Please provide email, full_name, role and password",
      });
      return;
    }

    const url = process.env.GRAPHQL_SERVER_HOST;
    const input = { email, password, full_name, role };

    try {
      // we check that the user exists on GitHub and store some data in session
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
      mutation($input: SignUpInput!) {
        signUp(input: $input) {
          token
          email
          id
        }
      }`,

          variables: { input },
        }),
      });

      const responseData = await data.json();

      if (responseData.errors) {
        res.statusCode = 401; // Unauthorized Error
        res.send({ errors: responseData.errors });

        return;
      }

      const signUp = responseData.data.signUp;
      req.session.set("user", signUp);
      await req.session.save();

      const userData = { isLoggedIn: true, ...signUp };

      res.send(userData);
    } catch (error) {
      const { response: fetchResponse } = error;
      res.status(fetchResponse?.status || 500).json(error.data);
    }
  }
});
