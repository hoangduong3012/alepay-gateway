/* Copyright (c) 2021-2022 Toriti Tech Team https://t.me/ToritiTech */

'use strict';
require('dotenv').config();

const Logger = require('../../../utils/logging');
const { DB, timestamps } = require('../../../config/database');
const Common = require('../../Common/resourceAccess/CommonResourceAccess');
const UtilFunction = require('../../ApiUtils/utilFunctions');
const tableName = 'RealEstateImage';
const primaryKeyField = 'realEstateImageId';
async function createTable() {
  Logger.info('ResourceAccess', `createTable ${tableName}`);
  return new Promise(async (resolve, reject) => {
    DB.schema.dropTableIfExists(`${tableName}`).then(() => {
      DB.schema
        .createTable(`${tableName}`, function (table) {
          table.increments(`${primaryKeyField}`).primary();
          table.string('realEstateImageUrl');
          table.integer('realEstateId');
          timestamps(table);
          table.index(`${primaryKeyField}`);
          table.index('realEstateImageUrl');
        })
        .then(async () => {
          Logger.info(`${tableName}`, `${tableName} table created done`);
          resolve();
        });
    });
  });
}

async function initDB() {
  await createTable();
}

async function insert(data) {
  return await Common.insert(tableName, data);
}

async function updateById(id, data) {
  let dataId = {};
  dataId[primaryKeyField] = id;
  return await Common.updateById(tableName, dataId, data);
}

async function updateAll(data, filter) {
  return await Common.updateAll(tableName, data, filter);
}

async function find(filter, skip, limit, order) {
  return await Common.find(tableName, filter, skip, limit, order);
}
async function findById(id) {
  return await Common.findById(tableName, primaryKeyField, id);
}
async function count(filter, order) {
  return await Common.count(tableName, primaryKeyField, filter, order);
}
async function deleteById(id) {
  let dataId = {};
  dataId[primaryKeyField] = id;
  return await Common.deleteById(tableName, dataId);
}
module.exports = {
  insert,
  find,
  count,
  updateById,
  updateAll,
  initDB,
  deleteById,
  findById,
  modelName: tableName,
};
