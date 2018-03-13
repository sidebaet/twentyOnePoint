/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TwentyOnePointTestModule } from '../../../test.module';
import { WeightMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix-delete-dialog.component';
import { WeightMySuffixService } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix.service';

describe('Component Tests', () => {

    describe('WeightMySuffix Management Delete Component', () => {
        let comp: WeightMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<WeightMySuffixDeleteDialogComponent>;
        let service: WeightMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [WeightMySuffixDeleteDialogComponent],
                providers: [
                    WeightMySuffixService
                ]
            })
            .overrideTemplate(WeightMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeightMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeightMySuffixService);
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
