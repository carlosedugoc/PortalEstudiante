import { Component, OnChanges, OnInit, AfterContentInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UniversityService, AlertService, GlobalService } from "../../../app.services";
import { User, University } from "../../../app.models";
import { List } from "linqts";
import { AppConfiguration } from "../../../app.configuration";
import { TranslateService } from '@ngx-translate/core';
import { String } from 'typescript-string-operations';

declare var llamarEventosMainJS: any

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css'],
  providers: [UniversityService]
})
export class CargaArchivosComponent implements OnChanges, OnInit, AfterContentInit {

  ngAfterContentInit() {
    setTimeout(() => {
      llamarEventosMainJS(); //// Función de js para validación de botones y alertas. Main.js      
    }, 1000);
  }

  public universidades: University[]
  public user: User
  public cargarArchivo: boolean // Me indica que estoy habilitado para cargar un archivo.
  public guardarArchivo: boolean // Me indica que ocurrió un cambio ya sea de archivo o el nombre de este.
  public tieneArchivo: boolean // Me indica que el control fileUpload tiene un archivo cargado.
  public tieneArchivoReal: Boolean // Me indica que la universidad ya tiene un archivo cargado.
  public nombreArchivo: string // Me indica el nombre del archivo
  public nombreArchivoSinSubir: string // Me indica el nombre del archivo que se selecciona a travé del fileUpload
  public estiloVisibleCargarArchivo: string; //Oculta la grilla de cargue a menos que se haya determinado una universidad.
  public url_Servicios_backend: any // Me indica las rutas de los servicios a consumir.
  public universidadReglamento: University //Me indica la información de la universidad consultada.
  public nuevoReglamento: University //Me indica las modificaciones de reglamento.
  public fileToUpload: any; // Me indica el archivo a cargar
  public validar: boolean // Me indica validación por el lado del cliente antes de guardar.

  public urlDescarga: string
  public fileNamePath: string


  constructor(private universityService: UniversityService,
    private http: Http, private config: AppConfiguration,
    private alertService: AlertService,
    private translate: TranslateService,
    private globalService: GlobalService
  ) {

  }

  ngOnInit() {

    this.cargarArchivo = true; //TODO: Se debe validar si tiene permisos para poder realizar el proceso.
    this.estiloVisibleCargarArchivo = "hidden";
    ////// Se consultan las reglas de validación para la pantalla

    this.cargarUniversidades();
    this.DatosInicio();
    this.validarUsuarioLogueado();
  }

  validarUsuarioLogueado() {
    this.user = JSON.parse(sessionStorage.getItem("user"))
    var usuario = this.user
    if (this.user.rol == '1' && this.user.university != '0') {
      this.globalService.ready = false
      this.cargarDatos(usuario.university)
    }
  }

  DatosInicio(): any {
    this.globalService.ready = true
    this.guardarArchivo = false
    this.tieneArchivo = false
    this.tieneArchivoReal = false
    this.validar = false
    this.universidadReglamento = null
    this.nuevoReglamento = null
    this.nombreArchivo = ""
    this.nombreArchivoSinSubir = ''

    this.eliminarArchivo()
    let nombreProbable: any = document.getElementsByClassName('inputCanChange')[0]
    if (nombreProbable != undefined) {
      nombreProbable.value = ""
    }
  }

  ngOnChanges(): void {

  }

  seleccionarArchivo(file: any) {
    let todoBien: boolean = true
    let msg = ""
    // Se valida la extensión del archivo y el peso del archivo.
    if (file != undefined) {
      let name: string = file[0].name
      let extension: string = name.split('.').pop();
      let _size = file[0].size / 1024 / 1024;

      // Validación de extensión de archivo y tamaño.
      if ((extension.toLowerCase() != this.config.getParamConfig('validaciones', 'tipoArchivo_CargaReglamento'))) {
        this.translate.get("GestionReglamentos.ValidarFormatoArchivo").subscribe(res => {
          this.alertService.info(res);
        });
        todoBien = false
      }

      if ((todoBien && _size > this.config.getParamConfig('validaciones', "tamanoArchivo_CargaReglamento"))) {
        this.translate.get("GestionReglamentos.ValidarTamanoArchivo").subscribe(res => {
          this.alertService.info(res);
        })

        todoBien = false
      }
    }

    if (todoBien) {
      this.fileToUpload = file;
      this.tieneArchivo = true;
      this.guardarArchivo = true;
      this.fileNamePath = this.nombreArchivoSinSubir = file[0].name
    }
    else {
      //alert(msg)
      this.eliminarArchivo();
    }
    let botoones: any = document.getElementsByClassName('boxButtonsCenter')[0]
    if (botoones != undefined) botoones.style.display = 'block'
  }

  //// Método que carga las universidades.
  async cargarUniversidades() {
    //// Se carga la información de las universidades consultadas.
    let res: any = this.universityService.getInfoAllUniversities();
    this.universityService.getInfoAllUniversities().subscribe(res => {
      //// Validación para mostrar solamente las universidades que estén habilitadas
      let lstUniv = new List<University>(res)
      this.universidades = lstUniv.Where(n => n.status == true).Select(n => n).ToArray()
    });
  }

