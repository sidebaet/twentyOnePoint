import { BaseEntity } from './../../shared';

export class BloodPressureMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public dateTime?: any,
        public systolic?: number,
        public diastolic?: number,
        public userId?: number,
    ) {
    }
}
