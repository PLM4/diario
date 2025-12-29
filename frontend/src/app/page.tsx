'use client';

import React, { useState, useRef, useEffect } from "react";
import Card from "./components/Card";
import styles from "./styles/Home.module.css";
import DialogBase from "./components/ui/DialogBase";
import { useStore } from './store/useStore';
import { Toast } from "primereact/toast";
import axios from 'axios';
import { UUID } from "crypto";
import Footer from "./components/Footer";
import { Form } from "lucide-react";
import { FormDialog } from "./components/FormDialog";

type PostResponse = {
  id: UUID;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  createdAt: Date
};

const Home: React.FC = () => {

  const [dialogVisible, setDialogVisible] = useState(false);
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isloading, setLoading] = useState(true);

  const toast = useRef<Toast>(null);
  const successSubmit = useStore(state => state.successSubmit);
  const setSuccess = useStore(state => state.setSuccess);

  const openDialog = () => {
      setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<PostResponse[]>('http://localhost:8080/api/posts');
        setPosts(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [successSubmit]);

  const showSuccessToast = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Tudo certo!',
      detail: 'Seu post foi postado com sucesso!',
      life: 5000
    });
  };

  useEffect(() => {
    if (successSubmit) {
      showSuccessToast();
    }
  }, [successSubmit]);

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

      <FormDialog
        visible={dialogVisible}
        onHide={closeDialog}
      />

      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Diário.dev</h1>
      </header>

      
      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.cardWrapper}>
            <Card
              id={post.id}
              date={post.createdAt}
              title={post.title}
              content={post.content}
              image={post.imageUrl}
            />
          </div>
        ))}
      </div>
      <Footer onOpenDialog={openDialog} />
    </div>
  );
};

export default Home;