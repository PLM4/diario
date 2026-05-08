import React from "react";
import Link from "next/link";
import styles from "../styles/Card.module.css";
import ButtonComponent from "./ButtonComponent";
import { UUID } from "crypto";
import { motion } from "framer-motion";
import { fadeLeftAnimation, fadeUpAnimation } from "../lib/animations";

interface Options {
  day: "2-digit";
  month: "long";
  year: "numeric";
}

interface CardProps {
  id: UUID;
  date: Date;
  title: string;
  content: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ id, date, title, content, image }) => {
  const options: Options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const dataFormatada = new Date(date).toLocaleDateString("pt-BR", options);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <motion.span
          className={styles.date}
          {...fadeLeftAnimation}
          transition={{ duration: 0.5 }}
        >
          {dataFormatada}
        </motion.span>
        <motion.h2
          className={styles.title}
          {...fadeLeftAnimation}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.img
          src={image}
          alt={title}
          className={styles.cardImage}
          {...fadeUpAnimation}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        />
      </div>
      <motion.div
        className={styles.cardContent}
        {...fadeLeftAnimation}
        transition={{ duration: 0.5 }}
      >
        <p>
          {content.length > 120 ? `${content.substring(0, 120)}...` : content}
        </p>
      </motion.div>
      <motion.div
        className={styles.cardFooter}
        {...fadeLeftAnimation}
        transition={{ duration: 0.5 }}
      >
        <Link href={`/post?id=${id}`}>
          <ButtonComponent title="FULL STORY" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Card;
