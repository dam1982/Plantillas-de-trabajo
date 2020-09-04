import { Component, OnInit } from '@angular/core';
import { ClientBusinessService } from 'src/app/business/administration/client-business.service';
import { City } from 'src/app/model/city';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(public business: ClientBusinessService) { }
   cities :City[];
  async ngOnInit() {
      this.cities = await this.business.GetCities();
  }

}
