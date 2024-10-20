import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from './../sidebar/sidebar.service'
import { AuthServiceService } from 'src/app/AuthService/auth-service.service';
import { AuthControllerApi } from '../../../network/openapi/apis/AuthControllerApi';  // Import the AuthService


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    providers: [
        AuthControllerApi // Provide your client API service here
      ],
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    role: string;
  
    constructor(
        public sidebarservice: SidebarService ,    
      ) { }

      getSideBarSate() {
          return this.sidebarservice.getSidebarState();
      }
  
      ngOnInit() {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
            // Remove any brackets and trim the role string
            this.role = storedRole.replace(/[\[\]]/g, '').trim();
        }
        console.log("Processed role from localStorage:", this.role);
    }

}
