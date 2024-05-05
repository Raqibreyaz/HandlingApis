import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('welcome to backend')
}
)

app.get('/api/products', (req, res) => {

    const products = [
        {
            id: 1,
            name: 'adidas shoes',
        },
        {
            id: 2,
            name: 'polyester',
        },
        {
            id: 3,
            name: 'nylon',
        },
        {
            id: 4,
            name: 'monica',
        },
        {
            id: 5,
            name: 'dupion',
        },
        {
            id: 6,
            name: 'classmate',
        },
        {
            id: 7,
            name: 'juice',
        }
    ]

    // http://localhost:3000/api/products?search=metal 
    // here search is a query and the value is the entered text for search
    // try filtering out all results related to query
    if (req.query.search) {
        const filteredProducts = products.filter((product) => {
            return product.name.includes(req.query.search)
        }
        )

        res.send(filteredProducts);
        return;
    }
    setTimeout(() => {
        res.send(products)
    }, 3000);
}
)

const port = 3000;

app.listen(port, () => {
    console.log(`app is running at http://localhost:${port}`);
}
)