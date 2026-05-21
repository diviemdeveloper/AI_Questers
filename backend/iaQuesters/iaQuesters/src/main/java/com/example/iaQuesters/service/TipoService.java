package com.example.iaQuesters.service;

import com.example.iaQuesters.model.Tipo;
import com.example.iaQuesters.repository.TipoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TipoService {

    private final TipoRepository tipoRepository;

    public List<Tipo> findAll() { return tipoRepository.findAll(); }
    public Optional<Tipo> findById(Long id) { return tipoRepository.findById(id); }
    public Tipo save(Tipo tipo) { return tipoRepository.save(tipo); }
    public void deleteById(Long id) { tipoRepository.deleteById(id); }
}