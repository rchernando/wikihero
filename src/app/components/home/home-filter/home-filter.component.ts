import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { HomeHeroDialogComponent } from "../home-hero-dialog/home-hero-dialog.component";
import { CREATE_MODE } from "src/app/data/constants/common.constants";

@Component({
    selector: "app-home-filter",
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './home-filter.component.html'
})
export class HomeFilterComponent {
    @Output() inputEvent = new EventEmitter<string>();

    constructor(public dialog: MatDialog) {}

    public openDialog() {
        this.dialog.open(HomeHeroDialogComponent, {
            data: {
                type: CREATE_MODE,
                hero: null,
            },
        });
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.inputEvent.emit(filterValue);
    }
}
