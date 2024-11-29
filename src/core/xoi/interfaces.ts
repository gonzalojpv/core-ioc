export interface JobInterface {
    cerateJob(): string;
    getJobs(): string;
    // completedJob(): string;
    // getJobById(): string;
    // getJobIdByExternalId(): string;
    // addWorkflow(): string;
    // getJobSummary(): string;
}

export interface JobShareInterface {
    createJobShare(): string;
}

export interface XOiClientInterface {
    execute(): string;
}