import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FieldsMySuffix } from './fields-my-suffix.model';
import { FieldsMySuffixService } from './fields-my-suffix.service';

@Component({
    selector: 'jhi-fields-my-suffix-detail',
    templateUrl: './fields-my-suffix-detail.component.html'
})
export class FieldsMySuffixDetailComponent implements OnInit, OnDestroy {

    fields: FieldsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fieldsService: FieldsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFields();
    }

    load(id) {
        this.fieldsService.find(id).subscribe((fields) => {
            this.fields = fields;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFields() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fieldsListModification',
            (response) => this.load(this.fields.id)
        );
    }
}
