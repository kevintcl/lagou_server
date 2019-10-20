

var Product = require("./company_product");

var Company = require("./company.js")

var product = new Product("a", "b" , "c");

console.log(product.toString());

var company = new Company("kevint");
company.products[0] = product;

company.toString();

console.log(__dirname);
