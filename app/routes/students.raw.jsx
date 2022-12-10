// /students/raw

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "First student",
    amount: 12.99,
    date: new Date().toISOString(),
    fee: {
      2021: {
        10: 170,
        11: 270,
      },
      2022: {
        0: 365,
        1: 270,
      },
    },
  },
  {
    id: "e2",
    title: "Second student",
    amount: 16.99,
    date: new Date().toISOString(),
    fee: {
      2021: {
        10: 365,
        11: 170,
      },
      2022: {
        0: 365,
        1: 365,
      },
    },
  },
];

export function loader() {
  return DUMMY_EXPENSES;
}
