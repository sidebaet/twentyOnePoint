/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TwentyOnePointTestModule } from '../../../test.module';
import { PointsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/points-my-suffix/points-my-suffix-detail.component';
import { PointsMySuffixService } from '../../../../../../main/webapp/app/entities/points-my-suffix/points-my-suffix.service';
import { PointsMySuffix } from '../../../../../../main/webapp/app/entities/points-my-suffix/points-my-suffix.model';

describe('Component Tests', () => {

    describe('PointsMySuffix Management Detail Component', () => {
        let comp: PointsMySuffixDetailComponent;
        let fixture: ComponentFixture<PointsMySuffixDetailComponent>;
        let service: PointsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [PointsMySuffixDetailComponent],
                providers: [
                    PointsMySuffixService
                ]
            })
            .overrideTemplate(PointsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PointsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PointsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new PointsMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.points).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
