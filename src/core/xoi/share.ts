import { injectable } from 'inversify'
import { JobShareInterface } from './interfaces'

@injectable()
class JobShare implements JobShareInterface {
  public createJobShare() {
    return 'createJobShare!'
  }
}

export { JobShare }
