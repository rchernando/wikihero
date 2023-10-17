import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EDIT_MODE } from 'src/app/data/constants/common.constants';
import { DataTableInterface } from 'src/app/data/interfaces/dataTable.interface';
import { HeroInterface } from 'src/app/data/interfaces/hero.interface';
import { DatePipe } from 'src/app/shared/pipes/date-custom/date.pipe';
import { HomeFilterComponent } from '../home-filter/home-filter.component';
import { HomeConfirmationDialogComponent } from '../home-confirmation-dialog/home-confirmation-dialog.component';
import { HomeHeroDialogComponent } from '../home-hero-dialog/home-hero-dialog.component';

@Component({
  selector: 'app-home-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    HomeFilterComponent,
    DatePipe,
    MatDialogModule,
  ],
  templateUrl: 'home-table.component.html',
  styles: [],
})
export class HomeTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() public heroes: HeroInterface[] = [];
  @Input() public totalItems: number = 100;
  @Input() public pageSize: number = 10;
  @Input() public pageIndex: number = 0;

  @Output() public pageEvent = new EventEmitter<PageEvent>();

  public displayedColumns: string[] = [
    'name',
    'created',
    'secret_identity',
    'actions',
  ];
  public dataSource!: MatTableDataSource<HeroInterface>;

  public dataTable: DataTableInterface[] = [
    { matColumnDef: 'name', columnName: 'Nombre' },
    { matColumnDef: 'created', columnName: 'Creado', type: 'date' },
    { matColumnDef: 'secret_identity', columnName: 'Identidad Secreta' },
    { matColumnDef: 'actions', columnName: 'Acciones', type: 'actions' },
  ];

  @ViewChild(MatPaginator, { read: true }) paginator!: MatPaginator;

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['heroes']) {
      this.heroes = changes['heroes'].currentValue;
      this.setDatasourceValue();
    }
    if (changes['totalItems']) {
      this.totalItems = changes['totalItems'].currentValue;
    }

    if (changes['pageIndex']) {
      this.pageIndex = changes['pageIndex'].currentValue;
    }
  }

  ngOnInit(): void {
    this.setDatasourceValue();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public deleteHero(id: string) {
    this.dialog.open(HomeConfirmationDialogComponent, {
      data: id,
    });
  }

  public updateHero(row: HeroInterface) {
    this.dialog.open(HomeHeroDialogComponent, {
      data: {
        type: EDIT_MODE,
        hero: row,
      },
    });
  }

  public setDatasourceValue() {
    this.dataSource = new MatTableDataSource(this.heroes);
    this.dataSource.paginator = this.paginator;
  }

  public handlePageEvent(event: PageEvent) {
    this.pageEvent.emit(event);
  }
}
