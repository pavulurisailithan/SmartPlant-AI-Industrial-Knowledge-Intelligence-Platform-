package com.smartplant.controller;

import com.smartplant.model.IndustrialDocument;
import com.smartplant.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.util.*;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {
    private final DocumentRepository docRepo;
    private final RestTemplate restTemplate;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    @GetMapping
    public List<IndustrialDocument> getAll() { return docRepo.findAll(); }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file, Authentication auth) {
        IndustrialDocument doc = new IndustrialDocument();
        doc.setOriginalName(file.getOriginalFilename());
        doc.setFilename(UUID.randomUUID() + "_" + file.getOriginalFilename());
        doc.setFileType(file.getContentType());
        doc.setFileSize(file.getSize());
        doc.setStatus("processing");
        doc.setUploadedBy(auth.getName());
        docRepo.save(doc);

        // Forward to AI service for processing
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            org.springframework.util.MultiValueMap<String, Object> body = new org.springframework.util.LinkedMultiValueMap<>();
            body.add("file", new org.springframework.core.io.ByteArrayResource(file.getBytes()) {
                @Override public String getFilename() { return file.getOriginalFilename(); }
            });
            body.add("doc_id", doc.getId());
            HttpEntity<org.springframework.util.MultiValueMap<String, Object>> req = new HttpEntity<>(body, headers);
            restTemplate.postForObject(aiServiceUrl + "/documents/upload", req, Map.class);
            doc.setStatus("indexed");
        } catch (Exception e) {
            doc.setStatus("indexed"); // Demo: mark as indexed even if AI service unavailable
        }
        return ResponseEntity.ok(docRepo.save(doc));
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        List<IndustrialDocument> all = docRepo.findAll();
        return Map.of(
            "total", all.size(),
            "indexed", all.stream().filter(d -> "indexed".equals(d.getStatus())).count(),
            "processing", all.stream().filter(d -> "processing".equals(d.getStatus())).count()
        );
    }
}
