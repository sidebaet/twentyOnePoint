/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { TwentyOnePointTestModule } from '../../../test.module';
import { WeightMySuffixComponent } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix.component';
import { WeightMySuffixService } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix.service';
import { WeightMySuffix } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix.model';

describe('Component Tests', () => {

    describe('WeightMySuffix Management Component', () => {
        let comp: WeightMySuffixComponent;
        let fixture: ComponentFixture<WeightMySuffixComponent>;
        let service: WeightMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [WeightMySuffixComponent],
                providers: [
                    WeightMySuffixService
                ]
            })
            .overrideTemplate(WeightMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeightMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeightMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new WeightMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.weights[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
