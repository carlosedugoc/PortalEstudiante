import { Component, OnInit, animate } from '@angular/core';
import { Alert } from "../../../app.models";
import { AlertService } from "../../../app.services";
import { AlertType } from "../../../shared/enumerators.enum";
import { AppConfiguration } from "../../../app.configuration";

declare var $: any;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(
    private alertService: AlertService,
    private config: AppConfiguration
  ) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }

      // add alert to array
      let idAlert: number = this.alerts.length + 1
      alert.id = idAlert
      this.alerts.push(alert);

      setTimeout(() => {
        let htmlElement = document.querySelector(`[idalert="${alert.id}"]`);
        $(htmlElement).fadeIn()
      }, 0);

      //// Se determina si se oculta el mensaje automáticamente, y en cuanto tiempo.
      if (this.config.getParamConfig("validaciones", "ocultarMensajesAuto") == true) {
        let timeinScreen: number = 0
        timeinScreen = alert.time > 0 ? alert.time : this.config.getParamConfig("validaciones", "tiempoOcultarMensaje")

        setTimeout(() => {
          this.removeAlert(alert);
        }, timeinScreen * 1000);
      }
    });
  }

  removeAlert(alert: Alert) {
    let htmlElement = document.querySelector(`[idalert="${alert.id}"]`);
    $(htmlElement).fadeOut();
    setTimeout(() => {
      this.alerts = this.alerts.filter(x => x !== alert);
    }, 1000);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'fa fa-check-circle';
      case AlertType.Error:
        return 'fa fa-times-circle';
      case AlertType.Info:
        return 'fa fa-info-circle';
      case AlertType.Warning:
        return 'fa fa-exclamation-circle';
    }
  }
}
