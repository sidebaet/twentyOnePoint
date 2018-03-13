/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TwentyOnePointTestModule } from '../../../test.module';
import { WeightMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix-dialog.component';
import { WeightMySuffixService } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix.service';
import { WeightMySuffix } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix.model';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('WeightMySuffix Management Dialog Component', () => {
        let comp: WeightMySuffixDialogComponent;
        let fixture: ComponentFixture<WeightMySuffixDialogComponent>;
        let service: WeightMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [WeightMySuffixDialogComponent],
                providers: [
                    UserService,
                    WeightMySuffixService
                ]
            })
            .overrideTemplate(WeightMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeightMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeightMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WeightMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.weight = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'weightListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new WeightMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.weight = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'weightListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
