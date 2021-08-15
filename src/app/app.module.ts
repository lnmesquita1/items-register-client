import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CustomAdapter } from './item/custom-adapter.service';
import { CustomDateParserFormatter } from './item/custom-date-parser-formatter.service';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item/item.edit.component';
import { MenuComponent } from './menu/menu.component';
import { ContainerComponent } from './container/container.component';
import { ItemService } from './service/item.service';
import { ConfirmationService } from 'primeng/api';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt, 'pt');

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'item', component: ItemComponent },
  { path: 'item/edit', component: ItemEditComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemEditComponent,
    MenuComponent,
    ContainerComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputSwitchModule,
    InputMaskModule,
    CurrencyMaskModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    NgbModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  providers: [
    ItemService, 
    ConfirmationService, 
    { provide: LOCALE_ID, useValue: 'pt' },
    CustomAdapter,
    CustomDateParserFormatter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
