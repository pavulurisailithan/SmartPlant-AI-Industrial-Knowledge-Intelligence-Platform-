package com.smartplant.repository;

import com.smartplant.model.IndustrialDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DocumentRepository extends MongoRepository<IndustrialDocument, String> {
    List<IndustrialDocument> findByStatus(String status);
    List<IndustrialDocument> findByUploadedBy(String uploadedBy);
    List<IndustrialDocument> findByCategory(String category);
}
