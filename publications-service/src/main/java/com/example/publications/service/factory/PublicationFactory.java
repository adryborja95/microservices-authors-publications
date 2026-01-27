package com.example.publications.service.factory;

import com.example.publications.dto.PublicationRequestDTO;
import com.example.publications.entity.PublicationContent;
import org.springframework.stereotype.Component;

@Component
public class PublicationFactory {

    public PublicationContent create(PublicationRequestDTO dto) {

        PublicationContent publication = new PublicationContent();
        publication.setTitle(dto.getTitle());
        publication.setAuthorId(dto.getAuthorId());
        publication.setSummary(dto.getSummary());
        publication.setContent(dto.getContent());
        publication.setCategory(dto.getCategory());
        publication.setTipoPublicacion(dto.getTipoPublicacion());

        return publication;
    }
}
