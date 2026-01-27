package com.example.publications.service.impl;

import com.example.publications.dto.PublicationRequestDTO;

import com.example.publications.dto.PublicationResponseDTO;
import com.example.publications.entity.EditorialStatus;
import com.example.publications.entity.PublicationContent;
import com.example.publications.exception.ConflictException;
import com.example.publications.exception.NotFoundException;
import com.example.publications.repository.PublicationRepository;
import com.example.publications.service.PublicationService;
import com.example.publications.service.adapter.AuthorClient;
import com.example.publications.service.factory.PublicationFactory;
import com.example.publications.service.strategy.EditorialStatusStrategy;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PublicationServiceImpl implements PublicationService {


    private final PublicationRepository repository;
    private final PublicationFactory factory;
    private final AuthorClient authorClient;
    private final Map<EditorialStatus, EditorialStatusStrategy> strategies;

    @Override
    public PublicationResponseDTO create(PublicationRequestDTO dto) {

        // ADAPTER PATTERN
        // Validar que el autor exista consultando el microservicio de Authors
        if (!authorClient.existsById(dto.getAuthorId())) {
            throw new NotFoundException("El autor no existe");
        }

        // Validación propia de publications
        if (repository.existsByTitleAndAuthorId(dto.getTitle(), dto.getAuthorId())) {
            throw new ConflictException("El autor ya tiene una publicación con este título");
        }

        //Factory Method
        PublicationContent publication = factory.create(dto);
        return mapToResponse(repository.save(publication));
    }

    @Override
    public PublicationResponseDTO getById(UUID id) {
        PublicationContent publication = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Publicación no encontrada"));
        return mapToResponse(publication);
    }

    @Override
    public List<PublicationResponseDTO> getAll() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public PublicationResponseDTO changeStatus(UUID id, EditorialStatus status) {

        PublicationContent publication = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Publicación no encontrada"));

        EditorialStatusStrategy strategy = strategies.get(status);

        if (status == null) {
            throw new ConflictException("Estado editorial no soportado" + status);
        }

        strategy.apply(publication);
        return mapToResponse(repository.save(publication));
    }

    private PublicationResponseDTO mapToResponse(PublicationContent publication) {
        PublicationResponseDTO dto = new PublicationResponseDTO();
        dto.setId(publication.getId());
        dto.setTitle(publication.getTitle());
        dto.setAuthorId(publication.getAuthorId());
        dto.setSummary(publication.getSummary());
        dto.setCategory(publication.getCategory());
        dto.setTipoPublicacion(publication.getTipoPublicacion());
        dto.setStatus(publication.getStatus());
        dto.setPublishedAt(publication.getPublishedAt());
        return dto;
    }
}
