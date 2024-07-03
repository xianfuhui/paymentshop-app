1

1  # <a name="_toc153737871"></a>**INTRODUCTION** 
in today's world, technology is becoming increasingly important and consumers are looking for convenience when shopping for technology products, especially mobile phones. That's why our mobile retail store has introduced an advanced app developed with Node.js, which helps create a unique and convenient shopping experience for customers. The smart search feature makes it easy for customers to choose the right phone for their individual needs. From the latest models to exclusive products that are only available on our store website, the app offers great variety and choice.



















1  # <a name="_toc153737872"></a>**TECHNOLOGY USED IN APPLICATION**
Technology used:

- **Fronted:** Use HTML, CSS, and JavaScript.
- **Backend**: Use a programming language Node.js uses frameworks stored in package.json .

`    	`**"ejs": "^3.1.9",**	

`    	`**"express": "^4.18.2",**

`  	 `**"express-flash": "^0.0.2",**

`   	 `**"express-session": "^1.17.3",**

`   	 `**"jsonwebtoken": "^9.0.2",**

`   	 `**"mongoose": "^8.0.1",**

`   	 `**"multer": "^1.4.5-lts.1",**

`   	 `**"nodemailer": "^6.9.7",**

`   	 `**"path": "^0.12.7",**

`   	 `**"pdfkit": "^0.14.0"**

- **Database**: Using a NoSQL database (MongoDB) for storage 












1  # <a name="_toc153737873"></a>**DESIGN ANALYSIS**
   1. ## <a name="_toc153737874"></a>**Diagram**
      1. ### <a name="_toc29941"></a><a name="_toc153737875"></a>***Class diagram***
![A diagram of a computer

Description automatically generated with medium confidence](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.001.png)

<a name="_toc153737886"></a>**Figure 3.1.1 Class diagram**
1. ### <a name="_toc19206"></a><a name="_toc153737876"></a>***Usecase diagram***
![A diagram of a sales point

Description automatically generated](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.002.png)

<a name="_toc153737887"></a>**Figure 3.1.2 Usecase diagram**

1. ### <a name="_toc9136"></a><a name="_toc153737877"></a>***Sequence diagram***
![A diagram of a system

Description automatically generated](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.003.png)

<a name="_toc153737888"></a>**Figure 3.1.3 Sequence diagram**

1. ### <a name="_toc9614"></a><a name="_toc153737878"></a>***Functional decomposition diagram***
![A diagram of a system

Description automatically generated](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.004.png)

<a name="_toc14970"></a><a name="_toc153737889"></a>**Figure 3.1.4:  Functional decomposition diagram**
1. ## <a name="_toc153737879"></a>**Source code** 
   1. ### <a name="_toc153737880"></a>***Directory structure***
- **env :** contains the path to the environment in which the product is run
- **App.js :** is an important file, responsible for connecting everything so that the application can run correctly. 
- **package. json:** The package.json file contains crucial information and configurations related to the development, packaging, and deployment processes. 
- **config:** db.js(database) container
- **node\_modules:** This is a  directory in the my NodeJS project . It contains the NodeJS modules used in the project. These modules are libraries or tools required for the project to run
- **src:** This is a directory in the NodeJS project typically contains the source code files of the application following **MVC model** . It's where you organize your code and assets for my application. Let's break down the likely content of each subdirectory:
  - **Controllers:** Get created to execute requests from users, receive parameters, call functions in the model, load the necessary views
  - **Middleware:** Provides services from the operating system side to applications, making it possible for applications to interact with components allowed by the operating system.
  - **models:** Contains all files that define the models of the application
  - **public:** Contains static files, such as images, CSS files, JavaScript files, …  or other static resources to serve directly to the client from the web server.
  - **routes:** Contains files that define routes for the application.
  - **views:** Contains files that define the user interface using the template engine

1. ## <a name="_toc23423"></a><a name="_toc153737881"></a>**Deploy application**
Deploy steps by steps:

**Step 1:** Create reponsitory on Github: paymentshop-app. Then push the code to Github: <https://github.com/xianfuhui/paymentshop-app>

![A screenshot of a computer

Description automatically generated](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.005.png)

<a name="_toc8414"></a><a name="_toc153737890"></a>**Figure 3.3.1: Creating repository**

