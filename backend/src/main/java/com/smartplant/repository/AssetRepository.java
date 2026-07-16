package com.smartplant.repository;

import com.smartplant.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    Optional<Asset> findByAssetId(String assetId);
    List<Asset> findByStatus(String status);
    List<Asset> findByType(String type);
}
