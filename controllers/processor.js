const bookProcessor = {};
const Book = require('../models/book');
const XLSX = require('xlsx');

const moment = require("moment");

bookProcessor.makePriceBook = async (req, res, next) => {
    let pc = req.query.pc;
    let pe = req.query.pe;
    let copyPrice = pc ? Number(pc) : 0.36;
    let engargolado = pe ? Number(pe) : 18;
    try {
        let books = await Book.findAll({
            where: {
                ACTUALIZED: true
            }
        });
        //Generate workbook
        let wb = XLSX.utils.book_new();
        //Separate books
        let ordered = {};
        let careers = [];
        for (let book of books) {
            if (careers.indexOf(book.CAREER) === -1) careers.push(book.CAREER);
            let careerName = book.CAREER + " " + book.CUATRI;
            if (!ordered[careerName]) ordered[careerName] = [];
            ordered[careerName].push(book);
        }
        for (const career of careers) {
            let worksheetName = career;
            let wsd = [];
            for (const bookPackage of Object.keys(ordered)) {
                if (bookPackage.includes(career)) {
                    let cnameRow = [bookPackage];
                    wsd.push(cnameRow);
                    let titlesRow = ["Titulo", "Autor", "Edicion", "Editorial", "Impresiones", "Precio"];
                    wsd.push(titlesRow);
                    let total = 0;
                    for (let i = 0; i < ordered[bookPackage].length; i++) {
                        let c = ordered[bookPackage][i];
                        let price = Math.ceil((copyPrice * Number(c.COPIES))) + engargolado;
                        wsd.push([c.BOOK_NAME, c.BOOK_AUTHOR, c.EDITION, c.BOOK_PUBLISHER, c.COPIES, price]);
                        total += price;
                    }
                    wsd.push(["", "", "", "", "Total", total]);
                    wsd.push([]);
                    wsd.push([]);
                }
            }
            let ws = XLSX.utils.aoa_to_sheet(wsd);
            if (worksheetName.length > 31) worksheetName = worksheetName.slice(31)
            XLSX.utils.book_append_sheet(wb, ws, worksheetName);
        }
        let timestamp = moment().format('MMMM DD YYYY');
        let path = `./public/prices/ ${timestamp}.xlsx`;
        XLSX.writeFile(wb, path);
        res.send({success: true, payload: {path: path}});
    } catch (e) {
        return res.send({success: true, payload: e.message})
    }

}

bookProcessor.displayCareers = async (req, res, next) => {
    const Career = require("../models/careers");
    try {
        let careers = await Career.findAll();
        res.send({success: true, payload: careers});
    } catch (e) {
        res.send({success: false, message: e.message});
    }
}

bookProcessor.searchBookPackage = async (req, res, next) => {
    let c = req.query.c;
    let q = req.query.q;
    try {
        let books = await Book.findAll({
            where: {
                CAREER: c,
                CUATRI: q
            }
        })
        res.send({success: true, payload: books});
    } catch (e) {
        return res.send({success: false, message: e.message});
    }
}

bookProcessor.updateBook = async (req, res, next) => {
    let r = await Book.update(req.body,{
        where : {
            BOOK_ID : req.body.BOOK_ID
        }
    });
    res.send({success: true, payload: r});
}

module.exports = bookProcessor;