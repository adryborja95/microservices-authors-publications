package com.example.publications.service;

import com.example.publications.dto.PublicationRequestDTO;
import com.example.publications.dto.PublicationResponseDTO;
import com.example.publications.entity.EditorialStatus;

import java.util.List;
import java.util.UUID;

public interface PublicationService {

    PublicationResponseDTO create(PublicationRequestDTO dto);

    PublicationResponseDTO getById(UUID id);

    List<PublicationResponseDTO> getAll();

    PublicationResponseDTO changeStatus(UUID id, EditorialStatus newStatus);
}
