import * as fs from 'fs';
import { parse } from 'dotenv';
export class ConfigService {
  private readonly envConfig: {
    [key: string]: string;
  };
  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../.env';
      const existsPath = fs.existsSync(envFilePath);
      if (!existsPath) {
        console.log('file no existe');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
        // HOST: process.env.HOST,
        // USERNAME: process.env.USERNAME,
        // PASSWORD: process.env.PASSWORD,
        // DATABASE: process.env.DATABASE,
        // PORT_DB: process.env.PORT_DB,
      };
    }
  }
  get(key: string): string {
    return this.envConfig[key];
  }
}
