import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { HomeContentComponent } from "src/app/components/home/home-content/home-content.component";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [CommonModule, HomeContentComponent],
    templateUrl: "./home.component.html",
    styles: [],
})
export class HomeComponent {}
