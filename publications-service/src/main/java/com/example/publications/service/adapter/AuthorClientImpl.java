package com.example.publications.service.adapter;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AuthorClientImpl implements AuthorClient {

    private final RestTemplate restTemplate;

    @Value("${authors.service.url}")
    private String authorsServiceUrl;

    @Override
    public boolean existsById(UUID authorId) {
        try {
            restTemplate.getForEntity(
                authorsServiceUrl + "/authors/{id}", 
                Void.class, 
                authorId
            );    
            return true;
        } catch (HttpClientErrorException.NotFound ex) {
            return false;
        }
    }
}
