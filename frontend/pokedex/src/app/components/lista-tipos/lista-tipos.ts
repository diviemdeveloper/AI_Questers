import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TipoService, Tipo } from '../../services/tipo';

@Component({
  selector: 'app-lista-tipos',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Tipos de Pokémon</h2>
    <p class="subtitulo">Total: {{ totalTipos() }} tipos registrados</p>

    @if (cargando()) {
      <p>Cargando tipos...</p>
    }

    @if (error()) {
      <p class="error">{{ error() }}</p>
    }

    <div class="grid">
      @for (tipo of tipos(); track tipo.id) {
        <a class="card" [routerLink]="['/tipo', tipo.id]"
           [style.border-left-color]="tipo.color">
          <div class="card-color" [style.background]="tipo.color"></div>
          <div class="card-body">
            <h3>{{ tipo.nombre }}</h3>
            <span class="ver-mas">Ver pokémon →</span>
          </div>
        </a>
      }
    </div>
  `,
  styles: [`
    h2 { margin-bottom: 4px; }
    .subtitulo { color: #666; margin-bottom: 24px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    .card {
      display: flex;
      border-radius: 10px;
      border: 1px solid #ddd;
      border-left: 6px solid #ccc;
      text-decoration: none;
      color: inherit;
      overflow: hidden;
      transition: box-shadow 0.2s;
      background: white;
    }
    .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    .card-color { width: 8px; flex-shrink: 0; }
    .card-body { padding: 16px; }
    .card-body h3 { margin: 0 0 8px; font-size: 18px; }
    .ver-mas { font-size: 13px; color: #888; }
    .error { color: red; }
  `]
})
export class ListaTiposComponent implements OnInit {

  tipos = signal<Tipo[]>([]);
  cargando = signal(true);
  error = signal('');
  totalTipos = signal(0);

  constructor(private tipoService: TipoService) {}

  ngOnInit() {
    this.tipoService.getTipos().subscribe({
      next: (datos) => {
        this.tipos.set(datos);
        this.totalTipos.set(datos.length);
        this.tipoService.totalTipos.set(datos.length);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('Error al cargar los tipos. ¿Está arrancado el backend?');
        this.cargando.set(false);
      }
    });
  }
}