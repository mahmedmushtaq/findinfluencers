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
import { PropsType } from "../propsType";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { TYPES } from "../../../../store/enums";
import axios from "axios";

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

const SignIn = (props: PropsType) => {
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const signInButton = async () => {
    if (!state.email || !state.password) return;
    setError("");
    setLoading(true);
    try {
      const { data: res }: any = await axios.post("/api/auth", { ...state });
      console.log("data is = ", res);
      dispatch({ type: TYPES.ADD_USER, payload: res });

      if (!props.onSuccessful) {
        let defaultPath = "/panel";
        if (res.role === "buyer") {
          defaultPath = "/panel/business";
        } else if (res.role === "admin") defaultPath = "/panel/admin";
        router.push(props.path ? props.path : defaultPath);
      } else props.onSuccessful(res);
    } catch (err) {
      setError(err.response.data.errors[0].message);
    } finally {
      setLoading(false);
    }

    // send user data to global state
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
        {loading && <Spinner ml={3} />}

        {error && <Text ml={3}>{error}</Text>}
      </Flex>
    </Box>
  );
};

export default SignIn;
