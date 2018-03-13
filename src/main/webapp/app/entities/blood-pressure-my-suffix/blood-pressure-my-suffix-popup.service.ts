import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BloodPressureMySuffix } from './blood-pressure-my-suffix.model';
import { BloodPressureMySuffixService } from './blood-pressure-my-suffix.service';

@Injectable()
export class BloodPressureMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private bloodPressureService: BloodPressureMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.bloodPressureService.find(id).subscribe((bloodPressure) => {
                    if (bloodPressure.dateTime) {
                        bloodPressure.dateTime = {
                            year: bloodPressure.dateTime.getFullYear(),
                            month: bloodPressure.dateTime.getMonth() + 1,
                            day: bloodPressure.dateTime.getDate()
                        };
                    }
                    this.ngbModalRef = this.bloodPressureModalRef(component, bloodPressure);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.bloodPressureModalRef(component, new BloodPressureMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    bloodPressureModalRef(component: Component, bloodPressure: BloodPressureMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bloodPressure = bloodPressure;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
