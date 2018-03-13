import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PointsMySuffixComponent } from './points-my-suffix.component';
import { PointsMySuffixDetailComponent } from './points-my-suffix-detail.component';
import { PointsMySuffixPopupComponent } from './points-my-suffix-dialog.component';
import { PointsMySuffixDeletePopupComponent } from './points-my-suffix-delete-dialog.component';

@Injectable()
export class PointsMySuffixResolvePagingParams implements Resolve<any> {

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

export const pointsRoute: Routes = [
    {
        path: 'points-my-suffix',
        component: PointsMySuffixComponent,
        resolve: {
            'pagingParams': PointsMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.points.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'points-my-suffix/:id',
        component: PointsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.points.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pointsPopupRoute: Routes = [
    {
        path: 'points-my-suffix-new',
        component: PointsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.points.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'points-my-suffix/:id/edit',
        component: PointsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.points.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'points-my-suffix/:id/delete',
        component: PointsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.points.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
