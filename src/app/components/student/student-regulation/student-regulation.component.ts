import { Component } from '@angular/core';
import { UniversityService, GlobalService } from "../../../app.services";

@Component({
  selector: 'app-student-regulation',
  templateUrl: './student-regulation.component.html',
  providers: [UniversityService]
})
export class StudentRegulationComponent {
  public pdfSrc: string
  public urlDescarga: string

  constructor(private universityService: UniversityService,
    private globalService: GlobalService) {
    this.universityService.getInfoUniversity(globalService.user.university).subscribe(data => {
      this.pdfSrc = data.regulationUrl
    })
  }

}
