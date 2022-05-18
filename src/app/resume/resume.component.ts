import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import Resume from "./resume";
import resumeEn from "../../assets/resume/en.json"
import {ThemeService} from "../theme.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  // Default to English
  resume: Resume = resumeEn;
  currentTheme: string;

  constructor(public theme: ThemeService, private http: HttpClient, private translate: TranslateService, private title: Title) {
    this.currentTheme = this.theme.getTheme()
  }

  loadResume(lang: string){
    if( lang === 'en' ){
      this.resume = resumeEn;
      this.setTitle(resumeEn.basics.name)
    }
    else {
      this.http.get('../../assets/resume/' + lang + '.json').subscribe({next: (resume: any) => {this.resume = resume; this.setTitle(resume.basics.name)}})
    }
  }

  setTitle(name: string){
    this.title.setTitle(this.translate.instant('resume.title', {name: name}));
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event) => {this.loadResume(event.lang)})
    this.loadResume(this.translate.currentLang)
    this.theme.getThemeObs().subscribe((theme) => {
      this.currentTheme = theme;
    })
  }

  formatDate(unformattedDate: string): string {
    const date = new Date(unformattedDate);
    date.setDate(date.getDate()+1);
    const month = new Intl.DateTimeFormat(this.translate.currentLang, { month: 'long' }).format(date);
    const year = new Intl.DateTimeFormat(this.translate.currentLang, { year: 'numeric' }).format(date);
    return month + ' ' + year
  }
}
