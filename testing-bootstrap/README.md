# tacticalmastery.com #

---

## Dev News 14.Jun.2016
* ### Automatic deployment of master branch of the repo to http://staging.tacticalmastery.com
The requests for the deployment can be **[observed here](https://bitbucket.org/firstworldwar/www/admin/addon/admin/bitbucket-webhooks/bb-webhooks-repo-admin)**  
I hope the eventual hiccups here will be not that much, but tell me each time you notice something strange with this functionality.  
Few seconds after the push the code should be live.  

* ### SSH access to the server will have only Brian and Tony  
If you need something done on the server ask Brian or Tony  

* ### Automatic tests  
After each push to the master branch the code is deployed on the server and **[acceptance tests](https://bitbucket.org/firstworldwar/www/src/985ece31ae6e7670134ba116c8bc0411ae785862/tests/codecept/tests/acceptance/?at=master)** are run.  
The tests are done using **[PhantomJs](http://phantomjs.org/quick-start.html)** in WebDriver mode with **[Codeception](http://codeception.com/docs/modules/WebDriver)** test framework.  
In order to be able to start the test on your local machine all you have to do is:  

1. **[Download PhantomJs](http://phantomjs.org/download.html)** and start it using `phantomjs --webdriver=4444` this process has to run in the background while the tests are performing  
1. **[Download codecept.phar](http://codeception.com/codecept.phar)** to directory /tests/codecept/ and start the test from same directory with `codecept.phar run acceptance` or maybe `php codecept.phar run acceptance` depending on your local OS  
In case of error the screenshot of the browser when the error occurred will be saved in `/tests/codecept/tests/_output/` , so you can check it.  
Codeception is very easy to be used, check the example tests that I wrote and some of **[the guides](http://codeception.com/docs/03-AcceptanceTests)**  

When it is applicable write your own tests to demonstrate that the issues are fixed and to make sure that there is no regression in the code.  
Soon we will have UI where you will be able to see all the relevant logs from the staging server, not only for the automated tests, but for the server as well.

---

## Pages
* http://www.tacticalmastery.com/index.html
* http://www.tacticalmastery.com/terms.html
* http://www.tacticalmastery.com/privacy.html
* http://www.tacticalmastery.com/checkout.html
* http://www.tacticalmastery.com/success.html
* http://www.tacticalmastery.com/thankyou.html
* http://www.tacticalmastery.com/us_hlmp.html
* http://www.tacticalmastery.com/us_recharge.html
* Fake order: http://tacticalmastery.com/thankyou.html?orderId=C3E3F2C1DA

## Staging server at Digital Ocean
`ssh root@162.243.72.192`  
Web server path `/var/www/tacticalmastery.com`

## The repo
`git@bitbucket.org:firstworldwar/www.git`

## Integration with Jira
Our Jira space is: https://tumedia.atlassian.net  
When committing a code to the repo, please mention the Jira issue in the message, so the automatic integration can kick in.