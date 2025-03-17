import { motion } from "framer-motion";
import { useState } from "react";

const SuperTackleAnimation = ({ text, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-20 left-1/2 transform -translate-x-1/2 p-4 bg-red-500 text-white text-3xl font-bold rounded-xl shadow-xl"
      onAnimationComplete={onComplete}
    >
      {text}
    </motion.div>
  );
};

const KabaddiScreen = () => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [text, setText] = useState("");

  const triggerAnimation = (message) => {
    setText(message);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  };

  return (
    <div className="relative">
      <button onClick={() => triggerAnimation("Super Tackle!")}>
        Trigger Super Tackle
      </button>
      {showAnimation && <SuperTackleAnimation text={text} onComplete={() => setShowAnimation(false)} />}
    </div>
  );
};

export default KabaddiScreen;
