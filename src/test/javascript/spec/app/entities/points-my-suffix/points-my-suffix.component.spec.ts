/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { TwentyOnePointTestModule } from '../../../test.module';
import { PointsMySuffixComponent } from '../../../../../../main/webapp/app/entities/points-my-suffix/points-my-suffix.component';
import { PointsMySuffixService } from '../../../../../../main/webapp/app/entities/points-my-suffix/points-my-suffix.service';
import { PointsMySuffix } from '../../../../../../main/webapp/app/entities/points-my-suffix/points-my-suffix.model';

describe('Component Tests', () => {

    describe('PointsMySuffix Management Component', () => {
        let comp: PointsMySuffixComponent;
        let fixture: ComponentFixture<PointsMySuffixComponent>;
        let service: PointsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyOnePointTestModule],
                declarations: [PointsMySuffixComponent],
                providers: [
                    PointsMySuffixService
                ]
            })
            .overrideTemplate(PointsMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PointsMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PointsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new PointsMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.points[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
