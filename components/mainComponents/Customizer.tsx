"use client"
import React, { useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import { AiOutlineArrowLeft } from "react-icons/ai";
import state from "@/store";
import { download } from "@/public";
import { downloadCanvasToImage, reader } from "@/config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "@/config/constants";
import { fadeAnimation, slideAnimation } from "@/config/motion";
import {
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "@/components";

type FilterTabProp = {
  [key: string]: boolean;
};

type StateType = {
  intro: boolean;
  color: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  logoDecal: string;
  fullDecal: string;
};

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<File | undefined>();

  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState<FilterTabProp>({
    logoShirt: true,
    stylishShirt: false,
  });

  const [activePicker, setActivePicker] = useState("");

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return (
          <AnimatePresence>
            {activePicker === "colorpicker" && <ColorPicker />}
          </AnimatePresence>
        );
      case "filepicker":
        return (
          <AnimatePresence>
            {activePicker === "filepicker" && (
              <FilePicker file={file} setFile={setFile} readFile={readFile} />
            )}
          </AnimatePresence>
        );
      default:
        return null;
    }
  };

  const togglePicker = (picker: string) => {
    setActiveEditorTab(picker);
    setActivePicker(activePicker === picker ? "" : picker);
  };

  const handleDecals = (type: keyof typeof DecalTypes, result: any) => {
    const decalType = DecalTypes[type];
    const stateProperty = decalType.stateProperty as keyof StateType;
  
      // state[stateProperty] = result;
  
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      case "download":
        downloadCanvasToImage();
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = async (type: keyof typeof DecalTypes) => {
    if (!file) return;
  
    try {
      const result = await reader(file);
      handleDecals(type, result);
      setActiveEditorTab("");
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };
  

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => togglePicker(tab.name)}
                    isActiveTab={tab.name === activeEditorTab}
                    isFilterTab={false}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              icon={<AiOutlineArrowLeft />}
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-8 py-3 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
