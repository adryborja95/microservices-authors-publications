package com.example.publications.service.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AuthorClientImpl implements AuthorClient {

    private final RestTemplate restTemplate;

    private static final String AUTHORS_SERVICE_URL =
            "http://localhost:8081/authors/{id}";

    @Override
    public boolean existsById(UUID authorId) {
        try {
            restTemplate.getForEntity(AUTHORS_SERVICE_URL, Void.class, authorId);
            return true;
        } catch (HttpClientErrorException.NotFound ex) {
            return false;
        }
    }
}
