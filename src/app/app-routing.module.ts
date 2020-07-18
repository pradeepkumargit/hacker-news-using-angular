import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { CustomPreloadingStrategy } from './service/custom-preloading-strategy.service';
import { NewsHomeComponent } from './news-home/news-home.component';
 
const routes: Routes = [
    {
        path: "detail",
        loadChildren: () => import('./news-detail/news-details.module').then(m => m.NewsDetailModule),
        //data: { preload: true, delay: 5000 }
    },
    { 
        path: "home", 
        component: NewsHomeComponent
    },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
];
 
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }