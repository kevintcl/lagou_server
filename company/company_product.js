


class Product {
    constructor(name, des, type) {
        this.name = name;
        this.des = des;
        this.type = type;
    }

    toString() {
        return "name=" + this.name +
            "\ndes=" + this.des +
            "\ntype=" + this.type;
    }
}

// export default Product;
module.exports=Product;