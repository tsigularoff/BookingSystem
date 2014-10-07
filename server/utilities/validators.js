/**
 * Created by Geno on 7.10.2014 г..
 */
function validatePage(page) {
    page = parseInt(page) || 1;
    if (page < 1) {
        page = 1;
    }
    return page;
}

function validateSort(prop,collection) {
    return collection.indexOf(prop)>-1 ? prop : collection[0];
}

module.exports={
    validatePage:validatePage,
    validateSort:validateSort
}