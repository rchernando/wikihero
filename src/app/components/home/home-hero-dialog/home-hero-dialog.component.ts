import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription, catchError, of } from 'rxjs';
import { EDIT_MODE } from 'src/app/data/constants/common.constants';
import { HeroDialogData } from 'src/app/data/interfaces/hero.interface';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { UpperCaseDirective } from 'src/app/shared/directives/upper-case/upper-case.directive';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-hero-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    UpperCaseDirective,
  ],
  templateUrl: './home-hero-dialog.component.html',
  styles: [],
})
export class HomeHeroDialogComponent implements OnDestroy {
  public mode: string = '';

  public heroForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    secret_identity: new FormControl('', Validators.required),
    created: new FormControl(''),
  });

  private heroSubscription!: Subscription;

  constructor(
    public _dialogRef: MatDialogRef<HomeHeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: HeroDialogData,
    private readonly _heroesService: HeroesService
  ) {
    this.mode = _data.type;
    if (this.mode === EDIT_MODE) this.heroForm.patchValue(_data.hero);
  }

  public createHero() {
    this.heroForm.get('id')?.setValue(uuidv4());
    this.heroForm.get('created')?.setValue(new Date().getTime());
    const hero = this.heroForm.value;
    this.heroSubscription = this._heroesService
      .createNewHero(hero)
      .pipe(
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      )
      .subscribe((res) => {
        this.closeDialog();
        this._heroesService.changeRefresh();
      });
  }

  public updateHero() {
    const hero = this.heroForm.value;
    this.heroSubscription = this._heroesService
      .updateHero(hero)
      .pipe(
        catchError((err) => {
          console.log(err);
          return of(null);
        })
      )
      .subscribe((res) => {
        this.closeDialog();
        this._heroesService.changeRefresh();
      });
  }

  public verifyForm() {
    if (this.heroForm.valid)
      this.mode == EDIT_MODE ? this.updateHero() : this.createHero();
  }

  public closeDialog() {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this.heroSubscription?.unsubscribe();
  }
}
