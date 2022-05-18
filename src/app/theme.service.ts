import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public static default = 'light';

  private themeSub = new BehaviorSubject(ThemeService.default);

  public getTheme(): string {
    return localStorage.getItem('theme') ?? ThemeService.default;
  }

  public getThemeObs() {
    return this.themeSub.asObservable()
  }

  public setTheme(value: string) {
    localStorage.setItem('theme', value);
    this.changeTheme(value)
  }

  private changeTheme(value: string) {
    this.style.href = `/${value}.css`;
    this.themeSub.next(value);
  }

  private readonly style: HTMLLinkElement;

  constructor() {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    document.head.appendChild(this.style);

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.changeTheme(storedTheme);
    } else {
      if (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.changeTheme('dark')
      }

      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', event => {
          console.log(event)
          if (event.matches) {
            this.changeTheme('dark')
          } else {
            this.changeTheme('light')
          }
        })
    }
  }
}
