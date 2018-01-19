import { Component, OnInit, AfterContentInit } from '@angular/core';
import { UniversityService, AlertService, GlobalService } from "../../../app.services";
import { TranslateService } from '@ngx-translate/core';
import { University } from "../../../models/university";
import { List } from "linqts";
import { Enumerable } from "linqts";
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { createAotCompiler } from '@angular/compiler';

declare var fadeWhenChange: any
declare var hideWhenCancel: any
declare var llamarEventosMainJS: any

@Component({
  selector: 'app-university-management',
  templateUrl: './university-management.component.html',
  providers: [UniversityService]
})
export class UniversityManagementComponent implements OnInit, AfterContentInit {
  ngAfterContentInit(): void {
    llamarEventosMainJS()
  }

  public universities: University[]
  public uniOriginal: University[]
  public uniToCreate: University[]
  public uniToUpdate: University[]
  public valAdd: boolean = true
  public submitAttempt: boolean = false
  public paginaConError: boolean = false

  constructor(
    private universityService: UniversityService,
    private translate: TranslateService,
    private alertService: AlertService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.cargarInformacionUniversidades()
  }

  //// Método que me permite cargar la información de las universidades.
  cargarInformacionUniversidades() {

    this.globalService.ready = false
    this.universityService.getInfoAllUniversities().subscribe(res => {
      this.universities = res
      this.globalService.ready = true
      // Se realiza una copia de manera que la información original la tenga almacenada en memoria.
      let unis: string = JSON.stringify(res)
      this.uniOriginal = JSON.parse(unis)
    })
  }

  //// Método que me permite verificar que información se crea y que información se actualiza.
  guardarInformacion() {
    this.submitAttempt = true;
    if (this.validarInformacionCorrecta()) {
      this.valAdd = true
      let universidades = new List<University>(this.universities)
      let originales = new List<University>(this.uniOriginal);
      let diferentes = new List<University>()
      let nuevos = new List<University>()

      // Se validan los nuevos por el id.
      nuevos = universidades.Where(u => !originales.Any(o => o.id == u.id)).ToList();
      // Se validan los modificados consultando por id y validando las diferencias por code, name o status.
      diferentes = universidades.Where(u => originales.Any(x => u.id == x.id &&
        (x.code != u.code ||
          x.name != u.name ||
          x.status != u.status)))
        .ToList();

      let arraySaveInfo: Observable<Response>[] = []
      let create: Observable<Response>
      let update: Observable<Response>

      // Se guardan los nuevos.
      if (nuevos.Any()) {
        // Se envía el objeto tal como lo necesita el servicio.
        let toSave = nuevos.Select(n => JSON.parse("".concat(JSON.stringify({ name: n.name, code: n.code, status: n.status }))))
        create = this.crearUniversidad(toSave.ToArray())
        arraySaveInfo.push(create)
        this.translate.get("GestionUniversidades.MensajeGuardadoCorrecto").subscribe(res => {
          this.alertService.success(res)
        })
      }

      // Se actualizan los modificados.
      if (diferentes.Any()) {
        update = this.actualizarUniversidad(diferentes.ToArray())
        arraySaveInfo.push(update)
        this.translate.get("GestionUniversidades.MensajeActualizadoCorrecto").subscribe(res => {
          this.alertService.success(res)
        })
      }

      if (arraySaveInfo != undefined && arraySaveInfo.length > 0) {
        forkJoin(arraySaveInfo).subscribe(res => {
          this.universityService.getInfoAllUniversities().subscribe(res => {
            this.cancelar()
          })
        })
      }
    }
  }

  // Método que crea una nueva universidad.
  crearUniversidad(newUniversity: any): Observable<Response> {
    //let newUniversity: any = { "name": "La universidad x", "code": "zzzzzzzz", "status": "true" }
    return this.universityService.createUniversity(newUniversity)
  }

  // Método que actualiza la información de las universidades.
  actualizarUniversidad(universityToUpdate: University[]): Observable<Response> {
    return this.universityService.updateUniversity(universityToUpdate);
  }

  //// Método que devuelve los valores a su estado inicial.
  cancelar() {
    this.cargarInformacionUniversidades()
    hideWhenCancel()
    this.submitAttempt = false
    this.valAdd = true
  }

  // Método para agregar una nueva universidad.
  agregarRow() {
    this.universities.push(new University(null, "", "", null, null, true))
    this.valAdd = false
    this.cambioAlgo()
  }

  //// Cuando algo cambia.
  cambioAlgo() {
    fadeWhenChange();
  }

  // Método que no permite guardar a menos que se haya ingresado la información correctamente.
  validarInformacionCorrecta() {
    let univ = new List<University>(this.universities)
    return !(univ.Where(n => n.name == "" || n.code == "").Count() > 0)
  }
}
