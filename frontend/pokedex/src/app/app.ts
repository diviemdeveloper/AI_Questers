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
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      border-bottom: 3px solid #cc0000;
      color: #333;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .navbar-brand { font-size: 22px; font-weight: bold; color: #cc0000; text-shadow: 1px 1px 0 white; letter-spacing: 1px; }
    .navbar-links a {
      color: #333;
      text-decoration: none;
      margin-left: 20px;
      font-size: 14px;
      padding: 6px 14px;
      border-radius: 20px;
      background: rgba(255,255,255,0.5);
      font-weight: 600;
      transition: background 0.2s;
    }
    .navbar-links a:hover { background: rgba(204, 0, 0, 0.2); }
    .container { max-width: 1000px; margin: 32px auto; padding: 0 16px; }
  `]
})
export class AppComponent {}