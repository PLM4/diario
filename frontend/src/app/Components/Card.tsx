import React from "react";
import Link from "next/link";
import styles from "../styles/Card.module.css";
import ButtonComponent from "./ButtonComponent";
import { UUID } from "crypto";

interface Options {
  day:  '2-digit';
  month: 'long';
  year: 'numeric';
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
    day: '2-digit',
    month: 'long', 
    year: 'numeric',
  };
  
  const dataFormatada = new Date(date).toLocaleDateString('pt-BR', options);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.date}>{dataFormatada}</span>
        <h2 className={styles.title}>{title}</h2>
        <img src={image} alt={title} className={styles.cardImage}/>  
      </div>
      <div className={styles.cardContent}>
        <p>{content.length > 120 ? `${content.substring(0, 120)}...` : content}</p>
      </div>
      <div className={styles.cardFooter}>
        <Link href={`/post?id=${id}`}>
          <ButtonComponent title="FULL STORY" />
        </Link>
      </div>
    </div>
  );
};

export default Card;