import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyOnePointSharedModule } from '../../shared';
import { TwentyOnePointAdminModule } from '../../admin/admin.module';
import {
    WeightMySuffixService,
    WeightMySuffixPopupService,
    WeightMySuffixComponent,
    WeightMySuffixDetailComponent,
    WeightMySuffixDialogComponent,
    WeightMySuffixPopupComponent,
    WeightMySuffixDeletePopupComponent,
    WeightMySuffixDeleteDialogComponent,
    weightRoute,
    weightPopupRoute,
    WeightMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...weightRoute,
    ...weightPopupRoute,
];

@NgModule({
    imports: [
        TwentyOnePointSharedModule,
        TwentyOnePointAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WeightMySuffixComponent,
        WeightMySuffixDetailComponent,
        WeightMySuffixDialogComponent,
        WeightMySuffixDeleteDialogComponent,
        WeightMySuffixPopupComponent,
        WeightMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        WeightMySuffixComponent,
        WeightMySuffixDialogComponent,
        WeightMySuffixPopupComponent,
        WeightMySuffixDeleteDialogComponent,
        WeightMySuffixDeletePopupComponent,
    ],
    providers: [
        WeightMySuffixService,
        WeightMySuffixPopupService,
        WeightMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointWeightMySuffixModule {}
