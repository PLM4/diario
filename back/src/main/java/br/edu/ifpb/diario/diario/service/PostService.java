package br.edu.ifpb.diario.diario.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import br.edu.ifpb.diario.diario.domain.Post;
import br.edu.ifpb.diario.diario.dtos.ImageDTO;
import br.edu.ifpb.diario.diario.dtos.PostRequestDTO;
import br.edu.ifpb.diario.diario.dtos.PostResponseDTO;
import br.edu.ifpb.diario.diario.repository.PostRepository;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;

    @Autowired
    private ObjectStorageService objectStorageService;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public PostResponseDTO createPost(PostRequestDTO resquestDTO) {
        Post newPost = new Post();
        newPost.setTitle(resquestDTO.title());
        newPost.setSubtitle(resquestDTO.subtitle());
        newPost.setContent(resquestDTO.content());
        newPost.setImageUrl(resquestDTO.imageUrl());

        postRepository.save(newPost);

        return new PostResponseDTO(
                newPost.getId(),
                newPost.getTitle(),
                newPost.getSubtitle(),
                newPost.getContent(),
                newPost.getImageUrl(),
                newPost.getCreatedAt()
        );
    }

    public ImageDTO uploadImage(String filePath, String filename) {
        File file = new File(filePath);

        if (!file.exists()) {
            throw new RuntimeException("Arquivo não encontrado: " + filePath);
        }

        String imageUrl = this.objectStorageService.upload("images", filename, filePath);
        file.delete();

        return new ImageDTO(imageUrl);
    }   

    public void deletePost(UUID id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post não encontrado com id: " + id));

        if (post.getImageUrl() != null && post.getImageUrl().startsWith("blob:")) {
            System.out.println("Ignorando blob URL, não é imagem do MinIO");
        } else {
            String objectName = extractObjectName(post.getImageUrl());
            objectStorageService.deleteImage("images", objectName);
        }

        postRepository.delete(post);
    }

    public PostResponseDTO updatePost(UUID id, PostRequestDTO requestDTO) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post não encontrado com id: " + id));

        post.setTitle(requestDTO.title());
        post.setSubtitle(requestDTO.subtitle());
        post.setContent(requestDTO.content());
        post.setImageUrl(requestDTO.imageUrl());

        postRepository.save(post);

        return new PostResponseDTO(
                post.getId(),
                post.getTitle(),
                post.getSubtitle(),
                post.getContent(),
                post.getImageUrl(),
                post.getCreatedAt()
        );
    }

    public List<PostResponseDTO> getAllPosts() {
        List<PostResponseDTO> respose = new ArrayList<>();
        List<Post> posts = postRepository.findAll();

        posts.forEach(post -> {
            respose.add(
                    new PostResponseDTO(
                            post.getId(),
                            post.getTitle(),
                            post.getSubtitle(),
                            post.getContent(),
                            post.getImageUrl(),
                            post.getCreatedAt()
                    )
            );
        });

        return respose;
    }

    public PostResponseDTO getPostById(UUID id) {
        Post post =  postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post não encontrado com id: " + id));
        return new PostResponseDTO(
                post.getId(),
                post.getTitle(),
                post.getSubtitle(),
                post.getContent(),
                post.getImageUrl(),
                post.getCreatedAt()
        );
    }

    private String extractObjectName(String imageUrl) {
        if (imageUrl == null || imageUrl.isBlank()) return null;

        return imageUrl.substring(imageUrl.indexOf("/images/") + 1);
    }
}
