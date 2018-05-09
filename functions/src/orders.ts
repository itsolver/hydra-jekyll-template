/**
 * orders.js
 * Stripe Payments Demo. Created by Romain Huet (@romainhuet).
 *
 * Simple library to store and interact with orders and products.
 * These methods are using the Stripe Orders API, but we tried to abstract them
 * from the main code if you'd like to use your own order management system instead.
 */

'use strict';

const config = require('./config');
const stripe = require('stripe')(config.stripe.secretKey);
stripe.setApiVersion(config.stripe.apiVersion);
const _ = require('lodash');

// Create an order.
const createOrder = async (currency, items, email, shipping) => {
  return await stripe.orders.create({
    currency,
    items,
    email,
    shipping,
    metadata: {
      status: 'created',
    },
  });
};

// Create a subscription order.
const createSubscription = async (email, source, shipping, plans) => {
  const customer = await stripe.customers.create({
    email: email,
    source: source.id,
    shipping: shipping,
    metadata: {
      status: 'created',
    }
  });
  const plainArray = _.values(plans);
  const items = plainArray.map((plan)=> ({plan: plan.id}));
  return await stripe.subscriptions.create({
    customer: customer.id,
    items: items
  })
};

// Retrieve an order by ID.
const retrieveOrder = async orderId => {
  return await stripe.orders.retrieve(orderId);
};

// Update an order.
const updateOrder = async (orderId, properties) => {
  return await stripe.orders.update(orderId, properties);
};

// List all products.
const listProducts = async () => {
  return await stripe.products.list({limit: 1});
};

// Retrieve a product by ID.
const retrieveProduct = async productId => {
  return await stripe.products.retrieve(productId);
};

// Validate that products exist.
const checkProducts = productList => {
  const validProducts: any = ['support-on-demand'];
  return productList.data.reduce((accumulator, currentValue) => {
    return (
      accumulator &&
      productList.data.length === 1 &&
      validProducts.includes(currentValue.id)
    );
  }, !!productList.data.length);
};

// List all plans.
const listPlans = async () => {
  return await stripe.plans.list({limit: 3});
};

// Retrieve a product by ID.
const retrievePlan = async planId => {
  return await stripe.plans.retrieve(planId);
};

// Validate that products exist.
const checkPlans = planList => {
  const validPlans: any = ['prod_CpRLEEg0hIO5jF'];
  return planList.data.reduce((accumulator, currentValue) => {
    return (
      accumulator &&
      planList.data.length === 3 &&
      validPlans.includes(currentValue.id)
    );
  }, !!planList.data.length);
};


exports.orders = {
  create: createOrder,
  retrieve: retrieveOrder,
  update: updateOrder,
};

exports.products = {
  list: listProducts,
  retrieve: retrieveProduct,
  exist: checkProducts,
};


exports.plans = {
  list: listPlans,
  retrieve: retrievePlan,
  exist: checkPlans,
}

exports.subscriptions = {
  create: createSubscription,
}
