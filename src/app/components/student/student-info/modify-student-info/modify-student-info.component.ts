import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../../../app.services";
import { BannerService } from "../../../../services/banner.service";
import { User } from "../../../../app.models";
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-modify-student-info',
  templateUrl: './modify-student-info.component.html'
})
export class ModifyStudentInfoComponent implements OnInit {

  public countries: any
  public states: any
  public cities: any
  public user: User

  constructor(private bannerService: BannerService, private globalService: GlobalService) {
    this.user = this.globalService.user

  }

  ngOnInit() {

    if (this.globalService != undefined && !String.IsNullOrWhiteSpace(this.globalService.AutenticationStudentToken)) {
      this.getCountries();
      this.getStates("CO");
      this.getCities("CO", "11");
    }
  }

  /**
   * Método que obtiene los paises
   * 
   * @memberof ModifyStudentInfoComponent
   */
  getCountries() {
    this.bannerService.getCountries(this.user.university).subscribe(res => {
      this.countries = res;

    });
  }

  /**
   * Método que obtiene los departamentos o estados de un país.
   * 
   * @param {string} countryCode Código del país.
   * @memberof ModifyStudentInfoComponent
   */
  getStates(countryCode: string) {
    this.bannerService.getStates(this.user.university, countryCode).subscribe(res => {
      this.states = res.States;

    })
  }

  /**
   * Método que obtiene las ciudades de un departamento.
   * 
   * @param {string} countryCode Código del país.
   * @param {string} stateCode Código del estado o departamento.
   * @memberof ModifyStudentInfoComponent
   */
  getCities(countryCode: string, stateCode: string) {
    this.bannerService.getCities(this.user.university, countryCode, stateCode).subscribe(res => {
      this.cities = res.Cities
    })
  }
}
