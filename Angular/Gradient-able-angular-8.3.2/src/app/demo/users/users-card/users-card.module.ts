import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersCardRoutingModule } from './users-card-routing.module';
import { UsersCardComponent } from './users-card.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbCarouselModule, NgbDropdownModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UsersCardComponent],
  imports: [
    CommonModule,
    UsersCardRoutingModule,
    SharedModule,
    NgbTabsetModule,
    NgbDropdownModule,
    NgbCarouselModule
  ]
})
export class UsersCardModule { }
