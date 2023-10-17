import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeroDialogComponent } from './home-hero-dialog.component';

describe('HeroDialogComponent', () => {
  let component: HomeHeroDialogComponent;
  let fixture: ComponentFixture<HomeHeroDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeHeroDialogComponent]
    });
    fixture = TestBed.createComponent(HomeHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
