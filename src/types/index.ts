export interface UserFormData {
    firstName: string;
    lastName: string;
    dob: string;
    placeOfBirth: string;
    phoneNumber: string;
    email?: string;
}

export interface OrderDocument extends UserFormData, Document {
    pdfUrl: string;
    isWhatsAppSent: boolean;
}