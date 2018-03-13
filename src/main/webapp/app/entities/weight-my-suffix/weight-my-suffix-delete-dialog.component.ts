import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WeightMySuffix } from './weight-my-suffix.model';
import { WeightMySuffixPopupService } from './weight-my-suffix-popup.service';
import { WeightMySuffixService } from './weight-my-suffix.service';

@Component({
    selector: 'jhi-weight-my-suffix-delete-dialog',
    templateUrl: './weight-my-suffix-delete-dialog.component.html'
})
export class WeightMySuffixDeleteDialogComponent {

    weight: WeightMySuffix;

    constructor(
        private weightService: WeightMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.weightService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'weightListModification',
                content: 'Deleted an weight'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-weight-my-suffix-delete-popup',
    template: ''
})
export class WeightMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private weightPopupService: WeightMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.weightPopupService
                .open(WeightMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
