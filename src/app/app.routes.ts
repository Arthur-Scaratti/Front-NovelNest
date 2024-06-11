import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { 
    path: '', redirectTo: 'home', pathMatch: 'full' 
  },
  {
    path: 'refresh', redirectTo: '', pathMatch: 'full'
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((x) => x.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((x) => x.LoginComponent),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'library',
    loadComponent:() =>
      import('./pages/library/library.component').then((x) => x.LibraryComponent),
  },
  {
    path: 'home/:urlName',
    loadComponent: () =>
      import('./pages/indexnovel/indexnovel.component').then((x) => x.IndexnovelComponent),
  },
  {
    path: 'home/:urlName/chapters/:capNro',
    loadComponent: () =>
      import('./pages/chapter/chapter.component').then((x) => x.ChapterComponent),
    runGuardsAndResolvers: 'paramsChange',
  },
  {
    path: 'novels',
    loadComponent: () =>
      import('./pages/listnovel-catalog/listnovel.component').then((x) => x.ListnovelComponent),
  },
  {
    path: 'novels/:tag',
    loadComponent: () =>
      import('./pages/listnovel-catalog/listnovel.component').then((x) => x.ListnovelComponent),
  },
];
