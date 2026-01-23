package com.example.authors.dto;

import com.example.authors.entity.TipoIdentificacion;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorRequestDTO {

    @NotNull
    private TipoIdentificacion tipoIdentificacion;

    @NotBlank
    @Size(max = 20)
    private String identificacion;

    @NotBlank
    @Size(max = 30)
    private String nacionalidad;

    @NotBlank
    @Size(min = 1, max = 30)
    private String nombre;

    @NotBlank
    @Size(min = 1, max = 30)
    private String apellido;

    @NotBlank
    @Email
    @Size(max = 50)
    private String email;

    @NotBlank
    @Size(max = 15)
    private String telefono;

    @Size(max = 500)
    private String biografia;

    @NotBlank
    @Size(max = 60)
    private String generoLiterario;
}
