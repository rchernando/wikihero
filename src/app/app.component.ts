import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { LoadingComponent } from "./shared/components/loading/loading.component";
import { LoadingService } from "./services/loading-service/loading.service";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterOutlet, LoadingComponent],
    template: `
        <div
            id="loading-component"
            class="w-full h-full absolute z-50"
            *ngIf="showLoading"
            >
            <app-loading></app-loading>
        </div>
        <router-outlet />
    `,
})
export class AppComponent implements AfterViewInit {
    public showLoading: boolean = false;
    constructor(private _loadingService: LoadingService, private readonly _cdr: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this._loadingService.loading_.subscribe((res) => {
          this.showLoading = res
          this._cdr.detectChanges(); 
        });
    }
}
