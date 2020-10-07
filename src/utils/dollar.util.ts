class DollarUtil {

  static convert(value: any): string {
    let dollars: string;

    if (value) {
      let cents = value;

      if (typeof cents === 'number') {
        cents = Math.ceil(cents).toString();
      }

      cents = cents.replace(/\D/g, '');

      dollars = (cents / 100).toString();
      dollars = parseFloat(dollars)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }

    return dollars;
  }
}

export default DollarUtil;
