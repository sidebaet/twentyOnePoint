import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyOnePointSharedModule } from '../../shared';
import { TwentyOnePointAdminModule } from '../../admin/admin.module';
import {
    BloodPressureMySuffixService,
    BloodPressureMySuffixPopupService,
    BloodPressureMySuffixComponent,
    BloodPressureMySuffixDetailComponent,
    BloodPressureMySuffixDialogComponent,
    BloodPressureMySuffixPopupComponent,
    BloodPressureMySuffixDeletePopupComponent,
    BloodPressureMySuffixDeleteDialogComponent,
    bloodPressureRoute,
    bloodPressurePopupRoute,
    BloodPressureMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...bloodPressureRoute,
    ...bloodPressurePopupRoute,
];

@NgModule({
    imports: [
        TwentyOnePointSharedModule,
        TwentyOnePointAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BloodPressureMySuffixComponent,
        BloodPressureMySuffixDetailComponent,
        BloodPressureMySuffixDialogComponent,
        BloodPressureMySuffixDeleteDialogComponent,
        BloodPressureMySuffixPopupComponent,
        BloodPressureMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        BloodPressureMySuffixComponent,
        BloodPressureMySuffixDialogComponent,
        BloodPressureMySuffixPopupComponent,
        BloodPressureMySuffixDeleteDialogComponent,
        BloodPressureMySuffixDeletePopupComponent,
    ],
    providers: [
        BloodPressureMySuffixService,
        BloodPressureMySuffixPopupService,
        BloodPressureMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointBloodPressureMySuffixModule {}
