import { Factory } from 'fishery'
import {
  Institution,
  professions,
  specialities,
  serviceTypes,
  ServiceType,
  voivodeships,
  languages,
  Language,
} from '../../src/entities/institution.entity'
import { getRepository } from 'typeorm'
import { faker } from '@faker-js/faker'

export const institutionFactory = Factory.define<
  Omit<Institution, 'id'>,
  Partial<Institution>,
  Institution
>(({ onCreate, sequence, associations, transientParams }) => {
  onCreate(async (institution) => {
    const inst = getRepository(Institution).create(institution)
    const savedInstitution = await getRepository(Institution).save(inst)
    return savedInstitution
  })

  const profession = faker.random.arrayElement<Institution['profession']>(professions)

  let speciality: Institution['speciality'] = undefined

  if (profession === 'doctor') {
    speciality = faker.random.arrayElement<Institution['speciality']>(specialities)
  }

  return {
    city: faker.address.cityName(),
    name: faker.name.findName(),
    institutionName: faker.company.companyName(),
    email: sequence + faker.internet.email(),
    hours: faker.random.arrayElement([
      '24/7',
      '8am-5pm',
      'online only',
      '1pm - 4pm mon to wednesday only',
    ]),
    location: associations.location || undefined,
    postCode: faker.address.zipCode('##-###'),
    languages: faker.random.arrayElements<Language>(languages),
    validated: true,
    createdAt: faker.date.past(),
    profession,
    speciality,
    contactData: 'Contact us at ' + faker.phone.phoneNumber(),
    serviceType: faker.random.arrayElements<ServiceType>(serviceTypes),
    voivodeship: faker.random.arrayElement<Institution['voivodeship']>(voivodeships),
    languageInfo: faker.random.words(5),
    addressString: `${faker.address.cityName()}, ${faker.address.streetName()} ${sequence}`,
    ...transientParams,
  }
})
