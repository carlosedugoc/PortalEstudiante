import { RouterModule, Routes } from '@angular/router';
import { ServiceSettingsComponent } from "./components/administration/service-settings/service-settings.component";
import { DashboardComponent } from "./components/student/dashboard/dashboard.component";
import { CargaArchivosComponent } from "./components/administration/carga-archivos/carga-archivos.component";
import { UniversityManagementComponent } from "./components/administration/university-management/university-management.component";
import { AppComponent } from "./app.component";
import { StudentInfoComponent } from './components/student/student-info/student-info.component';
import { BannerIframeComponent } from "./components/student/banner-iframe/banner-iframe.component";
import { ModifyStudentInfoComponent } from "./components/student/student-info/modify-student-info/modify-student-info.component";
import { PageNotFoundComponent } from "./components/shared/page-not-found/page-not-found.component";
import { MainComponent } from "./components/administration/main/main.component";
import { PdfViewerComponent } from "./components/shared/pdf-viewer/pdf-viewer.component";
import { StudentRegulationComponent } from "./components/student/student-regulation/student-regulation.component";
import { MentionsAndPunishmentsComponent } from "./components/student/mentions-and-punishments/mentions-and-punishments.component";

const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'service-settings', component: ServiceSettingsComponent },
    { path: 'file-loading', component: CargaArchivosComponent },
    { path: 'univ-management', component: UniversityManagementComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'student-info', component: StudentInfoComponent },
    { path: 'modify-student-info', component: ModifyStudentInfoComponent },
    { path: 'banner/:id', component: BannerIframeComponent },
    { path: 'main', component: MainComponent },
    { path: 'pdf-viewer', component: PdfViewerComponent },
    { path: 'student-regulation', component: StudentRegulationComponent },
    { path: 'mentions-punishments', component: MentionsAndPunishmentsComponent },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'page-not-found' }
];

export const appRouting = RouterModule.forRoot(routes, { useHash: true });