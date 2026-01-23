package com.example.authors.service;

import com.example.authors.dto.AuthorRequestDTO;
import com.example.authors.dto.AuthorResponseDTO;
import com.example.authors.entity.Author;

import java.util.List;
import java.util.UUID;

public interface AuthorService {

    AuthorResponseDTO create(AuthorRequestDTO dto);

    AuthorResponseDTO getById(UUID id);

    List<AuthorResponseDTO> getAll();
}
