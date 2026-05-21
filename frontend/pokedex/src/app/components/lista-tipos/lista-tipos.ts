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
    h2 { margin-bottom: 4px; }
    .subtitulo { color: #666; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
    .card { border-radius: 10px; border: 1px solid #ddd; border-left: 6px solid #ccc; background: white; }
    .card-body { padding: 16px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .badge { color: white; padding: 4px 10px; border-radius: 20px; font-size: 13px; }
    .acciones { display: flex; gap: 6px; }
    .btn-editar, .btn-borrar { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px; border-radius: 4px; }
    .btn-editar:hover { background: #f0f0f0; }
    .btn-borrar:hover { background: #ffe0e0; }
    .ver-mas { font-size: 13px; color: #888; text-decoration: none; }
    .ver-mas:hover { text-decoration: underline; }
    .error { color: red; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
    .modal { background: white; border-radius: 12px; padding: 24px; width: 400px; }
    .modal h3 { margin-bottom: 20px; }
    .campo { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 500; font-size: 14px; }
    input[type="text"] { padding: 10px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 15px; }
    .color-row { display: flex; align-items: center; gap: 12px; }
    input[type="color"] { width: 48px; height: 36px; border: none; cursor: pointer; }
    .botones { display: flex; gap: 12px; margin-top: 20px; }
    .btn-cancelar { padding: 10px 20px; border: 1px solid #ccc; border-radius: 6px; background: none; cursor: pointer; }
    .btn-enviar { padding: 10px 24px; background: #cc0000; color: white; border: none; border-radius: 6px; cursor: pointer; }
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

  ngOnInit() {
    this.cargarTipos();
  }

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

  cerrarEdicion() {
    this.editando.set(null);
  }

  guardarEdicion() {
    if (this.formEdicion.invalid || !this.editando()) return;
    this.tipoService.editarTipo(this.editando()!.id, this.formEdicion.value).subscribe({
      next: () => {
        this.cerrarEdicion();
        this.cargarTipos();
      }
    });
  }

  borrar(id: number) {
    if (!confirm('¿Seguro que quieres borrar este tipo? Se borrarán también sus pokémon.')) return;
    this.tipoService.borrarTipo(id).subscribe({
      next: () => this.cargarTipos()
    });
  }
}