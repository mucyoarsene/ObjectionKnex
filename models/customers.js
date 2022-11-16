const { Model } = require("objection");
const Order = require("./orders");

class Customer extends Model {
    static get tableName(){
        return 'customers';
    };

    $beforeInsert(){
        this.createdAt = new Date();
    };

    $beforeUpdate(){
        this.updatedAt = new Date();
    };

    static get nameColumn(){
        return 'names';
    };

    static get nameColumn(){
        return 'email';
    };

    static get jsonSchema(){
        return {
            type: 'object',
            required: ['names', 'email'],
            properties: {
                id: {type: 'integer'},
                names: {type: 'string', minLength: 1, maxLength: 255},
                email: {type: 'string'},
                createdAt: {type: 'string'},
                updatedAt: {type: 'string'}
            }
        }
    }

    static relationMappings = {
        order: {
            relation: Model.HasOneRelation,
            ModelClass: Order,
            join: {
                from: 'customers.id',
                to: 'orders.customer_id'
            }
        }
    } 
}

module.exports = Customer;
