import { removeLeadingSlash } from './utils'
import { createCartIdentifier, getChildId } from './'

it('leading slash is removed', () => {
  const string = '/test'

  expect(removeLeadingSlash(string)).toEqual('test')
})

it('unique cart identifier is created', () => {
  const id = createCartIdentifier()
  const id2 = createCartIdentifier()

  expect(id).not.toEqual(id2)
})

it('can return child product id based on selected options', () => {
  const matrix = {
    '92c34bfa-1d85-491d-98a0-a9c4677c4d94': {
      '0de32c9f-5694-4321-ae7a-a0f9213d53a9': {
        'e12420a4-5779-44e8-910d-4c791c432d38':
          'b3372bd5-1004-4d51-af6d-7a7f22764b73',
        '29ca2cbd-085e-47c2-b9dd-c12c89948092':
          '74e6b095-fd3d-4295-b471-a649a198d5f9',
        'ba3c59d9-60bb-4089-845a-12e6030db731':
          '46b9649e-b0db-4604-9f38-568538e4a6ea'
      },
      '8b45b158-26d9-4ec7-9285-23d54a104fee': {
        'e12420a4-5779-44e8-910d-4c791c432d38':
          '79501226-d09e-4804-9aab-d3690afa966b',
        '29ca2cbd-085e-47c2-b9dd-c12c89948092':
          '9c94e586-13d2-4735-8b81-b4a0dc0890a5',
        'ba3c59d9-60bb-4089-845a-12e6030db731':
          'd8916ef7-8c8a-47bc-bfa5-161d78491542'
      },
      '0be09bec-eac4-4a26-9b5e-4700a78f3af3': {
        'e12420a4-5779-44e8-910d-4c791c432d38':
          'f28b07b6-f1dc-4205-849e-fda19027b380',
        '29ca2cbd-085e-47c2-b9dd-c12c89948092':
          '03a5a2d7-bd4b-40fe-b15a-d16f178cfae2',
        'ba3c59d9-60bb-4089-845a-12e6030db731':
          '9593a803-25c4-4426-8f48-afef3f8874e8'
      }
    },
    'a6c8504a-1051-4808-a65b-6851af86f5be': {
      '0de32c9f-5694-4321-ae7a-a0f9213d53a9': {
        'e12420a4-5779-44e8-910d-4c791c432d38':
          'bf593513-946b-4ece-b292-e41018bceb32',
        '29ca2cbd-085e-47c2-b9dd-c12c89948092':
          '7b298395-f22c-4ef3-855e-932dd09f1627',
        'ba3c59d9-60bb-4089-845a-12e6030db731':
          '07392f9c-8013-4777-b271-2c097ea77c1f'
      },
      '8b45b158-26d9-4ec7-9285-23d54a104fee': {
        'e12420a4-5779-44e8-910d-4c791c432d38':
          '0ddf077e-d244-4188-9e28-4268ec1aad9f',
        '29ca2cbd-085e-47c2-b9dd-c12c89948092':
          '58070a56-057c-4247-95f4-83cf09b49a77',
        'ba3c59d9-60bb-4089-845a-12e6030db731':
          '358c9688-6d22-4227-bc0c-940130b4dba9'
      },
      '0be09bec-eac4-4a26-9b5e-4700a78f3af3': {
        'e12420a4-5779-44e8-910d-4c791c432d38':
          'b04ce9e6-13fa-4c19-9a5d-0101df2cc634',
        '29ca2cbd-085e-47c2-b9dd-c12c89948092':
          'ebb72b6f-6a3a-412d-9f7e-be7090b3afb5',
        'ba3c59d9-60bb-4089-845a-12e6030db731':
          '81bd5fab-bd24-43eb-83e3-fdaf8874abfc'
      }
    },
    'f9016b7c-a1e1-4fa5-813a-0789df0cee3a': {
      '0de32c9f-5694-4321-ae7a-a0f9213d53a9': {
        'e12420a4-5779-44e8-910d-4c791c432d38':
          'cddf6d27-78d6-4f25-994c-820293147e1b',
        '29ca2cbd-085e-47c2-b9dd-c12c89948092':
          '8386098e-cd4e-4427-bc81-5b353c0600ad',
        'ba3c59d9-60bb-4089-845a-12e6030db731':
          '07f291c7-f70f-4e13-b6d5-4a7d3c46d5be'
      },
      '8b45b158-26d9-4ec7-9285-23d54a104fee': {
        'e12420a4-5779-44e8-910d-4c791c432d38':
          'da879ee3-8beb-4977-a18e-b3a2dfc6b849',
        '29ca2cbd-085e-47c2-b9dd-c12c89948092':
          '3b9a297a-6b2d-49ba-83e6-02e192bd9ba8',
        'ba3c59d9-60bb-4089-845a-12e6030db731':
          'f6e5cac6-90c8-41bd-8725-e2d3c1706ca6'
      },
      '0be09bec-eac4-4a26-9b5e-4700a78f3af3': {
        'e12420a4-5779-44e8-910d-4c791c432d38':
          'f11fdbac-232f-416f-b76c-358e3bde8d9f',
        '29ca2cbd-085e-47c2-b9dd-c12c89948092':
          '4b65695a-2cc5-4a64-a4a7-5dabcffc5b5d',
        'ba3c59d9-60bb-4089-845a-12e6030db731':
          'fa97e222-1ce0-46d4-9b3b-6122e9b4cd81'
      }
    }
  }

  const id = getChildId(
    [
      '92c34bfa-1d85-491d-98a0-a9c4677c4d94',
      '0de32c9f-5694-4321-ae7a-a0f9213d53a9',
      'ba3c59d9-60bb-4089-845a-12e6030db731'
    ],
    matrix
  )

  expect(id).toEqual('46b9649e-b0db-4604-9f38-568538e4a6ea')
})
