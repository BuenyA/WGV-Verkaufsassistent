const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');

// Read JSON file
// const data = JSON.parse(fs.readFileSync('test.json', 'utf8'));
var date = new Date();
var today = String(date.getDate()).padStart(2, '0') + '.' + String(date.getMonth() + 1).padStart(2, '0') + '.' + date.getFullYear();

module.exports = { 
    createInsurancePolicy: async function createInsurancePolicy(json) {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]);

        const { geschlecht, vorname, nachname, modell, neuwert, kasko, alter, plz, stadt, straße, hausnummer } = json;

        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        var fontSize = 10;

        // const pngImageBytes = fs.readFileSyncpath.join(__dirname, 'utils', 'wgv.png');
        const pngImageBytes = fs.readFileSync('/usr/src/app/utils/wgv.png');
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
        
        page.drawText("Herr", { x: 50, y: 640, size: 11, font }); // Adjusted position
        // page.drawText(geschlecht, { x: 50, y: 640, size: 11, font }); // Adjusted position
        page.drawText(vorname + " " + nachname, { x: 50, y: 625, size: 11, font }); // Adjusted position
        page.drawText(straße + " " + hausnummer, { x: 50, y: 610, size: 11, font }); // Adjusted position
        page.drawText(plz + " " + stadt, { x: 50, y: 595, size: 11, font }); // Adjusted position

        page.drawText('Versicherungsschein zur Mopedversicherung', { x: 50, y: 520, size: 16, font: boldFont, color: rgb(0, 0, 0) });

        page.drawText('Mitglieds-/Kundennummer:', { x: 50, y: 500, size: fontSize, font: boldFont });
        page.drawText('P123456789', { x: 200, y: 500, size: fontSize, font: boldFont }); // Dummy value for customer number
        page.drawText('Versicherungsscheinnummer:', { x: 50, y: 485, size: fontSize, font: boldFont });
        page.drawText('V123456789', { x: 200, y: 485, size: fontSize, font: boldFont });

        page.drawText('Rechnungsnummer:', { x: 50, y: 470, size: fontSize, font: boldFont });
        page.drawText('R123456789', { x: 200, y: 470, size: fontSize, font: boldFont }); // Dummy value for invoice number
        page.drawText('Ausfertigungsgrund:', { x: 50, y: 455, size: fontSize, font: boldFont });
        page.drawText('Neuvertrag', { x: 200, y: 455, size: fontSize, font: boldFont });

        page.drawText('Versicherungslaufzeit:', { x: 50, y: 440, size: fontSize, font: boldFont });
        page.drawText(`Beginn der Änderung: ${today}`, { x: 200, y: 440, size: fontSize, font: boldFont });
        page.drawText(`Versicherungsablauf: 31.12.2999`, { x: 200, y: 425, size: fontSize, font: boldFont });

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
        
        page.drawText('Jahresbeitrag für die Mopedversicherung (Kasko: ' + kasko + '):                                                                67,30 EUR', { x: 50, y: 165, size: fontSize, font });
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

        const fileName = 'InsurancePolicy' + String(date.getTime()) + '.pdf'

        fs.writeFileSync('/usr/src/app/utils/policies/' + fileName, pdfBytes);

        return fileName;
    }
}

// createInsurancePolicy(JSON.parse(fs.readFileSync('test.json', 'utf8')));