import { faker } from '@faker-js/faker';
import { CreateBonusRequestDTO } from './dto';

export const apiMocks = {
  getBonusById: (bonusId: string) => {
    const spent = faker.datatype.boolean();
    const requestedRefund = spent && faker.datatype.boolean();
    const refundCompleted = spent && requestedRefund && faker.datatype.boolean();

    const amount = faker.number.int({ min: 0, max: 100 }) * (spent ? -1 : 1);

    const refund =
      requestedRefund && spent ? faker.number.int({ min: 0, max: amount * -1 }) : undefined;

    const bonusData = {
      id: bonusId,
      amount,
      refund,
      code: faker.string.numeric(12),
      cardYear: faker.date.past().getFullYear().toString(),
      expireDate: faker.date.future({ years: 1 }).toLocaleDateString('it-IT'),
      spentDate: spent ? faker.date.past({ years: 1 }).toLocaleDateString('it-IT') : undefined,
      refundCompleted,
      merchant: {
        date: faker.date.future({ years: 1 }).toLocaleDateString('it-IT', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        name: faker.company.name(),
      },
    };

    return bonusData;
  },
  getCards: () => {
    return Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, (_, i) =>
      (new Date().getFullYear() - i).toString(),
    )
      .map((year) => ({
        id: faker.string.uuid(),
        balance: year === '2022' ? 0 : faker.number.int({ min: 0, max: 100 }),
        expireDate: faker.date.future({ years: 1 }).toLocaleDateString('it-IT'),
        maxAmount: 100,
        year,
      }))
      .reverse();
  },
  getBonus: () => {
    // const emptyBonus = faker.datatype.boolean();
    // if (emptyBonus) return [];
    return Array.from({ length: 20 }, () => {
      const spent = faker.datatype.boolean();
      const requestedRefund = faker.datatype.boolean();
      const refundCompleted = faker.datatype.boolean();

      const fromOthers = faker.datatype.boolean();
      const id = faker.string.numeric(6);

      const date = faker.date.between({ from: '2024-01-01', to: '2026-12-31' });

      const amount = faker.number.int({ min: 0, max: 100 }) * (spent ? -1 : 1);

      const refund =
        spent && requestedRefund ? faker.number.int({ min: 0, max: amount * -1 }) : undefined;
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
        amount,
        refund,
        refundCompleted,
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
