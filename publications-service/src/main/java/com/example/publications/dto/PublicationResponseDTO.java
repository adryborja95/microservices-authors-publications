package com.example.publications.dto;

import com.example.publications.entity.EditorialStatus;
import com.example.publications.entity.TipoPublicacion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicationResponseDTO {

    private UUID id;

    private String title;

    private UUID authorId;

    private String summary;

    private String content;

    private String category;

    private TipoPublicacion tipoPublicacion;

    private EditorialStatus status;

    private LocalDateTime publishedAt;
}
