import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { CreateComponent } from './components/create/create.component';

export const routes: Routes = [
    {
        path: '',
        component: SearchComponent
    },
    {
        path: 'create',
        component: CreateComponent
    }
];
