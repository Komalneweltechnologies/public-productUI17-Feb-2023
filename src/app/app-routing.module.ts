import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  { path: '', redirectTo: 'Product-Components', pathMatch: 'full' },
  { path: 'login', component: ProductComponent },
  // {
  //   path: '',
  //   component: DefaultLayoutComponent,
  //   children: [
  //     { path: 'monthly-calendar', component: ProductComponent },
  //     { path: 'project-dashboard', component: ProjectDashboardComponent },
  //     { path: 'sub-tasks', component: SubTasksComponent },
  //     { path: 'sub-tasks2', component: SubTasks2Component },
  //     { path: 'user-group-master', component: UserGroupMasterComponent },
  //     { path: 'category-master', component: CategoryMasterComponent },
  //     { path: 'register', component: RegisterComponent },
  //     { path: 'project-email-master', component: ProjectEmailMasterComponent },
  //   ],
  //   // canActivate: [AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
