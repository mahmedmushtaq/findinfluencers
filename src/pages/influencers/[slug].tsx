import { Grid, Box, Styled, Text, Flex, Button } from "theme-ui";
import { FrontLayout } from "../../common/layouts";
import { useRouter } from "next/router";
import { InfluencerGallery } from "../../common/components";
import Link from "next/link";

const Influencer = () => {
  const router = useRouter();

  return (
    <FrontLayout>
      <Box sx={{ width: "80%", margin: "0 auto 100px auto" }}>
        <InfluencerGallery />
        <Grid columns={[1, "2.4fr 1fr"]} mt={4} sx={{}}>
          <Box>
            <Styled.h2>Description</Styled.h2>
            <Text>
              retium at, iaculis eu enim. Interdum et malesuada fames ac ante
              ipsum primis in faucibus. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Phasellus
              hendrerit ornare urna, ut rutrum lorem. Sed ornare, massa ut
              fermentum fermentum, lacus nulla tempor odio, luctus tristique
              massa lectus id elit. Aenean eu elit sit amet orci fermentum
              sodales eu nec libero. Duis varius, mi nec viverra efficitur,
              mauris ipsum tempus neque, vel laoreet enim dui tempus justo. In
              consectetur, magna ut tempor pulvinar, tellus lacus mattis nulla,
              sit amet porttitor nulla erat at augue. Aliquam non est eget est
              interdum gravida sed nec sem. Quisque nec lorem id nisi
              scelerisque lacinia. Duis non nibh scelerisque, gravida lorem ut,
              venenatis est. Fusce eu tortor non ante posuere sagittis. Nam id
              lobortis leo. Sed aliquam scelerisque justo, congue sollicitudin
              augue consequat in. Maecenas sagittis dignissim arcu in pretium.
              Vestibulum vehicula facilisis dolor, sed tincidunt orci
              condimentum ut. Sed euismod neque dictum sem sodales tristique.
              Donec vehicula, neque non suscipit mattis, erat nisl venenatis
              dui, eget consectetur risus dui ut ligula. Ut malesuada placerat
              odio. Mauris at tempor ex. Vestibulum vel magna auctor, tincidunt
              magna sit amet, condimentum nulla. Suspendisse efficitur euismod
              libero vitae maximus. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Phasellus in
              massa eget urna ultricies mollis. Suspendisse ultrices, elit id
              blandit fermentum, nibh orci consequat sapien, at varius ipsum
              libero nec orci. Donec libero enim, dignissim semper massa
              tincidunt, maximus semper est. Vivamus eget auctor ex. Curabitur
              egestas congue magna, eu volutpat tortor malesuada sed. Sed nec
              eros viverra, sollicitudin diam in, sodales tellus. Quisque rutrum
              et ex sed lacinia. Nulla iaculis laoreet maximus. Sed vitae
              blandit arcu. Nulla tempor pharetra dui in laoreet.
            </Text>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <img
              width={150}
              height={150}
              src="https://d5ik1gor6xydq.cloudfront.net/sellers/4396/16055009251396651.jpg"
              alt=""
              style={{ borderRadius: "50%" }}
            />

            <Styled.h3>
              <Text>Name</Text>
            </Styled.h3>
            <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
              <Styled.h4>
                <Text>Followers</Text>
              </Styled.h4>
              <Text ml={2} color="primary">
                100m
              </Text>
            </Flex>

            <Flex sx={{ justifyContent: "center", alignItems: "center" }}>
              <Styled.h4>
                <Text>Promotion</Text>
              </Styled.h4>
              <Text ml={2} color="primary">
                200$
              </Text>
            </Flex>

            <Button mt={3}>
              <Link href="/contactinfluencer">Contact</Link>
            </Button>
          </Box>
        </Grid>
      </Box>
    </FrontLayout>
  );
};

export default Influencer;
