import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../../services/university.service';
import { University } from "../../models/university";

@Component({
  selector: 'app-university-management',
  templateUrl: './university-management.component.html',
  providers: [UniversityService]
})
export class UniversityManagementComponent implements OnInit {

  public universities: University[]

  constructor(private universityService: UniversityService
  ) {
  }

  ngOnInit() {
  }

  cargarInformacionUniversidades() {
    this.universityService.getInfoAllUniversities().subscribe(res => this.universities = res)
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
}
