import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { TipoService, Tipo } from '../../services/tipo';

@Component({
  selector: 'app-lista-tipos',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  template: `
    <h2>Tipos de Pokémon</h2>
    <p class="subtitulo">Total: {{ totalTipos() }} tipos registrados</p>

    <div class="buscador">
      <input type="text" [(ngModel)]="busqueda" placeholder="🔍 Buscar tipo..." (input)="filtrar()" />
    </div>

    @if (cargando()) { <p>Cargando tipos...</p> }

    @if (mensaje()) {
      <div class="mensaje" [class.mensaje-error]="esError()" [class.mensaje-ok]="!esError()">
        {{ mensaje() }}
      </div>
    }

    <div class="grid">
      @for (tipo of tiposFiltrados(); track tipo.id) {
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

      @if (tiposFiltrados().length === 0 && !cargando()) {
        <p class="sin-resultados">No se encontraron tipos con "{{ busqueda }}"</p>
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

    @if (mostrarConfirm()) {
      <div class="modal-overlay">
        <div class="modal modal-confirm">
          <h3>⚠️ ¿Estás seguro?</h3>
          <p>Se borrará el tipo y todos sus pokémon asociados.</p>
          <div class="botones">
            <button class="btn-cancelar" (click)="cancelarBorrado()">Cancelar</button>
            <button class="btn-borrar-confirm" (click)="confirmarBorrado()">Sí, borrar</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    h2 { margin-bottom: 4px; color: #333; font-size: 26px; text-shadow: 1px 1px 0 white; }
    .subtitulo { color: #555; margin-bottom: 16px; font-weight: 600; text-shadow: 0 1px 2px white; }
    .buscador { margin-bottom: 24px; }
    .buscador input {
      width: 100%;
      max-width: 400px;
      padding: 10px 16px;
      border: 2px solid rgba(0,0,0,0.15);
      border-radius: 20px;
      font-size: 15px;
      background: rgba(255,255,230,0.9);
      box-shadow: 2px 4px 8px rgba(0,0,0,0.15);
    }
    .buscador input:focus { outline: none; border-color: #cc0000; }
    .mensaje {
      padding: 12px 20px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-weight: 600;
      font-size: 14px;
    }
    .mensaje-ok { background: rgba(200,255,200,0.9); color: #2a7a2a; border: 2px solid #2a7a2a; }
    .mensaje-error { background: rgba(255,200,200,0.9); color: #cc0000; border: 2px solid #cc0000; }
    .sin-resultados { color: #555; font-weight: 600; text-shadow: 0 1px 2px white; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
    .card { border-radius: 12px; border: 2px solid rgba(0,0,0,0.15); border-left: 6px solid #ccc; background: rgba(255,255,230,0.85); backdrop-filter: blur(4px); transition: box-shadow 0.2s, transform 0.2s; box-shadow: 2px 4px 8px rgba(0,0,0,0.2); }
    .card:hover { box-shadow: 4px 8px 20px rgba(0,0,0,0.3); transform: translateY(-3px); }
    .card-body { padding: 16px; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .badge { color: white; padding: 4px 10px; border-radius: 20px; font-size: 13px; font-weight: bold; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
    .acciones { display: flex; gap: 6px; }
    .btn-editar, .btn-borrar { background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px; border-radius: 4px; }
    .btn-editar:hover { background: rgba(0,0,0,0.08); }
    .btn-borrar:hover { background: rgba(204,0,0,0.15); }
    .ver-mas { font-size: 13px; color: #666; text-decoration: none; font-weight: 600; }
    .ver-mas:hover { color: #cc0000; }
    .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
    .modal { background: #fffff0; border: 2px solid rgba(0,0,0,0.15); border-radius: 12px; padding: 24px; width: 400px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
    .modal-confirm p { color: #555; margin-bottom: 8px; }
    .modal h3 { margin-bottom: 20px; color: #333; }
    .campo { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 600; font-size: 14px; color: #555; }
    input[type="text"] { padding: 10px 12px; border: 2px solid #ddd; border-radius: 6px; font-size: 15px; background: white; color: #333; }
    input[type="text"]:focus { outline: none; border-color: #cc0000; }
    .color-row { display: flex; align-items: center; gap: 12px; }
    input[type="color"] { width: 48px; height: 36px; border: none; cursor: pointer; }
    .botones { display: flex; gap: 12px; margin-top: 20px; }
    .btn-cancelar { padding: 10px 20px; border: 2px solid #ddd; border-radius: 20px; background: white; color: #333; cursor: pointer; font-weight: 600; }
    .btn-enviar { padding: 10px 24px; background: #cc0000; color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: 600; }
    .btn-enviar:disabled { background: #aaa; }
    .btn-borrar-confirm { padding: 10px 24px; background: #cc0000; color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: 600; }
  `]
})
export class ListaTiposComponent implements OnInit {

  tipos = signal<Tipo[]>([]);
  tiposFiltrados = signal<Tipo[]>([]);
  cargando = signal(true);
  totalTipos = signal(0);
  editando = signal<Tipo | null>(null);
  mensaje = signal('');
  esError = signal(false);
  mostrarConfirm = signal(false);
  idParaBorrar = signal<number | null>(null);
  busqueda = '';
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
        this.tiposFiltrados.set(datos);
        this.totalTipos.set(datos.length);
        this.cargando.set(false);
      },
      error: () => {
        this.mostrarMensaje('Error al cargar los tipos. ¿Está arrancado el backend?', true);
        this.cargando.set(false);
      }
    });
  }

  filtrar() {
    const texto = this.busqueda.toLowerCase();
    this.tiposFiltrados.set(
      this.tipos().filter(t => t.nombre.toLowerCase().includes(texto))
    );
  }

  mostrarMensaje(texto: string, error: boolean) {
    this.mensaje.set(texto);
    this.esError.set(error);
    setTimeout(() => this.mensaje.set(''), 3000);
  }

  abrirEdicion(tipo: Tipo) {
    this.editando.set(tipo);
    this.formEdicion.setValue({ nombre: tipo.nombre, color: tipo.color });
  }

  cerrarEdicion() { this.editando.set(null); }

  guardarEdicion() {
    if (this.formEdicion.invalid || !this.editando()) return;
    this.tipoService.editarTipo(this.editando()!.id, this.formEdicion.value).subscribe({
      next: () => {
        this.cerrarEdicion();
        this.cargarTipos();
        this.mostrarMensaje('✓ Tipo actualizado correctamente', false);
      },
      error: () => this.mostrarMensaje('Error al actualizar el tipo', true)
    });
  }

  borrar(id: number) {
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
    this.tipoService.borrarTipo(id).subscribe({
      next: () => {
        this.mostrarConfirm.set(false);
        this.idParaBorrar.set(null);
        this.cargarTipos();
        this.mostrarMensaje('✓ Tipo borrado correctamente', false);
      },
      error: () => {
        this.mostrarConfirm.set(false);
        this.mostrarMensaje('Error al borrar el tipo', true);
      }
    });
  }
}