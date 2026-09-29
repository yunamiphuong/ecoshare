import { useState, useMemo } from "react";
import { ShoppingCart, Clock, X, Minus, Plus, Trash2, CheckCircle2, Store, ShieldCheck, Wallet } from "lucide-react";

/* ================= MOCK DATA ================= */
const initialProducts = [
  {
    id: 'C001', vendor: 'Healthy Bakery', productName: 'BURGER CHAY & NHÂN HẠT DINH DƯỠNG',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=800',
    unit: '1 bánh', netPrice: 55000, targetVolume: 50,
    description: `Mang đến một định nghĩa mới về ẩm thực chay, chiếc burger này sở hữu phần nhân (patty) được chế biến hoàn toàn từ các nguyên liệu tự nhiên, không sử dụng thịt giả chay. Lớp nhân là sự kết hợp hoàn hảo giữa độ bùi béo của hạt sen chín và đậu gà, vị dai ngọt tự nhiên của nấm đùi gà, cùng kết cấu giòn sần sật từ cà rốt, hành tây, hạnh nhân lát và hạt mè rang thơm lừng.\nKẹp giữa lớp vỏ bánh mì mềm xốp là phần nhân rau củ đậm đà, xà lách tươi xanh và cà chua mọng nước. Đặc biệt, nếu bạn không ăn thuần chay (vegan), bạn có thể đặt thêm tùy chọn trứng rán tươi tại chỗ.`,
    descriptionEN: `Redefining plant-based eating, this burger features a unique patty crafted entirely from wholesome, natural ingredients rather than processed mock meat. The patty offers a rich, satisfying bite, blending creamy cooked lotus seeds and chickpeas with the meaty texture of king oyster mushrooms. It is perfectly balanced with the crunch of fresh carrots, onions, sliced almonds, and toasted sesame seeds.\nSandwiched between a soft, airy bun, the savory veggie patty is paired with crisp lettuce and fresh tomato slices. For those who are not strictly vegan, you can opt for an add-on of a freshly fried egg (as shown in the image). The egg is cooked to order right when you arrive for pickup, adding a warm, rich, and buttery layer that perfectly complements the burger.`,
    descriptionTW: `賦予素食全新定義，這款漢堡的漢堡排（Patty）完全採用天然食材製作，絕不使用加工素肉。漢堡排完美結合了熟蓮子與雪蓮子（鷹嘴豆）的綿密滑順、杏鮑菇天然的鮮甜Q彈，以及紅蘿蔔、洋蔥、杏仁片和烘烤芝麻所帶來的豐富爽脆口感。\n夾在鬆軟漢堡麵包之間的是風味濃郁的鮮蔬漢堡排、翠綠生菜與多汁的番茄。 特別提醒，如果您不是純素食者（Vegan），可以選擇加購「現煎雞蛋」。`
  },
  {
    id: 'C002', vendor: 'Artisan Bakery', productName: 'BÁNH SỪNG BÒ THỦ CÔNG (Combo 5 bánh)',
    image: 'https://images.unsplash.com/photo-1555507036-ab1e4006aaeb?auto=format&fit=crop&q=80&w=800',
    unit: 'Combo 5 chiếc', netPrice: 60000, targetVolume: 10,
    description: `Bánh sừng bò bơ Pháp được nhào nặn hoàn toàn thủ công bởi nghệ nhân Đài Loan. Vỏ bánh nướng đến độ chín hoàn hảo với màu nâu hổ phách lấp lánh độ bóng tự nhiên. Điểm nhấn là cấu trúc hàng chục lớp bột cán mỏng manh; khi cắn vào, bề ngoài vỡ vụn với âm thanh giòn rụm đặc trưng, nhường chỗ cho phần ruột bánh mềm mại, dai nhẹ và xốp rỗ tổ ong. Hương bơ Pháp thượng hạng đọng lại hậu vị béo ngậy, đan xen chút ngọt thanh tinh tế tan trên đầu lưỡi.`,
    descriptionEN: `Handcrafted by a Taiwanese artisan using premium French butter. The pastry is baked to a flawless caramelized amber, boasting a natural glossy finish. Its magic lies in the dozens of delicately laminated layers—the first bite delivers a satisfying, shattering crunch from the crust, seamlessly giving way to a soft, airy, and honeycomb-like interior. A rich, buttery aroma instantly fills the senses, leaving a lingering, subtly sweet finish.`,
    descriptionTW: `由台灣職人純手工揉製的法式奶油可頌。外皮烤至完美的琥珀色澤，閃爍著天然的油亮光澤。最大的亮點在於數十層輕薄的酥皮結構；咬下時，外皮會發出特有的酥脆聲響並在口中化開，內裡則是柔軟、微韌且帶有蜂巢狀孔洞的麵包體。頂級法國奶油的香氣帶來濃郁的尾韻，交織著一絲細緻的清甜在舌尖化開。`
  },
  {
    id: 'C003', vendor: 'Artisan Bakery', productName: 'BÁNH SU KEM VỎ GIÒN (Combo 4 chiếc)',
    image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&q=80&w=800',
    unit: 'Combo 4 chiếc', netPrice: 72000, targetVolume: 13,
    description: `Mang đến trải nghiệm đối lập đầy thú vị giữa kết cấu giòn rụm và độ mềm mịn béo ngậy. Lớp vỏ choux phủ áo craquelin nứt nẻ được nướng thơm lừng, giòn tan ngay khi vừa chạm môi. Ẩn sâu bên trong là lõi nhân kem sữa ngập tràn, mát lạnh và thanh ngọt. Đặc biệt, khi bảo quản trong ngăn mát tủ lạnh, phần nhân sẽ đông nhẹ lại, đặc mịn như một viên kem tươi cao cấp. Cam kết bánh luôn tươi mới mỗi ngày, hoàn toàn không chứa chất bảo quản.`,
    descriptionEN: `A delightful contrast of textures and temperatures. The signature cracked craquelin crust provides a deeply satisfying, buttery crunch with every bite. Hidden inside is a generous core of chilled, velvety milk cream. When kept in the fridge, the filling thickens into a luxurious, ice-cream-like consistency that melts effortlessly on the tongue. 100% freshly baked daily with absolutely no preservatives.`,
    descriptionTW: `帶來酥脆與滑順濃郁之間充滿趣味的雙重口感體驗。覆蓋著龜裂酥皮（Craquelin）的泡芙外殼烤得香氣四溢，一觸及唇邊便酥脆化開。藏在深處的是飽滿、冰涼且清甜的牛奶鮮奶油內餡。特別是冷藏保存時，內餡會微微凝固，變得如同高級冰淇淋般綿密，在口腔中柔滑融化。保證每日新鮮現做，絕不添加任何防腐劑。`
  },
  {
    id: 'C004', vendor: 'Taiwanese Tea House', productName: 'TRÀ SỮA & MOCHI THỦ CÔNG ĐÀI LOAN',
    image: 'https://images.unsplash.com/photo-1558857563-b37102e99e03?auto=format&fit=crop&q=80&w=800',
    unit: 'Cốc', targetVolume: 50, isConfigurable: true,
    variants: [
      { id: 'v1', name: 'Nguyên vị', netPrice: 51000 },
      { id: 'v2', name: 'Xanh sữa', netPrice: 51000 },
      { id: 'v3', name: 'Caramel hạt dẻ', netPrice: 61000 }
    ],
    toppings: [
      { id: 't1', name: 'Trân châu', netPrice: 10000 },
      { id: 't2', name: 'Mochi', netPrice: 15000 }
    ],
    sugarLevels: ['0%', '30%', '50%', '80%', '100%'],
    description: `Trải nghiệm hương vị trà sữa Đài Loan nguyên bản với các nguyên liệu được tuyển chọn khắt khe. Nền trà được ủ lạnh (cold-brew) chầm chậm để chiết xuất trọn vẹn hương thơm tinh tế...`,
    descriptionEN: `Experience the authentic taste of Taiwanese milk tea crafted with meticulously selected ingredients. The cold-brew tea base is slowly extracted...`,
    descriptionTW: `體驗最道地的台灣珍奶風味，嚴選頂級食材製作。採用冷泡（Cold-brew）工法緩慢萃取茶湯...`
  }
];

