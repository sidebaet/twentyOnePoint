import { BaseEntity } from './../../shared';

export class WeightMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public dateTime?: any,
        public weight?: number,
        public userId?: number,
    ) {
    }
}
