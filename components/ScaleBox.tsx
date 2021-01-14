import { Box } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import React, { useMemo, forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion.custom(
  forwardRef(
    (
      props: { children: React.ReactNode },
      ref:
        | string
        | ((instance: HTMLDivElement | null) => void)
        | React.RefObject<HTMLDivElement>
        | null
        | undefined,
    ) => {
      const chakraProps = Object.fromEntries(
        // do not pass framer props to DOM element
        Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
      );
      return (
        <Box ref={ref} {...chakraProps}>
          {props.children}
        </Box>
      );
    },
  ),
);

type Props = {
  children: React.ReactNode;
  delayOrder: number;
  duration?: number;
  easing?: number[];
};

export const ScaleBox = ({
  children,
  delayOrder,
  duration,
  easing = [0.42, 0, 0.58, 1],
}: Props) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const transition = useMemo(
    () => ({
      duration,
      delay: delayOrder / 5,
      ease: easing,
    }),
    [duration, delayOrder, easing],
  );

  const variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: transition,
    },
  };

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? 'show' : 'hidden'}
      exit="hidden"
      variants={variants}
    >
      {children}
    </MotionBox>
  );
};
