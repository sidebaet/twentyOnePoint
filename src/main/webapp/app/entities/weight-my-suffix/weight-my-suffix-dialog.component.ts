import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { WeightMySuffix } from './weight-my-suffix.model';
import { WeightMySuffixPopupService } from './weight-my-suffix-popup.service';
import { WeightMySuffixService } from './weight-my-suffix.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-weight-my-suffix-dialog',
    templateUrl: './weight-my-suffix-dialog.component.html'
})
export class WeightMySuffixDialogComponent implements OnInit {

    weight: WeightMySuffix;
    isSaving: boolean;

    users: User[];
    dateTimeDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private weightService: WeightMySuffixService,
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
        if (this.weight.id !== undefined) {
            this.subscribeToSaveResponse(
                this.weightService.update(this.weight));
        } else {
            this.subscribeToSaveResponse(
                this.weightService.create(this.weight));
        }
    }

    private subscribeToSaveResponse(result: Observable<WeightMySuffix>) {
        result.subscribe((res: WeightMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: WeightMySuffix) {
        this.eventManager.broadcast({ name: 'weightListModification', content: 'OK'});
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
    selector: 'jhi-weight-my-suffix-popup',
    template: ''
})
export class WeightMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private weightPopupService: WeightMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.weightPopupService
                    .open(WeightMySuffixDialogComponent as Component, params['id']);
            } else {
                this.weightPopupService
                    .open(WeightMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
