import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Design } from 'src/app/models/design.model';
import { DesignsService } from 'src/app/services/design-services/designs/designs.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recentDesigns: Design[] = []

  constructor(private titleService: Title, private userService: UserService, private designsService: DesignsService) { }

  ngOnInit(): void {
    this.titleService.setTitle(`DesignX - ${this.userService.user.username}`)

    this.designsService.recentDesigns().subscribe(designs => console.log(designs))
  }
}
