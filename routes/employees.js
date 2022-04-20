import express from 'express';
import {callCountry} from "../countrycall.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *  name: Employee Details
 *  description: Employee Details Routes
 * 
*/


/**
 * @swagger
 * /api/employee/details/:
 *   post:
 *     description: Get employee information
 *     tags: [Employee Details]
 *     parameters:
 *     - name: firstName
 *       description: employee firstName
 *       in: formData
 *       required: false
 *       type: string
 *     - name: lastName
 *       description: employee lastName
 *       in: formData
 *       required: false
 *       type: string
 *     - name: dateOfBirth
 *       description: employee dateOfBirth
 *       in: formData
 *       required: false
 *       type: string
 *     - name: jobTitle
 *       description: employee jobTitle
 *       in: formData
 *       required: false
 *       type: string
 *     - name: company
 *       description: employee company
 *       in: formData
 *       required: false
 *       type: string
 *     - name: country
 *       description: employee country code
 *       in: formData
 *       required: false
 *       type: string
 *     - name: region
 *       description: employee region
 *       in: formData
 *       required: false
 *       type: string
 *     responses:
 *       200:
 *         description: Returns employees info.
 *       400:
 *         description: no matching employees country found
*/


router.post('/', async (req, res) => {
    
    let resMsg = {Type: "success", Message: "", Body: {} }

    let employeeList = req.body.list

    let countries = [];

    for (const code of employeeList ) {

        countries.push(code.country);
    }

    try {    
    
    let countryCodeUrl = `/alpha?codes=${countries}`
    let jsonResp = await callCountry("GET", countryCodeUrl, null)

    let arr1 = req.body.list
    let arr2 = jsonResp.data

    const merged = [...arr1.concat(arr2).reduce((m, o) => 
    m.set(o.country, Object.assign(m.get(o.cioc) || {}, o))
    , new Map()).values()];


    let finalList = [];
    let countryRegion = req.body.region

    for (const profile of merged) {
            
        const profiles = {};

        profiles.firstName= profile.firstName;
        profiles.lastName = profile.lastName;
        profiles.dateOfBirth = profile.dateOfBirth;
        profiles.jobTitle = profile.jobTitle;
        profiles.company = profile.company;
        profiles.country = profile.country;
        profiles.countryFullName = profile.name.official;
        profiles.currency = profile.currencies;
        profiles.languages = profile.languages;
        profiles.timezones = profile.timezones;
        profiles.region = profile.region

        for (const region of countryRegion) {
            if (profile.region === region) {
                profiles.identifier = `${profile.firstName}${profile.lastName}${profile.dateOfBirth}`
            }

        }

        finalList.push(profiles);
        
    }   

    return res.status(200).json(finalList)

    } catch(error) {
        console.log(error)
        resMsg.Type = "error"
        resMsg.Message = 'search error'
        return res.status(400).json(resMsg) 
    }
    
});


export default router;