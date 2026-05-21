package com.example.iaQuesters.controller;

import com.example.iaQuesters.model.Tipo;
import com.example.iaQuesters.model.Pokemon;
import com.example.iaQuesters.service.TipoService;
import com.example.iaQuesters.service.PokemonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tipos")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TipoController {

    private final TipoService tipoService;
    private final PokemonService pokemonService;

    @GetMapping
    public List<Tipo> getAll() { return tipoService.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Tipo> getById(@PathVariable Long id) {
        return tipoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tipo create(@RequestBody Tipo tipo) { return tipoService.save(tipo); }

    @GetMapping("/{id}/pokemones")
    public ResponseEntity<List<Pokemon>> getPokemonesByTipo(@PathVariable Long id) {
        return tipoService.findById(id)
                .map(t -> ResponseEntity.ok(pokemonService.findByTipoId(id)))
                .orElse(ResponseEntity.notFound().build());
    }
}