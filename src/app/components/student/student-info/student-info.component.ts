import { Component, OnInit } from '@angular/core';
import { Enumerable, List } from 'linqts'
import { GlobalService, StudentService } from "../../../app.services";
import { ObservableInput } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { Student } from "../../../app.models";
@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html'
})
export class StudentInfoComponent implements OnInit {

  public student: any;
  public enrollDate
  public gender

  constructor(public globalService: GlobalService, private router: Router, private studentService: StudentService) {
    this.student = this.globalService.getStudentInfo
    console.log(this.student)
  }

  ngOnInit() {
    this.enrollDate = this.globalService.getAcademicRecord != undefined ? this.globalService.getAcademicRecord.enrollDate : ""

  }












}
