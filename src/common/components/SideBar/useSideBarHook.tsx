import { useEffect, useState } from "react";

interface PropsType {
  ref: any;
  openSideBar: boolean;
  setOpenSideBar: Function;
}

const useSideBarHook = (props: PropsType) => {
  const [translation, setTranslation] = useState(false);
  const { ref, openSideBar, setOpenSideBar } = props;

  useEffect(() => {
    if (openSideBar) {
      setTranslation(true);
    } else {
      setTranslation(false); // if already is 0 then state will not change
      return;
    }

    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // clicked outside the sidebar
        // two case will arise when user click the menu btn
        // in first case,  this function will call and then menu btn function will also call

        setTranslation(false);
        // in order to handle first case
        setTimeout(() => {
          setOpenSideBar(false);
        }, 300);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSideBar]);

  return { translation };
};

export default useSideBarHook;
