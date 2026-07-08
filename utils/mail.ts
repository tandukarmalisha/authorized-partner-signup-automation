import { request } from '@playwright/test';
import { faker } from '@faker-js/faker';

export async function createTempAccount() {
  const api = await request.newContext();

  // Get domain
  const domainRes = await api.get('https://api.mail.tm/domains');
  const domains = await domainRes.json();
  const domain = domains['hydra:member'][0].domain;

  // Create account
  const username = `${faker.string.alphanumeric(10).toLowerCase()}${Date.now()}`;
  const address = `${username}@${domain}`;
  const password = faker.internet.password();

  // await api.post('https://api.mail.tm/accounts', {
  //   data: {
  //     address,
  //     password,
  //   },
  // });

  const accountRes = await api.post('https://api.mail.tm/accounts', {
    data: {
      address,
      password,
    },
  });
  
  console.log("Account Status:", accountRes.status());
  
  console.log("Account Response:", await accountRes.text());

  // Log in to get a token
  // const tokenRes = await api.post('https://api.mail.tm/token', {
  //   data: {
  //     address,
  //     password,
  //   },
  // });

  // const tokenData = await tokenRes.json();

  const tokenRes = await api.post('https://api.mail.tm/token', {
    data: {
      address,
      password,
    },
  });
  
  console.log("Token Status:", tokenRes.status());
  
  const tokenData = await tokenRes.json();
  
  console.log("Token Response:", tokenData);

  console.log({
    address,
    password,
    token: tokenData.token,
  });

  return {
    address,
    password,
    token: tokenData.token,
  };
}
export async function getMessages(token: string) {
    const api = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const response = await api.get("https://api.mail.tm/messages");
  
    return await response.json();
  }
  export async function waitForVerificationCode(token: string): Promise<string> {
    for (let i = 0; i < 30; i++) {
      console.log(`Checking inbox... Attempt ${i + 1}`);

      const messages = await getMessages(token);

      console.log(messages);
  
      if (messages["hydra:member"].length > 0) {
        const intro = messages["hydra:member"][0].intro;

        console.log("Email received:", intro);
  
        const match = intro.match(/\b\d{6}\b/);
  
        if (match) {
          console.log("OTP:", match[0]);
          return match[0];
        }
  
        // throw new Error("OTP not found in email.");
      }
  
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  
    throw new Error("Verification email not received.");
  }
  // (async () => {
  //   const account = await createTempAccount();
  
  //   console.log(account);
  
  //   const messages = await getMessages(account.token);
  
  //   console.log(messages);
  // })();