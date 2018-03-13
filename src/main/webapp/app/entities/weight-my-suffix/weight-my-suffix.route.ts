import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { WeightMySuffixComponent } from './weight-my-suffix.component';
import { WeightMySuffixDetailComponent } from './weight-my-suffix-detail.component';
import { WeightMySuffixPopupComponent } from './weight-my-suffix-dialog.component';
import { WeightMySuffixDeletePopupComponent } from './weight-my-suffix-delete-dialog.component';

@Injectable()
export class WeightMySuffixResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const weightRoute: Routes = [
    {
        path: 'weight-my-suffix',
        component: WeightMySuffixComponent,
        resolve: {
            'pagingParams': WeightMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.weight.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'weight-my-suffix/:id',
        component: WeightMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.weight.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const weightPopupRoute: Routes = [
    {
        path: 'weight-my-suffix-new',
        component: WeightMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.weight.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'weight-my-suffix/:id/edit',
        component: WeightMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.weight.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'weight-my-suffix/:id/delete',
        component: WeightMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.weight.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
