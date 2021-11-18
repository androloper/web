import {Component, OnInit} from '@angular/core';
// @ts-ignore
import * as js from './speedometer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SpeedOMeter';

  ngOnInit(): void {}
}
