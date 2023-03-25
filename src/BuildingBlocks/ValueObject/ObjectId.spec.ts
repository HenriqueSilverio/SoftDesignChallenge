import ObjectId from './ObjectId'

describe('ObjectId', () => {
  test('ObjectId.isValid', () => {
    expect(ObjectId.isValid('invalid')).toBe(false)
    expect(ObjectId.isValid('abcdefghijkl')).toBe(false)
    expect(ObjectId.isValid('6419f2e01f616ce1c14daf35')).toBe(true)
  })

  test('ObjectId.create', () => {
    expect(() => ObjectId.create('invalid')).toThrow()

    const systemUnderTest = ObjectId.create('6419f2e01f616ce1c14daf35')

    expect(systemUnderTest).toBeInstanceOf(ObjectId)
  })

  test('ObjectId.equals', () => {
    const idStrA = '6419f2e01f616ce1c14daf35'
    const idA = ObjectId.create(idStrA)
    const idB = ObjectId.create(idStrA)
    let idC: unknown

    idC = undefined
    expect(idA.equals(idC as ObjectId)).toBe(false)

    idC = null
    expect(idA.equals(idC as ObjectId)).toBe(false)

    idC = []
    expect(idA.equals(idC as ObjectId)).toBe(false)

    idC = {}
    expect(idA.equals(idC as ObjectId)).toBe(false)

    idC = ObjectId.create('6419fa60e7d30c0917ae14c1')
    expect(idA.equals(idC as ObjectId)).toBe(false)

    expect(idA.equals(idB)).toBe(true)
  })

  test('ObjectId.valueOf', () => {
    let systemUnderTest = ObjectId.create()

    expect(systemUnderTest.valueOf()).toBeTruthy()
    expect(typeof systemUnderTest.valueOf()).toBe('string')

    const idA = '6419fa60e7d30c0917ae14c1'
    systemUnderTest = ObjectId.create(idA)

    expect(systemUnderTest.valueOf()).toBe(idA)
  })
})
