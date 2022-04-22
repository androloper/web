import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { Service, TaskServ } from '../app.service';

@Component({
  selector: 'detail-grid',
  templateUrl: './detail-grid.component.html',
  styleUrls: ['./detail-grid.component.css'],
  providers: [Service],
})
export class DetailGridComponent implements OnInit {
    @Input() key: number;

    tasksDataSource: DataSource | undefined;
    tasks: TaskServ[];

    constructor(private service: Service) {
        this.tasks = service.getTasks();
        this.key = 0;
    }

    ngOnInit(){
        this.tasksDataSource = new DataSource({
            store: new ArrayStore({
                data: this.tasks,
                key: 'ID',
            }),
            filter: ['EmployeeID', '=', this.key],
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    //ngAfterViewInit() {
    //    this.tasksDataSource = new DataSource({
    //        store: new ArrayStore({
    //            data: this.tasks,
    //            key: 'ID',
    //        }),
    //        filter: ['EmployeeID', '=', this.key],
    //    });
    //}

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    completedValue(rowData: any) {
        return rowData.Status === 'Completed';
    }
}
