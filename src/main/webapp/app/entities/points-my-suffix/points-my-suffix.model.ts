import { BaseEntity } from './../../shared';

export class PointsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public exercise?: number,
        public meals?: number,
        public alcohol?: number,
        public notes?: string,
        public userId?: number,
    ) {
    }
}