  //// Aquí se cargan los datos del archivo de la universidad seleccionada
  cargarDatos(Iduniversidad: string) {
    if (!String.IsNullOrWhiteSpace(Iduniversidad)) {
      this.globalService.ready = false
      // 1. Se consulta la información de la universidad seleccionada.
      var respuesta = this.universityService.getInfoUniversity(Iduniversidad).subscribe(data => {

        if (data != undefined) {
          this.llenarDatosReglamento(data, Iduniversidad)
          this.globalService.ready = true
        }
      })

      this.estiloVisibleCargarArchivo = ""; //// Esto es para habilitar la carga del archivo
      // 3. Se inhabilitan los botones de guardado.
      this.guardarArchivo = false;
    }
    else {
      this.estiloVisibleCargarArchivo = "hidden";
    }
  }

  //// Método que llena los datos del reglamento
  llenarDatosReglamento(data: University, idUniversidad: string) {
    let botoones: any = document.getElementsByClassName('image-preview-clear')[0]
    if (botoones != undefined) botoones.style.display = 'inline-block'
    this.validar = false
    this.universidadReglamento = data;
    this.universidadReglamento.code = idUniversidad
    this.nuevoReglamento = this.universidadReglamento
    this.nombreArchivo = this.nombreArchivoSinSubir = this.universidadReglamento.regulationName

    let na: any = document.getElementsByClassName("inputCanChange")[0]
    if (na != undefined) na.value = this.nombreArchivo
    this.tieneArchivo = this.tieneArchivoReal = !(this.universidadReglamento.regulationUrl == null || this.universidadReglamento.regulationUrl === "")
    this.urlDescarga = this.tieneArchivo ? this.universityService.downloadRegulationUniversity(idUniversidad) : ""

    let botonCarga: any = document.getElementsByClassName("image-preview-input")[0]
    if (botonCarga != undefined) {
      botonCarga.style.display = !this.tieneArchivo ? '' : "inline-block"
    }

    let botonDescarga: any = document.getElementsByClassName("image-preview-input-2")[0]
    if (botonDescarga != undefined) {
      botonDescarga.style.display = !this.tieneArchivo ? '' : "inline-block"
    }

    this.fileNamePath = this.tieneArchivo ? this.universidadReglamento.regulationUrl : ""
    let archivo: any = document.getElementsByClassName("image-preview-filename")[0]
    if (archivo != undefined) archivo.value = this.fileNamePath.split('\\').pop().split('/').pop();
  }

  eliminarArchivo() {
    this.tieneArchivo = false;
    let eliminarArchivoDisco: boolean = this.tieneArchivo;
    this.fileNamePath = ""
    this.tieneArchivoReal = false
    this.guardarArchivo = true;

    let file: any = document.getElementsByClassName('image-preview-filename')[0]
    if (file != undefined) {
      file.value = "";
    }

    let fileInput: any = document.getElementsByClassName('inputFileCanChange')[0]
    if (fileInput != undefined) {
      fileInput.value = ""
    }

    let clear: any = document.getElementsByClassName('image-preview-clear')[0]
    if (clear != undefined) {
      clear.className = clear.className + ' hidden'
    }

    let upload: any = document.getElementsByClassName('image-preview-input')[0]
    if (upload != undefined) {
      upload.style.display = 'block'
    }

    let download: any = document.getElementsByClassName('image-preview-input-2')[0]
    if (download != undefined) download.className = download.className.replace('inlineBlock', '')

    let botoones: any = document.getElementsByClassName('boxButtonsCenter')[0]
    if (botoones != undefined) botoones.style.display = 'block'
  }

  //// Cancela la carga y deja los valores por defecto de la universidad.
  cancelarCarga() {
    let codigoUniversidad: string = this.universidadReglamento.code
    this.cargarDatos(codigoUniversidad)
  }

  //// Me indica cuando se modifica información de la caja de texto de nombre de archivo.
  modificarNombre(nombreArchivo: string) {
    if (this.nuevoReglamento == undefined) this.nuevoReglamento = this.universidadReglamento != undefined ? this.universidadReglamento : <University>{ code: "", id: "", name: "", regulationName: "", regulationUrl: "" }
    this.nuevoReglamento.regulationName = nombreArchivo
    this.guardarArchivo = nombreArchivo != this.universidadReglamento.regulationName || this.cargarArchivo
    let botoones: any = document.getElementsByClassName('boxButtonsCenter')[0]
    if (botoones != undefined) botoones.style.display = 'block'
  }
  //// Realiza el guardado de información.
  guardarDatos() {
    this.validar = true;
    if (this.validar && this.tieneArchivo) {
      this.universityService.updateRegulationUniversity(
        this.nuevoReglamento.code,
        this.nuevoReglamento.regulationName,
        this.fileToUpload).then(res => {

          this.translate.get("GestionReglamentos.MensajeGuardadoCorrecto").subscribe(res => {
            this.alertService.success(res);
          })

          this.universidadReglamento = this.nuevoReglamento;
          this.cargarDatos(this.universidadReglamento.code)
        })
    }
  }
}




