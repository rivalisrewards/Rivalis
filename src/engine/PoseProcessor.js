import RepValidator from "./RepValidator"

export default class PoseProcessor {

  constructor(reference) {

    this.validator = new RepValidator(reference)

  }

  update(angles, distances) {

    const result = this.validator.process(angles, distances)

    return result

  }

}
