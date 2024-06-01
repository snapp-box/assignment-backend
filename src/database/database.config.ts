import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const dataBaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: '.db/data1.sqlite3',
  autoLoadModels: true,
  synchronize: false,
};
