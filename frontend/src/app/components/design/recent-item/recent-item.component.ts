import { Component, Input, OnInit } from '@angular/core';
import { Design } from 'src/app/models/design.model';

@Component({
  selector: 'design-recent-item',
  templateUrl: './recent-item.component.html',
  styleUrls: ['./recent-item.component.scss']
})
export class RecentItemComponent implements OnInit {
  @Input() item: Design = { metadata: { _userId: 'none', createdAt: '-', creatorImageSource: 'none', creatorName: 'usernotfound', hasAccess: false }, _id: 'string', caption: 'none', description: 'none', coverImageSource: 'none', tags: ['', ''] }

  constructor() { }

  ngOnInit(): void {this.item?.coverImageSource}
}
