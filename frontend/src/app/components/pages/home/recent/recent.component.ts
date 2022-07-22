import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Design } from 'src/app/models/design.model';
import { DesignsService } from 'src/app/services/design-services/designs/designs.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'home-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {
  recents: Design[] = []

  constructor(private router: Router, private designsService: DesignsService, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.designsService.recentDesigns().subscribe(designs => this.recents = designs)
  }

  navigateGallery() {
    this.router.navigateByUrl('/dashboard/gallery')
  }
}
