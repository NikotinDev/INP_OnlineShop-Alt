"use strict"

var http = require('http');
var fs = require('fs');

var port = 8080;

const csv_data = fs.readFileSync("products_new.csv", "utf-8");

const products = csv_data.split("\n");
products.shift();

let homepage = fs.readFileSync('hauptseite.html', "utf-8");
let homepage_css = fs.readFileSync('hauptseite.css', "utf-8");
let category_alltag = fs.readFileSync('kategorie_alltag.html', "utf-8");
let category_technic = fs.readFileSync('kategorie_technik.html', "utf-8");
let product_tasse = fs.readFileSync('produkt_tasse.html', "utf-8");
let css_navbar = fs.readFileSync('nav_bar.css', "utf-8");
let css_products = fs.readFileSync('produkte.css', "utf-8");
let css_categories = fs.readFileSync('kategorien.css', "utf-8");

let recordToHTML = record => { 
    const fields = record.split(",");
    let html = fs.readFileSync("produkt_rx5600xt.html","utf-8");

    html = html.replaceAll("${tagline}", fields[0]);
    html = html.replaceAll("${beschreibung}", fields[1]);
    html = html.replaceAll("${menge}", fields[2]);
    html = html.replaceAll("${preis}", fields[3]);
    return html;
}

const pages = products
        .filter(row => row !== "")
        .map(recordToHTML);

// routing
const server = http.createServer((req,res) => {
console.log("Req Url ist: " + req.url);
    switch(req.url)
    {
        // html
        case '/':
            res.writeHead(200,{"Content-Type": "text/html"});
            res.write(homepage);
            res.end();
            break;
        // kategorien
        case '/kategorie_alltag.html':
            res.writeHead(200,{"Content-Type": "text/html"});
            res.write(category_alltag);
            res.end();
            break;
        case '/kategorie_technik.html':
            res.writeHead(200,{"Content-Type": "text/html"});
            res.write(category_technic);
            res.end();
            break;
        //
        // produkte
        case '/produkt_rx5600xt.html':
            res.writeHead(200,{"Content-Type": "text/html"});
            res.write(pages[0]);
            res.end();
            break;
        case '/produkt_tasse.html':
            res.writeHead(200,{"Content-Type": "text/html"});
            res.write(product_tasse);
            res.end();
            break;
        //
        // css
        case '/hauptseite.css':
            res.writeHead(200,{"Content-Type": "text/css"});
            res.write(homepage_css);
            res.end();
            break;
        case '/nav_bar.css':
            res.writeHead(200,{"Content-Type": "text/css"});
            res.write(css_navbar);
            res.end();
            break;
        case '/produkte.css':
            res.writeHead(200,{"Content-Type": "text/css"});
            res.write(css_products);
            res.end();
            break;
        case '/kategorien.css':
            res.writeHead(200,{"Content-Type": "text/css"});
            res.write(css_categories);
            res.end();
            break;
        //
        default:
            break;
    }
});

server.listen(port);
console.log(`Server listening on port: ${port}`);
//

