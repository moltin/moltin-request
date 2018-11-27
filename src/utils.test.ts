import { removeLeadingSlash, createCartIdentifier } from './utils'

it('leading slash is removed', () => {
  const string = '/test'

  expect(removeLeadingSlash(string)).toEqual('test')
})

it('unique cart identifier is created', () => {
  const id = createCartIdentifier()
  const id2 = createCartIdentifier()

  expect(id).not.toEqual(id2)
})
