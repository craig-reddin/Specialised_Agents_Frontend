import { Builder, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import assert from "assert";

//I designed these tests to open the browser once and proccess through all functionality in a sequential
//and logical manner. Firstly the user registers a new Auth0 account, when registered, the "user" is then
//redirectied accept AutoGen app to have acces to Auth0 account, the "user" accepts.

//The "user" is then redirected to the dashboard.
//The "user" signs out by clicking the logout link in the navigation bar.
//The user then signs into my student account x21218013@student.ncirl.ie on the sign in page.
//The user then tests the chat interface - single agent communication
//THe user then creates and stores 3 agents.
//The user then creates a team consisting of the agents created suring testing.
//The user then test the team chat functionality.
//The user then signs out of the account.
//The user then signs into the account again.AccountDeleteSuccessAlert
//The user then navigates to the delete account page and deletes the student account from the database and all data associated with that user.

async function UserEndToEndTesting() {
  let tests = 0;
  console.log("Starting End to End tests");
  let driver;
  let driver2;
  try {
    //options used to configure chrome
    const options = new chrome.Options();
    //ensure application is opened in incognito for any cached data that may interfere with testing.
    options.addArguments("--incognito");
    //Build driver with browser and its options
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    console.log("Positive Registration Test\n\n");
    //navigate to the sign in page
    await driver.get("http://localhost:5173/sign_in");


    //Find the link the text of "Sign up"
    const signupLink = await driver.wait(
      until.elementLocated(By.xpath("//a[text()='Sign up']")),
      10000
    );
    //Click "Sign up" link
    await signupLink.click();



    //Wait for the email input field to be present and locate it
    const emailInputReg = await driver.wait(
      until.elementLocated(By.css('input[type="text"]'), 6000)
    );


    // insert data into the email input field
    await emailInputReg.sendKeys("CraigRedd@student.ncirl.ie");



    // locate the password input field
    const passwordInputReg = await driver.wait(
      until.elementLocated(By.css('input[type="password"]'), 6000)
    );

    //Input into the password input field
    await passwordInputReg.sendKeys("Testing1!1");

    // click the submit button
    await driver
      .wait(until.elementLocated(By.css('button[type="submit"]'), 5000))
      .click();

    //Locate the Auth0 button for Access Authorisation
    const acceptButton = await driver.wait(
      until.elementLocated(By.css('button[value="accept"]'), 5000)
    );
    //Click the button
    await acceptButton.click();

    //Wait for the dashboard heading to appear
    const titleDash = await driver.wait(
      until.elementLocated(By.className("dashboard-heading"), 5000)
    );
    //Assert the difference between the heading value and expected value if on dashboard- showing successful login
    assert.strictEqual(await titleDash.getText(), "DASHBOARD");
    // validate the assert and inform of test passing
    if ((await titleDash.getText()) == "DASHBOARD") {
      console.log("Registration test Passed\n\n");
      tests++;
    }

    //Locate the logout link in navigation
    const logoutLinkReg = await driver.wait(
      until.elementLocated(By.id("navlink-logout")),
      5000
    );
    // Click the logout link - user directed to home page
    logoutLinkReg.click();
    //sleep to ensure the navigation menu has changed after authentication of user is changed
    await driver.sleep(500);

    //=========================================================================================

    console.log("Sign_In Tests\n\n");
    // navigate to the sign in page
    await driver.get("http://localhost:5173/sign_in");

    //First submit empty values - a message will appear telling user to input into email field
    await driver
      .wait(until.elementLocated(By.css('button[type="submit"]'), 5000))
      .click();
    await driver.sleep(2000);

    // Locate the email input field and wait for it to be present
    let emailInput = await driver.wait(
      until.elementLocated(By.css('input[type="text"]'), 6000)
    );

    let isTypeMismatchEmptyEmail = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      emailInput
    );

    if (isTypeMismatchEmptyEmail) {
      console.log("Sign in Empty Input test passed\n\n");
      tests++;
    }
    //Input email into the email input field
    await emailInput.sendKeys("jordanfitzskelton45@gmail.co");

    await driver
      .wait(until.elementLocated(By.css('button[type="submit"]'), 5000))
      .click();
    await driver.sleep(2000);

    //=========================================================================================
    //Locate the password input field and wait for it to be present

    let passwordInput = await driver.wait(
      until.elementLocated(By.css('input[type="password"]'), 6000)
    );

    let isTypeMismatchEmptyPassword = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      passwordInput
    );

    if (isTypeMismatchEmptyPassword) {
      console.log("Sign in Empty password test passed\n\n");
      tests++;
    }

    await passwordInput.sendKeys("dfghjk345678*()WEEFG");

    //=========================================================================================

    //At this stage I have filled in the credentials for a positive sign in
    ///If I try to sign in with incorrect credentials 3 times I can no longer sign in on the browser session
    //Resultuing with me opening anothe browser window and completing the negative sign in tests.
    //Once negative testing in second window is completed tests it will close and the positive valuse inserted
    //into the email and password field of he first browser window is completed.

    const options2 = new chrome.Options();
    //ensure application is opened in incognito for any cached data that may interfere with testing.
    options2.addArguments("--incognito");
    //Build driver with browser and its options
    driver2 = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    //@student.ncirl.ie
    await driver2.get("http://localhost:5173/sign_in");

    //Input into password input field

    let emailInput4 = await driver2.wait(
      until.elementLocated(By.css('input[type="text"]'), 6000)
    );
    await emailInput4.sendKeys("1fkggkddrgf0@student.ncirl.ie");

    let passwordInput4 = await driver2.wait(
      until.elementLocated(By.css('input[type="password"]'), 6000)
    );
    await passwordInput4.sendKeys("ComputerScience1!");

    await driver2.sleep(2000);
    await driver2
      .wait(until.elementLocated(By.css('button[type="submit"]'), 5000))
      .click();

    await driver2.sleep(2000);

    const signInwarning2 = await driver2.wait(
      until.elementLocated(By.id("error-element-password"), 50000)
    );

    if ((await signInwarning2.getText()) == "Wrong email or password") {
      console.log(
        "Invalid Sign-in test  Passed - Invalid email , valid password\n\n"
      );
      tests++;
    }

    await driver2.sleep(2000);

    await driver2.quit();

    //=========================================================================================

    let driver3;

    driver3 = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    await driver3.get("http://localhost:5173/sign_in");

    let emailInput3 = await driver3.wait(
      until.elementLocated(By.css('input[type="text"]'), 6000)
    );
    await emailInput3.sendKeys("x21218013@student.ncirl.ie");

    let passwordInput3 = await driver3.wait(
      until.elementLocated(By.css('input[type="password"]'), 6000)
    );
    await passwordInput3.sendKeys("ComputerScience1");

    await driver3.sleep(2000);
    await driver3
      .wait(until.elementLocated(By.css('button[type="submit"]'), 5000))
      .click();

    const signInwarning = await driver3.wait(
      until.elementLocated(By.id("error-element-password"), 50000)
    );

    if ((await signInwarning.getText()) == "Wrong email or password") {
      console.log(
        "Invalid Sign-in test  Passed - valid email , Invalid password\n\n"
      );
      tests++;
    }

    await driver3.sleep(1000);
    await driver3.quit();

    //=========================================================================================
    await emailInput.sendKeys("m");

    await driver
      .wait(until.elementLocated(By.css('button[type="submit"]'), 5000))
      .click();

    await driver.sleep(2000);

    //Wait for the dashboard heading to appear
    const title = await driver.wait(
      until.elementLocated(By.className("dashboard-heading"), 50000)
    );
    //Assert the difference between the heading value and expected value if on dashboard
    assert.strictEqual(await title.getText(), "DASHBOARD");
    // validate the assert and inform of test passing
    if ((await title.getText()) == "DASHBOARD") {
      console.log("Positive Sign in test Passed\n\n");
    }
    //=========================================================================================
    console.log(
      "Starting Positive Chat Interface - Singular instance Chat Test \n\n"
    );
    tests++;

    //Click on the sidebar menu link
    await driver
      .wait(until.elementLocated(By.id("sidebar-menu-link"), 10000))
      .click();

    //Click on the chat interface link in sidebar
    await driver
      .wait(until.elementLocated(By.id("chat-interface-link"), 10000))
      .click();

    //Empty field submission
    await driver
      .wait(until.elementLocated(By.css('button[type="submit"]'), 5000))
      .click();

    //Locate the chat input field
    const chatInterfaceInput = await driver.wait(
      until.elementLocated(By.id("chatQuestion"), 5000)
    );

    let isTypeMismatchEmptyChatInterfaceInput = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      chatInterfaceInput
    );

    if (isTypeMismatchEmptyChatInterfaceInput) {
      console.log("Empty Input Chat Interface Tessed Passed\n\n");
      tests++;
    }
    //Input test message into chat field
    await chatInterfaceInput.sendKeys("Test Test");

    //Click the submit button to send message
    await driver
      .wait(until.elementLocated(By.css('button[type="submit"]'), 5000))
      .click();

    //Define the expected response
    const expectedResponse = "User_Proxy\nTest Test";

    // Wait for the API response to appear
    await driver.wait(async () => {
      try {
        const chatContentElement = await driver.findElement(
          By.id("GeneratedResponsesContainer")
        );
        const text = await chatContentElement.getText();
        return text.includes(expectedResponse);
      } catch (error) {
        return false;
      }
    }, 50000);

    // Get the response container element
    const chatContent = await driver.findElement(
      By.id("GeneratedResponsesContainer")
    );
    //Assert the difference between actual and expected response text
    assert.strictEqual(await chatContent.getText(), expectedResponse);

    console.log(
      "Chat Interface test Passed - response from singular agent and user proxy chat.\n\n"
    );
    tests++;
    //=========================================================================================
    console.log("Starting Create Agent Testing\n\n");

    //Click on the sidebar menu link
    await driver
      .wait(until.elementLocated(By.id("sidebar-menu-link"), 10000))
      .click();

    //Click on the create agent link in sidebar
    await driver
      .wait(until.elementLocated(By.id("create-agent-link"), 10000))
      .click();

    await driver.wait(until.elementLocated(By.id("cib"), 5000)).click();

    //Locate the agent specialisation input field
    const agentSpecialisationCreate = await driver.wait(
      until.elementLocated(By.id("agent-specialisation-create"), 30000)
    );
    let isTypeMismatchEmptyCreateAgentSpecialisation =
      await driver.executeScript(
        "return arguments[0].validity.valueMissing;",
        agentSpecialisationCreate
      );

    if (isTypeMismatchEmptyCreateAgentSpecialisation) {
      console.log("Empty Create Agent Specialisation Tessed Passed\n\n");
      tests++;
    }
    //Input the agent specialisation
    await agentSpecialisationCreate.sendKeys("Testing Agent");

    await driver.wait(until.elementLocated(By.id("cib"), 5000)).click();

    //Locate the agent description input field
    const agentDescriptionCreate = await driver.wait(
      until.elementLocated(By.id("agent-description-create"), 30000)
    );

    let isTypeMismatchEmptyCreateAgenDescription = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      agentDescriptionCreate
    );

    if (isTypeMismatchEmptyCreateAgenDescription) {
      console.log("Empty Create Agent Description Tessed Passed\n\n");
      tests++;
    }

    //Input the agent description
    await agentDescriptionCreate.sendKeys(
      "You were created to test my application"
    );

    //Click the create button
    await driver.wait(until.elementLocated(By.id("cib"), 5000)).click();

    //Wait for success alert to appear
    let agentCreationSuccessAlert = await driver.wait(
      until.alertIsPresent(),
      5000
    );

    //Get the alert text message
    let agentCreationSuccessAlertText =
      await agentCreationSuccessAlert.getText();
    //Validate alert message matches expected success message
    if (agentCreationSuccessAlertText === "Agent Successfully Saved") {
      console.log("Test Passed: First Agent was created\n");
      tests++;
    }
    //Accept the alert
    await driver.switchTo().alert().accept();
    //=========================================================================================
    //Locate the agent specialisation input field for second agent
    const agentSpecialisationCreate2 = await driver.wait(
      until.elementLocated(By.id("agent-specialisation-create"), 30000)
    );
    //Input the second agent specialisation
    await agentSpecialisationCreate2.sendKeys("Testing Agent2");

    //Locate the agent description input field for second agent
    const agentDescriptionCreate2 = await driver.wait(
      until.elementLocated(By.id("agent-description-create"), 30000)
    );
    //Input the second agent description
    await agentDescriptionCreate2.sendKeys(
      "You were created to test my application 2"
    );

    //Click the create button for second agent
    await driver.wait(until.elementLocated(By.id("cib"), 5000)).click();

    //Wait for success alert to appear
    await driver.wait(until.alertIsPresent(), 5000);

    //Accept the alert
    await driver.switchTo().alert().accept();

    console.log("Agent 2 Saved\n");
    tests++;

    //=========================================================================================

    //Locate the agent specialisation input field for third agent
    const agentSpecialisationCreate3 = await driver.wait(
      until.elementLocated(By.id("agent-specialisation-create"), 30000)
    );
    //Input the third agent specialisation
    await agentSpecialisationCreate3.sendKeys("Testing Agent3");

    //Locate the agent description input field for third agent
    const agentDescriptionCreate3 = await driver.wait(
      until.elementLocated(By.id("agent-description-create"), 30000)
    );
    //Input the third agent description
    await agentDescriptionCreate3.sendKeys(
      "You were created to test my application 3"
    );

    //Click the create button for third agent
    await driver.wait(until.elementLocated(By.id("cib"), 5000)).click();

    //Wait for success alert to appear
    await driver.wait(until.alertIsPresent(), 5000);

    //Accept the alert
    await driver.switchTo().alert().accept();

    console.log("Agent 3 Saved\n");
    tests++;
    //=========================================================================================

    console.log("Starting Create Team Testing\n\n");

    //Click on the sidebar menu link
    await driver
      .wait(until.elementLocated(By.id("sidebar-menu-link"), 10000))
      .click();

    //Click on the create team link in sidebar
    await driver
      .wait(until.elementLocated(By.id("create-team-link"), 10000))
      .click();

    //Locate the team name input field
    const teamNameCreate = await driver.wait(
      until.elementLocated(By.id("team-name-create")),
      30000
    );

    await driver.wait(until.elementLocated(By.id("cib"), 5000)).click();

    let isTypeMismatchEmptyCreateTeamName = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      teamNameCreate
    );

    if (isTypeMismatchEmptyCreateTeamName) {
      console.log("Empty Name Input - Create Team Tessed Passed\n\n");
      tests++;
    }
    //Input the team name
    await teamNameCreate.sendKeys("Testing Agent");

    await driver.wait(until.elementLocated(By.id("cib"), 5000)).click();

    //Locate the team description input field
    const teamDescriptionCreate = await driver.wait(
      until.elementLocated(By.id("team-description-create")),
      30000
    );

    let isTypeMismatchEmptyCreateTeamDescription = await driver.executeScript(
      "return arguments[0].validity.valueMissing;",
      teamDescriptionCreate
    );

    if (isTypeMismatchEmptyCreateTeamDescription) {
      console.log("Empty Description Input - Create Team Tessed Passed\n\n");
      tests++;
    }
    //Input the team description
    await teamDescriptionCreate.sendKeys(
      "You were created to test my application"
    );

    //Sleep to allow form to settle
    await driver.sleep(1000);

    await driver.wait(until.elementLocated(By.id("cib"), 5000)).click();

    //Wait for success alert to appear
    const createTeamAlert = await driver.wait(until.alertIsPresent(), 5000);

    const createTeamAlarmTest = await createTeamAlert.getText();

    if (createTeamAlarmTest == "Please select three agents to create a team") {
      console.log("No Agents selected - Create Team Tessed Passed\n\n");
      tests++;
    }
    //Accept the alert
    await driver.switchTo().alert().accept();

    //Locate first agent checkbox, scroll to it and select
    const agent1 = await driver.wait(
      until.elementLocated(By.id("agent-select-team-0")),
      5000
    );
    await driver.executeScript("arguments[0].scrollIntoView(true);", agent1);
    await driver.sleep(500); // Give the page time to scroll
    await agent1.click();

    await driver.wait(until.elementLocated(By.id("cib"), 5000)).click();

    const createTeamAlert2 = await driver.wait(until.alertIsPresent(), 5000);

    const createTeamAlarmTest2 = await createTeamAlert2.getText();

    if (createTeamAlarmTest2 == "Please select three agents to create a team") {
      console.log("One Agent selected - Create Team Tessed Passed\n\n");
      tests++;
    }
    //Accept the alert
    await driver.switchTo().alert().accept();

    //Locate second agent checkbox, scroll to it and select
    const agent2 = await driver.wait(
      until.elementLocated(By.id("agent-select-team-1")),
      5000
    );
    await driver.executeScript("arguments[0].scrollIntoView(true);", agent2);
    await driver.sleep(500);
    await agent2.click();

    await driver.wait(until.elementLocated(By.id("cib"), 5000)).click();

    const createTeamAlert3 = await driver.wait(until.alertIsPresent(), 5000);

    const createTeamAlarmTest3 = await createTeamAlert3.getText();

    if (createTeamAlarmTest3 == "Please select three agents to create a team") {
      console.log("Two Agents selected - Create Team Tessed Passed\n\n");
      tests++;
    }
    //Accept the alert
    await driver.switchTo().alert().accept();

    //Locate third agent checkbox, scroll to it and select
    const agent3 = await driver.wait(
      until.elementLocated(By.id("agent-select-team-2")),
      5000
    );
    await driver.executeScript("arguments[0].scrollIntoView(true);", agent3);
    await driver.sleep(500);
    await agent3.click();

    //Locate submit button, scroll to it and click
    const submitButton = await driver.wait(
      until.elementLocated(By.id("cib")),
      5000
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      submitButton
    );
    await driver.sleep(500);
    await submitButton.click();

    //Wait for success alert to appear
    let teamCreationSuccessAlert = await driver.wait(
      until.alertIsPresent(),
      5000
    );

    //Get the alert text message
    let teamCreationSuccessAlertText = await teamCreationSuccessAlert.getText();
    //Validate alert message matches expected success message
    if (teamCreationSuccessAlertText === "Team Successfully Saved") {
      console.log("Test Passed: Team was successfully created\n\n");
      tests++;
    }
    //Accept the alert
    await driver.switchTo().alert().accept();
    //=========================================================================================
    console.log(
      "Starting Positive Team Chat Interface - Team Chat Test \n",
      "Consists of opening sidbar on the chat interface,\n",
      "Clicking the select existing team link in sidebar,\n",
      "Selecting the first team in the list\n",
      "When the team chat interface renders, input Test Teast into input field\n",
      "If the API call is successful the first messaged received is the question asked,\n",
      "assert screen value to mesage sent \n Then compare value and console log test passed\n\n"
    );

    //Click on the sidebar menu link
    await driver
      .wait(until.elementLocated(By.id("sidebar-menu-link"), 10000))
      .click();

    //Click on the select team link in sidebar
    await driver
      .wait(until.elementLocated(By.id("select-team-link"), 10000))
      .click();

    //Click on team select button for first team in list
    await driver
      .wait(until.elementLocated(By.id("team-select-button"), 10000))
      .click();

    //Locate the chat input field in team interface
    const teamChatInterfaceInput = await driver.wait(
      until.elementLocated(By.id("chatQuestion"), 30000)
    );
    //Input test message into chat field
    await teamChatInterfaceInput.sendKeys("Test Test");

    //Click the submit button to send message
    await driver
      .wait(until.elementLocated(By.css('button[type="submit"]'), 5000))
      .click();

    //Define the expected response
    const teamExpectedResponse = "User_Proxy\nTest Test";

    // Wait for the API response to appear
    await driver.wait(async () => {
      try {
        const chatContentElement = await driver.findElement(
          By.id("GeneratedResponsesContainer")
        );
        const text = await chatContentElement.getText();
        return text.includes(expectedResponse);
      } catch (error) {
        return false;
      }
    }, 50000);

    // Get the response container element
    const teamChatContent = await driver.findElement(
      By.id("GeneratedResponsesContainer")
    );
    //Assert the difference between actual and expected response text
    assert.strictEqual(await teamChatContent.getText(), teamExpectedResponse);

    console.log(
      "Team Chat Interface test Passed - response from team of agents and user proxy chat.\n\n"
    );
    tests++;
    //=========================================================================================
    console.log("Strarting Sign Out Test\n\n");

    //Locate the logout link in navigation
    const logoutLink = await driver.wait(
      until.elementLocated(By.id("navlink-logout")),
      5000
    );

    //Scroll to logout link to ensure visibility
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      logoutLink
    );
    //Click the logout link
    logoutLink.click();

    //Wait for homepage heading to appear after logout
    const homePageHeading = await driver.wait(
      until.elementLocated(By.id("homepage-heading")),
      5000
    );

    //Get the text of homepage heading
    const homePageHeadingText = await homePageHeading.getText();
    //Assert homepage heading matches expected value showing successful logout
    assert.strictEqual(homePageHeadingText, "Welcome To GenAIColab");
    //Validate assert and inform of test passing
    if (homePageHeadingText == "Welcome To GenAIColab") {
      console.log("User sign out was successful\n\n");
      tests++;
    }

    console.log("Running sign In test again to delete account\n\n");
    //Navigate to sign in page
    await driver.get("http://localhost:5173/sign_in");

    //Locate the email input field
    const emailInput1 = await driver.wait(
      until.elementLocated(By.css('input[type="text"]'), 6000)
    );

    //Input different test email for account deletion test
    await emailInput1.sendKeys("jordanfitzskelton45@gmail.coM");

    //Locate the password input field
    const passwordInput1 = await driver.wait(
      until.elementLocated(By.css('input[type="password"]'), 6000)
    );

    //Input password for account deletion test
    await passwordInput1.sendKeys("ComputerScience1!");

    //Click the submit button
    await driver
      .wait(until.elementLocated(By.css('button[type="submit"]'), 5000))
      .click();

    console.log("Starting Delete Account Test\n\n");

    //Click on the sidebar menu link
    await driver
      .wait(until.elementLocated(By.id("sidebar-menu-link"), 10000))
      .click();

    //Click on the delete account link in sidebar
    await driver
      .wait(until.elementLocated(By.id("delete-account-link"), 10000))
      .click();

    //Click the confirm button to delete account
    await driver.wait(until.elementLocated(By.id("cib"), 10000)).click();
    //Wait for success alert to appear
    let AccountDeleteSuccessAlert = await driver.wait(
      until.alertIsPresent(),
      5000
    );

    //Get the alert text message
    let AccountDeleteSuccessAlertText =
      await AccountDeleteSuccessAlert.getText();
    //Validate alert message matches expected success message
    if (AccountDeleteSuccessAlertText === "Your account was deleted") {
      console.log("Test Passed: Users Account is deleted\n\n");
      tests++;
    }
    //Accept the alert
    await driver.switchTo().alert().accept();
    //=========================================================================================
  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (driver) {
      console.log("Quitting driver...");
      await driver.quit();
      console.log(tests + " tests passed out of 22");
    }
  }
}

UserEndToEndTesting();
