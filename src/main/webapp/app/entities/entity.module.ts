import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TwentyOnePointPointsMySuffixModule } from './points-my-suffix/points-my-suffix.module';
import { TwentyOnePointWeightMySuffixModule } from './weight-my-suffix/weight-my-suffix.module';
import { TwentyOnePointBloodPressureMySuffixModule } from './blood-pressure-my-suffix/blood-pressure-my-suffix.module';
import { TwentyOnePointFieldsMySuffixModule } from './fields-my-suffix/fields-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TwentyOnePointPointsMySuffixModule,
        TwentyOnePointWeightMySuffixModule,
        TwentyOnePointBloodPressureMySuffixModule,
        TwentyOnePointFieldsMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointEntityModule {}
