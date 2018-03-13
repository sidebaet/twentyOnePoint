import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BloodPressureMySuffix } from './blood-pressure-my-suffix.model';
import { BloodPressureMySuffixPopupService } from './blood-pressure-my-suffix-popup.service';
import { BloodPressureMySuffixService } from './blood-pressure-my-suffix.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-blood-pressure-my-suffix-dialog',
    templateUrl: './blood-pressure-my-suffix-dialog.component.html'
})
export class BloodPressureMySuffixDialogComponent implements OnInit {

    bloodPressure: BloodPressureMySuffix;
    isSaving: boolean;

    users: User[];
    dateTimeDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bloodPressureService: BloodPressureMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bloodPressure.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bloodPressureService.update(this.bloodPressure));
        } else {
            this.subscribeToSaveResponse(
                this.bloodPressureService.create(this.bloodPressure));
        }
    }

    private subscribeToSaveResponse(result: Observable<BloodPressureMySuffix>) {
        result.subscribe((res: BloodPressureMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: BloodPressureMySuffix) {
        this.eventManager.broadcast({ name: 'bloodPressureListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-blood-pressure-my-suffix-popup',
    template: ''
})
export class BloodPressureMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bloodPressurePopupService: BloodPressureMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bloodPressurePopupService
                    .open(BloodPressureMySuffixDialogComponent as Component, params['id']);
            } else {
                this.bloodPressurePopupService
                    .open(BloodPressureMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
