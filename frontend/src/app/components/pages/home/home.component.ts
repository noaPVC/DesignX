import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Design } from 'src/app/models/design.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recentDesigns: Design[] = []

  constructor(private titleService: Title, private userService: UserService) { }

  ngOnInit(): void {
    this.titleService.setTitle(`DesignX - ${this.userService.user.username}`)
  }
}
