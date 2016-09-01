import koaRouter from './extend/koa-router'
import cleanObject from './mongoose/clean-object'
import schemaFromObject from './mongoose/schema-from-object'

export def from './def'
export env from './env'
export types from './types'

export const extend = {
  koaRouter
}

export const mongoose = {
  cleanObject,
  schemaFromObject
}

export AppController from './koa/controllers/app-controller'
export ResourceController from './koa/controllers/resource-controller'

export ErrorMiddleware from './koa/middlewares/error'

