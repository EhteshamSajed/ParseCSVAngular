import { Observable } from "rxjs";
import { IrisDTO } from "./IrisDTO";
// import { Injectable } from '@angular/core';

// @Injectable({
//     providedIn: 'root',
// })

export class ParseCSVService {
    iriDTOs: IrisDTO[] = [];

    csvCompletedObservable = new Observable((observer: any) => {
        fetch('assets/Iris.csv')
            .then(response => response.text())
            .then(data => {
                //console.log(data);    
                this.splitCSVtoArray(data);
                observer.next();
            });
    });

    splitCSVtoArray(data: string) {
        let csvLines: string[];
        csvLines = data.split(/\r\n|\n/);
        this.iriDTOs = [];
        for (let i = 1; i < csvLines.length; i++) {
            if (csvLines[i].match(/^\s*$/gm)) {
                continue;
            }
            let csvFields = csvLines[i].split(',');
            let irisDTO: IrisDTO = new IrisDTO();
            irisDTO.id = +csvFields[0];
            irisDTO.sepalLength = +csvFields[1];
            irisDTO.sepalWidth = +csvFields[2];
            irisDTO.petalLength = +csvFields[3];
            irisDTO.petalWidth = +csvFields[4];
            irisDTO.species = csvFields[5];
            this.iriDTOs.push(irisDTO);
        }
    }

    getData(param: string): IrisDTO[] {
        if (param == "all")
            return this.iriDTOs.slice();
        return this.iriDTOs.filter(element => element.species == param);
    }

    getAvgSepalLength(): number{
        let sum: number = 0;
        this.iriDTOs.forEach(iris => {
            sum += iris.sepalLength;
        });
        return sum/this.iriDTOs.length;
    }
}