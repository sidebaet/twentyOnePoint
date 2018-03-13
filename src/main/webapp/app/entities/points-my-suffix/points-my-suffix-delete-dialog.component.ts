import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PointsMySuffix } from './points-my-suffix.model';
import { PointsMySuffixPopupService } from './points-my-suffix-popup.service';
import { PointsMySuffixService } from './points-my-suffix.service';

@Component({
    selector: 'jhi-points-my-suffix-delete-dialog',
    templateUrl: './points-my-suffix-delete-dialog.component.html'
})
export class PointsMySuffixDeleteDialogComponent {

    points: PointsMySuffix;

    constructor(
        private pointsService: PointsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pointsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pointsListModification',
                content: 'Deleted an points'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-points-my-suffix-delete-popup',
    template: ''
})
export class PointsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pointsPopupService: PointsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pointsPopupService
                .open(PointsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
