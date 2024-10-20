import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'src/app/appModules/mat.module';
import { ProductionPlanControllerApi } from '../../../network/openapi/apis/ProductionPlanControllerApi'; // Import the service
import { ProductionPlanResponseDTO } from '../../../network/openapi/models/ProductionPlanResponseDTO'; // Import the model
import { TokenService } from '../../../network/openapi/apis/tokenService';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatModule],
  providers: [
    ProductionPlanControllerApi
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  // Arrays to store plans
  inProgressPlans: ProductionPlanResponseDTO[] = [];
  completedPlans: ProductionPlanResponseDTO[] = [];

  constructor(private productionPlanService: ProductionPlanControllerApi,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    const headers = this.tokenService.getAuthHeaders();
    // Fetch the production plans on component initialization
    this.productionPlanService.getAllProductionPlans({headers}).then((plans) => {
      // Filter the plans based on their status
      this.inProgressPlans = plans.filter(plan => plan.status === 'EN_COURS');
      this.completedPlans = plans.filter(plan => plan.status === 'TERMINE');
    });
  }
}
