package br.edu.ifpb.diario.diario.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Map;

/**
 * Serviço responsável pelo gerenciamento de uploads de imagens para o Cloudinary.
 *
 * Utiliza o SDK oficial do Cloudinary para fazer upload e remoção de imagens.
 * As imagens são armazenadas em uma pasta específica e a URL segura (HTTPS) é retornada.
 *
 * @author Pedro Lucas
 * @version 2.0
 */
@Service
public class ObjectStorageService {

    private final Cloudinary cloudinary;

    public ObjectStorageService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret) {

        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true
        ));
    }

    /**
     * Faz upload de um arquivo local para o Cloudinary.
     *
     * @param folder   Pasta/folder no Cloudinary onde a imagem será salva (ex: "images")
     * @param publicId Nome público da imagem (sem extensão)
     * @param filePath Caminho absoluto do arquivo local a ser enviado
     * @return URL segura (HTTPS) da imagem no Cloudinary, ou null em caso de erro
     */
    public String upload(String folder, String publicId, String filePath) {
        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    new File(filePath),
                    ObjectUtils.asMap(
                            "folder", folder,
                            "public_id", publicId,
                            "overwrite", true,
                            "resource_type", "image"
                    )
            );

            String url = (String) result.get("secure_url");
            System.out.println("Upload concluído: " + url);
            return url;

        } catch (IOException e) {
            System.err.println("Erro ao fazer upload para o Cloudinary: " + e.getMessage());
            throw new RuntimeException("Erro ao fazer upload da imagem", e);
        }
    }

    /**
     * Remove uma imagem do Cloudinary usando a URL pública da imagem.
     *
     * O public_id é extraído da URL no formato:
     * https://res.cloudinary.com/{cloud}/image/upload/{folder}/{publicId}.{ext}
     *
     * @param folder   Pasta onde a imagem está armazenada (ex: "images")
     * @param imageUrl URL completa da imagem retornada no upload
     */
    public void deleteImage(String folder, String imageUrl) {
        try {
            // Extrai o public_id da URL do Cloudinary (ex: "images/meu-arquivo")
            String publicId = extractPublicId(imageUrl);

            Map<?, ?> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());

            String resultStatus = (String) result.get("result");
            if ("ok".equals(resultStatus)) {
                System.out.println("Imagem removida do Cloudinary: " + publicId);
            } else {
                System.err.println("Cloudinary não encontrou a imagem para remover: " + publicId);
            }

        } catch (IOException e) {
            throw new RuntimeException("Erro ao deletar imagem no Cloudinary", e);
        }
    }

    /**
     * Extrai o public_id de uma URL do Cloudinary.
     *
     * Exemplo de URL:
     * https://res.cloudinary.com/demo/image/upload/v1234567890/images/meu-arquivo.webp
     * -> public_id: images/meu-arquivo
     */
    private String extractPublicId(String imageUrl) {
        // Remove a extensão e pega tudo após "/upload/"
        String[] parts = imageUrl.split("/upload/");
        if (parts.length < 2) {
            throw new RuntimeException("URL inválida para extração de public_id: " + imageUrl);
        }
        String afterUpload = parts[1];
        // Remove versão opcional (ex: v1234567890/)
        if (afterUpload.matches("v\\d+/.*")) {
            afterUpload = afterUpload.substring(afterUpload.indexOf('/') + 1);
        }
        // Remove a extensão do arquivo
        int dotIndex = afterUpload.lastIndexOf('.');
        if (dotIndex > 0) {
            afterUpload = afterUpload.substring(0, dotIndex);
        }
        return afterUpload;
    }
}
