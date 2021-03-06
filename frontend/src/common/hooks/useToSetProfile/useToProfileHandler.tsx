import { useMutation } from "@apollo/client";
import { DELETE_PLATFORM_PROFILE } from "../../../lib/graphql";

const useToProfileHandler = ({ token, state, setState, setErr }) => {
  const context = {
    context: {
      headers: {
        authorization: token,
      },
    },
  };

  const [deletePlatformProfile] = useMutation(DELETE_PLATFORM_PROFILE, context);

  const setPlatform = (name: string, value: string) => {
    // values are consist like platform.id$platformName
    const splitValue = value.split("$");
    const platformName = splitValue[1];
    const platformId = splitValue[0];

    const isPlatformPresent = state.selectedPlatform.find(
      (platform) => platform.platform.id === platformId
    );
    if (isPlatformPresent) return;

    setState({
      ...state,
      selectedPlatform: [
        ...state.selectedPlatform,
        {
          platform: {
            name: platformName,
            id: platformId,
          },
          // platformName,
          profileName: "",
          profileUrl: "",
          profileFollowers: 0,
        },
      ],
    });
  };

  // on Selected platform/category, from platform/category list
  const onSelected = (
    e: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    if (e.target.value === "") return;

    if (e.target.name === "selectedPlatform") {
      setPlatform(e.target.name, e.target.value);
      return;
    }

    const categoryValue = e.target.value.split("$");
    const categoryName = categoryValue[1];
    const categoryId = categoryValue[0];

    // remove duplicate categories from list
    const filterCategory = state.category.filter(
      (singleCa) => singleCa.id !== categoryId
    );

    setState({
      ...state,
      category: [...filterCategory, { name: categoryName, id: categoryId }],
    });
  };

  // set platform Value like profileName, profileUrl, noOfFollowers
  const changeState = (param: {
    platform: { platform: { id: string } };
    name: string;
    value: string | number;
  }) => {
    const platform = state.selectedPlatform.find(
      (platform) => platform.platform.id === param.platform.platform.id
    );

    platform[`${param.name}`] = param.value;
    //  rerender
    setState({ ...state, selectedPlatform: [...state.selectedPlatform] });
  };

  //   // delete all selected Platforms
  //   const clearAllSelectedPlatforms = () => {
  //     setState({
  //       ...state,
  //       selectedPlatform: [],
  //     });
  //     // setOtherPlatformName({ show: false, value: "" });
  //   };

  // delete specific selected platform
  const deletePlatform = (platform) => {
    if (state.isProfileAlreadySet) {
      try {
        deletePlatformProfile({ variables: { id: platform.id } });
      } catch (err) {
        setErr(err.message);
      }
    }
    const filterSelectedPlatform = state.selectedPlatform.filter(
      (pl) => pl.platform.id !== platform.platform.id
    );
    setState({ ...state, selectedPlatform: filterSelectedPlatform });
  };

  const deleteSelectedCategory = (categoryId: string) => {
    const filterRemainingCategories = state.category.filter(
      (singleCategory) => singleCategory.id !== categoryId
    );
    setState({ ...state, category: filterRemainingCategories });
  };

  const handleFileUpload = (e) => {
    setErr("");
    if (e.target.files.length < 3 || e.target.files.length > 3) {
      setErr("Only 3 Image Are Required. Please select again");
      return;
    }
    setState({ ...state, images: [e.target.files] });
  };

  return {
    handleFileUpload,
    deleteSelectedCategory,
    deletePlatform,
    // clearAllSelectedPlatforms,
    changeState,
    onSelected,
  };
};

export default useToProfileHandler;
