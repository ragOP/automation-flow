import axios from 'axios';

export const handleSendWhatsAppMessage = async (
  phoneNumber: string,
  link: string,
  firstName: string,
  lastName: string,
  zodiacSign: string,
  placeOfBirth: string
): Promise<boolean> => {

    try {
        const payload = {
            phone: phoneNumber,
            link,
            firstName,
            lastName,
            zodiacSign,
            placeOfBirth
        }

        const response = await axios.post('https://automations.chatsonway.com/webhook/69254b511b9845c02d55251a', payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.data?.accepted === true) {
           return true;
        }
        return false;
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        return false;
    }
};
