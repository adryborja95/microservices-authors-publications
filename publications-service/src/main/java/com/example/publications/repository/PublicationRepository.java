package com.example.publications.repository;

import com.example.publications.entity.EditorialStatus;
import com.example.publications.entity.PublicationContent;
import com.example.publications.entity.TipoPublicacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PublicationRepository extends JpaRepository<PublicationContent, UUID> {

    List<PublicationContent> findByAuthorId(UUID authorId);

    List<PublicationContent> findByStatus(EditorialStatus status);

    List<PublicationContent> findByTipoPublicacion(TipoPublicacion tipoPublicacion);

    boolean existsByTitleAndAuthorId(String title, UUID authorId);
}
