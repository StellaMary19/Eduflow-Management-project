import { Routes } from '@angular/router';
import {Login} from './features/auth/pages/login/login';
import { authGaurd } from './core/gaurds/auth-gaurd';
export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full',
    },{
        path:'login',
        component:Login
    },
    {
        path:'dashboard',
        loadComponent : () => 
            import('./features/auth/pages/dashboard/dashboard').then(m  => m.Dashboard),
        canActivate : [authGaurd]
    },
    {
        path:'students',
        loadChildren : () => 
            import('./features/students/student.routes')
        .then(m => m.studentRoutes),
        canActivate : [authGaurd]
    }
];
