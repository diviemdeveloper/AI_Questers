import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TipoService, Tipo, Pokemon } from '../../services/tipo';

@Component({
  selector: 'app-detalle-tipo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="volver">← Volver a tipos</a>

    @if (cargando()) {
      <p>Cargando...</p>
    }

    @if (tipo()) {
      <div class="cabecera" [style.border-color]="tipo()!.color">
        <div class="badge" [style.background]="tipo()!.color">
          {{ tipo()!.nombre }}
        </div>
        <h2>Pokémon de tipo {{ tipo()!.nombre }}</h2>
        <p>{{ pokemones().length }} pokémon encontrados</p>
      </div>

      <div class="lista">
        @for (p of pokemones(); track p.id) {
          <div class="pokemon-card">
            <span class="pokemon-id">#{{ p.id }}</span>
            <strong>{{ p.nombre }}</strong>
            <span class="nivel">Nivel {{ p.nivel }}</span>
          </div>
        }

        @if (pokemones().length === 0) {
          <p>No hay pokémon registrados para este tipo.</p>
        }
      </div>
    }

    @if (error()) {
      <p class="error">{{ error() }}</p>
    }
  `,
  styles: [`
    .volver { display: inline-block; margin-bottom: 24px; color: #cc0000; text-decoration: none; }
    .volver:hover { text-decoration: underline; }
    .cabecera { border-left: 6px solid; padding-left: 16px; margin-bottom: 24px; }
    .badge {
      display: inline-block;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 13px;
      margin-bottom: 8px;
    }
    .lista { display: flex; flex-direction: column; gap: 10px; }
    .pokemon-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 20px;
      border: 1px solid #eee;
      border-radius: 8px;
      background: white;
    }
    .pokemon-id { color: #aaa; font-size: 13px; min-width: 30px; }
    .nivel { margin-left: auto; color: #666; font-size: 13px; }
    .error { color: red; }
  `]
})
export class DetalleTipoComponent implements OnInit {

  tipo = signal<Tipo | null>(null);
  pokemones = signal<Pokemon[]>([]);
  cargando = signal(true);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private tipoService: TipoService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.tipoService.getTipoById(id).subscribe({
      next: (t) => {
        this.tipo.set(t);
        this.tipoService.tipoSeleccionado.set(t);
      },
      error: () => this.error.set('Tipo no encontrado.')
    });

    this.tipoService.getPokemonesByTipo(id).subscribe({
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
}