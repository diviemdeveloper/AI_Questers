import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TipoService } from '../../services/tipo';

@Component({
  selector: 'app-nuevo-tipo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <a routerLink="/" class="volver">← Volver</a>
    <h2>Crear nuevo tipo</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="formulario">
      <div class="campo">
        <label for="nombre">Nombre del tipo *</label>
        <input id="nombre" type="text" formControlName="nombre" placeholder="Ej: Dragón" />
        @if (form.get('nombre')?.invalid && form.get('nombre')?.touched) {
          <span class="error-campo">El nombre es obligatorio y debe tener al menos 3 caracteres.</span>
        }
      </div>

      <div class="campo">
        <label for="color">Color representativo *</label>
        <div class="color-row">
          <input id="color" type="color" formControlName="color" />
          <span>{{ form.get('color')?.value }}</span>
        </div>
      </div>

      @if (exito()) {
        <p class="exito">✓ Tipo creado correctamente. Redirigiendo...</p>
      }
      @if (errorServidor()) {
        <p class="error">{{ errorServidor() }}</p>
      }

      <div class="botones">
        <a routerLink="/" class="btn-cancelar">Cancelar</a>
        <button type="submit" [disabled]="form.invalid || enviando()" class="btn-enviar">
          {{ enviando() ? 'Guardando...' : 'Crear tipo' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .volver { display: inline-block; margin-bottom: 24px; color: #cc0000; text-decoration: none; }
    .formulario { max-width: 480px; }
    .campo { margin-bottom: 20px; display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 500; font-size: 14px; }
    input[type="text"] { padding: 10px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 15px; width: 100%; box-sizing: border-box; }
    input[type="text"]:focus { outline: none; border-color: #cc0000; }
    .color-row { display: flex; align-items: center; gap: 12px; }
    input[type="color"] { width: 48px; height: 36px; border: none; cursor: pointer; }
    .error-campo { color: #cc0000; font-size: 13px; }
    .exito { color: green; font-size: 14px; }
    .error { color: red; font-size: 14px; }
    .botones { display: flex; gap: 12px; margin-top: 24px; }
    .btn-cancelar { padding: 10px 20px; border: 1px solid #ccc; border-radius: 6px; text-decoration: none; color: #333; font-size: 14px; }
    .btn-enviar { padding: 10px 24px; background: #cc0000; color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; }
    .btn-enviar:disabled { background: #aaa; cursor: not-allowed; }
  `]
})
export class NuevoTipoComponent {

  form: FormGroup;
  enviando = signal(false);
  exito = signal(false);
  errorServidor = signal('');

  constructor(
    private fb: FormBuilder,
    private tipoService: TipoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      color: ['#ff0000', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.enviando.set(true);
    this.errorServidor.set('');
    this.tipoService.crearTipo(this.form.value).subscribe({
      next: () => {
        this.exito.set(true);
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: () => {
        this.errorServidor.set('Error al crear el tipo. Inténtalo de nuevo.');
        this.enviando.set(false);
      }
    });
  }
}