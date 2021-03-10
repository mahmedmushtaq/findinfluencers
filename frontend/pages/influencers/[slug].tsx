import { Grid, Box, Styled, Text, Flex, Button } from "theme-ui";
import { FrontLayout } from "../../src/common/layouts";
import { useRouter } from "next/router";
import { InfluencerGallery } from "../../src/common/components";
import Link from "next/link";
import { initializeApollo } from "../../src/lib/apollo";
import { LOAD_USER_PROFILE } from "../../src/lib/graphql";

// pic 1

const Influencer = (props) => {
  const router = useRouter();

  const { userProfileData } = props;

  const data = userProfileData.data
    ? userProfileData.data.userProfile
    : undefined;

  return (
    <FrontLayout>
      <Box sx={{ width: "80%", margin: "0 auto 100px auto" }}>
        {!data ? (
          <div>Error</div>
        ) : (
          <Box>
            <InfluencerGallery images={data.images} />
            <Grid columns={[1, "2.4fr 1fr"]} mt={4} sx={{}}>
              <Box>
                <Styled.h2>Description</Styled.h2>
                <Text>{data.description}</Text>
              </Box>
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
                <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
                  <Styled.h4>
                    <Text>Followers</Text>
                  </Styled.h4>
                  <Text ml={2} color="primary">
                    {data.platformProfileInfo[0].profileFollowers}
                  </Text>
                </Flex>

                <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
                  <Styled.h4>
                    <Text>Promotion</Text>
                  </Styled.h4>
                  <Text ml={2} color="primary">
                    ${data.platformProfileInfo[0].rate}/hr
                  </Text>
                </Flex>

                <Button mt={3}>
                  <Link href="/contactinfluencer">Contact</Link>
                </Button>
              </Box>
            </Grid>
          </Box>
        )}
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
      username: slug,
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
