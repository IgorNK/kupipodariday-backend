import * as Joi from 'joi';

export const configuration = () => ({
  port: parseInt(process.env.API_PORT, 10) || 3000,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiration: parseInt(process.env.JWT_EXPIRATION, 10) || 60 * 60 * 24 * 7,
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || "localhost",
    database: process.env.POSTGRES_DB || "kupipodariday",
    username: process.env.POSTGRES_USER || "kpduser",
    password: process.env.POSTGRES_PASSWORD || "super_strong_postgres_password",
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    entities: ['src/**/entities/*.entity{.ts,.js'],
    synchronize: true,
    logging: false,
  },
});

export const configSchema = Joi.object({
  port: Joi.number().integer().default(3000),
  jwt_secret: Joi.string(),
  jwt_expiration: Joi.number().integer(),
  database: Joi.object({
    type: Joi.string().required(),
    host: Joi.string()
      .pattern(/postgres:\/\/[a-zA-Z]/)
      .required(),
    database: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    port: Joi.number().integer().default(5432),
    entities: Joi.array().items(Joi.string()).required(),
    synchronize: Joi.boolean().default(false),
    logging: Joi.boolean().default(true),
  }),
});
