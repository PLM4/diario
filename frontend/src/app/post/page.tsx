"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../styles/Post.module.css";
import axios from "axios";
import { UUID } from "crypto";
import { ArrowLeft } from "lucide-react";
import ButtonComponent from "../components/ButtonComponent";
import TrashButtonComponent from "../components/TrashButtonComponent";
import EditButtonComponent from "../components/EditButtonComponent";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";
import {
  fadeLeftAnimation,
  fadeRightAnimation,
  fadeUpAnimation,
} from "../lib/animations";

interface PostResponse {
  id: UUID;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
}

interface Options {
  day: "2-digit";
  month: "long";
  year: "numeric";
}

export default function PostPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState<PostResponse>();
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<PostResponse>(
          `http://localhost:8080/api/posts/${id}`
        );
        setPost(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  if (isloading) {
    return (
      <div className={styles.loadingWrapper}>
        <ProgressSpinner
          strokeWidth="4"
          animationDuration=".8s"
          className={styles.spinner}
        />
      </div>
    );
  }
  if (!post) {
    return <div className={styles.error}>Post não encontrado.</div>;
  }

  const options: Options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const dataFormatada = new Date(post.createdAt).toLocaleDateString(
    "pt-BR",
    options
  );

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <ButtonComponent
          onClick={() => window.history.back()}
          title={<ArrowLeft />}
        />
        <div className={styles.headerActions}>
          <EditButtonComponent id={post.id}></EditButtonComponent>
          <TrashButtonComponent id={post.id}></TrashButtonComponent>
        </div>
      </motion.div>
      <article className={styles.post}>
        <motion.span
          className={styles.date}
          {...fadeRightAnimation}
          transition={{ duration: 0.5 }}
        >
          {dataFormatada}
        </motion.span>
        <motion.h1
          className={styles.title}
          {...fadeUpAnimation}
          transition={{ duration: 0.5 }}
        >
          {post.title}
        </motion.h1>
        <motion.h2
          className={styles.subtitle}
          {...fadeLeftAnimation}
          transition={{ duration: 0.5 }}
        >
          {post.subtitle}
        </motion.h2>
        <motion.img
          src={post.imageUrl}
          alt={post.title}
          className={styles.image}
          {...fadeUpAnimation}
        />
        <motion.p
          className={styles.content}
          {...fadeLeftAnimation}
          transition={{ duration: 0.5 }}
        >
          {post.content}
        </motion.p>
      </article>
    </div>
  );
}
