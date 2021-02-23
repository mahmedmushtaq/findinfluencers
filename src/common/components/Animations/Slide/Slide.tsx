import { motion } from "framer-motion";
import { slideVariant, SlideProps } from "./slideUtils";

/**
 *
 * @param direction  = "top" | "bottom" | "left" | "right"
 * @param hidden
 * @param visible
 * @param hiddenTransition
 * @param transition
 *
 *
 * top slider comes from top
 * bottom mean slider comes from bottom
 * left- slider comes from left
 * right- slider comes from right
 */

const Slide = (props: SlideProps) => {
  return (
    <motion.div
      variants={slideVariant(props)}
      initial="hidden"
      animate="visible"
    >
      {props.children}
    </motion.div>
  );
};

export default Slide;
