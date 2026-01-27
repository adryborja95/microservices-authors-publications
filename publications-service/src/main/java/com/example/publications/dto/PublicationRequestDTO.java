package com.example.publications.dto;


import com.example.publications.entity.TipoPublicacion;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicationRequestDTO {

    @NotBlank
    @Size(max = 150)
    private String title;

    @NotNull
    private UUID authorId;

    @NotBlank
    @Size(max = 150)
    private String summary;

    @NotBlank
    private String content;

    @NotBlank
    @Size(max = 50)
    private String category;

    @NotNull
    private TipoPublicacion tipoPublicacion;
}
