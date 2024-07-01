import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';

import {MatFormField, MatInput} from '@angular/material/input'
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {MatAnchor, MatButton} from "@angular/material/button";
import {HeaderComponent} from './header/header/header.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {PostListComponent} from './posts/post-list/post-list.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatCard,
    MatButton,
    MatToolbar,
    MatIcon,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormFieldModule,
    MatExpansionModule,
    HttpClientModule,
    MatAnchor,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
