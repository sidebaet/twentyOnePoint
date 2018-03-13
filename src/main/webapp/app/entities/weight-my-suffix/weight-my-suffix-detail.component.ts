import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WeightMySuffix } from './weight-my-suffix.model';
import { WeightMySuffixService } from './weight-my-suffix.service';

@Component({
    selector: 'jhi-weight-my-suffix-detail',
    templateUrl: './weight-my-suffix-detail.component.html'
})
export class WeightMySuffixDetailComponent implements OnInit, OnDestroy {

    weight: WeightMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private weightService: WeightMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWeights();
    }

    load(id) {
        this.weightService.find(id).subscribe((weight) => {
            this.weight = weight;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWeights() {
        this.eventSubscriber = this.eventManager.subscribe(
            'weightListModification',
            (response) => this.load(this.weight.id)
        );
    }
}
