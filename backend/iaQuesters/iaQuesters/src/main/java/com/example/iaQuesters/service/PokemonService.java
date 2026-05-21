package com.example.iaQuesters.service;

import com.example.iaQuesters.model.Pokemon;
import com.example.iaQuesters.repository.PokemonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PokemonService {

    private final PokemonRepository pokemonRepository;

    public List<Pokemon> findAll() { return pokemonRepository.findAll(); }
    public Optional<Pokemon> findById(Long id) { return pokemonRepository.findById(id); }
    public List<Pokemon> findByTipoId(Long tipoId) { return pokemonRepository.findByTipoId(tipoId); }
    public Pokemon save(Pokemon pokemon) { return pokemonRepository.save(pokemon); }
    public void deleteById(Long id) { pokemonRepository.deleteById(id); }
}