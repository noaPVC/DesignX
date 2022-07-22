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
  @Input() item: Design = { metadata: { _userId: 'none', createdAt: '-', creatorImageSource: 'none', creatorName: 'usernotfound', hasAccess: false }, _id: 'string', caption: 'none', description: 'none', coverImageSource: 'none', tags: ['', ''] }

  constructor() { }

  ngOnInit(): void {
    this.backgroundSource = environment.baseUrl.concat(this.item.coverImageSource)
  }
}
