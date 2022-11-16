const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const KoaRouter = require('koa-router');
const KoaJson = require('koa-json');
const Customer = require('./models/customers');
const Order = require('./models/orders');
const knex = require('./utils/database');

const app = new Koa();
const router = new KoaRouter();
const port = process.env.PORT || 2000

// const main = async () => {
//     // const customer = await Customer.query().insert({
//     //     names: 'Arsene',
//     //     email: 'mucyoarsene@gmail.com'
//     // }); console.log(customer);
// }

// main()
//     .then(() => knex.destroy())
//     .catch((err) => {
//         console.error(err);
//         return knex.destroy();
//     })

router.get('/', ctx => {
    ctx.body = {
        message: 'hello objection and knex'
    };
    ctx.status = 200;
});

router.get('/insert', async ctx => {
    const {names, email} = ctx.request.body;

try {
    const customer = await Customer.query().insert({
        names: names,
        email: email
    }); console.log(customer);
    
    ctx.body = {
        message: 'Customer added',
        customer: customer,
        code: 200
    };
    ctx.status = 200;
}catch(err) {
    ctx.body = {
        error: err.data,
        code: 400
    }
    ctx.status   = 400;
}
});

router.get('/customers', async ctx => {
    const customers = await Customer.query();
    ctx.body = {
        code: 200,
        customers
    };
    ctx.status = 200;
});

app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());
app.use(KoaJson());

app.listen(port, () => console.log(`Server started on http://localhost:${port} ...`));  
