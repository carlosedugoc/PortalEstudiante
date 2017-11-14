//MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { FormsModule }   from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule } from 'angular-oauth2-oidc';

//PIPES
import { CapitalizarPipe } from './pipes/capitalizar.pipe';
import { FiltroServiciosPipe } from './pipes/filtro-servicios.pipe';
import { FiltroFaltantesPipe } from './pipes/filtro-faltantes.pipe';

//ROUTES
import { appRouting } from "./app.routes";
import {BASE_URL} from "./app.tokens";
import { APP_CONFIG, AppConfig } from './app.config';

//COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { ListaServiciosComponent } from './components/lista-servicios/lista-servicios.component';
import { EstudianteComponent } from './components/estudiante/estudiante.component';
import { CargaArchivosComponent } from './components/carga-archivos/carga-archivos.component';
import { UniversityManagementComponent } from './components/university-management/university-management.component';
import { FiltroMenuPipe } from './pipes/filtro-menu.pipe';
import { GetFileNameOfPathPipe } from './pipes/get-file-name-of-path.pipe';
import { LoginComponent } from './components/login/login.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    AdministracionComponent,
    CapitalizarPipe,
    EstudianteComponent,
    ListaServiciosComponent,
    FiltroServiciosPipe,
    FiltroFaltantesPipe,
    CargaArchivosComponent,
    UniversityManagementComponent,
    FiltroMenuPipe,
    GetFileNameOfPathPipe,
    LoginComponent
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
    { provide: BASE_URL, useValue: "https://hpg-keycloak.northeurope.cloudapp.azure.com:8443"},
    { provide: APP_CONFIG, useValue: AppConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
