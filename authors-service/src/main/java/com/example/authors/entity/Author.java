package com.example.authors.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "authors")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Author extends Persona {

    @Column(length = 500)
    private String biografia;

    @Column(nullable = false, length = 60)
    private String generoLiterario;

}
