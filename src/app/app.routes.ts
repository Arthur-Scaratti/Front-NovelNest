import { Routes } from '@angular/router';
import { ListnovelComponent } from './pages/listnovel-catalog/listnovel.component';
import { IndexnovelComponent } from './pages/indexnovel/indexnovel.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LibraryComponent } from './pages/library/library.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'library',
    component: LibraryComponent,
  },
  {
    path: 'home/:urlName',
    component: IndexnovelComponent,
  },
  {
    path: 'home/:urlName/chapters/:capNro',
    component: ChapterComponent,
    runGuardsAndResolvers: 'paramsChange',
  },
  {
    path: 'novels',
    component: ListnovelComponent,
  },
  {
    path: 'novels/:tag',
    component: ListnovelComponent,
  },
];
