# Utility Billing Service
A Nodejs application for making utility payments using FSI payment sandbox. 

# Setup steps
#### Part I: Download & Run on you local computer
Open terminal/command prompt and cd into your preferred location:
```sh
$ git clone https://github.com/zubairAbubakar/untility-billing-service.git
```

### Part II: Create Database and import the schema
- Create `utility_service` on your mysql server
- Import the script in `utility-service.sql`

### Part III: Run the application 
Back on the terminal/command prompt run the command below
```sh
$ npm start
```

#### Part IV: Test the API
Open Postman or your preferred API testing tool and use the following details: 
#### Get all transactions
The endpoint allows the admin view a transactions and their statuses

##### Request Methond and URL
```
GET - http://localhost:9000/api/transactions
```
##### Request Headers
```
Content-Type:			application/json
```

#### Test Airtime Purchase
The endpoint allows the user buy airtime 

##### Request Methond and URL
```
POST - http://localhost:9000/api/airtimePurchase
```
##### Request Headers
```
Content-Type:			application/json
```
##### Sample Request Body
```
{
    "amount": "293",
    "status": "",
    "transactionType": "AIRTIME_PURCHASE",
    "recipientPhoneNumber": "+2347033568047",
    "userId": 1
}
```

### Requirements not covered 
Cable Tv and ELectricty payment endpoint not implemented as the FSI sandbox doesn't currently have those payment options. 

### Issues you have faced
I wasn't able to locate Cable Tv and ELectricty payment endpoints on the FSI sandbox documentation. 

### Constructive feedback for improving the assignment.
All API/endpoints on the FSI sandbbox to be used in assignment should be reviewed and made available on the documentation.  
