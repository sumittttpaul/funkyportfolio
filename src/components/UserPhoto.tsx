"use client";

import Image from "next/image";
import Sumit_Photo from "../../public/sumit_photo.png";
import { MotionDiv } from "utils/FramerMotion";
import { useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";

type AnimationType = "move-left" | "move-up" | "move-down";

const MaxWidth = 1500;
const ExtraWidth = 1500 + 50;

interface IProps {
  Transition: {
    type: string;
    easings: string[];
    duration: number;
  };
}

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0,
);
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0,
);

const Variant = {
  "move-left": {
    height: "50px",
    width: "50px",
    x: vw > ExtraWidth ? -MaxWidth / 2 + 25 : -vw / 2 + 45,
    y: 0,
  },
  "move-up": {
    height: "50px",
    width: "50px",
    x: -vw / 2 + 100,
    y: -vh / 2 + 100,
  },
  "move-down": {
    height: "50px",
    width: "50px",
    x: -vw / 2 + 100,
    y: vh / 2 - 100,
  },
};

export default function UserPhoto(props: IProps) {
  const [Animation, setAnimation] = useState<AnimationType>();
  const x = useMotionValue(0);

  const ImageDivAnimationComplete = () => {
    setAnimation("move-left");
  };

  // const ImageMovingDivAnimationComplete = () => {
  //   if (Animation === "move-down") setAnimation("move-up");
  //   if (Animation === "move-up") setAnimation("move-down");
  //   if (Animation === "move-left") setAnimation("move-up");
  // };

  useEffect(() => {
    const handleResize = () =>
      x.set(
        window.innerWidth > ExtraWidth
          ? -MaxWidth / 2 + 25
          : -window.innerWidth / 2 + 45,
      );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <MotionDiv
        id="Image_Moving_Div"
        animate={Animation}
        style={{ x }}
        transition={{
          ...props.Transition,
          delay: 0.4,
        }}
        variants={Variant}
        // onAnimationComplete={ImageMovingDivAnimationComplete}
        className="absolute flex"
      >
        <MotionDiv
          id="Image_Div"
          animate={{ opacity: 100 }}
          transition={props.Transition}
          onAnimationComplete={ImageDivAnimationComplete}
          className="opacity-0"
        >
          <Image
            src={Sumit_Photo}
            height={195}
            width={195}
            alt="Sumeet Kumar Paul"
            className="rounded-full"
            priority
          />
        </MotionDiv>
      </MotionDiv>
    </div>
  );
}