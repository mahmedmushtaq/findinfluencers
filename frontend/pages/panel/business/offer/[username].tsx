import { PanelLayout } from "../../../../src/common/layouts";
import { useRouter } from "next/router";
import { Box, Text, Select, Input, Flex, Button } from "theme-ui";
import { useQuery } from "@apollo/client";
import { SEARCH_USER, LOAD_USER_PROFILE } from "../../../../src/lib/graphql";
import React, { useEffect, useState } from "react";
import {
  CreateOffer,
  ProtectedRouteHOC,
} from "../../../../src/common/components";

interface Type {
  id: string;
  platformProfileInfo: {
    id: string;
    profileName: string;
    profileUrl: string;
    rate: string;
    platform: {
      name: string;
    };
  }[];
  user: {
    id: string;
    full_name: string;
    username: string;
  };
}

const Offer = (props) => {
  const router = useRouter();
  // currenlty we have id in username query
  const id = router.query.username;
  const [userInformation, setUserInformation] = useState<Type>(null);

  const [selectedProfile, setSelectedProfile] = useState<{
    profileId: string;
    rate: string;
  }>(null);

  const { data, error } = useQuery(LOAD_USER_PROFILE, {
    variables: { input: { userId: id } },
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!data) return;
    console.log(data);
    setUserInformation(data.userProfile);
  }, [data]);

  return (
    <PanelLayout businessPanel={true} {...props}>
      <Box>
        {userInformation && userInformation.id ? (
          <Box>
            <Text sx={{ fontSize: 3, fontWeight: 700 }}>
              {userInformation.user.full_name}
            </Text>
            <Flex>
              <Text>Select User Profile</Text>
              <Text style={{ fontSize: 12 }}></Text>
            </Flex>
            <Select
              defaultValue=""
              onChange={(e) => {
                if (!e.target.value) return;
                //@ts-ignore
                setSelectedProfile(JSON.parse(e.target.value));
              }}
            >
              <option>{""}</option>
              {userInformation.platformProfileInfo.map((data) => (
                <option
                  key={data.id}
                  value={JSON.stringify({
                    rate: data.rate,
                    profileId: data.id,
                  })}
                >
                  {data.profileName} Registered on {data.platform.name} platform
                </option>
              ))}
            </Select>

            {selectedProfile && (
              <CreateOffer selectedProfile={selectedProfile} />
            )}
          </Box>
        ) : (
          <Box>Please wait...</Box>
        )}
      </Box>
    </PanelLayout>
  );
};

export default ProtectedRouteHOC(Offer, "buyer");
