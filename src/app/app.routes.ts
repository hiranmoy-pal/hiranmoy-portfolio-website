import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/home/home').then(m => m.Home),
    },
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'about', loadComponent: () =>
            import('./pages/home/home').then(m => m.Home),
    },
    {
        path: 'skills', loadComponent: () =>
            import('./pages/home/home').then(m => m.Home),
    },
    {
        path: 'experience', loadComponent: () =>
            import('./pages/home/home').then(m => m.Home),
    },
    {
        path: 'projects', loadComponent: () =>
            import('./pages/home/home').then(m => m.Home),
    },
    {
        path: 'education', loadComponent: () =>
            import('./pages/home/home').then(m => m.Home),
    },
    {
        path: 'contact', loadComponent: () =>
            import('./pages/home/home').then(m => m.Home),
    },
    { path: '**', redirectTo: '' },
];
