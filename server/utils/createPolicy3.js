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
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  var fontSize = 10;

  // Embed logo image
  const pngImageBytes = fs.readFileSync('./wgv.png'); // Adjust path to your image
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  const pngDims = pngImage.scale(0.25);

  page.drawImage(pngImage, {
    x: page.getWidth() - pngDims.width - 50,
    y: page.getHeight() - pngDims.height - 50,
    width: pngDims.width,
    height: pngDims.height,
  });

  page.drawText('WGV Versicherung AG', { x: 50, y: 800, size: fontSize, font });
  page.drawText('Besucheradresse:', { x: 50, y: 785, size: fontSize, font });
  page.drawText('Feinstraße 1 - Ecke Tübinger Straße', { x: 50, y: 770, size: fontSize, font });
  page.drawText('70178 Stuttgart', { x: 50, y: 755, size: fontSize, font });

  page.drawText(name, { x: 350, y: 800, size: fontSize, font }); // Adjusted position
  page.drawText(address, { x: 350, y: 785, size: fontSize, font }); // Adjusted position

  page.drawText('Versicherungsschein zur Haftpflichtversicherung', { x: 50, y: 670, size: 16, font: boldFont, color: rgb(0, 0, 0) });

  page.drawText('Mitglieds-/Kundennummer:', { x: 50, y: 650, size: fontSize, font: boldFont });
  page.drawText('P123456789', { x: 200, y: 650, size: fontSize, font: boldFont }); // Dummy value for customer number
  page.drawText('Versicherungsscheinnummer:', { x: 50, y: 635, size: fontSize, font: boldFont });
  page.drawText(number, { x: 200, y: 635, size: fontSize, font: boldFont });

  page.drawText('Rechnungsnummer:', { x: 50, y: 620, size: fontSize, font: boldFont });
  page.drawText('R123456789', { x: 200, y: 620, size: fontSize, font: boldFont }); // Dummy value for invoice number
  page.drawText('Ausfertigungsgrund:', { x: 50, y: 605, size: fontSize, font: boldFont });
  page.drawText(type, { x: 200, y: 605, size: fontSize, font: boldFont });

  page.drawText('Versicherungslaufzeit:', { x: 50, y: 585, size: fontSize, font: boldFont });
  page.drawText(`Beginn der Änderung: ${start_date}`, { x: 200, y: 585, size: fontSize, font: boldFont });
  page.drawText(`Versicherungsablauf: ${end_date}`, { x: 200, y: 570, size: fontSize, font: boldFont });

  page.drawText('Vertragsgrundlagen:', { x: 50, y: 330, size: fontSize, font: boldFont });
  page.drawText('Allgemeine Versicherungsbedingungen für die Haftpflichtversicherung (AHB 2007) - Form Nr. 01/2009 -', { x: 50, y: 310, size: fontSize, font });
  page.drawText('Besondere Bedingungen für die Mitversicherung von Vermögensschäden in der Haftpflichtversicherung', { x: 50, y: 295, size: fontSize, font });
//   page.drawText('Besondere Bedingungen für die Mitversicherung von Vermögensschäden in der Haftpflichtversicherung', { x: 50, y: 340, size: fontSize, font });

  page.drawText('Versicherungsumfang:', { x: 50, y: 265, size: fontSize, font: boldFont });

  page.drawText('Die Versicherung ist gegen festen Beitrag abgeschlossen, damit entfällt der Anspruch auf Beitragsrückerstattung.', { x: 50, y: 245, size: fontSize, font });

  page.drawText('In der Privathaftpflichtversicherung ist Manfred Testerle beitragsfrei als Partner in einer eheähnlichen', { x: 50, y: 230, size: fontSize, font });
  page.drawText('Lebensgemeinschaft mitversichert. Schadenersatzansprüche der Partner untereinander sind vom', { x: 50, y: 215, size: fontSize, font });
  page.drawText('Versicherungsschutz ausgeschlossen. Die Mitversicherung erlischt, wenn die häusliche Gemeinschaft', { x: 50, y: 200, size: fontSize, font });
  page.drawText('der Partner aufgelöst wird. Dies ist uns unverzüglich anzuzeigen.', { x: 50, y: 185, size: fontSize, font });

  page.drawText('Besonders vereinbart sind:', { x: 50, y: 155, size: fontSize, font: boldFont });
  page.drawText(special_agreement, { x: 50, y: 140, size: fontSize, font });

  page.drawText('Datum 12.04.20xx', { x: 50, y: 60, size: fontSize, font: boldFont }); // Example date

  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync('InsurancePolicy.pdf', pdfBytes);
}

createInsurancePolicy();
