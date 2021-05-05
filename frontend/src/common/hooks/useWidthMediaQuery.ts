import { useMediaQuery } from "react-responsive";

const useWidthMediaQuery = () => {
  const isBigLargestScreen = useMediaQuery({ query: "(min-width: 2900px)" });
  const isSmallLaptopScreen = useMediaQuery({
    query: "(min-width: 1090px) and (max-width: 1200px)",
  });
  const isMediumLaptopScreen = useMediaQuery({
    query: "(min-width: 1200px) and (max-width: 1400px)",
  });

  return { isBigLargestScreen, isSmallLaptopScreen, isMediumLaptopScreen };
};

export default useWidthMediaQuery;
