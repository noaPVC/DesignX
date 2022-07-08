import { Component, Input, OnInit } from '@angular/core';
import { LoaderType } from 'src/app/enums/loader.enum';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() loaderType: LoaderType = LoaderType.Spinner

  isSpinner: boolean = false
  isSpinnerSmooth: boolean = false
  isDots: boolean = false
  isSquares: boolean = false

  constructor() { }

  ngOnInit(): void {

    switch (this.loaderType) {
      case LoaderType.Spinner:
        this.isSpinner = true
        break;
      case LoaderType.SpinnerSmooth:
        this.isSpinnerSmooth = true
        break;
      case LoaderType.Dots:
        this.isDots = true
        break;
      case LoaderType.Squares:
        this.isSquares = true
        break;
    }

  }
}
