"use client"
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { AiOutlineHighlight } from "react-icons/ai";
import state from "@/store";
import { CustomButton } from "@/components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "@/config/motion";
import Image from "next/image";

const LandingPage = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <Image
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 object-contain bg-black"
              width={32}
              height={32}
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET&apos;S <br className="xl:block hidden" /> DO IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{" "}
                and define your own style.
              </p>

              <CustomButton
                type="filled"
                icon={<AiOutlineHighlight />}
                title="Customize It"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-8 py-3 font-semibold  text-md"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
