
class Company {

    constructor(name) {
        this.name = name;
        this.products = Array();
    }

    toString() {
        console.log(this.name);
        this.products.forEach(v => {
            console.log(v.toString());
        })
    }
}

module.exports = Company;