import { useState, useEffect } from "react";

const useToCheckComponentVisibility = (props: {
  ref: any;
  checkOneTimeVisibility: boolean;
}) => {
  const { ref, checkOneTimeVisibility } = props;
  const [isVisible, setVisible] = useState(false);
  let oneTimeVisibility = false;

  const observer = new IntersectionObserver(([entry]) => {
    if (checkOneTimeVisibility && oneTimeVisibility) return;
    oneTimeVisibility = entry.isIntersecting;
    return setVisible(entry.isIntersecting);
  });

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return { isVisible };
};

export default useToCheckComponentVisibility;
