import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <span class="navbar-brand">🔴 Pokédex AI Questers</span>
      <div class="navbar-links">
        <a routerLink="/">Tipos</a>
        <a routerLink="/nuevo-tipo">+ Nuevo Tipo</a>
        <a routerLink="/nuevo-pokemon">+ Nuevo Pokémon</a>
      </div>
    </nav>
    <main class="container">
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      background: #cc0000;
      color: white;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .navbar-brand { font-size: 20px; font-weight: bold; }
    .navbar-links a {
      color: white;
      text-decoration: none;
      margin-left: 20px;
      font-size: 14px;
    }
    .navbar-links a:hover { text-decoration: underline; }
    .container { max-width: 1000px; margin: 32px auto; padding: 0 16px; }
  `]
})
export class AppComponent {}