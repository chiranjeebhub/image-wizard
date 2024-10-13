import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

function ImageWizardLogo({ edit }: { edit: boolean }) {
  const router = useRouter();
  return (
    <motion.div
      onClick={(e) => router.back()}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5,
      }}
      className={`${!edit && "absolute md:justify-start"} top-4 md:left-4 z-30 flex flex-col md:flex-row items-center  w-full justify-center`}
    >
      <motion.svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.path
          d="M25 2L2 25L25 48L48 25L25 2Z"
          fill="#3B82F6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M25 10L10 25L25 40L40 25L25 10Z"
          fill="white"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M25 18L18 25L25 32L32 25L25 18Z"
          fill="#3B82F6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
        />
      </motion.svg>
      {!edit && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="ml-2 text-lg font-bold text-blue-500"
        >
          ImageWizard
        </motion.span>
      )}
    </motion.div>
  );
}

export default ImageWizardLogo;
