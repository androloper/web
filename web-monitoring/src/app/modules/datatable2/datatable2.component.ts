import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {InvoiceService} from './invoice_service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
    selector: 'datatable2',
    templateUrl: './datatable2.component.html',
    styleUrls: ['./datatable2.component.scss']
})
export class Datatable2Component implements OnInit, AfterViewInit{
    public dataSource = new MatTableDataSource<any | Group>([]);
    allData: any[];
    columns: any[];
    displayedColumns: string[];
    groupByColumns: string[] = [];
    constructor(
        protected dataSourceService: InvoiceService,
    ) {
        this.columns = [{
            field: 'OrderID'
        }, {
            field: 'OrderDate'
        }, {
            field: 'ShipperName'
        }, {
            field: 'Country'
        }, {
            field: 'City'
        }, {
            field: 'Address'
        }, {
            field: 'PostalCode'
        }, {
            field: 'ProductName'
        }, {
            field: 'CustomerName'
        }];
        this.displayedColumns = this.columns.map(column => column.field);
        // this.groupByColumns = ['ShipCountry'];
    }
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.dataSourceService.getAllData()
            .subscribe(
                (data: any) => {
                    data.data.forEach((item, index) => {
                        item.id = index + 1;
                    });
                    this.allData = data.data;
                    this.dataSource.data = this.addGroups(this.allData, this.groupByColumns);
                    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
                    this.dataSource.filter = performance.now().toString();
                },
                (err: any) => console.log(err)
            );
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    groupBy(event, column) {
        event.stopPropagation();
        this.checkGroupByColumn(column.field, true);
        this.dataSource.data = this.addGroups(this.allData, this.groupByColumns);
        this.dataSource.filter = performance.now().toString();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    checkGroupByColumn(field, add ) {
        let found = null;
        for (const column of this.groupByColumns) {
            if (column === field) {
                found = this.groupByColumns.indexOf(column, 0);
            }
        }
        if (found != null && found >= 0) {
            if (!add) {
                this.groupByColumns.splice(found, 1);
            }
        } else {
            if ( add ) {
                this.groupByColumns.push(field);
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    unGroupBy(event, column) {
        event.stopPropagation();
        this.checkGroupByColumn(column.field, false);
        //androloper
        this.dataSource.data = this.addGroups(this.allData, this.groupByColumns);
        this.dataSource.filter = performance.now().toString();
    }

    customFilterPredicate(data: any | Group, filter: string): boolean {
        return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
    }

    getDataRowVisible(data: any): boolean {
        const groupRows = this.dataSource.data.filter(
            (row) => {
                if (!(row instanceof Group)) {
                    return false;
                }
                let match = true;
                this.groupByColumns.forEach((column) => {
                    if (!row[column] || !data[column] || row[column] !== data[column]) {
                        match = false;
                    }
                });
                return match;
            }
        );

        if (groupRows.length === 0) {
            return true;
        }
        const parent = groupRows[0] as Group;
        return parent.visible && parent.expanded;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    groupHeaderClick(row) {
        row.expanded = !row.expanded;
        this.dataSource.filter = performance.now().toString();  // bug here need to fix
    }

    addGroups(data: any[], groupByColumns: string[]): any[] {
        const rootGroup = new Group();
        rootGroup.expanded = true;
        return this.getSubLevel(data, 0, groupByColumns, rootGroup);
    }

    getSubLevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
        if (level >= groupByColumns.length) {
            return data;
        }
        const groups = this.uniqueBy(
            data.map(
                (row) => {
                    const result = new Group();
                    result.level = level + 1;
                    result.parent = parent;
                    for (let i = 0; i <= level; i++) {
                        result[groupByColumns[i]] = row[groupByColumns[i]];
                    }
                    return result;
                }
            ),
            JSON.stringify);

        const currentColumn = groupByColumns[level];
        let subGroups = [];
        groups.forEach((group) => {
            const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
            group.totalCounts = rowsInGroup.length;
            const subGroup = this.getSubLevel(rowsInGroup, level + 1, groupByColumns, group);
            subGroup.unshift(group);
            subGroups = subGroups.concat(subGroup);
        });
        return subGroups;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    uniqueBy(a, key) {
        const seen = {};
        return a.filter((item) => {
            const k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        });
    }

    isGroup(index, item): boolean {
        return item.level;
    }
}

export class Group {
    level = 0;
    parent: Group;
    expanded = true;
    totalCounts = 0;
    get visible(): boolean {
        return !this.parent || (this.parent.visible && this.parent.expanded);
    }
}

