package com.example.publications.service.strategy;

import com.example.publications.entity.EditorialStatus;
import com.example.publications.entity.PublicationContent;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class PublishedStatusStrategy implements EditorialStatusStrategy {

    @Override
    public void apply(PublicationContent publication) {
        publication.setStatus(EditorialStatus.PUBLISHED);
        publication.setPublishedAt(LocalDateTime.now());
    }
}
