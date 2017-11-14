import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from "./components/administracion/administracion.component";
import { EstudianteComponent } from "./components/estudiante/estudiante.component";
import { CargaArchivosComponent  } from "./components/carga-archivos/carga-archivos.component";
import { UniversityManagementComponent } from "./components/university-management/university-management.component";

const routes: Routes = [
    { path: '', component: AdministracionComponent },
    { path: 'administration', component: AdministracionComponent },
    { path: 'file-loading', component: CargaArchivosComponent },
    { path: 'univ-management', component: UniversityManagementComponent },
    { path: 'student', component: EstudianteComponent },
    { path: '**', pathMatch:'full', redirectTo: '' }
];

export const appRouting = RouterModule.forRoot(routes,{ useHash: true });