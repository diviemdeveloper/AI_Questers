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
      <div class="cabecera" [style.border-color]="tipo()!.color">
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
    .volver { display: inline-block; margin-bottom: 24px; color: #cc0000; text-decoration: none; }
    .volver:hover { text-decoration: underline; }
    .cabecera { border-left: 6px solid; padding-left: 16px; margin-bottom: 24px; }
    .badge { display: inline-block; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; margin-bottom: 8px; }
    .lista { display: flex; flex-direction: column; gap: 10px; }
    .pokemon-card { display: flex; align-items: center; gap: 16px; padding: 14px 20px; border: 1px solid #eee; border-radius: 8px; background: white; }
    .pokemon-id { color: #aaa; font-size: 13px; min-width: 30px; }
    .nivel { color: #666; font-size: 13px; }
    .acciones { margin-left: auto; display: flex; gap: 6px; }
    .btn-editar, .btn-borrar { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px; border-radius: 4px; }
    .btn-editar:hover { background: #f0f0f0; }
    .btn-borrar:hover { background: #ffe0e0; }
    .error { color: red; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
    .modal { background: white; border-radius: 12px; padding: 24px; width: 400px; }
    .modal h3 { margin-bottom: 20px; }
    .campo { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 500; font-size: 14px; }
    input { padding: 10px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 15px; }
    .botones { display: flex; gap: 12px; margin-top: 20px; }
    .btn-cancelar { padding: 10px 20px; border: 1px solid #ccc; border-radius: 6px; background: none; cursor: pointer; }
    .btn-enviar { padding: 10px 24px; background: #cc0000; color: white; border: none; border-radius: 6px; cursor: pointer; }
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
      next: (t) => {
        this.tipo.set(t);
        this.tipoService.tipoSeleccionado.set(t);
      },
      error: () => this.error.set('Tipo no encontrado.')
    });

    this.tipoService.getPokemonesByTipo(this.tipoId).subscribe({
      next: (lista) => {
        this.pokemones.set(lista);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los pokémon.');
        this.cargando.set(false);
      }
    });
  }

  abrirEdicion(pokemon: Pokemon) {
    this.editando.set(pokemon);
    this.formEdicion.setValue({ nombre: pokemon.nombre, nivel: pokemon.nivel });
  }

  cerrarEdicion() {
    this.editando.set(null);
  }

  guardarEdicion() {
    if (this.formEdicion.invalid || !this.editando()) return;
    const payload = {
      nombre: this.formEdicion.value.nombre,
      nivel: this.formEdicion.value.nivel,
      tipo: { id: this.tipoId }
    };
    this.tipoService.editarPokemon(this.editando()!.id, payload).subscribe({
      next: () => {
        this.cerrarEdicion();
        this.cargarDatos();
      }
    });
  }

  borrarPokemon(id: number) {
    if (!confirm('¿Seguro que quieres borrar este pokémon?')) return;
    this.tipoService.borrarPokemon(id).subscribe({
      next: () => this.cargarDatos()
    });
  }
}