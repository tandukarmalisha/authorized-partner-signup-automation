import { signUpPage } from "../page-object/sign_up";
import {test} from "@playwright/test";
import { agencyData, professionalData, setUpData, verificationData } from "../test-data/data";
import { createTempAccount,waitForVerificationCode } from '../utils/mail';
test.describe("Signup automation",()=>{
    test("Sign up page automation",async({page})=>{
        test.setTimeout(60000);
        const signUp=new signUpPage(page);
        const agency = agencyData();
        const professional = professionalData();
        const verification = verificationData();
        await signUp.goToPage();
        await signUp.clickSignUp();
        await signUp.clickTermsAndConditionCheckbox();
        const account = await createTempAccount();
        const data=setUpData(account.address);
        await signUp.setUpData(data.firstName,data.lastName,data.email,data.phone,data.password,data.confirmPassword);
        const code = await waitForVerificationCode(account.token);
        console.log(code);
        await page.locator('input[data-input-otp="true"]').fill(code);
        await page.getByRole('button', { name: 'Verify Code'}).click();
        await signUp.fillAgencyDetails( agency.agencyName,agency.role,agency.agencyEmail,agency.website,agency.address,agency.region);
        await signUp.fillProfessionalExperience( professional.experience,professional.students,professional.focus,professional.success);
        await signUp.fillVerificationDetails(verification.registrationNumber,verification.preferredCountry,verification.certification);
        await page.pause();
    });
})