/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TwentyOnePointTestModule } from '../../../test.module';
import { FieldsMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/fields-my-suffix/fields-my-suffix-dialog.component';
import { FieldsMySuffixService } from '../../../../../../main/webapp/app/entities/fields-my-suffix/fields-my-suffix.service';
import { FieldsMySuffix } from '../../../../../../main/webapp/app/entities/fields-my-suffix/fields-my-suffix.model';
import { UserService } from '../../../../../../main/webapp/app/shared';

describe('Component Tests', () => {

    describe('FieldsMySuffix Management Dialog Component', () => {
        let comp: FieldsMySuffixDialogComponent;
        let fixture: ComponentFixture<FieldsMySuffixDialogComponent>;
        let service: FieldsMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [FieldsMySuffixDialogComponent],
                providers: [
                    UserService,
                    FieldsMySuffixService
                ]
            })
            .overrideTemplate(FieldsMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldsMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldsMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldsMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.fields = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FieldsMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.fields = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fieldsListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
