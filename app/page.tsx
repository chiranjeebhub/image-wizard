"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import {
  Upload,
  Image as ImageIcon,
  Edit,
  Zap,
  WandSparkles,
  Crop,
  Palette,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageWizardLogo from "@/components/ImageWizardLogo";

const BackgroundIcon = ({ icon: Icon, className, isDragging }) => {
  return (
    <motion.div
      className={`fixed text-primary ${className}`}
      initial={{ opacity: 0.05 }}
      animate={{
        opacity: isDragging ? 0.02 : 0.05,
        scale: isDragging ? 0.8 : 1,
        z: isDragging ? -10 : 0,
      }}
      whileHover={{ scale: 1.2, opacity: 0.2 }}
      transition={{ duration: 0.3 }}
    >
      <Icon size={96} />
    </motion.div>
  );
};

export default function LandingPage() {
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  // const onDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     console.log("File uploaded:", acceptedFiles[0].name);
  //     router.push("/edit");
  //   },
  //   [router]
  // );
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        localStorage.setItem("editImage", imageDataUrl);
        router.push("/edit");
      };

      reader.readAsDataURL(file);
    },
    [router]
  );
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false),
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <ImageWizardLogo edit={false} />
      <BackgroundIcon
        icon={WandSparkles}
        className="top-20 left-20"
        isDragging={isDragging}
      />
      <BackgroundIcon
        icon={Crop}
        className="top-40 right-40"
        isDragging={isDragging}
      />
      <BackgroundIcon
        icon={Palette}
        className="bottom-20 left-40"
        isDragging={isDragging}
      />
      <BackgroundIcon
        icon={SlidersHorizontal}
        className="bottom-40 right-20"
        isDragging={isDragging}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 z-10 md:pt-0 pt-20"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 md:mt-0 mt-4">
          Transform Your Images
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Upload, edit, and enhance your images with our powerful and
          easy-to-use tools.
        </p>
      </motion.div>

      <motion.div
        {...getRootProps()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: isDragging ? 1.05 : 1,
          opacity: 1,
          boxShadow: isDragging
            ? "0 0 0 4px rgba(59, 130, 246, 0.5)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform z-20"
      >
        <input {...getInputProps()} />
        <div className="p-8 text-center">
          <div className="mb-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 mx-auto border-4 border-blue-500 border-dashed rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isDragging
              ? "Drop Your Image Here"
              : "Drag & Drop Your Image Here"}
          </h2>
          <p className="text-gray-600 mb-6">or click to select a file</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300 ease-in-out"
          >
            <Upload className="mr-2" />
            <span>Select Image</span>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {!isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{
              opacity: { duration: 0.3, ease: "easeInOut" },
              y: { duration: 0.3, ease: "easeInOut" },
            }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full z-10"
          >
            <FeatureCard
              icon={<Edit className="h-8 w-8 text-purple-500" />}
              title="Powerful Editing Tools"
              description="Crop, resize, rotate, and apply filters with ease."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              title="Lightning Fast"
              description="Edit your images quickly with our optimized tools."
            />
            <FeatureCard
              icon={<ImageIcon className="h-8 w-8 text-green-500" />}
              title="Multiple Formats"
              description="Support for various image formats including JPG, PNG, and WebP."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
    >
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
}
