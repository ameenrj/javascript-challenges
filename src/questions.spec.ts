import {
  arrangeBy,
  calculateAreaOfTriangle,
  getMostCommonIntegers,
  getPositiveDivisors,
  InvalidInputException,
  InvalidTriangleException,
  isNullOrEmpty,
  linkChecker
} from './questions'

describe('index', () => {
  describe('isNullOrEmpty', () => {

    it('when null should return true', async() => {
      const result = isNullOrEmpty(null)
      expect(result).toBe(true)
    })

    it('when string contains letters should return false', async() => {
      const result = isNullOrEmpty('a')
      expect(result).toBe(false)
    })

    it('when an empty string string should return true', async() => {
      const result1 = isNullOrEmpty('')
      expect(result1).toBe(true)

      const result2 = isNullOrEmpty('    ')
      expect(result2).toBe(true)
    })

    it('when a string of null should return false', async() => {
      const result = isNullOrEmpty('null')
      expect(result).toBe(false)
    })

  })

  describe('getPositiveDivsors', () => {

    it('when input is null should return empty array', async() => {
      const result = getPositiveDivisors(null)
      expect(result).toEqual([])
    })

    it('when input is a positive number should return positive divisors', async() => {
      const result1 = getPositiveDivisors(60)
      expect(result1).toEqual([1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60])

      const result2 = getPositiveDivisors(42)
      expect(result2).toEqual([1, 2, 3, 6, 7, 14, 21, 42])
    })

  })

  describe('calculateAreaOfTriangle', () => {

    it('when any input is negative should throw InvalidTriangleException', async() => {
      expect.assertions(3)

      try {
        calculateAreaOfTriangle(-3, 4, 5)
      } catch(e) {
        expect(e).toEqual(new InvalidTriangleException())
      }

      try {
        calculateAreaOfTriangle(3, -4, 5)
      } catch(e) {
        expect(e).toEqual(new InvalidTriangleException())
      }

      try {
        calculateAreaOfTriangle(3, 5, -5)
      } catch(e) {
        expect(e).toEqual(new InvalidTriangleException())
      }
    })

    it('when any input is 0 should throw InvalidTriangleException', async() => {
      expect.assertions(3)

      try {
        calculateAreaOfTriangle(0, 2, 2)
      } catch(e) {
        expect(e).toEqual(new InvalidTriangleException())
      }

      try {
        calculateAreaOfTriangle(2, 0, 2)
      } catch(e) {
        expect(e).toEqual(new InvalidTriangleException())
      }

      try {
        calculateAreaOfTriangle(2, 2, 0)
      } catch(e) {
        expect(e).toEqual(new InvalidTriangleException())
      }
    })


    it('when input doesnt form valid sides should throw InvalidTriangleException', async() => {
      expect.assertions(3)

      try {
        calculateAreaOfTriangle(5, 2, 2)
      } catch(e) {
        expect(e).toEqual(new InvalidTriangleException())
      }

      try {
        calculateAreaOfTriangle(2, 5, 2)
      } catch(e) {
        expect(e).toEqual(new InvalidTriangleException())
      }

      try {
        calculateAreaOfTriangle(2, 2, 5)
      } catch(e) {
        expect(e).toEqual(new InvalidTriangleException())
      }
    })

    it('when input is valid should return correct area of triangle', async() => {
      const result = calculateAreaOfTriangle(3, 4 , 5)
      expect(result).toBe(6)
    })

  })

  describe('getMostCommonIntegers', () => {

    it('when input is null or empty return an empty array', async() => {
      const result1 = getMostCommonIntegers(null)
      expect(result1).toEqual([])

      const result2 = getMostCommonIntegers([])
      expect(result2).toEqual([])
    })

    it('when input contains values other than numbers return an exception', async() => {
      expect.assertions(2)

      const msg = 'numbers array must only contain numbers'
      const test1: any = ['a', 'b']
      try {
        getMostCommonIntegers(test1)
      } catch(e) {
        expect(e).toEqual(new InvalidInputException(msg))
      }

      const test2: any = [{ 'gandalf': 'the grey' }, { 'saruman': 'the white' }]
      try {
        getMostCommonIntegers(test2)
      } catch(e) {
        expect(e).toEqual(new InvalidInputException(msg))
      }
    })

    it('when input is valid return most common integer', async() => {
      const result = getMostCommonIntegers([1, 2, 3, 4, 5, 1, 6, 7])
      expect(result).toEqual([1])
    })

    it('when there are two or more values that are most common, return all of them', async() => {
      const result1 = getMostCommonIntegers([5, 4, 3, 2, 4, 5, 1, 6, 1, 2, 5, 4])
      expect(result1).toEqual([4, 5])

      const result2 = getMostCommonIntegers([1, 2, 3, 4, 5, 6, 7])
      expect(result2).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

  })

  describe('arrangeBy', () => {

    it('when input is null should return empty object', async() => {
      const arrangeByName = arrangeBy('name')
      const result = arrangeByName(null)
      expect(result).toEqual({})
    })

    it('when input is valid should return correct object', async() => {
      const users = [{
        id: 1,
        name: 'bob',
      },
      {
        id: 2,
        name: 'sally',
      },
      {
        id: 3,
        name: 'bob',
        age: 30,
      }]

      const expectedResult = {
        bob: [{
          id: 1,
          name: 'bob',
        },
        {
          id: 3,
          name: 'bob',
          age: 30,
        }],
        sally: [{
          id: 2,
          name: 'sally',
        }]
      }

      const arrangeByName = arrangeBy('name')
      const result = arrangeByName(users)
      expect(result).toEqual(expectedResult)
    })

    it('when object is missing key should ignore it', async() => {
      const users = [{
        id: 1,
        name: 'bob',
      },
      {
        id: 2,
        name: 'sally',
      },
      {
        id: 3,
        age: 30,
      }]

      const expectedResult = {
        bob: [{
          id: 1,
          name: 'bob',
        }],
        sally: [{
          id: 2,
          name: 'sally',
        }]
      }

      const arrangeByName = arrangeBy('name')
      const result = arrangeByName(users)
      expect(result).toEqual(expectedResult)
    })

    it('when object in array is invalid - should ignore it', async() => {
      const users = [{
        id: 1,
        name: 'bob',
      }, null, undefined, 1]

      const expectedResult = {
        bob: [{
          id: 1,
          name: 'bob',
        }]
      }

      const arrangeByName = arrangeBy('name')
      const result = arrangeByName(users as any)
      expect(result).toEqual(expectedResult)
    })

    it('when key doesnt exist anywhere - should return empty object', async() => {
      const users = [{
        id: 1,
        name: 'frodo',
      },
      {
        id: 2,
        name: 'bilbo'
      }]

      const expectedResult = {}

      const arrangeByBlah = arrangeBy('blah')
      const result = arrangeByBlah(users)
      expect(result).toEqual(expectedResult)
    })

  })

  describe('linkChecker', () => {

    it('when input is null should throw an InvalidInputException', async() => {
      expect.assertions(1)

      try {
        await linkChecker(null)
      } catch (e) {
        expect(e).toEqual(new InvalidInputException('document must not be null'))
      }
    })

    it('when input is empty should return an empty array', async() => {
      const result = await linkChecker('<html></html>' as any)
      expect(result).toEqual([])
    })

    it('when input contains a link should return the Link', async() => {
      const document: any = {
        links: [{
          href: 'https://www.google.com/'
        }]
      }
      const expected = [{
          href: 'https://www.google.com/',
          valid: true
        }]
      const result = await linkChecker(document)
      expect(result).toEqual(expected)
    })

    it('when input contains multiple links - should return all Links', async() => {
      const document: any = {
        links: [{
          href: 'https://www.google.com/'
        },
        {
          href: 'https://www.stackoverflow.com/'
        },
        {
          href: 'https://www.google.com/invalidpage'
        }]
      }
      const expected = [{
          href: 'https://www.google.com/',
          valid: true
        },
        {
          href: 'https://stackoverflow.com/',
          valid: true
        },
        {
          href: 'https://www.google.com/invalidpage',
          valid: false
        }]
      const result = await linkChecker(document)
      expect(result).toEqual(expected)
    })

    it('when input contains a link that has an invalid uri should be able to handle as invalid', async() => {
      const document: any = {
        links: [{
            href: 'notvalid'
          }]
      }
      const expected = [{
          href: 'notvalid',
          valid: false
        }]
      const result = await linkChecker(document)
      expect(result).toEqual(expected)
    })

  })
})
