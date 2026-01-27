package com.example.publications.service.strategy;

import com.example.publications.entity.EditorialStatus;
import com.example.publications.entity.PublicationContent;
import org.springframework.stereotype.Component;

@Component
public class InReviewStatusStrategy implements EditorialStatusStrategy{

    @Override
    public void apply(PublicationContent publication) {
        publication.setStatus(EditorialStatus.IN_REVIEW);
    }
}
