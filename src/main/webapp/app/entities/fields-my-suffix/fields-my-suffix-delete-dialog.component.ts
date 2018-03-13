import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FieldsMySuffix } from './fields-my-suffix.model';
import { FieldsMySuffixPopupService } from './fields-my-suffix-popup.service';
import { FieldsMySuffixService } from './fields-my-suffix.service';

@Component({
    selector: 'jhi-fields-my-suffix-delete-dialog',
    templateUrl: './fields-my-suffix-delete-dialog.component.html'
})
export class FieldsMySuffixDeleteDialogComponent {

    fields: FieldsMySuffix;

    constructor(
        private fieldsService: FieldsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fieldsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fieldsListModification',
                content: 'Deleted an fields'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fields-my-suffix-delete-popup',
    template: ''
})
export class FieldsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fieldsPopupService: FieldsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fieldsPopupService
                .open(FieldsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
