import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'resume-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() icon: string | undefined;
  // Sets/stores the underlying component `isOpen()`, be careful!
  @Input() startOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

}
