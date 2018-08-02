import { removeLeadingSlash } from './utils'

it('leading slash is removed', () => {
  const string = '/test'

  expect(removeLeadingSlash(string)).toEqual('test')
})
