import { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Spinner, Text } from "theme-ui";
import { useMutation } from "@apollo/client";
import CREATE_OFFER from "../../../../../lib/graphql/mutations/profile/CREATE_OFFER";
import nextRouter, { useRouter } from "next/router";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../../../lib/stripe";

import dynamic from "next/dynamic";

const PaymentForm = dynamic(() => import("../../../PaymentForm/PaymentForm"));

const CreateOffer = (props: {
  selectedProfile: { profileId: string; rate: string };
}) => {
  const { selectedProfile: profileSelected } = props;
  const [createOffer, { data, loading, error }] = useMutation(CREATE_OFFER, {
    errorPolicy: "all",
  });
 
  const [msg, setMsg] = useState("");
  const router = useRouter();
  // currenlty we have id in username query
  const id = router.query.username;

  const [state, setState] = useState({ name: "", description: "" });
  const [orderId, setOrderId] = useState("");

  const [selectedProfile, setSelectedProfile] = useState<{
    profileId: string;
    rate: string;
  }>({ profileId: "", rate: "" });

  const onChange = (e: React.ChangeEvent<{ name: string; value: string }>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onChangePrice = (e: React.ChangeEvent<{ value: string }>) => {
    setSelectedProfile({ ...selectedProfile, rate: e.target.value });
  };

  useEffect(() => {
    setSelectedProfile(profileSelected);
  }, [profileSelected]);

  const createOfferBtn = () => {
    if (!state.name) return;

    try {
      // console.log(selectedProfile.profileId);
      createOffer({
        variables: {
          input: {
            ...state,
            status: "needs_approval",
            workingUserId: id,
            amount: +selectedProfile.rate,
            platformProfileId: selectedProfile.profileId,
          },
        },
      });
    } catch (err) {}
  };

  useEffect(() => {
    if (!data) return;
    // setMsg("Offer Has Been Sent Successfully");

    setOrderId(data.createOffer.id);
    setTimeout(() => {
      //  nextRouter.push("/panel/business");
    }, 500);
  }, [data]);

  return (
    <Box mt={3}>
      {msg && (
        <Text mt={3} mb={3} style={{ fontWeight: 700, color: "red" }}>
          {msg}
        </Text>
      )}
      Price
      <Flex mt={1} style={{ alignItems: "center" }}>
        $
        <Input
          type="number"
          placeholder="Project Price"
          value={selectedProfile.rate}
          ml={1}
          onChange={onChangePrice}
        />
      </Flex>
      <Input
        name="name"
        mt={2}
        mb={2}
        placeholder="Order Name"
        value={state.name}
        onChange={onChange}
      />
      <Input
        name="description"
        mt={2}
        mb={2}
        placeholder="Order Description (optional)"
        value={state.description}
        onChange={onChange}
      />
      <Box mt={3}>
        Do You want to send the offer?
        <Box mt={3}>
          <Button variant="contained" ml={3} mr={3} onClick={createOfferBtn}>
            Send It
          </Button>
          {loading && <Spinner />}
        </Box>
        <Box mt={3}>
          <Button ml={3} variant="contained">
            Cancel
          </Button>
        </Box>
      </Box>
      <Elements stripe={stripePromise}>
        <PaymentForm orderId={orderId} />
      </Elements>
    </Box>
  );
};

export default CreateOffer;
