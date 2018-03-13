import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FieldsMySuffixComponent } from './fields-my-suffix.component';
import { FieldsMySuffixDetailComponent } from './fields-my-suffix-detail.component';
import { FieldsMySuffixPopupComponent } from './fields-my-suffix-dialog.component';
import { FieldsMySuffixDeletePopupComponent } from './fields-my-suffix-delete-dialog.component';

@Injectable()
export class FieldsMySuffixResolvePagingParams implements Resolve<any> {

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

export const fieldsRoute: Routes = [
    {
        path: 'fields-my-suffix',
        component: FieldsMySuffixComponent,
        resolve: {
            'pagingParams': FieldsMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.fields.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fields-my-suffix/:id',
        component: FieldsMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.fields.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fieldsPopupRoute: Routes = [
    {
        path: 'fields-my-suffix-new',
        component: FieldsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.fields.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fields-my-suffix/:id/edit',
        component: FieldsMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.fields.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fields-my-suffix/:id/delete',
        component: FieldsMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyOnePointApp.fields.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
