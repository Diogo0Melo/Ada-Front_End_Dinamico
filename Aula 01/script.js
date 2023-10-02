const { JSDOM } = require("jsdom");

// const dom = new JSDOM(`
// <!DOCTYPE html>
// <p><span>Este</span> é um parágrafo</p>
// `);

JSDOM.fromFile("./index.html").then((dom) => {
    const document = dom.window.document;

    const paragrafo = document.querySelector("p:nth-of-type(2)");
    console.log(paragrafo.textContent, paragrafo.innerHTML);

    const paragrafos = document.querySelectorAll("p");
    console.log(paragrafos);
    paragrafos.forEach((p) => {
        console.log(p.textContent);
    });

    const tagInexistente = document.querySelector("banana");
    console.log(tagInexistente?.textContent);
});
