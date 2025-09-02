import { faker } from '@faker-js/faker';
import { CreateVoucherRequestDTO } from './dto';
import { APPLICANTS, CARD_STATUS, REFUND_STATUS, VOUCHER_STATUS } from './model';

const CARDS_NAMES = [
  'Carta della Cultura 2020',
  'Carta della Cultura 2021',
  'Carta della Cultura 2022',
  'Carta della Cultura 2023',
  'Carta della Cultura 2024',
];

export const apiMocks = {
  getVoucherById: (voucherId: string) => {
    const spent = faker.datatype.boolean();
    const status = faker.helpers.arrayElement(Object.values(VOUCHER_STATUS));

    const requestedRefund = spent && faker.datatype.boolean();

    const amount = faker.number.int({ min: 0, max: 100 }) * (spent ? -1 : 1);

    const refund =
      requestedRefund && spent
        ? {
            amount: faker.number.int({ min: 0, max: amount * -1 }),
            status: faker.helpers.arrayElement(Object.values(REFUND_STATUS)),
          }
        : undefined;

    const voucherData = {
      id: voucherId,
      amount,
      expiration_date: faker.date.future({ years: 1 }).toLocaleDateString('it-IT'),
      status,
      card_year: faker.date.past().getFullYear().toString(),
      applicant: faker.helpers.arrayElement(Object.values(APPLICANTS)),
      merchant: faker.company.name(),
      refund,
    };

    return voucherData;
  },
  getCards: () => {
    return Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, (_, i) =>
      (new Date().getFullYear() - i).toString(),
    )
      .map((year) => ({
        card_name: faker.helpers.arrayElement(CARDS_NAMES),
        year,
        status: faker.helpers.arrayElement(Object.values(CARD_STATUS)),
        expiration_date: faker.date.future({ years: 1 }).toLocaleDateString('it-IT'),
        residual_amount: year === '2022' ? 0 : faker.number.int({ min: 0, max: 100 }),
      }))
      .reverse();
  },
  getVouchers: () => {
    // const emptyVoucher = faker.datatype.boolean();
    // if (emptyVoucher) return [];
    return Array.from({ length: 20 }, () => {
      const id = faker.string.numeric(12);
      const status = faker.helpers.arrayElement(Object.values(VOUCHER_STATUS));

      const spent = status === 'USED';
      const refundRqst = faker.datatype.boolean();

      const amount = faker.number.int({ min: 0, max: 100 }) * (spent ? -1 : 1);

      const date = faker.date.between({ from: '2024-01-01', to: '2026-12-31' });

      const refund =
        spent && refundRqst
          ? {
              amount: faker.number.int({ min: 0, max: amount * -1 }),
              status: faker.helpers.arrayElement(Object.values(REFUND_STATUS)),
            }
          : undefined;

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
        amount,
        expiration_date: formattedDate,
        status,
        card_year: faker.date.past().getFullYear().toString(),
        applicant: faker.helpers.arrayElement(Object.values(APPLICANTS)),
        merchant: faker.company.name(),
        refund,
      };
    });
  },
  createVoucher: (newVoucher: CreateVoucherRequestDTO) => ({
    id: faker.string.numeric(12),
    amount: Number(faker.commerce.price()),
    expiration_date: faker.date.future({ years: 1 }).toLocaleDateString('it-IT'),
    status: faker.helpers.arrayElement(Object.values(VOUCHER_STATUS)),
    card_year: newVoucher.year,
    applicant: faker.helpers.arrayElement(Object.values(APPLICANTS)),
    merchant: faker.company.name(),
  }),
};
