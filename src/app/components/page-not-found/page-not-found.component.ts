import { Component, OnInit } from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.sass']
})
export class PageNotFoundComponent implements OnInit {

  img: SafeUrl;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.img = this.route.snapshot.data['data'];
  }

}
