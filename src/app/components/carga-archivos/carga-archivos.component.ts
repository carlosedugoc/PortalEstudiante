import { Component, OnChanges, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { UniversityService } from '../../services/university.service';
import { University } from "../../models/university";
import { GeneralUtils } from "../../shared/GeneralUtils";
import { User } from "../../models/user";
declare var inputFileClear: any

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css'],
  providers: [UniversityService]
})
export class CargaArchivosComponent implements OnChanges, OnInit {

  public loading: boolean
  public universidad: string
  public user: User
  public cargarArchivo: boolean // Me indica que estoy habilitado para cargar un archivo.
  public guardarArchivo: boolean // Me indica que ocurrió un cambio ya sea de archivo o el nombre de este.
  public tieneArchivo: boolean // Me indica que el control fileUpload tiene un archivo cargado.
  public tieneArchivoReal: Boolean // Me indica que la universidad ya tiene un archivo cargado.
  public nombreArchivo: string // Me indica el nombre del archivo
  public nombreArchivoSinSubir: string // Me indica el nombre del archivo que se selecciona a travé del fileUpload
  public estiloVisibleCargarArchivo: string; //Oculta la grilla de cargue a menos que se haya determinado una universidad.
  public url_Servicios_backend: any // Me indica las rutas de los servicios a consumir.
  public reglasValidaciones: any // Me indica las reglas de validaciones.
  public universidadReglamento: University //Me indica la información de la universidad consultada.
  public nuevoReglamento: University //Me indica las modificaciones de reglamento.
  public fileToUpload: any; // Me indica el archivo a cargar
  public validar: boolean // Me indica validación por el lado del cliente antes de guardar.
  public utilidades: GeneralUtils // Clase de utilidades
  public urlDescarga: string


  constructor(private universityService: UniversityService,
    private http: Http
  ) {
    this.utilidades = new GeneralUtils(http)
  }

  ngOnInit(): void {
    debugger;
    this.cargarArchivo = true; //TODO: Se debe validar si tiene permisos para poder realizar el proceso.
    this.estiloVisibleCargarArchivo = "hidden";
    ////// Se consultan las reglas de validación para la pantalla
    this.utilidades.getConfiguration('validaciones').subscribe(result => this.reglasValidaciones = result);
    this.cargarUniversidades();
    this.DatosInicio();
    this.validarUsuarioLogueado();
    setTimeout(function () {
      inputFileClear(); //// Función de js para validación de botones y alertas. Main.js
    }, 2000);
  }

  validarUsuarioLogueado() {
    debugger;
    this.user = JSON.parse(sessionStorage.getItem("user"))
    var usuario = this.user
    if (this.user.rol == '1' && this.user.university != '0') {
      this.loading = true;
      this.cargarDatos(usuario.university)
    }
  }

  DatosInicio(): any {
    this.loading = false
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
    debugger;
    let todoBien: boolean = false
    // Se valida la extensión del archivo y el peso del archivo.
    if (file != undefined) {
      let name: string = file[0].name
      let extension: string = name.split('.').pop();
      let _size = file[0].size / 1024 / 1024;

      // Validación de extensión de archivo y tamaño.
      todoBien = extension.toLowerCase() == this.reglasValidaciones.tipoArchivo_CargaReglamento && _size <= this.reglasValidaciones.tamanoArchivo_CargaReglamento
    }

    if (todoBien) {
      this.fileToUpload = file;
      this.tieneArchivo = true;
      this.guardarArchivo = true;
      this.nombreArchivoSinSubir = file[0].name
    }
    else {
      alert('Suba un archivo de tipo pdf y con un peso de hasta 4 MB')
      this.eliminarArchivo();
    }
    let botoones: any = document.getElementsByClassName('boxButtonsCenter')[0]
    if (botoones != undefined) botoones.style.display = 'block'
  }

  //// Método que carga las universidades.
  cargarUniversidades() {

  }

  //// Aquí se cargan los datos del archivo de la universidad seleccionada
  cargarDatos(Iduniversidad: string) {
    debugger;
    this.loading = true
    // 1. Se consulta la información de la universidad seleccionada.
    var respuesta = this.universityService.getInfoUniversity(Iduniversidad).subscribe(data => {
      debugger;
      if (data != undefined) {
        this.llenarDatosReglamento(data, Iduniversidad)
        this.loading = false
      }
    })

    this.estiloVisibleCargarArchivo = ""; //// Esto es para habilitar la carga del archivo
    // 3. Se inhabilitan los botones de guardado.
    this.guardarArchivo = false;
  }

  //// Método que llena los datos del reglamento
  llenarDatosReglamento(data: University, idUniversidad: string) {
    debugger;
    this.validar = false
    this.universidadReglamento = data;
    this.universidadReglamento.code = idUniversidad
    this.nombreArchivo = this.nombreArchivoSinSubir = this.universidadReglamento.regulationName
    this.tieneArchivo = this.tieneArchivoReal = !(this.universidadReglamento.regulationName == null || this.universidadReglamento.regulationName === "")
    this.urlDescarga = this.tieneArchivo ? this.universityService.downloadRegulationUniversity(idUniversidad) : ""
  }

  eliminarArchivo() {
    debugger;
    this.tieneArchivo = false;
    let eliminarArchivoDisco: boolean = this.tieneArchivo;
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
  }

  //// Cancela la carga y deja los valores por defecto de la universidad.
  cancelarCarga() {
    debugger;
    let codigoUniversidad: string = this.universidadReglamento.code
    this.cargarDatos(codigoUniversidad)
  }

  //// Me indica cuando se modifica información de la caja de texto de nombre de archivo.
  modificarNombre(nombreArchivo: string) {
    debugger;
    if (this.nuevoReglamento == undefined) this.nuevoReglamento = this.universidadReglamento != undefined ? this.universidadReglamento : <University>{ code: "", id: "", name: "", regulationName: "", regulationUrl: "" }

    this.nuevoReglamento.regulationName = nombreArchivo
    this.guardarArchivo = nombreArchivo != this.universidadReglamento.regulationName || this.cargarArchivo
    let botoones: any = document.getElementsByClassName('boxButtonsCenter')[0]
    if (botoones != undefined) botoones.style.display = 'block'
  }
  //// Realiza el guardado de información.
  guardarDatos() {
    debugger;
    this.validar = true;
    let postData = null// Put your form data variable. This is only example.
    //this.universityService.postWithFile("http://10.75.8.109/Services/api/University/1/Regulation/UploadFiles/ElMejorNombre", postData, this.fileToUpload)
    this.universityService.updateRegulationUniversity(
      this.nuevoReglamento.code,
      this.nuevoReglamento.regulationName,
      this.fileToUpload).then(res => {
        this.universidadReglamento = this.nuevoReglamento;
        this.cargarDatos(this.universidadReglamento.code)
      })


    // let urlGuardarDato = this.url_Servicios_backend.UrlUpdateReglamento //'http://10.75.8.109/PEServices/api/Universidad/Reglamento'

    // this.nuevoReglamento.UrlReglamento = 'https://www.tutorialspoint.com/angularjs/angularjs_tutorial.pdf'

    // // this.cargarArchivoService.updateReglamento(this.reglamento, urlGuardarDato).subscribe(data => {
    // //   console.log('Se guardó correctamente');
    // //   console.log(data);
    // //   this.reglamento = this.nuevoReglamento;
    // //   this.cargarDatos(this.reglamento.CodigoBanner)
    // // })
    // // Se realiza validación de tamaño de archivo.
  }
}




