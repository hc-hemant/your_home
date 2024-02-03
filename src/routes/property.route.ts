import express, { Request } from 'express';
import { PropertyController } from '../controllers/property.controller';
import { HttpStatusCode } from '../helpers/exceptions/exception.enums';
import { HttpException } from '../helpers/exceptions/http.exception';
import { IProperty } from '../models/property/Property.interface';
import { IGetAllPropertyRequestParams } from '../types/interfaces/property.interfaces';

const router = express.Router();

const propertyController = new PropertyController();

router.post('/add', (req, res) => {
    const files = req.files as Array<any>;
    const propertyInfo = JSON.parse(req.body.propertyInfo) as IProperty;
    propertyInfo.username = 'hc_hemant';

    if (files && propertyInfo) {
        propertyController.addProperty(files, propertyInfo).then(property => {
            res.status(200).send(property);
        });
    } else {
        res.status(404).send(new HttpException
            (
                HttpStatusCode.BAD_REQUEST,
                {
                    message: 'username and password are required'
                }
            )
        );
    }
});

router.get('/all', async ({ query }: { query: IGetAllPropertyRequestParams }, res) => {
    const getAllPropertiesRes = await propertyController.getAll(query);

    res.set({
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
    res.status(200).send(getAllPropertiesRes);
});

export default router;