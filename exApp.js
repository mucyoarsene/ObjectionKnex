const koa = require('koa');
const KoaRouter = require('koa-router');
const KoaJson = require('koa-json');
const bodyparser = require('koa-bodyparser');
const knex = require('./utils/database');
const Customer = require('./models/customers');

const app = new koa();
const router = new KoaRouter();
const port = process.env.PORT || 2000;

router.get('/', ctx => {
    ctx.body = {
        message: 'hello'
    }
    ctx.status = 200;
});

router.get('/insert', async ctx => {
    const {names, email} = ctx.request.body;

    try {
        const customer = await Customer.query().insert({
            names: names,
            email: email
        });
        ctx.body = {
            message: 'customer added',
            customer: customer,
            code: 200
        };
        ctx.status = 200
    }catch(err) {
        ctx.body = {
            error: err.data,
            code: 400
        }
        ctx.status = 400;
    }
});

router.get('/customers', async ctx => {
    const customers = await Customer.query();
    ctx.body = {
        message: 'Customers',
        customers: customers,
        code: 200
    }
    ctx.status = 200
});

app.use(bodyparser());
app.use(KoaJson());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log(`server is started on ${port}`));

