import mongoose from 'mongoose';

export class DatabaseConfig {

    constructor(private app: any) { }

    connect() {
        mongoose.connect('mongodb://hemant:admin1234567890@portfolio-shard-00-00.p6hft.mongodb.net:27017,portfolio-shard-00-01.p6hft.mongodb.net:27017,portfolio-shard-00-02.p6hft.mongodb.net:27017/YourHome?ssl=true&replicaSet=atlas-9viq1z-shard-0&authSource=admin&retryWrites=true&w=majority').then(_ => {
            const port = process.env.PORT || 8080;
            this.app.listen(port);
            console.log("Application has started listening on port : " + port);
        }).catch(err => {
            console.log("Failed to connect to Database| Error :- ", err);
        })
    }
}