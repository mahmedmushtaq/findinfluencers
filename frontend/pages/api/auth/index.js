import fetch from "isomorphic-fetch";
import withSession from "../../../src/lib/session";

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log("received req ", email);

    if (!email || !password) {
      res.send({ message: "Please provide email and password" });
      return;
    }

    const url = process.env.GRAPHQL_SERVER_HOST;
    const input = { email, password };

    try {
      // we check that the user exists on GitHub and store some data in session
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
      mutation($input: SignInInput!) {
        signIn(input: $input) {
          token
          email
          id
          role
          username
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

      const signIn = responseData.data.signIn;
      req.session.user = signIn;
      await req.session.save();

      const userData = { isLoggedIn: true, ...signIn };

      res.send(userData);
    } catch (error) {
      const { response: fetchResponse } = error;
      res.status(fetchResponse?.status || 500).json(error.data);
    }
  }
});
