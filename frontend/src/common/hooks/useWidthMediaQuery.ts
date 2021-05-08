import { useMediaQuery } from "react-responsive";

const useWidthMediaQuery = () => {
  const isBigLargestScreen = useMediaQuery({ query: "(min-width: 2900px)" });
  const isMiniLaptopScreen = useMediaQuery({
    query: "(min-width: 1090px) and (max-width: 1200px)",
  });
  const isSmallLaptopScreen = useMediaQuery({
    query: "(min-width: 1200px) and (max-width: 1400px)",
  });

  const isMiniToSmallLaptopScreen = useMediaQuery({
    query: "(min-width: 1090px) and (max-width: 1400px)",
  });

  const isSmallTabletScreen = useMediaQuery({
    query: "(min-width: 640px) and (max-width: 750px)",
  });

  return {
    isBigLargestScreen,
    isMiniLaptopScreen,
    isSmallLaptopScreen,
    isMiniToSmallLaptopScreen,
    isSmallTabletScreen,
  };
};

export default useWidthMediaQuery;
