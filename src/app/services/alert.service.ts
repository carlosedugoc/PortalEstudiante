import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Alert } from "../app.models";
import { AlertType } from "../shared/enumerators.enum";

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: any, time: number = 0, keepAfterRouteChange = false) {
    this.alert(AlertType.Success, message, time, keepAfterRouteChange);
  }

  error(message: any, time: number = 0, keepAfterRouteChange = false) {
    this.alert(AlertType.Error, message, time, keepAfterRouteChange);
  }

  info(message: any, time: number = 0, keepAfterRouteChange = false) {
    this.alert(AlertType.Info, message, time, keepAfterRouteChange);
  }

  warn(message: any, time: number = 0, keepAfterRouteChange = false) {
    this.alert(AlertType.Warning, message, time, keepAfterRouteChange);
  }

  alert(type: AlertType, message: any, time: number, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{ type: type, message: message, time: time });
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
