package com.example.iaQuesters.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@Data
@Entity
@Table(name = "tipos")
public class Tipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String color;

    @OneToMany(mappedBy = "tipo", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("tipo")
    private List<Pokemon> pokemones;
}