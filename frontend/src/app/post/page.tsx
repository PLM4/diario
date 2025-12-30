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
      <div className={styles.header}>
        <ButtonComponent
          onClick={() => window.history.back()}
          title={<ArrowLeft />}
        />
        <div className={styles.headerActions}>
          <EditButtonComponent id={post.id}></EditButtonComponent>
          <TrashButtonComponent id={post.id}></TrashButtonComponent>
        </div>
      </div>
      <article className={styles.post}>
        <span className={styles.date}>{dataFormatada}</span>
        <h1 className={styles.title}>{post.title}</h1>
        <h2 className={styles.subtitle}>{post.subtitle}</h2>
        <img src={post.imageUrl} alt={post.title} className={styles.image} />
        <p className={styles.content}>{post.content}</p>
      </article>
    </div>
  );
}
