import { faker } from '@faker-js/faker';
import { CreateBonusRequestDTO } from './dto';

export const apiMocks = {
  getBonusById: (bonusId: string) => {
    const spent = faker.datatype.boolean();

    const bonusData = {
      id: bonusId,
      amount: Number(faker.commerce.price()) * (spent ? -1 : 1),
      code: faker.string.numeric(12),
      cardYear: faker.date.past().getFullYear().toString(),
      expireDate: faker.date.future({ years: 1 }).toLocaleDateString('it-IT'),
      spentDate: spent ? faker.date.past({ years: 1 }).toLocaleDateString('it-IT') : undefined,
    };

    return bonusData;
  },
  getCards: () => {
    return Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString())
      .map((year) => ({
        id: faker.string.uuid(),
        balance: faker.number.int({ min: 10, max: 150 }),
        expireDate: faker.date.future({ years: 1 }).toLocaleDateString('it-IT'),
        maxAmount: faker.number.int({ min: 150, max: 300 }),
        year,
      }))
      .reverse();
  },
  getBonus: () => {
    return Array.from({ length: 20 }, () => {
      const spent = faker.datatype.boolean();
      const fromOthers = faker.datatype.boolean();
      const id = faker.string.numeric(6);

      const date = faker.date.between({ from: '2024-01-01', to: '2026-12-31' });
      const formattedDate =
        date.toLocaleDateString('it-IT', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }) +
        ', ' +
        date.toLocaleTimeString('it-IT', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

      return {
        id,
        fromOthers,
        date: formattedDate,
        amount: Number(faker.commerce.price()) * (spent ? -1 : 1),
      };
    });
  },
  createBonus: (newBonus: CreateBonusRequestDTO) => ({
    id: faker.string.uuid(),
    amount: Number(faker.commerce.price()),
    code: faker.string.numeric(12),
    cardYear: newBonus.year,
    expireDate: faker.date.future({ years: 1 }).toLocaleDateString('it-IT'),
  }),
};
