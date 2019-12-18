import './string.extensions'
import * as validUrl from 'valid-url'

const fetch = require('make-fetch-happen').defaults({
  cacheManager: './cache'
})

// Question 1
export const isNullOrEmpty = (str: string): boolean => {
  return !str || str.isEmpty()
}

// Question 2 - Time Complexity : O(sqrt(n))
export const getPositiveDivisors = (num: number): number[] => {
  const divisors = [], secondDivisors = []
  const sqrt = Math.sqrt(num)

  for (let i = 1; i <= sqrt; i++) {
    if (num % i === 0) {
      divisors.push(i)

      if (num / i !== i) secondDivisors.unshift(num / i)
    }
  }

  return [...divisors, ...secondDivisors]
}

// Question 3 - given by Heron's Formula
export const calculateAreaOfTriangle = (side1: number, side2: number, side3: number) => {
  if (isInvalidTriangle(side1, side2, side3)) throw new InvalidTriangleException()

  const p = (side1 + side2 + side3) / 2

  return Math.sqrt(p * (p - side1) * (p - side2) * (p - side3))
}

const isInvalidTriangle  = (side1: number, side2: number, side3: number): boolean => {
  const inputHasNegativeOrZero = Math.sign(side1) !== 1 || Math.sign(side2)  !== 1 || Math.sign(side3) !== 1
  const twoSidesAddToLessThanThird = side1 + side2 <= side3 || side1 + side3 <= side2 || side2 + side3 <= side1

  return inputHasNegativeOrZero || twoSidesAddToLessThanThird
}

// Question 4
export const getMostCommonIntegers = (numbers: number[]): number[] => {
  if (!numbers || numbers.length === 0) return []
  if (numbers.some(isNaN)) throw new InvalidInputException('numbers array must only contain numbers')

  const counts = numbers.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1
    return acc
  }, {})
  const maxCount = Math.max(...Object.values(counts) as number[])

  return Object.keys(counts)
    .filter(key => counts[key] === maxCount)
    .map(value => Number(value))
}

// Question 7
export const arrangeBy = (name: any): (objects: object[]) => object => {
  return (objects: object[]): object => {
    if (!objects) return {}

    return objects.reduce((acc, obj) => {
      const keyValue: any = obj && obj[name]
      if (!keyValue) return acc

      const existsAlready = !!acc[keyValue]
      existsAlready ? acc[keyValue].push(obj) : acc[keyValue] = [obj]

      return acc
    }, {})
  }
}

// Question 8
export const linkChecker = async (document: Document): Promise<Link[]> => {
  if (!document) throw new InvalidInputException('document must not be null')
  if (!document.links) return Promise.resolve([])

  const { links } = document
  const promises = []
  const rejectedLinks: Link[] = []

  for (let i = 0; i < links.length; i++) {
    const { href } = links[i]

    if (!validUrl.isUri(href)) {
      rejectedLinks.push({ href, valid: false }) // eliminate bad uri's immediately + fetch cant handle them
    } else {
      promises.push(fetch(href).catch(e => e)) // so that failed fetches dont exit the Promise.all()
    }
  }

  return (await Promise.all(promises))
    .map(response => {
      return {
        href: response.url,
        valid: response.status === 200
      }
    })
    .concat(rejectedLinks)
}

interface Link {
  href: string
  valid: boolean
}

export class InvalidTriangleException extends Error {
  constructor() {
    super('InvalidTriangleException')
  }
}

export class InvalidInputException extends Error {
  constructor(msg: string) {
    super(`InvalidInputException: ${msg}`)
  }
}
