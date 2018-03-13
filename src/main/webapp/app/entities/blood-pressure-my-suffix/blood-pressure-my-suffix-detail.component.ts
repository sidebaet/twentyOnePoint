import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BloodPressureMySuffix } from './blood-pressure-my-suffix.model';
import { BloodPressureMySuffixService } from './blood-pressure-my-suffix.service';

@Component({
    selector: 'jhi-blood-pressure-my-suffix-detail',
    templateUrl: './blood-pressure-my-suffix-detail.component.html'
})
export class BloodPressureMySuffixDetailComponent implements OnInit, OnDestroy {

    bloodPressure: BloodPressureMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bloodPressureService: BloodPressureMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBloodPressures();
    }

    load(id) {
        this.bloodPressureService.find(id).subscribe((bloodPressure) => {
            this.bloodPressure = bloodPressure;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBloodPressures() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bloodPressureListModification',
            (response) => this.load(this.bloodPressure.id)
        );
    }
}
