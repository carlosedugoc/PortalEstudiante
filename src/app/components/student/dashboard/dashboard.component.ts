import { Component, AfterContentInit, OnInit } from '@angular/core';
import { User, Menu, TipoMenu, Student } from "../../../app.models";
import { StudentService, GlobalService } from "../../../app.services";
import { AcademicRecords } from '../../../models/Banner/Student/academic-records';
import { Router } from "@angular/router";
import { debug } from 'util';
import { IBreadcrumb } from "../../../models/ibreadcrumb";

declare var llamarEventosMainJS: any
declare var fixDashboard: any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterContentInit, OnInit {


  public user: User
  public dashboard: Menu[]
  public academicRecord: AcademicRecords
  public hasAcademicRecordChanges : boolean
  public loadConstructor = false;
  ngAfterContentInit() {
    llamarEventosMainJS();
  }

  constructor(private studentService: StudentService,
    private globalService: GlobalService, private router: Router) {
    this.user = globalService.user
    debugger;
    let si = this.globalService.getStudentInfo
    this.hasAcademicRecordChanges = si != undefined && si.academicRecords.length > 0
    this.globalService.academicRecord$.subscribe((academicRecord: AcademicRecords) => {
      this.dashboard = null
      this.configDashboard(academicRecord)
      this.loadConstructor = true;
    })
  }

  ngOnInit(): void {
    let breadcrumbs: IBreadcrumb[] = []
    this.globalService.setBreadcrumb = breadcrumbs
    if (this.hasAcademicRecordChanges && !this.loadConstructor) {
      this.getDashboard()
    }
  }

  /**
   * Método que configura la información del estudiante para obtener su información de Dashboad.
   * 
   * @param {AcademicRecords} academicRecord 
   * @memberof DashboardComponent
   */
  configDashboard(academicRecord: AcademicRecords) {
    this.academicRecord = academicRecord
    this.user.level = this.academicRecord.levelId
    this.user.modality = this.academicRecord.modality.replace('COP', '')
    this.user.userType = this.academicRecord.studentType
    this.getDashboard()
  }

  /**
   * Obtiene el menú del dashboard - landing-page
   * 
   * @memberof DashboardComponent
   */

  getDashboard() {
    this.dashboard = undefined
    if (this.globalService.menu) {
      this.dashboard = this.globalService.menu.find(x => x.id == 2)['options']
      this.globalService.ready = true
      setTimeout(() => { fixDashboard(); }, 5);
    } else {
      this.globalService.menu$.subscribe((menu: TipoMenu[]) => {
        this.dashboard = menu.find(item => item.id == 2).options
        this.globalService.ready = true
        setTimeout(() => { fixDashboard(); }, 5);
      })
    }
  }

  goToService(crumb: string, name:string, route:string, cssClass:string, origin:number) {
    let breadcrumbs: IBreadcrumb[] = []
    if (!crumb || crumb == '') {
      let breadcrumb: IBreadcrumb = {
        label: "PRINCIPAL",
        url: "",
        cssClass: 'migaOtros'
      }
      breadcrumbs.push(breadcrumb)
    } else if (crumb) {
      let items: string[]
      items = crumb.split('|')
      items.forEach((item) => {
        let breadcrumb: IBreadcrumb = {
          label: item,
          url: "",
          cssClass: cssClass.replace('md', 'miga')
        }
        breadcrumbs.push(breadcrumb)
      })
    }

    let breadcrumb: IBreadcrumb = {
      label: name,
      url: "",
      cssClass: ''
    }
    breadcrumbs.push(breadcrumb)
    this.globalService.setBreadcrumb = breadcrumbs
    
    if (origin == 2){
      sessionStorage.setItem('url',route)
      this.router.navigate(['/banner', name])
    } else {
      this.router.navigate([`/${route}`])
    }

  }

  goToBanner(url: string, name: string) {
    sessionStorage.setItem('url', url)
    this.router.navigate(['/banner', name])
  }

}
