import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-titles',
  templateUrl: './list-titles.component.html',
  styleUrls: ['./list-titles.component.scss']
})
export class ListTitlesComponent implements OnInit {

  @Input() title: string;
  @Input() list: [];

  constructor() { }

  ngOnInit() {
  }

}
