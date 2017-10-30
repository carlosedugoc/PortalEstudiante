//MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//PIPES
import { CapitalizarPipe } from './pipes/capitalizar.pipe';
import { FiltroServiciosPipe } from './pipes/filtro-servicios.pipe';
import { FiltroFaltantesPipe } from './pipes/filtro-faltantes.pipe';

//ROUTES
import { appRouting } from "./app.routes";

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
    UniversityManagementComponent
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
