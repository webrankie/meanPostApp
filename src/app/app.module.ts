import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';

import {MatFormField, MatInput} from '@angular/material/input'
import { AppComponent } from './app.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatCard, MatCardFooter} from "@angular/material/card";
import {MatAnchor, MatButton} from "@angular/material/button";
import {HeaderComponent} from './header/header/header.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {PostListComponent} from './posts/post-list/post-list.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    PostCreateComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule,
    MatAnchor,
    MatCardFooter,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
