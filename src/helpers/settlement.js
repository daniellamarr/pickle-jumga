import User from "../db/models/user";

const settlement = (totalPrice, items, dispatchFee) => {
  // console.log(items, 'p')
  const JUMGA_MERCHANT_PERCENTAGE = 2.5;
  const JUMGA_DISPATCH_PERCENTAGE = 20;

  const STORES = {};

  items.map((item) => {
    if (!STORES[item.owner]) {
      STORES[item.owner] = { ITEMS: [], SETTLEMENT: [] };
    }
    const JUMGA_PAY = (JUMGA_MERCHANT_PERCENTAGE / 100) * item.total;
    STORES[item.owner].SETTLEMENT.push({
      JUMGA_PAY,
      STORE_PAY: item.total - JUMGA_PAY,
      item
    });
  });

  Object.keys(STORES).map(async (item) => {
    const ALL_STORE_PAY = STORES[item].SETTLEMENT.map((i) => i.STORE_PAY);
    const TOTAL_STORE_PAY = ALL_STORE_PAY.reduce(
      (prev, curr) => prev + curr, 0
    );
    STORES[item].TOTAL_STORE_PAY = TOTAL_STORE_PAY;

    const fetchStoreOwner = await User.findById(item);

    const wallet = fetchStoreOwner.wallet || 0;

    await User.updateOne({ _id: item },
      { wallet: wallet + TOTAL_STORE_PAY });
  });
};

export default settlement;
