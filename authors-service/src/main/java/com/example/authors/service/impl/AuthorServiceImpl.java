package com.example.authors.service.impl;

import com.example.authors.dto.AuthorRequestDTO;
import com.example.authors.dto.AuthorResponseDTO;
import com.example.authors.entity.Author;
import com.example.authors.exception.ConflictException;
import com.example.authors.exception.NotFoundException;
import com.example.authors.repository.AuthorRepository;
import com.example.authors.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    private AuthorRepository repository;

    @Override
    public AuthorResponseDTO create(AuthorRequestDTO dto) {

        if (repository.existsByEmail(dto.getEmail())) {
            throw new ConflictException("El correo ya se encuentra registrado");
        }

        if (repository.existsByIdentificacion(dto.getIdentificacion())) {
            throw new ConflictException(
                    "La identificación (" + dto.getTipoIdentificacion() + ") ya se encuentra registrada"
            );
        }

        Author author = new Author();

        author.setTipoIdentificacion(dto.getTipoIdentificacion());
        author.setIdentificacion(dto.getIdentificacion());
        author.setNacionalidad(dto.getNacionalidad());
        author.setNombre(dto.getNombre());
        author.setApellido(dto.getApellido());
        author.setEmail(dto.getEmail());
        author.setTelefono(dto.getTelefono());

        author.setBiografia(dto.getBiografia());
        author.setGeneroLiterario(dto.getGeneroLiterario());

        Author saved = repository.save(author);
        return mapToResponse(saved);
    }

    @Override
    public AuthorResponseDTO getById(UUID id) {
        Author author = repository.findById(id)
                .orElseThrow(
                        ()-> new NotFoundException("Autor no encontrado")
                );
        return mapToResponse(author);
    }

    @Override
    public List<AuthorResponseDTO> getAll() {

        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private AuthorResponseDTO mapToResponse(Author author) {
        AuthorResponseDTO dto = new AuthorResponseDTO();
        dto.setId(author.getId());
        dto.setTipoIdentificacion(author.getTipoIdentificacion());
        dto.setIdentificacion(author.getIdentificacion());
        dto.setNacionalidad(author.getNacionalidad());
        dto.setNombre(author.getNombre());
        dto.setApellido(author.getApellido());
        dto.setEmail(author.getEmail());
        dto.setTelefono(author.getTelefono());
        dto.setBiografia(author.getBiografia());
        dto.setGeneroLiterario(author.getGeneroLiterario());
        return dto;
    }
}
