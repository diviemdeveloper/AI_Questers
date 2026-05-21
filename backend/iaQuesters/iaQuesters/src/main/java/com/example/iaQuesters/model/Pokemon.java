package com.example.iaQuesters.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "pokemones")
public class Pokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private Integer nivel;

    @ManyToOne
    @JoinColumn(name = "tipo_id", nullable = false)
    @JsonIgnoreProperties("pokemones")
    private Tipo tipo;
}