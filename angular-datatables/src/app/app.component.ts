import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  posts: any;

  constructor(private http: HttpClient) { }

  title = 'angular-datatables';
  ngOnInit(): void {
    this.dtOptions = {
      // paging: true,
      // serverSide: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    // this.dtTrigger.next();

    this.http.get('http://jsonplaceholder.typicode.com/posts')
      .subscribe((posts: any) => {
        this.posts = posts;
        // @ts-ignore
        this.dtTrigger.next();
      });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
