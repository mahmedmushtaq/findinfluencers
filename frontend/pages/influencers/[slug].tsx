import { Grid, Box, Styled, Text, Flex, Button } from "theme-ui";
import { FrontLayout } from "../../src/common/layouts";
import { useRouter } from "next/router";
import { InfluencerGallery, SignInModal } from "../../src/common/components";
import dynamic from "next/dynamic";
import { initializeApollo } from "../../src/lib/apollo";
import { LOAD_USER_PROFILE } from "../../src/lib/graphql";
import { useRef, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { getCurrentUser } from "../../src/lib/currentUser";

// requires default import
const SignInModalDynamic = dynamic(
  () =>
    import("../../src/common/components/JoinComponent/SignInModal/SignInModal")
);

const Influencer = (props) => {
  const router = useRouter();
  const [addUserToChatList, setAddUserToChatList] = useState(false);
  const modalRef = useRef<any>();

  const { userProfileData } = props;

  const data = userProfileData.data
    ? userProfileData.data.userProfile
    : undefined;

  const contactInfluencer = async () => {
    const user = await getCurrentUser({});
    if (user && user.role === "buyer") {
      setAddUserToChatList(true);
      modalRef.current.open();
      // router.push(`/panel/business/messages?user=${router.query.slug}`);
      return;
    }
    if (!modalRef) return;
    modalRef.current.open();
  };

  const sideBar = (
    <Box sx={{ textAlign: "center" }}>
      {/* <img
      width={150}
      height={150}
      src="https://d5ik1gor6xydq.cloudfront.net/sellers/4396/16055009251396651.jpg"
      alt=""
      style={{ borderRadius: "50%" }}
    /> */}

      <Styled.h3>
        <Text>{data.user.full_name}</Text>
      </Styled.h3>
      <Styled.h5>
        <Text>Influencer At</Text>
      </Styled.h5>

      {data.platformProfileInfo.map((data) => (
        <Flex
          key={data.id}
          sx={{ justifyContent: "center", alignItems: "flex-start" }}
        >
          <Box>
            <Text
              sx={{ fontFamily: "gilroyBold", fontSize: 2 }}
              style={{ fontSize: 10 }}
            >
              Platform
            </Text>
            <Text> {data.platform.name} </Text>
          </Box>
          <Box ml={3}>
            <Text
              sx={{ fontFamily: "gilroyBold", fontSize: 2 }}
              style={{ fontSize: 10 }}
            >
              Price
            </Text>
            <Text ml={2}>${data.rate}</Text>
          </Box>
          <Box ml={3}>
            <Text
              sx={{ fontFamily: "gilroyBold", fontSize: 2 }}
              style={{ fontSize: 10 }}
            >
              Followers
            </Text>
            <Text ml={2} color="primary">
              {data.profileFollowers}
            </Text>
          </Box>
        </Flex>
      ))}

      {/* <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
      <Styled.h4>
        <Text>Promotion</Text>
      </Styled.h4>
      <Text ml={2} color="primary">
        ${data.platformProfileInfo[0].rate}/hr
      </Text>
    </Flex> */}

      <Button mt={3} onClick={contactInfluencer}>
        Contact
      </Button>
    </Box>
  );

  return (
    <FrontLayout>
      <Box sx={{ width: "80%", margin: "0 auto 100px auto" }}>
        {!data ? (
          <div>Error</div>
        ) : (
          <Box>
            <InfluencerGallery images={data.images} />
            <Grid columns={[1, "2.4fr 1fr"]} mt={4} sx={{}}>
              {/* for a mobile then show this sidebar as a left user */}
              <Box sx={{ display: ["block", "none"] }}>{sideBar}</Box>
              <Box>
                <Styled.h2>Description</Styled.h2>
                <Text>{data.description}</Text>
              </Box>
              {/* for laptop and desktop then show this sidebar as a right user */}
              <Box sx={{ display: ["none", "block"] }}>{sideBar}</Box>
            </Grid>
          </Box>
        )}
        <SignInModalDynamic
          addUserToChatList={addUserToChatList}
          modalRef={modalRef}
        />
      </Box>
    </FrontLayout>
  );
};

// it is used for server side rendering(ssr)
Influencer.getInitialProps = async ({ query }) => {
  const apolloClient = initializeApollo();
  const slug = query.slug;

  const userProfileData = await apolloClient.query({
    query: LOAD_USER_PROFILE,
    variables: {
      // username: slug,
      input: {
        username: slug,
      },
    },
  });

  return {
    initializeApollo: apolloClient.cache.extract(),
    userProfileData: userProfileData,
  };
  // await apolloClient.query({
  //   query: ALL_COUNTRIES_QUERY,
  // });
};

export default Influencer;
