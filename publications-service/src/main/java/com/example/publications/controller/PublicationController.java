package com.example.publications.controller;

import com.example.publications.dto.PublicationRequestDTO;
import com.example.publications.dto.PublicationResponseDTO;
import com.example.publications.entity.EditorialStatus;
import com.example.publications.service.PublicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/publications")
public class PublicationController {

    @Autowired
    private PublicationService service;

    // POST /publications
    // Crear una publicación asociada a un autor existente
    @PostMapping
    public ResponseEntity<PublicationResponseDTO> create(
            @Valid @RequestBody PublicationRequestDTO dto) {

        PublicationResponseDTO response = service.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // GET /publications/{id}
    // Obtener una publicación por su identificador
    @GetMapping("/{id}")
    public ResponseEntity<PublicationResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(service.getById(id));
    }

    // GET /publications
    // Listar todas las publicaciones
    @GetMapping
    public ResponseEntity<List<PublicationResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // PATCH /publications/{id}/status
    // Cambiar el estado editorial de una publicación
    @PatchMapping("/{id}/status")
    public ResponseEntity<PublicationResponseDTO> changeStatus(
            @PathVariable UUID id,
            @RequestParam EditorialStatus status) {

        return ResponseEntity.ok(service.changeStatus(id, status));
    }
}
