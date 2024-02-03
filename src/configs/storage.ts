import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
const cloudinary = require('cloudinary').v2;

export class StorageConfig {

    constructor(private fileIdentifier: string) { }

    setMultipleFileStorageConfig() {
        return multer({ storage: this.getStorageConfig() }).array(this.fileIdentifier, 15);
    }

    private getStorageConfig() {
        cloudinary.config({
            cloud_name: 'yhome',
            api_key: '318412395291714',
            api_secret: 'UnliMfmT641Da3cE3iWuUnT9lrA'
        });

        return new CloudinaryStorage({
            cloudinary,
            params: {
                folder: 'images',
                format: (req, file) => {
                    const fileType = file.mimetype.split('/')[1];
                    return fileType;
                },
                public_id: (req, file) => {
                    const fileName = file.originalname.replace(' ', '_');
                    return `${new Date().toISOString()}_${fileName}`;
                }
            }
        });
    }
}