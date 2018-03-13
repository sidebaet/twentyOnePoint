/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { TwentyOnePointTestModule } from '../../../test.module';
import { FieldsMySuffixComponent } from '../../../../../../main/webapp/app/entities/fields-my-suffix/fields-my-suffix.component';
import { FieldsMySuffixService } from '../../../../../../main/webapp/app/entities/fields-my-suffix/fields-my-suffix.service';
import { FieldsMySuffix } from '../../../../../../main/webapp/app/entities/fields-my-suffix/fields-my-suffix.model';

describe('Component Tests', () => {

    describe('FieldsMySuffix Management Component', () => {
        let comp: FieldsMySuffixComponent;
        let fixture: ComponentFixture<FieldsMySuffixComponent>;
        let service: FieldsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [FieldsMySuffixComponent],
                providers: [
                    FieldsMySuffixService
                ]
            })
            .overrideTemplate(FieldsMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FieldsMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FieldsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new FieldsMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fields[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
