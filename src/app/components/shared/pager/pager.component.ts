import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'underscore';
import { String } from 'typescript-string-operations';

import { PagerService } from "../../../app.services";

declare var llamarEventosMainJS: any

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})

export class PagerComponent implements OnInit {

  constructor(
    private http: Http,
    private pagerService: PagerService
  ) { }

  // array of all items to be paged
  @Input("allItems") allItems: any[];
  @Input("elementsXPageLabel") elementsXPageLabel: string
  @Input("demo") demo: boolean

  // pager object
  pager: any = {};

  maxItemsXPage: number

  // paged items
  @Output() pagedItems: EventEmitter<any[]> = new EventEmitter<any[]>();

  ngOnInit() {

    this.maxItemsXPage = 10;

    if (this.allItems != undefined) {
      this.setPage(1);
    }

    //// Se define el texto genérico o uno custom.
    this.elementsXPageLabel = String.IsNullOrWhiteSpace(this.elementsXPageLabel) ? "Paginador.labelElementos" : this.elementsXPageLabel

    if (this.demo) this.callDemo();

    setTimeout(() => {
      llamarEventosMainJS();
    }, 1000);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.maxItemsXPage);

    // get current page of items
    this.pagedItems.emit(this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1));
  }

  setMaxItemsXPage(maxItems: number) {
    this.maxItemsXPage = Number(maxItems)
    this.setPage(1)
  }

  callDemo() {
    //get dummy data... First run next command.
    //json-server --watch db.json --port 3004
    // this.http.get('http://localhost:3004/Dummy')
    //   .map((response: Response) => response.json())
    //   .subscribe(data => {
    //     // set items to json response
    //     this.allItems = data;

    //     // initialize to page 1
    //     this.setPage(1);
    //   });
  }
}
