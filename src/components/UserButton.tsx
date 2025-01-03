"use client";

import Image from "next/image";
import Sumit_Photo from "../../public/sumit_photo.png";
import { MotionDiv } from "utils/FramerMotion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";
import { useLoadingState } from "utils/Zustand";

type AnimationType = "move-left";

const Transition = {
  type: "tween",
  easings: ["easeIn", "easeOut"],
  duration: 0.3,
};

const MaxWidth = 1500;
const ExtraWidth = 1500 + 50;

export default function UserButton({
  DecreaseZIndex,
  isMobile,
  setIsOpen,
}: {
  DecreaseZIndex: boolean;
  isMobile: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [Animation, setAnimation] = useState<AnimationType>();
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const LoadingState = useLoadingState();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const Variant = {
    "move-left": {
      height: isMobile ? "40px" : "50px",
      width: isMobile ? "40px" : "50px",
      x:
        viewport.width > ExtraWidth
          ? MaxWidth / 2 - 25
          : viewport.width / 2 - 45,
      y: isMobile ? -viewport.height / 2 + 40 : -viewport.height / 2 + 45,
    },
  };

  const onAnimationComplete = () => setAnimation("move-left");

  useEffect(() => {
    setViewport({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (LoadingState.Complete && isMobile) y.set(-viewport.height / 2 + 12);
  }, [LoadingState.Complete, y, viewport.height, isMobile]);

  useEffect(() => {
    const handleResize = () =>
      x.set(
        window.innerWidth > ExtraWidth
          ? MaxWidth / 2 - 25
          : window.innerWidth / 2 - 45,
      );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${
        DecreaseZIndex ? "" : "z-[1000]"
      } absolute flex h-full w-full items-center justify-center`}
    >
      <MotionDiv
        id="Image_Moving_Div"
        animate={Animation}
        onClick={() => setIsOpen(true)}
        style={{ x, y }}
        transition={{
          ...Transition,
          delay: 0.5,
        }}
        variants={Variant}
        className={`relative z-10 flex cursor-pointer ${
          isMobile ? "h-[130px] w-[130px]" : "h-[195px] w-[195px]"
        }`}
      >
        <MotionDiv
          id="Image_Div"
          animate={{ opacity: 100 }}
          transition={{ ...Transition, delay: 6.2 }}
          onAnimationComplete={onAnimationComplete}
          className="absolute h-full w-full opacity-0"
        >
          <Image
            fill
            src={Sumit_Photo}
            alt="Sumeet Kumar Paul"
            className="rounded-full"
            sizes="(min-width: 1024px) 195px, 130px"
            priority
          />
        </MotionDiv>
      </MotionDiv>
    </div>
  );
}
