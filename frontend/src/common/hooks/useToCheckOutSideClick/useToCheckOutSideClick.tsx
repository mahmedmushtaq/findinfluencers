import { useEffect, useState } from "react";

const useToCheckOutSideClick = (props: { ref: any; onClick: Function }) => {
  const { ref, onClick } = props;
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // outsideClick
        onClick(true);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
};

export default useToCheckOutSideClick;
