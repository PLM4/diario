package br.edu.ifpb.diario.diario;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import br.edu.ifpb.diario.diario.config.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties(FileStorageProperties.class)
public class DiarioApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiarioApplication.class, args);
	}

}
