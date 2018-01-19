import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//SERVICES
import { AdministracionService } from "../../../services/administracion.service";
import { BannerService } from "../../../services/banner.service";
import { GlobalService } from "../../../services/global.service";
import { AlertService } from "../../../services/alert.service";
import { AppConfiguration } from "../../../app.configuration";
//MODELS
import { Servicio, Item, UrlServicios, User } from "../../../app.models";
import { Status, Level, Modality } from "../../../app.models";
//CROSS-CUTTING
import { GeneralUtils } from "../../../shared/GeneralUtils";
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { List } from 'linqts';
import { Services } from '@angular/core/src/view';
import { TranslateService } from '@ngx-translate/core';
import { Universities } from '../../../shared/enumerators.enum';

declare var llamarEventosMainJS: any

@Component({
  selector: 'app-service-settings',
  templateUrl: './service-settings.component.html',
  providers: [AdministracionService, BannerService]
})
export class ServiceSettingsComponent implements AfterContentInit, OnDestroy {

  ngOnDestroy(): void {
    clearInterval(this.idIntervalAccesToken)
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      llamarEventosMainJS();
    }, 1000);
  }

  public servicios: Servicio[]
  public modality: Modality[] = []
  public levels: Level[] = []
  public status: Status[] = []
  public token;
  public errorMessage: string
  public total_modalidades: number
  public total_niveles: number
  public total_estados: number
  public show_table: boolean
  public rol: string
  public tipos: any[]
  public faltantes: any[]
  public faltantesMensaje: any[]
  public eliminados: any[]
  public user: User
  public idUser: string
  public serv: boolean = false
  public tabs: Servicio[]
  public service: Servicio
  public cancel: boolean
  public newStatus: boolean

  private idIntervalAccesToken
  private isValidToken: boolean

  private myInterval
  constructor(private adminService: AdministracionService,
    private bannerService: BannerService,
    private http: Http,
    private globalService: GlobalService,
    private config: AppConfiguration,
    private alertService: AlertService,
    private translate: TranslateService) {
    this.globalService.ready = true
    this.show_table = false
    this.user = this.globalService.authInfo.user
    this.user.university = this.user.universidadDelUsuario.toString()
    this.user.rol = this.user.rolDelusuario.toString()
    if (this.user.rol == '1') {
      this.load_data(this.user.university)
    }
  }

  /**
   * Método para consultar los datos a cargar en la pantalla
   * 
   * @param {string} IdUniversidad  Código de la universidad
   * @memberof ServiceSettingsComponent
   */
  load_data(IdUniversidad: string) {
    this.serv = false
    this.eliminados = []
    this.faltantesMensaje = []
    if (IdUniversidad == '0') {
      this.show_table = false
      return
    }
    this.globalService.ready = false
    //this.getToken().then(() => {
    this.getInfo(IdUniversidad).then(() => {
      this.globalService.ready = true
    }).catch((err) => {
      if (err.status == 401) {
        this.isValidToken = false
        this.load_data(IdUniversidad)
      } else {
        this.show_table = false
        this.globalService.ready = true
        this.alertService.error(`Se ha producido un error de conexión - Error: ${err.json()}`)
        console.log(err)
      }
    })
    // }).catch((error) => {
    //   this.show_table = false
    //   this.globalService.ready = true
    //   console.error(error)
    // })
  }

  /**
   * Método para consultar los servicios a mostrar en la grilla
   * 
   * @param {String} IdUniversidad Número de identificación de la universidad
   * @returns 
   * @memberof ServiceSettingsComponent
   */
  getServicios(IdUniversidad: String) {
    const promesa = new Promise((resolve, reject) => {
      this.servicios = []
      this.adminService.getServicios(IdUniversidad, this.config.getParamConfig('servicios', 'UrlApiRest')).subscribe(data => {
        this.servicios = data
        this.serv = false
        if (this.servicios.length == 0) { this.serv = true }
        resolve()
      }, error => {
        reject(error)
      })
    })
    return promesa
  }


  /**
   * Método para setear los objetos de modalidad, tipo y estado
   * 
   * @memberof ServiceSettingsComponent
   */
  setTypes() {
    this.tipos = []
    for (let mod of this.modality) {
      this.tipos.push({
        id_item: mod.modalityId,
        description: mod.description,
        tipo: 'Modalidad',
        id_tipo: 1
      })
    }

    for (let lev of this.levels) {
      this.tipos.push({
        id_item: lev.levelId,
        description: lev.description,
        tipo: 'Nivel',
        id_tipo: 2
      })
    }

    for (let sta of this.status) {
      this.tipos.push({
        id_item: sta.statusId,
        description: sta.description,
        tipo: 'Estado',
        id_tipo: 3
      })
    }
  }

  /**
   * Método para obtener las categorias faltantes para agregarlas y mostrarlas al usuario
   * 
   * @param {String} IdUniversidad Número de identificación de la universidad
   * @memberof ServiceSettingsComponent
   */
  procInfo(IdUniversidad: String) {

    this.setTypes()

    this.faltantes = []
    this.eliminados = []
    let encontrado: boolean = false

    for (let servicio of this.servicios) {
      for (let item of servicio.data) {
        encontrado = false
        for (let tipo of this.tipos) {
          if (item.itemCode.toUpperCase() == tipo.id_item.toUpperCase()) {
            encontrado = true
            break
          }
        }
        if (!encontrado) {
          this.eliminados.push(item)
        }
      }
      break
    }

    let serviceIndex = 0
    for (let servicio of this.servicios) {
      let itemsOrdenados: Item[] = []
      for (let tipo of this.tipos) {
        encontrado = false
        for (let item of servicio.data) {
          if (item.itemCode.toUpperCase() == tipo.id_item.toUpperCase()) {
            itemsOrdenados.push(item)
            encontrado = true
            break
          }
        }
        if (!encontrado) {
          this.faltantes.push({
            serviceTypeId: tipo.id_tipo,
            itemName: tipo.description,
            itemCode: tipo.id_item,
            universityCode: IdUniversidad
          })
        }
      }
      if (this.faltantes.length > 0) {
        this.saveItems(this.faltantes, IdUniversidad)
        console.log('faltantes', this.faltantes)
        return
      } else {
        servicio.data = itemsOrdenados
      }
      serviceIndex++
      if (this.servicios.length == serviceIndex) {
        if (this.eliminados.length > 0 || (this.faltantesMensaje && this.faltantesMensaje.length > 0)) {
          document.getElementById('openModalButton').click()
        }
        this.show_table = true
        this.globalService.ready = true
      }
    }

  }


  /**
   * Método para obtener la información a mostrar en la grilla
   * 
   * @param {string} IdUniversidad 
   * @returns 
   * @memberof ServiceSettingsComponent
   */
  getInfo(IdUniversidad: string) {
    const promesa = new Promise((resolve, reject) => {
      let modalities = this.bannerService.getTitulos(this.config.getParamConfig('servicios', 'ServicioModalidad'), IdUniversidad)
      let levels = this.bannerService.getTitulos(this.config.getParamConfig('servicios', 'ServicioNivel'), IdUniversidad)
      let status = this.bannerService.getTitulos(this.config.getParamConfig('servicios', 'ServicioEstado'), IdUniversidad)
      let services = this.adminService.getServicios(IdUniversidad, this.config.getParamConfig('servicios', 'UrlApiRest'))
      forkJoin([modalities, levels, status, services]).subscribe(results => {
        this.setModalities(results[0])
        this.setLevels(results[1])
        this.setStatus(results[2])
        this.setServices(results[3])
        this.getTabs()
        this.procInfo(IdUniversidad)
        resolve()
      }, error => {
        reject(error)
      })
    })
    return promesa
  }

  /**
   * Método para setear los servicios
   * 
   * @param {*} services 
   * @memberof ServiceSettingsComponent
   */
  setServices(services: any) {
    this.servicios = []
    this.servicios = services
    this.serv = false
    if (this.user.university != '0') {
      this.servicios = this.servicios.filter(servicio => servicio.offered)
      let services: Servicio[] = this.servicios.filter(servicio => servicio.modified)
      for (let srv of services) {
        this.translate.get("Administracion.MensajeArchivoHabilitado").subscribe(res => {
          this.alertService.info(res.replace('{SERVICIO}', srv.name));
        })
      }
      if (services.length > 0) {
        this.updateModified(this.user.university, this.config.getParamConfig('servicios', 'UrlApiRest'))
      }
    }
    if (this.servicios.length == 0) { this.serv = true }
  }

  updateModified(idUniversity: string, url: string) {
    this.adminService.updateModified({ id: idUniversity }, url).subscribe(data => {
      console.log('Servicio actualizado con éxito')
    })
  }


  /**
   * Método para obtener los niveles de los servicios de las universidades
   * 
   * @param {*} niveles 
   * @memberof ServiceSettingsComponent
   */
  setLevels(niveles: any) {
    this.levels = []
    this.total_niveles = 0
    this.levels = niveles.json()
    this.total_niveles = this.levels.length
  }

  /**
   * Método para obtener las modalidades de los servicios de las universidades
   * 
   * @param {*} modalidades 
   * @memberof ServiceSettingsComponent
   */
  setModalities(modalidades: any) {
    this.modality = []
    this.total_modalidades = 0
    this.modality = modalidades.json()
    this.total_modalidades = this.modality.length
  }


  /**
   * Método para obtener los estados de los servicios de las universidades
   * 
   * @param {*} estados 
   * @memberof ServiceSettingsComponent
   */
  setStatus(estados: any) {
    this.status = []
    this.total_estados = 0
    this.status = estados.json()
    this.status.push({
      statusId: 'AC',
      description: 'Acudiente',
      statusType: ""
    })
    this.total_estados = this.status.length
  }

  // /**
  //  * Método para obtener el token para consumir los servicios de las universidades
  //  * 
  //  * @returns 
  //  * @memberof ServiceSettingsComponent
  //  */
  // getToken() {
  //   const promesa = new Promise((resolve, reject) => {
  //     if (!this.isValidToken) {
  //       this.bannerService.getToken().subscribe(response => {
  //         this.token = response['access_token']
  //         if (this.token.length <= 0) {
  //           alert("El token no se ha generado correctamente");
  //         } else {
  //           this.isValidToken = true
  //           let expires_in = response["expires_in"];
  //           if (expires_in > 0) {
  //             clearInterval(this.idIntervalAccesToken)
  //             this.idIntervalAccesToken = setInterval(() => {
  //               this.isValidToken = false
  //             }, expires_in * 1000);//Segundos.
  //           }
  //           resolve(this.token)
  //         }
  //       }, error => {
  //         let errorMessage = <any>error;
  //         if (errorMessage != null) {
  //           this.errorMessage = error.error_description
  //           console.log(this.errorMessage);
  //           reject(new Error(this.errorMessage))
  //         }
  //       })
  //     } else {
  //       resolve(this.token)
  //     }

  //   })
  //   return promesa
  // }


  /**
   * Método para guardar los registros de las categorías para la universidad dada
   * 
   * @param {any[]} faltantes 
   * @param {any} IdUniversidad 
   * @memberof ServiceSettingsComponent
   */
  saveItems(faltantes: any[], IdUniversidad) {
    this.faltantesMensaje = faltantes
    this.adminService.saveItems(faltantes, this.config.getParamConfig('servicios', 'UrlApiRest')).subscribe(data => {
      this.getServicios(IdUniversidad).then(() => {
        this.procInfo(IdUniversidad)
      })
    })

  }

  /**
   * Método para obtener los titulos de las pestañas que se mostrarán en la administración de servicios
   * 
   * @memberof ServiceSettingsComponent
   */
  getTabs() {
    let lstTabs: List<Servicio> = new List(this.servicios)
    this.tabs = lstTabs.DistinctBy(tab => tab.categoryName).ToArray()
    console.log('result', this.tabs)
  }

  /**
   * Método para ofertar o desofertar un servicio
   * 
   * @memberof ServiceSettingsComponent
   */
  updateOffered() {
    this.updateService(this.service.id, 'Offered', this.service.offered)
    this.service.status = false
    for (let item of this.service.data) {
      item.status = false
      this.updateItem(item.id, false)
    }
  }

  /**
   * Método para ofertar un servicio
   * 
   * @param {Servicio} service 
   * @memberof ServiceSettingsComponent
   */
  setService(service: Servicio) {
    this.service = service
    this.newStatus = service.offered
    if (this.newStatus) {
      this.updateOffered()
    }
  }
  /**
   * Método para actualizar el estado de un item dado de algun servicio
   * 
   * @param {number} id Número de identificación del item a actualizar
   * @param {boolean} estado Estado al que se quiere actualizar el item
   * @memberof ServiceSettingsComponent
   */
  updateItem(id: number, estado: boolean) {
    this.adminService.actualizaItem({ id: id, status: estado }, this.config.getParamConfig('servicios', 'UrlApiRest')).subscribe(data => {
      console.log('Item actualizado con éxito')
    })
  }

  /**
   * Método para actualizar un servicio dado
   * 
   * @param {number} idServicio Número de identificación del servicio a actualizar
   * @param {string} campo Nombre del campo a actualizar
   * @param {*} valor Valor por el que se va a actualizar el campo dado
   * @memberof ServiceSettingsComponent
   */
  updateService(idServicio: number, campo: string, valor: any) {
    var url: string = `${this.config.getParamConfig('servicios', 'UrlApiRest')}/api/UniversityService/${campo}`
    console.log('objUpdateService', { id: idServicio, status: valor }, campo)
    this.adminService.actualizarServicio({ id: idServicio, value: valor }, url).subscribe(data => {
      console.log('Servicio actualizado con éxito')
    })
  }



}