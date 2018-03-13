import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TwentyOnePointSharedModule } from '../../shared';
import { TwentyOnePointAdminModule } from '../../admin/admin.module';
import {
    FieldsMySuffixService,
    FieldsMySuffixPopupService,
    FieldsMySuffixComponent,
    FieldsMySuffixDetailComponent,
    FieldsMySuffixDialogComponent,
    FieldsMySuffixPopupComponent,
    FieldsMySuffixDeletePopupComponent,
    FieldsMySuffixDeleteDialogComponent,
    fieldsRoute,
    fieldsPopupRoute,
    FieldsMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...fieldsRoute,
    ...fieldsPopupRoute,
];

@NgModule({
    imports: [
        TwentyOnePointSharedModule,
        TwentyOnePointAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FieldsMySuffixComponent,
        FieldsMySuffixDetailComponent,
        FieldsMySuffixDialogComponent,
        FieldsMySuffixDeleteDialogComponent,
        FieldsMySuffixPopupComponent,
        FieldsMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FieldsMySuffixComponent,
        FieldsMySuffixDialogComponent,
        FieldsMySuffixPopupComponent,
        FieldsMySuffixDeleteDialogComponent,
        FieldsMySuffixDeletePopupComponent,
    ],
    providers: [
        FieldsMySuffixService,
        FieldsMySuffixPopupService,
        FieldsMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointFieldsMySuffixModule {}
