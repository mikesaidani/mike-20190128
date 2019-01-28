import {byteToKb, getTotalSize} from './utils';

it('calculates total sizes correctly', () => {
  const documents = [
    {
      size: 200
    },
    {
      size: 1000
    }
  ];

  expect(getTotalSize(documents)).toBe(1200);
});

it('converts bytes to kilo bytes correctly', () => {
  expect(byteToKb(200)).toBe('0kB');
  expect(byteToKb(1000)).toBe('1kB');
  expect(byteToKb(20500)).toBe('20kB');
});
