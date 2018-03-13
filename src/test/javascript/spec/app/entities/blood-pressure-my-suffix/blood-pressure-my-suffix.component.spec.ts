/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { TwentyOnePointTestModule } from '../../../test.module';
import { BloodPressureMySuffixComponent } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix.component';
import { BloodPressureMySuffixService } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix.service';
import { BloodPressureMySuffix } from '../../../../../../main/webapp/app/entities/blood-pressure-my-suffix/blood-pressure-my-suffix.model';

describe('Component Tests', () => {

    describe('BloodPressureMySuffix Management Component', () => {
        let comp: BloodPressureMySuffixComponent;
        let fixture: ComponentFixture<BloodPressureMySuffixComponent>;
        let service: BloodPressureMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [BloodPressureMySuffixComponent],
                providers: [
                    BloodPressureMySuffixService
                ]
            })
            .overrideTemplate(BloodPressureMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BloodPressureMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BloodPressureMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BloodPressureMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bloodPressures[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
