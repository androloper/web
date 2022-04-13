import { Component } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'datatable3',
  templateUrl: './datatable3.component.html',
  styleUrls: ['./datatable3.component.scss']
})
export class Datatable3Component{
    rows = [
        {
            name: 'Claudia Oneal',
            gender: 'female',
            company: 'SeLouie',
            name2: 'Claudia Oneal',
            gender2: 'male',
            company2: 'Velotivity'
        },
        {
            name: 'Claudine Neal',
            gender: 'female',
            company: 'SeLouie',
            name2: 'Claudine Neal',
            gender2: 'male',
            company2: 'Velotivity'
        },
        {
            name: 'Blaudine Neal',
            gender: 'female',
            company: 'SeLouie',
            name2: 'Blaudine Neal',
            gender2: 'male',
            company2: 'Velotivity'
        },
        {
            name: 'Cheryl Rice',
            gender: 'female',
            company: 'SeLouie',
            name2: 'Cheryl Rice',
            gender2: 'male',
            company2: 'Velotivity'
        },
        {
            name: 'Beryl Nice',
            gender: 'female',
            company: 'SeLouie',
            name2: 'Beryl Nice',
            gender2: 'male',
            company2: 'Velotivity'
        }
    ];

    columns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }, { name: 'Name2' }, { name: 'Gender2' }, { name: 'Company2' }];

    allColumns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }, { name: 'Name2' }, { name: 'Gender2' }, { name: 'Company2' }];

    columnMode = ColumnMode;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    toggle(col) {
        const isChecked = this.isChecked(col);

        if (isChecked) {
            this.columns = this.columns.filter(c => c.name !== col.name);
        } else {
            this.columns = [...this.columns, col];
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    isChecked(col) {
        return (
            this.columns.find(c => c.name === col.name) !== undefined
        );
    }
}
