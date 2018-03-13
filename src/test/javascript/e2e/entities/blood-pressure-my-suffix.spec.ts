import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('BloodPressure e2e test', () => {

    let navBarPage: NavBarPage;
    let bloodPressureDialogPage: BloodPressureDialogPage;
    let bloodPressureComponentsPage: BloodPressureComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BloodPressures', () => {
        navBarPage.goToEntity('blood-pressure-my-suffix');
        bloodPressureComponentsPage = new BloodPressureComponentsPage();
        expect(bloodPressureComponentsPage.getTitle())
            .toMatch(/twentyOnePointApp.bloodPressure.home.title/);

    });

    it('should load create BloodPressure dialog', () => {
        bloodPressureComponentsPage.clickOnCreateButton();
        bloodPressureDialogPage = new BloodPressureDialogPage();
        expect(bloodPressureDialogPage.getModalTitle())
            .toMatch(/twentyOnePointApp.bloodPressure.home.createOrEditLabel/);
        bloodPressureDialogPage.close();
    });

    it('should create and save BloodPressures', () => {
        bloodPressureComponentsPage.clickOnCreateButton();
        bloodPressureDialogPage.setDateTimeInput('2000-12-31');
        expect(bloodPressureDialogPage.getDateTimeInput()).toMatch('2000-12-31');
        bloodPressureDialogPage.setSystolicInput('5');
        expect(bloodPressureDialogPage.getSystolicInput()).toMatch('5');
        bloodPressureDialogPage.setDiastolicInput('5');
        expect(bloodPressureDialogPage.getDiastolicInput()).toMatch('5');
        bloodPressureDialogPage.userSelectLastOption();
        bloodPressureDialogPage.save();
        expect(bloodPressureDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BloodPressureComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-blood-pressure-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BloodPressureDialogPage {
    modalTitle = element(by.css('h4#myBloodPressureLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dateTimeInput = element(by.css('input#field_dateTime'));
    systolicInput = element(by.css('input#field_systolic'));
    diastolicInput = element(by.css('input#field_diastolic'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDateTimeInput = function(dateTime) {
        this.dateTimeInput.sendKeys(dateTime);
    }

    getDateTimeInput = function() {
        return this.dateTimeInput.getAttribute('value');
    }

    setSystolicInput = function(systolic) {
        this.systolicInput.sendKeys(systolic);
    }

    getSystolicInput = function() {
        return this.systolicInput.getAttribute('value');
    }

    setDiastolicInput = function(diastolic) {
        this.diastolicInput.sendKeys(diastolic);
    }

    getDiastolicInput = function() {
        return this.diastolicInput.getAttribute('value');
    }

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function() {
        return this.userSelect;
    }

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}