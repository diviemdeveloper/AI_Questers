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
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
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
        if (pokemon.getTipo() == null || pokemon.getTipo().getId() == null)
            return ResponseEntity.badRequest().build();
        Tipo tipo = tipoService.findById(pokemon.getTipo().getId()).orElse(null);
        if (tipo == null) return ResponseEntity.badRequest().build();
        pokemon.setTipo(tipo);
        return ResponseEntity.status(HttpStatus.CREATED).body(pokemonService.save(pokemon));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pokemon> update(@PathVariable Long id, @RequestBody Pokemon pokemon) {
        return pokemonService.findById(id).map(p -> {
            p.setNombre(pokemon.getNombre());
            p.setNivel(pokemon.getNivel());
            if (pokemon.getTipo() != null && pokemon.getTipo().getId() != null) {
                tipoService.findById(pokemon.getTipo().getId()).ifPresent(p::setTipo);
            }
            return ResponseEntity.ok(pokemonService.save(p));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return pokemonService.findById(id).map(p -> {
            pokemonService.deleteById(id);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}