export default class RepValidator {

  constructor(reference) {
    this.reference = reference
    this.frames = reference.frames
    this.index = 0
    this.repCount = 0
    this.threshold = 0.75
  }

  normalizeAngles(angles) {
    return angles.map(a =>
      a === null ? null : Math.round(a * this.reference.angles_scale)
    )
  }

  normalizeDistances(dists) {
    return dists.map(d =>
      d === null ? null : Math.round(d * this.reference.dists_scale)
    )
  }

  similarity(live, ref) {

    let score = 0
    let count = 0

    for (let i = 0; i < live.aQ.length; i++) {

      if (live.aQ[i] === null || ref.aQ[i] === null) continue

      const diff = Math.abs(live.aQ[i] - ref.aQ[i])

      score += Math.max(0, 1 - diff / 180)

      count++

    }

    for (let i = 0; i < live.dQ.length; i++) {

      if (live.dQ[i] === null || ref.dQ[i] === null) continue

      const diff = Math.abs(live.dQ[i] - ref.dQ[i])

      score += Math.max(0, 1 - diff / 5000)

      count++

    }

    if (count === 0) return 0

    return score / count

  }

  process(liveAngles, liveDistances) {

    const liveFrame = {
      aQ: this.normalizeAngles(liveAngles),
      dQ: this.normalizeDistances(liveDistances)
    }

    const refFrame = this.frames[this.index]

    const similarity = this.similarity(liveFrame, refFrame)

    if (similarity > this.threshold) {

      this.index++

      if (this.index >= this.frames.length) {

        this.repCount++

        this.index = 0

        return {
          rep: true,
          total: this.repCount
        }

      }

    }

    return {
      rep: false,
      total: this.repCount
    }

  }

}
