import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { TipoService, Tipo, Pokemon } from '../../services/tipo';

@Component({
  selector: 'app-detalle-tipo',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  template: `
    <a routerLink="/" class="volver">← Volver a tipos</a>

    @if (cargando()) { <p>Cargando...</p> }

    @if (tipo()) {
      <div class="cabecera" [style.border-left-color]="tipo()!.color">
        <div class="badge" [style.background]="tipo()!.color">{{ tipo()!.nombre }}</div>
        <h2>Pokémon de tipo {{ tipo()!.nombre }}</h2>
        <p>{{ pokemonesFiltrados().length }} de {{ pokemones().length }} pokémon</p>
      </div>

      <div class="buscador">
        <input type="text" [(ngModel)]="busqueda" placeholder="🔍 Buscar pokémon..." (input)="filtrar()" />
      </div>

      @if (mensaje()) {
        <div class="mensaje" [class.mensaje-error]="esError()" [class.mensaje-ok]="!esError()">
          {{ mensaje() }}
        </div>
      }

      <div class="lista">
        @for (p of pokemonesPaginados(); track p.id) {
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

        @if (pokemonesFiltrados().length === 0 && !cargando()) {
          <p class="sin-resultados">No se encontraron pokémon con "{{ busqueda }}"</p>
        }
      </div>

      <!-- Paginación -->
      @if (totalPaginas() > 1) {
        <div class="paginacion">
          <button [disabled]="paginaActual() === 1" (click)="cambiarPagina(paginaActual() - 1)">← Anterior</button>
          @for (p of paginas(); track p) {
            <button [class.activa]="p === paginaActual()" (click)="cambiarPagina(p)">{{ p }}</button>
          }
          <button [disabled]="paginaActual() === totalPaginas()" (click)="cambiarPagina(paginaActual() + 1)">Siguiente →</button>
        </div>
      }
    }

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

    @if (mostrarConfirm()) {
      <div class="modal-overlay">
        <div class="modal modal-confirm">
          <h3>⚠️ ¿Estás seguro?</h3>
          <p>Se borrará el pokémon permanentemente.</p>
          <div class="botones">
            <button class="btn-cancelar" (click)="cancelarBorrado()">Cancelar</button>
            <button class="btn-borrar-confirm" (click)="confirmarBorrado()">Sí, borrar</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .volver { display: inline-block; margin-bottom: 24px; color: #333; text-decoration: none; font-weight: 600; background: rgba(255,255,230,0.85); padding: 6px 14px; border-radius: 20px; border: 2px solid rgba(0,0,0,0.15); }
    .volver:hover { color: #cc0000; }
    .cabecera { border-left: 6px solid; padding: 16px; margin-bottom: 16px; background: rgba(255,255,230,0.85); border-radius: 12px; box-shadow: 2px 4px 8px rgba(0,0,0,0.2); }
    .cabecera h2 { color: #333; }
    .cabecera p { color: #666; }
    .badge { display: inline-block; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; margin-bottom: 8px; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
    .buscador { margin-bottom: 16px; }
    .buscador input { width: 100%; max-width: 400px; padding: 10px 16px; border: 2px solid rgba(0,0,0,0.15); border-radius: 20px; font-size: 15px; background: rgba(255,255,230,0.9); box-shadow: 2px 4px 8px rgba(0,0,0,0.15); }
    .buscador input:focus { outline: none; border-color: #cc0000; }
    .mensaje { padding: 12px 20px; border-radius: 8px; margin-bottom: 16px; font-weight: 600; font-size: 14px; }
    .mensaje-ok { background: rgba(200,255,200,0.9); color: #2a7a2a; border: 2px solid #2a7a2a; }
    .mensaje-error { background: rgba(255,200,200,0.9); color: #cc0000; border: 2px solid #cc0000; }
    .sin-resultados { color: #555; font-weight: 600; text-shadow: 0 1px 2px white; }
    .lista { display: flex; flex-direction: column; gap: 10px; }
    .pokemon-card { display: flex; align-items: center; gap: 16px; padding: 14px 20px; border: 2px solid rgba(0,0,0,0.1); border-radius: 10px; background: rgba(255,255,230,0.85); box-shadow: 2px 4px 8px rgba(0,0,0,0.15); transition: transform 0.15s; }
    .pokemon-card:hover { transform: translateX(4px); }
    .pokemon-id { color: #aaa; font-size: 13px; min-width: 30px; }
    .nivel { color: #666; font-size: 13px; }
    .acciones { margin-left: auto; display: flex; gap: 6px; }
    .btn-editar, .btn-borrar { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px; border-radius: 4px; }
    .btn-editar:hover { background: rgba(0,0,0,0.08); }
    .btn-borrar:hover { background: rgba(204,0,0,0.15); }
    .paginacion { display: flex; gap: 8px; margin-top: 24px; align-items: center; flex-wrap: wrap; }
    .paginacion button { padding: 8px 14px; border: 2px solid rgba(0,0,0,0.15); border-radius: 20px; background: rgba(255,255,230,0.85); cursor: pointer; font-weight: 600; font-size: 13px; }
    .paginacion button:hover { background: rgba(204,0,0,0.1); }
    .paginacion button.activa { background: #cc0000; color: white; border-color: #cc0000; }
    .paginacion button:disabled { opacity: 0.4; cursor: not-allowed; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
    .modal { background: #fffff0; border: 2px solid rgba(0,0,0,0.15); border-radius: 12px; padding: 24px; width: 400px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
    .modal-confirm p { color: #555; margin-bottom: 8px; }
    .modal h3 { margin-bottom: 20px; color: #333; }
    .campo { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 600; font-size: 14px; color: #555; }
    input { padding: 10px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 15px; background: white; color: #333; }
    input:focus { outline: none; border-color: #cc0000; }
    .botones { display: flex; gap: 12px; margin-top: 20px; }
    .btn-cancelar { padding: 10px 20px; border: 2px solid #ddd; border-radius: 20px; background: white; color: #333; cursor: pointer; font-weight: 600; }
    .btn-enviar { padding: 10px 24px; background: #cc0000; color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: 600; }
    .btn-enviar:disabled { background: #aaa; }
    .btn-borrar-confirm { padding: 10px 24px; background: #cc0000; color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: 600; }
  `]
})
export class DetalleTipoComponent implements OnInit {

