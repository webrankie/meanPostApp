import {NgModule} from "@angular/core";

import {MatFormField, MatInput} from '@angular/material/input'
import {MatCard, MatCardFooter} from "@angular/material/card";
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from '@angular/material/dialog';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

@NgModule({
  imports: [
    MatInput,
    MatCard,
    MatButton,
    MatToolbar,
    MatIcon,
    MatAnchor,
    MatCardFooter,
    MatFormField,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormFieldModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  exports: [
    MatInput,
    MatCard,
    MatButton,
    MatToolbar,
    MatIcon,
    MatAnchor,
    MatCardFooter,
    MatFormField,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormFieldModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
  ]

})
export class AngularMaterialModule {}
