import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item/item.edit.component';
import { ContentComponent } from './content/content.component';
import { MenuComponent } from './menu/menu.component';
import { ContainerComponent } from './container/container.component';
import { ItemService } from './service/item.service';

const routes: Routes = [
  { path: 'item', component: ItemComponent },
  { path: 'item/edit', component: ItemEditComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemEditComponent,
    ContentComponent,
    MenuComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
