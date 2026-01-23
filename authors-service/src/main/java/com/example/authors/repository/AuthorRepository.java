package com.example.authors.repository;


import com.example.authors.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AuthorRepository extends JpaRepository<Author, UUID> {
    boolean existsByEmail(String email);
    boolean existsByIdentificacion(String identificacion);

}
