import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { CreateComponent } from './components/create/create.component';
import { PlayerComponent } from './components/player/player.component';
import { TeamComponent } from './components/team/team.component';

export const routes: Routes = [
    {
        path: '',
        component: SearchComponent,
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'create',
        component: CreateComponent,
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'player/:id',
        component: PlayerComponent,
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'team/:id',
        component: TeamComponent,
        runGuardsAndResolvers: 'always'
    }
];
