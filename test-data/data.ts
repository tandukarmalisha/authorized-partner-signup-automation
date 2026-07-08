import {faker} from '@faker-js/faker';

export const setUpData=(email:string)=>{
    const firstName=faker.person.firstName();
    const lastName=faker.person.lastName();
    const password = `${faker.internet.password()}${faker.number.int({ min: 0, max: 9 })}!`;
    return{
        firstName,
        lastName,
        email,
        phone: `98${faker.string.numeric(8)}`,
        password,
        confirmPassword:password,
    }
}


export const agencyData = () => {
    return {
      agencyName: faker.company.name(),
      role: faker.person.jobTitle(),
      agencyEmail: faker.internet.email(),
      website: faker.internet.domainName(),
      address: faker.location.streetAddress(),
      region: "Nepal",
    };
  };

export const professionalData = () => {
    return {
        experience: faker.helpers.arrayElement([
           "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
    "7 years",
    "8 years",
    "9 years",
        ]),
        students: faker.number.int({ min: 10, max: 500 }).toString(),
        focus: faker.lorem.words(4),
        success: faker.number.int({ min: 80, max: 100 }).toString(),
    }
};

export const verificationData = () => ({
    registrationNumber: faker.string.alphanumeric(10).toUpperCase(),
  
    preferredCountry: "Canada",
  
    certification: faker.helpers.arrayElement([
      "ICEF Certified Education Agent",
      "QEAC",
      "British Council",
      "NAFSA",
    ]),
  });
