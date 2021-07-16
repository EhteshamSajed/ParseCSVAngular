import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IrisDTO } from '../IrisDTO';
import { ParseCSVService } from '../parse-csv.service';

@Component({
  selector: 'showtable',
  templateUrl: './showtable.component.html',
  styleUrls: ['./showtable.component.css'],
  providers: [ParseCSVService]
})
export class ShowtableComponent implements OnInit, OnDestroy {
  species: string = "species";
  csvServiceObserver: any;
  irisDTOs: IrisDTO[] = [];
  averageSepalLength: number = 0;

  //  Iris-setosa, Iris-versicolor, Iris-virginica

  constructor(private route: ActivatedRoute, private parseCSVService: ParseCSVService) {
    this.csvServiceObserver = this.parseCSVService.csvCompletedObservable.subscribe(() => {
      this.requestTableData();
    });
  }

  ngOnInit(): void {
    this.species = this.route.snapshot.params['species'];
    this.route.params.subscribe((params: Params) => {
      this.species = params['species'];
      this.requestTableData();
    });
  }

  requestTableData() {
    this.irisDTOs = this.parseCSVService.getData(this.species);
    this.averageSepalLength = this.parseCSVService.getAvgSepalLength();
  }

  ngOnDestroy(): void {
    this.csvServiceObserver.unsubscribe();
  }

}
