import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, catchError, of } from 'rxjs';
import { HeroInterface } from 'src/app/data/interfaces/hero.interface';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { HomeFilterComponent } from '../home-filter/home-filter.component';
import { HomeTableComponent } from '../home-table/home-table.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule, HomeFilterComponent, HomeTableComponent],
  templateUrl: './home-content.component.html',
  styles: [],
})
export class HomeContentComponent implements OnInit, OnDestroy {
  public heroes: HeroInterface[] = [];
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public input: string = '';
  public totalItems: number = 0;

  public findAllHeroesSubscription$!: Subscription;
  public findAllHeroesPageableSubscription$!: Subscription;

  constructor(private readonly _heroesService: HeroesService) {}

  public ngOnInit(): void {
    this.findHeroes();
    this._heroesService.refresh$.subscribe((res) => {
      this.input.length == 0
        ? this.findHeroes()
        : this.findHeroesByName(this.input);
    });
  }

  public changeInput(event: string) {
    this.input = event;
    this.pageIndex = 0
    this.input.length == 0 ? this.findHeroes() : this.findHeroesByName(event);
  }

  public changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.input.length == 0
      ? this.findHeroes()
      : this.findHeroesByName(this.input);
  }

  private findHeroes() {
    this.findAllHeroesPageableSubscription$ = this._heroesService
      .findAllHeroesWithPaginator(this.pageIndex, this.pageSize)
      .pipe(
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      )
      .subscribe((res) => {
        this.heroes = res?.body as HeroInterface[];
        const totalCountHeader = res?.headers.get('x-total-count');
        this.totalItems = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
      });
  }

  private findHeroesByName(name: string) {
    this.findAllHeroesSubscription$ = this._heroesService
      .findHeroesByName(this.pageIndex, this.pageSize, name)
      .pipe(
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      )
      .subscribe((res) => {
        this.heroes = res?.body as HeroInterface[];
        const totalCountHeader = res?.headers.get('x-total-count');
        this.totalItems = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
      });
  }

  public ngOnDestroy(): void {
    this.findAllHeroesSubscription$?.unsubscribe();
    this.findAllHeroesPageableSubscription$?.unsubscribe();
  }
}