const mockUser = { id: 'U001', name: 'Demo User', pointBalance: 50000 }; // User has 50k points

const initialOrders = [
  {
    id: 'ORD-TEST01', customerEmail: 'demo@gmail.com',
    items: [
      { productId: 'C004', name: 'TRÀ SỮA ĐÀI LOAN (Caramel)', options: 'Đường 50%, +Mochi', qty: 2, unitPriceNet: 76000 },
      { productId: 'C001', name: 'BURGER CHAY', options: '', qty: 1, unitPriceNet: 55000 }
    ],
    totalNet: 207000, totalGross: 223560, pointsApplied: 0, finalPayable: 223560,
    status: 'PAID', orderDate: '2026-09-28T14:30:00'
  },
  {
    id: 'ORD-TEST02', customerEmail: 'hoang.minh@gmail.com',
    items: [{ productId: 'C001', name: 'BURGER CHAY', options: '', qty: 45, unitPriceNet: 55000 }],
    totalNet: 2475000, totalGross: 2673000, pointsApplied: 0, finalPayable: 2673000,
    status: 'PAID', orderDate: '2026-09-29T10:15:00'
  }
];

const LOCAL_IMG = { C001: "/images/burger-chay.png", C002: "/images/banh-sung-bo.png", C003: "/images/banh-su-kem.png", C004: "/images/tra-sua-dai-loan.png" };
const CUSTOMER_EMAIL = "demo@gmail.com";
const VAT = 0.08;

