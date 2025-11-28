import { cloudinary_js_config } from '../config/cloudniary';
import fs from 'fs/promises';

export const uploadPDF = async (filePath: string, folder = '') => {
   try {
      const result = await cloudinary_js_config.uploader.upload(filePath, {
         folder,
         resource_type: 'raw',
      });
      await fs.unlink(filePath);
      return result.secure_url;
   } catch (error: any) {
      throw new Error(`PDF Upload Error: ${error.message}`);
   }
};