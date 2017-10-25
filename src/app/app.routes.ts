import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from "./components/administracion/administracion.component";
import { EstudianteComponent } from "./components/estudiante/estudiante.component";

const routes: Routes = [
    { path: '', component: AdministracionComponent },
    { path: 'administracion', component: AdministracionComponent },
    { path: 'estudiante', component: EstudianteComponent },
    { path: '**', pathMatch:'full', redirectTo: '' }
];

export const appRouting = RouterModule.forRoot(routes);