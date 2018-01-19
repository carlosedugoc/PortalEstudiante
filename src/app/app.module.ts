//MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwksValidationHandler, OAuthModule, ValidationHandler } from 'angular-oauth2-oidc';
import { HttpPEInterceptor } from "./services/shared/HttpPEInterceptor";
import { BaseProvider } from "./services/shared/Auth/Providers/base-provider";
import { GeneralUtils } from './shared/GeneralUtils';

//PIPES
import { CapitalizarPipe } from './pipes/capitalizar.pipe';
import { FiltroServiciosPipe } from './pipes/filtro-servicios.pipe';
import { FiltroFaltantesPipe } from './pipes/filtro-faltantes.pipe';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { FiltroMenuPipe } from './pipes/filtro-menu.pipe';
import { GetFileNameOfPathPipe } from './pipes/get-file-name-of-path.pipe';

//ROUTES
import { appRouting } from "./app.routes";
import { BASE_URL } from "./app.tokens";
import { APP_CONFIG, AppConfig } from './app.config';

//SERVICES
import { GlobalService } from "./app.services";
import { AppConfiguration } from "./app.configuration";
import { PagerService } from './services/pager.service';
import { AuthService } from "./services/shared/Auth/auth.service";
import { AlertService } from './services/alert.service';

//COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { ServiceSettingsComponent } from './components/administration/service-settings/service-settings.component';
import { DashboardComponent } from './components/student/dashboard/dashboard.component';
import { CargaArchivosComponent } from './components/administration/carga-archivos/carga-archivos.component';
import { UniversityManagementComponent } from './components/administration/university-management/university-management.component';
import { StudentInfoComponent } from './components/student/student-info/student-info.component';
import { BannerIframeComponent } from './components/student/banner-iframe/banner-iframe.component';
import { ModifyStudentInfoComponent } from './components/student/student-info/modify-student-info/modify-student-info.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { MainComponent } from './components/administration/main/main.component';
import { ServicesListComponent } from './components/administration/service-settings/services-list/services-list.component';
import { PagerComponent } from './components/shared/pager/pager.component';
import { PdfViewerComponent } from './components/shared/pdf-viewer/pdf-viewer.component';
import { StudentRegulationComponent } from './components/student/student-regulation/student-regulation.component';
import { MentionsAndPunishmentsComponent } from './components/student/mentions-and-punishments/mentions-and-punishments.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function initConfig(config: AppConfiguration) {
  return () => config.load()
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    CapitalizarPipe,
    DashboardComponent,
    FiltroServiciosPipe,
    FiltroFaltantesPipe,
    CargaArchivosComponent,
    UniversityManagementComponent,
    FiltroMenuPipe,
    GetFileNameOfPathPipe,
    StudentInfoComponent,
    BannerIframeComponent,
    DomseguroPipe,
    ModifyStudentInfoComponent,
    BreadcrumbComponent,
    PageNotFoundComponent,
    AlertComponent,
    MainComponent,
    ServiceSettingsComponent,
    ServicesListComponent,
    PagerComponent,
    PdfViewerComponent,
    StudentRegulationComponent,
    MentionsAndPunishmentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    appRouting,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    OAuthModule.forRoot()
  ],
  providers: [
    { provide: ValidationHandler, useClass: JwksValidationHandler },
    // { provide: BASE_URL, useValue: "https://hpg-keycloak.northeurope.cloudapp.azure.com:8443" },
    { provide: APP_CONFIG, useValue: AppConfig },
    GlobalService,
    AppConfiguration,
    AlertService,
    PagerService,
    AuthService,
    HttpPEInterceptor,
    BaseProvider,
    GeneralUtils,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfiguration],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
