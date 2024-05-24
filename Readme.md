# Introduction :

Hi! My name is Rahul Kumar. I am MERN Stack developer. This project is given to me by [Roxiler](https://www.roxiler.com/). This project has three sections : a. Transaction Dashboard b. Statistics c. Bar Charts Statistics.
Other than that I also has created the APIs for the different type of transactions.

# Features :

This project has following features based upon the sections :

# Transaction DashBoard :

1. You can see all the transactions in Transactions Dashboard.
2. You can find the transactions based on the selected month.
3. You can search the transaction based upon description, title and price as well.
4. You can also change the page and no. of transactions per page.
5. You can click next/previous to see previous or next page.

# Statistics :

1. You can see the Total sales of the month.
2. You can see the No. of items sold and not sold.
3. You can Change the month as well.

# Bar Charts Statistics :

1. You can see the no. of Items sold in specific month.
2. You can change the month as well.
3. On hovering each bar, you will get the value of it.

# Usage :

You get the project follow the steps below:

1. You get the project initiated get install any IDE and then setup the GIT and GITHUB on it.
2. After that write `git clone https://github.com/rahulkumarpahwa/roxiler-mernStack.git` in the terminal of the IDE.
3. Now the app will get download to your system and then open two terminals. In the first one move to frontend folder by typing `cd frontend` and in the other go to backend by typing `cd backend`.
4. After moving to these type `npm run dev` in the both and then both frontend and backend will start.
5. Now go to `http://localhost:5173/` in any browser of your. You will see the project.

# Usage to See all the API's :

After following the above till step 4 then, go to `http://localhost:3000/` in any browser. You will get :
`{
    "message": "server is started",
    "success": true
}`
Now follow the following to get data from different routes :

1. To GET DATA INITIATED to the LOCAL MONGODB DATABASE (or the MONGODB ATLAS if you want) from `https://s3.amazonaws.com/roxiler.com/product_transaction.json`, then go to `http://localhost:3000/init`. You will get Message :
   `{
    message: "Products Data has been initialised in MongoDB",
    productData: newProductsData,
}`

2. To GET LIST OF ALL THE TRANSACTIONS go to `http://localhost:3000/alltransactions/**<month-number>**?page=**<page-number>**&item=**<number-of-items-in-page>**&search=**<item-you-want-to-search>**` 

# Note :

Although we don't push the Environment Variables in GIT, but to test this project, I have pushed the `.env` file in the backend.