/* ================= HELPERS ================= */
const vnd = (n) => `${Math.round(n).toLocaleString("vi-VN")} đ`;
const makeCode = () => "ORD-" + Array.from({ length: 6 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
const paidQty = (orders, pid) =>
  orders.filter((o) => o.status === 'PAID').reduce((s, o) => s + o.items.filter((i) => i.productId === pid).reduce((a, i) => a + i.qty, 0), 0);
const parseOptions = (str = "") => {
  const parts = str.split(",").map((s) => s.trim()).filter(Boolean);
  return { sugar: parts.find((p) => p.startsWith("Đường")) || "", toppings: parts.filter((p) => p.startsWith("+")).map((p) => p.slice(1)) };
};
const pad = (n) => String(n).padStart(2, "0");
const nowLocal = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`; };
const fmtDT = (s) => `${s.slice(8, 10)}/${s.slice(5, 7)} ${s.slice(11, 16)}`;
const itemGross = (i) => i.unitPriceNet * i.qty * (1 + VAT);

/* ---- FINANCIAL ENGINE: tính theo TỪNG sản phẩm, chỉ từ đơn PAID ---- */
function computeFinancials(products, orders) {
  const paid = orders.filter((o) => o.status === 'PAID');
  const rows = products.map((p) => {
    const items = paid.flatMap((o) => o.items).filter((i) => i.productId === p.id);
    const qty = items.reduce((s, i) => s + i.qty, 0);
    const gross = Math.round(items.reduce((s, i) => s + itemGross(i), 0));
    const met = qty >= p.targetVolume;
    return {
      id: p.id, name: p.productName, target: p.targetVolume, qty, gross, met,
      vendor: Math.round(gross * (met ? 0.9 : 0.95)),
      platform: Math.round(gross * 0.05),
      cashback: met ? Math.round(gross * 0.05) : 0,
    };
  });
  const sum = (k) => rows.reduce((s, r) => s + r[k], 0);
  return { rows, gmv: sum("gross"), vendor: sum("vendor"), platform: sum("platform"), cashback: sum("cashback") };
}

const btnPrimary = "rounded-xl bg-orange-600 font-semibold text-white transition hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2";

/* ================= CUSTOMER: PRODUCT CARD ================= */
function ProductCard({ p, orders, inCart, onAdd }) {
  const langs = [["VN", "description"], ["TW", "descriptionTW"], ["EN", "descriptionEN"]].filter(([, k]) => p[k]);
  const [lang, setLang] = useState(0);
  const [more, setMore] = useState(false);
  const current = paidQty(orders, p.id);
  const pct = Math.min(100, (current / p.targetVolume) * 100);
  const fromPrice = p.isConfigurable ? Math.min(...p.variants.map((v) => v.netPrice)) : p.netPrice;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="flex h-60 items-center justify-center bg-stone-100">
        <img src={LOCAL_IMG[p.id] || p.image} alt={p.productName} loading="lazy" className="h-full w-full object-contain"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = p.image; }} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-sm text-stone-500">{p.vendor}</p>
          <h2 className="font-semibold leading-snug">{p.productName}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-500"><Clock size={14} /> Chốt sổ 17:00 · {p.unit}</p>
        </div>
        <p className="text-xl font-bold">{p.isConfigurable && <span className="text-sm font-normal text-stone-500">Từ </span>}{vnd(fromPrice)} <span className="text-sm font-normal text-stone-500">(Chưa VAT)</span></p>
        <div>
          <div className="mb-1 flex gap-1">
            {langs.map(([l], i) => (
              <button key={l} onClick={() => setLang(i)} aria-pressed={lang === i}
                className={`rounded-md border px-2 py-0.5 text-xs font-medium ${lang === i ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 text-stone-700 hover:bg-stone-100"}`}>{l}</button>
            ))}
          </div>
          <p className={`whitespace-pre-line text-sm leading-relaxed text-stone-600 ${more ? "" : "line-clamp-3"}`}>{p[langs[lang][1]]}</p>
          <button onClick={() => setMore((v) => !v)} className="mt-1 text-sm font-medium text-orange-700 hover:underline">{more ? "Thu gọn" : "Xem thêm"}</button>
        </div>
        <div className="mt-auto">
          <div className="h-2.5 overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-valuenow={current} aria-valuemax={p.targetVolume}>
            <div className="h-full rounded-full bg-orange-600 transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-sm text-stone-600">Đã gom: <b className="text-stone-900">{current}/{p.targetVolume}</b>. Hoàn 5% nếu đạt mốc.</p>
          <button onClick={() => onAdd(p)} className={`${btnPrimary} mt-3 flex w-full items-center justify-center gap-2 py-3`}>
            <ShoppingCart size={18} /> {p.isConfigurable ? "Chọn món" : "Thêm vào giỏ"}{inCart > 0 && ` (${inCart})`}
          </button>
        </div>
      </div>
    </article>
  );
}

