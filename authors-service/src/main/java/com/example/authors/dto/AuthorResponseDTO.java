package com.example.authors.dto;

import com.example.authors.entity.TipoIdentificacion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorResponseDTO {
    private UUID id;

    private TipoIdentificacion tipoIdentificacion;

    private String identificacion;

    private String nacionalidad;

    private String nombre;

    private String apellido;

    private String email;

    private String telefono;

    private String biografia;

    private String generoLiterario;
}
