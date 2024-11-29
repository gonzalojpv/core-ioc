import { injectable } from "inversify";
import { JobInterface } from "./interfaces";

@injectable()
class Job implements JobInterface {
    public cerateJob() {
        console.log('Return ')
        return "cerateJob!";
    }
    public getJobs(): string {
        return 'getJobs'
    }
}

export { Job }