import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoService, Tipo } from '../../services/tipo';

@Component({
  selector: 'app-lista-tipos',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <h2>Tipos de Pokémon</h2>
    <p class="subtitulo">Total: {{ totalTipos() }} tipos registrados</p>

    @if (cargando()) { <p>Cargando tipos...</p> }
    @if (error()) { <p class="error">{{ error() }}</p> }

    <div class="grid">
      @for (tipo of tipos(); track tipo.id) {
        <div class="card" [style.border-left-color]="tipo.color">
          <div class="card-body">
            <div class="card-header">
              <div class="badge" [style.background]="tipo.color">{{ tipo.nombre }}</div>
              <div class="acciones">
                <button class="btn-editar" (click)="abrirEdicion(tipo)">✏️</button>
                <button class="btn-borrar" (click)="borrar(tipo.id)">🗑️</button>
              </div>
            </div>
            <a [routerLink]="['/tipo', tipo.id]" class="ver-mas">Ver pokémon →</a>
          </div>
        </div>
      }
    </div>

    @if (editando()) {
      <div class="modal-overlay" (click)="cerrarEdicion()">
        <div class="modal" (click)="$event.stopPropagation()">
          <h3>Editar tipo</h3>
          <form [formGroup]="formEdicion" (ngSubmit)="guardarEdicion()">
            <div class="campo">
              <label>Nombre *</label>
              <input type="text" formControlName="nombre" />
            </div>
            <div class="campo">
              <label>Color *</label>
              <div class="color-row">
                <input type="color" formControlName="color" />
                <span>{{ formEdicion.get('color')?.value }}</span>
              </div>
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
    h2 { margin-bottom: 4px; color: #333; font-size: 26px; text-shadow: 1px 1px 0 white; }
    .subtitulo { color: #555; margin-bottom: 24px; font-weight: 600; text-shadow: 0 1px 2px white; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
    .card {
      border-radius: 12px;
      border: 2px solid rgba(0,0,0,0.15);
      border-left: 6px solid #ccc;
      background: rgba(255, 255, 230, 0.85);
      backdrop-filter: blur(4px);
      transition: box-shadow 0.2s, transform 0.2s;
      box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
    }
    .card:hover { box-shadow: 4px 8px 20px rgba(0,0,0,0.3); transform: translateY(-3px); }
    .card-body { padding: 16px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .badge { color: white; padding: 4px 10px; border-radius: 20px; font-size: 13px; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
    .acciones { display: flex; gap: 6px; }
    .btn-editar, .btn-borrar { background: none; border: none; cursor: inherit; font-size: 16px; padding: 4px; border-radius: 4px; }
    .btn-editar:hover { background: rgba(0,0,0,0.08); }
    .btn-borrar:hover { background: rgba(204,0,0,0.15); }
    .ver-mas { font-size: 13px; color: #666; text-decoration: none; font-weight: 600; }
    .ver-mas:hover { color: #cc0000; }
    .error { color: #cc0000; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
    .modal { background: #fffff0; border: 2px solid rgba(0,0,0,0.15); border-radius: 12px; padding: 24px; width: 400px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
    .modal h3 { margin-bottom: 20px; color: #333; }
    .campo { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 600; font-size: 14px; color: #555; }
    input[type="text"] { padding: 10px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 15px; background: white; color: #333; }
    input[type="text"]:focus { outline: none; border-color: #cc0000; }
    .color-row { display: flex; align-items: center; gap: 12px; }
    input[type="color"] { width: 48px; height: 36px; border: none; cursor: inherit; }
    .botones { display: flex; gap: 12px; margin-top: 20px; }
    .btn-cancelar { padding: 10px 20px; border: 2px solid #ddd; border-radius: 20px; background: white; color: #333; cursor: inherit; font-weight: 600; }
    .btn-enviar { padding: 10px 24px; background: #cc0000; color: white; border: none; border-radius: 20px; cursor: inherit; font-weight: 600; }
    .btn-enviar:disabled { background: #aaa; }
  `]
})
export class ListaTiposComponent implements OnInit {

  tipos = signal<Tipo[]>([]);
  cargando = signal(true);
  error = signal('');
  totalTipos = signal(0);
  editando = signal<Tipo | null>(null);
  formEdicion: FormGroup;

  constructor(private tipoService: TipoService, private fb: FormBuilder) {
    this.formEdicion = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      color: ['#ff0000', Validators.required]
    });
  }

  ngOnInit() { this.cargarTipos(); }

  cargarTipos() {
    this.tipoService.getTipos().subscribe({
      next: (datos) => {
        this.tipos.set(datos);
        this.totalTipos.set(datos.length);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los tipos. ¿Está arrancado el backend?');
        this.cargando.set(false);
      }
    });
  }

  abrirEdicion(tipo: Tipo) {
    this.editando.set(tipo);
    this.formEdicion.setValue({ nombre: tipo.nombre, color: tipo.color });
  }

  cerrarEdicion() { this.editando.set(null); }

  guardarEdicion() {
    if (this.formEdicion.invalid || !this.editando()) return;
    this.tipoService.editarTipo(this.editando()!.id, this.formEdicion.value).subscribe({
      next: () => { this.cerrarEdicion(); this.cargarTipos(); }
    });
  }

  borrar(id: number) {
    if (!confirm('¿Seguro que quieres borrar este tipo? Se borrarán también sus pokémon.')) return;
    this.tipoService.borrarTipo(id).subscribe({ next: () => this.cargarTipos() });
  }
}