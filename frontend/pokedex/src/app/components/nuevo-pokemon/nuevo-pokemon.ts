import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TipoService, Tipo } from '../../services/tipo';

@Component({
  selector: 'app-nuevo-pokemon',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <a routerLink="/" class="volver">← Volver</a>
    <h2>Añadir nuevo Pokémon</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="formulario">
      <div class="campo">
        <label for="nombre">Nombre del Pokémon *</label>
        <input id="nombre" type="text" formControlName="nombre" placeholder="Ej: Dragonite" />
        @if (form.get('nombre')?.invalid && form.get('nombre')?.touched) {
          <span class="error-campo">El nombre es obligatorio y debe tener al menos 3 caracteres.</span>
        }
      </div>

      <div class="campo">
        <label for="nivel">Nivel *</label>
        <input id="nivel" type="number" formControlName="nivel" placeholder="1 - 100" min="1" max="100" />
        @if (form.get('nivel')?.invalid && form.get('nivel')?.touched) {
          <span class="error-campo">El nivel debe estar entre 1 y 100.</span>
        }
      </div>

      <div class="campo">
        <label for="tipo">Tipo *</label>
        <select id="tipo" formControlName="tipoId">
          <option value="">-- Selecciona un tipo --</option>
          @for (tipo of tipos(); track tipo.id) {
            <option [value]="tipo.id">{{ tipo.nombre }}</option>
          }
        </select>
        @if (form.get('tipoId')?.invalid && form.get('tipoId')?.touched) {
          <span class="error-campo">Debes seleccionar un tipo.</span>
        }
      </div>

      @if (exito()) {
        <p class="exito">✓ Pokémon añadido correctamente. Redirigiendo...</p>
      }
      @if (errorServidor()) {
        <p class="error">{{ errorServidor() }}</p>
      }

      <div class="botones">
        <a routerLink="/" class="btn-cancelar">Cancelar</a>
        <button type="submit" [disabled]="form.invalid || enviando()" class="btn-enviar">
          {{ enviando() ? 'Guardando...' : 'Añadir Pokémon' }}
        </button>
      </div>
    </form>
  `,
  styles: [`
    .volver { display: inline-block; margin-bottom: 24px; color: #cc0000; text-decoration: none; }
    .formulario { max-width: 480px; }
    .campo { margin-bottom: 20px; display: flex; flex-direction: column; gap: 6px; }
    label { font-weight: 500; font-size: 14px; }
    input, select { padding: 10px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 15px; width: 100%; box-sizing: border-box; }
    input:focus, select:focus { outline: none; border-color: #cc0000; }
    .error-campo { color: #cc0000; font-size: 13px; }
    .exito { color: green; font-size: 14px; }
    .error { color: red; font-size: 14px; }
    .botones { display: flex; gap: 12px; margin-top: 24px; }
    .btn-cancelar { padding: 10px 20px; border: 1px solid #ccc; border-radius: 6px; text-decoration: none; color: #333; font-size: 14px; }
    .btn-enviar { padding: 10px 24px; background: #cc0000; color: white; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; }
    .btn-enviar:disabled { background: #aaa; cursor: not-allowed; }
  `]
})
export class NuevoPokemonComponent implements OnInit {

  form: FormGroup;
  tipos = signal<Tipo[]>([]);
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
      nivel: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      tipoId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.tipoService.getTipos().subscribe({
      next: (lista) => this.tipos.set(lista),
      error: () => this.errorServidor.set('No se pudieron cargar los tipos.')
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.enviando.set(true);
    this.errorServidor.set('');
    const payload = {
      nombre: this.form.value.nombre,
      nivel: this.form.value.nivel,
      tipo: { id: Number(this.form.value.tipoId) }
    };
    this.tipoService.crearPokemon(payload).subscribe({
      next: () => {
        this.exito.set(true);
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: () => {
        this.errorServidor.set('Error al añadir el pokémon. Inténtalo de nuevo.');
        this.enviando.set(false);
      }
    });
  }
}