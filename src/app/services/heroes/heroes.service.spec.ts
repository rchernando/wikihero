import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HeroesService } from "./heroes.service";
import { HeroInterface } from "src/app/data/interfaces/hero.interface";
import { environment } from "src/environments/environment";

describe("HeroesService", () => {
    let service: HeroesService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HeroesService],
        });
        service = TestBed.inject(HeroesService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify(); // Verifica que no haya solicitudes pendientes
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should retrieve all heroes", () => {
        const mockHeroes: HeroInterface[] = [
            {
                name: "Iron Man",
                secret_identity: "Tony Stark",
                created: "1696111200000",
                id: "3a9b431a-df5b-4a1c-8cb9-15b47f222399",
            },
        ];

        service.findAllHeroes().subscribe((heroes) => {
            expect(heroes).toEqual(mockHeroes);
        });

        const req = httpTestingController.expectOne(`${environment.HEROES_ENDPOINT}`);
        expect(req.request.method).toBe("GET");
        req.flush(mockHeroes);
    });

    it("should retrieve a hero by ID", () => {
        const heroId = "1";
        const mockHero: HeroInterface = {
            name: "Iron Man",
            secret_identity: "Tony Stark",
            created: "1696111200000",
            id: "3a9b431a-df5b-4a1c-8cb9-15b47f222399",
        };

        service.findHeroById(heroId).subscribe((hero) => {
            expect(hero).toEqual(mockHero);
        });

        const req = httpTestingController.expectOne(`${environment.HEROES_ENDPOINT}/${heroId}`);
        expect(req.request.method).toBe("GET");
        req.flush(mockHero);
    });

    it("should create a new hero", () => {
        const newHero: HeroInterface = {
            name: "Iron Man",
            secret_identity: "Tony Stark",
            created: "1696111200000",
            id: "3a9b431a-df5b-4a1c-8cb9-15b47f222399",
        };

        service.createNewHero(newHero).subscribe((response) => {
            expect(response).toBeTruthy();
        });

        const req = httpTestingController.expectOne(`${environment.HEROES_ENDPOINT}`);
        expect(req.request.method).toBe("POST");
        req.flush({}); // Puedes ajustar la respuesta según lo que esperas en tu servicio.
    });

    it("should update a hero", () => {
        const updatedHero: HeroInterface = {
            name: "Iron Man",
            secret_identity: "Tony Stark",
            created: "1696111200000",
            id: "3a9b431a-df5b-4a1c-8cb9-15b47f222399",
        };

        service.updateHero(updatedHero).subscribe((response) => {
            expect(response).toBeTruthy();
        });

        const req = httpTestingController.expectOne(`${environment.HEROES_ENDPOINT}/${updatedHero.id}`);
        expect(req.request.method).toBe("PUT");
        req.flush({}); // Ajusta la respuesta según tu servicio.
    });

    it("should delete a hero", () => {
        const heroId = "1";

        service.deleteHero(heroId).subscribe((response) => {
            expect(response).toBeTruthy();
        });

        const req = httpTestingController.expectOne(`${environment.HEROES_ENDPOINT}/${heroId}`);
        expect(req.request.method).toBe("DELETE");
        req.flush({}); // Ajusta la respuesta según tu servicio.
    });

    it("should retrieve heroes with pagination", () => {
        const page = 1;
        const limit = 10;
        const mockHeroes: HeroInterface[] = [
            {
                name: "Iron Man",
                secret_identity: "Tony Stark",
                created: "1696111200000",
                id: "3a9b431a-df5b-4a1c-8cb9-15b47f222399",
            },
        ];

        service.findAllHeroesWithPaginator(page, limit).subscribe((heroesResponse) => {
            expect(heroesResponse.body).toEqual(mockHeroes);
        });

        const req = httpTestingController.expectOne(`${environment.HEROES_ENDPOINT}?_page=${page + 1}&_limit=${limit}`);
        expect(req.request.method).toBe("GET");
        req.flush(mockHeroes, { headers: { "x-total-count": "10" } });
    });

    it("should retrieve heroes by name with pagination", () => {
        const page = 1;
        const limit = 10;
        const name = "Superman";
        const mockHeroes: HeroInterface[] = [
            {
                name: "Iron Man",
                secret_identity: "Tony Stark",
                created: "1696111200000",
                id: "3a9b431a-df5b-4a1c-8cb9-15b47f222399",
            },
        ];

        service.findHeroesByName(page, limit, name).subscribe((heroesResponse) => {
            expect(heroesResponse.body).toEqual(mockHeroes);
        });

        const req = httpTestingController.expectOne(`${environment.HEROES_ENDPOINT}?_page=${page + 1}&_limit=${limit}&q=${name}`);
        expect(req.request.method).toBe("GET");
        req.flush(mockHeroes, { headers: { "x-total-count": "1" } });
    });
});
