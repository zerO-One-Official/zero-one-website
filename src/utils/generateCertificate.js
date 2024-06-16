import { PDFDocument, rgb } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit';

async function fileToArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        if (!file) reject("File is empty");

        const reader = new FileReader();

        reader.onload = function (event) {
            const arrayBuffer = event.target.result;
            resolve(arrayBuffer);
        };

        reader.readAsArrayBuffer(file);
    });
}

function hexToRgb(hex) {
    // Remove the hash sign, if it exists
    hex = hex.replace(/^#/, '');

    // Parse hexadecimal color value into RGB components
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    // Return RGB color as an object with values in the range from 0 to 1
    return { r, g, b };
}

const generateCertificate = async (fields, template) => {

    try {
        if (!template) throw new Error("Template is empty");
        let pdfBuffer;
        if (typeof template === 'string') {
            pdfBuffer = await fetch(template).then((res) => res.arrayBuffer());
        }
        else pdfBuffer = await fileToArrayBuffer(template[0]);

        const pdfDoc = await PDFDocument.load(pdfBuffer);
        pdfDoc.registerFontkit(fontkit);


        const fontBuffer = await fetch("/font/Gilroy-SemiBold.ttf").then((res) => res.arrayBuffer());
        const font = await pdfDoc.embedFont(fontBuffer);

        // const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

        const pages = pdfDoc.getPages();
        const pageWidth = pages[0].getWidth();
        const pageHeight = pages[0].getHeight();

        fields.map(feild => {
            const { r, g, b } = hexToRgb(feild.color)

            const textWidth = font.widthOfTextAtSize(String(feild.value), Number(feild.size));
            const textHeight = font.sizeAtHeight(Number(feild.size));

            pages[0].drawText(String(feild.value), {
                x: parseFloat(feild.x) || (pageWidth / 2) - textWidth / 2,
                y: parseFloat(feild.y) || (pageHeight / 2) - textHeight / 2,
                size: parseFloat(feild.size) || 34,
                font: font,
                color: rgb(r || 1, g || 1, b || 1)
            });

        });

        const modifiedPdfBytes = await pdfDoc.save();
        const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
        const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);

        return modifiedPdfUrl;
    } catch (error) {
        console.error("Error generating certificate:", error.message);
        throw error;
    }
}

export default generateCertificate
