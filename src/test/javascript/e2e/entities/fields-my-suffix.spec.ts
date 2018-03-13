import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Fields e2e test', () => {

    let navBarPage: NavBarPage;
    let fieldsDialogPage: FieldsDialogPage;
    let fieldsComponentsPage: FieldsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Fields', () => {
        navBarPage.goToEntity('fields-my-suffix');
        fieldsComponentsPage = new FieldsComponentsPage();
        expect(fieldsComponentsPage.getTitle())
            .toMatch(/twentyOnePointApp.fields.home.title/);

    });

    it('should load create Fields dialog', () => {
        fieldsComponentsPage.clickOnCreateButton();
        fieldsDialogPage = new FieldsDialogPage();
        expect(fieldsDialogPage.getModalTitle())
            .toMatch(/twentyOnePointApp.fields.home.createOrEditLabel/);
        fieldsDialogPage.close();
    });

    it('should create and save Fields', () => {
        fieldsComponentsPage.clickOnCreateButton();
        fieldsDialogPage.setWeeklyGoalInput('5');
        expect(fieldsDialogPage.getWeeklyGoalInput()).toMatch('5');
        fieldsDialogPage.weightUnitsSelectLastOption();
        fieldsDialogPage.userSelectLastOption();
        fieldsDialogPage.save();
        expect(fieldsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class FieldsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-fields-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FieldsDialogPage {
    modalTitle = element(by.css('h4#myFieldsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    weeklyGoalInput = element(by.css('input#field_weeklyGoal'));
    weightUnitsSelect = element(by.css('select#field_weightUnits'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setWeeklyGoalInput = function(weeklyGoal) {
        this.weeklyGoalInput.sendKeys(weeklyGoal);
    }

    getWeeklyGoalInput = function() {
        return this.weeklyGoalInput.getAttribute('value');
    }

    setWeightUnitsSelect = function(weightUnits) {
        this.weightUnitsSelect.sendKeys(weightUnits);
    }

    getWeightUnitsSelect = function() {
        return this.weightUnitsSelect.element(by.css('option:checked')).getText();
    }

    weightUnitsSelectLastOption = function() {
        this.weightUnitsSelect.all(by.tagName('option')).last().click();
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
