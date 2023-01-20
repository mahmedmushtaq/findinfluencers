import { Box, Button, Spinner, Flex, Input, Styled, Text } from "theme-ui";
import {
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../../../../styles/commonStyle";
import { useState } from "react";
import { useRouter } from "next/router";
import { PropsType } from "../propsType";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUserAction } from "../../../../store/actions";

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

const SignUp = (props: PropsType) => {
  const [error, setError] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
  });

  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (!state.full_name || !state.email || !state.password || !state.role)
      return;

    setLoading(true);
    try {
      const { data: res }: any = await axios.post("/api/auth/signup", {
        ...state,
      });

      dispatch(loginUserAction(res));
      // send user data to global state
      // dispatch({ type: TYPES.ADD_USER, payload: res });

      // if role is influencer then return user to influencer otherwise push to client panel
      // currenly only handle influencer
      if (!props.onSuccessful) {
        let defaultPath = "/panel";
        if (res.role === "buyer") {
          defaultPath = "/panel/business";
        } else if (res.role === "admin") defaultPath = "/panel/admin";
        //   router.push(props.path ? props.path : defaultPath);
        // @ts-ignore
        window.location = props.path ? props.path : defaultPath;
      } else props.onSuccessful(res);
    } catch (err) {
      console.log("err is ", err);
      if (err.response) setError(err?.response?.data?.errors?.[0]?.message);
      else setError(err.response.data);
    } finally {
      setLoading(false);
    }
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
        <Text> Join As A Service Buyer</Text>
      </Flex>

      <Button mt={4} onClick={onSubmit}>
        Sign Up
      </Button>
      {loading && <Spinner ml={3} />}
      {error && <Text ml={3}>{error}</Text>}
    </Box>
  );
};

export default SignUp;
