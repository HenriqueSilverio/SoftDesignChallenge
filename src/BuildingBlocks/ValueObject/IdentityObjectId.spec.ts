import { randomUUID } from 'crypto'
import IdentityObjectId from './IdentityObjectId'

describe('IdentityObjectId', () => {
  test('IdentityObjectId.create', () => {
    let aID: unknown

    aID = -1
    expect(() => IdentityObjectId.create(aID as string)).toThrow()

    aID = 0
    expect(() => IdentityObjectId.create(aID as string)).toThrow()

    aID = 'Invalid'
    expect(() => IdentityObjectId.create(aID as string)).toThrow()

    aID = '6419f2e01f616ce1c14daf35'

    const systemUnderTest = IdentityObjectId.create(aID as string)

    expect(systemUnderTest).toBeInstanceOf(IdentityObjectId)
  })

  test('IdentityObjectId.valueOf', () => {
    const aID = '6419f2e01f616ce1c14daf35'

    let aIdentity = IdentityObjectId.create(aID)
    let aIdentityValue = aIdentity.valueOf()

    expect(Object.keys(aIdentityValue)).toEqual(expect.arrayContaining(['id', 'uuid']))
    expect(aIdentityValue.id).toBe(aID)
    expect(typeof aIdentityValue.uuid).toBe('string')
    expect(aIdentityValue.uuid).toBeTruthy()

    const aUUID = randomUUID()

    aIdentity = IdentityObjectId.create(aID, aUUID)
    aIdentityValue = aIdentity.valueOf()

    expect(aIdentityValue.id).toBe(aID)
    expect(aIdentityValue.uuid).toBe(aUUID)
  })

  test('IdentityObjectId.equals', () => {
    let aID = '6419f2e01f616ce1c14daf35'
    const aUUID = randomUUID()

    const systemUnderTestA = IdentityObjectId.create(aID, aUUID)
    const systemUnderTestB = IdentityObjectId.create(aID, aUUID)
    let systemUnderTestC: unknown

    expect(systemUnderTestA.equals(systemUnderTestB)).toBe(true)

    systemUnderTestC = undefined
    expect(systemUnderTestA.equals(systemUnderTestC as IdentityObjectId)).toBe(false)

    systemUnderTestC = null
    expect(systemUnderTestA.equals(systemUnderTestC as IdentityObjectId)).toBe(false)

    systemUnderTestC = {}
    expect(systemUnderTestA.equals(systemUnderTestC as IdentityObjectId)).toBe(false)

    systemUnderTestC = IdentityObjectId.create(aID)
    expect(systemUnderTestA.equals(systemUnderTestC as IdentityObjectId)).toBe(false)

    aID = '6419fa60e7d30c0917ae14c1'
    systemUnderTestC = IdentityObjectId.create(aID, aUUID)
    expect(systemUnderTestA.equals(systemUnderTestC as IdentityObjectId)).toBe(false)
  })
})
