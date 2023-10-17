import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "date",
    standalone: true,
})
export class DatePipe implements PipeTransform {
    months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    transform(value: string, ...args: unknown[]) {
        const date = new Date(parseInt(value));
        const day = date.getDate();
        const month = this.months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }
}