**Step 2:** Create MongoDB Atlas and write the information in .env file of the source code

![A screenshot of a computer

Description automatically generated](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.006.png)

<a name="_toc761"></a><a name="_toc153737891"></a>**Figure 3.3.2: Creating MongoDB Atlas**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.007.png)

<a name="_toc26944"></a><a name="_toc153737892"></a>**Figure 3.3.3 Update .env file**

**Step 3:** Use <https://render.com/> to deploy code

- Connect to code packaged on GitHub in previous step

![A screenshot of a computer

Description automatically generated](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.008.png)

<a name="_toc27477"></a><a name="_toc153737893"></a>**Figure 3.3.4: Reponsitory connection**

- Detail configuration settings: 
  - **Name:** paymentshop-app
  - **Region:** Oregon (US West)
  - **Branch:** main
  - **Root Directory:** “.”
  - **Runtime:** Node 
  - **Build Command:** yarn
  - **Start Command:** npm start

![A screenshot of a computer

Description automatically generated](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.009.png)

<a name="_toc30277"></a><a name="_toc153737894"></a>**Figure 3.3.5: Details Configuration Settings for Render**

- The display screen has been successfully deployed

![A screenshot of a computer

Description automatically generated](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.010.png)

<a name="_toc21020"></a><a name="_toc153737895"></a>**Figure 3.3.6: Logs success notification**

**Step 4:** Check result at https://paymentshop-app.onrender.com/

![A screenshot of a computer

Description automatically generated](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.011.png)

<a name="_toc153737896"></a>**Figure 3.3.7 Application after deploy successfully**
1. ## <a name="_toc28240"></a><a name="_toc153737882"></a>**Application overview**
   1. ### <a name="_toc15743"></a><a name="_toc153737883"></a>***UI/UX Admin site***
- **Login feature for Admin**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.012.png)

<a name="_toc2900"></a><a name="_toc153737897"></a>**Figure 3.4.1: Login interface for Admin** 

- Profile feature Admin 

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.013.png)

<a name="_toc27908"></a><a name="_toc153737898"></a>**Figure 3.4.2: Profile admin page** 

- **Change password feature for admin**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.014.png)

<a name="_toc13553"></a><a name="_toc153737899"></a>**Figure 3.4.3: Change password page**

- **Create account staff feature for Admin**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.015.png)

<a name="_toc6303"></a><a name="_toc153737900"></a>**Figure 3.4.4: Register for account staff page**

- **List of staffs feature for Admin**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.016.png)

<a name="_toc153737901"></a>**Figure 3.4.5 List of staffs page**

- **View employee details feature for Admin**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.017.png)

<a name="_toc153737902"></a>**Figure 3.4.6 View staff details page**

- **Manage product feature for Admin**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.018.png)

<a name="_toc153737903"></a>**Figure 3.4.7 List of product page**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.019.png)

<a name="_toc153737904"></a>**Figure 3.4.8 Add product page**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.020.png)

<a name="_toc153737905"></a>**Figure 3.4.9 Edit product page**

- **Analysis reports feature for Admin**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.021.png)

<a name="_toc153737906"></a>**Figure 3.4.10 Analysis reports page**

1. ### <a name="_toc13309"></a><a name="_toc153737884"></a>***UI/UX Staff site***
- **Login feature for Staff**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.022.png)

<a name="_toc153737907"></a>**Figure 3.4.11 Staff login page**

- **Profile feature for Staff** 

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.023.png)

<a name="_toc153737908"></a>**Figure 3.4.12 Profile staff page**

- **Manager customer**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.024.png)

<a name="_toc153737909"></a>**Figure 3.4.13 List customer page**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.025.png)

<a name="_toc153737910"></a>**Figure 3.4.14 Customer details page**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.026.png)

<a name="_toc153737911"></a>**Figure 3.4.15 List product page**

- **Cart feature for Staff** 

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.027.png)

<a name="_toc153737912"></a>**Figure 3.4.16 Cart page**

- **Payment feature for Staff**

![](Aspose.Words.727de3e6-9494-47d4-bd18-2f033e498479.028.png)

<a name="_toc153737913"></a>**Figure 3.4.17 Payment page**




###


##










