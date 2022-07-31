import { Component, Input, OnInit } from '@angular/core';
import { Design } from 'src/app/models/design.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'design-recent-item',
  templateUrl: './recent-item.component.html',
  styleUrls: ['./recent-item.component.scss']
})
export class RecentItemComponent implements OnInit {
  backgroundSource: string = ''
  @Input() item: Design = environment.defaults.designItem

  constructor() { }

  ngOnInit(): void {
    this.backgroundSource = environment.baseUrl.concat(this.item.coverImageSource)
  }
}
