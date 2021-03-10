import {
  Box,
  Button,
  Grid,
  Input,
  Styled,
  Text,
  Flex,
  Spinner,
} from "theme-ui";
import { PanelLayout } from "../../src/common/layouts";
import {
  borderBottomLeftRadiusMobile,
  standardShortWidthLaptop,
  standardShortWidthMobile,
} from "../../styles/commonStyle";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { TYPES } from "../../src/store/enums";
import { ProtectedRouteHOC } from "../../src/common/components";
import { ME, UPDATE_SETTINGS } from "../../src/lib/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { user } from "../../src/store/reducers/user";
import React, { useEffect, useState } from "react";

const Settings = (props: { isBusinessPanel?: boolean; user: any }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    updateName: "",
    updateEmail: "",
    updatePassword: "",
    updateUsername: "",
  });

  const context = { headers: { authorization: props.user.token } };
  const [err, setErr] = useState("");

  const [
    updateSettings,
    { data: updateData, loading: updateLoading, error: updateErr },
  ] = useMutation(UPDATE_SETTINGS, {
    context,
    errorPolicy: "all",
  });

  const { data, error } = useQuery(ME, {
    context,
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setState({
        ...state,
        updateName: data.me.full_name,
        updateEmail: data.me.email,
        updateUsername: data.me.username,
      });
      return;
    }

    if (error) {
      setErr(error.message);
      return;
    }
    if (updateData && updateData.updateData) {
      console.log("update Data = ", updateData);
      router.push("/panel");
      return;
    }
  }, [data, error]);

  useEffect(() => {
    // if (updateData && updateData.updateUser) {
    //   console.log("update Data = ", updateData);
    //   router.push("/panel");
    //   return;
    // }

    if (updateErr) {
      setErr(updateErr.message);
      return;
    }
    //updateData,
  }, [updateErr]);

  const logout = async () => {
    await fetch("/api/auth/logout");
    dispatch({ type: TYPES.LOGOUT_USER });

    router.push("/");
  };

  const updateSettingsBtn = () => {
    setErr("");
    updateSettings({ variables: { input: { ...state } } });
  };

  const onChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <PanelLayout bodyTopMargin={40} businessPanel={props.isBusinessPanel}>
      <Grid
        sx={{
          width: [
            standardShortWidthMobile,
            standardShortWidthMobile,
            standardShortWidthLaptop,
          ],
          margin: "auto",
        }}
      >
        <Styled.h4>Settings</Styled.h4>
        <Box mt={3}>
          <Input
            type="text"
            name={"updateName"}
            onChange={onChange}
            value={state.updateName}
            placeholder="Change Name"
          />
          <Input
            mt={4}
            onChange={onChange}
            name="updateEmail"
            type="email"
            value={state.updateEmail}
            placeholder="Change Email Address"
          />

          <Input
            mt={4}
            type="text"
            onChange={onChange}
            name="updateUsername"
            value={state.updateUsername}
            placeholder="Change Username"
          />

          <Input
            mt={4}
            type="password"
            onChange={onChange}
            name="updatePassword"
            value={state.updatePassword}
            placeholder="Change Password"
          />

          <Flex sx={{ alignItems: "flex-end" }}>
            <Button
              mt={3}
              sx={{
                borderBottomLeftRadius: borderBottomLeftRadiusMobile,
                ":focus": {
                  outline: "none",
                },
              }}
              onClick={updateSettingsBtn}
            >
              <Styled.h5>Update</Styled.h5>
            </Button>
            {updateLoading && <Spinner />}

            {err && (
              <Text color="primary" ml={3} mr={3}>
                {err}
              </Text>
            )}

            <Button
              mt={3}
              ml={3}
              sx={{
                borderBottomLeftRadius: borderBottomLeftRadiusMobile,
                bg: "secondary",
                cursor: "pointer",
                ":focus": {
                  outline: "none",
                },
              }}
              onClick={logout}
            >
              <Styled.h5>logout</Styled.h5>
            </Button>
          </Flex>
        </Box>
      </Grid>
    </PanelLayout>
  );
};
export default ProtectedRouteHOC(Settings);
