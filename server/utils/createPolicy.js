const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');

// Read JSON file
// const data = JSON.parse(fs.readFileSync('test.json', 'utf8'));
var today = new Date();
var dd = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var mm = String(today.getDate()).padStart(2, '0');
var yyyy = today.getFullYear();

today = mm + '.' + dd + '.' + yyyy;

async function createInsurancePolicy(json) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size in points

    const { name, staße, stadt } = json.customer;
    const { number, type, start_date, end_date, modell } = json.policy;

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

    page.drawText('WGV Versicherung AG', { x: 450, y: 740, size: 8, font: boldFont });
    page.drawText('wgv.de', { x: 450, y: 730, size: 8, font });
    page.drawText('Besucheradresse:', { x: 450, y: 715, size: 8, font });
    page.drawText('Feinstraße 1 - Ecke Tübinger Straße', { x: 450, y: 705, size: 8, font });
    page.drawText('70178 Stuttgart', { x: 450, y: 695, size: 8, font });

    page.drawText('Postanschrift:', { x: 450, y: 680, size: 8, font });
    page.drawText('WGV Versicherung', { x: 450, y: 670, size: 8, font });
    page.drawText('70164 Stuttgart', { x: 450, y: 660, size: 8, font });
    
    page.drawText('Hauptverwaltung:', { x: 450, y: 645, size: 8, font });
    page.drawText('Tübinger Straße 55', { x: 450, y: 635, size: 8, font });
    page.drawText('70178 Stuttgart', { x: 450, y: 625, size: 8, font });
    
    page.drawText('Herr', { x: 50, y: 640, size: 12, font }); // Adjusted position
    page.drawText(name, { x: 50, y: 625, size: 12, font }); // Adjusted position
    page.drawText(staße, { x: 50, y: 610, size: 12, font }); // Adjusted position
    page.drawText(stadt, { x: 50, y: 595, size: 12, font }); // Adjusted position

    page.drawText('Versicherungsschein zur Mopedversicherung', { x: 50, y: 520, size: 16, font: boldFont, color: rgb(0, 0, 0) });

    page.drawText('Mitglieds-/Kundennummer:', { x: 50, y: 500, size: fontSize, font: boldFont });
    page.drawText('P123456789', { x: 200, y: 500, size: fontSize, font: boldFont }); // Dummy value for customer number
    page.drawText('Versicherungsscheinnummer:', { x: 50, y: 485, size: fontSize, font: boldFont });
    page.drawText(number, { x: 200, y: 485, size: fontSize, font: boldFont });

    page.drawText('Rechnungsnummer:', { x: 50, y: 470, size: fontSize, font: boldFont });
    page.drawText('R123456789', { x: 200, y: 470, size: fontSize, font: boldFont }); // Dummy value for invoice number
    page.drawText('Ausfertigungsgrund:', { x: 50, y: 455, size: fontSize, font: boldFont });
    page.drawText(type, { x: 200, y: 455, size: fontSize, font: boldFont });

    page.drawText('Versicherungslaufzeit:', { x: 50, y: 440, size: fontSize, font: boldFont });
    page.drawText(`Beginn der Änderung: ${today}`, { x: 200, y: 440, size: fontSize, font: boldFont });
    page.drawText(`Versicherungsablauf: ${end_date}`, { x: 200, y: 425, size: fontSize, font: boldFont });

    page.drawText('Vertragsgrundlagen:', { x: 50, y: 400, size: fontSize, font: boldFont });
    page.drawText('Allgemeine Versicherungsbedingungen für die Haftpflichtversicherung (AHB 2007) - Form Nr. 01/2009 -', { x: 50, y: 380, size: fontSize, font });
    page.drawText('Besondere Bedingungen für die Mitversicherung von Vermögensschäden in der Haftpflichtversicherung', { x: 50, y: 365, size: fontSize, font });
    //   page.drawText('Besondere Bedingungen für die Mitversicherung von Vermögensschäden in der Haftpflichtversicherung', { x: 50, y: 340, size: fontSize, font });

    page.drawText('Versicherungsumfang:', { x: 50, y: 335, size: fontSize, font: boldFont });

    page.drawText('Die Versicherung ist gegen festen Beitrag abgeschlossen, damit entfällt der Anspruch auf Beitragsrückerstattung.', { x: 50, y: 315, size: fontSize, font });

    page.drawText('In der Privathaftpflichtversicherung ist Manfred Testerle beitragsfrei als Partner in einer eheähnlichen', { x: 50, y: 300, size: fontSize, font });
    page.drawText('Lebensgemeinschaft mitversichert. Schadenersatzansprüche der Partner untereinander sind vom', { x: 50, y: 285, size: fontSize, font });
    page.drawText('Versicherungsschutz ausgeschlossen. Die Mitversicherung erlischt, wenn die häusliche Gemeinschaft', { x: 50, y: 270, size: fontSize, font });
    page.drawText('der Partner aufgelöst wird. Dies ist uns unverzüglich anzuzeigen.', { x: 50, y: 255, size: fontSize, font });

    page.drawText('Versichertes Kraftfahrzeug:', { x: 50, y: 225, size: fontSize, font: boldFont });
    page.drawText(modell, { x: 50, y: 210, size: fontSize, font });
    
    page.drawText('Jahresbeitrag für die Mopedversicherung:                                                                                               67,30 EUR', { x: 50, y: 165, size: fontSize, font });
    page.drawText('Umsatzsteuer                                                                                                                                           12,79 EUR', { x: 50, y: 150, size: fontSize, font });
    
    page.drawLine({
        start: { x: 50, y: 140 },
        end: { x: 550, y: 140 },
        thickness: 1,
        color: rgb(0, 0, 0), // Schwarz
    });

    page.drawText('Insgesamte Jahresprämie                                                                                                                        80,09 EUR', { x: 50, y: 125, size: fontSize, font });

    page.drawText("Stuttgart, der " + today, { x: 50, y: 60, size: fontSize, font }); // Example date

    const pdfBytes = await pdfDoc.save();

    fileName = 'InsurancePolicy' + String(new Date().getTime()) + '.pdf'

    fs.writeFileSync('./policies/' + fileName, pdfBytes);

    return fileName;
}

// createInsurancePolicy();