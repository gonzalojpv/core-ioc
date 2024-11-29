// file inversify.config.ts

import { Container } from "inversify";
import { TYPES } from "./types";
import { JobInterface, JobShareInterface, XOiClientInterface } from "./interfaces";
import { Job, JobShare, XOiClient } from "./client";

const DIContainer = new Container();
DIContainer.bind<JobInterface>(TYPES.JobProps).to(Job);
DIContainer.bind<JobShareInterface>(TYPES.JobShareProps).to(JobShare);
DIContainer.bind<XOiClientInterface>(TYPES.XOiClientProps).to(XOiClient);

export { DIContainer };