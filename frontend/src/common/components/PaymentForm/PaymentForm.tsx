import { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Spinner, Text } from "theme-ui";
import { Modal } from "../index";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "@apollo/client";
import { CREATE_PAYMENT_INTENT } from "../../../lib/graphql";
import SAVE_PAYMENT_INTENT from "../../../lib/graphql/mutations/SAVE_PAYMENT_INTENT";
import router from "next/router";

const PaymentForm = (props: { orderId: string }) => {
  const ref = useRef();
  const stripe = useStripe();
  const elements = useElements();
  const [showCardBox, setShowCardBox] = useState(false);
  const [savePaymentIntent, {}] = useMutation(SAVE_PAYMENT_INTENT, {
    errorPolicy: "all",
  });
  const [loadingAndMsgState, setLoadingAndMsgState] = useState({
    loading: false,
    msg: "",
  });
  const [createPaymentIntent, { data, error, loading }] = useMutation(
    CREATE_PAYMENT_INTENT,
    {
      errorPolicy: "all",
    }
  );

  const { orderId } = props;

  useEffect(() => {
    if (!orderId) return;
    setLoadingAndMsgState({ loading: false, msg: "" });
    //@ts-ignore
    ref?.current?.open();

    createPaymentIntent({ variables: { input: { orderId } } });
  }, [orderId]);

  useEffect(() => {
    if (!data) return;
    const { paymentIsAlreadyDone } = data.createPaymentIntent;
    if (paymentIsAlreadyDone) {
      router.push("/panel/business");
      return;
    }
    setShowCardBox(true);
  }, [data]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setLoadingAndMsgState({ loading: true, msg: "" });

    if (!data) return;

    const { id: payment_intent_id, client_secret } = data.createPaymentIntent;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error || !paymentMethod) {
      setLoadingAndMsgState({ loading: false, msg: "Invalid card" });
      return;
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: paymentMethod.id,
      save_payment_method: true,
      setup_future_usage: "off_session",
    });
    console.log("result ========= ", result);

    if (result.error) {
      setLoadingAndMsgState({ loading: false, msg: result.error.message });
      return;
    }

    if (result.paymentIntent.status === "succeeded") {
      savePaymentIntent({
        variables: {
          input: { orderId, stripe_payment_intent_id: payment_intent_id },
        },
      });

      // await savePaymentIntent({
      //   stripe_payment_intent_id: payment_intent_id,
      //   order_id: order.id,
      // });

      // // send confirmation email
      // await sendMail({
      //   subject: 'Payment Invoice',
      //   body: {
      //     heading: 'Payment Successfull',
      //     text: `You have Successfully Bought A ${props.planName} Plan in $${
      //       +order.cost / 100 // convert cents
      //     }`,
      //   },
      // });

      setLoadingAndMsgState({
        loading: false,
        msg: "Payment is successfully added in escrow",
      });

      router.push("/panel/business");
    }
  };

  return (
    <Modal ref={ref} width={300} height={100}>
      <Box>
        {showCardBox ? (
          <Box>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <Flex sx={{ alignItems: "center" }}>
              <Button onClick={handleSubmit} style={{ marginTop: 20 }}>
                Pay
              </Button>
              {loadingAndMsgState.loading && <Spinner ml={3} />}
              {loadingAndMsgState.msg && (
                <Text ml={3}>{loadingAndMsgState.msg}</Text>
              )}
            </Flex>
          </Box>
        ) : (
          <Box style={{ textAlign: "center" }}>Please wait....</Box>
        )}
      </Box>
    </Modal>
  );
};

export default PaymentForm;
