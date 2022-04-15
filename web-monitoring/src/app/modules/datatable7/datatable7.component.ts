import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Component({
    selector: 'datatable7',
    templateUrl: './datatable7.component.html',
    styleUrls: ['./datatable7.component.scss']
})
export class Datatable7Component implements OnInit, OnDestroy {
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    posts;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.dtOptions = {
            // paging: true,
            // serverSide: true,
            pagingType: 'full_numbers',
            pageLength: 10,
            lengthMenu: [10, 20, 50, 100],
            processing: true
        };

        this.http.get('http://jsonplaceholder.typicode.com/posts')
            .subscribe((posts) => {
                this.posts = posts;
                // @ts-ignore
                this.dtTrigger.next();
            });
    }
    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

}
