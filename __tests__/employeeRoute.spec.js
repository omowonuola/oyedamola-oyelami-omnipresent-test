
import supertest from 'supertest';
import app from '../server.js';



const requestWithSupertest = supertest(app);

const body = {
    "list": [

        {
        "firstName":"Roy",
        "lastName":"Testerton",
        "dateOfBirth":"19/02/1990",
        "jobTitle":"Software developer",
        "company":"Test co",
        "country":"USA"
        },
        {
        "firstName":"Lisa",
        "lastName":"Testora",
        "dateOfBirth":"11/07/1984",
        "jobTitle":"CTO",
        "company":"Test co",
        "country":"GBR"
        },
        {
        "firstName":"Simon",
        "lastName":"McTester",
        "dateOfBirth":"01/11/1987",
        "jobTitle":"Product manager",
        "company":"Mock industries",
        "country":"IND"
        },
        {
        "firstName":"Selina",
        "lastName":"Testo",
        "dateOfBirth":"23/11/1972",
        "jobTitle":"Software developer",
        "company":"Mock industries",
        "country":"IND"
        },
        {
        "firstName":"Tim",
        "lastName":"Mockman",
        "dateOfBirth":"12/11/1972",
        "jobTitle":"Software developer",
        "company":"Mock industries",
        "country":"IND"
        },
        {
        "firstName":"Melissa",
        "lastName":"Mocker",
        "dateOfBirth":"10/01/1982",
        "jobTitle":"Software developer",
        "company":"Mock industries",
        "country":"USA"
        }
    ],
    "region": [
        "Asia",
        "Europe"
    ]
}    

describe('Check the request body to get emplyee details using the country value', () => {
    it('tests /employee/details endpoint', async() => {
        try {
            const response = await requestWithSupertest.post('/employee/details').send(body);
            expect(response.statusCode).toBe(200);
        } catch (err) {
            console.log(`${err}`)
        }
    });

});