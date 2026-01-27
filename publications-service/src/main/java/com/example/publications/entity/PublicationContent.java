package com.example.publications.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name= "publications")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PublicationContent extends Publication {

    @Column(nullable = false, length = 150)
    private String summary;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_publicacion", nullable = false, length = 15)
    private TipoPublicacion tipoPublicacion;

    @Column(nullable = false, length = 50)
    private String category;
}
