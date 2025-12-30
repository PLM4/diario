export const fadeUpAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

export const fadeDownAnimation = {
  initial: { opacity: 0, y: -50 },
  whileInView: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

export const fadeRightAnimation = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export const fadeLeftAnimation = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};
