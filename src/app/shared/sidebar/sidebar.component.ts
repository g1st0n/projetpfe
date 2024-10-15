import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from './../sidebar/sidebar.service'
import { AuthServiceService } from 'src/app/AuthService/auth-service.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    role: string;
  
    constructor(public sidebarservice: SidebarService ,private authService: AuthServiceService
      ) { }

      getSideBarSate() {
          return this.sidebarservice.getSidebarState();
      }
  
    ngOnInit() {
        this.role = this.authService.getUserRole();
    }

}
