package br.edu.ifpb.diario.diario.service;

import io.minio.MinioClient;
import io.minio.UploadObjectArgs;
import io.minio.errors.MinioException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/**
 * Serviço responsável pelo gerenciamento de uploads de arquivos para um serviço de armazenamento baseado no MinIO.
 *
 * Utiliza a biblioteca MinIO para interagir com um servidor de armazenamento de objetos compatível com o S3.
 * O serviço configura um cliente MinIO com as credenciais fornecidas e permite o upload de arquivos para um
 * bucket especificado.
 *
 * @author João Lucas
 * @version 1.0
 */
@Service
public class ObjectStorageService {
    private final MinioClient minioClient;
    @Value("${minio.url}") String minioUrl;

    public ObjectStorageService(
            @Value("${minio.url}") String minioUrl,
            @Value("${minio.access-key}") String accessKey,
            @Value("${minio.secret-key}") String secretKey) {

        this.minioClient = MinioClient.builder()
                .endpoint(minioUrl)
                .credentials(accessKey, secretKey)
                .build();
    }

    public String upload(String bucketName, String objectName, String filePath) {

        try {
            this.minioClient.uploadObject(
                    UploadObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .filename(filePath)
                            .build());

            String url = minioUrl + "/" + bucketName + "/" + objectName;

            System.out.println(filePath + " is successfully uploaded as " + objectName + " to bucket " + bucketName);

            return url;
        } catch (MinioException e) {
            System.out.println("Error occurred: " + e);
            System.out.println("HTTP trace: " + e.httpTrace());
            return null;
        } catch (InvalidKeyException | NoSuchAlgorithmException | IOException e) {
            throw new RuntimeException(e);
        }
    }
}
