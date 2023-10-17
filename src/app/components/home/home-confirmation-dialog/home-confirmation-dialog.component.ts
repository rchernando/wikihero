import { CommonModule } from "@angular/common";
import { Component, Inject, OnDestroy } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Subscription, catchError, of } from "rxjs";
import { HeroesService } from "src/app/services/heroes/heroes.service";
@Component({
    selector: "app-home-confirmation-dialog",
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, FormsModule, ReactiveFormsModule],
    templateUrl: "./home-confirmation-dialog.component.html",
    styles: []
})
export class HomeConfirmationDialogComponent implements OnDestroy{
    private id: string = "";
    private deleteHeroSubscription!: Subscription;

    constructor(public _dialogRef: MatDialogRef<HomeConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public _data: string, private readonly _heroesService: HeroesService) {
        this.id = _data;
    }

    public deleteHero() {
        this._heroesService
            .deleteHero(this.id)
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

    public closeDialog() {
        this._dialogRef.close();
    }

    ngOnDestroy(): void {
      this.deleteHeroSubscription?.unsubscribe()
    }
}
