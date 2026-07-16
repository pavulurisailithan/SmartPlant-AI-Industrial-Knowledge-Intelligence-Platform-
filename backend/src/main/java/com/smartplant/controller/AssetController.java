package com.smartplant.controller;

import com.smartplant.model.Asset;
import com.smartplant.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class AssetController {
    private final AssetRepository assetRepo;

    @GetMapping
    public List<Asset> getAll() { return assetRepo.findAll(); }

    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getById(@PathVariable String assetId) {
        return assetRepo.findByAssetId(assetId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Asset create(@RequestBody Asset asset) { return assetRepo.save(asset); }

    @PutMapping("/{id}")
    public ResponseEntity<Asset> update(@PathVariable Long id, @RequestBody Asset asset) {
        return assetRepo.findById(id).map(existing -> {
            asset.setId(id);
            return ResponseEntity.ok(assetRepo.save(asset));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        List<Asset> all = assetRepo.findAll();
        return Map.of(
            "total", all.size(),
            "critical", all.stream().filter(a -> "critical".equals(a.getStatus())).count(),
            "warning", all.stream().filter(a -> "warning".equals(a.getStatus())).count(),
            "healthy", all.stream().filter(a -> "good".equals(a.getStatus())).count()
        );
    }
}
