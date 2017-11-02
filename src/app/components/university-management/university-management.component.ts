import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { University } from "../../models/university";
import { List } from "linqts";
import { Enumerable } from "linqts";
declare var fadeWhenChange: any
declare var hideWhenCancel: any

@Component({
  selector: 'app-university-management',
  templateUrl: './university-management.component.html',
  providers: [UniversityService]
})
export class UniversityManagementComponent implements OnInit {

  public universities: University[]
  public uniOriginal: University[]
  public uniToCreate: University[]
  public uniToUpdate: University[]
  public loading: boolean = false
  public submitAttempt: boolean = false
  public paginaConError: boolean = false

  constructor(private universityService: UniversityService
  ) {

  }

  ngOnInit() {
    this.cargarInformacionUniversidades()
  }

  //// Método que me permite cargar la información de las universidades.
  cargarInformacionUniversidades() {
    debugger;
    this.loading = true
    this.universityService.getInfoAllUniversities().subscribe(res => {
      debugger;
      this.loading = false
      this.universities = res
      // Se realiza una copia de manera que la información original la tenga almacenada en memoria.
      let unis: string = JSON.stringify(res)
      this.uniOriginal = JSON.parse(unis)
    })
  }

  //// Método que me permite verificar que información se crea y que información se actualiza.
  guardarInformacion() {
    this.submitAttempt = true;
    if (this.validarInformacionCorrecta()) {
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

      // Se guardan los nuevos.
      if (nuevos.Any()) {
        // Se envía el objeto tal como lo necesita el servicio.
        let toSave = nuevos.Select(n => JSON.parse("".concat(JSON.stringify({ name: n.name, code: n.code, status: n.status }))))
        this.crearUniversidad(toSave.ToArray())
      }

      // Se actualizan los modificados.
      if (diferentes.Any()) {
        this.actualizarUniversidad(diferentes.ToArray())
      }

      alert("Se actualizó la información correctamente.");
      this.universityService.getInfoAllUniversities().subscribe(res => {
        this.cancelar()
      })
    }
  }

  // Método que crea una nueva universidad.
  crearUniversidad(newUniversity: any) {
    //let newUniversity: any = { "name": "La universidad x", "code": "zzzzzzzz", "status": "true" }
    this.universityService.createUniversity(newUniversity).subscribe(res => console.log(res));
  }

  // Método que actualiza la información de las universidades.
  actualizarUniversidad(universityToUpdate: University[]) {
    this.universityService.updateUniversity(universityToUpdate).subscribe(res => console.log(res));
  }

  //// Método que devuelve los valores a su estado inicial.
  cancelar() {
    this.cargarInformacionUniversidades()
    hideWhenCancel()
    this.submitAttempt = false
  }

  // Método para agregar una nueva universidad.
  agregarRow() {
    this.universities.push(new University(null, "", "", null, null, true))
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
