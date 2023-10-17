import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: "app-loading",
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule],
    template: `
        <div id="loading-component" class="w-full h-full pointer-events-none flex justify-center items-center bg-[#00000050]">
            <mat-spinner></mat-spinner>
        </div>
    `,
    styles: [],
})
export class LoadingComponent {}
