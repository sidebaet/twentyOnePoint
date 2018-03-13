import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BloodPressureMySuffixComponent } from './blood-pressure-my-suffix.component';
import { BloodPressureMySuffixDetailComponent } from './blood-pressure-my-suffix-detail.component';
import { BloodPressureMySuffixPopupComponent } from './blood-pressure-my-suffix-dialog.component';
import { BloodPressureMySuffixDeletePopupComponent } from './blood-pressure-my-suffix-delete-dialog.component';

@Injectable()
export class BloodPressureMySuffixResolvePagingParams implements Resolve<any> {

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

export const bloodPressureRoute: Routes = [
    {
        path: 'blood-pressure-my-suffix',
        component: BloodPressureMySuffixComponent,
        resolve: {
            'pagingParams': BloodPressureMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.bloodPressure.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'blood-pressure-my-suffix/:id',
        component: BloodPressureMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.bloodPressure.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bloodPressurePopupRoute: Routes = [
    {
        path: 'blood-pressure-my-suffix-new',
        component: BloodPressureMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.bloodPressure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'blood-pressure-my-suffix/:id/edit',
        component: BloodPressureMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.bloodPressure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'blood-pressure-my-suffix/:id/delete',
        component: BloodPressureMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.bloodPressure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
