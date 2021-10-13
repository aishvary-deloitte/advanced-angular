import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  {
    path: '',
    loadChildren:()=>import('src/app/course/course.module').then(m => m.CourseModule)
  },
  {
    path: 'profile',
    loadChildren:()=>import('src/app/profile/profile.module').then(m => m.ProfileModule)
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
