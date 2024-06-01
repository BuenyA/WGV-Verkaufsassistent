const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');

// Read JSON file
const data = JSON.parse(fs.readFileSync('./test.json', 'utf8'));

async function createInsurancePolicy() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size in points

  const { name, address } = data.customer;
  const { number, type, start_date, end_date, details, special_agreement } = data.policy;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  page.drawText('WGV Versicherung AG', { x: 50, y: 800, size: fontSize, font });
  page.drawText('Besucheradresse:', { x: 50, y: 780, size: fontSize, font });
  page.drawText('Feinstraße 1 - Ecke Tübinger Straße', { x: 50, y: 765, size: fontSize, font });
  page.drawText('70178 Stuttgart', { x: 50, y: 750, size: fontSize, font });

  page.drawText(name, { x: 50, y: 720, size: fontSize, font });
  page.drawText(address, { x: 50, y: 705, size: fontSize, font });

  page.drawText('Versicherungsschein zur Haftpflichtversicherung', { x: 50, y: 670, size: fontSize, font, color: rgb(0, 0, 0) });

  page.drawText('Versicherungsscheinnummer:', { x: 50, y: 650, size: fontSize, font });
  page.drawText(number, { x: 200, y: 650, size: fontSize, font });

  page.drawText('Ausfertigungsgrund:', { x: 50, y: 630, size: fontSize, font });
  page.drawText(type, { x: 200, y: 630, size: fontSize, font });

  page.drawText('Versicherungslaufzeit:', { x: 50, y: 610, size: fontSize, font });
  page.drawText(`Beginn der Änderung: ${start_date}`, { x: 200, y: 610, size: fontSize, font });
  page.drawText(`Versicherungsablauf: ${end_date}`, { x: 200, y: 595, size: fontSize, font });

  page.drawText('Versicherungsumfang:', { x: 50, y: 570, size: fontSize, font });
  page.drawText(details, { x: 200, y: 570, size: fontSize, font });

  page.drawText('Besonders vereinbart sind:', { x: 50, y: 550, size: fontSize, font });
  page.drawText(special_agreement, { x: 50, y: 535, size: fontSize, font });

  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync('InsurancePolicy.pdf', pdfBytes);
}

createInsurancePolicy();