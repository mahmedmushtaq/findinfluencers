import { Box, Button, Checkbox, Flex, Input, Styled, Text } from "theme-ui";
import Link from "next/link";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../../../../styles/commonStyle";
import { useState } from "react";
import { useRouter } from "next/router";

const InputStyle = {
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  width: [
    standardShortWidthMobile,
    standardShortWidthMobile,
    standardShortWidthLaptop,
  ],
  ":focus": {
    outline: "none",
  },
};

const SignUp = () => {
  const [error, setError] = useState([]);
  const router = useRouter();
  const [state, setState] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
  });

  const onChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (!state.full_name || !state.email || !state.password || !state.role)
      return;

    fetch("/api/auth/signup", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...state }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.errors) {
          setError(res.errors[0].message);
          return;
        }
        // if role is influencer then return user to influencer otherwise push to client panel
        // currenly only handle influencer
        router.push("/panel");
      });
  };
  return (
    <Box>
      <Styled.h3>Sign Up</Styled.h3>
      <Input
        mt={4}
        sx={{ ...InputStyle }}
        name="full_name"
        value={state.full_name}
        onChange={onChange}
        placeholder="Name"
        type="text"
      />

      <Input
        mt={4}
        sx={{ ...InputStyle }}
        name="email"
        value={state.email}
        onChange={onChange}
        placeholder="Email"
        type="email"
      />
      <Input
        mt={4}
        sx={{ ...InputStyle }}
        placeholder="Password"
        type="password"
        name="password"
        value={state.password}
        onChange={onChange}
      />

      <Flex mt={3}>
        <input
          type="checkbox"
          name="role"
          checked={state.role === "influencer"}
          onChange={() => setState({ ...state, role: "influencer" })}
        />
        <Text> Join as a Influencer</Text>
      </Flex>

      <Flex mt={3}>
        <input
          type="checkbox"
          name="role"
          onChange={() => setState({ ...state, role: "buyer" })}
          checked={state.role === "buyer"}
        />
        <Text> Join as a Client</Text>
      </Flex>

      <Button mt={4} onClick={onSubmit}>
        Sign Up
      </Button>
      {error && <Text ml={3}>{error}</Text>}
    </Box>
  );
};

export default SignUp;
