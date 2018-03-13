import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyOnePointSharedModule } from '../../shared';
import { TwentyOnePointAdminModule } from '../../admin/admin.module';
import {
    PointsMySuffixService,
    PointsMySuffixPopupService,
    PointsMySuffixComponent,
    PointsMySuffixDetailComponent,
    PointsMySuffixDialogComponent,
    PointsMySuffixPopupComponent,
    PointsMySuffixDeletePopupComponent,
    PointsMySuffixDeleteDialogComponent,
    pointsRoute,
    pointsPopupRoute,
    PointsMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pointsRoute,
    ...pointsPopupRoute,
];

@NgModule({
    imports: [
        TwentyOnePointSharedModule,
        TwentyOnePointAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PointsMySuffixComponent,
        PointsMySuffixDetailComponent,
        PointsMySuffixDialogComponent,
        PointsMySuffixDeleteDialogComponent,
        PointsMySuffixPopupComponent,
        PointsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PointsMySuffixComponent,
        PointsMySuffixDialogComponent,
        PointsMySuffixPopupComponent,
        PointsMySuffixDeleteDialogComponent,
        PointsMySuffixDeletePopupComponent,
    ],
    providers: [
        PointsMySuffixService,
        PointsMySuffixPopupService,
        PointsMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointPointsMySuffixModule {}
