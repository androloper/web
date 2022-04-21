import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import {Service, TaskServ} from '../datatable8.service';

@Component({
  selector: 'detail-grid',
  templateUrl: './detail-grid.component.html',
  styleUrls: ['./detail-grid.component.scss'],
  providers: [Service],
})
export class DetailGridComponent implements AfterViewInit {
    @Input() key: number;

    tasksDataSource: DataSource;
    tasks: TaskServ[];

    constructor(private service: Service) {
        this.tasks = service.getTasks();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ngAfterViewInit() {
        this.tasksDataSource = new DataSource({
            store: new ArrayStore({
                data: this.tasks,
                key: 'ID',
            }),
            filter: ['EmployeeID', '=', this.key],
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    completedValue(rowData) {
        return rowData.Status === 'Completed';
    }
}
