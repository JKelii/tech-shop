import { faker } from "@faker-js/faker";

export const accountMock = {
  email: faker.internet.email(),
  name: faker.internet.userName(),
  password: faker.internet.password(),
};
