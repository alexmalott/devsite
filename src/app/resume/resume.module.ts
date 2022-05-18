import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume.component';
import { SectionComponent } from './section/section.component';
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {TooltipModule} from "ngx-bootstrap/tooltip";

@NgModule({
  declarations: [
    ResumeComponent,
    SectionComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    ProgressbarModule,
    AccordionModule,
    TooltipModule
  ]
})
export class ResumeModule { }
