function doGet() {
    const template = 'index';
    return HtmlService.createTemplateFromFile(template).evaluate();
}

//This function is for getting external sorce to include css, js file into index.html
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function sendForm(csvFile) {
    Logger.log(csvFile);
}