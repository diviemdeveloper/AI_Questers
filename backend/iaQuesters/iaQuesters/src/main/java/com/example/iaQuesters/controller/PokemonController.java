package com.example.iaQuesters.controller;

import com.example.iaQuesters.model.Pokemon;
import com.example.iaQuesters.model.Tipo;
import com.example.iaQuesters.service.PokemonService;
import com.example.iaQuesters.service.TipoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pokemones")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class PokemonController {

    private final PokemonService pokemonService;
    private final TipoService tipoService;

    @GetMapping
    public List<Pokemon> getAll() { return pokemonService.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Pokemon> getById(@PathVariable Long id) {
        return pokemonService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Pokemon> create(@RequestBody Pokemon pokemon) {
        if (pokemon.getTipo() == null || pokemon.getTipo().getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        Tipo tipo = tipoService.findById(pokemon.getTipo().getId()).orElse(null);
        if (tipo == null) return ResponseEntity.badRequest().build();
        pokemon.setTipo(tipo);
        return ResponseEntity.status(HttpStatus.CREATED).body(pokemonService.save(pokemon));
    }
}