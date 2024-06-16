import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Please Select the user for you want to generate the certificate.']
    },
    fields: [{
        value: {
            type: String,
            required: [true, 'Please fill the value of the field.']
        }
    }],
    certificateNumber: {
        type: String,
        required: [true, 'Please fill the certificate number.']
    },
    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'template',
        required: [true, 'Please upload template of certificate.']
    }

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Certificate = mongoose.models?.certificate || mongoose.model('certificate', CertificateSchema);
export default Certificate;