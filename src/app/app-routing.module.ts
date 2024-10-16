import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },*/
  
  // Rota coringa para capturar qualquer rota inválida
  {
    path: '**',
    redirectTo: '',  // Redireciona para a página inicial ou qualquer outra página
    pathMatch: 'full'
  },
  {
    path: '', 
    pathMatch: 'full',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClientePageModule)
  },
 /* {
    path: 'grafico',
    loadChildren: () => import('./grafico/grafico.module').then( m => m.GraficoPageModule)
  },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
