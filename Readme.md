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

2. To GET LIST OF ALL THE TRANSACTIONS go to `http://localhost:3000/alltransactions/**month-number**?page=**page-number**&item=**number-of-items-in-page**&search=**item-you-want-to-search**` 
Make sure to Enter the following as :
  - month number (say for march it is 03)
  - page, page number you want to see.
  - item, no. of items on a page you want to see.
  - search, the keyword you want to search.

3. To GET THE STATISTICS go to `http://localhost:3000/statistics/**month-number**` and you will get the 
response as :
`{
    "month": "01",
    "totalAmount": 6530.9,
    "soldItems": 2,
    "notSoldItems": 4,
    "monthData": [ { ...}, {...} , {...},...],
}`

4. To GET THE BARCHART STATISTICS go to `http://localhost:3000/barchart/**month-number**` and you will get the response as :
`{
    "totalProducts": 6,
    "priceRange": [
        {
            "0-100": 1,
            "item": 1,
            "year": "0-100"
        },
        {
            "101-200": 1,
            "item": 1,
            "year": "101-200"
        },
        {
            "201-300": 1,
            "item": 1,
            "year": "201-300"
        },
        {
            "301-400": 0,
            "item": 0,
            "year": "301-400"
        },
        {
            "401-500": 0,
            "item": 0,
            "year": "401-500"
        },
        {
            "501-600": 2,
            "item": 2,
            "year": "501-600"
        },
        {
            "601-700": 0,
            "item": 0,
            "year": "601-700"
        },
        {
            "701-800": 0,
            "item": 0,
            "year": "701-800"
        },
        {
            "801-900": 0,
            "item": 0,
            "year": "801-900"
        },
        {
            "901-above": 1,
            "item": 1,
            "year": "901-above"
        }
    ],
    "data": [ { ...}, {...} , {...},...],
}`

5. To GET THE PIE CHART DATA go to `http://localhost:3000/piechart/**month-number**` and you will get the 
response as :
`{
    "categoryList": [
        {
            "category": "electronics",
            "count": 2
        },
        {
            "category": "women's clothing",
            "count": 2
        },
        {
            "category": "men's clothing",
            "count": 2
        }
    ],
    "categories": [
        "electronics",
        "women's clothing",
        "men's clothing"
    ],
    "data": [ { ...}, {...} , {...},...],
}`

6. To GET THE COMBINED DATA go to `http://localhost:3000/combined/**month-number**` and you will get the 
response as :
 `[
    {
        "Statistics": {
            "month": "01",
            "totalAmount": 6530.9,
            "soldItems": 2,
            "notSoldItems": 4,
            "monthData": [ { ...}, {...} , {...},...],
        }`,
    },{
        "BarChart": {
            "totalProducts": 6,
            "priceRange": [
                {
                    "0-100": 1,
                    "item": 1,
                    "year": "0-100"
                },
                {
                    "101-200": 1,
                    "item": 1,
                    "year": "101-200"
                },
                {
                    "201-300": 1,
                    "item": 1,
                    "year": "201-300"
                },
                {
                    "301-400": 0,
                    "item": 0,
                    "year": "301-400"
                },
                {
                    "401-500": 0,
                    "item": 0,
                    "year": "401-500"
                },
                {
                    "501-600": 2,
                    "item": 2,
                    "year": "501-600"
                },
                {
                    "601-700": 0,
                    "item": 0,
                    "year": "601-700"
                },
                {
                    "701-800": 0,
                    "item": 0,
                    "year": "701-800"
                },
                {
                    "801-900": 0,
                    "item": 0,
                    "year": "801-900"
                },
                {
                    "901-above": 1,
                    "item": 1,
                    "year": "901-above"
                }
            ],
            "data": [ { ...}, {...} , {...},...],
        },
    },{
      "PieChart": {
            "categoryList": [
                {
                    "category": "electronics",
                    "count": 2
                },
                {
                    "category": "women's clothing",
                    "count": 2
                },
                {
                    "category": "men's clothing",
                    "count": 2
                }
            ],
            "categories": [
                "electronics",
                "women's clothing",
                "men's clothing"
            ],
            "data": [ { ...}, {...} , {...},...],
    },
    },
 ]`


 # Tech Stack :
 Frontend  :  
 1. React
 2. React DOM
 3. Vite 
 4. Chart.js
 5. TailwindCSS 

 Backend : 
 1. Express
 2. Mongoose 
 3. Cors
 4. DotEnv

# Note :

Although we don't push the Environment Variables in GIT, but to test this project, I have pushed the `.env` file in the backend.
