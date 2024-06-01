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
  const fontSize = 10;

  page.drawText('WGV Versicherung AG', { x: 50, y: 800, size: fontSize, font });
  page.drawText('Besucheradresse:', { x: 50, y: 785, size: fontSize, font });
  page.drawText('Feinstraße 1 - Ecke Tübinger Straße', { x: 50, y: 770, size: fontSize, font });
  page.drawText('70178 Stuttgart', { x: 50, y: 755, size: fontSize, font });

  page.drawText(name, { x: 50, y: 720, size: fontSize, font });
  page.drawText(address, { x: 50, y: 705, size: fontSize, font });

  page.drawText('Versicherungsschein zur Haftpflichtversicherung', { x: 50, y: 670, size: fontSize, font, color: rgb(0, 0, 0) });

  page.drawText('Mitglieds-/Kundennummer:', { x: 50, y: 650, size: fontSize, font });
  page.drawText('P123456789', { x: 200, y: 650, size: fontSize, font }); // Dummy value for customer number
  page.drawText('Versicherungsscheinnummer:', { x: 50, y: 635, size: fontSize, font });
  page.drawText(number, { x: 200, y: 635, size: fontSize, font });

  page.drawText('Rechnungsnummer:', { x: 50, y: 620, size: fontSize, font });
  page.drawText('R123456789', { x: 200, y: 620, size: fontSize, font }); // Dummy value for invoice number
  page.drawText('Ausfertigungsgrund:', { x: 50, y: 605, size: fontSize, font });
  page.drawText(type, { x: 200, y: 605, size: fontSize, font });

  page.drawText('Versicherungslaufzeit:', { x: 50, y: 585, size: fontSize, font });
  page.drawText(`Beginn der Änderung: ${start_date}`, { x: 200, y: 585, size: fontSize, font });
  page.drawText(`Versicherungsablauf: ${end_date}`, { x: 200, y: 570, size: fontSize, font });

  page.drawText('Vertragsgrundlagen:', { x: 50, y: 550, size: fontSize, font });
  page.drawText('Allgemeine Versicherungsbedingungen für die Haftpflichtversicherung (AHB 2007) - Form Nr. 01/2009 -', { x: 50, y: 535, size: fontSize, font });
  page.drawText('Besondere Bedingungen für die Mitversicherung von Vermögensschäden in der Haftpflichtversicherung', { x: 50, y: 520, size: fontSize, font });

  page.drawText('Versicherungsumfang:', { x: 50, y: 500, size: fontSize, font });
  page.drawText(details, { x: 50, y: 485, size: fontSize, font });

  page.drawText('Die Versicherung ist gegen festen Beitrag abgeschlossen, damit entfällt der Anspruch auf Beitragsrückerstattung.', { x: 50, y: 470, size: fontSize, font });

  page.drawText('In der Privathaftpflichtversicherung ist Manfred Testerle beitragsfrei als Partner in einer eheähnlichen', { x: 50, y: 450, size: fontSize, font });
  page.drawText('Lebensgemeinschaft mitversichert. Schadenersatzansprüche der Partner untereinander sind vom', { x: 50, y: 435, size: fontSize, font });
  page.drawText('Versicherungsschutz ausgeschlossen. Die Mitversicherung erlischt, wenn die häusliche Gemeinschaft', { x: 50, y: 420, size: fontSize, font });
  page.drawText('der Partner aufgelöst wird. Dies ist uns unverzüglich anzuzeigen.', { x: 50, y: 405, size: fontSize, font });

  page.drawText('Besonders vereinbart sind:', { x: 50, y: 385, size: fontSize, font });
  page.drawText(special_agreement, { x: 50, y: 370, size: fontSize, font });

  page.drawText('Datum 12.04.20xx', { x: 50, y: 340, size: fontSize, font }); // Example date

  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync('InsurancePolicy.pdf', pdfBytes);
}

createInsurancePolicy();
