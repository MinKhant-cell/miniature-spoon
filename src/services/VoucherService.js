class VoucherService {
  generateVoucher() {
    const code = "V-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    return { code, discountPercent: 10 }; // 10% discount
  }
}

module.exports = new VoucherService();
