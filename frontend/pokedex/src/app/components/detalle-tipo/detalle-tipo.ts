import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoService, Tipo, Pokemon } from '../../services/tipo';

@Component({
  selector: 'app-detalle-tipo',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <a routerLink="/" class="volver">← Volver a tipos</a>

    @if (cargando()) { <p>Cargando...</p> }

    @if (tipo()) {
      <div class="cabecera" [style.border-left-color]="tipo()!.color">
        <div class="badge" [style.background]="tipo()!.color">{{ tipo()!.nombre }}</div>
        <h2>Pokémon de tipo {{ tipo()!.nombre }}</h2>
        <p>{{ pokemones().length }} pokémon encontrados</p>
      </div>

      <div class="lista">
        @for (p of pokemones(); track p.id) {
          <div class="pokemon-card">
            <span class="pokemon-id">#{{ p.id }}</span>
            <strong>{{ p.nombre }}</strong>
            <span class="nivel">Nivel {{ p.nivel }}</span>
            <div class="acciones">
              <button class="btn-editar" (click)="abrirEdicion(p)">✏️</button>
              <button class="btn-borrar" (click)="borrarPokemon(p.id)">🗑️</button>
            </div>
          </div>
        }
        @if (pokemones().length === 0) {
          <p>No hay pokémon registrados para este tipo.</p>
        }
      </div>
    }

    @if (error()) { <p class="error">{{ error() }}</p> }

    @if (editando()) {
      <div class="modal-overlay" (click)="cerrarEdicion()">
        <div class="modal" (click)="$event.stopPropagation()">
          <h3>Editar pokémon</h3>
          <form [formGroup]="formEdicion" (ngSubmit)="guardarEdicion()">
            <div class="campo">
              <label>Nombre *</label>
              <input type="text" formControlName="nombre" />
            </div>
            <div class="campo">
              <label>Nivel *</label>
              <input type="number" formControlName="nivel" min="1" max="100" />
            </div>
            <div class="botones">
              <button type="button" class="btn-cancelar" (click)="cerrarEdicion()">Cancelar</button>
              <button type="submit" [disabled]="formEdicion.invalid" class="btn-enviar">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .volver { display: inline-block; margin-bottom: 24px; color: #333; text-decoration: none; font-weight: 600; background: rgba(255,255,230,0.85); padding: 6px 14px; border-radius: 20px; border: 2px solid rgba(0,0,0,0.15); }
    .volver:hover { color: #cc0000; }
    .cabecera { border-left: 6px solid; padding: 16px; margin-bottom: 24px; background: rgba(255,255,230,0.85); border-radius: 12px; box-shadow: 2px 4px 8px rgba(0,0,0,0.2); }
    .cabecera h2 { color: #333; }
    .cabecera p { color: #666; }
    .badge { display: inline-block; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; margin-bottom: 8px; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
    .lista { display: flex; flex-direction: column; gap: 10px; }
    .pokemon-card { display: flex; align-items: center; gap: 16px; padding: 14px 20px; border: 2px solid rgba(0,0,0,0.1); border-radius: 10px; background: rgba(255,255,230,0.85); box-shadow: 2px 4px 8px rgba(0,0,0,0.15); transition: transform 0.15s; }
    .pokemon-card:hover { transform: translateX(4px); }
    .pokemon-id { color: #aaa; font-size: 13px; min-width: 30px; }
    .nivel { color: #666; font-size: 13px; }
    .acciones { margin-left: auto; display: flex; gap: 6px; }
    .btn-editar, .btn-borrar { background: none; border: none; cursor: inherit; font-size: 16px; padding: 4px; border-radius: 4px; }
    .btn-editar:hover { background: rgba(0,0,0,0.08); }
    .btn-borrar:hover { background: rgba(204,0,0,0.15); }
    .error { color: #cc0000; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
    .modal { background: #fffff0; border: 2px solid rgba(0,0,0,0.15); border-radius: 12px; padding: 24px; width: 400px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
    .modal h3 { margin-bottom: 20px; color: #333; }
    .campo { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 600; font-size: 14px; color: #555; }
    input { padding: 10px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 15px; background: white; color: #333; }
    input:focus { outline: none; border-color: #cc0000; }
    .botones { display: flex; gap: 12px; margin-top: 20px; }
    .btn-cancelar { padding: 10px 20px; border: 2px solid #ddd; border-radius: 20px; background: white; color: #333; cursor: inherit; font-weight: 600; }
    .btn-enviar { padding: 10px 24px; background: #cc0000; color: white; border: none; border-radius: 20px; cursor: inherit; font-weight: 600; }
    .btn-enviar:disabled { background: #aaa; }
  `]
})
export class DetalleTipoComponent implements OnInit {

  tipo = signal<Tipo | null>(null);
  pokemones = signal<Pokemon[]>([]);
  cargando = signal(true);
  error = signal('');
  editando = signal<Pokemon | null>(null);
  formEdicion: FormGroup;
  tipoId!: number;

  constructor(
    private route: ActivatedRoute,
    private tipoService: TipoService,
    private fb: FormBuilder
  ) {
    this.formEdicion = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      nivel: [1, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  ngOnInit() {
    this.tipoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDatos();
  }

  cargarDatos() {
    this.tipoService.getTipoById(this.tipoId).subscribe({
      next: (t) => { this.tipo.set(t); this.tipoService.tipoSeleccionado.set(t); },
      error: () => this.error.set('Tipo no encontrado.')
    });
    this.tipoService.getPokemonesByTipo(this.tipoId).subscribe({
      next: (lista) => { this.pokemones.set(lista); this.cargando.set(false); },
      error: () => { this.error.set('Error al cargar los pokémon.'); this.cargando.set(false); }
    });
  }

  abrirEdicion(pokemon: Pokemon) {
    this.editando.set(pokemon);
    this.formEdicion.setValue({ nombre: pokemon.nombre, nivel: pokemon.nivel });
  }

  cerrarEdicion() { this.editando.set(null); }

  guardarEdicion() {
    if (this.formEdicion.invalid || !this.editando()) return;
    const payload = { nombre: this.formEdicion.value.nombre, nivel: this.formEdicion.value.nivel, tipo: { id: this.tipoId } };
    this.tipoService.editarPokemon(this.editando()!.id, payload).subscribe({
      next: () => { this.cerrarEdicion(); this.cargarDatos(); }
    });
  }

  borrarPokemon(id: number) {
    if (!confirm('¿Seguro que quieres borrar este pokémon?')) return;
    this.tipoService.borrarPokemon(id).subscribe({ next: () => this.cargarDatos() });
  }
}