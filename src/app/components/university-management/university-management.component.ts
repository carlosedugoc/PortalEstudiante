import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { University } from "../../models/university";
import { List } from 'linqts';

@Component({
  selector: 'app-university-management',
  templateUrl: './university-management.component.html',
  providers: [UniversityService]
})
export class UniversityManagementComponent implements OnInit {

  public universities: List<University> = new List<University>()
  public uniOriginal: List<University> = new List<University>()
  public uniToCreate: List<University> = new List<University>()
  public uniToUpdate: List<University> = new List<University>()

  constructor(private universityService: UniversityService
  ) {
  }

  ngOnInit() {
    this.cargarInformacionUniversidades()
  }

  //// Método que me permite verificar que información se crea y que información se actualiza.
  guardarInformacion() {
    debugger;
    let arr = new List<number>([1, 2, 3, 4, 5])
      .Where(x => x > 3)
      .Select(y => y * 2)
      .ToArray(); // > [8, 10]

    let diferents = new List<University>()
    diferents = this.uniOriginal.Except(this.universities).ToList()
  }

  cargarInformacionUniversidades() {
    this.universityService.getInfoAllUniversities().subscribe(res => {
      this.universities = res
      // Se realiza una copia de manera que la información original la tenga almacenada en memoria.
      let unis: string = JSON.stringify(res)
      this.uniOriginal = Object.create(JSON.parse(unis));
    })
  }

  crearUniversidad() {
    debugger;
    let newUniversity: any = { "name": "La universidad Z", "code": "zzzzzzzz", "status": "true" }
    this.universityService.createUniversity(newUniversity).subscribe(res => console.log(res));
  }


  actualizarUniversidad() {
    debugger;
    let universityToUpdate: University
    universityToUpdate = this.universities[3]
    universityToUpdate.name = "Nuevo nombre"
    universityToUpdate.status = !universityToUpdate.status
    this.universityService.updateUniversity(universityToUpdate).subscribe(res => console.log(res));
  }

  //// Método que devuelve los valores a su estado inicial.
  cancelar() {

  }
}
