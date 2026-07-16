package com.smartplant.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "documents")
@Data
public class IndustrialDocument {
    @Id
    private String id;
    private String filename;
    private String originalName;
    private String fileType;
    private String category;
    private Long fileSize;
    private String status; // processing, indexed, failed
    private String uploadedBy;
    private LocalDateTime uploadedAt = LocalDateTime.now();
    private Integer pageCount;
    private String extractedText;
    private List<String> tags;
    private String vectorId;
}
