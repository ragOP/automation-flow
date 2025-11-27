import fs from "fs";
import path from "path";
import * as htmlPdf from "html-pdf-node-ts";

// THIS WORKS IN COMMONJS
const templatePath = path.join(__dirname, "../template/index.html");

export async function generatePDF(data: any): Promise<Buffer> {
  let html = fs.readFileSync(templatePath, "utf-8");

  Object.keys(data).forEach(key => {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), data[key] || "");
  });

  const file = { content: html };

  const pdfBuffer = await htmlPdf.generatePdf(file);
  return pdfBuffer;
}
