import { DatabaseConfig } from "../database/config/db-config.types"
import { AppConfig } from "./appConfigType"

export type AllConfigType = {
  app: AppConfig,
  database: DatabaseConfig,
}