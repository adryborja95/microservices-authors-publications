package com.example.publications.service.strategy;

import com.example.publications.entity.PublicationContent;

public interface EditorialStatusStrategy {
    void apply(PublicationContent publication);
}
