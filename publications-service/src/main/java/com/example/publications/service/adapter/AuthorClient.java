package com.example.publications.service.adapter;

import java.util.UUID;

public interface AuthorClient {

    boolean existsById(UUID authorId);
}
