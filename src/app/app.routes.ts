import { Routes} from '@angular/router';
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
    data: { breadcrumb: 'Register'},
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { breadcrumb: 'Login'},
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'library',
    component: LibraryComponent,
    data: { breadcrumb: 'Library' },
  },
  {
    path: 'home/:urlName',
    component: IndexnovelComponent,
    data: { breadcrumb: (data: any) => `${data.novelName}` },
  },
  {
    path: 'home/:urlName/chapters/:capNro',
    component: ChapterComponent,
    runGuardsAndResolvers: 'paramsChange',
    data: { breadcrumb: (data: any) => `${data.capNro}` },
  },
  {
    path: 'novels',
    component: ListnovelComponent,
    data: { breadcrumb: 'Novels' },
  },
  {
    path: 'novels/:tag',
    component: ListnovelComponent,
    data: { breadcrumb: (data: any) => `${data.tag}` },
  },
];
