import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HeroInterface } from "src/app/data/interfaces/hero.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class HeroesService {
    refresh$: BehaviorSubject<null> = new BehaviorSubject(null);

    constructor(private readonly _httpClient: HttpClient) {}

    get refresh_() {
        return this.refresh$;
    }

    public changeRefresh() {
        this.refresh$.next(null)
    }

    public findAllHeroes() {
        return this._httpClient.get(`${environment.HEROES_ENDPOINT}`);
    }

    public findAllHeroesWithPaginator(page: number, limit: number) {
        return this._httpClient.get(`${environment.HEROES_ENDPOINT}?_page=${page + 1}&_limit=${limit}`, {
            observe: "response",
        });
    }

    public findHeroesByName(page: number, limit: number, name: string) {
        return this._httpClient.get(`${environment.HEROES_ENDPOINT}?_page=${page + 1}&_limit=${limit}&q=${name}`, {
            observe: "response",
        });
    }

    public findHeroById(id: string) {
        return this._httpClient.get(`${environment.HEROES_ENDPOINT}/${id}`);
    }

    public createNewHero(hero: HeroInterface) {
        return this._httpClient.post(`${environment.HEROES_ENDPOINT}`, hero);
    }

    public updateHero(updatedHero: HeroInterface) {
        return this._httpClient.put(`${environment.HEROES_ENDPOINT}/${updatedHero.id}`, updatedHero);
    }

    public deleteHero(id: string) {
        return this._httpClient.delete(`${environment.HEROES_ENDPOINT}/${id}`);
    }
}
