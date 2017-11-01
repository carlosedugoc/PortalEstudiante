import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { University } from "../../models/university";
import { List } from "linqts";
import { Enumerable } from "linqts"; 


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

  constructor(private universityService: UniversityService
  ) {
  }

  ngOnInit() {
    this.cargarInformacionUniversidades()
  }

  //// Método que me permite verificar que información se crea y que información se actualiza.
  guardarInformacion() {
    debugger;
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
  }

  cargarInformacionUniversidades() {
    this.universityService.getInfoAllUniversities().subscribe(res => {
      this.universities = res
      // Se realiza una copia de manera que la información original la tenga almacenada en memoria.
      let unis: string = JSON.stringify(res)
      this.uniOriginal = JSON.parse(unis)
    })
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

  }
}
