/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TwentyOnePointTestModule } from '../../../test.module';
import { BloodPressureMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix-delete-dialog.component';
import { BloodPressureMySuffixService } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix.service';

describe('Component Tests', () => {

    describe('BloodPressureMySuffix Management Delete Component', () => {
        let comp: BloodPressureMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<BloodPressureMySuffixDeleteDialogComponent>;
        let service: BloodPressureMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [BloodPressureMySuffixDeleteDialogComponent],
                providers: [
                    BloodPressureMySuffixService
                ]
            })
            .overrideTemplate(BloodPressureMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BloodPressureMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BloodPressureMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
