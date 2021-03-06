import {
  Box,
  Button,
  Input,
  Styled,
  Text,
  Spinner,
  Flex,
  Alert,
} from "theme-ui";
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

const SignIn = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState([]);
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const signInButton = async () => {
    if (!state.email || !state.password) return;
    fetch("/api/auth", {
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
        router.push("/panel");
      });
  };

  return (
    <Box>
      <Styled.h3>Sign In</Styled.h3>
      <Input
        mt={4}
        sx={{ ...InputStyle }}
        name="email"
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
        onChange={onChange}
      />
      <Text mt={3} sx={{ cursor: "pointer" }}>
        Forgot Password?
      </Text>
      <Flex sx={{ alignItems: "flex-end" }}>
        <Button
          mt={4}
          onClick={signInButton}
          sx={{ ":focus": { outline: "none" } }}
        >
          Sign In
        </Button>
        {/* {loading && <Spinner ml={3} />} */}

        {error && <Text ml={3}>{error}</Text>}
      </Flex>
    </Box>
  );
};

export default SignIn;
