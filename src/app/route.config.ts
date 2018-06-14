import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatchesComponent } from './matches/matches.component';
import { AuthGuardService } from './auth-guard.service';
import { RulesComponent } from './rules/rules.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'matches',
        component: MatchesComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'rules',
        component: RulesComponent,
        canActivate: [AuthGuardService]
    }
];