/* ================= CUSTOMER: CONFIG MODAL ================= */
function ConfigModal({ p, onClose, onAdd }) {
  const [variantId, setVariantId] = useState(p.variants[0].id);
  const [tops, setTops] = useState([]);
  const [sugar, setSugar] = useState('100%');
  const [qty, setQty] = useState(1);
  const variant = p.variants.find((v) => v.id === variantId);
  const chosen = p.toppings.filter((t) => tops.includes(t.id));
  const unit = variant.netPrice + chosen.reduce((s, t) => s + t.netPrice, 0);
  const toggle = (id) => setTops((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  const row = "flex cursor-pointer items-center justify-between rounded-lg border border-stone-200 p-2.5 text-sm has-[:checked]:border-orange-600 has-[:checked]:bg-orange-100 has-[:checked]:font-semibold has-[:checked]:ring-1 has-[:checked]:ring-orange-600";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug">{p.productName}</h3>
          <button onClick={onClose} aria-label="Đóng" className="rounded-full p-1.5 text-stone-500 hover:bg-stone-100"><X size={20} /></button>
        </div>

        <fieldset className="mb-4 space-y-1.5"><legend className="mb-1.5 text-sm font-semibold">Hương vị (chọn 1)</legend>
          {p.variants.map((v) => (
            <label key={v.id} className={row}><span className="flex items-center gap-2"><input type="radio" name="variant" checked={variantId === v.id} onChange={() => setVariantId(v.id)} className="accent-orange-600" />{v.name}</span><span className="text-stone-600">{vnd(v.netPrice)}</span></label>
          ))}
        </fieldset>

        <fieldset className="mb-4 space-y-1.5"><legend className="mb-1.5 text-sm font-semibold">Topping (chọn nhiều)</legend>
          {p.toppings.map((t) => (
            <label key={t.id} className={row}><span className="flex items-center gap-2"><input type="checkbox" checked={tops.includes(t.id)} onChange={() => toggle(t.id)} className="accent-orange-600" />{t.name}</span><span className="text-stone-600">+{vnd(t.netPrice)}</span></label>
          ))}
        </fieldset>

        <fieldset className="mb-4"><legend className="mb-1.5 text-sm font-semibold">Mức đường (chọn 1)</legend>
          <div className="flex flex-wrap gap-1.5">
            {p.sugarLevels.map((s) => {
              const active = sugar === s;
              return (
                <label
                  key={s}
                  className={`cursor-pointer select-none rounded-lg border px-3.5 py-2 text-sm transition ${
                    active
                      ? "border-orange-600 bg-orange-600 font-semibold text-white shadow-sm"
                      : "border-stone-300 text-stone-700 hover:border-orange-400 hover:bg-orange-50"
                  }`}
                >
                  <input type="radio" name="sugar" className="sr-only" checked={active} onChange={() => setSugar(s)} />{s}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mb-4 flex items-center justify-between rounded-xl border border-stone-200 p-3">
          <span className="text-sm">Số lượng</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Giảm" className="rounded-full border border-stone-300 p-1.5 hover:bg-stone-100"><Minus size={16} /></button>
            <span className="w-6 text-center font-semibold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Tăng" className="rounded-full border border-stone-300 p-1.5 hover:bg-stone-100"><Plus size={16} /></button>
          </div>
        </div>

        <button
          onClick={() => {
            onAdd({
              productId: p.id, name: `TRÀ SỮA ĐÀI LOAN (${variant.name})`,
              options: [`Đường ${sugar}`, ...chosen.map((t) => `+${t.name}`)].join(", "), qty, unitPriceNet: unit,
            });
            onClose();
          }}
          className={`${btnPrimary} w-full py-3`}
        >
          Thêm vào giỏ · {vnd(unit * qty)} <span className="text-xs font-normal">(chưa VAT)</span>
        </button>
      </div>
    </div>
  );
}

/* ================= CUSTOMER: CART + CHECKOUT ================= */
function CartDrawer({ cart, setCart, user, onClose, onPlaceOrder }) {
  const [step, setStep] = useState("cart"); // cart | pay | wait
  const [usePoints, setUsePoints] = useState(false);
  const [order, setOrder] = useState(null);

  const net = cart.reduce((s, l) => s + l.unitPriceNet * l.qty, 0);
  const vat = Math.round(net * VAT);
  const gross = net + vat;
  const maxPoints = Math.floor(user.pointBalance * 0.5); // chỉ được dùng tối đa 50% ví
  const applied = usePoints ? Math.min(maxPoints, gross) : 0;
  const payable = gross - applied;
  const cashback = Math.round(gross * 0.05);
  const setQty = (i, q) => setCart((c) => c.map((l, idx) => (idx === i ? { ...l, qty: q } : l)).filter((l) => l.qty > 0));

  const place = () => {
    const o = { id: makeCode(), customerEmail: CUSTOMER_EMAIL, items: cart, totalNet: net, totalGross: gross, pointsApplied: applied, finalPayable: payable, status: 'PENDING', orderDate: nowLocal() };
    onPlaceOrder(o); setOrder(o); setCart([]); setStep("pay");
  };
  const qr = order ? `https://img.vietqr.io/image/970436-123456789-compact2.png?amount=${order.finalPayable}&addInfo=${order.id.replace("-", "")}` : "";

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={step !== "cart" ? undefined : onClose}>
      <aside role="dialog" aria-modal="true" className="flex h-full w-full max-w-md flex-col bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-stone-200 p-4">
          <h3 className="text-lg font-semibold">{step === "cart" ? "Giỏ hàng" : step === "pay" ? "Thanh toán" : "Đã ghi nhận"}</h3>
          <button onClick={onClose} aria-label="Đóng" className="rounded-full p-1.5 text-stone-500 hover:bg-stone-100"><X size={20} /></button>
        </div>

        {step === "cart" && (cart.length === 0 ? <p className="p-6 text-center text-sm text-stone-500">Giỏ hàng trống.</p> : (
          <>
            <ul className="flex-1 divide-y divide-stone-200 overflow-y-auto px-4">
              {cart.map((l, i) => (
                <li key={i} className="py-3">
                  <p className="text-sm font-medium leading-snug">{l.name}</p>
                  {l.options && <p className="text-xs text-stone-500">{l.options}</p>}
                  <p className="text-xs text-stone-500">{vnd(l.unitPriceNet)} (Chưa VAT)</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQty(i, l.qty - 1)} aria-label="Giảm" className="rounded-full border border-stone-300 p-1 hover:bg-stone-100"><Minus size={14} /></button>
                      <span className="w-5 text-center text-sm font-semibold">{l.qty}</span>
                      <button onClick={() => setQty(i, l.qty + 1)} aria-label="Tăng" className="rounded-full border border-stone-300 p-1 hover:bg-stone-100"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => setQty(i, 0)} aria-label="Xóa" className="p-1 text-stone-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-stone-200 p-4">
              <div className="flex items-center justify-between rounded-lg bg-stone-100 px-3 py-2 text-sm">
                <span className="flex items-center gap-1.5 text-stone-600"><Wallet size={15} /> Số dư ví hiện tại</span>
                <b>{user.pointBalance.toLocaleString("vi-VN")} Điểm</b>
              </div>
              <label className={`flex items-start gap-3 rounded-lg border p-3 text-sm ${maxPoints > 0 ? "cursor-pointer border-stone-200 has-[:checked]:border-orange-600 has-[:checked]:bg-orange-50" : "border-stone-100 text-stone-400"}`}>
                <input type="checkbox" disabled={maxPoints === 0} checked={usePoints} onChange={(e) => setUsePoints(e.target.checked)} className="mt-0.5 h-4 w-4 accent-orange-600" />
                <span>Sử dụng <b>{Math.min(maxPoints, gross).toLocaleString("vi-VN")} Điểm</b> thưởng (50% ví) để thanh toán</span>
              </label>

              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between"><dt className="text-stone-600">Tạm tính</dt><dd>{vnd(net)}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-600">VAT (8%)</dt><dd>{vnd(vat)}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-600">Tổng cộng (đã gồm VAT)</dt><dd>{vnd(gross)}</dd></div>
                {applied > 0 && <div className="flex justify-between"><dt className="text-stone-600">Điểm sử dụng</dt><dd>− {vnd(applied)}</dd></div>}
                <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-semibold"><dt>Cần thanh toán</dt><dd>{vnd(payable)}</dd></div>
              </dl>
              <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-stone-600">
                <span className="font-bold text-emerald-600">Dự kiến hoàn: {cashback.toLocaleString("vi-VN")} Điểm</span> nếu mẻ gom của sản phẩm đạt mốc.
              </p>
              <button onClick={place} className={`${btnPrimary} w-full py-3`}>Thanh toán ngay</button>
            </div>
          </>
        ))}

        {step === "pay" && order && (
          <div className="flex-1 overflow-y-auto p-4 text-center">
            {order.finalPayable > 0 ? (
              <>
                <p className="text-sm text-stone-500">Quét mã để chuyển khoản</p>
                <img src={qr} alt={`Mã VietQR ${vnd(order.finalPayable)}`} className="mx-auto my-4 w-64 max-w-full rounded-xl border border-stone-200" />
              </>
            ) : <p className="my-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">Đơn được thanh toán hoàn toàn bằng điểm.</p>}
            <dl className="mb-4 space-y-1 rounded-xl bg-stone-50 p-3 text-left text-sm">
              <div className="flex justify-between"><dt className="text-stone-500">Số tiền</dt><dd className="font-semibold">{vnd(order.finalPayable)}</dd></div>
              {order.pointsApplied > 0 && <div className="flex justify-between"><dt className="text-stone-500">Đã dùng điểm</dt><dd>{vnd(order.pointsApplied)}</dd></div>}
              <div className="flex justify-between"><dt className="text-stone-500">Nội dung</dt><dd className="font-mono">{order.id.replace("-", "")}</dd></div>
            </dl>
            <button onClick={() => setStep("wait")} className={`${btnPrimary} w-full py-3`}>Tôi đã chuyển khoản</button>
          </div>
        )}

        {step === "wait" && order && (
          <div className="flex-1 space-y-4 p-6 text-center" role="status">
            <CheckCircle2 size={52} className="mx-auto text-emerald-600" />
            <div>
              <p className="text-sm text-stone-500">Mã Đơn Hàng Của Bạn:</p>
              <p className="mt-1 rounded-xl bg-stone-100 py-3 font-mono text-2xl font-bold">#{order.id}</p>
              <p className="mt-2 text-sm text-stone-600">Vui lòng lưu lại mã này để nhận hàng.</p>
            </div>
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">Đơn đang chờ đối soát (PENDING). Đơn chỉ được tính vào mẻ gom sau khi admin xác nhận đã nhận tiền.</p>
            <button onClick={onClose} className="w-full rounded-xl bg-stone-900 py-3 font-medium text-white hover:bg-stone-800">Về danh sách</button>
          </div>
        )}
      </aside>
    </div>
  );
}

/* ================= CUSTOMER VIEW ================= */
function CustomerView({ products, orders, user, onPlaceOrder }) {
  const [cart, setCart] = useState([]);
  const [config, setConfig] = useState(null);
  const [open, setOpen] = useState(false);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  const addLine = (line) =>
    setCart((c) => {
      const i = c.findIndex((l) => l.productId === line.productId && l.name === line.name && l.options === line.options);
      return i >= 0 ? c.map((l, idx) => (idx === i ? { ...l, qty: l.qty + line.qty } : l)) : [...c, line];
    });
  const handleAdd = (p) => (p.isConfigurable ? setConfig(p) : addLine({ productId: p.id, name: p.productName, options: "", qty: 1, unitPriceNet: p.netPrice }));

  return (
    <>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-4">
        <p className="max-w-xl text-sm text-stone-600">Giá chưa gồm VAT; VAT 8% cộng khi thanh toán. Chỉ đơn đã được xác nhận thanh toán mới tính vào tiến trình gom.</p>
        <div className="flex shrink-0 items-center gap-1">
          <span className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-sm font-medium"><Wallet size={15} /> Ví: {user.pointBalance.toLocaleString("vi-VN")} Xu</span>
          <button onClick={() => setOpen(true)} aria-label={`Giỏ hàng, ${count} sản phẩm`} className="relative rounded-full p-2 hover:bg-stone-200">
            <ShoppingCart size={22} />
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-semibold text-white">{count}</span>}
          </button>
        </div>
      </div>
      <main className="mx-auto grid max-w-6xl gap-4 px-4 py-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.id} p={p} orders={orders} inCart={cart.filter((l) => l.productId === p.id).reduce((s, l) => s + l.qty, 0)} onAdd={handleAdd} />)}
      </main>
      {config && <ConfigModal p={config} onClose={() => setConfig(null)} onAdd={addLine} />}
      {open && <CartDrawer cart={cart} setCart={setCart} user={user} onClose={() => setOpen(false)} onPlaceOrder={onPlaceOrder} />}
    </>
  );
}

/* ================= ADMIN VIEW ================= */
function AdminView({ products, orders, onSetStatus }) {
  const [date, setDate] = useState("ALL");
  const [before17, setBefore17] = useState(false);

  const fin = useMemo(() => computeFinancials(products, orders), [products, orders]); // chạy lại mỗi khi status đổi
  const dates = useMemo(() => [...new Set(orders.map((o) => o.orderDate.slice(0, 10)))].sort(), [orders]);
  const filtered = orders.filter((o) => (date === "ALL" || o.orderDate.startsWith(date)) && (!before17 || o.orderDate.slice(11, 16) < "17:00"));

  // Tổng hợp chế biến: đơn PAID trong bộ lọc ngày
  const { drinks, toppings, prepOrders } = useMemo(() => {
    const d = {}, t = {};
    const paid = filtered.filter((o) => o.status === 'PAID');
    paid.forEach((o) => o.items.forEach((i) => {
      const { sugar, toppings: tp } = parseOptions(i.options);
      d[i.name] = d[i.name] || { qty: 0, sugar: {} };
      d[i.name].qty += i.qty;
      if (sugar) d[i.name].sugar[sugar] = (d[i.name].sugar[sugar] || 0) + i.qty;
      tp.forEach((n) => { t[n] = (t[n] || 0) + i.qty; });
    }));
    return { drinks: Object.entries(d), toppings: Object.entries(t), prepOrders: paid.length };
  }, [orders, date, before17]);

  const kpis = [
    ["Tổng Doanh Thu (GMV)", fin.gmv, "Đã gồm VAT · chỉ đơn PAID", "border-l-stone-400", "text-stone-900"],
    ["Cần Trả Quán (Vendor Payout)", fin.vendor, "90% nếu đạt mốc, 95% nếu chưa", "border-l-amber-500", "text-amber-700"],
    ["Lợi Nhuận Nền Tảng", fin.platform, "Luôn 5% GMV", "border-l-emerald-600", "text-emerald-700"],
    ["Quỹ Hoàn Điểm (Cashback)", fin.cashback, "5% của sản phẩm đạt mốc", "border-l-blue-600", "text-blue-700"],
  ];
  const th = "px-3 py-2 text-left text-xs font-semibold text-stone-500";

  return (
    <main className="mx-auto max-w-7xl space-y-4 px-4 py-4">
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(([label, v, note, border, color]) => (
          <div key={label} className={`rounded-lg border border-l-4 border-stone-200 bg-white p-3 ${border}`}>
            <p className="text-xs font-medium text-stone-500">{label}</p>
            <p className={`mt-1 text-xl font-semibold tabular-nums ${color}`}>{vnd(v)}</p>
            <p className="text-xs text-stone-400">{note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-stone-200 bg-white">
        <div className="border-b border-stone-200 px-3 py-2.5"><h2 className="text-sm font-semibold">Đối Soát Tài Chính Theo Sản Phẩm</h2><p className="text-xs text-stone-500">Mỗi sản phẩm tự xét đạt/chưa đạt mốc dựa trên số lượng đơn PAID</p></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="border-b border-stone-200 bg-stone-50"><tr>
              <th className={th}>Sản phẩm</th><th className={th}>Đã gom / Mốc</th><th className={th}>Kết quả</th>
              <th className={`${th} text-right`}>Doanh thu</th><th className={`${th} text-right`}>Trả quán</th><th className={`${th} text-right`}>Nền tảng 5%</th><th className={`${th} text-right`}>Hoàn điểm</th>
            </tr></thead>
            <tbody className="divide-y divide-stone-100">
              {fin.rows.map((r) => (
                <tr key={r.id} className="hover:bg-stone-50">
                  <td className="px-3 py-2 font-medium">{r.name}</td>
                  <td className="whitespace-nowrap px-3 py-2 tabular-nums"><b>{r.qty}</b>/{r.target}</td>
                  <td className="px-3 py-2"><span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${r.met ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-stone-200 bg-stone-50 text-stone-600"}`}>{r.met ? "Đạt mốc · quán 90%" : "Chưa đạt · quán 95%"}</span></td>
                  <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums">{vnd(r.gross)}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-amber-700">{vnd(r.vendor)}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-emerald-700">{vnd(r.platform)}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-blue-700">{vnd(r.cashback)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm">
        <label className="flex items-center gap-2">Lọc theo ngày đặt:
          <select value={date} onChange={(e) => setDate(e.target.value)} className="rounded-md border border-stone-300 bg-white px-2 py-1">
            <option value="ALL">Tất cả</option>
            {dates.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        <label className="flex cursor-pointer items-center gap-2"><input type="checkbox" checked={before17} onChange={(e) => setBefore17(e.target.checked)} className="accent-orange-600" /> Chỉ đơn trước 17:00</label>
        <span className="text-xs text-stone-500">Áp dụng cho bảng chế biến và bảng đơn hàng. KPI luôn tính trên toàn bộ đơn PAID.</span>
      </div>

      <section className="rounded-lg border border-stone-200 bg-white">
        <div className="border-b border-stone-200 px-3 py-2.5"><h2 className="text-sm font-semibold">Tổng Hợp Chế Biến (chỉ đơn PAID)</h2><p className="text-xs text-stone-500">{prepOrders} đơn PAID trong bộ lọc</p></div>
        {drinks.length === 0 ? <p className="p-4 text-sm text-stone-500">Không có đơn PAID trong bộ lọc.</p> : (
          <div className="grid gap-px bg-stone-200 md:grid-cols-2">
            <table className="w-full bg-white text-sm"><thead className="border-b border-stone-200 bg-stone-50"><tr><th className={th}>Món</th><th className={`${th} text-right`}>Số lượng</th></tr></thead>
              <tbody className="divide-y divide-stone-100">
                {drinks.map(([name, d]) => (
                  <tr key={name}><td className="px-3 py-2"><p className="font-medium">{name}</p>
                    <p className="text-xs text-stone-500">{Object.entries(d.sugar).map(([s, q]) => `${s}: ${q}`).join(" · ")}</p></td>
                    <td className="px-3 py-2 text-right text-3xl font-bold tabular-nums">{d.qty}</td></tr>
                ))}
              </tbody></table>
            <table className="w-full self-start bg-white text-sm"><thead className="border-b border-stone-200 bg-stone-50"><tr><th className={th}>Topping</th><th className={`${th} text-right`}>Số phần</th></tr></thead>
              <tbody className="divide-y divide-stone-100">
                {toppings.length === 0 ? <tr><td className="px-3 py-2 text-stone-500" colSpan={2}>Không có topping</td></tr> : toppings.map(([n, q]) => (
                  <tr key={n}><td className="px-3 py-2 font-medium">Topping {n}</td><td className="px-3 py-2 text-right text-3xl font-bold tabular-nums">{q}</td></tr>
                ))}
              </tbody></table>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-stone-200 bg-white">
        <div className="border-b border-stone-200 px-3 py-2.5"><h2 className="text-sm font-semibold">Đối Soát Đơn Hàng ({filtered.length})</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="border-b border-stone-200 bg-stone-50"><tr>
              <th className={th}>Mã Đơn</th><th className={th}>Ngày Giờ</th><th className={th}>Khách Hàng</th><th className={th}>Chi Tiết</th>
              <th className={`${th} text-right`}>Thực Thu (Final Payable)</th><th className={th}>Trạng Thái</th>
            </tr></thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((o) => (
                <tr key={o.id} className="align-top hover:bg-stone-50">
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-xs font-semibold">{o.id}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-stone-600">{fmtDT(o.orderDate)}</td>
                  <td className="px-3 py-2 text-stone-700">{o.customerEmail}</td>
                  <td className="px-3 py-2"><div className="space-y-1">{o.items.map((i, k) => (
                    <div key={k} className="text-xs"><b>{i.qty}x</b> {i.name}{i.options && <span className="text-stone-500"> · {i.options}</span>}</div>))}</div></td>
                  <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums">
                    <p className="font-medium">{vnd(o.finalPayable)}</p>
                    {o.pointsApplied > 0 && <p className="text-xs text-stone-500">+ {vnd(o.pointsApplied)} điểm</p>}
                  </td>
                  <td className="px-3 py-2">
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${o.status === 'PAID' ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>{o.status}</span>
                    <label className="mt-1.5 flex cursor-pointer items-center gap-2 text-xs">
                      <input type="checkbox" checked={o.status === 'PAID'} onChange={(e) => onSetStatus(o.id, e.target.checked ? 'PAID' : 'PENDING')} className="h-4 w-4 accent-emerald-600" />
                      Xác nhận Chuyển khoản
                    </label>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="px-3 py-6 text-center text-stone-500">Không có đơn nào.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

/* ================= APP (GLOBAL STATE) ================= */
export default function FullApp() {
  const [view, setView] = useState("CUSTOMER");
  const [products] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [user, setUser] = useState(mockUser);

  const placeOrder = (o) => {
    setOrders((list) => [o, ...list]);
    setUser((u) => ({ ...u, pointBalance: u.pointBalance - o.pointsApplied })); // giữ điểm ngay khi đặt đơn
  };
  const setStatus = (id, status) => setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)));

  const tab = (v) => `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${view === v ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100"}`;
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <nav className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <span className="hidden font-semibold sm:block">Gom Đơn</span>
          <div className="flex gap-1" role="tablist">
            <button role="tab" aria-selected={view === "CUSTOMER"} onClick={() => setView("CUSTOMER")} className={tab("CUSTOMER")}><Store size={15} /> CUSTOMER VIEW</button>
            <button role="tab" aria-selected={view === "ADMIN"} onClick={() => setView("ADMIN")} className={tab("ADMIN")}><ShieldCheck size={15} /> ADMIN VIEW</button>
          </div>
        </div>
      </nav>
      {view === "CUSTOMER"
        ? <CustomerView products={products} orders={orders} user={user} onPlaceOrder={placeOrder} />
        : <AdminView products={products} orders={orders} onSetStatus={setStatus} />}
    </div>
  );
}
