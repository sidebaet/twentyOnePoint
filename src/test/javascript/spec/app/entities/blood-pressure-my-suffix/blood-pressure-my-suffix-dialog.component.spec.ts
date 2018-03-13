/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TwentyOnePointTestModule } from '../../../test.module';
import { BloodPressureMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix-dialog.component';
import { BloodPressureMySuffixService } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix.service';
import { BloodPressureMySuffix } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix.model';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('BloodPressureMySuffix Management Dialog Component', () => {
        let comp: BloodPressureMySuffixDialogComponent;
        let fixture: ComponentFixture<BloodPressureMySuffixDialogComponent>;
        let service: BloodPressureMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [BloodPressureMySuffixDialogComponent],
                providers: [
                    UserService,
                    BloodPressureMySuffixService
                ]
            })
            .overrideTemplate(BloodPressureMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BloodPressureMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BloodPressureMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BloodPressureMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bloodPressure = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bloodPressureListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BloodPressureMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bloodPressure = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bloodPressureListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
