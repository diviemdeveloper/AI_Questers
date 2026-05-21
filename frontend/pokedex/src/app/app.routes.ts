import { Routes } from '@angular/router';
import { ListaTiposComponent } from './components/lista-tipos/lista-tipos';
import { DetalleTipoComponent } from './components/detalle-tipo/detalle-tipo';
import { NuevoTipoComponent } from './components/nuevo-tipo/nuevo-tipo';
import { NuevoPokemonComponent } from './components/nuevo-pokemon/nuevo-pokemon';

export const routes: Routes = [
  { path: '', component: ListaTiposComponent },
  { path: 'tipo/:id', component: DetalleTipoComponent },
  { path: 'nuevo-tipo', component: NuevoTipoComponent },
  { path: 'nuevo-pokemon', component: NuevoPokemonComponent },
  { path: '**', redirectTo: '' }
];