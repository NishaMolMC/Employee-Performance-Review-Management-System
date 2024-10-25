import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';

// Import components
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component'; // Import RegistrationComponent
import { AssignReviewsComponent } from './admin/assign-reviews/assign-reviews.component';
import { ManageEmployeesComponent } from './admin/manage-employees/manage-employees.component';
import { ManageReviewsComponent } from './admin/manage-reviews/manage-reviews.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './dashboard/employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'register', component: RegistrationComponent }, // Registration route
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard], // Protect route
    data: { expectedRole: 'admin' }, // Expected role for access
  },
  {
    path: 'employee-dashboard',
    component: EmployeeDashboardComponent,
    canActivate: [AuthGuard, RoleGuard], // Protect route
    data: { expectedRole: 'employee' }, // Expected role for access
  },
  // Admin-specific routes with role protection
  { 
    path: 'manage-employees', 
    component: ManageEmployeesComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { expectedRole: 'admin' } 
  },
  { 
    path: 'manage-reviews', 
    component: ManageReviewsComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { expectedRole: 'admin' } 
  },
  { 
    path: 'assign-reviews', 
    component: AssignReviewsComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { expectedRole: 'admin' } 
  },
  { path: '**', redirectTo: '/login' } // Wildcard route to redirect to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}