"use client";

import React, { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Button } from "primereact/button";
import styles from "../styles/Form.module.css";
import { Image } from "primereact/image";
import InputComponent from "./InputComponent";
import { useStore } from "../store/useStore";
import { Message } from "primereact/message";
import axios from "axios";
import { UUID } from "crypto";

interface FormData {
  titulo: string;
  subtitulo: string;
  conteudo: string;
  imagem: File | null;
  imagemURL: string | null;
}

interface props {
  closeDialog: () => void;
  postId?: UUID;
}

const Form: React.FC<props> = ({ closeDialog, postId }) => {
  const [formData, setFormData] = useState<FormData>({
    titulo: "",
    subtitulo: "",
    conteudo: "",
    imagem: null,
    imagemURL: null,
  });
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidSubtitle, setInvalidSubtitle] = useState(false);
  const [invalidImage, seInvalidImage] = useState(false);

  const { successSubmit, setSuccess } = useStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = (event: FileUploadHandlerEvent) => {
    const file = event.files[0];
    const objectURL = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      imagem: file,
      imagemURL: objectURL,
    }));
  };

  const enviarArquivo = async (): Promise<string | undefined | null> => {
    if (!formData.imagem) {
      console.error("Nenhuma imagem selecionada.");
      return;
    }

    const data = new FormData();
    data.append("file", formData.imagem);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/posts/upload",
        data
      );

      return response.data.url;
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
    }
  };

  useEffect(() => {
    if (!postId) return;

    axios
      .get(`http://localhost:8080/api/posts/${postId}`)
      .then((res) => {
        setFormData({
          titulo: res.data.title,
          subtitulo: res.data.subtitle,
          conteudo: res.data.content,
          imagem: null,
          imagemURL: res.data.imageUrl,
        });

        setInvalidTitle(false);
        setInvalidSubtitle(false);
        seInvalidImage(false);
      })
      .catch((err) => console.error(err));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo) {
      setInvalidTitle(true);
      return;
    }

    if (!formData.subtitulo) {
      setInvalidSubtitle(true);
      return;
    }

    const imageUrl = formData.imagemURL;

    if (formData.imagem) {
      const imageUrl = await enviarArquivo();
      if (!imageUrl) {
        console.error("Falha no upload da imagem");
        return;
      }
    }

    try {
      if (postId) {
        await axios.put(`http://localhost:8080/api/posts/${postId}`, {
          title: formData.titulo,
          subtitle: formData.subtitulo,
          content: formData.conteudo,
          imageUrl,
        });
      } else {
        await axios.post("http://localhost:8080/api/posts", {
          title: formData.titulo,
          subtitle: formData.subtitulo,
          content: formData.conteudo,
          imageUrl,
        });
      }

      setSuccess();
      closeDialog();
    } catch (error) {
      console.error("Erro ao salvar o post:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className={styles.campo}>
          <label htmlFor="titulo" className={styles.rotulo}>
            Título
          </label>
          <InputComponent
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            invalid={invalidTitle}
            textError="Título obrigatório"
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="subtitulo" className={styles.rotulo}>
            Subtítulo
          </label>
          <InputComponent
            id="subtitulo"
            name="subtitulo"
            value={formData.subtitulo}
            onChange={handleInputChange}
            invalid={invalidSubtitle}
            textError="Subtítulo obrigatório"
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="conteudo" className={styles.rotulo}>
            Conteúdo
          </label>
          <InputTextarea
            id="conteudo"
            name="conteudo"
            value={formData.conteudo}
            onChange={handleInputChange}
            rows={5}
            className="w-full"
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#c2c2c2";
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#c2c2c2";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#c2c2c2";
            }}
          />
        </div>

        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <FileUpload
            name="imagem"
            mode="basic"
            auto
            customUpload
            uploadHandler={handleUpload}
            chooseLabel="Selecionar Imagem"
            accept="image/*"
            chooseOptions={{
              style: {
                backgroundColor: "#131313",
                color: "white",
                border: "1.5px solid #131313",
              },
            }}
          />
          {invalidImage && (
            <Message severity="error" text={"Imagem Obrigatória!"} />
          )}
        </div>

        {formData.imagemURL && (
          <div className={styles.campo}>
            <Image
              src={formData.imagemURL}
              alt="Imagem selecionada"
              width="100%"
              preview
            />
          </div>
        )}

        <Button
          label="Enviar"
          icon="pi pi-check"
          type="submit"
          style={{
            backgroundColor: "#131313",
            color: "white",
            border: "1.5px solid #131313",
          }}
        />
      </form>
    </>
  );
};

export default Form;
