import { Injectable } from '@angular/core';
import { User, Student, Menu, AcademicRecords, AcademicProgram, IBreadcrumb, TipoMenu } from "../app.models";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AuthInfo } from '../models/Auth/AuthInfo';
import { AlertService } from "./alert.service";
import { TranslateService } from '@ngx-translate/core';

//// Esta clase permite la comunicación entre los componentes.
@Injectable()
export class GlobalService {

  private _student: Subject<Student>
  private _academicRecord: Subject<AcademicRecords>
  private _breadcrumb: Subject<IBreadcrumb[]>
  private _menu: Subject<TipoMenu[]>
  public ready: boolean

  // Observables
  student$: Observable<Student>
  academicRecord$: Observable<AcademicRecords>
  breadcrumb$: Observable<IBreadcrumb[]>
  menu$: Observable<TipoMenu[]>

  user: User;
  menu: TipoMenu[];
  AutenticationStudentToken: string
  authInfo: AuthInfo


  private studenInfo: Student
  private academicRecordSelected: AcademicRecords

  constructor(
    private alertService: AlertService,
    private translate: TranslateService
  ) {
    this._student = new Subject<Student>();
    this.student$ = this._student.asObservable();

    this._academicRecord = new Subject<AcademicRecords>();
    this.academicRecord$ = this._academicRecord.asObservable();

    this._breadcrumb = new Subject<IBreadcrumb[]>();
    this.breadcrumb$ = this._breadcrumb.asObservable();

    this._menu = new Subject<TipoMenu[]>();
    this.menu$ = this._menu.asObservable();

    this.ready = true
  }

  set setStudent(newValue) {
    this._student.next(newValue);
    this.studenInfo = newValue
  }

  set setAcademicRecord(newValue) {
    this._academicRecord.next(newValue);
    this.academicRecordSelected = newValue
  }

  set setBreadcrumb(newValue) {
    this._breadcrumb.next(newValue)
  }

  set setMenu(newValue) {
    this._menu.next(newValue);
  }

  get getStudentInfo(): Student {
    return this.studenInfo
  }

  get getAcademicRecord() {
    return this.academicRecordSelected
  }


  /**
   * Método que registra errores de la aplicación.
   * 
   * @param {*} error Objeto con información del error.
   * @memberof GlobalService
   */
  public WriteError(error: any) {

    // Se registra el error.
    this.WriteLog(error)

    // Se muestra mensaje en pantalla.
    this.translate.get("MensajesTransversales.errorGeneral").subscribe(res => {
      this.alertService.error(res, 60);
    })

    // Se quita loader.
    this.ready = true
  }

  /**
   * 
   * Método que registra log según la información suministrada.
   * @param {*} thingToSave Objeto con información la cual desee guardar en el log.
   * @memberof GlobalService
   */
  public WriteLog(thingToSave: any) {
    var _navigator = {};
    for (var i in navigator) _navigator[i] = navigator[i];

    if (thingToSave != undefined) {
      let e: any = {
        Date: new Date().toUTCString(),
        Information: thingToSave,
        Navigator: JSON.stringify(_navigator),
        User: this.user,
        Location: location.href
      }
      console.log(e);
    }
  }

  // private newGuid() {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //     const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
  //     return v.toString(16);
  //   });
  // }
}