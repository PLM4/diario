import React from "react";
import styles from "../styles/Footer.module.css";
import ButtonComponent from "./ButtonComponent";
import { motion } from "framer-motion";
import { fadeLeftAnimation } from "../lib/animations";

interface PostFormProps {
  onOpenDialog: () => void;
}

const Footer: React.FC<PostFormProps> = ({ onOpenDialog }) => {
  const handleClick = () => {
    onOpenDialog();
  };

  return (
    <div className={styles.formContainer}>
      <motion.div className={styles.fakeTextarea} {...fadeLeftAnimation}>
        <ButtonComponent title="New post" onClick={handleClick} />
      </motion.div>
    </div>
  );
};

export default Footer;
