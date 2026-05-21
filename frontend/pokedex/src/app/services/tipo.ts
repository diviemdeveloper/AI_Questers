import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tipo {
  id: number;
  nombre: string;
  color: string;
}

export interface Pokemon {
  id: number;
  nombre: string;
  nivel: number;
  tipo?: Tipo;
}

@Injectable({ providedIn: 'root' })
export class TipoService {

  private apiUrl = 'http://localhost:8080/api';
  tipoSeleccionado = signal<Tipo | null>(null);
  totalTipos = signal<number>(0);

  constructor(private http: HttpClient) {}

  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.apiUrl}/tipos`);
  }

  getTipoById(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.apiUrl}/tipos/${id}`);
  }

  crearTipo(tipo: Partial<Tipo>): Observable<Tipo> {
    return this.http.post<Tipo>(`${this.apiUrl}/tipos`, tipo);
  }

  getPokemonesByTipo(tipoId: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/tipos/${tipoId}/pokemones`);
  }

  getPokemones(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/pokemones`);
  }

  crearPokemon(pokemon: { nombre: string; nivel: number; tipo: { id: number } }): Observable<Pokemon> {
    return this.http.post<Pokemon>(`${this.apiUrl}/pokemones`, pokemon);
  }
  editarTipo(id: number, tipo: Partial<Tipo>): Observable<Tipo> {
    return this.http.put<Tipo>(`${this.apiUrl}/tipos/${id}`, tipo);
  }

  borrarTipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tipos/${id}`);
  }

  editarPokemon(id: number, pokemon: { nombre: string; nivel: number; tipo: { id: number } }): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.apiUrl}/pokemones/${id}`, pokemon);
  }

  borrarPokemon(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pokemones/${id}`);
  }
}