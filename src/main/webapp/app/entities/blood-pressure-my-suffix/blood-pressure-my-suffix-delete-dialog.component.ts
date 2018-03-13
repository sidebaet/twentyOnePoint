import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BloodPressureMySuffix } from './blood-pressure-my-suffix.model';
import { BloodPressureMySuffixPopupService } from './blood-pressure-my-suffix-popup.service';
import { BloodPressureMySuffixService } from './blood-pressure-my-suffix.service';

@Component({
    selector: 'jhi-blood-pressure-my-suffix-delete-dialog',
    templateUrl: './blood-pressure-my-suffix-delete-dialog.component.html'
})
export class BloodPressureMySuffixDeleteDialogComponent {

    bloodPressure: BloodPressureMySuffix;

    constructor(
        private bloodPressureService: BloodPressureMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bloodPressureService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bloodPressureListModification',
                content: 'Deleted an bloodPressure'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-blood-pressure-my-suffix-delete-popup',
    template: ''
})
export class BloodPressureMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bloodPressurePopupService: BloodPressureMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bloodPressurePopupService
                .open(BloodPressureMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
