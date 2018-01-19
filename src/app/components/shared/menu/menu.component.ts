import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { Menu, User, Student, TipoMenu, AcademicRecords, IBreadcrumb } from "../../../app.models";
import { GlobalService, StudentService } from "../../../app.services";
import { TranslateService } from '@ngx-translate/core';
import { Enumerable, List } from "linqts";
import { ObservableInput } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { AlertService } from "../../../app.services";

declare var llamarEventosMainJS: any
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit, AfterContentInit {

  public loading: boolean
  public student: Student
  public academicRecordSelected: AcademicRecords
  public menus: TipoMenu[]
  public onlyOneProgram: boolean
  public nombrePadreActivo: string
  private nombreHome: string

  ngOnInit() {

  }

  ngAfterContentInit() {
    llamarEventosMainJS();
  }

  @Input('menu') menu: Menu[]
  @Input('perfil') perfil: Menu[]

  public user: User

  constructor(public globalService: GlobalService,
    private router: Router,
    private studentService: StudentService,
    private alertService: AlertService,
    private translate: TranslateService,
  ) {
    this.user = this.globalService.user
    if (this.user.rol != "1") {
      this.globalService.ready = false
      this.globalService.student$.subscribe((studentInfo: Student) => {
        debugger;
        this.configStudentInfo(studentInfo)
      })
    }

    //Aquí se determina si el menú cambia su icono activo si se seleccionó a travez del dashboard un elemento.
    this.globalService.breadcrumb$.subscribe((breadcrum) => {
      if (breadcrum.length > 0) {
        let algo = $('.seccionPadre.active').find("span")
        if (algo != undefined && algo[0] != undefined && algo[0].textContent != breadcrum[0].label) {
          $('.seccionPadre.active').removeClass('active');
        }
        this.nombrePadreActivo = breadcrum[0].label
      }
      else {
        this.nombrePadreActivo = this.nombrePadreActivo != this.nombreHome ? '' : this.nombreHome
      }
    })

    //// La primera vez la página principal se mantiene activa.
    this.translate.get("Menu.LabelPrincipal").subscribe(res => {
      this.nombreHome = res
      this.nombrePadreActivo = res
    })
  }

  /**
   * Método que configura la información del estudiante para siguientes procesos con dicha información.
   * 
   * @param {Student} studentInfo Información del estudiante ya verificado.
   * @memberof MenuComponent
   */
  configStudentInfo(studentInfo: Student) {
    this.student = studentInfo
    if (this.student != undefined && this.student.academicRecords != undefined && this.student.academicRecords[0] != undefined) {
      this.orderAcademicRecords();
      this.changeAcademicRecord(this.student.academicRecords[0].programId)
    }
    else {
      this.globalService.WriteLog("El estudiante no tiene programas académicos asociados.");
      this.alertService.warn("El estudiante no tiene programas académicos asociados. - Falta internacionalizar!", 30)
      this.globalService.ready = true
    }
  }

  /**
   * Ordenamiento de las carreras del estudiante
   * El ordenamiento tiene la siguiente relevancia:
   * Primero los de mayor avance y luego orden alfabético.
   * @memberof MenuComponent
   */
  orderAcademicRecords() {
    let acadRec = new List(this.student.academicRecords);
    acadRec = acadRec.Where(n => n.programStatus == 'ACTIVE').ToList();
    this.onlyOneProgram = acadRec.Count() == 1
    this.student.academicRecords = acadRec.OrderBy(n => n.programDescription).OrderByDescending(n => n.advancePercentaje).ToArray()
  }
  /**
   * Método que establece el programa académico escogido por el estudiante.
   * 
   * @param {string} idProgram id del programa académico seleccionado del estudiante.
   * @memberof MenuComponent
   */
  changeAcademicRecord(idProgram: string) {
    this.globalService.ready = false
    let acadRec = new List(this.student.academicRecords);
    this.academicRecordSelected = acadRec.Where(n => n.programId == idProgram).FirstOrDefault()

    this.goPrincipal()
    setTimeout(() => {// Se deja este timeout para que primero pueda hacer la redirección antes de llenar el objeto. :(
      this.globalService.setAcademicRecord = this.academicRecordSelected
    }, 0);
    this.getMenu()
  }

  /**
   * Método que redirige a Dashboard
   * 
   * @memberof MenuComponent
   */
  goPrincipal() {
    let breadcrumbs: IBreadcrumb[] = []
    this.globalService.setBreadcrumb = breadcrumbs
    if (this.router.url != "/dashboard" && this.user.rol == '2') {
      this.router.navigate(['/dashboard'])
    } else if (this.user.rol == '1') {
      this.router.navigate(['/main'])
    }
  }

  /**
   * Obtiene el menú con las opciones parametrizadas para los usuarios
   * 
   * @returns 
   * @memberof MenuComponent
   */
  getMenu() {
    const promise = new Promise((resolve, reject) => {
      this.globalService.menu = null
      // Se llena la infomación del user logueado.
      this.globalService.user.level = this.academicRecordSelected.levelId
      this.globalService.user.modality = this.academicRecordSelected.modality.replace("COP", "")
      this.globalService.user.userType = this.academicRecordSelected.studentType
      // this.globalService.user.modality = 'B'
      // this.globalService.user.userType = 'I'
      this.user = this.globalService.user

      this.studentService.getMenu(this.user).subscribe(menu => {
        console.log("menu consulta:", menu);
        this.globalService.setMenu = menu
        this.globalService.menu = menu
        this.globalService.ready = true
        resolve()
      })
    })
    return promise
  }

  goToService(padre: string, hijo: string, nieto: string, route: string, cssClass: string) {
    let breadcrumbs: IBreadcrumb[] = []
    let breadcrumb: IBreadcrumb = {
      label: padre,
      url: "",
      cssClass: cssClass.replace('nav', 'miga')
    }
    breadcrumbs.push(breadcrumb)

    if (hijo != "") {
      let breadcrumb: IBreadcrumb = {
        label: hijo,
        url: "",
        cssClass: cssClass.replace('nav', 'miga')
      }
      breadcrumbs.push(breadcrumb)
    }

    if (nieto != "") {
      let breadcrumb: IBreadcrumb = {
        label: nieto,
        url: "",
        cssClass: cssClass.replace('nav', 'miga')
      }
      breadcrumbs.push(breadcrumb)
    }

    this.globalService.setBreadcrumb = breadcrumbs
    this.router.navigate([`/${route}`])
  }

}


