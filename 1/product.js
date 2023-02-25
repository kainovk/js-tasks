class Product {
    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
}

function handleStringProperty(property, method, target) {
    switch (method) {
        case "contains":
            return property.includes(target);
        case "starts":
            return property.startsWith(target);
        case "ends":
            return property.endsWith(target);
        default:
            return false;
    }
}

function handleNumberProperty(property, comparator) {
    let start = comparator[0];

    if (start === '=') {
        return property == comparator.slice(1);
    }

    if (start === '>') {
        if (comparator[1] === '=') {
            return property >= comparator.slice(2);
        }
        return property > comparator.slice(1);
    }

    if (start === '<') {
        if (comparator[1] === '=') {
            return property <= comparator.slice(2);
        }
        return property < comparator.slice(1);
    }
}

function isCorrectProduct(product, conditionsStr) {
    let conditions = conditionsStr.split('&');

    for (const condition of conditions) {
        let options = condition.split('-');
        let objName = options[0];

        if (objName === 'name' || objName === 'description') {
            if (!handleStringProperty(product[options[0]], options[1], [options[2]])) {
                return false;
            }
        } else if (objName === 'price' || objName === 'quantity') {
            if (!handleNumberProperty(product[options[0]], options[1])) {
                return false;
            }
        }
    }

    return true;
}

function filterProducts(products, conditionsStr) {
    let correctProducts = [];

    for (const product of products) {
        if (isCorrectProduct(product, conditionsStr)) {
            correctProducts.push(product);
        }
    }

    return correctProducts;
}

let products = [
    new Product("rrcfd2", 2, 7, "dedeabc"),
    new Product("123", 2, 6, "abc"),
    new Product("2fd", 2, 6, "abc"),
    new Product("fdff", 5, 100, "fabc"),
    new Product("fdff", 2, 100, "fabc"),
    new Product("", 12, 21, ""),
    new Product("fd1", 12, 5, ""),
    new Product("fd2r", 5, 5, "a21"),
];

console.log(filterProducts(products, "name-contains-fd&price-=2-&quantity->5&description-ends-abc"));

console.log('-------');

console.log(filterProducts(products, "name-starts-fd&quantity-=5"));
