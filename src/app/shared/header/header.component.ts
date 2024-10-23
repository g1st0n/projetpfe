import { Component, OnInit, ViewChild } from '@angular/core';
import { AppIcon } from './app-icon';
import { SidebarService } from './../sidebar/sidebar.service'
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { UserControllerApi, UserResponseDTO } from 'src/network/openapi';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/network/openapi/apis/tokenService';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [
    UserControllerApi
  ],
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  displayedColumns: string[] = [ 'logo','logoType','firstName','logoName','tel', 'status'];
  selection = new SelectionModel<UserResponseDTO>(true, []);
  dataSource: MatTableDataSource<UserResponseDTO>;
  users: UserResponseDTO[] = [];
  user: UserResponseDTO ;
  totalItems = 0; // To store the total number of products (for paginator)
  pageSize = 10; // Default page size
  pageIndex = 0; // Default to the first page

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

constructor(   
   public dialog: MatDialog,
  private tokenService: TokenService,
  private userService: UserControllerApi ,
  private router: Router,
  public sidebarservice: SidebarService 
){
  this.dataSource = new MatTableDataSource();
}
  

  theme_name = 'dark_mode'

  toggleSearch: boolean = false;

  darkMode() {
    
    if(this.theme_name == 'light_mode' ) {
      document.querySelector("html").classList.replace('dark_mode' , 'light_mode');
      this.theme_name = 'dark_mode'
      
    } else if(this.theme_name == 'dark_mode' ) {
      document.querySelector("html").classList.replace('light_mode' , 'dark_mode');
      this.theme_name = 'light_mode'

    }
     return this.theme_name;
  }

  getSideBarSate() {
    return this.sidebarservice.getSidebarState();
  }
  

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  openSearch() {
    this.toggleSearch = true;
  }

  searchClose() {
    this.toggleSearch = false;
  }


  

  


  ngOnInit() {
    this.fetchAuthenticatedUser();
  }


  fetchAuthenticatedUser(): void {
    const headers = this.tokenService.getAuthHeaders(); // Ensure the token is correct and valid
    headers['Content-Type'] = 'application/json';
    this.userService.getAuthenticatedUser({ headers })
      .then((response: any) => {
        this.user = response;  // Map the response to the user object
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        // Handle token expiration or invalid token error
          console.log('Unauthorized. Redirecting to login...');
          this.router.navigate(['/auth/sign-in']);
      });
  }  

  logout(){
    this.router.navigate(['/auth/sign-in']);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
  }
}
