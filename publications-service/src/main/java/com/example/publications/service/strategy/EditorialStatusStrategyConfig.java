package com.example.publications.service.strategy;

import com.example.publications.entity.EditorialStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class EditorialStatusStrategyConfig {

    @Bean
    public Map<EditorialStatus, EditorialStatusStrategy> editorialStatusStrategies(
            DraftStatusStrategy draft,
            InReviewStatusStrategy inReview,
            ApprovedStatusStrategy approved,
            PublishedStatusStrategy published,
            RejectedStatusStrategy rejected
    ) {
        return Map.of(
                EditorialStatus.DRAFT, draft,
                EditorialStatus.IN_REVIEW, inReview,
                EditorialStatus.APPROVED, approved,
                EditorialStatus.PUBLISHED, published,
                EditorialStatus.REJECTED, rejected
        );
    }
}
