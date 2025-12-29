package br.edu.ifpb.diario.diario.controller;

import br.edu.ifpb.diario.diario.config.FileStorageProperties;
import br.edu.ifpb.diario.diario.dtos.ImageDTO;
import br.edu.ifpb.diario.diario.dtos.PostRequestDTO;
import br.edu.ifpb.diario.diario.dtos.PostResponseDTO;
import br.edu.ifpb.diario.diario.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final Path fileStorageLocation;

    private PostService postService;

    public PostController(FileStorageProperties fileStorageProperties, PostService postService) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        this.postService = postService;
    }

    @PostMapping()
    public ResponseEntity<PostResponseDTO> save(@RequestBody PostRequestDTO postRequestDTO) {
        PostResponseDTO savedPost = this.postService.createPost(postRequestDTO);
        if (savedPost == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(savedPost);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> getById(@PathVariable UUID id) {
        PostResponseDTO post = this.postService.getPostById(id);
        if (post != null) {
            return ResponseEntity.ok(post);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<PostResponseDTO>> getAll() {
        List<PostResponseDTO> posts = this.postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/upload")
    public ResponseEntity<ImageDTO> upload(@RequestParam("file") MultipartFile file) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            Path targetLocation = fileStorageLocation.resolve(fileName);
            file.transferTo(targetLocation);

            ImageDTO imageDTO = this.postService.uploadImage(targetLocation.toString(), file.getOriginalFilename());

            return ResponseEntity.ok(imageDTO);
        } catch (IOException ex) {
            ex.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPost(@PathVariable UUID id) {
        try {
            this.postService.deletePost(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
            
        }
    }
}
