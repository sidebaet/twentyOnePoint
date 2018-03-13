import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FieldsMySuffix } from './fields-my-suffix.model';
import { FieldsMySuffixPopupService } from './fields-my-suffix-popup.service';
import { FieldsMySuffixService } from './fields-my-suffix.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-fields-my-suffix-dialog',
    templateUrl: './fields-my-suffix-dialog.component.html'
})
export class FieldsMySuffixDialogComponent implements OnInit {

    fields: FieldsMySuffix;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fieldsService: FieldsMySuffixService,
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
        if (this.fields.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fieldsService.update(this.fields));
        } else {
            this.subscribeToSaveResponse(
                this.fieldsService.create(this.fields));
        }
    }

    private subscribeToSaveResponse(result: Observable<FieldsMySuffix>) {
        result.subscribe((res: FieldsMySuffix) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FieldsMySuffix) {
        this.eventManager.broadcast({ name: 'fieldsListModification', content: 'OK'});
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
    selector: 'jhi-fields-my-suffix-popup',
    template: ''
})
export class FieldsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fieldsPopupService: FieldsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fieldsPopupService
                    .open(FieldsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.fieldsPopupService
                    .open(FieldsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
