import { motion, AnimatePresence } from "framer-motion";
import {
  useEffect,
  useCallback,
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";

const modalBackdrop: any = {
  position: "fixed",
  height: "100vh",
  width: "100vw",
  top: 0,
  left: 0,
  background: "rgba(0, 0, 0, 0.6)",
};

const modalContentWrapper: any = {
  position: "fixed",
  width: "300px",
  // height: "300px",
  background: "white",
  margin: "auto",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  padding: "10px",
};

interface ModalProps {
  children?: any;
  height?: number;
}

/**
 * @props {height : number?, children: any}
 * @ref
 *
 *
 */
const Modal = forwardRef((props: ModalProps, ref) => {
  const [open, setOpen] = useState(false);
  const height = props.height ? props.height : 300;

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      //Do whatever when esc is pressed
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
      close: () => setOpen(false),
    };
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.3,
              },
            }}
            onClick={() => setOpen(false)}
            // className="modal-backdrop"
            style={modalBackdrop}
          />
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              scale: 0,
              transition: {
                delay: 0.3,
              },
            }}
            // className="modal-content-wrapper"
            style={{ ...modalContentWrapper, height }}
          >
            <motion.div
              className="modal-content"
              initial={{
                x: 100,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.3,
                },
              }}
              exit={{
                x: 100,
                opacity: 0,
                transition: {
                  duration: 0.3,
                },
              }}
            >
              {props.children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default Modal;
