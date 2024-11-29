import 'reflect-metadata'
import { DIContainer } from "./inversify.config";
import { TYPES } from "./types";
import { JobInterface } from "./interfaces";

export const jobInstance = DIContainer.get<JobInterface>(TYPES.JobProps);