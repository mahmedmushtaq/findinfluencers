import { motion } from "framer-motion";
import { useRef } from "react";
import { DropDownProps } from "./DropDownProps";

/**
 *
 * @param showDropDown to set visibility of the dropdown
 *
 *
 */
const DropDown = (props: DropDownProps) => {
  const { showDropDown, top, duration: dur } = props;

  return (
    <div style={{ position: "relative" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showDropDown ? 1 : 0 }}
        transition={{ duration: dur || 1.2 }}
        style={{
          backgroundColor: "rgba(255,255,255, 0.8)",
          position: "absolute",
          boxShadow: "0 0 1px 1px rgba(0,0,0,.2)",
          width: "100%",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 10,
          top,
        }}
      >
        {props.children}
      </motion.div>
    </div>
  );
};

export default DropDown;
