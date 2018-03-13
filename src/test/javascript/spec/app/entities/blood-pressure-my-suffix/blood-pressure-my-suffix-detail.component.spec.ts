/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TwentyOnePointTestModule } from '../../../test.module';
import { BloodPressureMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix-detail.component';
import { BloodPressureMySuffixService } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix.service';
import { BloodPressureMySuffix } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix.model';

describe('Component Tests', () => {

    describe('BloodPressureMySuffix Management Detail Component', () => {
        let comp: BloodPressureMySuffixDetailComponent;
        let fixture: ComponentFixture<BloodPressureMySuffixDetailComponent>;
        let service: BloodPressureMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [BloodPressureMySuffixDetailComponent],
                providers: [
                    BloodPressureMySuffixService
                ]
            })
            .overrideTemplate(BloodPressureMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BloodPressureMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BloodPressureMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BloodPressureMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bloodPressure).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
