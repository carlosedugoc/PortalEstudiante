import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Servicio, User } from "../../../../app.models"
import { AdministracionService } from "../../../../app.services";
import { AppConfiguration } from "../../../../app.configuration";
import { GlobalService } from "../../../../services/global.service";

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html'
})
export class ServicesListComponent implements OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["cancel"].previousValue != changes["cancel"].currentValue) {
      this.newStatus = !this.newStatus
      this.servicios.find(x => x.id == this.selectedService).offered = this.newStatus
    }
  }

  @Input('total_modalidades') total_modalidades: number
  @Input('total_niveles') total_niveles: number
  @Input('total_estados') total_estados: number
  @Input('servicios') servicios: Servicio[]
  @Input('tipos') tipos: any[]
  @Output() offered: EventEmitter<Servicio> = new EventEmitter<Servicio>();
  @Input('cancel') cancel: boolean

  private urlServicio: string
  public dataPaginada: any[]
  public selectedService: number
  public newStatus: boolean
  public user: User

  constructor(private adminService: AdministracionService, private config: AppConfiguration, private globalService: GlobalService, ) {
    this.urlServicio = this.config.getParamConfig('servicios', 'UrlApiRest')
    this.user = this.globalService.user
  }

  /**
   * Método que llena propiedad con data paginada.
   * 
   * @param {any[]} dataPaged Información ya paginada.
   * @memberof ServicesListComponent
   */
  SetDataPaged(dataPaged: any[]) {
    this.dataPaginada = dataPaged
  }

  updateItem(id: number, estado: boolean) {
    this.adminService.actualizaItem({ id: id, status: estado }, this.urlServicio).subscribe(data => {
      console.log('Item actualizado con éxito')
    })
  }

  updateService(idServicio: number, campo: string, valor: any) {
    var url: string = `${this.urlServicio}/api/UniversityService/${campo}`
    console.log('objUpdateService', { id: idServicio, status: valor }, campo)
    this.adminService.actualizarServicio({ id: idServicio, value: valor }, url).subscribe(data => {
      console.log('Servicio actualizado con éxito')
    })
  }

  openModal(idServicio: number, status: boolean) {
    this.selectedService = idServicio
    this.newStatus = status
    let servicio: Servicio = this.servicios.find(x => x.id == this.selectedService)
    servicio.offered = this.newStatus
    this.offered.emit(servicio)
    if (!status){
      document.getElementById('openModalButtonService').click()
    }
  }

  ModificarTodos(estado: boolean, idx: number) {
    console.log(estado, idx)
    for (let dato of this.dataPaginada[idx].data) {
      dato.status = estado
      this.updateItem(dato.id, estado)
    }
  }

}
