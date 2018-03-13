/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TwentyOnePointTestModule } from '../../../test.module';
import { FieldsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/fields-my-suffix/fields-my-suffix-detail.component';
import { FieldsMySuffixService } from '../../../../../../main/webapp/app/entities/fields-my-suffix/fields-my-suffix.service';
import { FieldsMySuffix } from '../../../../../../main/webapp/app/entities/fields-my-suffix/fields-my-suffix.model';

describe('Component Tests', () => {

    describe('FieldsMySuffix Management Detail Component', () => {
        let comp: FieldsMySuffixDetailComponent;
        let fixture: ComponentFixture<FieldsMySuffixDetailComponent>;
        let service: FieldsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [FieldsMySuffixDetailComponent],
                providers: [
                    FieldsMySuffixService
                ]
            })
            .overrideTemplate(FieldsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new FieldsMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fields).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
