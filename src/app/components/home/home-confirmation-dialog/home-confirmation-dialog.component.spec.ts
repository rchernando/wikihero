import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeConfirmationDialogComponent } from './home-confirmation-dialog.component';
import { HeroesService } from 'src/app/services/heroes/heroes.service';
import { of } from 'rxjs';

describe('HomeConfirmationDialogComponent', () => {
  let component: HomeConfirmationDialogComponent;
  let fixture: ComponentFixture<HomeConfirmationDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<HomeConfirmationDialogComponent>>;
  let heroesService: jasmine.SpyObj<HeroesService>;

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    heroesService = jasmine.createSpyObj('HeroesService', ['deleteHero', 'changeRefresh']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: 'test-hero-id' },
        { provide: HeroesService, useValue: heroesService },
      ],
    });

    fixture = TestBed.createComponent(HomeConfirmationDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should delete hero and change refresh when deleteHero is called', () => {
    const response = {}; 

    heroesService.deleteHero.and.returnValue(of(response));

    component.deleteHero();

    expect(heroesService.deleteHero).toHaveBeenCalledWith('test-hero-id');
    expect(dialogRef.close).toHaveBeenCalled();
    expect(heroesService.changeRefresh).toHaveBeenCalled();
  });
});
