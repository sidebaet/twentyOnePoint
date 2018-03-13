import { BaseEntity } from './../../shared';

export const enum Units {
    'KG',
    'LB'
}

export class FieldsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public weeklyGoal?: number,
        public weightUnits?: Units,
        public userId?: number,
    ) {
    }
}
