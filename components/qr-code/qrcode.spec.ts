import * as QrCode from './qrcode';

describe('qr-code', () => {
  describe('format padding', () => {
    it('as number', () => {
      const padding = 10;
      expect(QrCode.formatPadding(padding)).toEqual([10, 10, 10, 10]);
    });

    it('as array of 1', () => {
      const padding = [10];
      expect(QrCode.formatPadding(padding)).toEqual([10, 10, 10, 10]);
    });

    it('as array of 2', () => {
      const padding = [10, 5];
      expect(QrCode.formatPadding(padding)).toEqual([10, 5, 10, 5]);
    });

    it('as array of 4', () => {
      const padding = [10, 5, 4, 10];
      expect(QrCode.formatPadding(padding)).toEqual([10, 5, 4, 10]);
    });
  });
});
