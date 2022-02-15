# Quidax Bookstore API Service

## Installation
#### Step 1: Extract the zip file 

Copy "quidax-engineering-be-assessment" directory to your desired location
```bash
cd quidax-engineering-be-assessment
```

#### Step 2: Setup database
Create a new mysql database
Database configurations can be found in ormconfig.json file

#### Step 3: Install NPM packages
```bash
npm install
```

#### Step 4: Make database migration and seed data
```bash
npm run migration
npm run seed:run
```

#### Step 5: Start in development mode
```bash
npm start
```

## Testing
```bash
npm test
```

### API Documentation Link
https://www.postman.com/byteql/workspace/bookstore/api/beb256b2-f82d-4b10-8151-aee3dfcb751c

## ASSUMPTIONS
- Some users has been seeded into the database so users can only login currently as there's no feature which state that user should have the ability to create account.
- All endpoints has been protected except for the login endpoint to mimick real world scenario.
- Base Url is being set at Book Seeders since asset files are hosted locally

## REQUIREMENTS NOT COVERED
- Suffixing the base url with /gql

## IMPROVEMENTS
- More tests could have been written.
- Error logging could be better for production based code.
- More validations could have been considered as well depending on several edge/ use cases.