  tipo = signal<Tipo | null>(null);
  pokemones = signal<Pokemon[]>([]);
  pokemonesFiltrados = signal<Pokemon[]>([]);
  pokemonesPaginados = signal<Pokemon[]>([]);
  cargando = signal(true);
  editando = signal<Pokemon | null>(null);
  mensaje = signal('');
  esError = signal(false);
  mostrarConfirm = signal(false);
  idParaBorrar = signal<number | null>(null);
  paginaActual = signal(1);
  totalPaginas = signal(1);
  paginas = signal<number[]>([]);
  porPagina = 8;
  busqueda = '';
  tipoId!: number;
  formEdicion: FormGroup;

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
      error: () => this.mostrarMensaje('Tipo no encontrado.', true)
    });

    this.tipoService.getPokemonesByTipo(this.tipoId).subscribe({
      next: (lista) => {
        this.pokemones.set(lista);
        this.pokemonesFiltrados.set(lista);
        this.actualizarPaginacion(lista);
        this.cargando.set(false);
      },
      error: () => {
        this.mostrarMensaje('Error al cargar los pokémon.', true);
        this.cargando.set(false);
      }
    });
  }

  filtrar() {
    const texto = this.busqueda.toLowerCase();
    const filtrados = this.pokemones().filter(p => p.nombre.toLowerCase().includes(texto));
    this.pokemonesFiltrados.set(filtrados);
    this.paginaActual.set(1);
    this.actualizarPaginacion(filtrados);
  }

  actualizarPaginacion(lista: Pokemon[]) {
    const total = Math.ceil(lista.length / this.porPagina);
    this.totalPaginas.set(total);
    this.paginas.set(Array.from({ length: total }, (_, i) => i + 1));
    this.paginar(lista);
  }

  paginar(lista: Pokemon[]) {
    const inicio = (this.paginaActual() - 1) * this.porPagina;
    this.pokemonesPaginados.set(lista.slice(inicio, inicio + this.porPagina));
  }

  cambiarPagina(pagina: number) {
    this.paginaActual.set(pagina);
    this.paginar(this.pokemonesFiltrados());
  }

  mostrarMensaje(texto: string, error: boolean) {
    this.mensaje.set(texto);
    this.esError.set(error);
    setTimeout(() => this.mensaje.set(''), 3000);
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
      next: () => {
        this.cerrarEdicion();
        this.cargarDatos();
        this.mostrarMensaje('✓ Pokémon actualizado correctamente', false);
      },
      error: () => this.mostrarMensaje('Error al actualizar el pokémon', true)
    });
  }

  borrarPokemon(id: number) {
    this.idParaBorrar.set(id);
    this.mostrarConfirm.set(true);
  }

  cancelarBorrado() {
    this.mostrarConfirm.set(false);
    this.idParaBorrar.set(null);
  }

  confirmarBorrado() {
    const id = this.idParaBorrar();
    if (!id) return;
    this.tipoService.borrarPokemon(id).subscribe({
      next: () => {
        this.mostrarConfirm.set(false);
        this.idParaBorrar.set(null);
        this.cargarDatos();
        this.mostrarMensaje('✓ Pokémon borrado correctamente', false);
      },
      error: () => {
        this.mostrarConfirm.set(false);
        this.mostrarMensaje('Error al borrar el pokémon', true);
      }
    });
  }
}