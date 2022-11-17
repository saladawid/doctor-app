import PDFDocument from 'pdfkit';
import {currentDate} from './currentDate.js';
const date = currentDate();

const line = '__________________________________________________________'

export const createPDF = (data, dataCallback, endCallback) => {

    const doc = new PDFDocument({bufferPages: true, font: 'Helvetica'});

    doc.on('data', dataCallback);
    doc.on('end', endCallback);

    doc
        .fontSize(25)
        .text('APP DOCTOR', 50, 50, {
            link: 'https://appdoctor.project-online.site/',
        });
    doc
        .fontSize(20)
        .text(`${date}`, 430, 50);
    doc
        .fontSize(20)
        .text('Discharge Summary', 50, 130, {
            align: 'center',
        })
        .moveDown();
    doc
        .fontSize(15)
        .text(`Name: ${data.patient.name}`)
        .text(`Surname: ${data.patient.surname}`)
        .text(line)
        .moveDown()
    doc
        .text(`Date of admission: ${data.patient.dateOfAdmission}`)
        .text(`Date of discharge: ${data.patient.dateOfDischarge}`)
        .text(line)
        .moveDown()
    doc
        .text('Diagnosis: ')
        .text(`${data.patient.diagnosis}`, {
            align: 'justify',
        })
        .text(line)
        .moveDown()

    data.tests.map((test) => doc.text(`Test name: '${test.name}'    Score: ${test.score > 10 ? test.score : '0' + test.score}    Date: ${test.date}`, {}))

    doc.moveDown(6);
    doc
        .fontSize(15)
        .text(`Main doctor : ${data.patient.user.email}`, {
            align: 'right',
        })
        .moveDown()
        .text(`Discharge doctor: ${data.user} `, {
            align: 'right',
        });
    doc.end();
};


