export interface AnimationProps {
  direction: "top" | "bottom" | "left" | "right";
  hidden?: any;
  visible?: any;
  hiddenTransition?: any;
  transition?: any;
}

export interface SlideProps extends AnimationProps {
  children?: any;
}

/**
 *
 * @param slideProps AnimationProps
 *
 */

export const slideVariant = (slideProps: AnimationProps) => {
  let initialY: string | number = 0,
    initialX: string | number = 0;

  const {
    hiddenTransition,
    transition,
    hidden,
    visible,
    direction,
  } = slideProps;
  const hiddenStyle = hidden || {};
  const visibleStyle = visible || {};
  const hiddenTransitionStyle = hiddenTransition || {};
  const visibleTransition = transition || {};

  switch (direction) {
    case "top":
      // instead of vh get parent height and then move according to the parent height
      initialY = "-100vh";
      break;
    case "bottom":
      initialY = "100vh";
      break;
    case "left":
      initialX = "-100vw";
      break;
    case "right":
      initialX = "100vw";
      break;
    default:
      initialY = 0;
      break;
  }

  return {
    hidden: {
      opacity: 0,
      y: initialY,
      x: initialX,
      ...hiddenStyle,
      ...hiddenTransitionStyle,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 1, // 1s
        ...visibleTransition,
      },
      ...visibleStyle,
    },
  };
};
