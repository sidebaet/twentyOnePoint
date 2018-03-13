/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TwentyOnePointTestModule } from '../../../test.module';
import { WeightMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix-detail.component';
import { WeightMySuffixService } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix.service';
import { WeightMySuffix } from '../../../../../../main/webapp/app/entities/weight-my-suffix/weight-my-suffix.model';

describe('Component Tests', () => {

    describe('WeightMySuffix Management Detail Component', () => {
        let comp: WeightMySuffixDetailComponent;
        let fixture: ComponentFixture<WeightMySuffixDetailComponent>;
        let service: WeightMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [WeightMySuffixDetailComponent],
                providers: [
                    WeightMySuffixService
                ]
            })
            .overrideTemplate(WeightMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeightMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeightMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new WeightMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.weight).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
