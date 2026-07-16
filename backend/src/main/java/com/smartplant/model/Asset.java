package com.smartplant.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "assets")
@Data
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String assetId;

    private String name;
    private String type;
    private String location;
    private String status;
    private Double healthScore;
    private Integer remainingUsefulLife;
    private LocalDateTime lastMaintenance;
    private LocalDateTime nextMaintenance;
    private LocalDateTime createdAt = LocalDateTime.now();
}
