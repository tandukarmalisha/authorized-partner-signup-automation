import type {Page,Locator} from "@playwright/test";
import {expect} from "@playwright/test";
export class signUpPage{
    readonly page:Page;
    readonly signUp:Locator;
    readonly termsAndConditionCheckbox:Locator;
readonly continueButton:Locator;
readonly firstName:Locator;
readonly lastName:Locator;
readonly email:Locator;
readonly phone:Locator;
readonly password:Locator;
readonly confirmPassword:Locator;
readonly nextButton:Locator;
readonly verificationInput:Locator;
readonly verifyButton:Locator;
readonly agencyName: Locator;
readonly roleInAgency: Locator;
readonly agencyEmail: Locator;
readonly website: Locator;
readonly address: Locator;
readonly region: Locator;
readonly nextAgencyButton: Locator;
readonly yearsOfExperience: Locator;
readonly studentsRecruited: Locator;
readonly focusArea: Locator;
readonly successMetrics: Locator;
readonly careerCounseling: Locator;
readonly admissionApplications: Locator;
readonly visaProcessing: Locator;
readonly testPreparation: Locator;
readonly professionalNextButton: Locator;
readonly registrationNumber: Locator;
readonly preferredCountry: Locator;
readonly universities: Locator;
readonly colleges: Locator;
readonly vocationalSchool: Locator;
readonly other: Locator;
readonly certification: Locator;
readonly uploadInputs: Locator;
readonly submitButton: Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.signUp=this.page.getByRole('link', { name: 'Sign Up' });
        this.termsAndConditionCheckbox = page.getByRole("checkbox");
        this.continueButton=this.page.getByRole('button', { name: 'Continue' });
        this.firstName=this.page.getByRole('textbox', { name: 'First Name' });
        this.lastName=this.page.getByRole('textbox', { name: 'Last Name' });
        this.email=this.page.getByRole('textbox', { name: 'Email Address' });
        this.phone=this.page.getByRole('textbox', { name: 'Phone Number' });
        this.password=this.page.locator('[name="password"]');
        this.confirmPassword=this.page.locator('[name="confirmPassword"]');
        this.nextButton=this.page.getByRole('button', { name: 'Next' });
        this.verificationInput = this.page.locator('input[data-input-otp="true"]');
        this.verifyButton = this.page.getByRole('button', { name: 'Verify Code',});
        this.agencyName = page.getByRole('textbox', { name: 'Name' });
        this.roleInAgency = page.getByRole('textbox', { name: 'Role in Agency' })
        this.agencyEmail = page.getByRole('textbox', { name: 'Email Address' })
        this.website = page.getByRole('textbox', { name: 'Website' })
        this.address = page.getByLabel('Address', { exact: true })
        this.region = page.getByText('Select Your Region of Operation', { exact: true })
        this.nextAgencyButton = page.getByRole('button', { name: 'Next' })
        this.yearsOfExperience = page.getByRole('combobox', { name: 'Years of Experience' })
        this.studentsRecruited = page.locator('input[name="number_of_students_recruited_annually"]')
        this.focusArea = page.getByRole('textbox', { name: 'Focus Area' })
        this.successMetrics = page.locator('input[name="success_metrics"]')
        this.careerCounseling = page.getByRole('checkbox', { name: 'Career Counseling' })
        this.admissionApplications = page.getByRole('checkbox', { name: 'Admission Applications' })
        this.visaProcessing = page.getByRole('checkbox', { name: 'Visa Processing' })
        this.testPreparation = page.getByRole('checkbox', { name: 'Test Prepration' })
        this.professionalNextButton = page.getByRole('button', { name: 'Next'})
        this.registrationNumber = page.getByRole('textbox', { name: 'Business Registration Number' })
        this.preferredCountry = page.getByText('Select Your Preferred Countries', { exact: true })
        this.universities = page.getByRole('checkbox', { name: 'Universities' })
        this.colleges = page.getByRole('checkbox', { name: 'Colleges' })
        this.vocationalSchool = page.getByRole('checkbox', { name: 'Vocational School' })
        this.other = page.getByRole('checkbox', { name: 'Other' })
        this.certification = page.getByRole('textbox', { name: 'Certification Details (Optional)' })
        this.uploadInputs = page.locator('input[type="file"]');
        this.submitButton = page.getByRole('button', { name: 'Submit' })
    }
    async goToPage()
    {
        await this.page.goto("https://authorized-partner.vercel.app/login");
    }
    async clickSignUp(){
    await this.signUp.click();
    await this.page.waitForURL("https://authorized-partner.vercel.app/register");
    }
    async clickTermsAndConditionCheckbox(){
        await this.page.waitForTimeout(5000);
        await this.termsAndConditionCheckbox.click();
        await this.termsAndConditionCheckbox.isChecked();
        await expect(this.continueButton).toBeEnabled();
        await this.continueButton.click();
        await this.page.waitForURL("https://authorized-partner.vercel.app/register?step=setup");
    }
    async setUpData(firstName:string,lastName:string,email:string,phone:string,password:string,confirmPassword:string){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.phone.fill(phone);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
        await this.nextButton.click();
        await this.page.waitForURL("https://authorized-partner.vercel.app/register?step=setup");
    }
    async enterVerificationCode(code: string) {
        await this.verificationInput.fill(code);
        await this.verifyButton.click();
      }

      //Agency part
      async fillAgencyDetails(
        agencyName: string,
        role: string,
        agencyEmail: string,
        website: string,
        address: string,
        region: string
    ) {
        await this.agencyName.fill(agencyName);
        await this.roleInAgency.fill(role);
        await this.agencyEmail.fill(agencyEmail);
        await this.website.fill(website);
        await this.address.fill(address);
    
        await this.region.click();
        await this.page.getByText(region, { exact: true }).click();
    
        await this.nextAgencyButton.click();
    
        await this.page.waitForURL("https://authorized-partner.vercel.app/register?step=details");
    }

//professional part

    async fillProfessionalExperience(
         experience: string,
         students: string,
         focus: string,
         success: string
    ) {

    // Years of experience
    await this.yearsOfExperience.click();
    await this.page.getByRole('option', { name: experience }).click();
    await this.studentsRecruited.fill(students);

    await this.focusArea.fill(focus);

    await this.successMetrics.fill(success);

    // Select services
    await this.careerCounseling.check();
    await this.admissionApplications.check();
    await this.visaProcessing.check();

    await this.professionalNextButton.click();

    await this.page.waitForURL('https://authorized-partner.vercel.app/register?step=professional-experience');
}

async fillVerificationDetails(
    registration: string,
    country: string,
    certification: string
  ) {
    await this.registrationNumber.fill(registration);
  
    // Country dropdown
    await this.preferredCountry.click();
    await this.page.getByText(country, { exact: true }).click();
  
    // Institution types
    await this.universities.check();
    await this.colleges.check();
  
    await this.certification.fill(certification);
    // Upload files
    await this.uploadInputs.nth(0).setInputFiles("test-data/sample.pdf");
    await this.uploadInputs.nth(1).setInputFiles("test-data/sample.pdf");
  
    await this.submitButton.click();

    await this.page.waitForURL('https://authorized-partner.vercel.app/admin/profile');
    await this.page.pause();
  }
}