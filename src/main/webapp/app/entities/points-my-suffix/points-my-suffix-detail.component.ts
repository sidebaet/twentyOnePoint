import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PointsMySuffix } from './points-my-suffix.model';
import { PointsMySuffixService } from './points-my-suffix.service';

@Component({
    selector: 'jhi-points-my-suffix-detail',
    templateUrl: './points-my-suffix-detail.component.html'
})
export class PointsMySuffixDetailComponent implements OnInit, OnDestroy {

    points: PointsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pointsService: PointsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPoints();
    }

    load(id) {
        this.pointsService.find(id).subscribe((points) => {
            this.points = points;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPoints() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pointsListModification',
            (response) => this.load(this.points.id)
        );
    }
}
