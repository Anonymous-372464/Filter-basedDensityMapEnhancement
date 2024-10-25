(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const l of i.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerpolicy && (i.referrerPolicy = o.referrerpolicy),
      o.crossorigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossorigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
function au(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let o = 0; o < r.length; o++) n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
const cv =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  fv = au(cv);
function Sp(e) {
  return !!e || e === "";
}
function He(e) {
  if (we(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        o = Be(r) ? hv(r) : He(r);
      if (o) for (const i in o) t[i] = o[i];
    }
    return t;
  } else {
    if (Be(e)) return e;
    if (We(e)) return e;
  }
}
const dv = /;(?![^(]*\))/g,
  pv = /:(.+)/;
function hv(e) {
  const t = {};
  return (
    e.split(dv).forEach((n) => {
      if (n) {
        const r = n.split(pv);
        r.length > 1 && (t[r[0].trim()] = r[1].trim());
      }
    }),
    t
  );
}
function W(e) {
  let t = "";
  if (Be(e)) t = e;
  else if (we(e))
    for (let n = 0; n < e.length; n++) {
      const r = W(e[n]);
      r && (t += r + " ");
    }
  else if (We(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
function mv(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++) n = ho(e[r], t[r]);
  return n;
}
function ho(e, t) {
  if (e === t) return !0;
  let n = kc(e),
    r = kc(t);
  if (n || r) return n && r ? e.getTime() === t.getTime() : !1;
  if (((n = oi(e)), (r = oi(t)), n || r)) return e === t;
  if (((n = we(e)), (r = we(t)), n || r)) return n && r ? mv(e, t) : !1;
  if (((n = We(e)), (r = We(t)), n || r)) {
    if (!n || !r) return !1;
    const o = Object.keys(e).length,
      i = Object.keys(t).length;
    if (o !== i) return !1;
    for (const l in e) {
      const a = e.hasOwnProperty(l),
        s = t.hasOwnProperty(l);
      if ((a && !s) || (!a && s) || !ho(e[l], t[l])) return !1;
    }
  }
  return String(e) === String(t);
}
function Ep(e, t) {
  return e.findIndex((n) => ho(n, t));
}
const Je = (e) =>
    Be(e)
      ? e
      : e == null
      ? ""
      : we(e) || (We(e) && (e.toString === $p || !Te(e.toString)))
      ? JSON.stringify(e, Tp, 2)
      : String(e),
  Tp = (e, t) =>
    t && t.__v_isRef
      ? Tp(e, t.value)
      : ao(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, o]) => ((n[`${r} =>`] = o), n),
            {}
          ),
        }
      : ea(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : We(t) && !we(t) && !Mp(t)
      ? String(t)
      : t,
  Ze = {},
  lo = [],
  St = () => {},
  gv = () => !1,
  vv = /^on[^a-z]/,
  Ql = (e) => vv.test(e),
  su = (e) => e.startsWith("onUpdate:"),
  vt = Object.assign,
  uu = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  bv = Object.prototype.hasOwnProperty,
  Re = (e, t) => bv.call(e, t),
  we = Array.isArray,
  ao = (e) => Ei(e) === "[object Map]",
  ea = (e) => Ei(e) === "[object Set]",
  kc = (e) => Ei(e) === "[object Date]",
  Te = (e) => typeof e == "function",
  Be = (e) => typeof e == "string",
  oi = (e) => typeof e == "symbol",
  We = (e) => e !== null && typeof e == "object",
  Ml = (e) => We(e) && Te(e.then) && Te(e.catch),
  $p = Object.prototype.toString,
  Ei = (e) => $p.call(e),
  ul = (e) => Ei(e).slice(8, -1),
  Mp = (e) => Ei(e) === "[object Object]",
  cu = (e) =>
    Be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  cl = au(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  ta = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  yv = /-(\w)/g,
  un = ta((e) => e.replace(yv, (t, n) => (n ? n.toUpperCase() : ""))),
  wv = /\B([A-Z])/g,
  pr = ta((e) => e.replace(wv, "-$1").toLowerCase()),
  na = ta((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Ma = ta((e) => (e ? `on${na(e)}` : "")),
  ii = (e, t) => !Object.is(e, t),
  fl = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Al = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  kl = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Oc;
const _v = () =>
  Oc ||
  (Oc =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let Ht;
class xv {
  constructor(t = !1) {
    (this.detached = t),
      (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ht),
      !t && Ht && (this.index = (Ht.scopes || (Ht.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = Ht;
      try {
        return (Ht = this), t();
      } finally {
        Ht = n;
      }
    }
  }
  on() {
    Ht = this;
  }
  off() {
    Ht = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o &&
          o !== this &&
          ((this.parent.scopes[this.index] = o), (o.index = this.index));
      }
      (this.parent = void 0), (this.active = !1);
    }
  }
}
function Cv(e, t = Ht) {
  t && t.active && t.effects.push(e);
}
function Sv() {
  return Ht;
}
function Ev(e) {
  Ht && Ht.cleanups.push(e);
}
const fu = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  Ap = (e) => (e.w & cr) > 0,
  kp = (e) => (e.n & cr) > 0,
  Tv = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= cr;
  },
  $v = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const o = t[r];
        Ap(o) && !kp(o) ? o.delete(e) : (t[n++] = o),
          (o.w &= ~cr),
          (o.n &= ~cr);
      }
      t.length = n;
    }
  },
  os = new WeakMap();
let jo = 0,
  cr = 1;
const is = 30;
let ln;
const Ir = Symbol(""),
  ls = Symbol("");
class du {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Cv(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = ln,
      n = ur;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = ln),
        (ln = this),
        (ur = !0),
        (cr = 1 << ++jo),
        jo <= is ? Tv(this) : Pc(this),
        this.fn()
      );
    } finally {
      jo <= is && $v(this),
        (cr = 1 << --jo),
        (ln = this.parent),
        (ur = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ln === this
      ? (this.deferStop = !0)
      : this.active &&
        (Pc(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Pc(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let ur = !0;
const Op = [];
function Kr() {
  Op.push(ur), (ur = !1);
}
function qr() {
  const e = Op.pop();
  ur = e === void 0 ? !0 : e;
}
function Wt(e, t, n) {
  if (ur && ln) {
    let r = os.get(e);
    r || os.set(e, (r = new Map()));
    let o = r.get(n);
    o || r.set(n, (o = fu())), Pp(o);
  }
}
function Pp(e, t) {
  let n = !1;
  jo <= is ? kp(e) || ((e.n |= cr), (n = !Ap(e))) : (n = !e.has(ln)),
    n && (e.add(ln), ln.deps.push(e));
}
function Wn(e, t, n, r, o, i) {
  const l = os.get(e);
  if (!l) return;
  let a = [];
  if (t === "clear") a = [...l.values()];
  else if (n === "length" && we(e))
    l.forEach((s, u) => {
      (u === "length" || u >= r) && a.push(s);
    });
  else
    switch ((n !== void 0 && a.push(l.get(n)), t)) {
      case "add":
        we(e)
          ? cu(n) && a.push(l.get("length"))
          : (a.push(l.get(Ir)), ao(e) && a.push(l.get(ls)));
        break;
      case "delete":
        we(e) || (a.push(l.get(Ir)), ao(e) && a.push(l.get(ls)));
        break;
      case "set":
        ao(e) && a.push(l.get(Ir));
        break;
    }
  if (a.length === 1) a[0] && as(a[0]);
  else {
    const s = [];
    for (const u of a) u && s.push(...u);
    as(fu(s));
  }
}
function as(e, t) {
  const n = we(e) ? e : [...e];
  for (const r of n) r.computed && Nc(r);
  for (const r of n) r.computed || Nc(r);
}
function Nc(e, t) {
  (e !== ln || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Mv = au("__proto__,__v_isRef,__isVue"),
  Np = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(oi)
  ),
  Av = pu(),
  kv = pu(!1, !0),
  Ov = pu(!0),
  Ic = Pv();
function Pv() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = Ve(this);
        for (let i = 0, l = this.length; i < l; i++) Wt(r, "get", i + "");
        const o = r[t](...n);
        return o === -1 || o === !1 ? r[t](...n.map(Ve)) : o;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Kr();
        const r = Ve(this)[t].apply(this, n);
        return qr(), r;
      };
    }),
    e
  );
}
function pu(e = !1, t = !1) {
  return function (r, o, i) {
    if (o === "__v_isReactive") return !e;
    if (o === "__v_isReadonly") return e;
    if (o === "__v_isShallow") return t;
    if (o === "__v_raw" && i === (e ? (t ? Yv : Bp) : t ? Rp : Fp).get(r))
      return r;
    const l = we(r);
    if (!e && l && Re(Ic, o)) return Reflect.get(Ic, o, i);
    const a = Reflect.get(r, o, i);
    return (oi(o) ? Np.has(o) : Mv(o)) || (e || Wt(r, "get", o), t)
      ? a
      : Qe(a)
      ? l && cu(o)
        ? a
        : a.value
      : We(a)
      ? e
        ? gu(a)
        : Et(a)
      : a;
  };
}
const Nv = Ip(),
  Iv = Ip(!0);
function Ip(e = !1) {
  return function (n, r, o, i) {
    let l = n[r];
    if (mo(l) && Qe(l) && !Qe(o)) return !1;
    if (
      !e &&
      (!Ol(o) && !mo(o) && ((l = Ve(l)), (o = Ve(o))),
      !we(n) && Qe(l) && !Qe(o))
    )
      return (l.value = o), !0;
    const a = we(n) && cu(r) ? Number(r) < n.length : Re(n, r),
      s = Reflect.set(n, r, o, i);
    return (
      n === Ve(i) && (a ? ii(o, l) && Wn(n, "set", r, o) : Wn(n, "add", r, o)),
      s
    );
  };
}
function Lv(e, t) {
  const n = Re(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && Wn(e, "delete", t, void 0), r;
}
function Fv(e, t) {
  const n = Reflect.has(e, t);
  return (!oi(t) || !Np.has(t)) && Wt(e, "has", t), n;
}
function Rv(e) {
  return Wt(e, "iterate", we(e) ? "length" : Ir), Reflect.ownKeys(e);
}
const Lp = { get: Av, set: Nv, deleteProperty: Lv, has: Fv, ownKeys: Rv },
  Bv = {
    get: Ov,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Vv = vt({}, Lp, { get: kv, set: Iv }),
  hu = (e) => e,
  ra = (e) => Reflect.getPrototypeOf(e);
function Bi(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = Ve(e),
    i = Ve(t);
  n || (t !== i && Wt(o, "get", t), Wt(o, "get", i));
  const { has: l } = ra(o),
    a = r ? hu : n ? bu : li;
  if (l.call(o, t)) return a(e.get(t));
  if (l.call(o, i)) return a(e.get(i));
  e !== o && e.get(t);
}
function Vi(e, t = !1) {
  const n = this.__v_raw,
    r = Ve(n),
    o = Ve(e);
  return (
    t || (e !== o && Wt(r, "has", e), Wt(r, "has", o)),
    e === o ? n.has(e) : n.has(e) || n.has(o)
  );
}
function Di(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Wt(Ve(e), "iterate", Ir), Reflect.get(e, "size", e)
  );
}
function Lc(e) {
  e = Ve(e);
  const t = Ve(this);
  return ra(t).has.call(t, e) || (t.add(e), Wn(t, "add", e, e)), this;
}
function Fc(e, t) {
  t = Ve(t);
  const n = Ve(this),
    { has: r, get: o } = ra(n);
  let i = r.call(n, e);
  i || ((e = Ve(e)), (i = r.call(n, e)));
  const l = o.call(n, e);
  return (
    n.set(e, t), i ? ii(t, l) && Wn(n, "set", e, t) : Wn(n, "add", e, t), this
  );
}
function Rc(e) {
  const t = Ve(this),
    { has: n, get: r } = ra(t);
  let o = n.call(t, e);
  o || ((e = Ve(e)), (o = n.call(t, e))), r && r.call(t, e);
  const i = t.delete(e);
  return o && Wn(t, "delete", e, void 0), i;
}
function Bc() {
  const e = Ve(this),
    t = e.size !== 0,
    n = e.clear();
  return t && Wn(e, "clear", void 0, void 0), n;
}
function Hi(e, t) {
  return function (r, o) {
    const i = this,
      l = i.__v_raw,
      a = Ve(l),
      s = t ? hu : e ? bu : li;
    return (
      !e && Wt(a, "iterate", Ir), l.forEach((u, c) => r.call(o, s(u), s(c), i))
    );
  };
}
function zi(e, t, n) {
  return function (...r) {
    const o = this.__v_raw,
      i = Ve(o),
      l = ao(i),
      a = e === "entries" || (e === Symbol.iterator && l),
      s = e === "keys" && l,
      u = o[e](...r),
      c = n ? hu : t ? bu : li;
    return (
      !t && Wt(i, "iterate", s ? ls : Ir),
      {
        next() {
          const { value: f, done: d } = u.next();
          return d
            ? { value: f, done: d }
            : { value: a ? [c(f[0]), c(f[1])] : c(f), done: d };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Jn(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Dv() {
  const e = {
      get(i) {
        return Bi(this, i);
      },
      get size() {
        return Di(this);
      },
      has: Vi,
      add: Lc,
      set: Fc,
      delete: Rc,
      clear: Bc,
      forEach: Hi(!1, !1),
    },
    t = {
      get(i) {
        return Bi(this, i, !1, !0);
      },
      get size() {
        return Di(this);
      },
      has: Vi,
      add: Lc,
      set: Fc,
      delete: Rc,
      clear: Bc,
      forEach: Hi(!1, !0),
    },
    n = {
      get(i) {
        return Bi(this, i, !0);
      },
      get size() {
        return Di(this, !0);
      },
      has(i) {
        return Vi.call(this, i, !0);
      },
      add: Jn("add"),
      set: Jn("set"),
      delete: Jn("delete"),
      clear: Jn("clear"),
      forEach: Hi(!0, !1),
    },
    r = {
      get(i) {
        return Bi(this, i, !0, !0);
      },
      get size() {
        return Di(this, !0);
      },
      has(i) {
        return Vi.call(this, i, !0);
      },
      add: Jn("add"),
      set: Jn("set"),
      delete: Jn("delete"),
      clear: Jn("clear"),
      forEach: Hi(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
      (e[i] = zi(i, !1, !1)),
        (n[i] = zi(i, !0, !1)),
        (t[i] = zi(i, !1, !0)),
        (r[i] = zi(i, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Hv, zv, Wv, jv] = Dv();
function mu(e, t) {
  const n = t ? (e ? jv : Wv) : e ? zv : Hv;
  return (r, o, i) =>
    o === "__v_isReactive"
      ? !e
      : o === "__v_isReadonly"
      ? e
      : o === "__v_raw"
      ? r
      : Reflect.get(Re(n, o) && o in r ? n : r, o, i);
}
const Kv = { get: mu(!1, !1) },
  qv = { get: mu(!1, !0) },
  Uv = { get: mu(!0, !1) },
  Fp = new WeakMap(),
  Rp = new WeakMap(),
  Bp = new WeakMap(),
  Yv = new WeakMap();
function Xv(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Gv(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Xv(ul(e));
}
function Et(e) {
  return mo(e) ? e : vu(e, !1, Lp, Kv, Fp);
}
function Jv(e) {
  return vu(e, !1, Vv, qv, Rp);
}
function gu(e) {
  return vu(e, !0, Bv, Uv, Bp);
}
function vu(e, t, n, r, o) {
  if (!We(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = o.get(e);
  if (i) return i;
  const l = Gv(e);
  if (l === 0) return e;
  const a = new Proxy(e, l === 2 ? r : n);
  return o.set(e, a), a;
}
function so(e) {
  return mo(e) ? so(e.__v_raw) : !!(e && e.__v_isReactive);
}
function mo(e) {
  return !!(e && e.__v_isReadonly);
}
function Ol(e) {
  return !!(e && e.__v_isShallow);
}
function Vp(e) {
  return so(e) || mo(e);
}
function Ve(e) {
  const t = e && e.__v_raw;
  return t ? Ve(t) : e;
}
function Dp(e) {
  return Al(e, "__v_skip", !0), e;
}
const li = (e) => (We(e) ? Et(e) : e),
  bu = (e) => (We(e) ? gu(e) : e);
function Hp(e) {
  ur && ln && ((e = Ve(e)), Pp(e.dep || (e.dep = fu())));
}
function yu(e, t) {
  (e = Ve(e)), e.dep && as(e.dep);
}
function Qe(e) {
  return !!(e && e.__v_isRef === !0);
}
function B(e) {
  return zp(e, !1);
}
function uo(e) {
  return zp(e, !0);
}
function zp(e, t) {
  return Qe(e) ? e : new Zv(e, t);
}
class Zv {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : Ve(t)),
      (this._value = n ? t : li(t));
  }
  get value() {
    return Hp(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Ol(t) || mo(t);
    (t = n ? t : Ve(t)),
      ii(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : li(t)), yu(this));
  }
}
function Ro(e) {
  yu(e);
}
function m(e) {
  return Qe(e) ? e.value : e;
}
const Qv = {
  get: (e, t, n) => m(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return Qe(o) && !Qe(n) ? ((o.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function Wp(e) {
  return so(e) ? e : new Proxy(e, Qv);
}
function Xt(e) {
  const t = we(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = $n(e, n);
  return t;
}
class e0 {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function $n(e, t, n) {
  const r = e[t];
  return Qe(r) ? r : new e0(e, t, n);
}
var jp;
class t0 {
  constructor(t, n, r, o) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[jp] = !1),
      (this._dirty = !0),
      (this.effect = new du(t, () => {
        this._dirty || ((this._dirty = !0), yu(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !o),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = Ve(this);
    return (
      Hp(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
jp = "__v_isReadonly";
function n0(e, t, n = !1) {
  let r, o;
  const i = Te(e);
  return (
    i ? ((r = e), (o = St)) : ((r = e.get), (o = e.set)),
    new t0(r, o, i || !o, n)
  );
}
const Yo = [];
function r0(e, ...t) {
  Kr();
  const n = Yo.length ? Yo[Yo.length - 1].component : null,
    r = n && n.appContext.config.warnHandler,
    o = o0();
  if (r)
    Dn(r, n, 11, [
      e + t.join(""),
      n && n.proxy,
      o.map(({ vnode: i }) => `at <${bh(n, i.type)}>`).join(`
`),
      o,
    ]);
  else {
    const i = [`[Vue warn]: ${e}`, ...t];
    o.length &&
      i.push(
        `
`,
        ...i0(o)
      ),
      console.warn(...i);
  }
  qr();
}
function o0() {
  let e = Yo[Yo.length - 1];
  if (!e) return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e
      ? n.recurseCount++
      : t.push({ vnode: e, recurseCount: 0 });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function i0(e) {
  const t = [];
  return (
    e.forEach((n, r) => {
      t.push(
        ...(r === 0
          ? []
          : [
              `
`,
            ]),
        ...l0(n)
      );
    }),
    t
  );
}
function l0({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "",
    r = e.component ? e.component.parent == null : !1,
    o = ` at <${bh(e.component, e.type, r)}`,
    i = ">" + n;
  return e.props ? [o, ...a0(e.props), i] : [o + i];
}
function a0(e) {
  const t = [],
    n = Object.keys(e);
  return (
    n.slice(0, 3).forEach((r) => {
      t.push(...Kp(r, e[r]));
    }),
    n.length > 3 && t.push(" ..."),
    t
  );
}
function Kp(e, t, n) {
  return Be(t)
    ? ((t = JSON.stringify(t)), n ? t : [`${e}=${t}`])
    : typeof t == "number" || typeof t == "boolean" || t == null
    ? n
      ? t
      : [`${e}=${t}`]
    : Qe(t)
    ? ((t = Kp(e, Ve(t.value), !0)), n ? t : [`${e}=Ref<`, t, ">"])
    : Te(t)
    ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`]
    : ((t = Ve(t)), n ? t : [`${e}=`, t]);
}
function Dn(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (i) {
    oa(i, t, n);
  }
  return o;
}
function Ut(e, t, n, r) {
  if (Te(e)) {
    const i = Dn(e, t, n, r);
    return (
      i &&
        Ml(i) &&
        i.catch((l) => {
          oa(l, t, n);
        }),
      i
    );
  }
  const o = [];
  for (let i = 0; i < e.length; i++) o.push(Ut(e[i], t, n, r));
  return o;
}
function oa(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const l = t.proxy,
      a = n;
    for (; i; ) {
      const u = i.ec;
      if (u) {
        for (let c = 0; c < u.length; c++) if (u[c](e, l, a) === !1) return;
      }
      i = i.parent;
    }
    const s = t.appContext.config.errorHandler;
    if (s) {
      Dn(s, null, 10, [e, l, a]);
      return;
    }
  }
  s0(e, n, o, r);
}
function s0(e, t, n, r = !0) {
  console.error(e);
}
let ai = !1,
  ss = !1;
const xt = [];
let wn = 0;
const co = [];
let Bn = null,
  Sr = 0;
const qp = Promise.resolve();
let wu = null;
function Le(e) {
  const t = wu || qp;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function u0(e) {
  let t = wn + 1,
    n = xt.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    si(xt[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function _u(e) {
  (!xt.length || !xt.includes(e, ai && e.allowRecurse ? wn + 1 : wn)) &&
    (e.id == null ? xt.push(e) : xt.splice(u0(e.id), 0, e), Up());
}
function Up() {
  !ai && !ss && ((ss = !0), (wu = qp.then(Xp)));
}
function c0(e) {
  const t = xt.indexOf(e);
  t > wn && xt.splice(t, 1);
}
function f0(e) {
  we(e)
    ? co.push(...e)
    : (!Bn || !Bn.includes(e, e.allowRecurse ? Sr + 1 : Sr)) && co.push(e),
    Up();
}
function Vc(e, t = ai ? wn + 1 : 0) {
  for (; t < xt.length; t++) {
    const n = xt[t];
    n && n.pre && (xt.splice(t, 1), t--, n());
  }
}
function Yp(e) {
  if (co.length) {
    const t = [...new Set(co)];
    if (((co.length = 0), Bn)) {
      Bn.push(...t);
      return;
    }
    for (Bn = t, Bn.sort((n, r) => si(n) - si(r)), Sr = 0; Sr < Bn.length; Sr++)
      Bn[Sr]();
    (Bn = null), (Sr = 0);
  }
}
const si = (e) => (e.id == null ? 1 / 0 : e.id),
  d0 = (e, t) => {
    const n = si(e) - si(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Xp(e) {
  (ss = !1), (ai = !0), xt.sort(d0);
  const t = St;
  try {
    for (wn = 0; wn < xt.length; wn++) {
      const n = xt[wn];
      n && n.active !== !1 && Dn(n, null, 14);
    }
  } finally {
    (wn = 0),
      (xt.length = 0),
      Yp(),
      (ai = !1),
      (wu = null),
      (xt.length || co.length) && Xp();
  }
}
function p0(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || Ze;
  let o = n;
  const i = t.startsWith("update:"),
    l = i && t.slice(7);
  if (l && l in r) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`,
      { number: f, trim: d } = r[c] || Ze;
    d && (o = n.map((h) => h.trim())), f && (o = n.map(kl));
  }
  let a,
    s = r[(a = Ma(t))] || r[(a = Ma(un(t)))];
  !s && i && (s = r[(a = Ma(pr(t)))]), s && Ut(s, e, 6, o);
  const u = r[a + "Once"];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), Ut(u, e, 6, o);
  }
}
function Gp(e, t, n = !1) {
  const r = t.emitsCache,
    o = r.get(e);
  if (o !== void 0) return o;
  const i = e.emits;
  let l = {},
    a = !1;
  if (!Te(e)) {
    const s = (u) => {
      const c = Gp(u, t, !0);
      c && ((a = !0), vt(l, c));
    };
    !n && t.mixins.length && t.mixins.forEach(s),
      e.extends && s(e.extends),
      e.mixins && e.mixins.forEach(s);
  }
  return !i && !a
    ? (We(e) && r.set(e, null), null)
    : (we(i) ? i.forEach((s) => (l[s] = null)) : vt(l, i),
      We(e) && r.set(e, l),
      l);
}
function ia(e, t) {
  return !e || !Ql(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      Re(e, t[0].toLowerCase() + t.slice(1)) || Re(e, pr(t)) || Re(e, t));
}
let Ct = null,
  la = null;
function Pl(e) {
  const t = Ct;
  return (Ct = e), (la = (e && e.type.__scopeId) || null), t;
}
function xu(e) {
  la = e;
}
function Cu() {
  la = null;
}
function re(e, t = Ct, n) {
  if (!t || e._n) return e;
  const r = (...o) => {
    r._d && Jc(-1);
    const i = Pl(t);
    let l;
    try {
      l = e(...o);
    } finally {
      Pl(i), r._d && Jc(1);
    }
    return l;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Aa(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: o,
    props: i,
    propsOptions: [l],
    slots: a,
    attrs: s,
    emit: u,
    render: c,
    renderCache: f,
    data: d,
    setupState: h,
    ctx: p,
    inheritAttrs: b,
  } = e;
  let v, _;
  const x = Pl(e);
  try {
    if (n.shapeFlag & 4) {
      const y = o || r;
      (v = yn(c.call(y, y, f, i, h, d, p))), (_ = s);
    } else {
      const y = t;
      (v = yn(
        y.length > 1 ? y(i, { attrs: s, slots: a, emit: u }) : y(i, null)
      )),
        (_ = t.props ? s : h0(s));
    }
  } catch (y) {
    (Zo.length = 0), oa(y, e, 1), (v = oe(Nt));
  }
  let g = v;
  if (_ && b !== !1) {
    const y = Object.keys(_),
      { shapeFlag: w } = g;
    y.length && w & 7 && (l && y.some(su) && (_ = m0(_, l)), (g = jn(g, _)));
  }
  return (
    n.dirs && ((g = jn(g)), (g.dirs = g.dirs ? g.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (g.transition = n.transition),
    (v = g),
    Pl(x),
    v
  );
}
const h0 = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Ql(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  m0 = (e, t) => {
    const n = {};
    for (const r in e) (!su(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function g0(e, t, n) {
  const { props: r, children: o, component: i } = e,
    { props: l, children: a, patchFlag: s } = t,
    u = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && s >= 0) {
    if (s & 1024) return !0;
    if (s & 16) return r ? Dc(r, l, u) : !!l;
    if (s & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const d = c[f];
        if (l[d] !== r[d] && !ia(u, d)) return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable)
      ? !0
      : r === l
      ? !1
      : r
      ? l
        ? Dc(r, l, u)
        : !0
      : !!l;
  return !1;
}
function Dc(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let o = 0; o < r.length; o++) {
    const i = r[o];
    if (t[i] !== e[i] && !ia(n, i)) return !0;
  }
  return !1;
}
function v0({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const b0 = (e) => e.__isSuspense;
function y0(e, t) {
  t && t.pendingBranch
    ? we(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : f0(e);
}
function dt(e, t) {
  if (ft) {
    let n = ft.provides;
    const r = ft.parent && ft.parent.provides;
    r === n && (n = ft.provides = Object.create(r)), (n[e] = t);
  }
}
function Ie(e, t, n = !1) {
  const r = ft || Ct;
  if (r) {
    const o =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (o && e in o) return o[e];
    if (arguments.length > 1) return n && Te(t) ? t.call(r.proxy) : t;
  }
}
function Xo(e, t) {
  return Su(e, null, t);
}
const Hc = {};
function me(e, t, n) {
  return Su(e, t, n);
}
function Su(
  e,
  t,
  { immediate: n, deep: r, flush: o, onTrack: i, onTrigger: l } = Ze
) {
  const a = ft;
  let s,
    u = !1,
    c = !1;
  if (
    (Qe(e)
      ? ((s = () => e.value), (u = Ol(e)))
      : so(e)
      ? ((s = () => e), (r = !0))
      : we(e)
      ? ((c = !0),
        (u = e.some((_) => so(_) || Ol(_))),
        (s = () =>
          e.map((_) => {
            if (Qe(_)) return _.value;
            if (so(_)) return Ar(_);
            if (Te(_)) return Dn(_, a, 2);
          })))
      : Te(e)
      ? t
        ? (s = () => Dn(e, a, 2))
        : (s = () => {
            if (!(a && a.isUnmounted)) return f && f(), Ut(e, a, 3, [d]);
          })
      : (s = St),
    t && r)
  ) {
    const _ = s;
    s = () => Ar(_());
  }
  let f,
    d = (_) => {
      f = v.onStop = () => {
        Dn(_, a, 4);
      };
    };
  if (ci)
    return (d = St), t ? n && Ut(t, a, 3, [s(), c ? [] : void 0, d]) : s(), St;
  let h = c ? [] : Hc;
  const p = () => {
    if (!!v.active)
      if (t) {
        const _ = v.run();
        (r || u || (c ? _.some((x, g) => ii(x, h[g])) : ii(_, h))) &&
          (f && f(), Ut(t, a, 3, [_, h === Hc ? void 0 : h, d]), (h = _));
      } else v.run();
  };
  p.allowRecurse = !!t;
  let b;
  o === "sync"
    ? (b = p)
    : o === "post"
    ? (b = () => Ot(p, a && a.suspense))
    : ((p.pre = !0), a && (p.id = a.uid), (b = () => _u(p)));
  const v = new du(s, b);
  return (
    t
      ? n
        ? p()
        : (h = v.run())
      : o === "post"
      ? Ot(v.run.bind(v), a && a.suspense)
      : v.run(),
    () => {
      v.stop(), a && a.scope && uu(a.scope.effects, v);
    }
  );
}
function w0(e, t, n) {
  const r = this.proxy,
    o = Be(e) ? (e.includes(".") ? Jp(r, e) : () => r[e]) : e.bind(r, r);
  let i;
  Te(t) ? (i = t) : ((i = t.handler), (n = t));
  const l = ft;
  go(this);
  const a = Su(o, i.bind(r), n);
  return l ? go(l) : Fr(), a;
}
function Jp(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++) r = r[n[o]];
    return r;
  };
}
function Ar(e, t) {
  if (!We(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), Qe(e))) Ar(e.value, t);
  else if (we(e)) for (let n = 0; n < e.length; n++) Ar(e[n], t);
  else if (ea(e) || ao(e))
    e.forEach((n) => {
      Ar(n, t);
    });
  else if (Mp(e)) for (const n in e) Ar(e[n], t);
  return e;
}
function _0() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    rt(() => {
      e.isMounted = !0;
    }),
    Bt(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const qt = [Function, Array],
  x0 = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: qt,
      onEnter: qt,
      onAfterEnter: qt,
      onEnterCancelled: qt,
      onBeforeLeave: qt,
      onLeave: qt,
      onAfterLeave: qt,
      onLeaveCancelled: qt,
      onBeforeAppear: qt,
      onAppear: qt,
      onAfterAppear: qt,
      onAppearCancelled: qt,
    },
    setup(e, { slots: t }) {
      const n = et(),
        r = _0();
      let o;
      return () => {
        const i = t.default && eh(t.default(), !0);
        if (!i || !i.length) return;
        let l = i[0];
        if (i.length > 1) {
          for (const b of i)
            if (b.type !== Nt) {
              l = b;
              break;
            }
        }
        const a = Ve(e),
          { mode: s } = a;
        if (r.isLeaving) return ka(l);
        const u = zc(l);
        if (!u) return ka(l);
        const c = us(u, a, r, n);
        cs(u, c);
        const f = n.subTree,
          d = f && zc(f);
        let h = !1;
        const { getTransitionKey: p } = u.type;
        if (p) {
          const b = p();
          o === void 0 ? (o = b) : b !== o && ((o = b), (h = !0));
        }
        if (d && d.type !== Nt && (!Er(u, d) || h)) {
          const b = us(d, a, r, n);
          if ((cs(d, b), s === "out-in"))
            return (
              (r.isLeaving = !0),
              (b.afterLeave = () => {
                (r.isLeaving = !1), n.update();
              }),
              ka(l)
            );
          s === "in-out" &&
            u.type !== Nt &&
            (b.delayLeave = (v, _, x) => {
              const g = Qp(r, d);
              (g[String(d.key)] = d),
                (v._leaveCb = () => {
                  _(), (v._leaveCb = void 0), delete c.delayedLeave;
                }),
                (c.delayedLeave = x);
            });
        }
        return l;
      };
    },
  },
  Zp = x0;
function Qp(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function us(e, t, n, r) {
  const {
      appear: o,
      mode: i,
      persisted: l = !1,
      onBeforeEnter: a,
      onEnter: s,
      onAfterEnter: u,
      onEnterCancelled: c,
      onBeforeLeave: f,
      onLeave: d,
      onAfterLeave: h,
      onLeaveCancelled: p,
      onBeforeAppear: b,
      onAppear: v,
      onAfterAppear: _,
      onAppearCancelled: x,
    } = t,
    g = String(e.key),
    y = Qp(n, e),
    w = ($, I) => {
      $ && Ut($, r, 9, I);
    },
    C = ($, I) => {
      const D = I[1];
      w($, I),
        we($) ? $.every((P) => P.length <= 1) && D() : $.length <= 1 && D();
    },
    E = {
      mode: i,
      persisted: l,
      beforeEnter($) {
        let I = a;
        if (!n.isMounted)
          if (o) I = b || a;
          else return;
        $._leaveCb && $._leaveCb(!0);
        const D = y[g];
        D && Er(e, D) && D.el._leaveCb && D.el._leaveCb(), w(I, [$]);
      },
      enter($) {
        let I = s,
          D = u,
          P = c;
        if (!n.isMounted)
          if (o) (I = v || s), (D = _ || u), (P = x || c);
          else return;
        let O = !1;
        const S = ($._enterCb = (N) => {
          O ||
            ((O = !0),
            N ? w(P, [$]) : w(D, [$]),
            E.delayedLeave && E.delayedLeave(),
            ($._enterCb = void 0));
        });
        I ? C(I, [$, S]) : S();
      },
      leave($, I) {
        const D = String(e.key);
        if (($._enterCb && $._enterCb(!0), n.isUnmounting)) return I();
        w(f, [$]);
        let P = !1;
        const O = ($._leaveCb = (S) => {
          P ||
            ((P = !0),
            I(),
            S ? w(p, [$]) : w(h, [$]),
            ($._leaveCb = void 0),
            y[D] === e && delete y[D]);
        });
        (y[D] = e), d ? C(d, [$, O]) : O();
      },
      clone($) {
        return us($, t, n, r);
      },
    };
  return E;
}
function ka(e) {
  if (aa(e)) return (e = jn(e)), (e.children = null), e;
}
function zc(e) {
  return aa(e) ? (e.children ? e.children[0] : void 0) : e;
}
function cs(e, t) {
  e.shapeFlag & 6 && e.component
    ? cs(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function eh(e, t = !1, n) {
  let r = [],
    o = 0;
  for (let i = 0; i < e.length; i++) {
    let l = e[i];
    const a = n == null ? l.key : String(n) + String(l.key != null ? l.key : i);
    l.type === Ue
      ? (l.patchFlag & 128 && o++, (r = r.concat(eh(l.children, t, a))))
      : (t || l.type !== Nt) && r.push(a != null ? jn(l, { key: a }) : l);
  }
  if (o > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
  return r;
}
function se(e) {
  return Te(e) ? { setup: e, name: e.name } : e;
}
const Go = (e) => !!e.type.__asyncLoader,
  aa = (e) => e.type.__isKeepAlive;
function C0(e, t) {
  nh(e, "a", t);
}
function th(e, t) {
  nh(e, "da", t);
}
function nh(e, t, n = ft) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let o = n;
      for (; o; ) {
        if (o.isDeactivated) return;
        o = o.parent;
      }
      return e();
    });
  if ((sa(t, r, n), n)) {
    let o = n.parent;
    for (; o && o.parent; )
      aa(o.parent.vnode) && S0(r, t, n, o), (o = o.parent);
  }
}
function S0(e, t, n, r) {
  const o = sa(t, e, r, !0);
  $i(() => {
    uu(r[t], o);
  }, n);
}
function sa(e, t, n = ft, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...l) => {
          if (n.isUnmounted) return;
          Kr(), go(n);
          const a = Ut(t, n, e, l);
          return Fr(), qr(), a;
        });
    return r ? o.unshift(i) : o.push(i), i;
  }
}
const Yn =
    (e) =>
    (t, n = ft) =>
      (!ci || e === "sp") && sa(e, (...r) => t(...r), n),
  ua = Yn("bm"),
  rt = Yn("m"),
  E0 = Yn("bu"),
  Ti = Yn("u"),
  Bt = Yn("bum"),
  $i = Yn("um"),
  T0 = Yn("sp"),
  $0 = Yn("rtg"),
  M0 = Yn("rtc");
function A0(e, t = ft) {
  sa("ec", e, t);
}
function ot(e, t) {
  const n = Ct;
  if (n === null) return e;
  const r = fa(n) || n.proxy,
    o = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [l, a, s, u = Ze] = t[i];
    Te(l) && (l = { mounted: l, updated: l }),
      l.deep && Ar(a),
      o.push({
        dir: l,
        instance: r,
        value: a,
        oldValue: void 0,
        arg: s,
        modifiers: u,
      });
  }
  return e;
}
function vr(e, t, n, r) {
  const o = e.dirs,
    i = t && t.dirs;
  for (let l = 0; l < o.length; l++) {
    const a = o[l];
    i && (a.oldValue = i[l].value);
    let s = a.dir[r];
    s && (Kr(), Ut(s, n, 8, [e.el, a, e, t]), qr());
  }
}
const Eu = "components",
  k0 = "directives";
function ut(e, t) {
  return $u(Eu, e, !0, t) || e;
}
const rh = Symbol();
function mt(e) {
  return Be(e) ? $u(Eu, e, !1) || e : e || rh;
}
function Tu(e) {
  return $u(k0, e);
}
function $u(e, t, n = !0, r = !1) {
  const o = Ct || ft;
  if (o) {
    const i = o.type;
    if (e === Eu) {
      const a = vh(i, !1);
      if (a && (a === t || a === un(t) || a === na(un(t)))) return i;
    }
    const l = Wc(o[e] || i[e], t) || Wc(o.appContext[e], t);
    return !l && r ? i : l;
  }
}
function Wc(e, t) {
  return e && (e[t] || e[un(t)] || e[na(un(t))]);
}
function Cn(e, t, n, r) {
  let o;
  const i = n && n[r];
  if (we(e) || Be(e)) {
    o = new Array(e.length);
    for (let l = 0, a = e.length; l < a; l++)
      o[l] = t(e[l], l, void 0, i && i[l]);
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++) o[l] = t(l + 1, l, void 0, i && i[l]);
  } else if (We(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (l, a) => t(l, a, void 0, i && i[a]));
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let a = 0, s = l.length; a < s; a++) {
        const u = l[a];
        o[a] = t(e[u], u, a, i && i[a]);
      }
    }
  else o = [];
  return n && (n[r] = o), o;
}
function O0(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n];
    if (we(r)) for (let o = 0; o < r.length; o++) e[r[o].name] = r[o].fn;
    else
      r &&
        (e[r.name] = r.key
          ? (...o) => {
              const i = r.fn(...o);
              return i && (i.key = r.key), i;
            }
          : r.fn);
  }
  return e;
}
function Oe(e, t, n = {}, r, o) {
  if (Ct.isCE || (Ct.parent && Go(Ct.parent) && Ct.parent.isCE))
    return oe("slot", t === "default" ? null : { name: t }, r && r());
  let i = e[t];
  i && i._c && (i._d = !1), L();
  const l = i && oh(i(n)),
    a = he(
      Ue,
      { key: n.key || (l && l.key) || `_${t}` },
      l || (r ? r() : []),
      l && e._ === 1 ? 64 : -2
    );
  return (
    !o && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]),
    i && i._c && (i._d = !0),
    a
  );
}
function oh(e) {
  return e.some((t) =>
    Ll(t) ? !(t.type === Nt || (t.type === Ue && !oh(t.children))) : !0
  )
    ? e
    : null;
}
const fs = (e) => (e ? (hh(e) ? fa(e) || e.proxy : fs(e.parent)) : null),
  Nl = vt(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => fs(e.parent),
    $root: (e) => fs(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Mu(e),
    $forceUpdate: (e) => e.f || (e.f = () => _u(e.update)),
    $nextTick: (e) => e.n || (e.n = Le.bind(e.proxy)),
    $watch: (e) => w0.bind(e),
  }),
  P0 = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: o,
        props: i,
        accessCache: l,
        type: a,
        appContext: s,
      } = e;
      let u;
      if (t[0] !== "$") {
        const h = l[t];
        if (h !== void 0)
          switch (h) {
            case 1:
              return r[t];
            case 2:
              return o[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (r !== Ze && Re(r, t)) return (l[t] = 1), r[t];
          if (o !== Ze && Re(o, t)) return (l[t] = 2), o[t];
          if ((u = e.propsOptions[0]) && Re(u, t)) return (l[t] = 3), i[t];
          if (n !== Ze && Re(n, t)) return (l[t] = 4), n[t];
          ds && (l[t] = 0);
        }
      }
      const c = Nl[t];
      let f, d;
      if (c) return t === "$attrs" && Wt(e, "get", t), c(e);
      if ((f = a.__cssModules) && (f = f[t])) return f;
      if (n !== Ze && Re(n, t)) return (l[t] = 4), n[t];
      if (((d = s.config.globalProperties), Re(d, t))) return d[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: o, ctx: i } = e;
      return o !== Ze && Re(o, t)
        ? ((o[t] = n), !0)
        : r !== Ze && Re(r, t)
        ? ((r[t] = n), !0)
        : Re(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((i[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: o,
          propsOptions: i,
        },
      },
      l
    ) {
      let a;
      return (
        !!n[l] ||
        (e !== Ze && Re(e, l)) ||
        (t !== Ze && Re(t, l)) ||
        ((a = i[0]) && Re(a, l)) ||
        Re(r, l) ||
        Re(Nl, l) ||
        Re(o.config.globalProperties, l)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : Re(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let ds = !0;
function N0(e) {
  const t = Mu(e),
    n = e.proxy,
    r = e.ctx;
  (ds = !1), t.beforeCreate && jc(t.beforeCreate, e, "bc");
  const {
    data: o,
    computed: i,
    methods: l,
    watch: a,
    provide: s,
    inject: u,
    created: c,
    beforeMount: f,
    mounted: d,
    beforeUpdate: h,
    updated: p,
    activated: b,
    deactivated: v,
    beforeDestroy: _,
    beforeUnmount: x,
    destroyed: g,
    unmounted: y,
    render: w,
    renderTracked: C,
    renderTriggered: E,
    errorCaptured: $,
    serverPrefetch: I,
    expose: D,
    inheritAttrs: P,
    components: O,
    directives: S,
    filters: N,
  } = t;
  if ((u && I0(u, r, null, e.appContext.config.unwrapInjectedRef), l))
    for (const q in l) {
      const V = l[q];
      Te(V) && (r[q] = V.bind(n));
    }
  if (o) {
    const q = o.call(n, n);
    We(q) && (e.data = Et(q));
  }
  if (((ds = !0), i))
    for (const q in i) {
      const V = i[q],
        R = Te(V) ? V.bind(n, n) : Te(V.get) ? V.get.bind(n, n) : St,
        ne = !Te(V) && Te(V.set) ? V.set.bind(n) : St,
        ie = A({ get: R, set: ne });
      Object.defineProperty(r, q, {
        enumerable: !0,
        configurable: !0,
        get: () => ie.value,
        set: (J) => (ie.value = J),
      });
    }
  if (a) for (const q in a) ih(a[q], r, n, q);
  if (s) {
    const q = Te(s) ? s.call(n) : s;
    Reflect.ownKeys(q).forEach((V) => {
      dt(V, q[V]);
    });
  }
  c && jc(c, e, "c");
  function K(q, V) {
    we(V) ? V.forEach((R) => q(R.bind(n))) : V && q(V.bind(n));
  }
  if (
    (K(ua, f),
    K(rt, d),
    K(E0, h),
    K(Ti, p),
    K(C0, b),
    K(th, v),
    K(A0, $),
    K(M0, C),
    K($0, E),
    K(Bt, x),
    K($i, y),
    K(T0, I),
    we(D))
  )
    if (D.length) {
      const q = e.exposed || (e.exposed = {});
      D.forEach((V) => {
        Object.defineProperty(q, V, {
          get: () => n[V],
          set: (R) => (n[V] = R),
        });
      });
    } else e.exposed || (e.exposed = {});
  w && e.render === St && (e.render = w),
    P != null && (e.inheritAttrs = P),
    O && (e.components = O),
    S && (e.directives = S);
}
function I0(e, t, n = St, r = !1) {
  we(e) && (e = ps(e));
  for (const o in e) {
    const i = e[o];
    let l;
    We(i)
      ? "default" in i
        ? (l = Ie(i.from || o, i.default, !0))
        : (l = Ie(i.from || o))
      : (l = Ie(i)),
      Qe(l) && r
        ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: () => l.value,
            set: (a) => (l.value = a),
          })
        : (t[o] = l);
  }
}
function jc(e, t, n) {
  Ut(we(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ih(e, t, n, r) {
  const o = r.includes(".") ? Jp(n, r) : () => n[r];
  if (Be(e)) {
    const i = t[e];
    Te(i) && me(o, i);
  } else if (Te(e)) me(o, e.bind(n));
  else if (We(e))
    if (we(e)) e.forEach((i) => ih(i, t, n, r));
    else {
      const i = Te(e.handler) ? e.handler.bind(n) : t[e.handler];
      Te(i) && me(o, i, e);
    }
}
function Mu(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: o,
      optionsCache: i,
      config: { optionMergeStrategies: l },
    } = e.appContext,
    a = i.get(t);
  let s;
  return (
    a
      ? (s = a)
      : !o.length && !n && !r
      ? (s = t)
      : ((s = {}), o.length && o.forEach((u) => Il(s, u, l, !0)), Il(s, t, l)),
    We(t) && i.set(t, s),
    s
  );
}
function Il(e, t, n, r = !1) {
  const { mixins: o, extends: i } = t;
  i && Il(e, i, n, !0), o && o.forEach((l) => Il(e, l, n, !0));
  for (const l in t)
    if (!(r && l === "expose")) {
      const a = L0[l] || (n && n[l]);
      e[l] = a ? a(e[l], t[l]) : t[l];
    }
  return e;
}
const L0 = {
  data: Kc,
  props: xr,
  emits: xr,
  methods: xr,
  computed: xr,
  beforeCreate: Tt,
  created: Tt,
  beforeMount: Tt,
  mounted: Tt,
  beforeUpdate: Tt,
  updated: Tt,
  beforeDestroy: Tt,
  beforeUnmount: Tt,
  destroyed: Tt,
  unmounted: Tt,
  activated: Tt,
  deactivated: Tt,
  errorCaptured: Tt,
  serverPrefetch: Tt,
  components: xr,
  directives: xr,
  watch: R0,
  provide: Kc,
  inject: F0,
};
function Kc(e, t) {
  return t
    ? e
      ? function () {
          return vt(
            Te(e) ? e.call(this, this) : e,
            Te(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function F0(e, t) {
  return xr(ps(e), ps(t));
}
function ps(e) {
  if (we(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Tt(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function xr(e, t) {
  return e ? vt(vt(Object.create(null), e), t) : t;
}
function R0(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = vt(Object.create(null), e);
  for (const r in t) n[r] = Tt(e[r], t[r]);
  return n;
}
function B0(e, t, n, r = !1) {
  const o = {},
    i = {};
  Al(i, ca, 1), (e.propsDefaults = Object.create(null)), lh(e, t, o, i);
  for (const l in e.propsOptions[0]) l in o || (o[l] = void 0);
  n ? (e.props = r ? o : Jv(o)) : e.type.props ? (e.props = o) : (e.props = i),
    (e.attrs = i);
}
function V0(e, t, n, r) {
  const {
      props: o,
      attrs: i,
      vnode: { patchFlag: l },
    } = e,
    a = Ve(o),
    [s] = e.propsOptions;
  let u = !1;
  if ((r || l > 0) && !(l & 16)) {
    if (l & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let d = c[f];
        if (ia(e.emitsOptions, d)) continue;
        const h = t[d];
        if (s)
          if (Re(i, d)) h !== i[d] && ((i[d] = h), (u = !0));
          else {
            const p = un(d);
            o[p] = hs(s, a, p, h, e, !1);
          }
        else h !== i[d] && ((i[d] = h), (u = !0));
      }
    }
  } else {
    lh(e, t, o, i) && (u = !0);
    let c;
    for (const f in a)
      (!t || (!Re(t, f) && ((c = pr(f)) === f || !Re(t, c)))) &&
        (s
          ? n &&
            (n[f] !== void 0 || n[c] !== void 0) &&
            (o[f] = hs(s, a, f, void 0, e, !0))
          : delete o[f]);
    if (i !== a)
      for (const f in i) (!t || (!Re(t, f) && !0)) && (delete i[f], (u = !0));
  }
  u && Wn(e, "set", "$attrs");
}
function lh(e, t, n, r) {
  const [o, i] = e.propsOptions;
  let l = !1,
    a;
  if (t)
    for (let s in t) {
      if (cl(s)) continue;
      const u = t[s];
      let c;
      o && Re(o, (c = un(s)))
        ? !i || !i.includes(c)
          ? (n[c] = u)
          : ((a || (a = {}))[c] = u)
        : ia(e.emitsOptions, s) ||
          ((!(s in r) || u !== r[s]) && ((r[s] = u), (l = !0)));
    }
  if (i) {
    const s = Ve(n),
      u = a || Ze;
    for (let c = 0; c < i.length; c++) {
      const f = i[c];
      n[f] = hs(o, s, f, u[f], e, !Re(u, f));
    }
  }
  return l;
}
function hs(e, t, n, r, o, i) {
  const l = e[n];
  if (l != null) {
    const a = Re(l, "default");
    if (a && r === void 0) {
      const s = l.default;
      if (l.type !== Function && Te(s)) {
        const { propsDefaults: u } = o;
        n in u ? (r = u[n]) : (go(o), (r = u[n] = s.call(null, t)), Fr());
      } else r = s;
    }
    l[0] &&
      (i && !a ? (r = !1) : l[1] && (r === "" || r === pr(n)) && (r = !0));
  }
  return r;
}
function ah(e, t, n = !1) {
  const r = t.propsCache,
    o = r.get(e);
  if (o) return o;
  const i = e.props,
    l = {},
    a = [];
  let s = !1;
  if (!Te(e)) {
    const c = (f) => {
      s = !0;
      const [d, h] = ah(f, t, !0);
      vt(l, d), h && a.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  if (!i && !s) return We(e) && r.set(e, lo), lo;
  if (we(i))
    for (let c = 0; c < i.length; c++) {
      const f = un(i[c]);
      qc(f) && (l[f] = Ze);
    }
  else if (i)
    for (const c in i) {
      const f = un(c);
      if (qc(f)) {
        const d = i[c],
          h = (l[f] = we(d) || Te(d) ? { type: d } : d);
        if (h) {
          const p = Xc(Boolean, h.type),
            b = Xc(String, h.type);
          (h[0] = p > -1),
            (h[1] = b < 0 || p < b),
            (p > -1 || Re(h, "default")) && a.push(f);
        }
      }
    }
  const u = [l, a];
  return We(e) && r.set(e, u), u;
}
function qc(e) {
  return e[0] !== "$";
}
function Uc(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Yc(e, t) {
  return Uc(e) === Uc(t);
}
function Xc(e, t) {
  return we(t) ? t.findIndex((n) => Yc(n, e)) : Te(t) && Yc(t, e) ? 0 : -1;
}
const sh = (e) => e[0] === "_" || e === "$stable",
  Au = (e) => (we(e) ? e.map(yn) : [yn(e)]),
  D0 = (e, t, n) => {
    if (t._n) return t;
    const r = re((...o) => Au(t(...o)), n);
    return (r._c = !1), r;
  },
  uh = (e, t, n) => {
    const r = e._ctx;
    for (const o in e) {
      if (sh(o)) continue;
      const i = e[o];
      if (Te(i)) t[o] = D0(o, i, r);
      else if (i != null) {
        const l = Au(i);
        t[o] = () => l;
      }
    }
  },
  ch = (e, t) => {
    const n = Au(t);
    e.slots.default = () => n;
  },
  H0 = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = Ve(t)), Al(t, "_", n)) : uh(t, (e.slots = {}));
    } else (e.slots = {}), t && ch(e, t);
    Al(e.slots, ca, 1);
  },
  z0 = (e, t, n) => {
    const { vnode: r, slots: o } = e;
    let i = !0,
      l = Ze;
    if (r.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (i = !1)
          : (vt(o, t), !n && a === 1 && delete o._)
        : ((i = !t.$stable), uh(t, o)),
        (l = t);
    } else t && (ch(e, t), (l = { default: 1 }));
    if (i) for (const a in o) !sh(a) && !(a in l) && delete o[a];
  };
function fh() {
  return {
    app: null,
    config: {
      isNativeTag: gv,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let W0 = 0;
function j0(e, t) {
  return function (r, o = null) {
    Te(r) || (r = Object.assign({}, r)), o != null && !We(o) && (o = null);
    const i = fh(),
      l = new Set();
    let a = !1;
    const s = (i.app = {
      _uid: W0++,
      _component: r,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: fb,
      get config() {
        return i.config;
      },
      set config(u) {},
      use(u, ...c) {
        return (
          l.has(u) ||
            (u && Te(u.install)
              ? (l.add(u), u.install(s, ...c))
              : Te(u) && (l.add(u), u(s, ...c))),
          s
        );
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), s;
      },
      component(u, c) {
        return c ? ((i.components[u] = c), s) : i.components[u];
      },
      directive(u, c) {
        return c ? ((i.directives[u] = c), s) : i.directives[u];
      },
      mount(u, c, f) {
        if (!a) {
          const d = oe(r, o);
          return (
            (d.appContext = i),
            c && t ? t(d, u) : e(d, u, f),
            (a = !0),
            (s._container = u),
            (u.__vue_app__ = s),
            fa(d.component) || d.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, s._container), delete s._container.__vue_app__);
      },
      provide(u, c) {
        return (i.provides[u] = c), s;
      },
    });
    return s;
  };
}
function ms(e, t, n, r, o = !1) {
  if (we(e)) {
    e.forEach((d, h) => ms(d, t && (we(t) ? t[h] : t), n, r, o));
    return;
  }
  if (Go(r) && !o) return;
  const i = r.shapeFlag & 4 ? fa(r.component) || r.component.proxy : r.el,
    l = o ? null : i,
    { i: a, r: s } = e,
    u = t && t.r,
    c = a.refs === Ze ? (a.refs = {}) : a.refs,
    f = a.setupState;
  if (
    (u != null &&
      u !== s &&
      (Be(u)
        ? ((c[u] = null), Re(f, u) && (f[u] = null))
        : Qe(u) && (u.value = null)),
    Te(s))
  )
    Dn(s, a, 12, [l, c]);
  else {
    const d = Be(s),
      h = Qe(s);
    if (d || h) {
      const p = () => {
        if (e.f) {
          const b = d ? (Re(f, s) ? f[s] : c[s]) : s.value;
          o
            ? we(b) && uu(b, i)
            : we(b)
            ? b.includes(i) || b.push(i)
            : d
            ? ((c[s] = [i]), Re(f, s) && (f[s] = c[s]))
            : ((s.value = [i]), e.k && (c[e.k] = s.value));
        } else
          d
            ? ((c[s] = l), Re(f, s) && (f[s] = l))
            : h && ((s.value = l), e.k && (c[e.k] = l));
      };
      l ? ((p.id = -1), Ot(p, n)) : p();
    }
  }
}
const Ot = y0;
function K0(e) {
  return q0(e);
}
function q0(e, t) {
  const n = _v();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: o,
      patchProp: i,
      createElement: l,
      createText: a,
      createComment: s,
      setText: u,
      setElementText: c,
      parentNode: f,
      nextSibling: d,
      setScopeId: h = St,
      insertStaticContent: p,
    } = e,
    b = (
      T,
      M,
      H,
      Y = null,
      U = null,
      z = null,
      ee = !1,
      Z = null,
      k = !!M.dynamicChildren
    ) => {
      if (T === M) return;
      T && !Er(T, M) && ((Y = Q(T)), J(T, U, z, !0), (T = null)),
        M.patchFlag === -2 && ((k = !1), (M.dynamicChildren = null));
      const { type: j, ref: de, shapeFlag: fe } = M;
      switch (j) {
        case Mi:
          v(T, M, H, Y);
          break;
        case Nt:
          _(T, M, H, Y);
          break;
        case Oa:
          T == null && x(M, H, Y, ee);
          break;
        case Ue:
          O(T, M, H, Y, U, z, ee, Z, k);
          break;
        default:
          fe & 1
            ? w(T, M, H, Y, U, z, ee, Z, k)
            : fe & 6
            ? S(T, M, H, Y, U, z, ee, Z, k)
            : (fe & 64 || fe & 128) &&
              j.process(T, M, H, Y, U, z, ee, Z, k, Me);
      }
      de != null && U && ms(de, T && T.ref, z, M || T, !M);
    },
    v = (T, M, H, Y) => {
      if (T == null) r((M.el = a(M.children)), H, Y);
      else {
        const U = (M.el = T.el);
        M.children !== T.children && u(U, M.children);
      }
    },
    _ = (T, M, H, Y) => {
      T == null ? r((M.el = s(M.children || "")), H, Y) : (M.el = T.el);
    },
    x = (T, M, H, Y) => {
      [T.el, T.anchor] = p(T.children, M, H, Y, T.el, T.anchor);
    },
    g = ({ el: T, anchor: M }, H, Y) => {
      let U;
      for (; T && T !== M; ) (U = d(T)), r(T, H, Y), (T = U);
      r(M, H, Y);
    },
    y = ({ el: T, anchor: M }) => {
      let H;
      for (; T && T !== M; ) (H = d(T)), o(T), (T = H);
      o(M);
    },
    w = (T, M, H, Y, U, z, ee, Z, k) => {
      (ee = ee || M.type === "svg"),
        T == null ? C(M, H, Y, U, z, ee, Z, k) : I(T, M, U, z, ee, Z, k);
    },
    C = (T, M, H, Y, U, z, ee, Z) => {
      let k, j;
      const {
        type: de,
        props: fe,
        shapeFlag: be,
        transition: Se,
        dirs: Pe,
      } = T;
      if (
        ((k = T.el = l(T.type, z, fe && fe.is, fe)),
        be & 8
          ? c(k, T.children)
          : be & 16 &&
            $(T.children, k, null, Y, U, z && de !== "foreignObject", ee, Z),
        Pe && vr(T, null, Y, "created"),
        fe)
      ) {
        for (const le in fe)
          le !== "value" &&
            !cl(le) &&
            i(k, le, null, fe[le], z, T.children, Y, U, ue);
        "value" in fe && i(k, "value", null, fe.value),
          (j = fe.onVnodeBeforeMount) && bn(j, Y, T);
      }
      E(k, T, T.scopeId, ee, Y), Pe && vr(T, null, Y, "beforeMount");
      const Ke = (!U || (U && !U.pendingBranch)) && Se && !Se.persisted;
      Ke && Se.beforeEnter(k),
        r(k, M, H),
        ((j = fe && fe.onVnodeMounted) || Ke || Pe) &&
          Ot(() => {
            j && bn(j, Y, T),
              Ke && Se.enter(k),
              Pe && vr(T, null, Y, "mounted");
          }, U);
    },
    E = (T, M, H, Y, U) => {
      if ((H && h(T, H), Y)) for (let z = 0; z < Y.length; z++) h(T, Y[z]);
      if (U) {
        let z = U.subTree;
        if (M === z) {
          const ee = U.vnode;
          E(T, ee, ee.scopeId, ee.slotScopeIds, U.parent);
        }
      }
    },
    $ = (T, M, H, Y, U, z, ee, Z, k = 0) => {
      for (let j = k; j < T.length; j++) {
        const de = (T[j] = Z ? or(T[j]) : yn(T[j]));
        b(null, de, M, H, Y, U, z, ee, Z);
      }
    },
    I = (T, M, H, Y, U, z, ee) => {
      const Z = (M.el = T.el);
      let { patchFlag: k, dynamicChildren: j, dirs: de } = M;
      k |= T.patchFlag & 16;
      const fe = T.props || Ze,
        be = M.props || Ze;
      let Se;
      H && br(H, !1),
        (Se = be.onVnodeBeforeUpdate) && bn(Se, H, M, T),
        de && vr(M, T, H, "beforeUpdate"),
        H && br(H, !0);
      const Pe = U && M.type !== "foreignObject";
      if (
        (j
          ? D(T.dynamicChildren, j, Z, H, Y, Pe, z)
          : ee || V(T, M, Z, null, H, Y, Pe, z, !1),
        k > 0)
      ) {
        if (k & 16) P(Z, M, fe, be, H, Y, U);
        else if (
          (k & 2 && fe.class !== be.class && i(Z, "class", null, be.class, U),
          k & 4 && i(Z, "style", fe.style, be.style, U),
          k & 8)
        ) {
          const Ke = M.dynamicProps;
          for (let le = 0; le < Ke.length; le++) {
            const pe = Ke[le],
              ke = fe[pe],
              Ae = be[pe];
            (Ae !== ke || pe === "value") &&
              i(Z, pe, ke, Ae, U, T.children, H, Y, ue);
          }
        }
        k & 1 && T.children !== M.children && c(Z, M.children);
      } else !ee && j == null && P(Z, M, fe, be, H, Y, U);
      ((Se = be.onVnodeUpdated) || de) &&
        Ot(() => {
          Se && bn(Se, H, M, T), de && vr(M, T, H, "updated");
        }, Y);
    },
    D = (T, M, H, Y, U, z, ee) => {
      for (let Z = 0; Z < M.length; Z++) {
        const k = T[Z],
          j = M[Z],
          de =
            k.el && (k.type === Ue || !Er(k, j) || k.shapeFlag & 70)
              ? f(k.el)
              : H;
        b(k, j, de, null, Y, U, z, ee, !0);
      }
    },
    P = (T, M, H, Y, U, z, ee) => {
      if (H !== Y) {
        if (H !== Ze)
          for (const Z in H)
            !cl(Z) &&
              !(Z in Y) &&
              i(T, Z, H[Z], null, ee, M.children, U, z, ue);
        for (const Z in Y) {
          if (cl(Z)) continue;
          const k = Y[Z],
            j = H[Z];
          k !== j && Z !== "value" && i(T, Z, j, k, ee, M.children, U, z, ue);
        }
        "value" in Y && i(T, "value", H.value, Y.value);
      }
    },
    O = (T, M, H, Y, U, z, ee, Z, k) => {
      const j = (M.el = T ? T.el : a("")),
        de = (M.anchor = T ? T.anchor : a(""));
      let { patchFlag: fe, dynamicChildren: be, slotScopeIds: Se } = M;
      Se && (Z = Z ? Z.concat(Se) : Se),
        T == null
          ? (r(j, H, Y), r(de, H, Y), $(M.children, H, de, U, z, ee, Z, k))
          : fe > 0 && fe & 64 && be && T.dynamicChildren
          ? (D(T.dynamicChildren, be, H, U, z, ee, Z),
            (M.key != null || (U && M === U.subTree)) && ku(T, M, !0))
          : V(T, M, H, de, U, z, ee, Z, k);
    },
    S = (T, M, H, Y, U, z, ee, Z, k) => {
      (M.slotScopeIds = Z),
        T == null
          ? M.shapeFlag & 512
            ? U.ctx.activate(M, H, Y, ee, k)
            : N(M, H, Y, U, z, ee, k)
          : X(T, M, k);
    },
    N = (T, M, H, Y, U, z, ee) => {
      const Z = (T.component = rb(T, Y, U));
      if ((aa(T) && (Z.ctx.renderer = Me), ob(Z), Z.asyncDep)) {
        if ((U && U.registerDep(Z, K), !T.el)) {
          const k = (Z.subTree = oe(Nt));
          _(null, k, M, H);
        }
        return;
      }
      K(Z, T, M, H, U, z, ee);
    },
    X = (T, M, H) => {
      const Y = (M.component = T.component);
      if (g0(T, M, H))
        if (Y.asyncDep && !Y.asyncResolved) {
          q(Y, M, H);
          return;
        } else (Y.next = M), c0(Y.update), Y.update();
      else (M.el = T.el), (Y.vnode = M);
    },
    K = (T, M, H, Y, U, z, ee) => {
      const Z = () => {
          if (T.isMounted) {
            let { next: de, bu: fe, u: be, parent: Se, vnode: Pe } = T,
              Ke = de,
              le;
            br(T, !1),
              de ? ((de.el = Pe.el), q(T, de, ee)) : (de = Pe),
              fe && fl(fe),
              (le = de.props && de.props.onVnodeBeforeUpdate) &&
                bn(le, Se, de, Pe),
              br(T, !0);
            const pe = Aa(T),
              ke = T.subTree;
            (T.subTree = pe),
              b(ke, pe, f(ke.el), Q(ke), T, U, z),
              (de.el = pe.el),
              Ke === null && v0(T, pe.el),
              be && Ot(be, U),
              (le = de.props && de.props.onVnodeUpdated) &&
                Ot(() => bn(le, Se, de, Pe), U);
          } else {
            let de;
            const { el: fe, props: be } = M,
              { bm: Se, m: Pe, parent: Ke } = T,
              le = Go(M);
            if (
              (br(T, !1),
              Se && fl(Se),
              !le && (de = be && be.onVnodeBeforeMount) && bn(de, Ke, M),
              br(T, !0),
              fe && je)
            ) {
              const pe = () => {
                (T.subTree = Aa(T)), je(fe, T.subTree, T, U, null);
              };
              le
                ? M.type.__asyncLoader().then(() => !T.isUnmounted && pe())
                : pe();
            } else {
              const pe = (T.subTree = Aa(T));
              b(null, pe, H, Y, T, U, z), (M.el = pe.el);
            }
            if ((Pe && Ot(Pe, U), !le && (de = be && be.onVnodeMounted))) {
              const pe = M;
              Ot(() => bn(de, Ke, pe), U);
            }
            (M.shapeFlag & 256 ||
              (Ke && Go(Ke.vnode) && Ke.vnode.shapeFlag & 256)) &&
              T.a &&
              Ot(T.a, U),
              (T.isMounted = !0),
              (M = H = Y = null);
          }
        },
        k = (T.effect = new du(Z, () => _u(j), T.scope)),
        j = (T.update = () => k.run());
      (j.id = T.uid), br(T, !0), j();
    },
    q = (T, M, H) => {
      M.component = T;
      const Y = T.vnode.props;
      (T.vnode = M),
        (T.next = null),
        V0(T, M.props, Y, H),
        z0(T, M.children, H),
        Kr(),
        Vc(),
        qr();
    },
    V = (T, M, H, Y, U, z, ee, Z, k = !1) => {
      const j = T && T.children,
        de = T ? T.shapeFlag : 0,
        fe = M.children,
        { patchFlag: be, shapeFlag: Se } = M;
      if (be > 0) {
        if (be & 128) {
          ne(j, fe, H, Y, U, z, ee, Z, k);
          return;
        } else if (be & 256) {
          R(j, fe, H, Y, U, z, ee, Z, k);
          return;
        }
      }
      Se & 8
        ? (de & 16 && ue(j, U, z), fe !== j && c(H, fe))
        : de & 16
        ? Se & 16
          ? ne(j, fe, H, Y, U, z, ee, Z, k)
          : ue(j, U, z, !0)
        : (de & 8 && c(H, ""), Se & 16 && $(fe, H, Y, U, z, ee, Z, k));
    },
    R = (T, M, H, Y, U, z, ee, Z, k) => {
      (T = T || lo), (M = M || lo);
      const j = T.length,
        de = M.length,
        fe = Math.min(j, de);
      let be;
      for (be = 0; be < fe; be++) {
        const Se = (M[be] = k ? or(M[be]) : yn(M[be]));
        b(T[be], Se, H, null, U, z, ee, Z, k);
      }
      j > de ? ue(T, U, z, !0, !1, fe) : $(M, H, Y, U, z, ee, Z, k, fe);
    },
    ne = (T, M, H, Y, U, z, ee, Z, k) => {
      let j = 0;
      const de = M.length;
      let fe = T.length - 1,
        be = de - 1;
      for (; j <= fe && j <= be; ) {
        const Se = T[j],
          Pe = (M[j] = k ? or(M[j]) : yn(M[j]));
        if (Er(Se, Pe)) b(Se, Pe, H, null, U, z, ee, Z, k);
        else break;
        j++;
      }
      for (; j <= fe && j <= be; ) {
        const Se = T[fe],
          Pe = (M[be] = k ? or(M[be]) : yn(M[be]));
        if (Er(Se, Pe)) b(Se, Pe, H, null, U, z, ee, Z, k);
        else break;
        fe--, be--;
      }
      if (j > fe) {
        if (j <= be) {
          const Se = be + 1,
            Pe = Se < de ? M[Se].el : Y;
          for (; j <= be; )
            b(null, (M[j] = k ? or(M[j]) : yn(M[j])), H, Pe, U, z, ee, Z, k),
              j++;
        }
      } else if (j > be) for (; j <= fe; ) J(T[j], U, z, !0), j++;
      else {
        const Se = j,
          Pe = j,
          Ke = new Map();
        for (j = Pe; j <= be; j++) {
          const xe = (M[j] = k ? or(M[j]) : yn(M[j]));
          xe.key != null && Ke.set(xe.key, j);
        }
        let le,
          pe = 0;
        const ke = be - Pe + 1;
        let Ae = !1,
          F = 0;
        const G = new Array(ke);
        for (j = 0; j < ke; j++) G[j] = 0;
        for (j = Se; j <= fe; j++) {
          const xe = T[j];
          if (pe >= ke) {
            J(xe, U, z, !0);
            continue;
          }
          let ze;
          if (xe.key != null) ze = Ke.get(xe.key);
          else
            for (le = Pe; le <= be; le++)
              if (G[le - Pe] === 0 && Er(xe, M[le])) {
                ze = le;
                break;
              }
          ze === void 0
            ? J(xe, U, z, !0)
            : ((G[ze - Pe] = j + 1),
              ze >= F ? (F = ze) : (Ae = !0),
              b(xe, M[ze], H, null, U, z, ee, Z, k),
              pe++);
        }
        const ye = Ae ? U0(G) : lo;
        for (le = ye.length - 1, j = ke - 1; j >= 0; j--) {
          const xe = Pe + j,
            ze = M[xe],
            Vt = xe + 1 < de ? M[xe + 1].el : Y;
          G[j] === 0
            ? b(null, ze, H, Vt, U, z, ee, Z, k)
            : Ae && (le < 0 || j !== ye[le] ? ie(ze, H, Vt, 2) : le--);
        }
      }
    },
    ie = (T, M, H, Y, U = null) => {
      const { el: z, type: ee, transition: Z, children: k, shapeFlag: j } = T;
      if (j & 6) {
        ie(T.component.subTree, M, H, Y);
        return;
      }
      if (j & 128) {
        T.suspense.move(M, H, Y);
        return;
      }
      if (j & 64) {
        ee.move(T, M, H, Me);
        return;
      }
      if (ee === Ue) {
        r(z, M, H);
        for (let fe = 0; fe < k.length; fe++) ie(k[fe], M, H, Y);
        r(T.anchor, M, H);
        return;
      }
      if (ee === Oa) {
        g(T, M, H);
        return;
      }
      if (Y !== 2 && j & 1 && Z)
        if (Y === 0) Z.beforeEnter(z), r(z, M, H), Ot(() => Z.enter(z), U);
        else {
          const { leave: fe, delayLeave: be, afterLeave: Se } = Z,
            Pe = () => r(z, M, H),
            Ke = () => {
              fe(z, () => {
                Pe(), Se && Se();
              });
            };
          be ? be(z, Pe, Ke) : Ke();
        }
      else r(z, M, H);
    },
    J = (T, M, H, Y = !1, U = !1) => {
      const {
        type: z,
        props: ee,
        ref: Z,
        children: k,
        dynamicChildren: j,
        shapeFlag: de,
        patchFlag: fe,
        dirs: be,
      } = T;
      if ((Z != null && ms(Z, null, H, T, !0), de & 256)) {
        M.ctx.deactivate(T);
        return;
      }
      const Se = de & 1 && be,
        Pe = !Go(T);
      let Ke;
      if ((Pe && (Ke = ee && ee.onVnodeBeforeUnmount) && bn(Ke, M, T), de & 6))
        Ce(T.component, H, Y);
      else {
        if (de & 128) {
          T.suspense.unmount(H, Y);
          return;
        }
        Se && vr(T, null, M, "beforeUnmount"),
          de & 64
            ? T.type.remove(T, M, H, U, Me, Y)
            : j && (z !== Ue || (fe > 0 && fe & 64))
            ? ue(j, M, H, !1, !0)
            : ((z === Ue && fe & 384) || (!U && de & 16)) && ue(k, M, H),
          Y && ve(T);
      }
      ((Pe && (Ke = ee && ee.onVnodeUnmounted)) || Se) &&
        Ot(() => {
          Ke && bn(Ke, M, T), Se && vr(T, null, M, "unmounted");
        }, H);
    },
    ve = (T) => {
      const { type: M, el: H, anchor: Y, transition: U } = T;
      if (M === Ue) {
        $e(H, Y);
        return;
      }
      if (M === Oa) {
        y(T);
        return;
      }
      const z = () => {
        o(H), U && !U.persisted && U.afterLeave && U.afterLeave();
      };
      if (T.shapeFlag & 1 && U && !U.persisted) {
        const { leave: ee, delayLeave: Z } = U,
          k = () => ee(H, z);
        Z ? Z(T.el, z, k) : k();
      } else z();
    },
    $e = (T, M) => {
      let H;
      for (; T !== M; ) (H = d(T)), o(T), (T = H);
      o(M);
    },
    Ce = (T, M, H) => {
      const { bum: Y, scope: U, update: z, subTree: ee, um: Z } = T;
      Y && fl(Y),
        U.stop(),
        z && ((z.active = !1), J(ee, T, M, H)),
        Z && Ot(Z, M),
        Ot(() => {
          T.isUnmounted = !0;
        }, M),
        M &&
          M.pendingBranch &&
          !M.isUnmounted &&
          T.asyncDep &&
          !T.asyncResolved &&
          T.suspenseId === M.pendingId &&
          (M.deps--, M.deps === 0 && M.resolve());
    },
    ue = (T, M, H, Y = !1, U = !1, z = 0) => {
      for (let ee = z; ee < T.length; ee++) J(T[ee], M, H, Y, U);
    },
    Q = (T) =>
      T.shapeFlag & 6
        ? Q(T.component.subTree)
        : T.shapeFlag & 128
        ? T.suspense.next()
        : d(T.anchor || T.el),
    ce = (T, M, H) => {
      T == null
        ? M._vnode && J(M._vnode, null, null, !0)
        : b(M._vnode || null, T, M, null, null, null, H),
        Vc(),
        Yp(),
        (M._vnode = T);
    },
    Me = { p: b, um: J, m: ie, r: ve, mt: N, mc: $, pc: V, pbc: D, n: Q, o: e };
  let _e, je;
  return (
    t && ([_e, je] = t(Me)), { render: ce, hydrate: _e, createApp: j0(ce, _e) }
  );
}
function br({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function ku(e, t, n = !1) {
  const r = e.children,
    o = t.children;
  if (we(r) && we(o))
    for (let i = 0; i < r.length; i++) {
      const l = r[i];
      let a = o[i];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = o[i] = or(o[i])), (a.el = l.el)),
        n || ku(l, a));
    }
}
function U0(e) {
  const t = e.slice(),
    n = [0];
  let r, o, i, l, a;
  const s = e.length;
  for (r = 0; r < s; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((o = n[n.length - 1]), e[o] < u)) {
        (t[r] = o), n.push(r);
        continue;
      }
      for (i = 0, l = n.length - 1; i < l; )
        (a = (i + l) >> 1), e[n[a]] < u ? (i = a + 1) : (l = a);
      u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), (n[i] = r));
    }
  }
  for (i = n.length, l = n[i - 1]; i-- > 0; ) (n[i] = l), (l = t[l]);
  return n;
}
const Y0 = (e) => e.__isTeleport,
  Jo = (e) => e && (e.disabled || e.disabled === ""),
  Gc = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
  gs = (e, t) => {
    const n = e && e.to;
    return Be(n) ? (t ? t(n) : null) : n;
  },
  X0 = {
    __isTeleport: !0,
    process(e, t, n, r, o, i, l, a, s, u) {
      const {
          mc: c,
          pc: f,
          pbc: d,
          o: { insert: h, querySelector: p, createText: b, createComment: v },
        } = u,
        _ = Jo(t.props);
      let { shapeFlag: x, children: g, dynamicChildren: y } = t;
      if (e == null) {
        const w = (t.el = b("")),
          C = (t.anchor = b(""));
        h(w, n, r), h(C, n, r);
        const E = (t.target = gs(t.props, p)),
          $ = (t.targetAnchor = b(""));
        E && (h($, E), (l = l || Gc(E)));
        const I = (D, P) => {
          x & 16 && c(g, D, P, o, i, l, a, s);
        };
        _ ? I(n, C) : E && I(E, $);
      } else {
        t.el = e.el;
        const w = (t.anchor = e.anchor),
          C = (t.target = e.target),
          E = (t.targetAnchor = e.targetAnchor),
          $ = Jo(e.props),
          I = $ ? n : C,
          D = $ ? w : E;
        if (
          ((l = l || Gc(C)),
          y
            ? (d(e.dynamicChildren, y, I, o, i, l, a), ku(e, t, !0))
            : s || f(e, t, I, D, o, i, l, a, !1),
          _)
        )
          $ || Wi(t, n, w, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const P = (t.target = gs(t.props, p));
          P && Wi(t, P, null, u, 0);
        } else $ && Wi(t, C, E, u, 1);
      }
    },
    remove(e, t, n, r, { um: o, o: { remove: i } }, l) {
      const {
        shapeFlag: a,
        children: s,
        anchor: u,
        targetAnchor: c,
        target: f,
        props: d,
      } = e;
      if ((f && i(c), (l || !Jo(d)) && (i(u), a & 16)))
        for (let h = 0; h < s.length; h++) {
          const p = s[h];
          o(p, t, n, !0, !!p.dynamicChildren);
        }
    },
    move: Wi,
    hydrate: G0,
  };
function Wi(e, t, n, { o: { insert: r }, m: o }, i = 2) {
  i === 0 && r(e.targetAnchor, t, n);
  const { el: l, anchor: a, shapeFlag: s, children: u, props: c } = e,
    f = i === 2;
  if ((f && r(l, t, n), (!f || Jo(c)) && s & 16))
    for (let d = 0; d < u.length; d++) o(u[d], t, n, 2);
  f && r(a, t, n);
}
function G0(
  e,
  t,
  n,
  r,
  o,
  i,
  { o: { nextSibling: l, parentNode: a, querySelector: s } },
  u
) {
  const c = (t.target = gs(t.props, s));
  if (c) {
    const f = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (Jo(t.props))
        (t.anchor = u(l(e), t, a(e), n, r, o, i)), (t.targetAnchor = f);
      else {
        t.anchor = l(e);
        let d = f;
        for (; d; )
          if (
            ((d = l(d)), d && d.nodeType === 8 && d.data === "teleport anchor")
          ) {
            (t.targetAnchor = d),
              (c._lpa = t.targetAnchor && l(t.targetAnchor));
            break;
          }
        u(f, t, c, n, r, o, i);
      }
  }
  return t.anchor && l(t.anchor);
}
const J0 = X0,
  Ue = Symbol(void 0),
  Mi = Symbol(void 0),
  Nt = Symbol(void 0),
  Oa = Symbol(void 0),
  Zo = [];
let sn = null;
function L(e = !1) {
  Zo.push((sn = e ? null : []));
}
function Z0() {
  Zo.pop(), (sn = Zo[Zo.length - 1] || null);
}
let ui = 1;
function Jc(e) {
  ui += e;
}
function dh(e) {
  return (
    (e.dynamicChildren = ui > 0 ? sn || lo : null),
    Z0(),
    ui > 0 && sn && sn.push(e),
    e
  );
}
function te(e, t, n, r, o, i) {
  return dh(ae(e, t, n, r, o, i, !0));
}
function he(e, t, n, r, o) {
  return dh(oe(e, t, n, r, o, !0));
}
function Ll(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Er(e, t) {
  return e.type === t.type && e.key === t.key;
}
const ca = "__vInternal",
  ph = ({ key: e }) => (e != null ? e : null),
  dl = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? Be(e) || Qe(e) || Te(e)
        ? { i: Ct, r: e, k: t, f: !!n }
        : e
      : null;
function ae(
  e,
  t = null,
  n = null,
  r = 0,
  o = null,
  i = e === Ue ? 0 : 1,
  l = !1,
  a = !1
) {
  const s = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ph(t),
    ref: t && dl(t),
    scopeId: la,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
  };
  return (
    a
      ? (Ou(s, n), i & 128 && e.normalize(s))
      : n && (s.shapeFlag |= Be(n) ? 8 : 16),
    ui > 0 &&
      !l &&
      sn &&
      (s.patchFlag > 0 || i & 6) &&
      s.patchFlag !== 32 &&
      sn.push(s),
    s
  );
}
const oe = Q0;
function Q0(e, t = null, n = null, r = 0, o = null, i = !1) {
  if (((!e || e === rh) && (e = Nt), Ll(e))) {
    const a = jn(e, t, !0);
    return (
      n && Ou(a, n),
      ui > 0 &&
        !i &&
        sn &&
        (a.shapeFlag & 6 ? (sn[sn.indexOf(e)] = a) : sn.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((ub(e) && (e = e.__vccOpts), t)) {
    t = eb(t);
    let { class: a, style: s } = t;
    a && !Be(a) && (t.class = W(a)),
      We(s) && (Vp(s) && !we(s) && (s = vt({}, s)), (t.style = He(s)));
  }
  const l = Be(e) ? 1 : b0(e) ? 128 : Y0(e) ? 64 : We(e) ? 4 : Te(e) ? 2 : 0;
  return ae(e, t, n, r, o, l, i, !0);
}
function eb(e) {
  return e ? (Vp(e) || ca in e ? vt({}, e) : e) : null;
}
function jn(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: i, children: l } = e,
    a = t ? Lr(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && ph(a),
    ref:
      t && t.ref
        ? n && o
          ? we(o)
            ? o.concat(dl(t))
            : [o, dl(t)]
          : dl(t)
        : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ue ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && jn(e.ssContent),
    ssFallback: e.ssFallback && jn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
  };
}
function It(e = " ", t = 0) {
  return oe(Mi, null, e, t);
}
function ge(e = "", t = !1) {
  return t ? (L(), he(Nt, null, e)) : oe(Nt, null, e);
}
function yn(e) {
  return e == null || typeof e == "boolean"
    ? oe(Nt)
    : we(e)
    ? oe(Ue, null, e.slice())
    : typeof e == "object"
    ? or(e)
    : oe(Mi, null, String(e));
}
function or(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : jn(e);
}
function Ou(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (we(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Ou(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(ca in t)
        ? (t._ctx = Ct)
        : o === 3 &&
          Ct &&
          (Ct.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    Te(t)
      ? ((t = { default: t, _ctx: Ct }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [It(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Lr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = W([t.class, r.class]));
      else if (o === "style") t.style = He([t.style, r.style]);
      else if (Ql(o)) {
        const i = t[o],
          l = r[o];
        l &&
          i !== l &&
          !(we(i) && i.includes(l)) &&
          (t[o] = i ? [].concat(i, l) : l);
      } else o !== "" && (t[o] = r[o]);
  }
  return t;
}
function bn(e, t, n, r = null) {
  Ut(e, t, 7, [n, r]);
}
const tb = fh();
let nb = 0;
function rb(e, t, n) {
  const r = e.type,
    o = (t ? t.appContext : e.appContext) || tb,
    i = {
      uid: nb++,
      vnode: e,
      type: r,
      parent: t,
      appContext: o,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new xv(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(o.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: ah(r, o),
      emitsOptions: Gp(r, o),
      emit: null,
      emitted: null,
      propsDefaults: Ze,
      inheritAttrs: r.inheritAttrs,
      ctx: Ze,
      data: Ze,
      props: Ze,
      attrs: Ze,
      slots: Ze,
      refs: Ze,
      setupState: Ze,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = { _: i }),
    (i.root = t ? t.root : i),
    (i.emit = p0.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let ft = null;
const et = () => ft || Ct,
  go = (e) => {
    (ft = e), e.scope.on();
  },
  Fr = () => {
    ft && ft.scope.off(), (ft = null);
  };
function hh(e) {
  return e.vnode.shapeFlag & 4;
}
let ci = !1;
function ob(e, t = !1) {
  ci = t;
  const { props: n, children: r } = e.vnode,
    o = hh(e);
  B0(e, n, o, t), H0(e, r);
  const i = o ? ib(e, t) : void 0;
  return (ci = !1), i;
}
function ib(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Dp(new Proxy(e.ctx, P0)));
  const { setup: r } = n;
  if (r) {
    const o = (e.setupContext = r.length > 1 ? gh(e) : null);
    go(e), Kr();
    const i = Dn(r, e, 0, [e.props, o]);
    if ((qr(), Fr(), Ml(i))) {
      if ((i.then(Fr, Fr), t))
        return i
          .then((l) => {
            Zc(e, l, t);
          })
          .catch((l) => {
            oa(l, e, 0);
          });
      e.asyncDep = i;
    } else Zc(e, i, t);
  } else mh(e, t);
}
function Zc(e, t, n) {
  Te(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : We(t) && (e.setupState = Wp(t)),
    mh(e, n);
}
let Qc;
function mh(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Qc && !r.render) {
      const o = r.template || Mu(e).template;
      if (o) {
        const { isCustomElement: i, compilerOptions: l } = e.appContext.config,
          { delimiters: a, compilerOptions: s } = r,
          u = vt(vt({ isCustomElement: i, delimiters: a }, l), s);
        r.render = Qc(o, u);
      }
    }
    e.render = r.render || St;
  }
  go(e), Kr(), N0(e), qr(), Fr();
}
function lb(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return Wt(e, "get", "$attrs"), t[n];
    },
  });
}
function gh(e) {
  const t = (r) => {
    e.exposed = r || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = lb(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function fa(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(Wp(Dp(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Nl) return Nl[n](e);
        },
      }))
    );
}
const ab = /(?:^|[-_])(\w)/g,
  sb = (e) => e.replace(ab, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function vh(e, t = !0) {
  return Te(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function bh(e, t, n = !1) {
  let r = vh(t);
  if (!r && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (r = o[1]);
  }
  if (!r && e && e.parent) {
    const o = (i) => {
      for (const l in i) if (i[l] === t) return l;
    };
    r =
      o(e.components || e.parent.type.components) || o(e.appContext.components);
  }
  return r ? sb(r) : n ? "App" : "Anonymous";
}
function ub(e) {
  return Te(e) && "__vccOpts" in e;
}
const A = (e, t) => n0(e, t, ci);
function Oo() {
  return yh().slots;
}
function cb() {
  return yh().attrs;
}
function yh() {
  const e = et();
  return e.setupContext || (e.setupContext = gh(e));
}
function Ne(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? We(t) && !we(t)
      ? Ll(t)
        ? oe(e, null, [t])
        : oe(e, t)
      : oe(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && Ll(n) && (n = [n]),
      oe(e, t, n));
}
const fb = "3.2.41",
  db = "http://www.w3.org/2000/svg",
  Tr = typeof document < "u" ? document : null,
  ef = Tr && Tr.createElement("template"),
  pb = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const o = t
        ? Tr.createElementNS(db, e)
        : Tr.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          o.setAttribute("multiple", r.multiple),
        o
      );
    },
    createText: (e) => Tr.createTextNode(e),
    createComment: (e) => Tr.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Tr.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, o, i) {
      const l = n ? n.previousSibling : t.lastChild;
      if (o && (o === i || o.nextSibling))
        for (
          ;
          t.insertBefore(o.cloneNode(!0), n),
            !(o === i || !(o = o.nextSibling));

        );
      else {
        ef.innerHTML = r ? `<svg>${e}</svg>` : e;
        const a = ef.content;
        if (r) {
          const s = a.firstChild;
          for (; s.firstChild; ) a.appendChild(s.firstChild);
          a.removeChild(s);
        }
        t.insertBefore(a, n);
      }
      return [
        l ? l.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function hb(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function mb(e, t, n) {
  const r = e.style,
    o = Be(n);
  if (n && !o) {
    for (const i in n) vs(r, i, n[i]);
    if (t && !Be(t)) for (const i in t) n[i] == null && vs(r, i, "");
  } else {
    const i = r.display;
    o ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = i);
  }
}
const tf = /\s*!important$/;
function vs(e, t, n) {
  if (we(n)) n.forEach((r) => vs(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = gb(e, t);
    tf.test(n)
      ? e.setProperty(pr(r), n.replace(tf, ""), "important")
      : (e[r] = n);
  }
}
const nf = ["Webkit", "Moz", "ms"],
  Pa = {};
function gb(e, t) {
  const n = Pa[t];
  if (n) return n;
  let r = un(t);
  if (r !== "filter" && r in e) return (Pa[t] = r);
  r = na(r);
  for (let o = 0; o < nf.length; o++) {
    const i = nf[o] + r;
    if (i in e) return (Pa[t] = i);
  }
  return t;
}
const rf = "http://www.w3.org/1999/xlink";
function vb(e, t, n, r, o) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(rf, t.slice(6, t.length))
      : e.setAttributeNS(rf, t, n);
  else {
    const i = fv(t);
    n == null || (i && !Sp(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, i ? "" : n);
  }
}
function bb(e, t, n, r, o, i, l) {
  if (t === "innerHTML" || t === "textContent") {
    r && l(r, o, i), (e[t] = n == null ? "" : n);
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const s = n == null ? "" : n;
    (e.value !== s || e.tagName === "OPTION") && (e.value = s),
      n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const s = typeof e[t];
    s === "boolean"
      ? (n = Sp(n))
      : n == null && s === "string"
      ? ((n = ""), (a = !0))
      : s === "number" && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function ir(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function yb(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function wb(e, t, n, r, o = null) {
  const i = e._vei || (e._vei = {}),
    l = i[t];
  if (r && l) l.value = r;
  else {
    const [a, s] = _b(t);
    if (r) {
      const u = (i[t] = Sb(r, o));
      ir(e, a, u, s);
    } else l && (yb(e, a, l, s), (i[t] = void 0));
  }
}
const of = /(?:Once|Passive|Capture)$/;
function _b(e) {
  let t;
  if (of.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(of)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : pr(e.slice(2)), t];
}
let Na = 0;
const xb = Promise.resolve(),
  Cb = () => Na || (xb.then(() => (Na = 0)), (Na = Date.now()));
function Sb(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Ut(Eb(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Cb()), n;
}
function Eb(e, t) {
  if (we(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (o) => !o._stopped && r && r(o))
    );
  } else return t;
}
const lf = /^on[a-z]/,
  Tb = (e, t, n, r, o = !1, i, l, a, s) => {
    t === "class"
      ? hb(e, r, o)
      : t === "style"
      ? mb(e, n, r)
      : Ql(t)
      ? su(t) || wb(e, t, n, r, l)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : $b(e, t, r, o)
        )
      ? bb(e, t, r, i, l, a, s)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        vb(e, t, r, o));
  };
function $b(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && lf.test(t) && Te(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (lf.test(t) && Be(n))
    ? !1
    : t in e;
}
const Zn = "transition",
  Bo = "animation",
  hr = (e, { slots: t }) => Ne(Zp, Mb(e), t);
hr.displayName = "Transition";
const wh = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
hr.props = vt({}, Zp.props, wh);
const yr = (e, t = []) => {
    we(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  af = (e) => (e ? (we(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Mb(e) {
  const t = {};
  for (const O in e) O in wh || (t[O] = e[O]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: r,
      duration: o,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: l = `${n}-enter-active`,
      enterToClass: a = `${n}-enter-to`,
      appearFromClass: s = i,
      appearActiveClass: u = l,
      appearToClass: c = a,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: d = `${n}-leave-active`,
      leaveToClass: h = `${n}-leave-to`,
    } = e,
    p = Ab(o),
    b = p && p[0],
    v = p && p[1],
    {
      onBeforeEnter: _,
      onEnter: x,
      onEnterCancelled: g,
      onLeave: y,
      onLeaveCancelled: w,
      onBeforeAppear: C = _,
      onAppear: E = x,
      onAppearCancelled: $ = g,
    } = t,
    I = (O, S, N) => {
      wr(O, S ? c : a), wr(O, S ? u : l), N && N();
    },
    D = (O, S) => {
      (O._isLeaving = !1), wr(O, f), wr(O, h), wr(O, d), S && S();
    },
    P = (O) => (S, N) => {
      const X = O ? E : x,
        K = () => I(S, O, N);
      yr(X, [S, K]),
        sf(() => {
          wr(S, O ? s : i), Qn(S, O ? c : a), af(X) || uf(S, r, b, K);
        });
    };
  return vt(t, {
    onBeforeEnter(O) {
      yr(_, [O]), Qn(O, i), Qn(O, l);
    },
    onBeforeAppear(O) {
      yr(C, [O]), Qn(O, s), Qn(O, u);
    },
    onEnter: P(!1),
    onAppear: P(!0),
    onLeave(O, S) {
      O._isLeaving = !0;
      const N = () => D(O, S);
      Qn(O, f),
        Pb(),
        Qn(O, d),
        sf(() => {
          !O._isLeaving || (wr(O, f), Qn(O, h), af(y) || uf(O, r, v, N));
        }),
        yr(y, [O, N]);
    },
    onEnterCancelled(O) {
      I(O, !1), yr(g, [O]);
    },
    onAppearCancelled(O) {
      I(O, !0), yr($, [O]);
    },
    onLeaveCancelled(O) {
      D(O), yr(w, [O]);
    },
  });
}
function Ab(e) {
  if (e == null) return null;
  if (We(e)) return [Ia(e.enter), Ia(e.leave)];
  {
    const t = Ia(e);
    return [t, t];
  }
}
function Ia(e) {
  return kl(e);
}
function Qn(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function wr(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function sf(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let kb = 0;
function uf(e, t, n, r) {
  const o = (e._endId = ++kb),
    i = () => {
      o === e._endId && r();
    };
  if (n) return setTimeout(i, n);
  const { type: l, timeout: a, propCount: s } = Ob(e, t);
  if (!l) return r();
  const u = l + "end";
  let c = 0;
  const f = () => {
      e.removeEventListener(u, d), i();
    },
    d = (h) => {
      h.target === e && ++c >= s && f();
    };
  setTimeout(() => {
    c < s && f();
  }, a + 1),
    e.addEventListener(u, d);
}
function Ob(e, t) {
  const n = window.getComputedStyle(e),
    r = (p) => (n[p] || "").split(", "),
    o = r(Zn + "Delay"),
    i = r(Zn + "Duration"),
    l = cf(o, i),
    a = r(Bo + "Delay"),
    s = r(Bo + "Duration"),
    u = cf(a, s);
  let c = null,
    f = 0,
    d = 0;
  t === Zn
    ? l > 0 && ((c = Zn), (f = l), (d = i.length))
    : t === Bo
    ? u > 0 && ((c = Bo), (f = u), (d = s.length))
    : ((f = Math.max(l, u)),
      (c = f > 0 ? (l > u ? Zn : Bo) : null),
      (d = c ? (c === Zn ? i.length : s.length) : 0));
  const h = c === Zn && /\b(transform|all)(,|$)/.test(n[Zn + "Property"]);
  return { type: c, timeout: f, propCount: d, hasTransform: h };
}
function cf(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => ff(n) + ff(e[r])));
}
function ff(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function Pb() {
  return document.body.offsetHeight;
}
const vo = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return we(t) ? (n) => fl(t, n) : t;
};
function Nb(e) {
  e.target.composing = !0;
}
function df(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Ib = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, o) {
      e._assign = vo(o);
      const i = r || (o.props && o.props.type === "number");
      ir(e, t ? "change" : "input", (l) => {
        if (l.target.composing) return;
        let a = e.value;
        n && (a = a.trim()), i && (a = kl(a)), e._assign(a);
      }),
        n &&
          ir(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (ir(e, "compositionstart", Nb),
          ir(e, "compositionend", df),
          ir(e, "change", df));
    },
    mounted(e, { value: t }) {
      e.value = t == null ? "" : t;
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: o } },
      i
    ) {
      if (
        ((e._assign = vo(i)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((o || e.type === "number") && kl(e.value) === t))))
      )
        return;
      const l = t == null ? "" : t;
      e.value !== l && (e.value = l);
    },
  },
  Fl = {
    deep: !0,
    created(e, t, n) {
      (e._assign = vo(n)),
        ir(e, "change", () => {
          const r = e._modelValue,
            o = xh(e),
            i = e.checked,
            l = e._assign;
          if (we(r)) {
            const a = Ep(r, o),
              s = a !== -1;
            if (i && !s) l(r.concat(o));
            else if (!i && s) {
              const u = [...r];
              u.splice(a, 1), l(u);
            }
          } else if (ea(r)) {
            const a = new Set(r);
            i ? a.add(o) : a.delete(o), l(a);
          } else l(Ch(e, i));
        });
    },
    mounted: pf,
    beforeUpdate(e, t, n) {
      (e._assign = vo(n)), pf(e, t, n);
    },
  };
function pf(e, { value: t, oldValue: n }, r) {
  (e._modelValue = t),
    we(t)
      ? (e.checked = Ep(t, r.props.value) > -1)
      : ea(t)
      ? (e.checked = t.has(r.props.value))
      : t !== n && (e.checked = ho(t, Ch(e, !0)));
}
const _h = {
  created(e, { value: t }, n) {
    (e.checked = ho(t, n.props.value)),
      (e._assign = vo(n)),
      ir(e, "change", () => {
        e._assign(xh(e));
      });
  },
  beforeUpdate(e, { value: t, oldValue: n }, r) {
    (e._assign = vo(r)), t !== n && (e.checked = ho(t, r.props.value));
  },
};
function xh(e) {
  return "_value" in e ? e._value : e.value;
}
function Ch(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Lb = ["ctrl", "shift", "alt", "meta"],
  Fb = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => Lb.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  it =
    (e, t) =>
    (n, ...r) => {
      for (let o = 0; o < t.length; o++) {
        const i = Fb[t[o]];
        if (i && i(n, t)) return;
      }
      return e(n, ...r);
    },
  Rb = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  _t = (e, t) => (n) => {
    if (!("key" in n)) return;
    const r = pr(n.key);
    if (t.some((o) => o === r || Rb[o] === r)) return e(n);
  },
  cn = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e._vod = e.style.display === "none" ? "" : e.style.display),
        n && t ? n.beforeEnter(e) : Vo(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), Vo(e, !0), r.enter(e))
            : r.leave(e, () => {
                Vo(e, !1);
              })
          : Vo(e, t));
    },
    beforeUnmount(e, { value: t }) {
      Vo(e, t);
    },
  };
function Vo(e, t) {
  e.style.display = t ? e._vod : "none";
}
const Bb = vt({ patchProp: Tb }, pb);
let hf;
function Vb() {
  return hf || (hf = K0(Bb));
}
const Sh = (...e) => {
  const t = Vb().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const o = Db(r);
      if (!o) return;
      const i = t._component;
      !Te(i) && !i.render && !i.template && (i.template = o.innerHTML),
        (o.innerHTML = "");
      const l = n(o, !1, o instanceof SVGElement);
      return (
        o instanceof Element &&
          (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")),
        l
      );
    }),
    t
  );
};
function Db(e) {
  return Be(e) ? document.querySelector(e) : e;
}
var Hb =
  typeof global == "object" && global && global.Object === Object && global;
const Eh = Hb;
var zb = typeof self == "object" && self && self.Object === Object && self,
  Wb = Eh || zb || Function("return this")();
const pn = Wb;
var jb = pn.Symbol;
const Gt = jb;
var Th = Object.prototype,
  Kb = Th.hasOwnProperty,
  qb = Th.toString,
  Do = Gt ? Gt.toStringTag : void 0;
function Ub(e) {
  var t = Kb.call(e, Do),
    n = e[Do];
  try {
    e[Do] = void 0;
    var r = !0;
  } catch {}
  var o = qb.call(e);
  return r && (t ? (e[Do] = n) : delete e[Do]), o;
}
var Yb = Object.prototype,
  Xb = Yb.toString;
function Gb(e) {
  return Xb.call(e);
}
var Jb = "[object Null]",
  Zb = "[object Undefined]",
  mf = Gt ? Gt.toStringTag : void 0;
function Po(e) {
  return e == null
    ? e === void 0
      ? Zb
      : Jb
    : mf && mf in Object(e)
    ? Ub(e)
    : Gb(e);
}
function fr(e) {
  return e != null && typeof e == "object";
}
var Qb = "[object Symbol]";
function da(e) {
  return typeof e == "symbol" || (fr(e) && Po(e) == Qb);
}
function ey(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; )
    o[n] = t(e[n], n, e);
  return o;
}
var ty = Array.isArray;
const fn = ty;
var ny = 1 / 0,
  gf = Gt ? Gt.prototype : void 0,
  vf = gf ? gf.toString : void 0;
function $h(e) {
  if (typeof e == "string") return e;
  if (fn(e)) return ey(e, $h) + "";
  if (da(e)) return vf ? vf.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -ny ? "-0" : t;
}
var ry = /\s/;
function oy(e) {
  for (var t = e.length; t-- && ry.test(e.charAt(t)); );
  return t;
}
var iy = /^\s+/;
function ly(e) {
  return e && e.slice(0, oy(e) + 1).replace(iy, "");
}
function dn(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var bf = 0 / 0,
  ay = /^[-+]0x[0-9a-f]+$/i,
  sy = /^0b[01]+$/i,
  uy = /^0o[0-7]+$/i,
  cy = parseInt;
function yf(e) {
  if (typeof e == "number") return e;
  if (da(e)) return bf;
  if (dn(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = dn(t) ? t + "" : t;
  }
  if (typeof e != "string") return e === 0 ? e : +e;
  e = ly(e);
  var n = sy.test(e);
  return n || uy.test(e) ? cy(e.slice(2), n ? 2 : 8) : ay.test(e) ? bf : +e;
}
function fy(e) {
  return e;
}
var dy = "[object AsyncFunction]",
  py = "[object Function]",
  hy = "[object GeneratorFunction]",
  my = "[object Proxy]";
function Mh(e) {
  if (!dn(e)) return !1;
  var t = Po(e);
  return t == py || t == hy || t == dy || t == my;
}
var gy = pn["__core-js_shared__"];
const La = gy;
var wf = (function () {
  var e = /[^.]+$/.exec((La && La.keys && La.keys.IE_PROTO) || "");
  return e ? "Symbol(src)_1." + e : "";
})();
function vy(e) {
  return !!wf && wf in e;
}
var by = Function.prototype,
  yy = by.toString;
function Ur(e) {
  if (e != null) {
    try {
      return yy.call(e);
    } catch {}
    try {
      return e + "";
    } catch {}
  }
  return "";
}
var wy = /[\\^$.*+?()[\]{}|]/g,
  _y = /^\[object .+?Constructor\]$/,
  xy = Function.prototype,
  Cy = Object.prototype,
  Sy = xy.toString,
  Ey = Cy.hasOwnProperty,
  Ty = RegExp(
    "^" +
      Sy.call(Ey)
        .replace(wy, "\\$&")
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          "$1.*?"
        ) +
      "$"
  );
function $y(e) {
  if (!dn(e) || vy(e)) return !1;
  var t = Mh(e) ? Ty : _y;
  return t.test(Ur(e));
}
function My(e, t) {
  return e == null ? void 0 : e[t];
}
function Yr(e, t) {
  var n = My(e, t);
  return $y(n) ? n : void 0;
}
var Ay = Yr(pn, "WeakMap");
const bs = Ay;
var _f = Object.create,
  ky = (function () {
    function e() {}
    return function (t) {
      if (!dn(t)) return {};
      if (_f) return _f(t);
      e.prototype = t;
      var n = new e();
      return (e.prototype = void 0), n;
    };
  })();
const Oy = ky;
function Py(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
function Ny(e, t) {
  var n = -1,
    r = e.length;
  for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
  return t;
}
var Iy = 800,
  Ly = 16,
  Fy = Date.now;
function Ry(e) {
  var t = 0,
    n = 0;
  return function () {
    var r = Fy(),
      o = Ly - (r - n);
    if (((n = r), o > 0)) {
      if (++t >= Iy) return arguments[0];
    } else t = 0;
    return e.apply(void 0, arguments);
  };
}
function By(e) {
  return function () {
    return e;
  };
}
var Vy = (function () {
  try {
    var e = Yr(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {}
})();
const Rl = Vy;
var Dy = Rl
  ? function (e, t) {
      return Rl(e, "toString", {
        configurable: !0,
        enumerable: !1,
        value: By(t),
        writable: !0,
      });
    }
  : fy;
const Hy = Dy;
var zy = Ry(Hy);
const Wy = zy;
function jy(e, t) {
  for (
    var n = -1, r = e == null ? 0 : e.length;
    ++n < r && t(e[n], n, e) !== !1;

  );
  return e;
}
var Ky = 9007199254740991,
  qy = /^(?:0|[1-9]\d*)$/;
function Pu(e, t) {
  var n = typeof e;
  return (
    (t = t == null ? Ky : t),
    !!t &&
      (n == "number" || (n != "symbol" && qy.test(e))) &&
      e > -1 &&
      e % 1 == 0 &&
      e < t
  );
}
function Ah(e, t, n) {
  t == "__proto__" && Rl
    ? Rl(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
    : (e[t] = n);
}
function Nu(e, t) {
  return e === t || (e !== e && t !== t);
}
var Uy = Object.prototype,
  Yy = Uy.hasOwnProperty;
function Iu(e, t, n) {
  var r = e[t];
  (!(Yy.call(e, t) && Nu(r, n)) || (n === void 0 && !(t in e))) && Ah(e, t, n);
}
function pa(e, t, n, r) {
  var o = !n;
  n || (n = {});
  for (var i = -1, l = t.length; ++i < l; ) {
    var a = t[i],
      s = r ? r(n[a], e[a], a, n, e) : void 0;
    s === void 0 && (s = e[a]), o ? Ah(n, a, s) : Iu(n, a, s);
  }
  return n;
}
var xf = Math.max;
function Xy(e, t, n) {
  return (
    (t = xf(t === void 0 ? e.length - 1 : t, 0)),
    function () {
      for (
        var r = arguments, o = -1, i = xf(r.length - t, 0), l = Array(i);
        ++o < i;

      )
        l[o] = r[t + o];
      o = -1;
      for (var a = Array(t + 1); ++o < t; ) a[o] = r[o];
      return (a[t] = n(l)), Py(e, this, a);
    }
  );
}
var Gy = 9007199254740991;
function Lu(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Gy;
}
function kh(e) {
  return e != null && Lu(e.length) && !Mh(e);
}
var Jy = Object.prototype;
function Fu(e) {
  var t = e && e.constructor,
    n = (typeof t == "function" && t.prototype) || Jy;
  return e === n;
}
function Zy(e, t) {
  for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
  return r;
}
var Qy = "[object Arguments]";
function Cf(e) {
  return fr(e) && Po(e) == Qy;
}
var Oh = Object.prototype,
  e1 = Oh.hasOwnProperty,
  t1 = Oh.propertyIsEnumerable,
  n1 = Cf(
    (function () {
      return arguments;
    })()
  )
    ? Cf
    : function (e) {
        return fr(e) && e1.call(e, "callee") && !t1.call(e, "callee");
      };
const Ru = n1;
function r1() {
  return !1;
}
var Ph = typeof exports == "object" && exports && !exports.nodeType && exports,
  Sf = Ph && typeof module == "object" && module && !module.nodeType && module,
  o1 = Sf && Sf.exports === Ph,
  Ef = o1 ? pn.Buffer : void 0,
  i1 = Ef ? Ef.isBuffer : void 0,
  l1 = i1 || r1;
const Bl = l1;
var a1 = "[object Arguments]",
  s1 = "[object Array]",
  u1 = "[object Boolean]",
  c1 = "[object Date]",
  f1 = "[object Error]",
  d1 = "[object Function]",
  p1 = "[object Map]",
  h1 = "[object Number]",
  m1 = "[object Object]",
  g1 = "[object RegExp]",
  v1 = "[object Set]",
  b1 = "[object String]",
  y1 = "[object WeakMap]",
  w1 = "[object ArrayBuffer]",
  _1 = "[object DataView]",
  x1 = "[object Float32Array]",
  C1 = "[object Float64Array]",
  S1 = "[object Int8Array]",
  E1 = "[object Int16Array]",
  T1 = "[object Int32Array]",
  $1 = "[object Uint8Array]",
  M1 = "[object Uint8ClampedArray]",
  A1 = "[object Uint16Array]",
  k1 = "[object Uint32Array]",
  nt = {};
nt[x1] =
  nt[C1] =
  nt[S1] =
  nt[E1] =
  nt[T1] =
  nt[$1] =
  nt[M1] =
  nt[A1] =
  nt[k1] =
    !0;
nt[a1] =
  nt[s1] =
  nt[w1] =
  nt[u1] =
  nt[_1] =
  nt[c1] =
  nt[f1] =
  nt[d1] =
  nt[p1] =
  nt[h1] =
  nt[m1] =
  nt[g1] =
  nt[v1] =
  nt[b1] =
  nt[y1] =
    !1;
function O1(e) {
  return fr(e) && Lu(e.length) && !!nt[Po(e)];
}
function Bu(e) {
  return function (t) {
    return e(t);
  };
}
var Nh = typeof exports == "object" && exports && !exports.nodeType && exports,
  Qo = Nh && typeof module == "object" && module && !module.nodeType && module,
  P1 = Qo && Qo.exports === Nh,
  Fa = P1 && Eh.process,
  N1 = (function () {
    try {
      var e = Qo && Qo.require && Qo.require("util").types;
      return e || (Fa && Fa.binding && Fa.binding("util"));
    } catch {}
  })();
const bo = N1;
var Tf = bo && bo.isTypedArray,
  I1 = Tf ? Bu(Tf) : O1;
const Ih = I1;
var L1 = Object.prototype,
  F1 = L1.hasOwnProperty;
function Lh(e, t) {
  var n = fn(e),
    r = !n && Ru(e),
    o = !n && !r && Bl(e),
    i = !n && !r && !o && Ih(e),
    l = n || r || o || i,
    a = l ? Zy(e.length, String) : [],
    s = a.length;
  for (var u in e)
    (t || F1.call(e, u)) &&
      !(
        l &&
        (u == "length" ||
          (o && (u == "offset" || u == "parent")) ||
          (i && (u == "buffer" || u == "byteLength" || u == "byteOffset")) ||
          Pu(u, s))
      ) &&
      a.push(u);
  return a;
}
function Fh(e, t) {
  return function (n) {
    return e(t(n));
  };
}
var R1 = Fh(Object.keys, Object);
const B1 = R1;
var V1 = Object.prototype,
  D1 = V1.hasOwnProperty;
function H1(e) {
  if (!Fu(e)) return B1(e);
  var t = [];
  for (var n in Object(e)) D1.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Vu(e) {
  return kh(e) ? Lh(e) : H1(e);
}
function z1(e) {
  var t = [];
  if (e != null) for (var n in Object(e)) t.push(n);
  return t;
}
var W1 = Object.prototype,
  j1 = W1.hasOwnProperty;
function K1(e) {
  if (!dn(e)) return z1(e);
  var t = Fu(e),
    n = [];
  for (var r in e) (r == "constructor" && (t || !j1.call(e, r))) || n.push(r);
  return n;
}
function Du(e) {
  return kh(e) ? Lh(e, !0) : K1(e);
}
var q1 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  U1 = /^\w*$/;
function Y1(e, t) {
  if (fn(e)) return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || da(e)
    ? !0
    : U1.test(e) || !q1.test(e) || (t != null && e in Object(t));
}
var X1 = Yr(Object, "create");
const fi = X1;
function G1() {
  (this.__data__ = fi ? fi(null) : {}), (this.size = 0);
}
function J1(e) {
  var t = this.has(e) && delete this.__data__[e];
  return (this.size -= t ? 1 : 0), t;
}
var Z1 = "__lodash_hash_undefined__",
  Q1 = Object.prototype,
  ew = Q1.hasOwnProperty;
function tw(e) {
  var t = this.__data__;
  if (fi) {
    var n = t[e];
    return n === Z1 ? void 0 : n;
  }
  return ew.call(t, e) ? t[e] : void 0;
}
var nw = Object.prototype,
  rw = nw.hasOwnProperty;
function ow(e) {
  var t = this.__data__;
  return fi ? t[e] !== void 0 : rw.call(t, e);
}
var iw = "__lodash_hash_undefined__";
function lw(e, t) {
  var n = this.__data__;
  return (
    (this.size += this.has(e) ? 0 : 1),
    (n[e] = fi && t === void 0 ? iw : t),
    this
  );
}
function Vr(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Vr.prototype.clear = G1;
Vr.prototype.delete = J1;
Vr.prototype.get = tw;
Vr.prototype.has = ow;
Vr.prototype.set = lw;
function aw() {
  (this.__data__ = []), (this.size = 0);
}
function ha(e, t) {
  for (var n = e.length; n--; ) if (Nu(e[n][0], t)) return n;
  return -1;
}
var sw = Array.prototype,
  uw = sw.splice;
function cw(e) {
  var t = this.__data__,
    n = ha(t, e);
  if (n < 0) return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : uw.call(t, n, 1), --this.size, !0;
}
function fw(e) {
  var t = this.__data__,
    n = ha(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function dw(e) {
  return ha(this.__data__, e) > -1;
}
function pw(e, t) {
  var n = this.__data__,
    r = ha(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
}
function Xn(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Xn.prototype.clear = aw;
Xn.prototype.delete = cw;
Xn.prototype.get = fw;
Xn.prototype.has = dw;
Xn.prototype.set = pw;
var hw = Yr(pn, "Map");
const di = hw;
function mw() {
  (this.size = 0),
    (this.__data__ = {
      hash: new Vr(),
      map: new (di || Xn)(),
      string: new Vr(),
    });
}
function gw(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean"
    ? e !== "__proto__"
    : e === null;
}
function ma(e, t) {
  var n = e.__data__;
  return gw(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function vw(e) {
  var t = ma(this, e).delete(e);
  return (this.size -= t ? 1 : 0), t;
}
function bw(e) {
  return ma(this, e).get(e);
}
function yw(e) {
  return ma(this, e).has(e);
}
function ww(e, t) {
  var n = ma(this, e),
    r = n.size;
  return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
}
function Gn(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Gn.prototype.clear = mw;
Gn.prototype.delete = vw;
Gn.prototype.get = bw;
Gn.prototype.has = yw;
Gn.prototype.set = ww;
var _w = "Expected a function";
function Hu(e, t) {
  if (typeof e != "function" || (t != null && typeof t != "function"))
    throw new TypeError(_w);
  var n = function () {
    var r = arguments,
      o = t ? t.apply(this, r) : r[0],
      i = n.cache;
    if (i.has(o)) return i.get(o);
    var l = e.apply(this, r);
    return (n.cache = i.set(o, l) || i), l;
  };
  return (n.cache = new (Hu.Cache || Gn)()), n;
}
Hu.Cache = Gn;
var xw = 500;
function Cw(e) {
  var t = Hu(e, function (r) {
      return n.size === xw && n.clear(), r;
    }),
    n = t.cache;
  return t;
}
var Sw =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  Ew = /\\(\\)?/g,
  Tw = Cw(function (e) {
    var t = [];
    return (
      e.charCodeAt(0) === 46 && t.push(""),
      e.replace(Sw, function (n, r, o, i) {
        t.push(o ? i.replace(Ew, "$1") : r || n);
      }),
      t
    );
  });
const $w = Tw;
function Mw(e) {
  return e == null ? "" : $h(e);
}
function ga(e, t) {
  return fn(e) ? e : Y1(e, t) ? [e] : $w(Mw(e));
}
var Aw = 1 / 0;
function zu(e) {
  if (typeof e == "string" || da(e)) return e;
  var t = e + "";
  return t == "0" && 1 / e == -Aw ? "-0" : t;
}
function Rh(e, t) {
  t = ga(t, e);
  for (var n = 0, r = t.length; e != null && n < r; ) e = e[zu(t[n++])];
  return n && n == r ? e : void 0;
}
function Mt(e, t, n) {
  var r = e == null ? void 0 : Rh(e, t);
  return r === void 0 ? n : r;
}
function Wu(e, t) {
  for (var n = -1, r = t.length, o = e.length; ++n < r; ) e[o + n] = t[n];
  return e;
}
var $f = Gt ? Gt.isConcatSpreadable : void 0;
function kw(e) {
  return fn(e) || Ru(e) || !!($f && e && e[$f]);
}
function Bh(e, t, n, r, o) {
  var i = -1,
    l = e.length;
  for (n || (n = kw), o || (o = []); ++i < l; ) {
    var a = e[i];
    t > 0 && n(a)
      ? t > 1
        ? Bh(a, t - 1, n, r, o)
        : Wu(o, a)
      : r || (o[o.length] = a);
  }
  return o;
}
function Ow(e) {
  var t = e == null ? 0 : e.length;
  return t ? Bh(e, 1) : [];
}
function Pw(e) {
  return Wy(Xy(e, void 0, Ow), e + "");
}
var Nw = Fh(Object.getPrototypeOf, Object);
const Vh = Nw;
function ys() {
  if (!arguments.length) return [];
  var e = arguments[0];
  return fn(e) ? e : [e];
}
function Iw() {
  (this.__data__ = new Xn()), (this.size = 0);
}
function Lw(e) {
  var t = this.__data__,
    n = t.delete(e);
  return (this.size = t.size), n;
}
function Fw(e) {
  return this.__data__.get(e);
}
function Rw(e) {
  return this.__data__.has(e);
}
var Bw = 200;
function Vw(e, t) {
  var n = this.__data__;
  if (n instanceof Xn) {
    var r = n.__data__;
    if (!di || r.length < Bw - 1)
      return r.push([e, t]), (this.size = ++n.size), this;
    n = this.__data__ = new Gn(r);
  }
  return n.set(e, t), (this.size = n.size), this;
}
function Hn(e) {
  var t = (this.__data__ = new Xn(e));
  this.size = t.size;
}
Hn.prototype.clear = Iw;
Hn.prototype.delete = Lw;
Hn.prototype.get = Fw;
Hn.prototype.has = Rw;
Hn.prototype.set = Vw;
function Dw(e, t) {
  return e && pa(t, Vu(t), e);
}
function Hw(e, t) {
  return e && pa(t, Du(t), e);
}
var Dh = typeof exports == "object" && exports && !exports.nodeType && exports,
  Mf = Dh && typeof module == "object" && module && !module.nodeType && module,
  zw = Mf && Mf.exports === Dh,
  Af = zw ? pn.Buffer : void 0,
  kf = Af ? Af.allocUnsafe : void 0;
function Ww(e, t) {
  if (t) return e.slice();
  var n = e.length,
    r = kf ? kf(n) : new e.constructor(n);
  return e.copy(r), r;
}
function jw(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = 0, i = []; ++n < r; ) {
    var l = e[n];
    t(l, n, e) && (i[o++] = l);
  }
  return i;
}
function Hh() {
  return [];
}
var Kw = Object.prototype,
  qw = Kw.propertyIsEnumerable,
  Of = Object.getOwnPropertySymbols,
  Uw = Of
    ? function (e) {
        return e == null
          ? []
          : ((e = Object(e)),
            jw(Of(e), function (t) {
              return qw.call(e, t);
            }));
      }
    : Hh;
const ju = Uw;
function Yw(e, t) {
  return pa(e, ju(e), t);
}
var Xw = Object.getOwnPropertySymbols,
  Gw = Xw
    ? function (e) {
        for (var t = []; e; ) Wu(t, ju(e)), (e = Vh(e));
        return t;
      }
    : Hh;
const zh = Gw;
function Jw(e, t) {
  return pa(e, zh(e), t);
}
function Wh(e, t, n) {
  var r = t(e);
  return fn(e) ? r : Wu(r, n(e));
}
function ws(e) {
  return Wh(e, Vu, ju);
}
function Zw(e) {
  return Wh(e, Du, zh);
}
var Qw = Yr(pn, "DataView");
const _s = Qw;
var e2 = Yr(pn, "Promise");
const xs = e2;
var t2 = Yr(pn, "Set");
const Cs = t2;
var Pf = "[object Map]",
  n2 = "[object Object]",
  Nf = "[object Promise]",
  If = "[object Set]",
  Lf = "[object WeakMap]",
  Ff = "[object DataView]",
  r2 = Ur(_s),
  o2 = Ur(di),
  i2 = Ur(xs),
  l2 = Ur(Cs),
  a2 = Ur(bs),
  Cr = Po;
((_s && Cr(new _s(new ArrayBuffer(1))) != Ff) ||
  (di && Cr(new di()) != Pf) ||
  (xs && Cr(xs.resolve()) != Nf) ||
  (Cs && Cr(new Cs()) != If) ||
  (bs && Cr(new bs()) != Lf)) &&
  (Cr = function (e) {
    var t = Po(e),
      n = t == n2 ? e.constructor : void 0,
      r = n ? Ur(n) : "";
    if (r)
      switch (r) {
        case r2:
          return Ff;
        case o2:
          return Pf;
        case i2:
          return Nf;
        case l2:
          return If;
        case a2:
          return Lf;
      }
    return t;
  });
const pi = Cr;
var s2 = Object.prototype,
  u2 = s2.hasOwnProperty;
function c2(e) {
  var t = e.length,
    n = new e.constructor(t);
  return (
    t &&
      typeof e[0] == "string" &&
      u2.call(e, "index") &&
      ((n.index = e.index), (n.input = e.input)),
    n
  );
}
var f2 = pn.Uint8Array;
const Vl = f2;
function Ku(e) {
  var t = new e.constructor(e.byteLength);
  return new Vl(t).set(new Vl(e)), t;
}
function d2(e, t) {
  var n = t ? Ku(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var p2 = /\w*$/;
function h2(e) {
  var t = new e.constructor(e.source, p2.exec(e));
  return (t.lastIndex = e.lastIndex), t;
}
var Rf = Gt ? Gt.prototype : void 0,
  Bf = Rf ? Rf.valueOf : void 0;
function m2(e) {
  return Bf ? Object(Bf.call(e)) : {};
}
function g2(e, t) {
  var n = t ? Ku(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var v2 = "[object Boolean]",
  b2 = "[object Date]",
  y2 = "[object Map]",
  w2 = "[object Number]",
  _2 = "[object RegExp]",
  x2 = "[object Set]",
  C2 = "[object String]",
  S2 = "[object Symbol]",
  E2 = "[object ArrayBuffer]",
  T2 = "[object DataView]",
  $2 = "[object Float32Array]",
  M2 = "[object Float64Array]",
  A2 = "[object Int8Array]",
  k2 = "[object Int16Array]",
  O2 = "[object Int32Array]",
  P2 = "[object Uint8Array]",
  N2 = "[object Uint8ClampedArray]",
  I2 = "[object Uint16Array]",
  L2 = "[object Uint32Array]";
function F2(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case E2:
      return Ku(e);
    case v2:
    case b2:
      return new r(+e);
    case T2:
      return d2(e, n);
    case $2:
    case M2:
    case A2:
    case k2:
    case O2:
    case P2:
    case N2:
    case I2:
    case L2:
      return g2(e, n);
    case y2:
      return new r();
    case w2:
    case C2:
      return new r(e);
    case _2:
      return h2(e);
    case x2:
      return new r();
    case S2:
      return m2(e);
  }
}
function R2(e) {
  return typeof e.constructor == "function" && !Fu(e) ? Oy(Vh(e)) : {};
}
var B2 = "[object Map]";
function V2(e) {
  return fr(e) && pi(e) == B2;
}
var Vf = bo && bo.isMap,
  D2 = Vf ? Bu(Vf) : V2;
const H2 = D2;
var z2 = "[object Set]";
function W2(e) {
  return fr(e) && pi(e) == z2;
}
var Df = bo && bo.isSet,
  j2 = Df ? Bu(Df) : W2;
const K2 = j2;
var q2 = 1,
  U2 = 2,
  Y2 = 4,
  jh = "[object Arguments]",
  X2 = "[object Array]",
  G2 = "[object Boolean]",
  J2 = "[object Date]",
  Z2 = "[object Error]",
  Kh = "[object Function]",
  Q2 = "[object GeneratorFunction]",
  e_ = "[object Map]",
  t_ = "[object Number]",
  qh = "[object Object]",
  n_ = "[object RegExp]",
  r_ = "[object Set]",
  o_ = "[object String]",
  i_ = "[object Symbol]",
  l_ = "[object WeakMap]",
  a_ = "[object ArrayBuffer]",
  s_ = "[object DataView]",
  u_ = "[object Float32Array]",
  c_ = "[object Float64Array]",
  f_ = "[object Int8Array]",
  d_ = "[object Int16Array]",
  p_ = "[object Int32Array]",
  h_ = "[object Uint8Array]",
  m_ = "[object Uint8ClampedArray]",
  g_ = "[object Uint16Array]",
  v_ = "[object Uint32Array]",
  tt = {};
tt[jh] =
  tt[X2] =
  tt[a_] =
  tt[s_] =
  tt[G2] =
  tt[J2] =
  tt[u_] =
  tt[c_] =
  tt[f_] =
  tt[d_] =
  tt[p_] =
  tt[e_] =
  tt[t_] =
  tt[qh] =
  tt[n_] =
  tt[r_] =
  tt[o_] =
  tt[i_] =
  tt[h_] =
  tt[m_] =
  tt[g_] =
  tt[v_] =
    !0;
tt[Z2] = tt[Kh] = tt[l_] = !1;
function pl(e, t, n, r, o, i) {
  var l,
    a = t & q2,
    s = t & U2,
    u = t & Y2;
  if ((n && (l = o ? n(e, r, o, i) : n(e)), l !== void 0)) return l;
  if (!dn(e)) return e;
  var c = fn(e);
  if (c) {
    if (((l = c2(e)), !a)) return Ny(e, l);
  } else {
    var f = pi(e),
      d = f == Kh || f == Q2;
    if (Bl(e)) return Ww(e, a);
    if (f == qh || f == jh || (d && !o)) {
      if (((l = s || d ? {} : R2(e)), !a))
        return s ? Jw(e, Hw(l, e)) : Yw(e, Dw(l, e));
    } else {
      if (!tt[f]) return o ? e : {};
      l = F2(e, f, a);
    }
  }
  i || (i = new Hn());
  var h = i.get(e);
  if (h) return h;
  i.set(e, l),
    K2(e)
      ? e.forEach(function (v) {
          l.add(pl(v, t, n, v, e, i));
        })
      : H2(e) &&
        e.forEach(function (v, _) {
          l.set(_, pl(v, t, n, _, e, i));
        });
  var p = u ? (s ? Zw : ws) : s ? Du : Vu,
    b = c ? void 0 : p(e);
  return (
    jy(b || e, function (v, _) {
      b && ((_ = v), (v = e[_])), Iu(l, _, pl(v, t, n, _, e, i));
    }),
    l
  );
}
var b_ = 4;
function Hf(e) {
  return pl(e, b_);
}
var y_ = "__lodash_hash_undefined__";
function w_(e) {
  return this.__data__.set(e, y_), this;
}
function __(e) {
  return this.__data__.has(e);
}
function Dl(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.__data__ = new Gn(); ++t < n; ) this.add(e[t]);
}
Dl.prototype.add = Dl.prototype.push = w_;
Dl.prototype.has = __;
function x_(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e)) return !0;
  return !1;
}
function C_(e, t) {
  return e.has(t);
}
var S_ = 1,
  E_ = 2;
function Uh(e, t, n, r, o, i) {
  var l = n & S_,
    a = e.length,
    s = t.length;
  if (a != s && !(l && s > a)) return !1;
  var u = i.get(e),
    c = i.get(t);
  if (u && c) return u == t && c == e;
  var f = -1,
    d = !0,
    h = n & E_ ? new Dl() : void 0;
  for (i.set(e, t), i.set(t, e); ++f < a; ) {
    var p = e[f],
      b = t[f];
    if (r) var v = l ? r(b, p, f, t, e, i) : r(p, b, f, e, t, i);
    if (v !== void 0) {
      if (v) continue;
      d = !1;
      break;
    }
    if (h) {
      if (
        !x_(t, function (_, x) {
          if (!C_(h, x) && (p === _ || o(p, _, n, r, i))) return h.push(x);
        })
      ) {
        d = !1;
        break;
      }
    } else if (!(p === b || o(p, b, n, r, i))) {
      d = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), d;
}
function T_(e) {
  var t = -1,
    n = Array(e.size);
  return (
    e.forEach(function (r, o) {
      n[++t] = [o, r];
    }),
    n
  );
}
function $_(e) {
  var t = -1,
    n = Array(e.size);
  return (
    e.forEach(function (r) {
      n[++t] = r;
    }),
    n
  );
}
var M_ = 1,
  A_ = 2,
  k_ = "[object Boolean]",
  O_ = "[object Date]",
  P_ = "[object Error]",
  N_ = "[object Map]",
  I_ = "[object Number]",
  L_ = "[object RegExp]",
  F_ = "[object Set]",
  R_ = "[object String]",
  B_ = "[object Symbol]",
  V_ = "[object ArrayBuffer]",
  D_ = "[object DataView]",
  zf = Gt ? Gt.prototype : void 0,
  Ra = zf ? zf.valueOf : void 0;
function H_(e, t, n, r, o, i, l) {
  switch (n) {
    case D_:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      (e = e.buffer), (t = t.buffer);
    case V_:
      return !(e.byteLength != t.byteLength || !i(new Vl(e), new Vl(t)));
    case k_:
    case O_:
    case I_:
      return Nu(+e, +t);
    case P_:
      return e.name == t.name && e.message == t.message;
    case L_:
    case R_:
      return e == t + "";
    case N_:
      var a = T_;
    case F_:
      var s = r & M_;
      if ((a || (a = $_), e.size != t.size && !s)) return !1;
      var u = l.get(e);
      if (u) return u == t;
      (r |= A_), l.set(e, t);
      var c = Uh(a(e), a(t), r, o, i, l);
      return l.delete(e), c;
    case B_:
      if (Ra) return Ra.call(e) == Ra.call(t);
  }
  return !1;
}
var z_ = 1,
  W_ = Object.prototype,
  j_ = W_.hasOwnProperty;
function K_(e, t, n, r, o, i) {
  var l = n & z_,
    a = ws(e),
    s = a.length,
    u = ws(t),
    c = u.length;
  if (s != c && !l) return !1;
  for (var f = s; f--; ) {
    var d = a[f];
    if (!(l ? d in t : j_.call(t, d))) return !1;
  }
  var h = i.get(e),
    p = i.get(t);
  if (h && p) return h == t && p == e;
  var b = !0;
  i.set(e, t), i.set(t, e);
  for (var v = l; ++f < s; ) {
    d = a[f];
    var _ = e[d],
      x = t[d];
    if (r) var g = l ? r(x, _, d, t, e, i) : r(_, x, d, e, t, i);
    if (!(g === void 0 ? _ === x || o(_, x, n, r, i) : g)) {
      b = !1;
      break;
    }
    v || (v = d == "constructor");
  }
  if (b && !v) {
    var y = e.constructor,
      w = t.constructor;
    y != w &&
      "constructor" in e &&
      "constructor" in t &&
      !(
        typeof y == "function" &&
        y instanceof y &&
        typeof w == "function" &&
        w instanceof w
      ) &&
      (b = !1);
  }
  return i.delete(e), i.delete(t), b;
}
var q_ = 1,
  Wf = "[object Arguments]",
  jf = "[object Array]",
  ji = "[object Object]",
  U_ = Object.prototype,
  Kf = U_.hasOwnProperty;
function Y_(e, t, n, r, o, i) {
  var l = fn(e),
    a = fn(t),
    s = l ? jf : pi(e),
    u = a ? jf : pi(t);
  (s = s == Wf ? ji : s), (u = u == Wf ? ji : u);
  var c = s == ji,
    f = u == ji,
    d = s == u;
  if (d && Bl(e)) {
    if (!Bl(t)) return !1;
    (l = !0), (c = !1);
  }
  if (d && !c)
    return (
      i || (i = new Hn()),
      l || Ih(e) ? Uh(e, t, n, r, o, i) : H_(e, t, s, n, r, o, i)
    );
  if (!(n & q_)) {
    var h = c && Kf.call(e, "__wrapped__"),
      p = f && Kf.call(t, "__wrapped__");
    if (h || p) {
      var b = h ? e.value() : e,
        v = p ? t.value() : t;
      return i || (i = new Hn()), o(b, v, n, r, i);
    }
  }
  return d ? (i || (i = new Hn()), K_(e, t, n, r, o, i)) : !1;
}
function Yh(e, t, n, r, o) {
  return e === t
    ? !0
    : e == null || t == null || (!fr(e) && !fr(t))
    ? e !== e && t !== t
    : Y_(e, t, n, r, Yh, o);
}
function X_(e, t) {
  return e != null && t in Object(e);
}
function G_(e, t, n) {
  t = ga(t, e);
  for (var r = -1, o = t.length, i = !1; ++r < o; ) {
    var l = zu(t[r]);
    if (!(i = e != null && n(e, l))) break;
    e = e[l];
  }
  return i || ++r != o
    ? i
    : ((o = e == null ? 0 : e.length),
      !!o && Lu(o) && Pu(l, o) && (fn(e) || Ru(e)));
}
function J_(e, t) {
  return e != null && G_(e, t, X_);
}
var Z_ = function () {
  return pn.Date.now();
};
const Ba = Z_;
var Q_ = "Expected a function",
  ex = Math.max,
  tx = Math.min;
function Mn(e, t, n) {
  var r,
    o,
    i,
    l,
    a,
    s,
    u = 0,
    c = !1,
    f = !1,
    d = !0;
  if (typeof e != "function") throw new TypeError(Q_);
  (t = yf(t) || 0),
    dn(n) &&
      ((c = !!n.leading),
      (f = "maxWait" in n),
      (i = f ? ex(yf(n.maxWait) || 0, t) : i),
      (d = "trailing" in n ? !!n.trailing : d));
  function h(C) {
    var E = r,
      $ = o;
    return (r = o = void 0), (u = C), (l = e.apply($, E)), l;
  }
  function p(C) {
    return (u = C), (a = setTimeout(_, t)), c ? h(C) : l;
  }
  function b(C) {
    var E = C - s,
      $ = C - u,
      I = t - E;
    return f ? tx(I, i - $) : I;
  }
  function v(C) {
    var E = C - s,
      $ = C - u;
    return s === void 0 || E >= t || E < 0 || (f && $ >= i);
  }
  function _() {
    var C = Ba();
    if (v(C)) return x(C);
    a = setTimeout(_, b(C));
  }
  function x(C) {
    return (a = void 0), d && r ? h(C) : ((r = o = void 0), l);
  }
  function g() {
    a !== void 0 && clearTimeout(a), (u = 0), (r = s = o = a = void 0);
  }
  function y() {
    return a === void 0 ? l : x(Ba());
  }
  function w() {
    var C = Ba(),
      E = v(C);
    if (((r = arguments), (o = this), (s = C), E)) {
      if (a === void 0) return p(s);
      if (f) return clearTimeout(a), (a = setTimeout(_, t)), h(s);
    }
    return a === void 0 && (a = setTimeout(_, t)), l;
  }
  return (w.cancel = g), (w.flush = y), w;
}
function Xh(e) {
  for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
    var o = e[t];
    r[o[0]] = o[1];
  }
  return r;
}
function qf(e, t) {
  return Yh(e, t);
}
function zn(e) {
  return e == null;
}
function Gh(e, t, n, r) {
  if (!dn(e)) return e;
  t = ga(t, e);
  for (var o = -1, i = t.length, l = i - 1, a = e; a != null && ++o < i; ) {
    var s = zu(t[o]),
      u = n;
    if (s === "__proto__" || s === "constructor" || s === "prototype") return e;
    if (o != l) {
      var c = a[s];
      (u = r ? r(c, s, a) : void 0),
        u === void 0 && (u = dn(c) ? c : Pu(t[o + 1]) ? [] : {});
    }
    Iu(a, s, u), (a = a[s]);
  }
  return e;
}
function nx(e, t, n) {
  for (var r = -1, o = t.length, i = {}; ++r < o; ) {
    var l = t[r],
      a = Rh(e, l);
    n(a, l) && Gh(i, ga(l, e), a);
  }
  return i;
}
function rx(e, t) {
  return nx(e, t, function (n, r) {
    return J_(e, r);
  });
}
var ox = Pw(function (e, t) {
  return e == null ? {} : rx(e, t);
});
const ix = ox;
function lx(e, t, n) {
  return e == null ? e : Gh(e, t, n);
}
var ax = "Expected a function";
function sx(e, t, n) {
  var r = !0,
    o = !0;
  if (typeof e != "function") throw new TypeError(ax);
  return (
    dn(n) &&
      ((r = "leading" in n ? !!n.leading : r),
      (o = "trailing" in n ? !!n.trailing : o)),
    Mn(e, t, { leading: r, maxWait: t, trailing: o })
  );
}
const Vn =
  (e, t, { checkForDefaultPrevented: n = !0 } = {}) =>
  (o) => {
    const i = e == null ? void 0 : e(o);
    if (n === !1 || !i) return t == null ? void 0 : t(o);
  };
var Uf;
const lt = typeof window < "u",
  Lt = (e) => typeof e == "boolean",
  Ye = (e) => typeof e == "number",
  ux = (e) => typeof e == "string",
  Va = () => {};
lt &&
  ((Uf = window == null ? void 0 : window.navigator) == null
    ? void 0
    : Uf.userAgent) &&
  /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Ss(e) {
  return typeof e == "function" ? e() : m(e);
}
function cx(e, t) {
  function n(...r) {
    e(() => t.apply(this, r), { fn: t, thisArg: this, args: r });
  }
  return n;
}
function fx(e, t = {}) {
  let n, r;
  return (i) => {
    const l = Ss(e),
      a = Ss(t.maxWait);
    if ((n && clearTimeout(n), l <= 0 || (a !== void 0 && a <= 0)))
      return r && (clearTimeout(r), (r = null)), i();
    a &&
      !r &&
      (r = setTimeout(() => {
        n && clearTimeout(n), (r = null), i();
      }, a)),
      (n = setTimeout(() => {
        r && clearTimeout(r), (r = null), i();
      }, l));
  };
}
function dx(e) {
  return e;
}
function qu(e) {
  return Sv() ? (Ev(e), !0) : !1;
}
function px(e, t = 200, n = {}) {
  return cx(fx(t, n), e);
}
function hx(e, t = 200, n = {}) {
  const r = B(e.value),
    o = px(
      () => {
        r.value = e.value;
      },
      t,
      n
    );
  return me(e, () => o()), r;
}
function mx(e, t = !0) {
  et() ? rt(e) : t ? e() : Le(e);
}
function lr(e) {
  var t;
  const n = Ss(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Uu = lt ? window : void 0;
function _n(...e) {
  let t, n, r, o;
  if ((ux(e[0]) ? (([n, r, o] = e), (t = Uu)) : ([t, n, r, o] = e), !t))
    return Va;
  let i = Va;
  const l = me(
      () => lr(t),
      (s) => {
        i(),
          s &&
            (s.addEventListener(n, r, o),
            (i = () => {
              s.removeEventListener(n, r, o), (i = Va);
            }));
      },
      { immediate: !0, flush: "post" }
    ),
    a = () => {
      l(), i();
    };
  return qu(a), a;
}
function gx(e, t, n = {}) {
  const {
    window: r = Uu,
    ignore: o,
    capture: i = !0,
    detectIframe: l = !1,
  } = n;
  if (!r) return;
  const a = B(!0);
  let s;
  const u = (h) => {
      r.clearTimeout(s);
      const p = lr(e);
      !p || p === h.target || h.composedPath().includes(p) || !a.value || t(h);
    },
    c = (h) =>
      o &&
      o.some((p) => {
        const b = lr(p);
        return b && (h.target === b || h.composedPath().includes(b));
      }),
    f = [
      _n(r, "click", u, { passive: !0, capture: i }),
      _n(
        r,
        "pointerdown",
        (h) => {
          const p = lr(e);
          a.value = !!p && !h.composedPath().includes(p) && !c(h);
        },
        { passive: !0 }
      ),
      _n(
        r,
        "pointerup",
        (h) => {
          if (h.button === 0) {
            const p = h.composedPath();
            (h.composedPath = () => p), (s = r.setTimeout(() => u(h), 50));
          }
        },
        { passive: !0 }
      ),
      l &&
        _n(r, "blur", (h) => {
          var p;
          const b = lr(e);
          ((p = document.activeElement) == null ? void 0 : p.tagName) ===
            "IFRAME" &&
            !(b != null && b.contains(document.activeElement)) &&
            t(h);
        }),
    ].filter(Boolean);
  return () => f.forEach((h) => h());
}
function vx(e, t = !1) {
  const n = B(),
    r = () => (n.value = Boolean(e()));
  return r(), mx(r, t), n;
}
const Es =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  Ts = "__vueuse_ssr_handlers__";
Es[Ts] = Es[Ts] || {};
Es[Ts];
var Yf = Object.getOwnPropertySymbols,
  bx = Object.prototype.hasOwnProperty,
  yx = Object.prototype.propertyIsEnumerable,
  wx = (e, t) => {
    var n = {};
    for (var r in e) bx.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
    if (e != null && Yf)
      for (var r of Yf(e)) t.indexOf(r) < 0 && yx.call(e, r) && (n[r] = e[r]);
    return n;
  };
function Dr(e, t, n = {}) {
  const r = n,
    { window: o = Uu } = r,
    i = wx(r, ["window"]);
  let l;
  const a = vx(() => o && "ResizeObserver" in o),
    s = () => {
      l && (l.disconnect(), (l = void 0));
    },
    u = me(
      () => lr(e),
      (f) => {
        s(),
          a.value && o && f && ((l = new ResizeObserver(t)), l.observe(f, i));
      },
      { immediate: !0, flush: "post" }
    ),
    c = () => {
      s(), u();
    };
  return qu(c), { isSupported: a, stop: c };
}
var Xf;
(function (e) {
  (e.UP = "UP"),
    (e.RIGHT = "RIGHT"),
    (e.DOWN = "DOWN"),
    (e.LEFT = "LEFT"),
    (e.NONE = "NONE");
})(Xf || (Xf = {}));
var _x = Object.defineProperty,
  Gf = Object.getOwnPropertySymbols,
  xx = Object.prototype.hasOwnProperty,
  Cx = Object.prototype.propertyIsEnumerable,
  Jf = (e, t, n) =>
    t in e
      ? _x(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Sx = (e, t) => {
    for (var n in t || (t = {})) xx.call(t, n) && Jf(e, n, t[n]);
    if (Gf) for (var n of Gf(t)) Cx.call(t, n) && Jf(e, n, t[n]);
    return e;
  };
const Ex = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6],
};
Sx({ linear: dx }, Ex);
const xn = (e) => e === void 0,
  hi = (e) => (typeof Element > "u" ? !1 : e instanceof Element),
  Tx = (e = "") =>
    e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d"),
  hl = (e, t, n) => ({
    get value() {
      return Mt(e, t, n);
    },
    set value(r) {
      lx(e, t, r);
    },
  });
class $x extends Error {
  constructor(t) {
    super(t), (this.name = "ElementPlusError");
  }
}
function Ai(e, t) {
  throw new $x(`[${e}] ${t}`);
}
const Jh = (e = "") => e.split(" ").filter((t) => !!t.trim()),
  ml = (e, t) => {
    if (!e || !t) return !1;
    if (t.includes(" ")) throw new Error("className should not contain space.");
    return e.classList.contains(t);
  },
  Hl = (e, t) => {
    !e || !t.trim() || e.classList.add(...Jh(t));
  },
  Hr = (e, t) => {
    !e || !t.trim() || e.classList.remove(...Jh(t));
  },
  $r = (e, t) => {
    var n;
    if (!lt || !e || !t) return "";
    let r = un(t);
    r === "float" && (r = "cssFloat");
    try {
      const o = e.style[r];
      if (o) return o;
      const i =
        (n = document.defaultView) == null ? void 0 : n.getComputedStyle(e, "");
      return i ? i[r] : "";
    } catch {
      return e.style[r];
    }
  };
function yo(e, t = "px") {
  if (!e) return "";
  if (Be(e)) return e;
  if (Ye(e)) return `${e}${t}`;
}
function Mx(e, t) {
  if (!lt) return;
  if (!t) {
    e.scrollTop = 0;
    return;
  }
  const n = [];
  let r = t.offsetParent;
  for (; r !== null && e !== r && e.contains(r); )
    n.push(r), (r = r.offsetParent);
  const o = t.offsetTop + n.reduce((s, u) => s + u.offsetTop, 0),
    i = o + t.offsetHeight,
    l = e.scrollTop,
    a = l + e.clientHeight;
  o < l ? (e.scrollTop = o) : i > a && (e.scrollTop = i - e.clientHeight);
}
/*! Element Plus Icons Vue v2.0.10 */ var hn = (e, t) => {
    let n = e.__vccOpts || e;
    for (let [r, o] of t) n[r] = o;
    return n;
  },
  Ax = { name: "ArrowDown" },
  kx = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  Ox = ae(
    "path",
    {
      fill: "currentColor",
      d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z",
    },
    null,
    -1
  ),
  Px = [Ox];
function Nx(e, t, n, r, o, i) {
  return L(), te("svg", kx, Px);
}
var Yu = hn(Ax, [
    ["render", Nx],
    ["__file", "arrow-down.vue"],
  ]),
  Ix = { name: "ArrowRight" },
  Lx = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  Fx = ae(
    "path",
    {
      fill: "currentColor",
      d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z",
    },
    null,
    -1
  ),
  Rx = [Fx];
function Bx(e, t, n, r, o, i) {
  return L(), te("svg", Lx, Rx);
}
var Zh = hn(Ix, [
    ["render", Bx],
    ["__file", "arrow-right.vue"],
  ]),
  Vx = { name: "ArrowUp" },
  Dx = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  Hx = ae(
    "path",
    {
      fill: "currentColor",
      d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z",
    },
    null,
    -1
  ),
  zx = [Hx];
function Wx(e, t, n, r, o, i) {
  return L(), te("svg", Dx, zx);
}
var Qh = hn(Vx, [
    ["render", Wx],
    ["__file", "arrow-up.vue"],
  ]),
  jx = { name: "CircleCheck" },
  Kx = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  qx = ae(
    "path",
    {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z",
    },
    null,
    -1
  ),
  Ux = ae(
    "path",
    {
      fill: "currentColor",
      d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z",
    },
    null,
    -1
  ),
  Yx = [qx, Ux];
function Xx(e, t, n, r, o, i) {
  return L(), te("svg", Kx, Yx);
}
var Gx = hn(jx, [
    ["render", Xx],
    ["__file", "circle-check.vue"],
  ]),
  Jx = { name: "CircleClose" },
  Zx = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  Qx = ae(
    "path",
    {
      fill: "currentColor",
      d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z",
    },
    null,
    -1
  ),
  eC = ae(
    "path",
    {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z",
    },
    null,
    -1
  ),
  tC = [Qx, eC];
function nC(e, t, n, r, o, i) {
  return L(), te("svg", Zx, tC);
}
var Xu = hn(Jx, [
    ["render", nC],
    ["__file", "circle-close.vue"],
  ]),
  rC = { name: "Close" },
  oC = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  iC = ae(
    "path",
    {
      fill: "currentColor",
      d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z",
    },
    null,
    -1
  ),
  lC = [iC];
function aC(e, t, n, r, o, i) {
  return L(), te("svg", oC, lC);
}
var Zf = hn(rC, [
    ["render", aC],
    ["__file", "close.vue"],
  ]),
  sC = { name: "Hide" },
  uC = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  cC = ae(
    "path",
    {
      d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2L371.2 588.8ZM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z",
      fill: "currentColor",
    },
    null,
    -1
  ),
  fC = ae(
    "path",
    {
      d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z",
      fill: "currentColor",
    },
    null,
    -1
  ),
  dC = [cC, fC];
function pC(e, t, n, r, o, i) {
  return L(), te("svg", uC, dC);
}
var hC = hn(sC, [
    ["render", pC],
    ["__file", "hide.vue"],
  ]),
  mC = { name: "Loading" },
  gC = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  vC = ae(
    "path",
    {
      fill: "currentColor",
      d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z",
    },
    null,
    -1
  ),
  bC = [vC];
function yC(e, t, n, r, o, i) {
  return L(), te("svg", gC, bC);
}
var va = hn(mC, [
    ["render", yC],
    ["__file", "loading.vue"],
  ]),
  wC = { name: "Minus" },
  _C = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  xC = ae(
    "path",
    {
      fill: "currentColor",
      d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z",
    },
    null,
    -1
  ),
  CC = [xC];
function SC(e, t, n, r, o, i) {
  return L(), te("svg", _C, CC);
}
var EC = hn(wC, [
    ["render", SC],
    ["__file", "minus.vue"],
  ]),
  TC = { name: "Plus" },
  $C = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  MC = ae(
    "path",
    {
      fill: "currentColor",
      d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z",
    },
    null,
    -1
  ),
  AC = [MC];
function kC(e, t, n, r, o, i) {
  return L(), te("svg", $C, AC);
}
var OC = hn(TC, [
    ["render", kC],
    ["__file", "plus.vue"],
  ]),
  PC = { name: "View" },
  NC = { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg" },
  IC = ae(
    "path",
    {
      fill: "currentColor",
      d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z",
    },
    null,
    -1
  ),
  LC = [IC];
function FC(e, t, n, r, o, i) {
  return L(), te("svg", NC, LC);
}
var RC = hn(PC, [
  ["render", FC],
  ["__file", "view.vue"],
]);
const em = "__epPropKey",
  Fe = (e) => e,
  BC = (e) => We(e) && !!e[em],
  ba = (e, t) => {
    if (!We(e) || BC(e)) return e;
    const { values: n, required: r, default: o, type: i, validator: l } = e,
      s = {
        type: i,
        required: !!r,
        validator:
          n || l
            ? (u) => {
                let c = !1,
                  f = [];
                if (
                  (n &&
                    ((f = Array.from(n)),
                    Re(e, "default") && f.push(o),
                    c || (c = f.includes(u))),
                  l && (c || (c = l(u))),
                  !c && f.length > 0)
                ) {
                  const d = [...new Set(f)]
                    .map((h) => JSON.stringify(h))
                    .join(", ");
                  r0(
                    `Invalid prop: validation failed${
                      t ? ` for prop "${t}"` : ""
                    }. Expected one of [${d}], got value ${JSON.stringify(u)}.`
                  );
                }
                return c;
              }
            : void 0,
        [em]: !0,
      };
    return Re(e, "default") && (s.default = o), s;
  },
  Ge = (e) => Xh(Object.entries(e).map(([t, n]) => [t, ba(n, t)])),
  dr = Fe([String, Object, Function]),
  VC = { validating: va, success: Gx, error: Xu },
  pt = (e, t) => {
    if (
      ((e.install = (n) => {
        for (const r of [e, ...Object.values(t != null ? t : {})])
          n.component(r.name, r);
      }),
      t)
    )
      for (const [n, r] of Object.entries(t)) e[n] = r;
    return e;
  },
  Kt = (e) => ((e.install = St), e),
  wo = {
    tab: "Tab",
    enter: "Enter",
    space: "Space",
    left: "ArrowLeft",
    up: "ArrowUp",
    right: "ArrowRight",
    down: "ArrowDown",
    esc: "Escape",
    delete: "Delete",
    backspace: "Backspace",
    numpadEnter: "NumpadEnter",
    pageUp: "PageUp",
    pageDown: "PageDown",
    home: "Home",
    end: "End",
  },
  Xe = "update:modelValue",
  An = "change",
  Sn = "input",
  ki = ["", "default", "small", "large"],
  DC = { large: 40, default: 32, small: 24 },
  HC = (e) => DC[e || "default"],
  tm = (e) => ["", ...ki].includes(e),
  nm = (e) => /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(e),
  zC = () => Math.floor(Math.random() * 1e4),
  ro = (e) => e,
  WC = ["class", "style"],
  jC = /^on[A-Z]/,
  KC = (e = {}) => {
    const { excludeListeners: t = !1, excludeKeys: n } = e,
      r = A(() => ((n == null ? void 0 : n.value) || []).concat(WC)),
      o = et();
    return A(
      o
        ? () => {
            var i;
            return Xh(
              Object.entries((i = o.proxy) == null ? void 0 : i.$attrs).filter(
                ([l]) => !r.value.includes(l) && !(t && jC.test(l))
              )
            );
          }
        : () => ({})
    );
  },
  rm = Symbol("buttonGroupContextKey"),
  No = Symbol("checkboxGroupContextKey"),
  qC = Symbol(),
  Io = Symbol("formContextKey"),
  zr = Symbol("formItemContextKey"),
  om = Symbol("radioGroupKey"),
  im = Symbol("rowContextKey"),
  lm = Symbol("scrollbarContextKey"),
  am = Symbol("sliderContextKey"),
  Gu = Symbol("popper"),
  sm = Symbol("popperContent"),
  Ju = Symbol("elTooltip"),
  um = (e) => {
    const t = et();
    return A(() => {
      var n, r;
      return (r = ((n = t.proxy) == null ? void 0 : n.$props)[e]) != null
        ? r
        : void 0;
    });
  },
  Qf = B();
function Xr(e, t = void 0) {
  const n = et() ? Ie(qC, Qf) : Qf;
  return e
    ? A(() => {
        var r, o;
        return (o = (r = n.value) == null ? void 0 : r[e]) != null ? o : t;
      })
    : n;
}
const Kn = ba({ type: String, values: ki, required: !1 }),
  jt = (e, t = {}) => {
    const n = B(void 0),
      r = t.prop ? n : um("size"),
      o = t.global ? n : Xr("size"),
      i = t.form ? { size: void 0 } : Ie(Io, void 0),
      l = t.formItem ? { size: void 0 } : Ie(zr, void 0);
    return A(
      () =>
        r.value ||
        m(e) ||
        (l == null ? void 0 : l.size) ||
        (i == null ? void 0 : i.size) ||
        o.value ||
        ""
    );
  },
  Gr = (e) => {
    const t = um("disabled"),
      n = Ie(Io, void 0);
    return A(() => t.value || m(e) || (n == null ? void 0 : n.disabled) || !1);
  },
  Zu = (
    { from: e, replacement: t, scope: n, version: r, ref: o, type: i = "API" },
    l
  ) => {
    me(
      () => m(l),
      (a) => {},
      { immediate: !0 }
    );
  },
  UC = (e) => ({
    focus: () => {
      var t, n;
      (n = (t = e.value) == null ? void 0 : t.focus) == null || n.call(t);
    },
  }),
  Qu = "el",
  YC = "is-",
  _r = (e, t, n, r, o) => {
    let i = `${e}-${t}`;
    return n && (i += `-${n}`), r && (i += `__${r}`), o && (i += `--${o}`), i;
  },
  Ee = (e) => {
    const t = Xr("namespace", Qu);
    return {
      namespace: t,
      b: (p = "") => _r(t.value, e, p, "", ""),
      e: (p) => (p ? _r(t.value, e, "", p, "") : ""),
      m: (p) => (p ? _r(t.value, e, "", "", p) : ""),
      be: (p, b) => (p && b ? _r(t.value, e, p, b, "") : ""),
      em: (p, b) => (p && b ? _r(t.value, e, "", p, b) : ""),
      bm: (p, b) => (p && b ? _r(t.value, e, p, "", b) : ""),
      bem: (p, b, v) => (p && b && v ? _r(t.value, e, p, b, v) : ""),
      is: (p, ...b) => {
        const v = b.length >= 1 ? b[0] : !0;
        return p && v ? `${YC}${p}` : "";
      },
      cssVar: (p) => {
        const b = {};
        for (const v in p) p[v] && (b[`--${t.value}-${v}`] = p[v]);
        return b;
      },
      cssVarName: (p) => `--${t.value}-${p}`,
      cssVarBlock: (p) => {
        const b = {};
        for (const v in p) p[v] && (b[`--${t.value}-${e}-${v}`] = p[v]);
        return b;
      },
      cssVarBlockName: (p) => `--${t.value}-${e}-${p}`,
    };
  },
  XC = { prefix: Math.floor(Math.random() * 1e4), current: 0 },
  GC = Symbol("elIdInjection"),
  ya = (e) => {
    const t = Ie(GC, XC),
      n = Xr("namespace", Qu);
    return A(() => m(e) || `${n.value}-id-${t.prefix}-${t.current++}`);
  },
  On = () => {
    const e = Ie(Io, void 0),
      t = Ie(zr, void 0);
    return { form: e, formItem: t };
  },
  Lo = (
    e,
    { formItemContext: t, disableIdGeneration: n, disableIdManagement: r }
  ) => {
    n || (n = B(!1)), r || (r = B(!1));
    const o = B();
    let i;
    const l = A(() => {
      var a;
      return !!(
        !e.label &&
        t &&
        t.inputIds &&
        ((a = t.inputIds) == null ? void 0 : a.length) <= 1
      );
    });
    return (
      rt(() => {
        i = me(
          [$n(e, "id"), n],
          ([a, s]) => {
            const u = a != null ? a : s ? void 0 : ya().value;
            u !== o.value &&
              (t != null &&
                t.removeInputId &&
                (o.value && t.removeInputId(o.value),
                !(r != null && r.value) && !s && u && t.addInputId(u)),
              (o.value = u));
          },
          { immediate: !0 }
        );
      }),
      $i(() => {
        i && i(),
          t != null && t.removeInputId && o.value && t.removeInputId(o.value);
      }),
      { isLabeledByFormItem: l, inputId: o }
    );
  };
var JC = {
  name: "en",
  el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description:
        "current color is {color}. press enter to select a new color.",
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt:
        "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday",
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec",
      },
    },
    inputNumber: { decrease: "decrease number", increase: "increase number" },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select",
    },
    dropdown: { toggleDropdown: "Toggle Dropdown" },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data",
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      deprecationWarning:
        "Deprecated usages detected, please refer to the el-pagination documentation for more details",
    },
    dialog: { close: "Close this dialog" },
    drawer: { close: "Close this dialog" },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog",
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue",
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value",
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum",
    },
    tree: { emptyText: "No Data" },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked",
    },
    image: { error: "FAILED" },
    pageHeader: { title: "Back" },
    popconfirm: { confirmButtonText: "Yes", cancelButtonText: "No" },
  },
};
const ZC = (e) => (t, n) => QC(t, n, m(e)),
  QC = (e, t, n) =>
    Mt(n, e, e).replace(/\{(\w+)\}/g, (r, o) => {
      var i;
      return `${(i = t == null ? void 0 : t[o]) != null ? i : `{${o}}`}`;
    }),
  e8 = (e) => {
    const t = A(() => m(e).name),
      n = Qe(e) ? e : B(e);
    return { lang: t, locale: n, t: ZC(e) };
  },
  Jr = () => {
    const e = Xr("locale");
    return e8(A(() => e.value || JC));
  },
  t8 = ba({ type: Fe(Boolean), default: null }),
  n8 = ba({ type: Fe(Function) }),
  r8 = (e) => {
    const t = `update:${e}`,
      n = `onUpdate:${e}`,
      r = [t],
      o = { [e]: t8, [n]: n8 };
    return {
      useModelToggle: ({
        indicator: l,
        toggleReason: a,
        shouldHideWhenRouteChanges: s,
        shouldProceed: u,
        onShow: c,
        onHide: f,
      }) => {
        const d = et(),
          { emit: h } = d,
          p = d.props,
          b = A(() => Te(p[n])),
          v = A(() => p[e] === null),
          _ = (E) => {
            l.value !== !0 &&
              ((l.value = !0), a && (a.value = E), Te(c) && c(E));
          },
          x = (E) => {
            l.value !== !1 &&
              ((l.value = !1), a && (a.value = E), Te(f) && f(E));
          },
          g = (E) => {
            if (p.disabled === !0 || (Te(u) && !u())) return;
            const $ = b.value && lt;
            $ && h(t, !0), (v.value || !$) && _(E);
          },
          y = (E) => {
            if (p.disabled === !0 || !lt) return;
            const $ = b.value && lt;
            $ && h(t, !1), (v.value || !$) && x(E);
          },
          w = (E) => {
            !Lt(E) ||
              (p.disabled && E
                ? b.value && h(t, !1)
                : l.value !== E && (E ? _() : x()));
          },
          C = () => {
            l.value ? y() : g();
          };
        return (
          me(() => p[e], w),
          s &&
            d.appContext.config.globalProperties.$route !== void 0 &&
            me(
              () => ({ ...d.proxy.$route }),
              () => {
                s.value && l.value && y();
              }
            ),
          rt(() => {
            w(p[e]);
          }),
          { hide: y, show: g, toggle: C, hasUpdateHandler: b }
        );
      },
      useModelToggleProps: o,
      useModelToggleEmits: r,
    };
  };
function o8() {
  let e;
  const t = (r, o) => {
      n(), (e = window.setTimeout(r, o));
    },
    n = () => window.clearTimeout(e);
  return qu(() => n()), { registerTimeout: t, cancelTimeout: n };
}
let oo = [];
const ed = (e) => {
    const t = e;
    t.key === wo.esc && oo.forEach((n) => n(t));
  },
  i8 = (e) => {
    rt(() => {
      oo.length === 0 && document.addEventListener("keydown", ed),
        lt && oo.push(e);
    }),
      Bt(() => {
        (oo = oo.filter((t) => t !== e)),
          oo.length === 0 && lt && document.removeEventListener("keydown", ed);
      });
  };
let td;
const l8 = Xr("namespace", Qu),
  cm = `${l8.value}-popper-container-${zC()}`,
  fm = `#${cm}`,
  a8 = () => {
    const e = document.createElement("div");
    return (e.id = cm), document.body.appendChild(e), e;
  },
  s8 = () => {
    ua(() => {
      !lt || ((!td || !document.body.querySelector(fm)) && (td = a8()));
    });
  },
  u8 = Ge({
    showAfter: { type: Number, default: 0 },
    hideAfter: { type: Number, default: 200 },
  }),
  c8 = ({ showAfter: e, hideAfter: t, open: n, close: r }) => {
    const { registerTimeout: o } = o8();
    return {
      onOpen: (a) => {
        o(() => {
          n(a);
        }, m(e));
      },
      onClose: (a) => {
        o(() => {
          r(a);
        }, m(t));
      },
    };
  },
  dm = Symbol("elForwardRef"),
  f8 = (e) => {
    dt(dm, {
      setForwardRef: (n) => {
        e.value = n;
      },
    });
  },
  d8 = (e) => ({
    mounted(t) {
      e(t);
    },
    updated(t) {
      e(t);
    },
    unmounted() {
      e(null);
    },
  }),
  nd = B(0),
  ec = () => {
    const e = Xr("zIndex", 2e3),
      t = A(() => e.value + nd.value);
    return {
      initialZIndex: e,
      currentZIndex: t,
      nextZIndex: () => (nd.value++, t.value),
    };
  };
function p8(e) {
  const t = B();
  function n() {
    if (e.value == null) return;
    const { selectionStart: o, selectionEnd: i, value: l } = e.value;
    if (o == null || i == null) return;
    const a = l.slice(0, Math.max(0, o)),
      s = l.slice(Math.max(0, i));
    t.value = {
      selectionStart: o,
      selectionEnd: i,
      value: l,
      beforeTxt: a,
      afterTxt: s,
    };
  }
  function r() {
    if (e.value == null || t.value == null) return;
    const { value: o } = e.value,
      { beforeTxt: i, afterTxt: l, selectionStart: a } = t.value;
    if (i == null || l == null || a == null) return;
    let s = o.length;
    if (o.endsWith(l)) s = o.length - l.length;
    else if (o.startsWith(i)) s = i.length;
    else {
      const u = i[a - 1],
        c = o.indexOf(u, a - 1);
      c !== -1 && (s = c + 1);
    }
    e.value.setSelectionRange(s, s);
  }
  return [n, r];
}
var De = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t) n[r] = o;
  return n;
};
const h8 = Ge({
    size: { type: Fe([Number, String]) },
    color: { type: String },
  }),
  m8 = se({ name: "ElIcon", inheritAttrs: !1 }),
  g8 = se({
    ...m8,
    props: h8,
    setup(e) {
      const t = e,
        n = Ee("icon"),
        r = A(() => {
          const { size: o, color: i } = t;
          return !o && !i
            ? {}
            : { fontSize: xn(o) ? void 0 : yo(o), "--color": i };
        });
      return (o, i) => (
        L(),
        te(
          "i",
          Lr({ class: m(n).b(), style: m(r) }, o.$attrs),
          [Oe(o.$slots, "default")],
          16
        )
      );
    },
  });
var v8 = De(g8, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue",
  ],
]);
const at = pt(v8);
let tn;
const b8 = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,
  y8 = [
    "letter-spacing",
    "line-height",
    "padding-top",
    "padding-bottom",
    "font-family",
    "font-weight",
    "font-size",
    "text-rendering",
    "text-transform",
    "width",
    "text-indent",
    "padding-left",
    "padding-right",
    "border-width",
    "box-sizing",
  ];
function w8(e) {
  const t = window.getComputedStyle(e),
    n = t.getPropertyValue("box-sizing"),
    r =
      Number.parseFloat(t.getPropertyValue("padding-bottom")) +
      Number.parseFloat(t.getPropertyValue("padding-top")),
    o =
      Number.parseFloat(t.getPropertyValue("border-bottom-width")) +
      Number.parseFloat(t.getPropertyValue("border-top-width"));
  return {
    contextStyle: y8.map((l) => `${l}:${t.getPropertyValue(l)}`).join(";"),
    paddingSize: r,
    borderSize: o,
    boxSizing: n,
  };
}
function rd(e, t = 1, n) {
  var r;
  tn ||
    ((tn = document.createElement("textarea")), document.body.appendChild(tn));
  const {
    paddingSize: o,
    borderSize: i,
    boxSizing: l,
    contextStyle: a,
  } = w8(e);
  tn.setAttribute("style", `${a};${b8}`),
    (tn.value = e.value || e.placeholder || "");
  let s = tn.scrollHeight;
  const u = {};
  l === "border-box" ? (s = s + i) : l === "content-box" && (s = s - o),
    (tn.value = "");
  const c = tn.scrollHeight - o;
  if (Ye(t)) {
    let f = c * t;
    l === "border-box" && (f = f + o + i),
      (s = Math.max(f, s)),
      (u.minHeight = `${f}px`);
  }
  if (Ye(n)) {
    let f = c * n;
    l === "border-box" && (f = f + o + i), (s = Math.min(f, s));
  }
  return (
    (u.height = `${s}px`),
    (r = tn.parentNode) == null || r.removeChild(tn),
    (tn = void 0),
    u
  );
}
const _8 = Ge({
    id: { type: String, default: void 0 },
    size: Kn,
    disabled: Boolean,
    modelValue: { type: Fe([String, Number, Object]), default: "" },
    type: { type: String, default: "text" },
    resize: {
      type: String,
      values: ["none", "both", "horizontal", "vertical"],
    },
    autosize: { type: Fe([Boolean, Object]), default: !1 },
    autocomplete: { type: String, default: "off" },
    formatter: { type: Function },
    parser: { type: Function },
    placeholder: { type: String },
    form: { type: String },
    readonly: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    showPassword: { type: Boolean, default: !1 },
    showWordLimit: { type: Boolean, default: !1 },
    suffixIcon: { type: dr },
    prefixIcon: { type: dr },
    containerRole: { type: String, default: void 0 },
    label: { type: String, default: void 0 },
    tabindex: { type: [String, Number], default: 0 },
    validateEvent: { type: Boolean, default: !0 },
    inputStyle: { type: Fe([Object, Array, String]), default: () => ro({}) },
  }),
  x8 = {
    [Xe]: (e) => Be(e),
    input: (e) => Be(e),
    change: (e) => Be(e),
    focus: (e) => e instanceof FocusEvent,
    blur: (e) => e instanceof FocusEvent,
    clear: () => !0,
    mouseleave: (e) => e instanceof MouseEvent,
    mouseenter: (e) => e instanceof MouseEvent,
    keydown: (e) => e instanceof Event,
    compositionstart: (e) => e instanceof CompositionEvent,
    compositionupdate: (e) => e instanceof CompositionEvent,
    compositionend: (e) => e instanceof CompositionEvent,
  },
  C8 = ["role"],
  S8 = [
    "id",
    "type",
    "disabled",
    "formatter",
    "parser",
    "readonly",
    "autocomplete",
    "tabindex",
    "aria-label",
    "placeholder",
    "form",
  ],
  E8 = [
    "id",
    "tabindex",
    "disabled",
    "readonly",
    "autocomplete",
    "aria-label",
    "placeholder",
    "form",
  ],
  T8 = se({ name: "ElInput", inheritAttrs: !1 }),
  $8 = se({
    ...T8,
    props: _8,
    emits: x8,
    setup(e, { expose: t, emit: n }) {
      const r = e,
        o = cb(),
        i = Oo(),
        l = A(() => {
          const k = {};
          return (
            r.containerRole === "combobox" &&
              ((k["aria-haspopup"] = o["aria-haspopup"]),
              (k["aria-owns"] = o["aria-owns"]),
              (k["aria-expanded"] = o["aria-expanded"])),
            k
          );
        }),
        a = KC({ excludeKeys: A(() => Object.keys(l.value)) }),
        { form: s, formItem: u } = On(),
        { inputId: c } = Lo(r, { formItemContext: u }),
        f = jt(),
        d = Gr(),
        h = Ee("input"),
        p = Ee("textarea"),
        b = uo(),
        v = uo(),
        _ = B(!1),
        x = B(!1),
        g = B(!1),
        y = B(!1),
        w = B(),
        C = uo(r.inputStyle),
        E = A(() => b.value || v.value),
        $ = A(() => {
          var k;
          return (k = s == null ? void 0 : s.statusIcon) != null ? k : !1;
        }),
        I = A(() => (u == null ? void 0 : u.validateState) || ""),
        D = A(() => I.value && VC[I.value]),
        P = A(() => (y.value ? RC : hC)),
        O = A(() => [o.style, r.inputStyle]),
        S = A(() => [r.inputStyle, C.value, { resize: r.resize }]),
        N = A(() => (zn(r.modelValue) ? "" : String(r.modelValue))),
        X = A(
          () =>
            r.clearable &&
            !d.value &&
            !r.readonly &&
            !!N.value &&
            (_.value || x.value)
        ),
        K = A(
          () =>
            r.showPassword &&
            !d.value &&
            !r.readonly &&
            !!N.value &&
            (!!N.value || _.value)
        ),
        q = A(
          () =>
            r.showWordLimit &&
            !!a.value.maxlength &&
            (r.type === "text" || r.type === "textarea") &&
            !d.value &&
            !r.readonly &&
            !r.showPassword
        ),
        V = A(() => Array.from(N.value).length),
        R = A(() => !!q.value && V.value > Number(a.value.maxlength)),
        ne = A(
          () =>
            !!i.suffix ||
            !!r.suffixIcon ||
            X.value ||
            r.showPassword ||
            q.value ||
            (!!I.value && $.value)
        ),
        [ie, J] = p8(b);
      Dr(v, (k) => {
        if (!q.value || r.resize !== "both") return;
        const j = k[0],
          { width: de } = j.contentRect;
        w.value = { right: `calc(100% - ${de + 15 + 6}px)` };
      });
      const ve = () => {
          const { type: k, autosize: j } = r;
          if (!(!lt || k !== "textarea"))
            if (j) {
              const de = We(j) ? j.minRows : void 0,
                fe = We(j) ? j.maxRows : void 0;
              C.value = { ...rd(v.value, de, fe) };
            } else C.value = { minHeight: rd(v.value).minHeight };
        },
        $e = () => {
          const k = E.value;
          !k || k.value === N.value || (k.value = N.value);
        },
        Ce = async (k) => {
          ie();
          let { value: j } = k.target;
          if (
            (r.formatter &&
              ((j = r.parser ? r.parser(j) : j), (j = r.formatter(j))),
            !g.value)
          ) {
            if (j === N.value) {
              $e();
              return;
            }
            n(Xe, j), n("input", j), await Le(), $e(), J();
          }
        },
        ue = (k) => {
          n("change", k.target.value);
        },
        Q = (k) => {
          n("compositionstart", k), (g.value = !0);
        },
        ce = (k) => {
          var j;
          n("compositionupdate", k);
          const de = (j = k.target) == null ? void 0 : j.value,
            fe = de[de.length - 1] || "";
          g.value = !nm(fe);
        },
        Me = (k) => {
          n("compositionend", k), g.value && ((g.value = !1), Ce(k));
        },
        _e = () => {
          (y.value = !y.value), je();
        },
        je = async () => {
          var k;
          await Le(), (k = E.value) == null || k.focus();
        },
        T = () => {
          var k;
          return (k = E.value) == null ? void 0 : k.blur();
        },
        M = (k) => {
          (_.value = !0), n("focus", k);
        },
        H = (k) => {
          var j;
          (_.value = !1),
            n("blur", k),
            r.validateEvent &&
              ((j = u == null ? void 0 : u.validate) == null ||
                j.call(u, "blur").catch((de) => void 0));
        },
        Y = (k) => {
          (x.value = !1), n("mouseleave", k);
        },
        U = (k) => {
          (x.value = !0), n("mouseenter", k);
        },
        z = (k) => {
          n("keydown", k);
        },
        ee = () => {
          var k;
          (k = E.value) == null || k.select();
        },
        Z = () => {
          n(Xe, ""), n("change", ""), n("clear"), n("input", "");
        };
      return (
        me(
          () => r.modelValue,
          () => {
            var k;
            Le(() => ve()),
              r.validateEvent &&
                ((k = u == null ? void 0 : u.validate) == null ||
                  k.call(u, "change").catch((j) => void 0));
          }
        ),
        me(N, () => $e()),
        me(
          () => r.type,
          async () => {
            await Le(), $e(), ve();
          }
        ),
        rt(() => {
          !r.formatter && r.parser, $e(), Le(ve);
        }),
        t({
          input: b,
          textarea: v,
          ref: E,
          textareaStyle: S,
          autosize: $n(r, "autosize"),
          focus: je,
          blur: T,
          select: ee,
          clear: Z,
          resizeTextarea: ve,
        }),
        (k, j) =>
          ot(
            (L(),
            te(
              "div",
              Lr(m(l), {
                class: [
                  k.type === "textarea" ? m(p).b() : m(h).b(),
                  m(h).m(m(f)),
                  m(h).is("disabled", m(d)),
                  m(h).is("exceed", m(R)),
                  {
                    [m(h).b("group")]: k.$slots.prepend || k.$slots.append,
                    [m(h).bm("group", "append")]: k.$slots.append,
                    [m(h).bm("group", "prepend")]: k.$slots.prepend,
                    [m(h).m("prefix")]: k.$slots.prefix || k.prefixIcon,
                    [m(h).m("suffix")]:
                      k.$slots.suffix ||
                      k.suffixIcon ||
                      k.clearable ||
                      k.showPassword,
                    [m(h).bm("suffix", "password-clear")]: m(X) && m(K),
                  },
                  k.$attrs.class,
                ],
                style: m(O),
                role: k.containerRole,
                onMouseenter: U,
                onMouseleave: Y,
              }),
              [
                ge(" input "),
                k.type !== "textarea"
                  ? (L(),
                    te(
                      Ue,
                      { key: 0 },
                      [
                        ge(" prepend slot "),
                        k.$slots.prepend
                          ? (L(),
                            te(
                              "div",
                              { key: 0, class: W(m(h).be("group", "prepend")) },
                              [Oe(k.$slots, "prepend")],
                              2
                            ))
                          : ge("v-if", !0),
                        ae(
                          "div",
                          {
                            class: W([
                              m(h).e("wrapper"),
                              m(h).is("focus", _.value),
                            ]),
                          },
                          [
                            ge(" prefix slot "),
                            k.$slots.prefix || k.prefixIcon
                              ? (L(),
                                te(
                                  "span",
                                  { key: 0, class: W(m(h).e("prefix")) },
                                  [
                                    ae(
                                      "span",
                                      { class: W(m(h).e("prefix-inner")) },
                                      [
                                        Oe(k.$slots, "prefix"),
                                        k.prefixIcon
                                          ? (L(),
                                            he(
                                              m(at),
                                              {
                                                key: 0,
                                                class: W(m(h).e("icon")),
                                              },
                                              {
                                                default: re(() => [
                                                  (L(), he(mt(k.prefixIcon))),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["class"]
                                            ))
                                          : ge("v-if", !0),
                                      ],
                                      2
                                    ),
                                  ],
                                  2
                                ))
                              : ge("v-if", !0),
                            ae(
                              "input",
                              Lr(
                                {
                                  id: m(c),
                                  ref_key: "input",
                                  ref: b,
                                  class: m(h).e("inner"),
                                },
                                m(a),
                                {
                                  type: k.showPassword
                                    ? y.value
                                      ? "text"
                                      : "password"
                                    : k.type,
                                  disabled: m(d),
                                  formatter: k.formatter,
                                  parser: k.parser,
                                  readonly: k.readonly,
                                  autocomplete: k.autocomplete,
                                  tabindex: k.tabindex,
                                  "aria-label": k.label,
                                  placeholder: k.placeholder,
                                  style: k.inputStyle,
                                  form: r.form,
                                  onCompositionstart: Q,
                                  onCompositionupdate: ce,
                                  onCompositionend: Me,
                                  onInput: Ce,
                                  onFocus: M,
                                  onBlur: H,
                                  onChange: ue,
                                  onKeydown: z,
                                }
                              ),
                              null,
                              16,
                              S8
                            ),
                            ge(" suffix slot "),
                            m(ne)
                              ? (L(),
                                te(
                                  "span",
                                  { key: 1, class: W(m(h).e("suffix")) },
                                  [
                                    ae(
                                      "span",
                                      { class: W(m(h).e("suffix-inner")) },
                                      [
                                        !m(X) || !m(K) || !m(q)
                                          ? (L(),
                                            te(
                                              Ue,
                                              { key: 0 },
                                              [
                                                Oe(k.$slots, "suffix"),
                                                k.suffixIcon
                                                  ? (L(),
                                                    he(
                                                      m(at),
                                                      {
                                                        key: 0,
                                                        class: W(
                                                          m(h).e("icon")
                                                        ),
                                                      },
                                                      {
                                                        default: re(() => [
                                                          (L(),
                                                          he(mt(k.suffixIcon))),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ["class"]
                                                    ))
                                                  : ge("v-if", !0),
                                              ],
                                              64
                                            ))
                                          : ge("v-if", !0),
                                        m(X)
                                          ? (L(),
                                            he(
                                              m(at),
                                              {
                                                key: 1,
                                                class: W([
                                                  m(h).e("icon"),
                                                  m(h).e("clear"),
                                                ]),
                                                onMousedown: it(m(St), [
                                                  "prevent",
                                                ]),
                                                onClick: Z,
                                              },
                                              {
                                                default: re(() => [oe(m(Xu))]),
                                                _: 1,
                                              },
                                              8,
                                              ["class", "onMousedown"]
                                            ))
                                          : ge("v-if", !0),
                                        m(K)
                                          ? (L(),
                                            he(
                                              m(at),
                                              {
                                                key: 2,
                                                class: W([
                                                  m(h).e("icon"),
                                                  m(h).e("password"),
                                                ]),
                                                onClick: _e,
                                              },
                                              {
                                                default: re(() => [
                                                  (L(), he(mt(m(P)))),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["class"]
                                            ))
                                          : ge("v-if", !0),
                                        m(q)
                                          ? (L(),
                                            te(
                                              "span",
                                              {
                                                key: 3,
                                                class: W(m(h).e("count")),
                                              },
                                              [
                                                ae(
                                                  "span",
                                                  {
                                                    class: W(
                                                      m(h).e("count-inner")
                                                    ),
                                                  },
                                                  Je(m(V)) +
                                                    " / " +
                                                    Je(m(a).maxlength),
                                                  3
                                                ),
                                              ],
                                              2
                                            ))
                                          : ge("v-if", !0),
                                        m(I) && m(D) && m($)
                                          ? (L(),
                                            he(
                                              m(at),
                                              {
                                                key: 4,
                                                class: W([
                                                  m(h).e("icon"),
                                                  m(h).e("validateIcon"),
                                                  m(h).is(
                                                    "loading",
                                                    m(I) === "validating"
                                                  ),
                                                ]),
                                              },
                                              {
                                                default: re(() => [
                                                  (L(), he(mt(m(D)))),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["class"]
                                            ))
                                          : ge("v-if", !0),
                                      ],
                                      2
                                    ),
                                  ],
                                  2
                                ))
                              : ge("v-if", !0),
                          ],
                          2
                        ),
                        ge(" append slot "),
                        k.$slots.append
                          ? (L(),
                            te(
                              "div",
                              { key: 1, class: W(m(h).be("group", "append")) },
                              [Oe(k.$slots, "append")],
                              2
                            ))
                          : ge("v-if", !0),
                      ],
                      64
                    ))
                  : (L(),
                    te(
                      Ue,
                      { key: 1 },
                      [
                        ge(" textarea "),
                        ae(
                          "textarea",
                          Lr(
                            {
                              id: m(c),
                              ref_key: "textarea",
                              ref: v,
                              class: m(p).e("inner"),
                            },
                            m(a),
                            {
                              tabindex: k.tabindex,
                              disabled: m(d),
                              readonly: k.readonly,
                              autocomplete: k.autocomplete,
                              style: m(S),
                              "aria-label": k.label,
                              placeholder: k.placeholder,
                              form: r.form,
                              onCompositionstart: Q,
                              onCompositionupdate: ce,
                              onCompositionend: Me,
                              onInput: Ce,
                              onFocus: M,
                              onBlur: H,
                              onChange: ue,
                              onKeydown: z,
                            }
                          ),
                          null,
                          16,
                          E8
                        ),
                        m(q)
                          ? (L(),
                            te(
                              "span",
                              {
                                key: 0,
                                style: He(w.value),
                                class: W(m(h).e("count")),
                              },
                              Je(m(V)) + " / " + Je(m(a).maxlength),
                              7
                            ))
                          : ge("v-if", !0),
                      ],
                      64
                    )),
              ],
              16,
              C8
            )),
            [[cn, k.type !== "hidden"]]
          )
      );
    },
  });
var M8 = De($8, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue",
  ],
]);
const tc = pt(M8),
  io = 4,
  A8 = {
    vertical: {
      offset: "offsetHeight",
      scroll: "scrollTop",
      scrollSize: "scrollHeight",
      size: "height",
      key: "vertical",
      axis: "Y",
      client: "clientY",
      direction: "top",
    },
    horizontal: {
      offset: "offsetWidth",
      scroll: "scrollLeft",
      scrollSize: "scrollWidth",
      size: "width",
      key: "horizontal",
      axis: "X",
      client: "clientX",
      direction: "left",
    },
  },
  k8 = ({ move: e, size: t, bar: n }) => ({
    [n.size]: t,
    transform: `translate${n.axis}(${e}%)`,
  }),
  O8 = Ge({
    vertical: Boolean,
    size: String,
    move: Number,
    ratio: { type: Number, required: !0 },
    always: Boolean,
  }),
  P8 = "Thumb",
  N8 = se({
    __name: "thumb",
    props: O8,
    setup(e) {
      const t = e,
        n = Ie(lm),
        r = Ee("scrollbar");
      n || Ai(P8, "can not inject scrollbar context");
      const o = B(),
        i = B(),
        l = B({}),
        a = B(!1);
      let s = !1,
        u = !1,
        c = lt ? document.onselectstart : null;
      const f = A(() => A8[t.vertical ? "vertical" : "horizontal"]),
        d = A(() => k8({ size: t.size, move: t.move, bar: f.value })),
        h = A(
          () =>
            o.value[f.value.offset] ** 2 /
            n.wrapElement[f.value.scrollSize] /
            t.ratio /
            i.value[f.value.offset]
        ),
        p = (C) => {
          var E;
          if ((C.stopPropagation(), C.ctrlKey || [1, 2].includes(C.button)))
            return;
          (E = window.getSelection()) == null || E.removeAllRanges(), v(C);
          const $ = C.currentTarget;
          !$ ||
            (l.value[f.value.axis] =
              $[f.value.offset] -
              (C[f.value.client] -
                $.getBoundingClientRect()[f.value.direction]));
        },
        b = (C) => {
          if (!i.value || !o.value || !n.wrapElement) return;
          const E = Math.abs(
              C.target.getBoundingClientRect()[f.value.direction] -
                C[f.value.client]
            ),
            $ = i.value[f.value.offset] / 2,
            I = ((E - $) * 100 * h.value) / o.value[f.value.offset];
          n.wrapElement[f.value.scroll] =
            (I * n.wrapElement[f.value.scrollSize]) / 100;
        },
        v = (C) => {
          C.stopImmediatePropagation(),
            (s = !0),
            document.addEventListener("mousemove", _),
            document.addEventListener("mouseup", x),
            (c = document.onselectstart),
            (document.onselectstart = () => !1);
        },
        _ = (C) => {
          if (!o.value || !i.value || s === !1) return;
          const E = l.value[f.value.axis];
          if (!E) return;
          const $ =
              (o.value.getBoundingClientRect()[f.value.direction] -
                C[f.value.client]) *
              -1,
            I = i.value[f.value.offset] - E,
            D = (($ - I) * 100 * h.value) / o.value[f.value.offset];
          n.wrapElement[f.value.scroll] =
            (D * n.wrapElement[f.value.scrollSize]) / 100;
        },
        x = () => {
          (s = !1),
            (l.value[f.value.axis] = 0),
            document.removeEventListener("mousemove", _),
            document.removeEventListener("mouseup", x),
            w(),
            u && (a.value = !1);
        },
        g = () => {
          (u = !1), (a.value = !!t.size);
        },
        y = () => {
          (u = !0), (a.value = s);
        };
      Bt(() => {
        w(), document.removeEventListener("mouseup", x);
      });
      const w = () => {
        document.onselectstart !== c && (document.onselectstart = c);
      };
      return (
        _n($n(n, "scrollbarElement"), "mousemove", g),
        _n($n(n, "scrollbarElement"), "mouseleave", y),
        (C, E) => (
          L(),
          he(
            hr,
            { name: m(r).b("fade"), persisted: "" },
            {
              default: re(() => [
                ot(
                  ae(
                    "div",
                    {
                      ref_key: "instance",
                      ref: o,
                      class: W([m(r).e("bar"), m(r).is(m(f).key)]),
                      onMousedown: b,
                    },
                    [
                      ae(
                        "div",
                        {
                          ref_key: "thumb",
                          ref: i,
                          class: W(m(r).e("thumb")),
                          style: He(m(d)),
                          onMousedown: p,
                        },
                        null,
                        38
                      ),
                    ],
                    34
                  ),
                  [[cn, C.always || a.value]]
                ),
              ]),
              _: 1,
            },
            8,
            ["name"]
          )
        )
      );
    },
  });
var od = De(N8, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue",
  ],
]);
const I8 = Ge({
    always: { type: Boolean, default: !0 },
    width: String,
    height: String,
    ratioX: { type: Number, default: 1 },
    ratioY: { type: Number, default: 1 },
  }),
  L8 = se({
    __name: "bar",
    props: I8,
    setup(e, { expose: t }) {
      const n = e,
        r = B(0),
        o = B(0);
      return (
        t({
          handleScroll: (l) => {
            if (l) {
              const a = l.offsetHeight - io,
                s = l.offsetWidth - io;
              (o.value = ((l.scrollTop * 100) / a) * n.ratioY),
                (r.value = ((l.scrollLeft * 100) / s) * n.ratioX);
            }
          },
        }),
        (l, a) => (
          L(),
          te(
            Ue,
            null,
            [
              oe(
                od,
                {
                  move: r.value,
                  ratio: l.ratioX,
                  size: l.width,
                  always: l.always,
                },
                null,
                8,
                ["move", "ratio", "size", "always"]
              ),
              oe(
                od,
                {
                  move: o.value,
                  ratio: l.ratioY,
                  size: l.height,
                  vertical: "",
                  always: l.always,
                },
                null,
                8,
                ["move", "ratio", "size", "always"]
              ),
            ],
            64
          )
        )
      );
    },
  });
var F8 = De(L8, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue",
  ],
]);
const R8 = Ge({
    height: { type: [String, Number], default: "" },
    maxHeight: { type: [String, Number], default: "" },
    native: Boolean,
    wrapStyle: { type: Fe([String, Object, Array]), default: "" },
    wrapClass: { type: [String, Array], default: "" },
    viewClass: { type: [String, Array], default: "" },
    viewStyle: { type: [String, Array, Object], default: "" },
    noresize: Boolean,
    tag: { type: String, default: "div" },
    always: Boolean,
    minSize: { type: Number, default: 20 },
  }),
  B8 = { scroll: ({ scrollTop: e, scrollLeft: t }) => [e, t].every(Ye) },
  V8 = se({ name: "ElScrollbar" }),
  D8 = se({
    ...V8,
    props: R8,
    emits: B8,
    setup(e, { expose: t, emit: n }) {
      const r = e,
        o = Ee("scrollbar");
      let i, l;
      const a = B(),
        s = B(),
        u = B(),
        c = B("0"),
        f = B("0"),
        d = B(),
        h = B(1),
        p = B(1),
        b = A(() => {
          const w = {};
          return (
            r.height && (w.height = yo(r.height)),
            r.maxHeight && (w.maxHeight = yo(r.maxHeight)),
            [r.wrapStyle, w]
          );
        }),
        v = () => {
          var w;
          s.value &&
            ((w = d.value) == null || w.handleScroll(s.value),
            n("scroll", {
              scrollTop: s.value.scrollTop,
              scrollLeft: s.value.scrollLeft,
            }));
        };
      function _(w, C) {
        We(w) ? s.value.scrollTo(w) : Ye(w) && Ye(C) && s.value.scrollTo(w, C);
      }
      const x = (w) => {
          !Ye(w) || (s.value.scrollTop = w);
        },
        g = (w) => {
          !Ye(w) || (s.value.scrollLeft = w);
        },
        y = () => {
          if (!s.value) return;
          const w = s.value.offsetHeight - io,
            C = s.value.offsetWidth - io,
            E = w ** 2 / s.value.scrollHeight,
            $ = C ** 2 / s.value.scrollWidth,
            I = Math.max(E, r.minSize),
            D = Math.max($, r.minSize);
          (h.value = E / (w - E) / (I / (w - I))),
            (p.value = $ / (C - $) / (D / (C - D))),
            (f.value = I + io < w ? `${I}px` : ""),
            (c.value = D + io < C ? `${D}px` : "");
        };
      return (
        me(
          () => r.noresize,
          (w) => {
            w
              ? (i == null || i(), l == null || l())
              : (({ stop: i } = Dr(u, y)), (l = _n("resize", y)));
          },
          { immediate: !0 }
        ),
        me(
          () => [r.maxHeight, r.height],
          () => {
            r.native ||
              Le(() => {
                var w;
                y(),
                  s.value && ((w = d.value) == null || w.handleScroll(s.value));
              });
          }
        ),
        dt(lm, Et({ scrollbarElement: a, wrapElement: s })),
        rt(() => {
          r.native ||
            Le(() => {
              y();
            });
        }),
        Ti(() => y()),
        t({
          wrap$: s,
          update: y,
          scrollTo: _,
          setScrollTop: x,
          setScrollLeft: g,
          handleScroll: v,
        }),
        (w, C) => (
          L(),
          te(
            "div",
            { ref_key: "scrollbar$", ref: a, class: W(m(o).b()) },
            [
              ae(
                "div",
                {
                  ref_key: "wrap$",
                  ref: s,
                  class: W([
                    w.wrapClass,
                    m(o).e("wrap"),
                    { [m(o).em("wrap", "hidden-default")]: !w.native },
                  ]),
                  style: He(m(b)),
                  onScroll: v,
                },
                [
                  (L(),
                  he(
                    mt(w.tag),
                    {
                      ref_key: "resize$",
                      ref: u,
                      class: W([m(o).e("view"), w.viewClass]),
                      style: He(w.viewStyle),
                    },
                    { default: re(() => [Oe(w.$slots, "default")]), _: 3 },
                    8,
                    ["class", "style"]
                  )),
                ],
                38
              ),
              w.native
                ? ge("v-if", !0)
                : (L(),
                  he(
                    F8,
                    {
                      key: 0,
                      ref_key: "barRef",
                      ref: d,
                      height: f.value,
                      width: c.value,
                      always: w.always,
                      "ratio-x": p.value,
                      "ratio-y": h.value,
                    },
                    null,
                    8,
                    ["height", "width", "always", "ratio-x", "ratio-y"]
                  )),
            ],
            2
          )
        )
      );
    },
  });
var H8 = De(D8, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue",
  ],
]);
const nc = pt(H8),
  z8 = [
    "dialog",
    "grid",
    "group",
    "listbox",
    "menu",
    "navigation",
    "tooltip",
    "tree",
  ],
  pm = Ge({ role: { type: String, values: z8, default: "tooltip" } }),
  W8 = se({ name: "ElPopperRoot", inheritAttrs: !1 }),
  j8 = se({
    ...W8,
    props: pm,
    setup(e, { expose: t }) {
      const n = e,
        r = B(),
        o = B(),
        i = B(),
        l = B(),
        a = A(() => n.role),
        s = {
          triggerRef: r,
          popperInstanceRef: o,
          contentRef: i,
          referenceRef: l,
          role: a,
        };
      return t(s), dt(Gu, s), (u, c) => Oe(u.$slots, "default");
    },
  });
var K8 = De(j8, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue",
  ],
]);
const hm = Ge({ arrowOffset: { type: Number, default: 5 } }),
  q8 = se({ name: "ElPopperArrow", inheritAttrs: !1 }),
  U8 = se({
    ...q8,
    props: hm,
    setup(e, { expose: t }) {
      const n = e,
        r = Ee("popper"),
        { arrowOffset: o, arrowRef: i } = Ie(sm, void 0);
      return (
        me(
          () => n.arrowOffset,
          (l) => {
            o.value = l;
          }
        ),
        Bt(() => {
          i.value = void 0;
        }),
        t({ arrowRef: i }),
        (l, a) => (
          L(),
          te(
            "span",
            {
              ref_key: "arrowRef",
              ref: i,
              class: W(m(r).e("arrow")),
              "data-popper-arrow": "",
            },
            null,
            2
          )
        )
      );
    },
  });
var Y8 = De(U8, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue",
  ],
]);
const X8 = "ElOnlyChild",
  G8 = se({
    name: X8,
    setup(e, { slots: t, attrs: n }) {
      var r;
      const o = Ie(dm),
        i = d8((r = o == null ? void 0 : o.setForwardRef) != null ? r : St);
      return () => {
        var l;
        const a = (l = t.default) == null ? void 0 : l.call(t, n);
        if (!a || a.length > 1) return null;
        const s = mm(a);
        return s ? ot(jn(s, n), [[i]]) : null;
      };
    },
  });
function mm(e) {
  if (!e) return null;
  const t = e;
  for (const n of t) {
    if (We(n))
      switch (n.type) {
        case Nt:
          continue;
        case Mi:
        case "svg":
          return id(n);
        case Ue:
          return mm(n.children);
        default:
          return n;
      }
    return id(n);
  }
  return null;
}
function id(e) {
  const t = Ee("only-child");
  return oe("span", { class: t.e("content") }, [e]);
}
const gm = Ge({
    virtualRef: { type: Fe(Object) },
    virtualTriggering: Boolean,
    onMouseenter: { type: Fe(Function) },
    onMouseleave: { type: Fe(Function) },
    onClick: { type: Fe(Function) },
    onKeydown: { type: Fe(Function) },
    onFocus: { type: Fe(Function) },
    onBlur: { type: Fe(Function) },
    onContextmenu: { type: Fe(Function) },
    id: String,
    open: Boolean,
  }),
  J8 = se({ name: "ElPopperTrigger", inheritAttrs: !1 }),
  Z8 = se({
    ...J8,
    props: gm,
    setup(e, { expose: t }) {
      const n = e,
        { role: r, triggerRef: o } = Ie(Gu, void 0);
      f8(o);
      const i = A(() => (a.value ? n.id : void 0)),
        l = A(() => {
          if (r && r.value === "tooltip") return n.open && n.id ? n.id : void 0;
        }),
        a = A(() => {
          if (r && r.value !== "tooltip") return r.value;
        }),
        s = A(() => (a.value ? `${n.open}` : void 0));
      let u;
      return (
        rt(() => {
          me(
            () => n.virtualRef,
            (c) => {
              c && (o.value = lr(c));
            },
            { immediate: !0 }
          ),
            me(
              o,
              (c, f) => {
                u == null || u(),
                  (u = void 0),
                  hi(c) &&
                    ([
                      "onMouseenter",
                      "onMouseleave",
                      "onClick",
                      "onKeydown",
                      "onFocus",
                      "onBlur",
                      "onContextmenu",
                    ].forEach((d) => {
                      var h;
                      const p = n[d];
                      p &&
                        (c.addEventListener(d.slice(2).toLowerCase(), p),
                        (h = f == null ? void 0 : f.removeEventListener) ==
                          null || h.call(f, d.slice(2).toLowerCase(), p));
                    }),
                    (u = me(
                      [i, l, a, s],
                      (d) => {
                        [
                          "aria-controls",
                          "aria-describedby",
                          "aria-haspopup",
                          "aria-expanded",
                        ].forEach((h, p) => {
                          zn(d[p])
                            ? c.removeAttribute(h)
                            : c.setAttribute(h, d[p]);
                        });
                      },
                      { immediate: !0 }
                    ))),
                  hi(f) &&
                    [
                      "aria-controls",
                      "aria-describedby",
                      "aria-haspopup",
                      "aria-expanded",
                    ].forEach((d) => f.removeAttribute(d));
              },
              { immediate: !0 }
            );
        }),
        Bt(() => {
          u == null || u(), (u = void 0);
        }),
        t({ triggerRef: o }),
        (c, f) =>
          c.virtualTriggering
            ? ge("v-if", !0)
            : (L(),
              he(
                m(G8),
                Lr({ key: 0 }, c.$attrs, {
                  "aria-controls": m(i),
                  "aria-describedby": m(l),
                  "aria-expanded": m(s),
                  "aria-haspopup": m(a),
                }),
                { default: re(() => [Oe(c.$slots, "default")]), _: 3 },
                16,
                [
                  "aria-controls",
                  "aria-describedby",
                  "aria-expanded",
                  "aria-haspopup",
                ]
              ))
      );
    },
  });
var Q8 = De(Z8, [
    [
      "__file",
      "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue",
    ],
  ]),
  Ft = "top",
  Jt = "bottom",
  Zt = "right",
  Rt = "left",
  rc = "auto",
  Oi = [Ft, Jt, Zt, Rt],
  _o = "start",
  mi = "end",
  eS = "clippingParents",
  vm = "viewport",
  Ho = "popper",
  tS = "reference",
  ld = Oi.reduce(function (e, t) {
    return e.concat([t + "-" + _o, t + "-" + mi]);
  }, []),
  Fo = [].concat(Oi, [rc]).reduce(function (e, t) {
    return e.concat([t, t + "-" + _o, t + "-" + mi]);
  }, []),
  nS = "beforeRead",
  rS = "read",
  oS = "afterRead",
  iS = "beforeMain",
  lS = "main",
  aS = "afterMain",
  sS = "beforeWrite",
  uS = "write",
  cS = "afterWrite",
  fS = [nS, rS, oS, iS, lS, aS, sS, uS, cS];
function kn(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function mn(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function xo(e) {
  var t = mn(e).Element;
  return e instanceof t || e instanceof Element;
}
function Yt(e) {
  var t = mn(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function oc(e) {
  if (typeof ShadowRoot > "u") return !1;
  var t = mn(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function dS(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (n) {
    var r = t.styles[n] || {},
      o = t.attributes[n] || {},
      i = t.elements[n];
    !Yt(i) ||
      !kn(i) ||
      (Object.assign(i.style, r),
      Object.keys(o).forEach(function (l) {
        var a = o[l];
        a === !1 ? i.removeAttribute(l) : i.setAttribute(l, a === !0 ? "" : a);
      }));
  });
}
function pS(e) {
  var t = e.state,
    n = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, n.popper),
    (t.styles = n),
    t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
    function () {
      Object.keys(t.elements).forEach(function (r) {
        var o = t.elements[r],
          i = t.attributes[r] || {},
          l = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]),
          a = l.reduce(function (s, u) {
            return (s[u] = ""), s;
          }, {});
        !Yt(o) ||
          !kn(o) ||
          (Object.assign(o.style, a),
          Object.keys(i).forEach(function (s) {
            o.removeAttribute(s);
          }));
      });
    }
  );
}
var bm = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: dS,
  effect: pS,
  requires: ["computeStyles"],
};
function En(e) {
  return e.split("-")[0];
}
var Rr = Math.max,
  zl = Math.min,
  Co = Math.round;
function So(e, t) {
  t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(),
    r = 1,
    o = 1;
  if (Yt(e) && t) {
    var i = e.offsetHeight,
      l = e.offsetWidth;
    l > 0 && (r = Co(n.width) / l || 1), i > 0 && (o = Co(n.height) / i || 1);
  }
  return {
    width: n.width / r,
    height: n.height / o,
    top: n.top / o,
    right: n.right / r,
    bottom: n.bottom / o,
    left: n.left / r,
    x: n.left / r,
    y: n.top / o,
  };
}
function ic(e) {
  var t = So(e),
    n = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - n) <= 1 && (n = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
  );
}
function ym(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && oc(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function qn(e) {
  return mn(e).getComputedStyle(e);
}
function hS(e) {
  return ["table", "td", "th"].indexOf(kn(e)) >= 0;
}
function mr(e) {
  return ((xo(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function wa(e) {
  return kn(e) === "html"
    ? e
    : e.assignedSlot || e.parentNode || (oc(e) ? e.host : null) || mr(e);
}
function ad(e) {
  return !Yt(e) || qn(e).position === "fixed" ? null : e.offsetParent;
}
function mS(e) {
  var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1,
    n = navigator.userAgent.indexOf("Trident") !== -1;
  if (n && Yt(e)) {
    var r = qn(e);
    if (r.position === "fixed") return null;
  }
  var o = wa(e);
  for (oc(o) && (o = o.host); Yt(o) && ["html", "body"].indexOf(kn(o)) < 0; ) {
    var i = qn(o);
    if (
      i.transform !== "none" ||
      i.perspective !== "none" ||
      i.contain === "paint" ||
      ["transform", "perspective"].indexOf(i.willChange) !== -1 ||
      (t && i.willChange === "filter") ||
      (t && i.filter && i.filter !== "none")
    )
      return o;
    o = o.parentNode;
  }
  return null;
}
function Pi(e) {
  for (var t = mn(e), n = ad(e); n && hS(n) && qn(n).position === "static"; )
    n = ad(n);
  return n &&
    (kn(n) === "html" || (kn(n) === "body" && qn(n).position === "static"))
    ? t
    : n || mS(e) || t;
}
function lc(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function ei(e, t, n) {
  return Rr(e, zl(t, n));
}
function gS(e, t, n) {
  var r = ei(e, t, n);
  return r > n ? n : r;
}
function wm() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function _m(e) {
  return Object.assign({}, wm(), e);
}
function xm(e, t) {
  return t.reduce(function (n, r) {
    return (n[r] = e), n;
  }, {});
}
var vS = function (e, t) {
  return (
    (e =
      typeof e == "function"
        ? e(Object.assign({}, t.rects, { placement: t.placement }))
        : e),
    _m(typeof e != "number" ? e : xm(e, Oi))
  );
};
function bS(e) {
  var t,
    n = e.state,
    r = e.name,
    o = e.options,
    i = n.elements.arrow,
    l = n.modifiersData.popperOffsets,
    a = En(n.placement),
    s = lc(a),
    u = [Rt, Zt].indexOf(a) >= 0,
    c = u ? "height" : "width";
  if (!(!i || !l)) {
    var f = vS(o.padding, n),
      d = ic(i),
      h = s === "y" ? Ft : Rt,
      p = s === "y" ? Jt : Zt,
      b =
        n.rects.reference[c] + n.rects.reference[s] - l[s] - n.rects.popper[c],
      v = l[s] - n.rects.reference[s],
      _ = Pi(i),
      x = _ ? (s === "y" ? _.clientHeight || 0 : _.clientWidth || 0) : 0,
      g = b / 2 - v / 2,
      y = f[h],
      w = x - d[c] - f[p],
      C = x / 2 - d[c] / 2 + g,
      E = ei(y, C, w),
      $ = s;
    n.modifiersData[r] = ((t = {}), (t[$] = E), (t.centerOffset = E - C), t);
  }
}
function yS(e) {
  var t = e.state,
    n = e.options,
    r = n.element,
    o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null &&
    ((typeof o == "string" && ((o = t.elements.popper.querySelector(o)), !o)) ||
      !ym(t.elements.popper, o) ||
      (t.elements.arrow = o));
}
var wS = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: bS,
  effect: yS,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function Eo(e) {
  return e.split("-")[1];
}
var _S = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function xS(e) {
  var t = e.x,
    n = e.y,
    r = window,
    o = r.devicePixelRatio || 1;
  return { x: Co(t * o) / o || 0, y: Co(n * o) / o || 0 };
}
function sd(e) {
  var t,
    n = e.popper,
    r = e.popperRect,
    o = e.placement,
    i = e.variation,
    l = e.offsets,
    a = e.position,
    s = e.gpuAcceleration,
    u = e.adaptive,
    c = e.roundOffsets,
    f = e.isFixed,
    d = l.x,
    h = d === void 0 ? 0 : d,
    p = l.y,
    b = p === void 0 ? 0 : p,
    v = typeof c == "function" ? c({ x: h, y: b }) : { x: h, y: b };
  (h = v.x), (b = v.y);
  var _ = l.hasOwnProperty("x"),
    x = l.hasOwnProperty("y"),
    g = Rt,
    y = Ft,
    w = window;
  if (u) {
    var C = Pi(n),
      E = "clientHeight",
      $ = "clientWidth";
    if (
      (C === mn(n) &&
        ((C = mr(n)),
        qn(C).position !== "static" &&
          a === "absolute" &&
          ((E = "scrollHeight"), ($ = "scrollWidth"))),
      (C = C),
      o === Ft || ((o === Rt || o === Zt) && i === mi))
    ) {
      y = Jt;
      var I = f && C === w && w.visualViewport ? w.visualViewport.height : C[E];
      (b -= I - r.height), (b *= s ? 1 : -1);
    }
    if (o === Rt || ((o === Ft || o === Jt) && i === mi)) {
      g = Zt;
      var D = f && C === w && w.visualViewport ? w.visualViewport.width : C[$];
      (h -= D - r.width), (h *= s ? 1 : -1);
    }
  }
  var P = Object.assign({ position: a }, u && _S),
    O = c === !0 ? xS({ x: h, y: b }) : { x: h, y: b };
  if (((h = O.x), (b = O.y), s)) {
    var S;
    return Object.assign(
      {},
      P,
      ((S = {}),
      (S[y] = x ? "0" : ""),
      (S[g] = _ ? "0" : ""),
      (S.transform =
        (w.devicePixelRatio || 1) <= 1
          ? "translate(" + h + "px, " + b + "px)"
          : "translate3d(" + h + "px, " + b + "px, 0)"),
      S)
    );
  }
  return Object.assign(
    {},
    P,
    ((t = {}),
    (t[y] = x ? b + "px" : ""),
    (t[g] = _ ? h + "px" : ""),
    (t.transform = ""),
    t)
  );
}
function CS(e) {
  var t = e.state,
    n = e.options,
    r = n.gpuAcceleration,
    o = r === void 0 ? !0 : r,
    i = n.adaptive,
    l = i === void 0 ? !0 : i,
    a = n.roundOffsets,
    s = a === void 0 ? !0 : a,
    u = {
      placement: En(t.placement),
      variation: Eo(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: o,
      isFixed: t.options.strategy === "fixed",
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      sd(
        Object.assign({}, u, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: l,
          roundOffsets: s,
        })
      )
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        sd(
          Object.assign({}, u, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: s,
          })
        )
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    }));
}
var Cm = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: CS,
    data: {},
  },
  Ki = { passive: !0 };
function SS(e) {
  var t = e.state,
    n = e.instance,
    r = e.options,
    o = r.scroll,
    i = o === void 0 ? !0 : o,
    l = r.resize,
    a = l === void 0 ? !0 : l,
    s = mn(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    i &&
      u.forEach(function (c) {
        c.addEventListener("scroll", n.update, Ki);
      }),
    a && s.addEventListener("resize", n.update, Ki),
    function () {
      i &&
        u.forEach(function (c) {
          c.removeEventListener("scroll", n.update, Ki);
        }),
        a && s.removeEventListener("resize", n.update, Ki);
    }
  );
}
var Sm = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: function () {},
    effect: SS,
    data: {},
  },
  ES = { left: "right", right: "left", bottom: "top", top: "bottom" };
function gl(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return ES[t];
  });
}
var TS = { start: "end", end: "start" };
function ud(e) {
  return e.replace(/start|end/g, function (t) {
    return TS[t];
  });
}
function ac(e) {
  var t = mn(e),
    n = t.pageXOffset,
    r = t.pageYOffset;
  return { scrollLeft: n, scrollTop: r };
}
function sc(e) {
  return So(mr(e)).left + ac(e).scrollLeft;
}
function $S(e) {
  var t = mn(e),
    n = mr(e),
    r = t.visualViewport,
    o = n.clientWidth,
    i = n.clientHeight,
    l = 0,
    a = 0;
  return (
    r &&
      ((o = r.width),
      (i = r.height),
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
        ((l = r.offsetLeft), (a = r.offsetTop))),
    { width: o, height: i, x: l + sc(e), y: a }
  );
}
function MS(e) {
  var t,
    n = mr(e),
    r = ac(e),
    o = (t = e.ownerDocument) == null ? void 0 : t.body,
    i = Rr(
      n.scrollWidth,
      n.clientWidth,
      o ? o.scrollWidth : 0,
      o ? o.clientWidth : 0
    ),
    l = Rr(
      n.scrollHeight,
      n.clientHeight,
      o ? o.scrollHeight : 0,
      o ? o.clientHeight : 0
    ),
    a = -r.scrollLeft + sc(e),
    s = -r.scrollTop;
  return (
    qn(o || n).direction === "rtl" &&
      (a += Rr(n.clientWidth, o ? o.clientWidth : 0) - i),
    { width: i, height: l, x: a, y: s }
  );
}
function uc(e) {
  var t = qn(e),
    n = t.overflow,
    r = t.overflowX,
    o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Em(e) {
  return ["html", "body", "#document"].indexOf(kn(e)) >= 0
    ? e.ownerDocument.body
    : Yt(e) && uc(e)
    ? e
    : Em(wa(e));
}
function ti(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Em(e),
    o = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
    i = mn(r),
    l = o ? [i].concat(i.visualViewport || [], uc(r) ? r : []) : r,
    a = t.concat(l);
  return o ? a : a.concat(ti(wa(l)));
}
function $s(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function AS(e) {
  var t = So(e);
  return (
    (t.top = t.top + e.clientTop),
    (t.left = t.left + e.clientLeft),
    (t.bottom = t.top + e.clientHeight),
    (t.right = t.left + e.clientWidth),
    (t.width = e.clientWidth),
    (t.height = e.clientHeight),
    (t.x = t.left),
    (t.y = t.top),
    t
  );
}
function cd(e, t) {
  return t === vm ? $s($S(e)) : xo(t) ? AS(t) : $s(MS(mr(e)));
}
function kS(e) {
  var t = ti(wa(e)),
    n = ["absolute", "fixed"].indexOf(qn(e).position) >= 0,
    r = n && Yt(e) ? Pi(e) : e;
  return xo(r)
    ? t.filter(function (o) {
        return xo(o) && ym(o, r) && kn(o) !== "body";
      })
    : [];
}
function OS(e, t, n) {
  var r = t === "clippingParents" ? kS(e) : [].concat(t),
    o = [].concat(r, [n]),
    i = o[0],
    l = o.reduce(function (a, s) {
      var u = cd(e, s);
      return (
        (a.top = Rr(u.top, a.top)),
        (a.right = zl(u.right, a.right)),
        (a.bottom = zl(u.bottom, a.bottom)),
        (a.left = Rr(u.left, a.left)),
        a
      );
    }, cd(e, i));
  return (
    (l.width = l.right - l.left),
    (l.height = l.bottom - l.top),
    (l.x = l.left),
    (l.y = l.top),
    l
  );
}
function Tm(e) {
  var t = e.reference,
    n = e.element,
    r = e.placement,
    o = r ? En(r) : null,
    i = r ? Eo(r) : null,
    l = t.x + t.width / 2 - n.width / 2,
    a = t.y + t.height / 2 - n.height / 2,
    s;
  switch (o) {
    case Ft:
      s = { x: l, y: t.y - n.height };
      break;
    case Jt:
      s = { x: l, y: t.y + t.height };
      break;
    case Zt:
      s = { x: t.x + t.width, y: a };
      break;
    case Rt:
      s = { x: t.x - n.width, y: a };
      break;
    default:
      s = { x: t.x, y: t.y };
  }
  var u = o ? lc(o) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (i) {
      case _o:
        s[u] = s[u] - (t[c] / 2 - n[c] / 2);
        break;
      case mi:
        s[u] = s[u] + (t[c] / 2 - n[c] / 2);
        break;
    }
  }
  return s;
}
function gi(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    o = r === void 0 ? e.placement : r,
    i = n.boundary,
    l = i === void 0 ? eS : i,
    a = n.rootBoundary,
    s = a === void 0 ? vm : a,
    u = n.elementContext,
    c = u === void 0 ? Ho : u,
    f = n.altBoundary,
    d = f === void 0 ? !1 : f,
    h = n.padding,
    p = h === void 0 ? 0 : h,
    b = _m(typeof p != "number" ? p : xm(p, Oi)),
    v = c === Ho ? tS : Ho,
    _ = e.rects.popper,
    x = e.elements[d ? v : c],
    g = OS(xo(x) ? x : x.contextElement || mr(e.elements.popper), l, s),
    y = So(e.elements.reference),
    w = Tm({ reference: y, element: _, strategy: "absolute", placement: o }),
    C = $s(Object.assign({}, _, w)),
    E = c === Ho ? C : y,
    $ = {
      top: g.top - E.top + b.top,
      bottom: E.bottom - g.bottom + b.bottom,
      left: g.left - E.left + b.left,
      right: E.right - g.right + b.right,
    },
    I = e.modifiersData.offset;
  if (c === Ho && I) {
    var D = I[o];
    Object.keys($).forEach(function (P) {
      var O = [Zt, Jt].indexOf(P) >= 0 ? 1 : -1,
        S = [Ft, Jt].indexOf(P) >= 0 ? "y" : "x";
      $[P] += D[S] * O;
    });
  }
  return $;
}
function PS(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    o = n.boundary,
    i = n.rootBoundary,
    l = n.padding,
    a = n.flipVariations,
    s = n.allowedAutoPlacements,
    u = s === void 0 ? Fo : s,
    c = Eo(r),
    f = c
      ? a
        ? ld
        : ld.filter(function (p) {
            return Eo(p) === c;
          })
      : Oi,
    d = f.filter(function (p) {
      return u.indexOf(p) >= 0;
    });
  d.length === 0 && (d = f);
  var h = d.reduce(function (p, b) {
    return (
      (p[b] = gi(e, { placement: b, boundary: o, rootBoundary: i, padding: l })[
        En(b)
      ]),
      p
    );
  }, {});
  return Object.keys(h).sort(function (p, b) {
    return h[p] - h[b];
  });
}
function NS(e) {
  if (En(e) === rc) return [];
  var t = gl(e);
  return [ud(e), t, ud(t)];
}
function IS(e) {
  var t = e.state,
    n = e.options,
    r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (
      var o = n.mainAxis,
        i = o === void 0 ? !0 : o,
        l = n.altAxis,
        a = l === void 0 ? !0 : l,
        s = n.fallbackPlacements,
        u = n.padding,
        c = n.boundary,
        f = n.rootBoundary,
        d = n.altBoundary,
        h = n.flipVariations,
        p = h === void 0 ? !0 : h,
        b = n.allowedAutoPlacements,
        v = t.options.placement,
        _ = En(v),
        x = _ === v,
        g = s || (x || !p ? [gl(v)] : NS(v)),
        y = [v].concat(g).reduce(function ($e, Ce) {
          return $e.concat(
            En(Ce) === rc
              ? PS(t, {
                  placement: Ce,
                  boundary: c,
                  rootBoundary: f,
                  padding: u,
                  flipVariations: p,
                  allowedAutoPlacements: b,
                })
              : Ce
          );
        }, []),
        w = t.rects.reference,
        C = t.rects.popper,
        E = new Map(),
        $ = !0,
        I = y[0],
        D = 0;
      D < y.length;
      D++
    ) {
      var P = y[D],
        O = En(P),
        S = Eo(P) === _o,
        N = [Ft, Jt].indexOf(O) >= 0,
        X = N ? "width" : "height",
        K = gi(t, {
          placement: P,
          boundary: c,
          rootBoundary: f,
          altBoundary: d,
          padding: u,
        }),
        q = N ? (S ? Zt : Rt) : S ? Jt : Ft;
      w[X] > C[X] && (q = gl(q));
      var V = gl(q),
        R = [];
      if (
        (i && R.push(K[O] <= 0),
        a && R.push(K[q] <= 0, K[V] <= 0),
        R.every(function ($e) {
          return $e;
        }))
      ) {
        (I = P), ($ = !1);
        break;
      }
      E.set(P, R);
    }
    if ($)
      for (
        var ne = p ? 3 : 1,
          ie = function ($e) {
            var Ce = y.find(function (ue) {
              var Q = E.get(ue);
              if (Q)
                return Q.slice(0, $e).every(function (ce) {
                  return ce;
                });
            });
            if (Ce) return (I = Ce), "break";
          },
          J = ne;
        J > 0;
        J--
      ) {
        var ve = ie(J);
        if (ve === "break") break;
      }
    t.placement !== I &&
      ((t.modifiersData[r]._skip = !0), (t.placement = I), (t.reset = !0));
  }
}
var LS = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: IS,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function fd(e, t, n) {
  return (
    n === void 0 && (n = { x: 0, y: 0 }),
    {
      top: e.top - t.height - n.y,
      right: e.right - t.width + n.x,
      bottom: e.bottom - t.height + n.y,
      left: e.left - t.width - n.x,
    }
  );
}
function dd(e) {
  return [Ft, Zt, Jt, Rt].some(function (t) {
    return e[t] >= 0;
  });
}
function FS(e) {
  var t = e.state,
    n = e.name,
    r = t.rects.reference,
    o = t.rects.popper,
    i = t.modifiersData.preventOverflow,
    l = gi(t, { elementContext: "reference" }),
    a = gi(t, { altBoundary: !0 }),
    s = fd(l, r),
    u = fd(a, o, i),
    c = dd(s),
    f = dd(u);
  (t.modifiersData[n] = {
    referenceClippingOffsets: s,
    popperEscapeOffsets: u,
    isReferenceHidden: c,
    hasPopperEscaped: f,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": c,
      "data-popper-escaped": f,
    }));
}
var RS = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: FS,
};
function BS(e, t, n) {
  var r = En(e),
    o = [Rt, Ft].indexOf(r) >= 0 ? -1 : 1,
    i = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n,
    l = i[0],
    a = i[1];
  return (
    (l = l || 0),
    (a = (a || 0) * o),
    [Rt, Zt].indexOf(r) >= 0 ? { x: a, y: l } : { x: l, y: a }
  );
}
function VS(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    o = n.offset,
    i = o === void 0 ? [0, 0] : o,
    l = Fo.reduce(function (c, f) {
      return (c[f] = BS(f, t.rects, i)), c;
    }, {}),
    a = l[t.placement],
    s = a.x,
    u = a.y;
  t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += s),
    (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[r] = l);
}
var DS = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: VS,
};
function HS(e) {
  var t = e.state,
    n = e.name;
  t.modifiersData[n] = Tm({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement,
  });
}
var $m = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: HS,
  data: {},
};
function zS(e) {
  return e === "x" ? "y" : "x";
}
function WS(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    o = n.mainAxis,
    i = o === void 0 ? !0 : o,
    l = n.altAxis,
    a = l === void 0 ? !1 : l,
    s = n.boundary,
    u = n.rootBoundary,
    c = n.altBoundary,
    f = n.padding,
    d = n.tether,
    h = d === void 0 ? !0 : d,
    p = n.tetherOffset,
    b = p === void 0 ? 0 : p,
    v = gi(t, { boundary: s, rootBoundary: u, padding: f, altBoundary: c }),
    _ = En(t.placement),
    x = Eo(t.placement),
    g = !x,
    y = lc(_),
    w = zS(y),
    C = t.modifiersData.popperOffsets,
    E = t.rects.reference,
    $ = t.rects.popper,
    I =
      typeof b == "function"
        ? b(Object.assign({}, t.rects, { placement: t.placement }))
        : b,
    D =
      typeof I == "number"
        ? { mainAxis: I, altAxis: I }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, I),
    P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    O = { x: 0, y: 0 };
  if (C) {
    if (i) {
      var S,
        N = y === "y" ? Ft : Rt,
        X = y === "y" ? Jt : Zt,
        K = y === "y" ? "height" : "width",
        q = C[y],
        V = q + v[N],
        R = q - v[X],
        ne = h ? -$[K] / 2 : 0,
        ie = x === _o ? E[K] : $[K],
        J = x === _o ? -$[K] : -E[K],
        ve = t.elements.arrow,
        $e = h && ve ? ic(ve) : { width: 0, height: 0 },
        Ce = t.modifiersData["arrow#persistent"]
          ? t.modifiersData["arrow#persistent"].padding
          : wm(),
        ue = Ce[N],
        Q = Ce[X],
        ce = ei(0, E[K], $e[K]),
        Me = g
          ? E[K] / 2 - ne - ce - ue - D.mainAxis
          : ie - ce - ue - D.mainAxis,
        _e = g ? -E[K] / 2 + ne + ce + Q + D.mainAxis : J + ce + Q + D.mainAxis,
        je = t.elements.arrow && Pi(t.elements.arrow),
        T = je ? (y === "y" ? je.clientTop || 0 : je.clientLeft || 0) : 0,
        M = (S = P == null ? void 0 : P[y]) != null ? S : 0,
        H = q + Me - M - T,
        Y = q + _e - M,
        U = ei(h ? zl(V, H) : V, q, h ? Rr(R, Y) : R);
      (C[y] = U), (O[y] = U - q);
    }
    if (a) {
      var z,
        ee = y === "x" ? Ft : Rt,
        Z = y === "x" ? Jt : Zt,
        k = C[w],
        j = w === "y" ? "height" : "width",
        de = k + v[ee],
        fe = k - v[Z],
        be = [Ft, Rt].indexOf(_) !== -1,
        Se = (z = P == null ? void 0 : P[w]) != null ? z : 0,
        Pe = be ? de : k - E[j] - $[j] - Se + D.altAxis,
        Ke = be ? k + E[j] + $[j] - Se - D.altAxis : fe,
        le = h && be ? gS(Pe, k, Ke) : ei(h ? Pe : de, k, h ? Ke : fe);
      (C[w] = le), (O[w] = le - k);
    }
    t.modifiersData[r] = O;
  }
}
var jS = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: WS,
  requiresIfExists: ["offset"],
};
function KS(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function qS(e) {
  return e === mn(e) || !Yt(e) ? ac(e) : KS(e);
}
function US(e) {
  var t = e.getBoundingClientRect(),
    n = Co(t.width) / e.offsetWidth || 1,
    r = Co(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function YS(e, t, n) {
  n === void 0 && (n = !1);
  var r = Yt(t),
    o = Yt(t) && US(t),
    i = mr(t),
    l = So(e, o),
    a = { scrollLeft: 0, scrollTop: 0 },
    s = { x: 0, y: 0 };
  return (
    (r || (!r && !n)) &&
      ((kn(t) !== "body" || uc(i)) && (a = qS(t)),
      Yt(t)
        ? ((s = So(t, !0)), (s.x += t.clientLeft), (s.y += t.clientTop))
        : i && (s.x = sc(i))),
    {
      x: l.left + a.scrollLeft - s.x,
      y: l.top + a.scrollTop - s.y,
      width: l.width,
      height: l.height,
    }
  );
}
function XS(e) {
  var t = new Map(),
    n = new Set(),
    r = [];
  e.forEach(function (i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var l = [].concat(i.requires || [], i.requiresIfExists || []);
    l.forEach(function (a) {
      if (!n.has(a)) {
        var s = t.get(a);
        s && o(s);
      }
    }),
      r.push(i);
  }
  return (
    e.forEach(function (i) {
      n.has(i.name) || o(i);
    }),
    r
  );
}
function GS(e) {
  var t = XS(e);
  return fS.reduce(function (n, r) {
    return n.concat(
      t.filter(function (o) {
        return o.phase === r;
      })
    );
  }, []);
}
function JS(e) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (n) {
          Promise.resolve().then(function () {
            (t = void 0), n(e());
          });
        })),
      t
    );
  };
}
function ZS(e) {
  var t = e.reduce(function (n, r) {
    var o = n[r.name];
    return (
      (n[r.name] = o
        ? Object.assign({}, o, r, {
            options: Object.assign({}, o.options, r.options),
            data: Object.assign({}, o.data, r.data),
          })
        : r),
      n
    );
  }, {});
  return Object.keys(t).map(function (n) {
    return t[n];
  });
}
var pd = { placement: "bottom", modifiers: [], strategy: "absolute" };
function hd() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function cc(e) {
  e === void 0 && (e = {});
  var t = e,
    n = t.defaultModifiers,
    r = n === void 0 ? [] : n,
    o = t.defaultOptions,
    i = o === void 0 ? pd : o;
  return function (l, a, s) {
    s === void 0 && (s = i);
    var u = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, pd, i),
        modifiersData: {},
        elements: { reference: l, popper: a },
        attributes: {},
        styles: {},
      },
      c = [],
      f = !1,
      d = {
        state: u,
        setOptions: function (b) {
          var v = typeof b == "function" ? b(u.options) : b;
          p(),
            (u.options = Object.assign({}, i, u.options, v)),
            (u.scrollParents = {
              reference: xo(l)
                ? ti(l)
                : l.contextElement
                ? ti(l.contextElement)
                : [],
              popper: ti(a),
            });
          var _ = GS(ZS([].concat(r, u.options.modifiers)));
          return (
            (u.orderedModifiers = _.filter(function (x) {
              return x.enabled;
            })),
            h(),
            d.update()
          );
        },
        forceUpdate: function () {
          if (!f) {
            var b = u.elements,
              v = b.reference,
              _ = b.popper;
            if (hd(v, _)) {
              (u.rects = {
                reference: YS(v, Pi(_), u.options.strategy === "fixed"),
                popper: ic(_),
              }),
                (u.reset = !1),
                (u.placement = u.options.placement),
                u.orderedModifiers.forEach(function ($) {
                  return (u.modifiersData[$.name] = Object.assign({}, $.data));
                });
              for (var x = 0; x < u.orderedModifiers.length; x++) {
                if (u.reset === !0) {
                  (u.reset = !1), (x = -1);
                  continue;
                }
                var g = u.orderedModifiers[x],
                  y = g.fn,
                  w = g.options,
                  C = w === void 0 ? {} : w,
                  E = g.name;
                typeof y == "function" &&
                  (u = y({ state: u, options: C, name: E, instance: d }) || u);
              }
            }
          }
        },
        update: JS(function () {
          return new Promise(function (b) {
            d.forceUpdate(), b(u);
          });
        }),
        destroy: function () {
          p(), (f = !0);
        },
      };
    if (!hd(l, a)) return d;
    d.setOptions(s).then(function (b) {
      !f && s.onFirstUpdate && s.onFirstUpdate(b);
    });
    function h() {
      u.orderedModifiers.forEach(function (b) {
        var v = b.name,
          _ = b.options,
          x = _ === void 0 ? {} : _,
          g = b.effect;
        if (typeof g == "function") {
          var y = g({ state: u, name: v, instance: d, options: x }),
            w = function () {};
          c.push(y || w);
        }
      });
    }
    function p() {
      c.forEach(function (b) {
        return b();
      }),
        (c = []);
    }
    return d;
  };
}
cc();
var QS = [Sm, $m, Cm, bm];
cc({ defaultModifiers: QS });
var e4 = [Sm, $m, Cm, bm, DS, LS, jS, wS, RS],
  Mm = cc({ defaultModifiers: e4 });
const Da = "focus-trap.focus-after-trapped",
  Ha = "focus-trap.focus-after-released",
  t4 = "focus-trap.focusout-prevented",
  md = { cancelable: !0, bubbles: !1 },
  n4 = { cancelable: !0, bubbles: !1 },
  gd = "focusAfterTrapped",
  vd = "focusAfterReleased",
  r4 = Symbol("elFocusTrap"),
  fc = B(),
  _a = B(0),
  dc = B(0);
let qi = 0;
const Am = (e) => {
    const t = [],
      n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (r) => {
          const o = r.tagName === "INPUT" && r.type === "hidden";
          return r.disabled || r.hidden || o
            ? NodeFilter.FILTER_SKIP
            : r.tabIndex >= 0 || r === document.activeElement
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      });
    for (; n.nextNode(); ) t.push(n.currentNode);
    return t;
  },
  bd = (e, t) => {
    for (const n of e) if (!o4(n, t)) return n;
  },
  o4 = (e, t) => {
    if (getComputedStyle(e).visibility === "hidden") return !0;
    for (; e; ) {
      if (t && e === t) return !1;
      if (getComputedStyle(e).display === "none") return !0;
      e = e.parentElement;
    }
    return !1;
  },
  i4 = (e) => {
    const t = Am(e),
      n = bd(t, e),
      r = bd(t.reverse(), e);
    return [n, r];
  },
  l4 = (e) => e instanceof HTMLInputElement && "select" in e,
  nr = (e, t) => {
    if (e && e.focus) {
      const n = document.activeElement;
      e.focus({ preventScroll: !0 }),
        (dc.value = window.performance.now()),
        e !== n && l4(e) && t && e.select();
    }
  };
function yd(e, t) {
  const n = [...e],
    r = e.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
const a4 = () => {
    let e = [];
    return {
      push: (r) => {
        const o = e[0];
        o && r !== o && o.pause(), (e = yd(e, r)), e.unshift(r);
      },
      remove: (r) => {
        var o, i;
        (e = yd(e, r)),
          (i = (o = e[0]) == null ? void 0 : o.resume) == null || i.call(o);
      },
    };
  },
  s4 = (e, t = !1) => {
    const n = document.activeElement;
    for (const r of e) if ((nr(r, t), document.activeElement !== n)) return;
  },
  wd = a4(),
  u4 = () => _a.value > dc.value,
  Ui = () => {
    (fc.value = "pointer"), (_a.value = window.performance.now());
  },
  _d = () => {
    (fc.value = "keyboard"), (_a.value = window.performance.now());
  },
  c4 = () => (
    rt(() => {
      qi === 0 &&
        (document.addEventListener("mousedown", Ui),
        document.addEventListener("touchstart", Ui),
        document.addEventListener("keydown", _d)),
        qi++;
    }),
    Bt(() => {
      qi--,
        qi <= 0 &&
          (document.removeEventListener("mousedown", Ui),
          document.removeEventListener("touchstart", Ui),
          document.removeEventListener("keydown", _d));
    }),
    {
      focusReason: fc,
      lastUserFocusTimestamp: _a,
      lastAutomatedFocusTimestamp: dc,
    }
  ),
  Yi = (e) => new CustomEvent(t4, { ...n4, detail: e }),
  f4 = se({
    name: "ElFocusTrap",
    inheritAttrs: !1,
    props: {
      loop: Boolean,
      trapped: Boolean,
      focusTrapEl: Object,
      focusStartEl: { type: [Object, String], default: "first" },
    },
    emits: [
      gd,
      vd,
      "focusin",
      "focusout",
      "focusout-prevented",
      "release-requested",
    ],
    setup(e, { emit: t }) {
      const n = B();
      let r, o;
      const { focusReason: i } = c4();
      i8((p) => {
        e.trapped && !l.paused && t("release-requested", p);
      });
      const l = {
          paused: !1,
          pause() {
            this.paused = !0;
          },
          resume() {
            this.paused = !1;
          },
        },
        a = (p) => {
          if ((!e.loop && !e.trapped) || l.paused) return;
          const {
              key: b,
              altKey: v,
              ctrlKey: _,
              metaKey: x,
              currentTarget: g,
              shiftKey: y,
            } = p,
            { loop: w } = e,
            C = b === wo.tab && !v && !_ && !x,
            E = document.activeElement;
          if (C && E) {
            const $ = g,
              [I, D] = i4($);
            if (I && D) {
              if (!y && E === D) {
                const O = Yi({ focusReason: i.value });
                t("focusout-prevented", O),
                  O.defaultPrevented || (p.preventDefault(), w && nr(I, !0));
              } else if (y && [I, $].includes(E)) {
                const O = Yi({ focusReason: i.value });
                t("focusout-prevented", O),
                  O.defaultPrevented || (p.preventDefault(), w && nr(D, !0));
              }
            } else if (E === $) {
              const O = Yi({ focusReason: i.value });
              t("focusout-prevented", O),
                O.defaultPrevented || p.preventDefault();
            }
          }
        };
      dt(r4, { focusTrapRef: n, onKeydown: a }),
        me(
          () => e.focusTrapEl,
          (p) => {
            p && (n.value = p);
          },
          { immediate: !0 }
        ),
        me([n], ([p], [b]) => {
          p &&
            (p.addEventListener("keydown", a),
            p.addEventListener("focusin", c),
            p.addEventListener("focusout", f)),
            b &&
              (b.removeEventListener("keydown", a),
              b.removeEventListener("focusin", c),
              b.removeEventListener("focusout", f));
        });
      const s = (p) => {
          t(gd, p);
        },
        u = (p) => t(vd, p),
        c = (p) => {
          const b = m(n);
          if (!b) return;
          const v = p.target,
            _ = p.relatedTarget,
            x = v && b.contains(v);
          e.trapped || (_ && b.contains(_)) || (r = _),
            x && t("focusin", p),
            !l.paused && e.trapped && (x ? (o = v) : nr(o, !0));
        },
        f = (p) => {
          const b = m(n);
          if (!(l.paused || !b))
            if (e.trapped) {
              const v = p.relatedTarget;
              !zn(v) &&
                !b.contains(v) &&
                setTimeout(() => {
                  if (!l.paused && e.trapped) {
                    const _ = Yi({ focusReason: i.value });
                    t("focusout-prevented", _), _.defaultPrevented || nr(o, !0);
                  }
                }, 0);
            } else {
              const v = p.target;
              (v && b.contains(v)) || t("focusout", p);
            }
        };
      async function d() {
        await Le();
        const p = m(n);
        if (p) {
          wd.push(l);
          const b = p.contains(document.activeElement)
            ? r
            : document.activeElement;
          if (((r = b), !p.contains(b))) {
            const _ = new Event(Da, md);
            p.addEventListener(Da, s),
              p.dispatchEvent(_),
              _.defaultPrevented ||
                Le(() => {
                  let x = e.focusStartEl;
                  Be(x) ||
                    (nr(x), document.activeElement !== x && (x = "first")),
                    x === "first" && s4(Am(p), !0),
                    (document.activeElement === b || x === "container") &&
                      nr(p);
                });
          }
        }
      }
      function h() {
        const p = m(n);
        if (p) {
          p.removeEventListener(Da, s);
          const b = new CustomEvent(Ha, {
            ...md,
            detail: { focusReason: i.value },
          });
          p.addEventListener(Ha, u),
            p.dispatchEvent(b),
            !b.defaultPrevented &&
              (i.value == "keyboard" || !u4()) &&
              nr(r != null ? r : document.body, !0),
            p.removeEventListener(Ha, s),
            wd.remove(l);
        }
      }
      return (
        rt(() => {
          e.trapped && d(),
            me(
              () => e.trapped,
              (p) => {
                p ? d() : h();
              }
            );
        }),
        Bt(() => {
          e.trapped && h();
        }),
        { onKeydown: a }
      );
    },
  });
function d4(e, t, n, r, o, i) {
  return Oe(e.$slots, "default", { handleKeydown: e.onKeydown });
}
var p4 = De(f4, [
  ["render", d4],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue",
  ],
]);
const h4 = ["fixed", "absolute"],
  m4 = Ge({
    boundariesPadding: { type: Number, default: 0 },
    fallbackPlacements: { type: Fe(Array), default: void 0 },
    gpuAcceleration: { type: Boolean, default: !0 },
    offset: { type: Number, default: 12 },
    placement: { type: String, values: Fo, default: "bottom" },
    popperOptions: { type: Fe(Object), default: () => ({}) },
    strategy: { type: String, values: h4, default: "absolute" },
  }),
  km = Ge({
    ...m4,
    id: String,
    style: { type: Fe([String, Array, Object]) },
    className: { type: Fe([String, Array, Object]) },
    effect: { type: String, default: "dark" },
    visible: Boolean,
    enterable: { type: Boolean, default: !0 },
    pure: Boolean,
    focusOnShow: { type: Boolean, default: !1 },
    trapping: { type: Boolean, default: !1 },
    popperClass: { type: Fe([String, Array, Object]) },
    popperStyle: { type: Fe([String, Array, Object]) },
    referenceEl: { type: Fe(Object) },
    triggerTargetEl: { type: Fe(Object) },
    stopPopperMouseEvent: { type: Boolean, default: !0 },
    ariaLabel: { type: String, default: void 0 },
    virtualTriggering: Boolean,
    zIndex: Number,
  }),
  g4 = {
    mouseenter: (e) => e instanceof MouseEvent,
    mouseleave: (e) => e instanceof MouseEvent,
    focus: () => !0,
    blur: () => !0,
    close: () => !0,
  },
  xd = (e, t) => {
    const { placement: n, strategy: r, popperOptions: o } = e,
      i = { placement: n, strategy: r, ...o, modifiers: b4(e) };
    return y4(i, t), w4(i, o == null ? void 0 : o.modifiers), i;
  },
  v4 = (e) => {
    if (!!lt) return lr(e);
  };
function b4(e) {
  const { offset: t, gpuAcceleration: n, fallbackPlacements: r } = e;
  return [
    { name: "offset", options: { offset: [0, t != null ? t : 12] } },
    {
      name: "preventOverflow",
      options: { padding: { top: 2, bottom: 2, left: 5, right: 5 } },
    },
    { name: "flip", options: { padding: 5, fallbackPlacements: r } },
    { name: "computeStyles", options: { gpuAcceleration: n, adaptive: n } },
  ];
}
function y4(e, { arrowEl: t, arrowOffset: n }) {
  e.modifiers.push({
    name: "arrow",
    options: { element: t, padding: n != null ? n : 5 },
  });
}
function w4(e, t) {
  t && (e.modifiers = [...e.modifiers, ...(t != null ? t : [])]);
}
const _4 = se({ name: "ElPopperContent" }),
  x4 = se({
    ..._4,
    props: km,
    emits: g4,
    setup(e, { expose: t, emit: n }) {
      const r = e,
        {
          popperInstanceRef: o,
          contentRef: i,
          triggerRef: l,
          role: a,
        } = Ie(Gu, void 0),
        s = Ie(zr, void 0),
        { nextZIndex: u } = ec(),
        c = Ee("popper"),
        f = B(),
        d = B("first"),
        h = B(),
        p = B();
      dt(sm, { arrowRef: h, arrowOffset: p }),
        s &&
          (s.addInputId || s.removeInputId) &&
          dt(zr, { ...s, addInputId: St, removeInputId: St });
      const b = B(r.zIndex || u()),
        v = B(!1);
      let _;
      const x = A(() => v4(r.referenceEl) || m(l)),
        g = A(() => [{ zIndex: m(b) }, r.popperStyle]),
        y = A(() => [
          c.b(),
          c.is("pure", r.pure),
          c.is(r.effect),
          r.popperClass,
        ]),
        w = A(() => (a && a.value === "dialog" ? "false" : void 0)),
        C = ({ referenceEl: N, popperContentEl: X, arrowEl: K }) => {
          const q = xd(r, { arrowEl: K, arrowOffset: m(p) });
          return Mm(N, X, q);
        },
        E = (N = !0) => {
          var X;
          (X = m(o)) == null || X.update(), N && (b.value = r.zIndex || u());
        },
        $ = () => {
          var N, X;
          const K = { name: "eventListeners", enabled: r.visible };
          (X = (N = m(o)) == null ? void 0 : N.setOptions) == null ||
            X.call(N, (q) => ({
              ...q,
              modifiers: [...(q.modifiers || []), K],
            })),
            E(!1),
            r.visible && r.focusOnShow
              ? (v.value = !0)
              : r.visible === !1 && (v.value = !1);
        },
        I = () => {
          n("focus");
        },
        D = (N) => {
          var X;
          ((X = N.detail) == null ? void 0 : X.focusReason) !== "pointer" &&
            ((d.value = "first"), n("blur"));
        },
        P = (N) => {
          r.visible &&
            !v.value &&
            (N.target && (d.value = N.target), (v.value = !0));
        },
        O = (N) => {
          r.trapping ||
            (N.detail.focusReason === "pointer" && N.preventDefault(),
            (v.value = !1));
        },
        S = () => {
          (v.value = !1), n("close");
        };
      return (
        rt(() => {
          let N;
          me(
            x,
            (X) => {
              var K;
              N == null || N();
              const q = m(o);
              if (
                ((K = q == null ? void 0 : q.destroy) == null || K.call(q), X)
              ) {
                const V = m(f);
                (i.value = V),
                  (o.value = C({
                    referenceEl: X,
                    popperContentEl: V,
                    arrowEl: m(h),
                  })),
                  (N = me(
                    () => X.getBoundingClientRect(),
                    () => E(),
                    { immediate: !0 }
                  ));
              } else o.value = void 0;
            },
            { immediate: !0 }
          ),
            me(
              () => r.triggerTargetEl,
              (X, K) => {
                _ == null || _(), (_ = void 0);
                const q = m(X || f.value),
                  V = m(K || f.value);
                hi(q) &&
                  (_ = me(
                    [a, () => r.ariaLabel, w, () => r.id],
                    (R) => {
                      ["role", "aria-label", "aria-modal", "id"].forEach(
                        (ne, ie) => {
                          zn(R[ie])
                            ? q.removeAttribute(ne)
                            : q.setAttribute(ne, R[ie]);
                        }
                      );
                    },
                    { immediate: !0 }
                  )),
                  V !== q &&
                    hi(V) &&
                    ["role", "aria-label", "aria-modal", "id"].forEach((R) => {
                      V.removeAttribute(R);
                    });
              },
              { immediate: !0 }
            ),
            me(() => r.visible, $, { immediate: !0 }),
            me(
              () => xd(r, { arrowEl: m(h), arrowOffset: m(p) }),
              (X) => {
                var K;
                return (K = o.value) == null ? void 0 : K.setOptions(X);
              }
            );
        }),
        Bt(() => {
          _ == null || _(), (_ = void 0);
        }),
        t({
          popperContentRef: f,
          popperInstanceRef: o,
          updatePopper: E,
          contentStyle: g,
        }),
        (N, X) => (
          L(),
          te(
            "div",
            {
              ref_key: "popperContentRef",
              ref: f,
              style: He(m(g)),
              class: W(m(y)),
              tabindex: "-1",
              onMouseenter: X[0] || (X[0] = (K) => N.$emit("mouseenter", K)),
              onMouseleave: X[1] || (X[1] = (K) => N.$emit("mouseleave", K)),
            },
            [
              oe(
                m(p4),
                {
                  trapped: v.value,
                  "trap-on-focus-in": !0,
                  "focus-trap-el": f.value,
                  "focus-start-el": d.value,
                  onFocusAfterTrapped: I,
                  onFocusAfterReleased: D,
                  onFocusin: P,
                  onFocusoutPrevented: O,
                  onReleaseRequested: S,
                },
                { default: re(() => [Oe(N.$slots, "default")]), _: 3 },
                8,
                ["trapped", "focus-trap-el", "focus-start-el"]
              ),
            ],
            38
          )
        )
      );
    },
  });
var C4 = De(x4, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue",
  ],
]);
const S4 = pt(K8),
  E4 = Ee("tooltip"),
  pc = Ge({
    ...u8,
    ...km,
    appendTo: { type: Fe([String, Object]), default: fm },
    content: { type: String, default: "" },
    rawContent: { type: Boolean, default: !1 },
    persistent: Boolean,
    ariaLabel: String,
    visible: { type: Fe(Boolean), default: null },
    transition: {
      type: String,
      default: `${E4.namespace.value}-fade-in-linear`,
    },
    teleported: { type: Boolean, default: !0 },
    disabled: { type: Boolean },
  }),
  Om = Ge({
    ...gm,
    disabled: Boolean,
    trigger: { type: Fe([String, Array]), default: "hover" },
    triggerKeys: { type: Fe(Array), default: () => [wo.enter, wo.space] },
  }),
  {
    useModelToggleProps: T4,
    useModelToggleEmits: $4,
    useModelToggle: M4,
  } = r8("visible"),
  A4 = Ge({
    ...pm,
    ...T4,
    ...pc,
    ...Om,
    ...hm,
    openDelay: { type: Number },
    visibleArrow: { type: Boolean, default: void 0 },
    showArrow: { type: Boolean, default: !0 },
  }),
  k4 = [...$4, "before-show", "before-hide", "show", "hide", "open", "close"],
  O4 = (e, t) => (we(e) ? e.includes(t) : e === t),
  Qr = (e, t, n) => (r) => {
    O4(m(e), t) && n(r);
  },
  P4 = se({ name: "ElTooltipTrigger" }),
  N4 = se({
    ...P4,
    props: Om,
    setup(e, { expose: t }) {
      const n = e,
        r = Ee("tooltip"),
        {
          controlled: o,
          id: i,
          open: l,
          onOpen: a,
          onClose: s,
          onToggle: u,
        } = Ie(Ju, void 0),
        c = B(null),
        f = () => {
          if (m(o) || n.disabled) return !0;
        },
        d = $n(n, "trigger"),
        h = Vn(f, Qr(d, "hover", a)),
        p = Vn(f, Qr(d, "hover", s)),
        b = Vn(
          f,
          Qr(d, "click", (y) => {
            y.button === 0 && u(y);
          })
        ),
        v = Vn(f, Qr(d, "focus", a)),
        _ = Vn(f, Qr(d, "focus", s)),
        x = Vn(
          f,
          Qr(d, "contextmenu", (y) => {
            y.preventDefault(), u(y);
          })
        ),
        g = Vn(f, (y) => {
          const { code: w } = y;
          n.triggerKeys.includes(w) && (y.preventDefault(), u(y));
        });
      return (
        t({ triggerRef: c }),
        (y, w) => (
          L(),
          he(
            m(Q8),
            {
              id: m(i),
              "virtual-ref": y.virtualRef,
              open: m(l),
              "virtual-triggering": y.virtualTriggering,
              class: W(m(r).e("trigger")),
              onBlur: m(_),
              onClick: m(b),
              onContextmenu: m(x),
              onFocus: m(v),
              onMouseenter: m(h),
              onMouseleave: m(p),
              onKeydown: m(g),
            },
            { default: re(() => [Oe(y.$slots, "default")]), _: 3 },
            8,
            [
              "id",
              "virtual-ref",
              "open",
              "virtual-triggering",
              "class",
              "onBlur",
              "onClick",
              "onContextmenu",
              "onFocus",
              "onMouseenter",
              "onMouseleave",
              "onKeydown",
            ]
          )
        )
      );
    },
  });
var I4 = De(N4, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue",
  ],
]);
const L4 = se({ name: "ElTooltipContent", inheritAttrs: !1 }),
  F4 = se({
    ...L4,
    props: pc,
    setup(e, { expose: t }) {
      const n = e,
        r = B(null),
        o = B(!1),
        {
          controlled: i,
          id: l,
          open: a,
          trigger: s,
          onClose: u,
          onOpen: c,
          onShow: f,
          onHide: d,
          onBeforeShow: h,
          onBeforeHide: p,
        } = Ie(Ju, void 0),
        b = A(() => n.persistent);
      Bt(() => {
        o.value = !0;
      });
      const v = A(() => (m(b) ? !0 : m(a))),
        _ = A(() => (n.disabled ? !1 : m(a))),
        x = A(() => {
          var S;
          return (S = n.style) != null ? S : {};
        }),
        g = A(() => !m(a)),
        y = () => {
          d();
        },
        w = () => {
          if (m(i)) return !0;
        },
        C = Vn(w, () => {
          n.enterable && m(s) === "hover" && c();
        }),
        E = Vn(w, () => {
          m(s) === "hover" && u();
        }),
        $ = () => {
          var S, N;
          (N = (S = r.value) == null ? void 0 : S.updatePopper) == null ||
            N.call(S),
            h == null || h();
        },
        I = () => {
          p == null || p();
        },
        D = () => {
          f(),
            (O = gx(
              A(() => {
                var S;
                return (S = r.value) == null ? void 0 : S.popperContentRef;
              }),
              () => {
                if (m(i)) return;
                m(s) !== "hover" && u();
              }
            ));
        },
        P = () => {
          n.virtualTriggering || u();
        };
      let O;
      return (
        me(
          () => m(a),
          (S) => {
            S || O == null || O();
          },
          { flush: "post" }
        ),
        me(
          () => n.content,
          () => {
            var S, N;
            (N = (S = r.value) == null ? void 0 : S.updatePopper) == null ||
              N.call(S);
          }
        ),
        t({ contentRef: r }),
        (S, N) => (
          L(),
          he(
            J0,
            { disabled: !S.teleported, to: S.appendTo },
            [
              oe(
                hr,
                {
                  name: S.transition,
                  onAfterLeave: y,
                  onBeforeEnter: $,
                  onAfterEnter: D,
                  onBeforeLeave: I,
                },
                {
                  default: re(() => [
                    m(v)
                      ? ot(
                          (L(),
                          he(
                            m(C4),
                            Lr(
                              {
                                key: 0,
                                id: m(l),
                                ref_key: "contentRef",
                                ref: r,
                              },
                              S.$attrs,
                              {
                                "aria-label": S.ariaLabel,
                                "aria-hidden": m(g),
                                "boundaries-padding": S.boundariesPadding,
                                "fallback-placements": S.fallbackPlacements,
                                "gpu-acceleration": S.gpuAcceleration,
                                offset: S.offset,
                                placement: S.placement,
                                "popper-options": S.popperOptions,
                                strategy: S.strategy,
                                effect: S.effect,
                                enterable: S.enterable,
                                pure: S.pure,
                                "popper-class": S.popperClass,
                                "popper-style": [S.popperStyle, m(x)],
                                "reference-el": S.referenceEl,
                                "trigger-target-el": S.triggerTargetEl,
                                visible: m(_),
                                "z-index": S.zIndex,
                                onMouseenter: m(C),
                                onMouseleave: m(E),
                                onBlur: P,
                                onClose: m(u),
                              }
                            ),
                            {
                              default: re(() => [
                                ge(" Workaround bug #6378 "),
                                o.value
                                  ? ge("v-if", !0)
                                  : Oe(S.$slots, "default", { key: 0 }),
                              ]),
                              _: 3,
                            },
                            16,
                            [
                              "id",
                              "aria-label",
                              "aria-hidden",
                              "boundaries-padding",
                              "fallback-placements",
                              "gpu-acceleration",
                              "offset",
                              "placement",
                              "popper-options",
                              "strategy",
                              "effect",
                              "enterable",
                              "pure",
                              "popper-class",
                              "popper-style",
                              "reference-el",
                              "trigger-target-el",
                              "visible",
                              "z-index",
                              "onMouseenter",
                              "onMouseleave",
                              "onClose",
                            ]
                          )),
                          [[cn, m(_)]]
                        )
                      : ge("v-if", !0),
                  ]),
                  _: 3,
                },
                8,
                ["name"]
              ),
            ],
            8,
            ["disabled", "to"]
          )
        )
      );
    },
  });
var R4 = De(F4, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue",
  ],
]);
const B4 = ["innerHTML"],
  V4 = { key: 1 },
  D4 = se({ name: "ElTooltip" }),
  H4 = se({
    ...D4,
    props: A4,
    emits: k4,
    setup(e, { expose: t, emit: n }) {
      const r = e;
      s8();
      const o = A(() => (xn(r.openDelay), r.openDelay || r.showAfter)),
        i = A(
          () => (
            xn(r.visibleArrow),
            Lt(r.visibleArrow) ? r.visibleArrow : r.showArrow
          )
        ),
        l = ya(),
        a = B(),
        s = B(),
        u = () => {
          var g;
          const y = m(a);
          y && ((g = y.popperInstanceRef) == null || g.update());
        },
        c = B(!1),
        f = B(),
        {
          show: d,
          hide: h,
          hasUpdateHandler: p,
        } = M4({ indicator: c, toggleReason: f }),
        { onOpen: b, onClose: v } = c8({
          showAfter: o,
          hideAfter: $n(r, "hideAfter"),
          open: d,
          close: h,
        }),
        _ = A(() => Lt(r.visible) && !p.value);
      dt(Ju, {
        controlled: _,
        id: l,
        open: gu(c),
        trigger: $n(r, "trigger"),
        onOpen: (g) => {
          b(g);
        },
        onClose: (g) => {
          v(g);
        },
        onToggle: (g) => {
          m(c) ? v(g) : b(g);
        },
        onShow: () => {
          n("show", f.value);
        },
        onHide: () => {
          n("hide", f.value);
        },
        onBeforeShow: () => {
          n("before-show", f.value);
        },
        onBeforeHide: () => {
          n("before-hide", f.value);
        },
        updatePopper: u,
      }),
        me(
          () => r.disabled,
          (g) => {
            g && c.value && (c.value = !1);
          }
        );
      const x = () => {
        var g, y;
        const w =
          (y = (g = s.value) == null ? void 0 : g.contentRef) == null
            ? void 0
            : y.popperContentRef;
        return w && w.contains(document.activeElement);
      };
      return (
        th(() => c.value && h()),
        t({
          popperRef: a,
          contentRef: s,
          isFocusInsideContent: x,
          updatePopper: u,
          onOpen: b,
          onClose: v,
          hide: h,
        }),
        (g, y) => (
          L(),
          he(
            m(S4),
            { ref_key: "popperRef", ref: a, role: g.role },
            {
              default: re(() => [
                oe(
                  I4,
                  {
                    disabled: g.disabled,
                    trigger: g.trigger,
                    "trigger-keys": g.triggerKeys,
                    "virtual-ref": g.virtualRef,
                    "virtual-triggering": g.virtualTriggering,
                  },
                  {
                    default: re(() => [
                      g.$slots.default
                        ? Oe(g.$slots, "default", { key: 0 })
                        : ge("v-if", !0),
                    ]),
                    _: 3,
                  },
                  8,
                  [
                    "disabled",
                    "trigger",
                    "trigger-keys",
                    "virtual-ref",
                    "virtual-triggering",
                  ]
                ),
                oe(
                  R4,
                  {
                    ref_key: "contentRef",
                    ref: s,
                    "aria-label": g.ariaLabel,
                    "boundaries-padding": g.boundariesPadding,
                    content: g.content,
                    disabled: g.disabled,
                    effect: g.effect,
                    enterable: g.enterable,
                    "fallback-placements": g.fallbackPlacements,
                    "hide-after": g.hideAfter,
                    "gpu-acceleration": g.gpuAcceleration,
                    offset: g.offset,
                    persistent: g.persistent,
                    "popper-class": g.popperClass,
                    "popper-style": g.popperStyle,
                    placement: g.placement,
                    "popper-options": g.popperOptions,
                    pure: g.pure,
                    "raw-content": g.rawContent,
                    "reference-el": g.referenceEl,
                    "trigger-target-el": g.triggerTargetEl,
                    "show-after": m(o),
                    strategy: g.strategy,
                    teleported: g.teleported,
                    transition: g.transition,
                    "virtual-triggering": g.virtualTriggering,
                    "z-index": g.zIndex,
                    "append-to": g.appendTo,
                  },
                  {
                    default: re(() => [
                      Oe(g.$slots, "content", {}, () => [
                        g.rawContent
                          ? (L(),
                            te(
                              "span",
                              { key: 0, innerHTML: g.content },
                              null,
                              8,
                              B4
                            ))
                          : (L(), te("span", V4, Je(g.content), 1)),
                      ]),
                      m(i)
                        ? (L(),
                          he(
                            m(Y8),
                            { key: 0, "arrow-offset": g.arrowOffset },
                            null,
                            8,
                            ["arrow-offset"]
                          ))
                        : ge("v-if", !0),
                    ]),
                    _: 3,
                  },
                  8,
                  [
                    "aria-label",
                    "boundaries-padding",
                    "content",
                    "disabled",
                    "effect",
                    "enterable",
                    "fallback-placements",
                    "hide-after",
                    "gpu-acceleration",
                    "offset",
                    "persistent",
                    "popper-class",
                    "popper-style",
                    "placement",
                    "popper-options",
                    "pure",
                    "raw-content",
                    "reference-el",
                    "trigger-target-el",
                    "show-after",
                    "strategy",
                    "teleported",
                    "transition",
                    "virtual-triggering",
                    "z-index",
                    "append-to",
                  ]
                ),
              ]),
              _: 3,
            },
            8,
            ["role"]
          )
        )
      );
    },
  });
var z4 = De(H4, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue",
  ],
]);
const hc = pt(z4),
  W4 = (e, t) => {
    Zu(
      {
        from: "type.text",
        replacement: "link",
        version: "3.0.0",
        scope: "props",
        ref: "https://element-plus.org/en-US/component/button.html#button-attributes",
      },
      A(() => e.type === "text")
    );
    const n = Ie(rm, void 0),
      r = Xr("button"),
      { form: o } = On(),
      i = jt(A(() => (n == null ? void 0 : n.size))),
      l = Gr(),
      a = B(),
      s = Oo(),
      u = A(() => e.type || (n == null ? void 0 : n.type) || ""),
      c = A(() => {
        var h, p, b;
        return (b =
          (p = e.autoInsertSpace) != null
            ? p
            : (h = r.value) == null
            ? void 0
            : h.autoInsertSpace) != null
          ? b
          : !1;
      }),
      f = A(() => {
        var h;
        const p = (h = s.default) == null ? void 0 : h.call(s);
        if (c.value && (p == null ? void 0 : p.length) === 1) {
          const b = p[0];
          if ((b == null ? void 0 : b.type) === Mi) {
            const v = b.children;
            return /^\p{Unified_Ideograph}{2}$/u.test(v.trim());
          }
        }
        return !1;
      });
    return {
      _disabled: l,
      _size: i,
      _type: u,
      _ref: a,
      shouldAddSpace: f,
      handleClick: (h) => {
        e.nativeType === "reset" && (o == null || o.resetFields()),
          t("click", h);
      },
    };
  },
  j4 = [
    "default",
    "primary",
    "success",
    "warning",
    "info",
    "danger",
    "text",
    "",
  ],
  K4 = ["button", "submit", "reset"],
  Ms = Ge({
    size: Kn,
    disabled: Boolean,
    type: { type: String, values: j4, default: "" },
    icon: { type: dr },
    nativeType: { type: String, values: K4, default: "button" },
    loading: Boolean,
    loadingIcon: { type: dr, default: () => va },
    plain: Boolean,
    text: Boolean,
    link: Boolean,
    bg: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    color: String,
    dark: Boolean,
    autoInsertSpace: { type: Boolean, default: void 0 },
  }),
  q4 = { click: (e) => e instanceof MouseEvent };
function gt(e, t) {
  U4(e) && (e = "100%");
  var n = Y4(e);
  return (
    (e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e)))),
    n && (e = parseInt(String(e * t), 10) / 100),
    Math.abs(e - t) < 1e-6
      ? 1
      : (t === 360
          ? (e = (e < 0 ? (e % t) + t : e % t) / parseFloat(String(t)))
          : (e = (e % t) / parseFloat(String(t))),
        e)
  );
}
function Xi(e) {
  return Math.min(1, Math.max(0, e));
}
function U4(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function Y4(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function Pm(e) {
  return (e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function Gi(e) {
  return e <= 1 ? "".concat(Number(e) * 100, "%") : e;
}
function kr(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function X4(e, t, n) {
  return { r: gt(e, 255) * 255, g: gt(t, 255) * 255, b: gt(n, 255) * 255 };
}
function Cd(e, t, n) {
  (e = gt(e, 255)), (t = gt(t, 255)), (n = gt(n, 255));
  var r = Math.max(e, t, n),
    o = Math.min(e, t, n),
    i = 0,
    l = 0,
    a = (r + o) / 2;
  if (r === o) (l = 0), (i = 0);
  else {
    var s = r - o;
    switch (((l = a > 0.5 ? s / (2 - r - o) : s / (r + o)), r)) {
      case e:
        i = (t - n) / s + (t < n ? 6 : 0);
        break;
      case t:
        i = (n - e) / s + 2;
        break;
      case n:
        i = (e - t) / s + 4;
        break;
    }
    i /= 6;
  }
  return { h: i, s: l, l: a };
}
function za(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * (6 * n)
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function G4(e, t, n) {
  var r, o, i;
  if (((e = gt(e, 360)), (t = gt(t, 100)), (n = gt(n, 100)), t === 0))
    (o = n), (i = n), (r = n);
  else {
    var l = n < 0.5 ? n * (1 + t) : n + t - n * t,
      a = 2 * n - l;
    (r = za(a, l, e + 1 / 3)), (o = za(a, l, e)), (i = za(a, l, e - 1 / 3));
  }
  return { r: r * 255, g: o * 255, b: i * 255 };
}
function Sd(e, t, n) {
  (e = gt(e, 255)), (t = gt(t, 255)), (n = gt(n, 255));
  var r = Math.max(e, t, n),
    o = Math.min(e, t, n),
    i = 0,
    l = r,
    a = r - o,
    s = r === 0 ? 0 : a / r;
  if (r === o) i = 0;
  else {
    switch (r) {
      case e:
        i = (t - n) / a + (t < n ? 6 : 0);
        break;
      case t:
        i = (n - e) / a + 2;
        break;
      case n:
        i = (e - t) / a + 4;
        break;
    }
    i /= 6;
  }
  return { h: i, s, v: l };
}
function J4(e, t, n) {
  (e = gt(e, 360) * 6), (t = gt(t, 100)), (n = gt(n, 100));
  var r = Math.floor(e),
    o = e - r,
    i = n * (1 - t),
    l = n * (1 - o * t),
    a = n * (1 - (1 - o) * t),
    s = r % 6,
    u = [n, l, i, i, a, n][s],
    c = [a, n, n, l, i, i][s],
    f = [i, i, a, n, n, l][s];
  return { r: u * 255, g: c * 255, b: f * 255 };
}
function Ed(e, t, n, r) {
  var o = [
    kr(Math.round(e).toString(16)),
    kr(Math.round(t).toString(16)),
    kr(Math.round(n).toString(16)),
  ];
  return r &&
    o[0].startsWith(o[0].charAt(1)) &&
    o[1].startsWith(o[1].charAt(1)) &&
    o[2].startsWith(o[2].charAt(1))
    ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0)
    : o.join("");
}
function Z4(e, t, n, r, o) {
  var i = [
    kr(Math.round(e).toString(16)),
    kr(Math.round(t).toString(16)),
    kr(Math.round(n).toString(16)),
    kr(Q4(r)),
  ];
  return o &&
    i[0].startsWith(i[0].charAt(1)) &&
    i[1].startsWith(i[1].charAt(1)) &&
    i[2].startsWith(i[2].charAt(1)) &&
    i[3].startsWith(i[3].charAt(1))
    ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0)
    : i.join("");
}
function Q4(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function Td(e) {
  return Dt(e) / 255;
}
function Dt(e) {
  return parseInt(e, 16);
}
function e3(e) {
  return { r: e >> 16, g: (e & 65280) >> 8, b: e & 255 };
}
var As = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};
function t3(e) {
  var t = { r: 0, g: 0, b: 0 },
    n = 1,
    r = null,
    o = null,
    i = null,
    l = !1,
    a = !1;
  return (
    typeof e == "string" && (e = o3(e)),
    typeof e == "object" &&
      (In(e.r) && In(e.g) && In(e.b)
        ? ((t = X4(e.r, e.g, e.b)),
          (l = !0),
          (a = String(e.r).substr(-1) === "%" ? "prgb" : "rgb"))
        : In(e.h) && In(e.s) && In(e.v)
        ? ((r = Gi(e.s)),
          (o = Gi(e.v)),
          (t = J4(e.h, r, o)),
          (l = !0),
          (a = "hsv"))
        : In(e.h) &&
          In(e.s) &&
          In(e.l) &&
          ((r = Gi(e.s)),
          (i = Gi(e.l)),
          (t = G4(e.h, r, i)),
          (l = !0),
          (a = "hsl")),
      Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)),
    (n = Pm(n)),
    {
      ok: l,
      format: e.format || a,
      r: Math.min(255, Math.max(t.r, 0)),
      g: Math.min(255, Math.max(t.g, 0)),
      b: Math.min(255, Math.max(t.b, 0)),
      a: n,
    }
  );
}
var n3 = "[-\\+]?\\d+%?",
  r3 = "[-\\+]?\\d*\\.\\d+%?",
  ar = "(?:".concat(r3, ")|(?:").concat(n3, ")"),
  Wa = "[\\s|\\(]+("
    .concat(ar, ")[,|\\s]+(")
    .concat(ar, ")[,|\\s]+(")
    .concat(ar, ")\\s*\\)?"),
  ja = "[\\s|\\(]+("
    .concat(ar, ")[,|\\s]+(")
    .concat(ar, ")[,|\\s]+(")
    .concat(ar, ")[,|\\s]+(")
    .concat(ar, ")\\s*\\)?"),
  nn = {
    CSS_UNIT: new RegExp(ar),
    rgb: new RegExp("rgb" + Wa),
    rgba: new RegExp("rgba" + ja),
    hsl: new RegExp("hsl" + Wa),
    hsla: new RegExp("hsla" + ja),
    hsv: new RegExp("hsv" + Wa),
    hsva: new RegExp("hsva" + ja),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
function o3(e) {
  if (((e = e.trim().toLowerCase()), e.length === 0)) return !1;
  var t = !1;
  if (As[e]) (e = As[e]), (t = !0);
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  var n = nn.rgb.exec(e);
  return n
    ? { r: n[1], g: n[2], b: n[3] }
    : ((n = nn.rgba.exec(e)),
      n
        ? { r: n[1], g: n[2], b: n[3], a: n[4] }
        : ((n = nn.hsl.exec(e)),
          n
            ? { h: n[1], s: n[2], l: n[3] }
            : ((n = nn.hsla.exec(e)),
              n
                ? { h: n[1], s: n[2], l: n[3], a: n[4] }
                : ((n = nn.hsv.exec(e)),
                  n
                    ? { h: n[1], s: n[2], v: n[3] }
                    : ((n = nn.hsva.exec(e)),
                      n
                        ? { h: n[1], s: n[2], v: n[3], a: n[4] }
                        : ((n = nn.hex8.exec(e)),
                          n
                            ? {
                                r: Dt(n[1]),
                                g: Dt(n[2]),
                                b: Dt(n[3]),
                                a: Td(n[4]),
                                format: t ? "name" : "hex8",
                              }
                            : ((n = nn.hex6.exec(e)),
                              n
                                ? {
                                    r: Dt(n[1]),
                                    g: Dt(n[2]),
                                    b: Dt(n[3]),
                                    format: t ? "name" : "hex",
                                  }
                                : ((n = nn.hex4.exec(e)),
                                  n
                                    ? {
                                        r: Dt(n[1] + n[1]),
                                        g: Dt(n[2] + n[2]),
                                        b: Dt(n[3] + n[3]),
                                        a: Td(n[4] + n[4]),
                                        format: t ? "name" : "hex8",
                                      }
                                    : ((n = nn.hex3.exec(e)),
                                      n
                                        ? {
                                            r: Dt(n[1] + n[1]),
                                            g: Dt(n[2] + n[2]),
                                            b: Dt(n[3] + n[3]),
                                            format: t ? "name" : "hex",
                                          }
                                        : !1)))))))));
}
function In(e) {
  return Boolean(nn.CSS_UNIT.exec(String(e)));
}
var i3 = (function () {
  function e(t, n) {
    t === void 0 && (t = ""), n === void 0 && (n = {});
    var r;
    if (t instanceof e) return t;
    typeof t == "number" && (t = e3(t)), (this.originalInput = t);
    var o = t3(t);
    (this.originalInput = t),
      (this.r = o.r),
      (this.g = o.g),
      (this.b = o.b),
      (this.a = o.a),
      (this.roundA = Math.round(100 * this.a) / 100),
      (this.format = (r = n.format) !== null && r !== void 0 ? r : o.format),
      (this.gradientType = n.gradientType),
      this.r < 1 && (this.r = Math.round(this.r)),
      this.g < 1 && (this.g = Math.round(this.g)),
      this.b < 1 && (this.b = Math.round(this.b)),
      (this.isValid = o.ok);
  }
  return (
    (e.prototype.isDark = function () {
      return this.getBrightness() < 128;
    }),
    (e.prototype.isLight = function () {
      return !this.isDark();
    }),
    (e.prototype.getBrightness = function () {
      var t = this.toRgb();
      return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
    }),
    (e.prototype.getLuminance = function () {
      var t = this.toRgb(),
        n,
        r,
        o,
        i = t.r / 255,
        l = t.g / 255,
        a = t.b / 255;
      return (
        i <= 0.03928
          ? (n = i / 12.92)
          : (n = Math.pow((i + 0.055) / 1.055, 2.4)),
        l <= 0.03928
          ? (r = l / 12.92)
          : (r = Math.pow((l + 0.055) / 1.055, 2.4)),
        a <= 0.03928
          ? (o = a / 12.92)
          : (o = Math.pow((a + 0.055) / 1.055, 2.4)),
        0.2126 * n + 0.7152 * r + 0.0722 * o
      );
    }),
    (e.prototype.getAlpha = function () {
      return this.a;
    }),
    (e.prototype.setAlpha = function (t) {
      return (
        (this.a = Pm(t)), (this.roundA = Math.round(100 * this.a) / 100), this
      );
    }),
    (e.prototype.toHsv = function () {
      var t = Sd(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
    }),
    (e.prototype.toHsvString = function () {
      var t = Sd(this.r, this.g, this.b),
        n = Math.round(t.h * 360),
        r = Math.round(t.s * 100),
        o = Math.round(t.v * 100);
      return this.a === 1
        ? "hsv(".concat(n, ", ").concat(r, "%, ").concat(o, "%)")
        : "hsva("
            .concat(n, ", ")
            .concat(r, "%, ")
            .concat(o, "%, ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toHsl = function () {
      var t = Cd(this.r, this.g, this.b);
      return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
    }),
    (e.prototype.toHslString = function () {
      var t = Cd(this.r, this.g, this.b),
        n = Math.round(t.h * 360),
        r = Math.round(t.s * 100),
        o = Math.round(t.l * 100);
      return this.a === 1
        ? "hsl(".concat(n, ", ").concat(r, "%, ").concat(o, "%)")
        : "hsla("
            .concat(n, ", ")
            .concat(r, "%, ")
            .concat(o, "%, ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toHex = function (t) {
      return t === void 0 && (t = !1), Ed(this.r, this.g, this.b, t);
    }),
    (e.prototype.toHexString = function (t) {
      return t === void 0 && (t = !1), "#" + this.toHex(t);
    }),
    (e.prototype.toHex8 = function (t) {
      return t === void 0 && (t = !1), Z4(this.r, this.g, this.b, this.a, t);
    }),
    (e.prototype.toHex8String = function (t) {
      return t === void 0 && (t = !1), "#" + this.toHex8(t);
    }),
    (e.prototype.toRgb = function () {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a,
      };
    }),
    (e.prototype.toRgbString = function () {
      var t = Math.round(this.r),
        n = Math.round(this.g),
        r = Math.round(this.b);
      return this.a === 1
        ? "rgb(".concat(t, ", ").concat(n, ", ").concat(r, ")")
        : "rgba("
            .concat(t, ", ")
            .concat(n, ", ")
            .concat(r, ", ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toPercentageRgb = function () {
      var t = function (n) {
        return "".concat(Math.round(gt(n, 255) * 100), "%");
      };
      return { r: t(this.r), g: t(this.g), b: t(this.b), a: this.a };
    }),
    (e.prototype.toPercentageRgbString = function () {
      var t = function (n) {
        return Math.round(gt(n, 255) * 100);
      };
      return this.a === 1
        ? "rgb("
            .concat(t(this.r), "%, ")
            .concat(t(this.g), "%, ")
            .concat(t(this.b), "%)")
        : "rgba("
            .concat(t(this.r), "%, ")
            .concat(t(this.g), "%, ")
            .concat(t(this.b), "%, ")
            .concat(this.roundA, ")");
    }),
    (e.prototype.toName = function () {
      if (this.a === 0) return "transparent";
      if (this.a < 1) return !1;
      for (
        var t = "#" + Ed(this.r, this.g, this.b, !1),
          n = 0,
          r = Object.entries(As);
        n < r.length;
        n++
      ) {
        var o = r[n],
          i = o[0],
          l = o[1];
        if (t === l) return i;
      }
      return !1;
    }),
    (e.prototype.toString = function (t) {
      var n = Boolean(t);
      t = t != null ? t : this.format;
      var r = !1,
        o = this.a < 1 && this.a >= 0,
        i = !n && o && (t.startsWith("hex") || t === "name");
      return i
        ? t === "name" && this.a === 0
          ? this.toName()
          : this.toRgbString()
        : (t === "rgb" && (r = this.toRgbString()),
          t === "prgb" && (r = this.toPercentageRgbString()),
          (t === "hex" || t === "hex6") && (r = this.toHexString()),
          t === "hex3" && (r = this.toHexString(!0)),
          t === "hex4" && (r = this.toHex8String(!0)),
          t === "hex8" && (r = this.toHex8String()),
          t === "name" && (r = this.toName()),
          t === "hsl" && (r = this.toHslString()),
          t === "hsv" && (r = this.toHsvString()),
          r || this.toHexString());
    }),
    (e.prototype.toNumber = function () {
      return (
        (Math.round(this.r) << 16) +
        (Math.round(this.g) << 8) +
        Math.round(this.b)
      );
    }),
    (e.prototype.clone = function () {
      return new e(this.toString());
    }),
    (e.prototype.lighten = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.l += t / 100), (n.l = Xi(n.l)), new e(n);
    }),
    (e.prototype.brighten = function (t) {
      t === void 0 && (t = 10);
      var n = this.toRgb();
      return (
        (n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100))))),
        (n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100))))),
        (n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100))))),
        new e(n)
      );
    }),
    (e.prototype.darken = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.l -= t / 100), (n.l = Xi(n.l)), new e(n);
    }),
    (e.prototype.tint = function (t) {
      return t === void 0 && (t = 10), this.mix("white", t);
    }),
    (e.prototype.shade = function (t) {
      return t === void 0 && (t = 10), this.mix("black", t);
    }),
    (e.prototype.desaturate = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.s -= t / 100), (n.s = Xi(n.s)), new e(n);
    }),
    (e.prototype.saturate = function (t) {
      t === void 0 && (t = 10);
      var n = this.toHsl();
      return (n.s += t / 100), (n.s = Xi(n.s)), new e(n);
    }),
    (e.prototype.greyscale = function () {
      return this.desaturate(100);
    }),
    (e.prototype.spin = function (t) {
      var n = this.toHsl(),
        r = (n.h + t) % 360;
      return (n.h = r < 0 ? 360 + r : r), new e(n);
    }),
    (e.prototype.mix = function (t, n) {
      n === void 0 && (n = 50);
      var r = this.toRgb(),
        o = new e(t).toRgb(),
        i = n / 100,
        l = {
          r: (o.r - r.r) * i + r.r,
          g: (o.g - r.g) * i + r.g,
          b: (o.b - r.b) * i + r.b,
          a: (o.a - r.a) * i + r.a,
        };
      return new e(l);
    }),
    (e.prototype.analogous = function (t, n) {
      t === void 0 && (t = 6), n === void 0 && (n = 30);
      var r = this.toHsl(),
        o = 360 / n,
        i = [this];
      for (r.h = (r.h - ((o * t) >> 1) + 720) % 360; --t; )
        (r.h = (r.h + o) % 360), i.push(new e(r));
      return i;
    }),
    (e.prototype.complement = function () {
      var t = this.toHsl();
      return (t.h = (t.h + 180) % 360), new e(t);
    }),
    (e.prototype.monochromatic = function (t) {
      t === void 0 && (t = 6);
      for (
        var n = this.toHsv(), r = n.h, o = n.s, i = n.v, l = [], a = 1 / t;
        t--;

      )
        l.push(new e({ h: r, s: o, v: i })), (i = (i + a) % 1);
      return l;
    }),
    (e.prototype.splitcomplement = function () {
      var t = this.toHsl(),
        n = t.h;
      return [
        this,
        new e({ h: (n + 72) % 360, s: t.s, l: t.l }),
        new e({ h: (n + 216) % 360, s: t.s, l: t.l }),
      ];
    }),
    (e.prototype.onBackground = function (t) {
      var n = this.toRgb(),
        r = new e(t).toRgb();
      return new e({
        r: r.r + (n.r - r.r) * n.a,
        g: r.g + (n.g - r.g) * n.a,
        b: r.b + (n.b - r.b) * n.a,
      });
    }),
    (e.prototype.triad = function () {
      return this.polyad(3);
    }),
    (e.prototype.tetrad = function () {
      return this.polyad(4);
    }),
    (e.prototype.polyad = function (t) {
      for (
        var n = this.toHsl(), r = n.h, o = [this], i = 360 / t, l = 1;
        l < t;
        l++
      )
        o.push(new e({ h: (r + l * i) % 360, s: n.s, l: n.l }));
      return o;
    }),
    (e.prototype.equals = function (t) {
      return this.toRgbString() === new e(t).toRgbString();
    }),
    e
  );
})();
function er(e, t = 20) {
  return e.mix("#141414", t).toString();
}
function l3(e) {
  const t = Gr(),
    n = Ee("button");
  return A(() => {
    let r = {};
    const o = e.color;
    if (o) {
      const i = new i3(o),
        l = e.dark ? i.tint(20).toString() : er(i, 20);
      if (e.plain)
        (r = n.cssVarBlock({
          "bg-color": e.dark ? er(i, 90) : i.tint(90).toString(),
          "text-color": o,
          "border-color": e.dark ? er(i, 50) : i.tint(50).toString(),
          "hover-text-color": `var(${n.cssVarName("color-white")})`,
          "hover-bg-color": o,
          "hover-border-color": o,
          "active-bg-color": l,
          "active-text-color": `var(${n.cssVarName("color-white")})`,
          "active-border-color": l,
        })),
          t.value &&
            ((r[n.cssVarBlockName("disabled-bg-color")] = e.dark
              ? er(i, 90)
              : i.tint(90).toString()),
            (r[n.cssVarBlockName("disabled-text-color")] = e.dark
              ? er(i, 50)
              : i.tint(50).toString()),
            (r[n.cssVarBlockName("disabled-border-color")] = e.dark
              ? er(i, 80)
              : i.tint(80).toString()));
      else {
        const a = e.dark ? er(i, 30) : i.tint(30).toString(),
          s = i.isDark()
            ? `var(${n.cssVarName("color-white")})`
            : `var(${n.cssVarName("color-black")})`;
        if (
          ((r = n.cssVarBlock({
            "bg-color": o,
            "text-color": s,
            "border-color": o,
            "hover-bg-color": a,
            "hover-text-color": s,
            "hover-border-color": a,
            "active-bg-color": l,
            "active-border-color": l,
          })),
          t.value)
        ) {
          const u = e.dark ? er(i, 50) : i.tint(50).toString();
          (r[n.cssVarBlockName("disabled-bg-color")] = u),
            (r[n.cssVarBlockName("disabled-text-color")] = e.dark
              ? "rgba(255, 255, 255, 0.5)"
              : `var(${n.cssVarName("color-white")})`),
            (r[n.cssVarBlockName("disabled-border-color")] = u);
        }
      }
    }
    return r;
  });
}
const a3 = ["aria-disabled", "disabled", "autofocus", "type"],
  s3 = se({ name: "ElButton" }),
  u3 = se({
    ...s3,
    props: Ms,
    emits: q4,
    setup(e, { expose: t, emit: n }) {
      const r = e,
        o = l3(r),
        i = Ee("button"),
        {
          _ref: l,
          _size: a,
          _type: s,
          _disabled: u,
          shouldAddSpace: c,
          handleClick: f,
        } = W4(r, n);
      return (
        t({ ref: l, size: a, type: s, disabled: u, shouldAddSpace: c }),
        (d, h) => (
          L(),
          te(
            "button",
            {
              ref_key: "_ref",
              ref: l,
              class: W([
                m(i).b(),
                m(i).m(m(s)),
                m(i).m(m(a)),
                m(i).is("disabled", m(u)),
                m(i).is("loading", d.loading),
                m(i).is("plain", d.plain),
                m(i).is("round", d.round),
                m(i).is("circle", d.circle),
                m(i).is("text", d.text),
                m(i).is("link", d.link),
                m(i).is("has-bg", d.bg),
              ]),
              "aria-disabled": m(u) || d.loading,
              disabled: m(u) || d.loading,
              autofocus: d.autofocus,
              type: d.nativeType,
              style: He(m(o)),
              onClick: h[0] || (h[0] = (...p) => m(f) && m(f)(...p)),
            },
            [
              d.loading
                ? (L(),
                  te(
                    Ue,
                    { key: 0 },
                    [
                      d.$slots.loading
                        ? Oe(d.$slots, "loading", { key: 0 })
                        : (L(),
                          he(
                            m(at),
                            { key: 1, class: W(m(i).is("loading")) },
                            {
                              default: re(() => [(L(), he(mt(d.loadingIcon)))]),
                              _: 1,
                            },
                            8,
                            ["class"]
                          )),
                    ],
                    64
                  ))
                : d.icon || d.$slots.icon
                ? (L(),
                  he(
                    m(at),
                    { key: 1 },
                    {
                      default: re(() => [
                        d.icon
                          ? (L(), he(mt(d.icon), { key: 0 }))
                          : Oe(d.$slots, "icon", { key: 1 }),
                      ]),
                      _: 3,
                    }
                  ))
                : ge("v-if", !0),
              d.$slots.default
                ? (L(),
                  te(
                    "span",
                    { key: 2, class: W({ [m(i).em("text", "expand")]: m(c) }) },
                    [Oe(d.$slots, "default")],
                    2
                  ))
                : ge("v-if", !0),
            ],
            14,
            a3
          )
        )
      );
    },
  });
var c3 = De(u3, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue",
  ],
]);
const f3 = { size: Ms.size, type: Ms.type },
  d3 = se({ name: "ElButtonGroup" }),
  p3 = se({
    ...d3,
    props: f3,
    setup(e) {
      const t = e;
      dt(rm, Et({ size: $n(t, "size"), type: $n(t, "type") }));
      const n = Ee("button");
      return (r, o) => (
        L(),
        te(
          "div",
          { class: W(`${m(n).b("group")}`) },
          [Oe(r.$slots, "default")],
          2
        )
      );
    },
  });
var Nm = De(p3, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue",
  ],
]);
const Im = pt(c3, { ButtonGroup: Nm });
Kt(Nm);
const rr = new Map();
let $d;
lt &&
  (document.addEventListener("mousedown", (e) => ($d = e)),
  document.addEventListener("mouseup", (e) => {
    for (const t of rr.values())
      for (const { documentHandler: n } of t) n(e, $d);
  }));
function Md(e, t) {
  let n = [];
  return (
    Array.isArray(t.arg) ? (n = t.arg) : hi(t.arg) && n.push(t.arg),
    function (r, o) {
      const i = t.instance.popperRef,
        l = r.target,
        a = o == null ? void 0 : o.target,
        s = !t || !t.instance,
        u = !l || !a,
        c = e.contains(l) || e.contains(a),
        f = e === l,
        d =
          (n.length && n.some((p) => (p == null ? void 0 : p.contains(l)))) ||
          (n.length && n.includes(a)),
        h = i && (i.contains(l) || i.contains(a));
      s || u || c || f || d || h || t.value(r, o);
    }
  );
}
const Lm = {
    beforeMount(e, t) {
      rr.has(e) || rr.set(e, []),
        rr.get(e).push({ documentHandler: Md(e, t), bindingFn: t.value });
    },
    updated(e, t) {
      rr.has(e) || rr.set(e, []);
      const n = rr.get(e),
        r = n.findIndex((i) => i.bindingFn === t.oldValue),
        o = { documentHandler: Md(e, t), bindingFn: t.value };
      r >= 0 ? n.splice(r, 1, o) : n.push(o);
    },
    unmounted(e) {
      rr.delete(e);
    },
  },
  h3 = 100,
  m3 = 600,
  Ad = {
    beforeMount(e, t) {
      const n = t.value,
        { interval: r = h3, delay: o = m3 } = Te(n) ? {} : n;
      let i, l;
      const a = () => (Te(n) ? n() : n.handler()),
        s = () => {
          l && (clearTimeout(l), (l = void 0)),
            i && (clearInterval(i), (i = void 0));
        };
      e.addEventListener("mousedown", (u) => {
        u.button === 0 &&
          (s(),
          a(),
          document.addEventListener("mouseup", () => s(), { once: !0 }),
          (l = setTimeout(() => {
            i = setInterval(() => {
              a();
            }, r);
          }, o)));
      });
    },
  };
var kd = !1,
  Mr,
  ks,
  Os,
  vl,
  bl,
  Fm,
  yl,
  Ps,
  Ns,
  Is,
  Rm,
  Ls,
  Fs,
  Bm,
  Vm;
function kt() {
  if (!kd) {
    kd = !0;
    var e = navigator.userAgent,
      t =
        /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(
          e
        ),
      n = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
    if (
      ((Ls = /\b(iPhone|iP[ao]d)/.exec(e)),
      (Fs = /\b(iP[ao]d)/.exec(e)),
      (Is = /Android/i.exec(e)),
      (Bm = /FBAN\/\w+;/i.exec(e)),
      (Vm = /Mobile/i.exec(e)),
      (Rm = !!/Win64/.exec(e)),
      t)
    ) {
      (Mr = t[1] ? parseFloat(t[1]) : t[5] ? parseFloat(t[5]) : NaN),
        Mr && document && document.documentMode && (Mr = document.documentMode);
      var r = /(?:Trident\/(\d+.\d+))/.exec(e);
      (Fm = r ? parseFloat(r[1]) + 4 : Mr),
        (ks = t[2] ? parseFloat(t[2]) : NaN),
        (Os = t[3] ? parseFloat(t[3]) : NaN),
        (vl = t[4] ? parseFloat(t[4]) : NaN),
        vl
          ? ((t = /(?:Chrome\/(\d+\.\d+))/.exec(e)),
            (bl = t && t[1] ? parseFloat(t[1]) : NaN))
          : (bl = NaN);
    } else Mr = ks = Os = bl = vl = NaN;
    if (n) {
      if (n[1]) {
        var o = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
        yl = o ? parseFloat(o[1].replace("_", ".")) : !0;
      } else yl = !1;
      (Ps = !!n[2]), (Ns = !!n[3]);
    } else yl = Ps = Ns = !1;
  }
}
var Rs = {
    ie: function () {
      return kt() || Mr;
    },
    ieCompatibilityMode: function () {
      return kt() || Fm > Mr;
    },
    ie64: function () {
      return Rs.ie() && Rm;
    },
    firefox: function () {
      return kt() || ks;
    },
    opera: function () {
      return kt() || Os;
    },
    webkit: function () {
      return kt() || vl;
    },
    safari: function () {
      return Rs.webkit();
    },
    chrome: function () {
      return kt() || bl;
    },
    windows: function () {
      return kt() || Ps;
    },
    osx: function () {
      return kt() || yl;
    },
    linux: function () {
      return kt() || Ns;
    },
    iphone: function () {
      return kt() || Ls;
    },
    mobile: function () {
      return kt() || Ls || Fs || Is || Vm;
    },
    nativeApp: function () {
      return kt() || Bm;
    },
    android: function () {
      return kt() || Is;
    },
    ipad: function () {
      return kt() || Fs;
    },
  },
  g3 = Rs,
  Ji = !!(
    typeof window < "u" &&
    window.document &&
    window.document.createElement
  ),
  v3 = {
    canUseDOM: Ji,
    canUseWorkers: typeof Worker < "u",
    canUseEventListeners:
      Ji && !!(window.addEventListener || window.attachEvent),
    canUseViewport: Ji && !!window.screen,
    isInWorker: !Ji,
  },
  Dm = v3,
  Hm;
Dm.canUseDOM &&
  (Hm =
    document.implementation &&
    document.implementation.hasFeature &&
    document.implementation.hasFeature("", "") !== !0);
function b3(e, t) {
  if (!Dm.canUseDOM || (t && !("addEventListener" in document))) return !1;
  var n = "on" + e,
    r = n in document;
  if (!r) {
    var o = document.createElement("div");
    o.setAttribute(n, "return;"), (r = typeof o[n] == "function");
  }
  return (
    !r &&
      Hm &&
      e === "wheel" &&
      (r = document.implementation.hasFeature("Events.wheel", "3.0")),
    r
  );
}
var y3 = b3,
  Od = 10,
  Pd = 40,
  Nd = 800;
function zm(e) {
  var t = 0,
    n = 0,
    r = 0,
    o = 0;
  return (
    "detail" in e && (n = e.detail),
    "wheelDelta" in e && (n = -e.wheelDelta / 120),
    "wheelDeltaY" in e && (n = -e.wheelDeltaY / 120),
    "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
    "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = n), (n = 0)),
    (r = t * Od),
    (o = n * Od),
    "deltaY" in e && (o = e.deltaY),
    "deltaX" in e && (r = e.deltaX),
    (r || o) &&
      e.deltaMode &&
      (e.deltaMode == 1 ? ((r *= Pd), (o *= Pd)) : ((r *= Nd), (o *= Nd))),
    r && !t && (t = r < 1 ? -1 : 1),
    o && !n && (n = o < 1 ? -1 : 1),
    { spinX: t, spinY: n, pixelX: r, pixelY: o }
  );
}
zm.getEventType = function () {
  return g3.firefox() ? "DOMMouseScroll" : y3("wheel") ? "wheel" : "mousewheel";
};
var w3 = zm;
/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */ const _3 = function (e, t) {
    if (e && e.addEventListener) {
      const n = function (r) {
        const o = w3(r);
        t && Reflect.apply(t, this, [r, o]);
      };
      e.addEventListener("wheel", n, { passive: !0 });
    }
  },
  x3 = {
    beforeMount(e, t) {
      _3(e, t.value);
    },
  },
  Wm = {
    modelValue: { type: [Number, String, Boolean], default: void 0 },
    label: { type: [String, Boolean, Number, Object] },
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: { type: String, default: void 0 },
    trueLabel: { type: [String, Number], default: void 0 },
    falseLabel: { type: [String, Number], default: void 0 },
    id: { type: String, default: void 0 },
    controls: { type: String, default: void 0 },
    border: Boolean,
    size: Kn,
    tabindex: [String, Number],
    validateEvent: { type: Boolean, default: !0 },
  },
  jm = {
    [Xe]: (e) => Be(e) || Ye(e) || Lt(e),
    change: (e) => Be(e) || Ye(e) || Lt(e),
  },
  C3 = ({ model: e, isChecked: t }) => {
    const n = Ie(No, void 0),
      r = A(() => {
        var i, l;
        const a = (i = n == null ? void 0 : n.max) == null ? void 0 : i.value,
          s = (l = n == null ? void 0 : n.min) == null ? void 0 : l.value;
        return (
          (!xn(a) && e.value.length >= a && !t.value) ||
          (!xn(s) && e.value.length <= s && t.value)
        );
      });
    return {
      isDisabled: Gr(
        A(() => (n == null ? void 0 : n.disabled.value) || r.value)
      ),
      isLimitDisabled: r,
    };
  },
  S3 = (
    e,
    {
      model: t,
      isLimitExceeded: n,
      hasOwnLabel: r,
      isDisabled: o,
      isLabeledByFormItem: i,
    }
  ) => {
    const l = Ie(No, void 0),
      { formItem: a } = On(),
      { emit: s } = et();
    function u(p) {
      var b, v;
      return p === e.trueLabel || p === !0
        ? (b = e.trueLabel) != null
          ? b
          : !0
        : (v = e.falseLabel) != null
        ? v
        : !1;
    }
    function c(p, b) {
      s("change", u(p), b);
    }
    function f(p) {
      if (n.value) return;
      const b = p.target;
      s("change", u(b.checked), p);
    }
    async function d(p) {
      n.value ||
        (!r.value &&
          !o.value &&
          i.value &&
          (p.composedPath().some((_) => _.tagName === "LABEL") ||
            ((t.value = u([!1, e.falseLabel].includes(t.value))),
            await Le(),
            c(t.value, p))));
    }
    const h = A(
      () => (l == null ? void 0 : l.validateEvent) || e.validateEvent
    );
    return (
      me(
        () => e.modelValue,
        () => {
          h.value && (a == null || a.validate("change").catch((p) => void 0));
        }
      ),
      { handleChange: f, onClickRoot: d }
    );
  },
  E3 = (e) => {
    const t = B(!1),
      { emit: n } = et(),
      r = Ie(No, void 0),
      o = A(() => xn(r) === !1),
      i = B(!1);
    return {
      model: A({
        get() {
          var a, s;
          return o.value
            ? (a = r == null ? void 0 : r.modelValue) == null
              ? void 0
              : a.value
            : (s = e.modelValue) != null
            ? s
            : t.value;
        },
        set(a) {
          var s, u;
          o.value && we(a)
            ? ((i.value =
                ((s = r == null ? void 0 : r.max) == null
                  ? void 0
                  : s.value) !== void 0 &&
                a.length > (r == null ? void 0 : r.max.value)),
              i.value === !1 &&
                ((u = r == null ? void 0 : r.changeEvent) == null ||
                  u.call(r, a)))
            : (n(Xe, a), (t.value = a));
        },
      }),
      isGroup: o,
      isLimitExceeded: i,
    };
  },
  T3 = (e, t, { model: n }) => {
    const r = Ie(No, void 0),
      o = B(!1),
      i = A(() => {
        const u = n.value;
        return Lt(u)
          ? u
          : we(u)
          ? u.map(Ve).includes(e.label)
          : u != null
          ? u === e.trueLabel
          : !!u;
      }),
      l = jt(
        A(() => {
          var u;
          return (u = r == null ? void 0 : r.size) == null ? void 0 : u.value;
        }),
        { prop: !0 }
      ),
      a = jt(
        A(() => {
          var u;
          return (u = r == null ? void 0 : r.size) == null ? void 0 : u.value;
        })
      ),
      s = A(() => !!(t.default || e.label));
    return {
      checkboxButtonSize: l,
      isChecked: i,
      isFocused: o,
      checkboxSize: a,
      hasOwnLabel: s,
    };
  },
  $3 = (e, { model: t }) => {
    function n() {
      we(t.value) && !t.value.includes(e.label)
        ? t.value.push(e.label)
        : (t.value = e.trueLabel || !0);
    }
    e.checked && n();
  },
  Km = (e, t) => {
    const { formItem: n } = On(),
      { model: r, isGroup: o, isLimitExceeded: i } = E3(e),
      {
        isFocused: l,
        isChecked: a,
        checkboxButtonSize: s,
        checkboxSize: u,
        hasOwnLabel: c,
      } = T3(e, t, { model: r }),
      { isDisabled: f } = C3({ model: r, isChecked: a }),
      { inputId: d, isLabeledByFormItem: h } = Lo(e, {
        formItemContext: n,
        disableIdGeneration: c,
        disableIdManagement: o,
      }),
      { handleChange: p, onClickRoot: b } = S3(e, {
        model: r,
        isLimitExceeded: i,
        hasOwnLabel: c,
        isDisabled: f,
        isLabeledByFormItem: h,
      });
    return (
      $3(e, { model: r }),
      {
        inputId: d,
        isLabeledByFormItem: h,
        isChecked: a,
        isDisabled: f,
        isFocused: l,
        checkboxButtonSize: s,
        checkboxSize: u,
        hasOwnLabel: c,
        model: r,
        handleChange: p,
        onClickRoot: b,
      }
    );
  },
  M3 = ["tabindex", "role", "aria-checked"],
  A3 = [
    "id",
    "aria-hidden",
    "name",
    "tabindex",
    "disabled",
    "true-value",
    "false-value",
  ],
  k3 = ["id", "aria-hidden", "disabled", "value", "name", "tabindex"],
  O3 = se({ name: "ElCheckbox" }),
  P3 = se({
    ...O3,
    props: Wm,
    emits: jm,
    setup(e) {
      const t = e,
        n = Oo(),
        {
          inputId: r,
          isLabeledByFormItem: o,
          isChecked: i,
          isDisabled: l,
          isFocused: a,
          checkboxSize: s,
          hasOwnLabel: u,
          model: c,
          handleChange: f,
          onClickRoot: d,
        } = Km(t, n),
        h = Ee("checkbox");
      return (p, b) => (
        L(),
        he(
          mt(!m(u) && m(o) ? "span" : "label"),
          {
            class: W([
              m(h).b(),
              m(h).m(m(s)),
              m(h).is("disabled", m(l)),
              m(h).is("bordered", p.border),
              m(h).is("checked", m(i)),
            ]),
            "aria-controls": p.indeterminate ? p.controls : null,
            onClick: m(d),
          },
          {
            default: re(() => [
              ae(
                "span",
                {
                  class: W([
                    m(h).e("input"),
                    m(h).is("disabled", m(l)),
                    m(h).is("checked", m(i)),
                    m(h).is("indeterminate", p.indeterminate),
                    m(h).is("focus", m(a)),
                  ]),
                  tabindex: p.indeterminate ? 0 : void 0,
                  role: p.indeterminate ? "checkbox" : void 0,
                  "aria-checked": p.indeterminate ? "mixed" : void 0,
                },
                [
                  p.trueLabel || p.falseLabel
                    ? ot(
                        (L(),
                        te(
                          "input",
                          {
                            key: 0,
                            id: m(r),
                            "onUpdate:modelValue":
                              b[0] ||
                              (b[0] = (v) => (Qe(c) ? (c.value = v) : null)),
                            class: W(m(h).e("original")),
                            type: "checkbox",
                            "aria-hidden": p.indeterminate ? "true" : "false",
                            name: p.name,
                            tabindex: p.tabindex,
                            disabled: m(l),
                            "true-value": p.trueLabel,
                            "false-value": p.falseLabel,
                            onChange:
                              b[1] || (b[1] = (...v) => m(f) && m(f)(...v)),
                            onFocus: b[2] || (b[2] = (v) => (a.value = !0)),
                            onBlur: b[3] || (b[3] = (v) => (a.value = !1)),
                          },
                          null,
                          42,
                          A3
                        )),
                        [[Fl, m(c)]]
                      )
                    : ot(
                        (L(),
                        te(
                          "input",
                          {
                            key: 1,
                            id: m(r),
                            "onUpdate:modelValue":
                              b[4] ||
                              (b[4] = (v) => (Qe(c) ? (c.value = v) : null)),
                            class: W(m(h).e("original")),
                            type: "checkbox",
                            "aria-hidden": p.indeterminate ? "true" : "false",
                            disabled: m(l),
                            value: p.label,
                            name: p.name,
                            tabindex: p.tabindex,
                            onChange:
                              b[5] || (b[5] = (...v) => m(f) && m(f)(...v)),
                            onFocus: b[6] || (b[6] = (v) => (a.value = !0)),
                            onBlur: b[7] || (b[7] = (v) => (a.value = !1)),
                          },
                          null,
                          42,
                          k3
                        )),
                        [[Fl, m(c)]]
                      ),
                  ae("span", { class: W(m(h).e("inner")) }, null, 2),
                ],
                10,
                M3
              ),
              m(u)
                ? (L(),
                  te(
                    "span",
                    { key: 0, class: W(m(h).e("label")) },
                    [
                      Oe(p.$slots, "default"),
                      p.$slots.default
                        ? ge("v-if", !0)
                        : (L(), te(Ue, { key: 0 }, [It(Je(p.label), 1)], 64)),
                    ],
                    2
                  ))
                : ge("v-if", !0),
            ]),
            _: 3,
          },
          8,
          ["class", "aria-controls", "onClick"]
        )
      );
    },
  });
var N3 = De(P3, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue",
  ],
]);
const I3 = ["name", "tabindex", "disabled", "true-value", "false-value"],
  L3 = ["name", "tabindex", "disabled", "value"],
  F3 = se({ name: "ElCheckboxButton" }),
  R3 = se({
    ...F3,
    props: Wm,
    emits: jm,
    setup(e) {
      const t = e,
        n = Oo(),
        {
          isFocused: r,
          isChecked: o,
          isDisabled: i,
          checkboxButtonSize: l,
          model: a,
          handleChange: s,
        } = Km(t, n),
        u = Ie(No, void 0),
        c = Ee("checkbox"),
        f = A(() => {
          var d, h, p, b;
          const v =
            (h =
              (d = u == null ? void 0 : u.fill) == null ? void 0 : d.value) !=
            null
              ? h
              : "";
          return {
            backgroundColor: v,
            borderColor: v,
            color:
              (b =
                (p = u == null ? void 0 : u.textColor) == null
                  ? void 0
                  : p.value) != null
                ? b
                : "",
            boxShadow: v ? `-1px 0 0 0 ${v}` : void 0,
          };
        });
      return (d, h) => (
        L(),
        te(
          "label",
          {
            class: W([
              m(c).b("button"),
              m(c).bm("button", m(l)),
              m(c).is("disabled", m(i)),
              m(c).is("checked", m(o)),
              m(c).is("focus", m(r)),
            ]),
          },
          [
            d.trueLabel || d.falseLabel
              ? ot(
                  (L(),
                  te(
                    "input",
                    {
                      key: 0,
                      "onUpdate:modelValue":
                        h[0] || (h[0] = (p) => (Qe(a) ? (a.value = p) : null)),
                      class: W(m(c).be("button", "original")),
                      type: "checkbox",
                      name: d.name,
                      tabindex: d.tabindex,
                      disabled: m(i),
                      "true-value": d.trueLabel,
                      "false-value": d.falseLabel,
                      onChange: h[1] || (h[1] = (...p) => m(s) && m(s)(...p)),
                      onFocus: h[2] || (h[2] = (p) => (r.value = !0)),
                      onBlur: h[3] || (h[3] = (p) => (r.value = !1)),
                    },
                    null,
                    42,
                    I3
                  )),
                  [[Fl, m(a)]]
                )
              : ot(
                  (L(),
                  te(
                    "input",
                    {
                      key: 1,
                      "onUpdate:modelValue":
                        h[4] || (h[4] = (p) => (Qe(a) ? (a.value = p) : null)),
                      class: W(m(c).be("button", "original")),
                      type: "checkbox",
                      name: d.name,
                      tabindex: d.tabindex,
                      disabled: m(i),
                      value: d.label,
                      onChange: h[5] || (h[5] = (...p) => m(s) && m(s)(...p)),
                      onFocus: h[6] || (h[6] = (p) => (r.value = !0)),
                      onBlur: h[7] || (h[7] = (p) => (r.value = !1)),
                    },
                    null,
                    42,
                    L3
                  )),
                  [[Fl, m(a)]]
                ),
            d.$slots.default || d.label
              ? (L(),
                te(
                  "span",
                  {
                    key: 2,
                    class: W(m(c).be("button", "inner")),
                    style: He(m(o) ? m(f) : void 0),
                  },
                  [Oe(d.$slots, "default", {}, () => [It(Je(d.label), 1)])],
                  6
                ))
              : ge("v-if", !0),
          ],
          2
        )
      );
    },
  });
var qm = De(R3, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue",
  ],
]);
const B3 = Ge({
    modelValue: { type: Fe(Array), default: () => [] },
    disabled: Boolean,
    min: Number,
    max: Number,
    size: Kn,
    label: String,
    fill: String,
    textColor: String,
    tag: { type: String, default: "div" },
    validateEvent: { type: Boolean, default: !0 },
  }),
  V3 = { [Xe]: (e) => we(e), change: (e) => we(e) },
  D3 = se({ name: "ElCheckboxGroup" }),
  H3 = se({
    ...D3,
    props: B3,
    emits: V3,
    setup(e, { emit: t }) {
      const n = e,
        r = Ee("checkbox"),
        { formItem: o } = On(),
        { inputId: i, isLabeledByFormItem: l } = Lo(n, { formItemContext: o }),
        a = async (u) => {
          t(Xe, u), await Le(), t("change", u);
        },
        s = A({
          get() {
            return n.modelValue;
          },
          set(u) {
            a(u);
          },
        });
      return (
        dt(No, {
          ...ix(Xt(n), [
            "size",
            "min",
            "max",
            "disabled",
            "validateEvent",
            "fill",
            "textColor",
          ]),
          modelValue: s,
          changeEvent: a,
        }),
        me(
          () => n.modelValue,
          () => {
            n.validateEvent &&
              (o == null || o.validate("change").catch((u) => void 0));
          }
        ),
        (u, c) => {
          var f;
          return (
            L(),
            he(
              mt(u.tag),
              {
                id: m(i),
                class: W(m(r).b("group")),
                role: "group",
                "aria-label": m(l) ? void 0 : u.label || "checkbox-group",
                "aria-labelledby": m(l)
                  ? (f = m(o)) == null
                    ? void 0
                    : f.labelId
                  : void 0,
              },
              { default: re(() => [Oe(u.$slots, "default")]), _: 3 },
              8,
              ["id", "class", "aria-label", "aria-labelledby"]
            )
          );
        }
      );
    },
  });
var Um = De(H3, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue",
  ],
]);
const To = pt(N3, { CheckboxButton: qm, CheckboxGroup: Um });
Kt(qm);
Kt(Um);
const Ym = Ge({
    size: Kn,
    disabled: Boolean,
    label: { type: [String, Number, Boolean], default: "" },
  }),
  z3 = Ge({
    ...Ym,
    modelValue: { type: [String, Number, Boolean], default: "" },
    name: { type: String, default: "" },
    border: Boolean,
  }),
  Xm = {
    [Xe]: (e) => Be(e) || Ye(e) || Lt(e),
    [An]: (e) => Be(e) || Ye(e) || Lt(e),
  },
  Gm = (e, t) => {
    const n = B(),
      r = Ie(om, void 0),
      o = A(() => !!r),
      i = A({
        get() {
          return o.value ? r.modelValue : e.modelValue;
        },
        set(c) {
          o.value ? r.changeEvent(c) : t && t(Xe, c),
            (n.value.checked = e.modelValue === e.label);
        },
      }),
      l = jt(A(() => (r == null ? void 0 : r.size))),
      a = Gr(A(() => (r == null ? void 0 : r.disabled))),
      s = B(!1),
      u = A(() => (a.value || (o.value && i.value !== e.label) ? -1 : 0));
    return {
      radioRef: n,
      isGroup: o,
      radioGroup: r,
      focus: s,
      size: l,
      disabled: a,
      tabIndex: u,
      modelValue: i,
    };
  },
  W3 = ["value", "name", "disabled"],
  j3 = se({ name: "ElRadio" }),
  K3 = se({
    ...j3,
    props: z3,
    emits: Xm,
    setup(e, { emit: t }) {
      const n = e,
        r = Ee("radio"),
        {
          radioRef: o,
          radioGroup: i,
          focus: l,
          size: a,
          disabled: s,
          modelValue: u,
        } = Gm(n, t);
      function c() {
        Le(() => t("change", u.value));
      }
      return (f, d) => {
        var h;
        return (
          L(),
          te(
            "label",
            {
              class: W([
                m(r).b(),
                m(r).is("disabled", m(s)),
                m(r).is("focus", m(l)),
                m(r).is("bordered", f.border),
                m(r).is("checked", m(u) === f.label),
                m(r).m(m(a)),
              ]),
            },
            [
              ae(
                "span",
                {
                  class: W([
                    m(r).e("input"),
                    m(r).is("disabled", m(s)),
                    m(r).is("checked", m(u) === f.label),
                  ]),
                },
                [
                  ot(
                    ae(
                      "input",
                      {
                        ref_key: "radioRef",
                        ref: o,
                        "onUpdate:modelValue":
                          d[0] ||
                          (d[0] = (p) => (Qe(u) ? (u.value = p) : null)),
                        class: W(m(r).e("original")),
                        value: f.label,
                        name: f.name || ((h = m(i)) == null ? void 0 : h.name),
                        disabled: m(s),
                        type: "radio",
                        onFocus: d[1] || (d[1] = (p) => (l.value = !0)),
                        onBlur: d[2] || (d[2] = (p) => (l.value = !1)),
                        onChange: c,
                      },
                      null,
                      42,
                      W3
                    ),
                    [[_h, m(u)]]
                  ),
                  ae("span", { class: W(m(r).e("inner")) }, null, 2),
                ],
                2
              ),
              ae(
                "span",
                {
                  class: W(m(r).e("label")),
                  onKeydown: d[3] || (d[3] = it(() => {}, ["stop"])),
                },
                [Oe(f.$slots, "default", {}, () => [It(Je(f.label), 1)])],
                34
              ),
            ],
            2
          )
        );
      };
    },
  });
var q3 = De(K3, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue",
  ],
]);
const U3 = Ge({ ...Ym, name: { type: String, default: "" } }),
  Y3 = ["value", "name", "disabled"],
  X3 = se({ name: "ElRadioButton" }),
  G3 = se({
    ...X3,
    props: U3,
    setup(e) {
      const t = e,
        n = Ee("radio"),
        {
          radioRef: r,
          focus: o,
          size: i,
          disabled: l,
          modelValue: a,
          radioGroup: s,
        } = Gm(t),
        u = A(() => ({
          backgroundColor: (s == null ? void 0 : s.fill) || "",
          borderColor: (s == null ? void 0 : s.fill) || "",
          boxShadow: s != null && s.fill ? `-1px 0 0 0 ${s.fill}` : "",
          color: (s == null ? void 0 : s.textColor) || "",
        }));
      return (c, f) => {
        var d;
        return (
          L(),
          te(
            "label",
            {
              class: W([
                m(n).b("button"),
                m(n).is("active", m(a) === c.label),
                m(n).is("disabled", m(l)),
                m(n).is("focus", m(o)),
                m(n).bm("button", m(i)),
              ]),
            },
            [
              ot(
                ae(
                  "input",
                  {
                    ref_key: "radioRef",
                    ref: r,
                    "onUpdate:modelValue":
                      f[0] || (f[0] = (h) => (Qe(a) ? (a.value = h) : null)),
                    class: W(m(n).be("button", "original-radio")),
                    value: c.label,
                    type: "radio",
                    name: c.name || ((d = m(s)) == null ? void 0 : d.name),
                    disabled: m(l),
                    onFocus: f[1] || (f[1] = (h) => (o.value = !0)),
                    onBlur: f[2] || (f[2] = (h) => (o.value = !1)),
                  },
                  null,
                  42,
                  Y3
                ),
                [[_h, m(a)]]
              ),
              ae(
                "span",
                {
                  class: W(m(n).be("button", "inner")),
                  style: He(m(a) === c.label ? m(u) : {}),
                  onKeydown: f[3] || (f[3] = it(() => {}, ["stop"])),
                },
                [Oe(c.$slots, "default", {}, () => [It(Je(c.label), 1)])],
                38
              ),
            ],
            2
          )
        );
      };
    },
  });
var Jm = De(G3, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue",
  ],
]);
const J3 = Ge({
    id: { type: String, default: void 0 },
    size: Kn,
    disabled: Boolean,
    modelValue: { type: [String, Number, Boolean], default: "" },
    fill: { type: String, default: "" },
    label: { type: String, default: void 0 },
    textColor: { type: String, default: "" },
    name: { type: String, default: void 0 },
    validateEvent: { type: Boolean, default: !0 },
  }),
  Z3 = Xm,
  Q3 = ["id", "aria-label", "aria-labelledby"],
  e6 = se({ name: "ElRadioGroup" }),
  t6 = se({
    ...e6,
    props: J3,
    emits: Z3,
    setup(e, { emit: t }) {
      const n = e,
        r = Ee("radio"),
        o = ya(),
        i = B(),
        { formItem: l } = On(),
        { inputId: a, isLabeledByFormItem: s } = Lo(n, { formItemContext: l }),
        u = (f) => {
          t(Xe, f), Le(() => t("change", f));
        };
      rt(() => {
        const f = i.value.querySelectorAll("[type=radio]"),
          d = f[0];
        !Array.from(f).some((h) => h.checked) && d && (d.tabIndex = 0);
      });
      const c = A(() => n.name || o.value);
      return (
        dt(om, Et({ ...Xt(n), changeEvent: u, name: c })),
        me(
          () => n.modelValue,
          () => {
            n.validateEvent &&
              (l == null || l.validate("change").catch((f) => void 0));
          }
        ),
        (f, d) => (
          L(),
          te(
            "div",
            {
              id: m(a),
              ref_key: "radioGroupRef",
              ref: i,
              class: W(m(r).b("group")),
              role: "radiogroup",
              "aria-label": m(s) ? void 0 : f.label || "radio-group",
              "aria-labelledby": m(s) ? m(l).labelId : void 0,
            },
            [Oe(f.$slots, "default")],
            10,
            Q3
          )
        )
      );
    },
  });
var Zm = De(t6, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue",
  ],
]);
const n6 = pt(q3, { RadioButton: Jm, RadioGroup: Zm }),
  r6 = Kt(Zm);
Kt(Jm);
const Qm = Ge({
    closable: Boolean,
    type: {
      type: String,
      values: ["success", "info", "warning", "danger", ""],
      default: "",
    },
    hit: Boolean,
    disableTransitions: Boolean,
    color: { type: String, default: "" },
    size: { type: String, values: ki, default: "" },
    effect: {
      type: String,
      values: ["dark", "light", "plain"],
      default: "light",
    },
    round: Boolean,
  }),
  o6 = {
    close: (e) => e instanceof MouseEvent,
    click: (e) => e instanceof MouseEvent,
  },
  i6 = se({ name: "ElTag" }),
  l6 = se({
    ...i6,
    props: Qm,
    emits: o6,
    setup(e, { emit: t }) {
      const n = e,
        r = jt(),
        o = Ee("tag"),
        i = A(() => {
          const { type: s, hit: u, effect: c, closable: f, round: d } = n;
          return [
            o.b(),
            o.is("closable", f),
            o.m(s),
            o.m(r.value),
            o.m(c),
            o.is("hit", u),
            o.is("round", d),
          ];
        }),
        l = (s) => {
          t("close", s);
        },
        a = (s) => {
          t("click", s);
        };
      return (s, u) =>
        s.disableTransitions
          ? (L(),
            te(
              "span",
              {
                key: 0,
                class: W(m(i)),
                style: He({ backgroundColor: s.color }),
                onClick: a,
              },
              [
                ae(
                  "span",
                  { class: W(m(o).e("content")) },
                  [Oe(s.$slots, "default")],
                  2
                ),
                s.closable
                  ? (L(),
                    he(
                      m(at),
                      {
                        key: 0,
                        class: W(m(o).e("close")),
                        onClick: it(l, ["stop"]),
                      },
                      { default: re(() => [oe(m(Zf))]), _: 1 },
                      8,
                      ["class", "onClick"]
                    ))
                  : ge("v-if", !0),
              ],
              6
            ))
          : (L(),
            he(
              hr,
              {
                key: 1,
                name: `${m(o).namespace.value}-zoom-in-center`,
                appear: "",
              },
              {
                default: re(() => [
                  ae(
                    "span",
                    {
                      class: W(m(i)),
                      style: He({ backgroundColor: s.color }),
                      onClick: a,
                    },
                    [
                      ae(
                        "span",
                        { class: W(m(o).e("content")) },
                        [Oe(s.$slots, "default")],
                        2
                      ),
                      s.closable
                        ? (L(),
                          he(
                            m(at),
                            {
                              key: 0,
                              class: W(m(o).e("close")),
                              onClick: it(l, ["stop"]),
                            },
                            { default: re(() => [oe(m(Zf))]), _: 1 },
                            8,
                            ["class", "onClick"]
                          ))
                        : ge("v-if", !0),
                    ],
                    6
                  ),
                ]),
                _: 3,
              },
              8,
              ["name"]
            ));
    },
  });
var a6 = De(l6, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue",
  ],
]);
const s6 = pt(a6),
  u6 = Ge({
    tag: { type: String, default: "div" },
    span: { type: Number, default: 24 },
    offset: { type: Number, default: 0 },
    pull: { type: Number, default: 0 },
    push: { type: Number, default: 0 },
    xs: { type: Fe([Number, Object]), default: () => ro({}) },
    sm: { type: Fe([Number, Object]), default: () => ro({}) },
    md: { type: Fe([Number, Object]), default: () => ro({}) },
    lg: { type: Fe([Number, Object]), default: () => ro({}) },
    xl: { type: Fe([Number, Object]), default: () => ro({}) },
  }),
  c6 = se({ name: "ElCol" }),
  f6 = se({
    ...c6,
    props: u6,
    setup(e) {
      const t = e,
        { gutter: n } = Ie(im, { gutter: A(() => 0) }),
        r = Ee("col"),
        o = A(() => {
          const l = {};
          return (
            n.value && (l.paddingLeft = l.paddingRight = `${n.value / 2}px`), l
          );
        }),
        i = A(() => {
          const l = [];
          return (
            ["span", "offset", "pull", "push"].forEach((u) => {
              const c = t[u];
              Ye(c) &&
                (u === "span"
                  ? l.push(r.b(`${t[u]}`))
                  : c > 0 && l.push(r.b(`${u}-${t[u]}`)));
            }),
            ["xs", "sm", "md", "lg", "xl"].forEach((u) => {
              Ye(t[u])
                ? l.push(r.b(`${u}-${t[u]}`))
                : We(t[u]) &&
                  Object.entries(t[u]).forEach(([c, f]) => {
                    l.push(
                      c !== "span" ? r.b(`${u}-${c}-${f}`) : r.b(`${u}-${f}`)
                    );
                  });
            }),
            n.value && l.push(r.is("guttered")),
            l
          );
        });
      return (l, a) => (
        L(),
        he(
          mt(l.tag),
          { class: W([m(r).b(), m(i)]), style: He(m(o)) },
          { default: re(() => [Oe(l.$slots, "default")]), _: 3 },
          8,
          ["class", "style"]
        )
      );
    },
  });
var d6 = De(f6, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue",
  ],
]);
const p6 = pt(d6),
  h6 = se({ name: "ElContainer" }),
  m6 = se({
    ...h6,
    props: { direction: { type: String } },
    setup(e) {
      const t = e,
        n = Oo(),
        r = Ee("container"),
        o = A(() =>
          t.direction === "vertical"
            ? !0
            : t.direction === "horizontal"
            ? !1
            : n && n.default
            ? n.default().some((l) => {
                const a = l.type.name;
                return a === "ElHeader" || a === "ElFooter";
              })
            : !1
        );
      return (i, l) => (
        L(),
        te(
          "section",
          { class: W([m(r).b(), m(r).is("vertical", m(o))]) },
          [Oe(i.$slots, "default")],
          2
        )
      );
    },
  });
var g6 = De(m6, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/container/src/container.vue",
  ],
]);
const v6 = se({ name: "ElAside" }),
  b6 = se({
    ...v6,
    props: { width: { type: String, default: null } },
    setup(e) {
      const t = e,
        n = Ee("aside"),
        r = A(() => (t.width ? n.cssVarBlock({ width: t.width }) : {}));
      return (o, i) => (
        L(),
        te(
          "aside",
          { class: W(m(n).b()), style: He(m(r)) },
          [Oe(o.$slots, "default")],
          6
        )
      );
    },
  });
var eg = De(b6, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/container/src/aside.vue",
  ],
]);
const y6 = se({ name: "ElFooter" }),
  w6 = se({
    ...y6,
    props: { height: { type: String, default: null } },
    setup(e) {
      const t = e,
        n = Ee("footer"),
        r = A(() => (t.height ? n.cssVarBlock({ height: t.height }) : {}));
      return (o, i) => (
        L(),
        te(
          "footer",
          { class: W(m(n).b()), style: He(m(r)) },
          [Oe(o.$slots, "default")],
          6
        )
      );
    },
  });
var tg = De(w6, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/container/src/footer.vue",
  ],
]);
const _6 = se({ name: "ElHeader" }),
  x6 = se({
    ..._6,
    props: { height: { type: String, default: null } },
    setup(e) {
      const t = e,
        n = Ee("header"),
        r = A(() => (t.height ? n.cssVarBlock({ height: t.height }) : {}));
      return (o, i) => (
        L(),
        te(
          "header",
          { class: W(m(n).b()), style: He(m(r)) },
          [Oe(o.$slots, "default")],
          6
        )
      );
    },
  });
var ng = De(x6, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/container/src/header.vue",
  ],
]);
const C6 = se({ name: "ElMain" }),
  S6 = se({
    ...C6,
    setup(e) {
      const t = Ee("main");
      return (n, r) => (
        L(), te("main", { class: W(m(t).b()) }, [Oe(n.$slots, "default")], 2)
      );
    },
  });
var rg = De(S6, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/container/src/main.vue",
  ],
]);
const og = pt(g6, { Aside: eg, Footer: tg, Header: ng, Main: rg }),
  E6 = Kt(eg);
Kt(tg);
const ig = Kt(ng),
  T6 = Kt(rg),
  $6 = Ge({
    model: Object,
    rules: { type: Fe(Object) },
    labelPosition: {
      type: String,
      values: ["left", "right", "top"],
      default: "right",
    },
    requireAsteriskPosition: {
      type: String,
      values: ["left", "right"],
      default: "left",
    },
    labelWidth: { type: [String, Number], default: "" },
    labelSuffix: { type: String, default: "" },
    inline: Boolean,
    inlineMessage: Boolean,
    statusIcon: Boolean,
    showMessage: { type: Boolean, default: !0 },
    size: { type: String, values: ki },
    disabled: Boolean,
    validateOnRuleChange: { type: Boolean, default: !0 },
    hideRequiredAsterisk: { type: Boolean, default: !1 },
    scrollToError: Boolean,
  }),
  M6 = { validate: (e, t, n) => (we(e) || Be(e)) && Lt(t) && Be(n) };
function A6() {
  const e = B([]),
    t = A(() => {
      if (!e.value.length) return "0";
      const i = Math.max(...e.value);
      return i ? `${i}px` : "";
    });
  function n(i) {
    const l = e.value.indexOf(i);
    return l === -1 && t.value, l;
  }
  function r(i, l) {
    if (i && l) {
      const a = n(l);
      e.value.splice(a, 1, i);
    } else i && e.value.push(i);
  }
  function o(i) {
    const l = n(i);
    l > -1 && e.value.splice(l, 1);
  }
  return { autoLabelWidth: t, registerLabelWidth: r, deregisterLabelWidth: o };
}
const Zi = (e, t) => {
    const n = ys(t);
    return n.length > 0 ? e.filter((r) => r.prop && n.includes(r.prop)) : e;
  },
  k6 = "ElForm",
  O6 = se({ name: k6 }),
  P6 = se({
    ...O6,
    props: $6,
    emits: M6,
    setup(e, { expose: t, emit: n }) {
      const r = e,
        o = [],
        i = jt(),
        l = Ee("form"),
        a = A(() => {
          const { labelPosition: x, inline: g } = r;
          return [
            l.b(),
            l.m(i.value || "default"),
            { [l.m(`label-${x}`)]: x, [l.m("inline")]: g },
          ];
        }),
        s = (x) => {
          o.push(x);
        },
        u = (x) => {
          x.prop && o.splice(o.indexOf(x), 1);
        },
        c = (x = []) => {
          !r.model || Zi(o, x).forEach((g) => g.resetField());
        },
        f = (x = []) => {
          Zi(o, x).forEach((g) => g.clearValidate());
        },
        d = A(() => !!r.model),
        h = (x) => {
          if (o.length === 0) return [];
          const g = Zi(o, x);
          return g.length ? g : [];
        },
        p = async (x) => v(void 0, x),
        b = async (x = []) => {
          if (!d.value) return !1;
          const g = h(x);
          if (g.length === 0) return !0;
          let y = {};
          for (const w of g)
            try {
              await w.validate("");
            } catch (C) {
              y = { ...y, ...C };
            }
          return Object.keys(y).length === 0 ? !0 : Promise.reject(y);
        },
        v = async (x = [], g) => {
          const y = !Te(g);
          try {
            const w = await b(x);
            return w === !0 && (g == null || g(w)), w;
          } catch (w) {
            const C = w;
            return (
              r.scrollToError && _(Object.keys(C)[0]),
              g == null || g(!1, C),
              y && Promise.reject(C)
            );
          }
        },
        _ = (x) => {
          var g;
          const y = Zi(o, x)[0];
          y && ((g = y.$el) == null || g.scrollIntoView());
        };
      return (
        me(
          () => r.rules,
          () => {
            r.validateOnRuleChange && p().catch((x) => void 0);
          },
          { deep: !0 }
        ),
        dt(
          Io,
          Et({
            ...Xt(r),
            emit: n,
            resetFields: c,
            clearValidate: f,
            validateField: v,
            addField: s,
            removeField: u,
            ...A6(),
          })
        ),
        t({
          validate: p,
          validateField: v,
          resetFields: c,
          clearValidate: f,
          scrollToField: _,
        }),
        (x, g) => (
          L(), te("form", { class: W(m(a)) }, [Oe(x.$slots, "default")], 2)
        )
      );
    },
  });
var N6 = De(P6, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/form/src/form.vue",
  ],
]);
function Or() {
  return (
    (Or = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Or.apply(this, arguments)
  );
}
function I6(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    vi(e, t);
}
function Bs(e) {
  return (
    (Bs = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        }),
    Bs(e)
  );
}
function vi(e, t) {
  return (
    (vi = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, o) {
          return (r.__proto__ = o), r;
        }),
    vi(e, t)
  );
}
function L6() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return (
      Boolean.prototype.valueOf.call(
        Reflect.construct(Boolean, [], function () {})
      ),
      !0
    );
  } catch {
    return !1;
  }
}
function wl(e, t, n) {
  return (
    L6()
      ? (wl = Reflect.construct.bind())
      : (wl = function (o, i, l) {
          var a = [null];
          a.push.apply(a, i);
          var s = Function.bind.apply(o, a),
            u = new s();
          return l && vi(u, l.prototype), u;
        }),
    wl.apply(null, arguments)
  );
}
function F6(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Vs(e) {
  var t = typeof Map == "function" ? new Map() : void 0;
  return (
    (Vs = function (r) {
      if (r === null || !F6(r)) return r;
      if (typeof r != "function")
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      if (typeof t < "u") {
        if (t.has(r)) return t.get(r);
        t.set(r, o);
      }
      function o() {
        return wl(r, arguments, Bs(this).constructor);
      }
      return (
        (o.prototype = Object.create(r.prototype, {
          constructor: {
            value: o,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        vi(o, r)
      );
    }),
    Vs(e)
  );
}
var R6 = /%[sdj%]/g,
  B6 = function () {};
typeof process < "u" && process.env;
function Ds(e) {
  if (!e || !e.length) return null;
  var t = {};
  return (
    e.forEach(function (n) {
      var r = n.field;
      (t[r] = t[r] || []), t[r].push(n);
    }),
    t
  );
}
function zt(e) {
  for (
    var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
    r < t;
    r++
  )
    n[r - 1] = arguments[r];
  var o = 0,
    i = n.length;
  if (typeof e == "function") return e.apply(null, n);
  if (typeof e == "string") {
    var l = e.replace(R6, function (a) {
      if (a === "%%") return "%";
      if (o >= i) return a;
      switch (a) {
        case "%s":
          return String(n[o++]);
        case "%d":
          return Number(n[o++]);
        case "%j":
          try {
            return JSON.stringify(n[o++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return a;
      }
    });
    return l;
  }
  return e;
}
function V6(e) {
  return (
    e === "string" ||
    e === "url" ||
    e === "hex" ||
    e === "email" ||
    e === "date" ||
    e === "pattern"
  );
}
function ct(e, t) {
  return !!(
    e == null ||
    (t === "array" && Array.isArray(e) && !e.length) ||
    (V6(t) && typeof e == "string" && !e)
  );
}
function D6(e, t, n) {
  var r = [],
    o = 0,
    i = e.length;
  function l(a) {
    r.push.apply(r, a || []), o++, o === i && n(r);
  }
  e.forEach(function (a) {
    t(a, l);
  });
}
function Id(e, t, n) {
  var r = 0,
    o = e.length;
  function i(l) {
    if (l && l.length) {
      n(l);
      return;
    }
    var a = r;
    (r = r + 1), a < o ? t(e[a], i) : n([]);
  }
  i([]);
}
function H6(e) {
  var t = [];
  return (
    Object.keys(e).forEach(function (n) {
      t.push.apply(t, e[n] || []);
    }),
    t
  );
}
var Ld = (function (e) {
  I6(t, e);
  function t(n, r) {
    var o;
    return (
      (o = e.call(this, "Async Validation Error") || this),
      (o.errors = n),
      (o.fields = r),
      o
    );
  }
  return t;
})(Vs(Error));
function z6(e, t, n, r, o) {
  if (t.first) {
    var i = new Promise(function (d, h) {
      var p = function (_) {
          return r(_), _.length ? h(new Ld(_, Ds(_))) : d(o);
        },
        b = H6(e);
      Id(b, n, p);
    });
    return (
      i.catch(function (d) {
        return d;
      }),
      i
    );
  }
  var l = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [],
    a = Object.keys(e),
    s = a.length,
    u = 0,
    c = [],
    f = new Promise(function (d, h) {
      var p = function (v) {
        if ((c.push.apply(c, v), u++, u === s))
          return r(c), c.length ? h(new Ld(c, Ds(c))) : d(o);
      };
      a.length || (r(c), d(o)),
        a.forEach(function (b) {
          var v = e[b];
          l.indexOf(b) !== -1 ? Id(v, n, p) : D6(v, n, p);
        });
    });
  return (
    f.catch(function (d) {
      return d;
    }),
    f
  );
}
function W6(e) {
  return !!(e && e.message !== void 0);
}
function j6(e, t) {
  for (var n = e, r = 0; r < t.length; r++) {
    if (n == null) return n;
    n = n[t[r]];
  }
  return n;
}
function Fd(e, t) {
  return function (n) {
    var r;
    return (
      e.fullFields
        ? (r = j6(t, e.fullFields))
        : (r = t[n.field || e.fullField]),
      W6(n)
        ? ((n.field = n.field || e.fullField), (n.fieldValue = r), n)
        : {
            message: typeof n == "function" ? n() : n,
            fieldValue: r,
            field: n.field || e.fullField,
          }
    );
  };
}
function Rd(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = t[n];
        typeof r == "object" && typeof e[n] == "object"
          ? (e[n] = Or({}, e[n], r))
          : (e[n] = r);
      }
  }
  return e;
}
var lg = function (t, n, r, o, i, l) {
    t.required &&
      (!r.hasOwnProperty(t.field) || ct(n, l || t.type)) &&
      o.push(zt(i.messages.required, t.fullField));
  },
  K6 = function (t, n, r, o, i) {
    (/^\s+$/.test(n) || n === "") &&
      o.push(zt(i.messages.whitespace, t.fullField));
  },
  Qi,
  q6 = function () {
    if (Qi) return Qi;
    var e = "[a-fA-F\\d:]",
      t = function (y) {
        return y && y.includeBoundaries
          ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))"
          : "";
      },
      n =
        "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",
      r = "[a-fA-F\\d]{1,4}",
      o = (
        `
(?:
(?:` +
        r +
        ":){7}(?:" +
        r +
        `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` +
        r +
        ":){6}(?:" +
        n +
        "|:" +
        r +
        `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` +
        r +
        ":){5}(?::" +
        n +
        "|(?::" +
        r +
        `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` +
        r +
        ":){4}(?:(?::" +
        r +
        "){0,1}:" +
        n +
        "|(?::" +
        r +
        `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` +
        r +
        ":){3}(?:(?::" +
        r +
        "){0,2}:" +
        n +
        "|(?::" +
        r +
        `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` +
        r +
        ":){2}(?:(?::" +
        r +
        "){0,3}:" +
        n +
        "|(?::" +
        r +
        `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` +
        r +
        ":){1}(?:(?::" +
        r +
        "){0,4}:" +
        n +
        "|(?::" +
        r +
        `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` +
        r +
        "){0,5}:" +
        n +
        "|(?::" +
        r +
        `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`
      )
        .replace(/\s*\/\/.*$/gm, "")
        .replace(/\n/g, "")
        .trim(),
      i = new RegExp("(?:^" + n + "$)|(?:^" + o + "$)"),
      l = new RegExp("^" + n + "$"),
      a = new RegExp("^" + o + "$"),
      s = function (y) {
        return y && y.exact
          ? i
          : new RegExp(
              "(?:" + t(y) + n + t(y) + ")|(?:" + t(y) + o + t(y) + ")",
              "g"
            );
      };
    (s.v4 = function (g) {
      return g && g.exact ? l : new RegExp("" + t(g) + n + t(g), "g");
    }),
      (s.v6 = function (g) {
        return g && g.exact ? a : new RegExp("" + t(g) + o + t(g), "g");
      });
    var u = "(?:(?:[a-z]+:)?//)",
      c = "(?:\\S+(?::\\S*)?@)?",
      f = s.v4().source,
      d = s.v6().source,
      h = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)",
      p = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*",
      b = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))",
      v = "(?::\\d{2,5})?",
      _ = '(?:[/?#][^\\s"]*)?',
      x =
        "(?:" +
        u +
        "|www\\.)" +
        c +
        "(?:localhost|" +
        f +
        "|" +
        d +
        "|" +
        h +
        p +
        b +
        ")" +
        v +
        _;
    return (Qi = new RegExp("(?:^" + x + "$)", "i")), Qi;
  },
  Bd = {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
  },
  Ko = {
    integer: function (t) {
      return Ko.number(t) && parseInt(t, 10) === t;
    },
    float: function (t) {
      return Ko.number(t) && !Ko.integer(t);
    },
    array: function (t) {
      return Array.isArray(t);
    },
    regexp: function (t) {
      if (t instanceof RegExp) return !0;
      try {
        return !!new RegExp(t);
      } catch {
        return !1;
      }
    },
    date: function (t) {
      return (
        typeof t.getTime == "function" &&
        typeof t.getMonth == "function" &&
        typeof t.getYear == "function" &&
        !isNaN(t.getTime())
      );
    },
    number: function (t) {
      return isNaN(t) ? !1 : typeof t == "number";
    },
    object: function (t) {
      return typeof t == "object" && !Ko.array(t);
    },
    method: function (t) {
      return typeof t == "function";
    },
    email: function (t) {
      return typeof t == "string" && t.length <= 320 && !!t.match(Bd.email);
    },
    url: function (t) {
      return typeof t == "string" && t.length <= 2048 && !!t.match(q6());
    },
    hex: function (t) {
      return typeof t == "string" && !!t.match(Bd.hex);
    },
  },
  U6 = function (t, n, r, o, i) {
    if (t.required && n === void 0) {
      lg(t, n, r, o, i);
      return;
    }
    var l = [
        "integer",
        "float",
        "array",
        "regexp",
        "object",
        "method",
        "email",
        "number",
        "date",
        "url",
        "hex",
      ],
      a = t.type;
    l.indexOf(a) > -1
      ? Ko[a](n) || o.push(zt(i.messages.types[a], t.fullField, t.type))
      : a &&
        typeof n !== t.type &&
        o.push(zt(i.messages.types[a], t.fullField, t.type));
  },
  Y6 = function (t, n, r, o, i) {
    var l = typeof t.len == "number",
      a = typeof t.min == "number",
      s = typeof t.max == "number",
      u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
      c = n,
      f = null,
      d = typeof n == "number",
      h = typeof n == "string",
      p = Array.isArray(n);
    if ((d ? (f = "number") : h ? (f = "string") : p && (f = "array"), !f))
      return !1;
    p && (c = n.length),
      h && (c = n.replace(u, "_").length),
      l
        ? c !== t.len && o.push(zt(i.messages[f].len, t.fullField, t.len))
        : a && !s && c < t.min
        ? o.push(zt(i.messages[f].min, t.fullField, t.min))
        : s && !a && c > t.max
        ? o.push(zt(i.messages[f].max, t.fullField, t.max))
        : a &&
          s &&
          (c < t.min || c > t.max) &&
          o.push(zt(i.messages[f].range, t.fullField, t.min, t.max));
  },
  eo = "enum",
  X6 = function (t, n, r, o, i) {
    (t[eo] = Array.isArray(t[eo]) ? t[eo] : []),
      t[eo].indexOf(n) === -1 &&
        o.push(zt(i.messages[eo], t.fullField, t[eo].join(", ")));
  },
  G6 = function (t, n, r, o, i) {
    if (t.pattern) {
      if (t.pattern instanceof RegExp)
        (t.pattern.lastIndex = 0),
          t.pattern.test(n) ||
            o.push(zt(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
      else if (typeof t.pattern == "string") {
        var l = new RegExp(t.pattern);
        l.test(n) ||
          o.push(zt(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
      }
    }
  },
  qe = {
    required: lg,
    whitespace: K6,
    type: U6,
    range: Y6,
    enum: X6,
    pattern: G6,
  },
  J6 = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n, "string") && !t.required) return r();
      qe.required(t, n, o, l, i, "string"),
        ct(n, "string") ||
          (qe.type(t, n, o, l, i),
          qe.range(t, n, o, l, i),
          qe.pattern(t, n, o, l, i),
          t.whitespace === !0 && qe.whitespace(t, n, o, l, i));
    }
    r(l);
  },
  Z6 = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n) && !t.required) return r();
      qe.required(t, n, o, l, i), n !== void 0 && qe.type(t, n, o, l, i);
    }
    r(l);
  },
  Q6 = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if ((n === "" && (n = void 0), ct(n) && !t.required)) return r();
      qe.required(t, n, o, l, i),
        n !== void 0 && (qe.type(t, n, o, l, i), qe.range(t, n, o, l, i));
    }
    r(l);
  },
  eE = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n) && !t.required) return r();
      qe.required(t, n, o, l, i), n !== void 0 && qe.type(t, n, o, l, i);
    }
    r(l);
  },
  tE = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n) && !t.required) return r();
      qe.required(t, n, o, l, i), ct(n) || qe.type(t, n, o, l, i);
    }
    r(l);
  },
  nE = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n) && !t.required) return r();
      qe.required(t, n, o, l, i),
        n !== void 0 && (qe.type(t, n, o, l, i), qe.range(t, n, o, l, i));
    }
    r(l);
  },
  rE = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n) && !t.required) return r();
      qe.required(t, n, o, l, i),
        n !== void 0 && (qe.type(t, n, o, l, i), qe.range(t, n, o, l, i));
    }
    r(l);
  },
  oE = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (n == null && !t.required) return r();
      qe.required(t, n, o, l, i, "array"),
        n != null && (qe.type(t, n, o, l, i), qe.range(t, n, o, l, i));
    }
    r(l);
  },
  iE = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n) && !t.required) return r();
      qe.required(t, n, o, l, i), n !== void 0 && qe.type(t, n, o, l, i);
    }
    r(l);
  },
  lE = "enum",
  aE = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n) && !t.required) return r();
      qe.required(t, n, o, l, i), n !== void 0 && qe[lE](t, n, o, l, i);
    }
    r(l);
  },
  sE = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n, "string") && !t.required) return r();
      qe.required(t, n, o, l, i), ct(n, "string") || qe.pattern(t, n, o, l, i);
    }
    r(l);
  },
  uE = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n, "date") && !t.required) return r();
      if ((qe.required(t, n, o, l, i), !ct(n, "date"))) {
        var s;
        n instanceof Date ? (s = n) : (s = new Date(n)),
          qe.type(t, s, o, l, i),
          s && qe.range(t, s.getTime(), o, l, i);
      }
    }
    r(l);
  },
  cE = function (t, n, r, o, i) {
    var l = [],
      a = Array.isArray(n) ? "array" : typeof n;
    qe.required(t, n, o, l, i, a), r(l);
  },
  Ka = function (t, n, r, o, i) {
    var l = t.type,
      a = [],
      s = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (s) {
      if (ct(n, l) && !t.required) return r();
      qe.required(t, n, o, a, i, l), ct(n, l) || qe.type(t, n, o, a, i);
    }
    r(a);
  },
  fE = function (t, n, r, o, i) {
    var l = [],
      a = t.required || (!t.required && o.hasOwnProperty(t.field));
    if (a) {
      if (ct(n) && !t.required) return r();
      qe.required(t, n, o, l, i);
    }
    r(l);
  },
  ni = {
    string: J6,
    method: Z6,
    number: Q6,
    boolean: eE,
    regexp: tE,
    integer: nE,
    float: rE,
    array: oE,
    object: iE,
    enum: aE,
    pattern: sE,
    date: uE,
    url: Ka,
    hex: Ka,
    email: Ka,
    required: cE,
    any: fE,
  };
function Hs() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid",
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s",
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters",
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s",
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length",
    },
    pattern: { mismatch: "%s value %s does not match pattern %s" },
    clone: function () {
      var t = JSON.parse(JSON.stringify(this));
      return (t.clone = this.clone), t;
    },
  };
}
var zs = Hs(),
  Ni = (function () {
    function e(n) {
      (this.rules = null), (this._messages = zs), this.define(n);
    }
    var t = e.prototype;
    return (
      (t.define = function (r) {
        var o = this;
        if (!r) throw new Error("Cannot configure a schema with no rules");
        if (typeof r != "object" || Array.isArray(r))
          throw new Error("Rules must be an object");
        (this.rules = {}),
          Object.keys(r).forEach(function (i) {
            var l = r[i];
            o.rules[i] = Array.isArray(l) ? l : [l];
          });
      }),
      (t.messages = function (r) {
        return r && (this._messages = Rd(Hs(), r)), this._messages;
      }),
      (t.validate = function (r, o, i) {
        var l = this;
        o === void 0 && (o = {}), i === void 0 && (i = function () {});
        var a = r,
          s = o,
          u = i;
        if (
          (typeof s == "function" && ((u = s), (s = {})),
          !this.rules || Object.keys(this.rules).length === 0)
        )
          return u && u(null, a), Promise.resolve(a);
        function c(b) {
          var v = [],
            _ = {};
          function x(y) {
            if (Array.isArray(y)) {
              var w;
              v = (w = v).concat.apply(w, y);
            } else v.push(y);
          }
          for (var g = 0; g < b.length; g++) x(b[g]);
          v.length ? ((_ = Ds(v)), u(v, _)) : u(null, a);
        }
        if (s.messages) {
          var f = this.messages();
          f === zs && (f = Hs()), Rd(f, s.messages), (s.messages = f);
        } else s.messages = this.messages();
        var d = {},
          h = s.keys || Object.keys(this.rules);
        h.forEach(function (b) {
          var v = l.rules[b],
            _ = a[b];
          v.forEach(function (x) {
            var g = x;
            typeof g.transform == "function" &&
              (a === r && (a = Or({}, a)), (_ = a[b] = g.transform(_))),
              typeof g == "function" ? (g = { validator: g }) : (g = Or({}, g)),
              (g.validator = l.getValidationMethod(g)),
              g.validator &&
                ((g.field = b),
                (g.fullField = g.fullField || b),
                (g.type = l.getType(g)),
                (d[b] = d[b] || []),
                d[b].push({ rule: g, value: _, source: a, field: b }));
          });
        });
        var p = {};
        return z6(
          d,
          s,
          function (b, v) {
            var _ = b.rule,
              x =
                (_.type === "object" || _.type === "array") &&
                (typeof _.fields == "object" ||
                  typeof _.defaultField == "object");
            (x = x && (_.required || (!_.required && b.value))),
              (_.field = b.field);
            function g(C, E) {
              return Or({}, E, {
                fullField: _.fullField + "." + C,
                fullFields: _.fullFields ? [].concat(_.fullFields, [C]) : [C],
              });
            }
            function y(C) {
              C === void 0 && (C = []);
              var E = Array.isArray(C) ? C : [C];
              !s.suppressWarning &&
                E.length &&
                e.warning("async-validator:", E),
                E.length && _.message !== void 0 && (E = [].concat(_.message));
              var $ = E.map(Fd(_, a));
              if (s.first && $.length) return (p[_.field] = 1), v($);
              if (!x) v($);
              else {
                if (_.required && !b.value)
                  return (
                    _.message !== void 0
                      ? ($ = [].concat(_.message).map(Fd(_, a)))
                      : s.error &&
                        ($ = [s.error(_, zt(s.messages.required, _.field))]),
                    v($)
                  );
                var I = {};
                _.defaultField &&
                  Object.keys(b.value).map(function (O) {
                    I[O] = _.defaultField;
                  }),
                  (I = Or({}, I, b.rule.fields));
                var D = {};
                Object.keys(I).forEach(function (O) {
                  var S = I[O],
                    N = Array.isArray(S) ? S : [S];
                  D[O] = N.map(g.bind(null, O));
                });
                var P = new e(D);
                P.messages(s.messages),
                  b.rule.options &&
                    ((b.rule.options.messages = s.messages),
                    (b.rule.options.error = s.error)),
                  P.validate(b.value, b.rule.options || s, function (O) {
                    var S = [];
                    $ && $.length && S.push.apply(S, $),
                      O && O.length && S.push.apply(S, O),
                      v(S.length ? S : null);
                  });
              }
            }
            var w;
            if (_.asyncValidator)
              w = _.asyncValidator(_, b.value, y, b.source, s);
            else if (_.validator) {
              try {
                w = _.validator(_, b.value, y, b.source, s);
              } catch (C) {
                console.error == null || console.error(C),
                  s.suppressValidatorError ||
                    setTimeout(function () {
                      throw C;
                    }, 0),
                  y(C.message);
              }
              w === !0
                ? y()
                : w === !1
                ? y(
                    typeof _.message == "function"
                      ? _.message(_.fullField || _.field)
                      : _.message || (_.fullField || _.field) + " fails"
                  )
                : w instanceof Array
                ? y(w)
                : w instanceof Error && y(w.message);
            }
            w &&
              w.then &&
              w.then(
                function () {
                  return y();
                },
                function (C) {
                  return y(C);
                }
              );
          },
          function (b) {
            c(b);
          },
          a
        );
      }),
      (t.getType = function (r) {
        if (
          (r.type === void 0 &&
            r.pattern instanceof RegExp &&
            (r.type = "pattern"),
          typeof r.validator != "function" &&
            r.type &&
            !ni.hasOwnProperty(r.type))
        )
          throw new Error(zt("Unknown rule type %s", r.type));
        return r.type || "string";
      }),
      (t.getValidationMethod = function (r) {
        if (typeof r.validator == "function") return r.validator;
        var o = Object.keys(r),
          i = o.indexOf("message");
        return (
          i !== -1 && o.splice(i, 1),
          o.length === 1 && o[0] === "required"
            ? ni.required
            : ni[this.getType(r)] || void 0
        );
      }),
      e
    );
  })();
Ni.register = function (t, n) {
  if (typeof n != "function")
    throw new Error(
      "Cannot register a validator by type, validator is not a function"
    );
  ni[t] = n;
};
Ni.warning = B6;
Ni.messages = zs;
Ni.validators = ni;
const dE = ["", "error", "validating", "success"],
  pE = Ge({
    label: String,
    labelWidth: { type: [String, Number], default: "" },
    prop: { type: Fe([String, Array]) },
    required: { type: Boolean, default: void 0 },
    rules: { type: Fe([Object, Array]) },
    error: String,
    validateStatus: { type: String, values: dE },
    for: String,
    inlineMessage: { type: [String, Boolean], default: "" },
    showMessage: { type: Boolean, default: !0 },
    size: { type: String, values: ki },
  }),
  Vd = "ElLabelWrap";
var hE = se({
  name: Vd,
  props: { isAutoWidth: Boolean, updateAll: Boolean },
  setup(e, { slots: t }) {
    const n = Ie(Io, void 0),
      r = Ie(zr);
    r || Ai(Vd, "usage: <el-form-item><label-wrap /></el-form-item>");
    const o = Ee("form"),
      i = B(),
      l = B(0),
      a = () => {
        var c;
        if ((c = i.value) != null && c.firstElementChild) {
          const f = window.getComputedStyle(i.value.firstElementChild).width;
          return Math.ceil(Number.parseFloat(f));
        } else return 0;
      },
      s = (c = "update") => {
        Le(() => {
          t.default &&
            e.isAutoWidth &&
            (c === "update"
              ? (l.value = a())
              : c === "remove" &&
                (n == null || n.deregisterLabelWidth(l.value)));
        });
      },
      u = () => s("update");
    return (
      rt(() => {
        u();
      }),
      Bt(() => {
        s("remove");
      }),
      Ti(() => u()),
      me(l, (c, f) => {
        e.updateAll && (n == null || n.registerLabelWidth(c, f));
      }),
      Dr(
        A(() => {
          var c, f;
          return (f = (c = i.value) == null ? void 0 : c.firstElementChild) !=
            null
            ? f
            : null;
        }),
        u
      ),
      () => {
        var c, f;
        if (!t) return null;
        const { isAutoWidth: d } = e;
        if (d) {
          const h = n == null ? void 0 : n.autoLabelWidth,
            p = r == null ? void 0 : r.hasLabel,
            b = {};
          if (p && h && h !== "auto") {
            const v = Math.max(0, Number.parseInt(h, 10) - l.value),
              _ = n.labelPosition === "left" ? "marginRight" : "marginLeft";
            v && (b[_] = `${v}px`);
          }
          return oe(
            "div",
            { ref: i, class: [o.be("item", "label-wrap")], style: b },
            [(c = t.default) == null ? void 0 : c.call(t)]
          );
        } else
          return oe(Ue, { ref: i }, [
            (f = t.default) == null ? void 0 : f.call(t),
          ]);
      }
    );
  },
});
const mE = ["role", "aria-labelledby"],
  gE = se({ name: "ElFormItem" }),
  vE = se({
    ...gE,
    props: pE,
    setup(e, { expose: t }) {
      const n = e,
        r = Oo(),
        o = Ie(Io, void 0),
        i = Ie(zr, void 0),
        l = jt(void 0, { formItem: !1 }),
        a = Ee("form-item"),
        s = ya().value,
        u = B([]),
        c = B(""),
        f = hx(c, 100),
        d = B(""),
        h = B();
      let p,
        b = !1;
      const v = A(() => {
          if ((o == null ? void 0 : o.labelPosition) === "top") return {};
          const Q = yo(
            n.labelWidth || (o == null ? void 0 : o.labelWidth) || ""
          );
          return Q ? { width: Q } : {};
        }),
        _ = A(() => {
          if (
            (o == null ? void 0 : o.labelPosition) === "top" ||
            (o == null ? void 0 : o.inline)
          )
            return {};
          if (!n.label && !n.labelWidth && I) return {};
          const Q = yo(
            n.labelWidth || (o == null ? void 0 : o.labelWidth) || ""
          );
          return !n.label && !r.label ? { marginLeft: Q } : {};
        }),
        x = A(() => [
          a.b(),
          a.m(l.value),
          a.is("error", c.value === "error"),
          a.is("validating", c.value === "validating"),
          a.is("success", c.value === "success"),
          a.is("required", N.value || n.required),
          a.is("no-asterisk", o == null ? void 0 : o.hideRequiredAsterisk),
          (o == null ? void 0 : o.requireAsteriskPosition) === "right"
            ? "asterisk-right"
            : "asterisk-left",
          { [a.m("feedback")]: o == null ? void 0 : o.statusIcon },
        ]),
        g = A(() =>
          Lt(n.inlineMessage)
            ? n.inlineMessage
            : (o == null ? void 0 : o.inlineMessage) || !1
        ),
        y = A(() => [a.e("error"), { [a.em("error", "inline")]: g.value }]),
        w = A(() => (n.prop ? (Be(n.prop) ? n.prop : n.prop.join(".")) : "")),
        C = A(() => !!(n.label || r.label)),
        E = A(() => (n.for || u.value.length === 1 ? u.value[0] : void 0)),
        $ = A(() => !E.value && C.value),
        I = !!i,
        D = A(() => {
          const Q = o == null ? void 0 : o.model;
          if (!(!Q || !n.prop)) return hl(Q, n.prop).value;
        }),
        P = A(() => {
          const { required: Q } = n,
            ce = [];
          n.rules && ce.push(...ys(n.rules));
          const Me = o == null ? void 0 : o.rules;
          if (Me && n.prop) {
            const _e = hl(Me, n.prop).value;
            _e && ce.push(...ys(_e));
          }
          if (Q !== void 0) {
            const _e = ce
              .map((je, T) => [je, T])
              .filter(([je]) => Object.keys(je).includes("required"));
            if (_e.length > 0)
              for (const [je, T] of _e)
                je.required !== Q && (ce[T] = { ...je, required: Q });
            else ce.push({ required: Q });
          }
          return ce;
        }),
        O = A(() => P.value.length > 0),
        S = (Q) =>
          P.value
            .filter((Me) =>
              !Me.trigger || !Q
                ? !0
                : Array.isArray(Me.trigger)
                ? Me.trigger.includes(Q)
                : Me.trigger === Q
            )
            .map(({ trigger: Me, ..._e }) => _e),
        N = A(() => P.value.some((Q) => Q.required)),
        X = A(() => {
          var Q;
          return (
            f.value === "error" &&
            n.showMessage &&
            ((Q = o == null ? void 0 : o.showMessage) != null ? Q : !0)
          );
        }),
        K = A(
          () => `${n.label || ""}${(o == null ? void 0 : o.labelSuffix) || ""}`
        ),
        q = (Q) => {
          c.value = Q;
        },
        V = (Q) => {
          var ce, Me;
          const { errors: _e, fields: je } = Q;
          (!_e || !je) && console.error(Q),
            q("error"),
            (d.value = _e
              ? (Me =
                  (ce = _e == null ? void 0 : _e[0]) == null
                    ? void 0
                    : ce.message) != null
                ? Me
                : `${n.prop} is required`
              : ""),
            o == null || o.emit("validate", n.prop, !1, d.value);
        },
        R = () => {
          q("success"), o == null || o.emit("validate", n.prop, !0, "");
        },
        ne = async (Q) => {
          const ce = w.value;
          return new Ni({ [ce]: Q })
            .validate({ [ce]: D.value }, { firstFields: !0 })
            .then(() => (R(), !0))
            .catch((_e) => (V(_e), Promise.reject(_e)));
        },
        ie = async (Q, ce) => {
          if (b || !n.prop) return !1;
          const Me = Te(ce);
          if (!O.value) return ce == null || ce(!1), !1;
          const _e = S(Q);
          return _e.length === 0
            ? (ce == null || ce(!0), !0)
            : (q("validating"),
              ne(_e)
                .then(() => (ce == null || ce(!0), !0))
                .catch((je) => {
                  const { fields: T } = je;
                  return ce == null || ce(!1, T), Me ? !1 : Promise.reject(T);
                }));
        },
        J = () => {
          q(""), (d.value = ""), (b = !1);
        },
        ve = async () => {
          const Q = o == null ? void 0 : o.model;
          if (!Q || !n.prop) return;
          const ce = hl(Q, n.prop);
          (b = !0), (ce.value = Hf(p)), await Le(), J(), (b = !1);
        },
        $e = (Q) => {
          u.value.includes(Q) || u.value.push(Q);
        },
        Ce = (Q) => {
          u.value = u.value.filter((ce) => ce !== Q);
        };
      me(
        () => n.error,
        (Q) => {
          (d.value = Q || ""), q(Q ? "error" : "");
        },
        { immediate: !0 }
      ),
        me(
          () => n.validateStatus,
          (Q) => q(Q || "")
        );
      const ue = Et({
        ...Xt(n),
        $el: h,
        size: l,
        validateState: c,
        labelId: s,
        inputIds: u,
        isGroup: $,
        hasLabel: C,
        addInputId: $e,
        removeInputId: Ce,
        resetField: ve,
        clearValidate: J,
        validate: ie,
      });
      return (
        dt(zr, ue),
        rt(() => {
          n.prop && (o == null || o.addField(ue), (p = Hf(D.value)));
        }),
        Bt(() => {
          o == null || o.removeField(ue);
        }),
        t({
          size: l,
          validateMessage: d,
          validateState: c,
          validate: ie,
          clearValidate: J,
          resetField: ve,
        }),
        (Q, ce) => {
          var Me;
          return (
            L(),
            te(
              "div",
              {
                ref_key: "formItemRef",
                ref: h,
                class: W(m(x)),
                role: m($) ? "group" : void 0,
                "aria-labelledby": m($) ? m(s) : void 0,
              },
              [
                oe(
                  m(hE),
                  {
                    "is-auto-width": m(v).width === "auto",
                    "update-all":
                      ((Me = m(o)) == null ? void 0 : Me.labelWidth) === "auto",
                  },
                  {
                    default: re(() => [
                      m(C)
                        ? (L(),
                          he(
                            mt(m(E) ? "label" : "div"),
                            {
                              key: 0,
                              id: m(s),
                              for: m(E),
                              class: W(m(a).e("label")),
                              style: He(m(v)),
                            },
                            {
                              default: re(() => [
                                Oe(Q.$slots, "label", { label: m(K) }, () => [
                                  It(Je(m(K)), 1),
                                ]),
                              ]),
                              _: 3,
                            },
                            8,
                            ["id", "for", "class", "style"]
                          ))
                        : ge("v-if", !0),
                    ]),
                    _: 3,
                  },
                  8,
                  ["is-auto-width", "update-all"]
                ),
                ae(
                  "div",
                  { class: W(m(a).e("content")), style: He(m(_)) },
                  [
                    Oe(Q.$slots, "default"),
                    oe(
                      hr,
                      { name: `${m(a).namespace.value}-zoom-in-top` },
                      {
                        default: re(() => [
                          m(X)
                            ? Oe(
                                Q.$slots,
                                "error",
                                { key: 0, error: d.value },
                                () => [
                                  ae("div", { class: W(m(y)) }, Je(d.value), 3),
                                ]
                              )
                            : ge("v-if", !0),
                        ]),
                        _: 3,
                      },
                      8,
                      ["name"]
                    ),
                  ],
                  6
                ),
              ],
              10,
              mE
            )
          );
        }
      );
    },
  });
var ag = De(vE, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/form/src/form-item.vue",
  ],
]);
const bE = pt(N6, { FormItem: ag }),
  yE = Kt(ag),
  wE = Ge({
    id: { type: String, default: void 0 },
    step: { type: Number, default: 1 },
    stepStrictly: Boolean,
    max: { type: Number, default: Number.POSITIVE_INFINITY },
    min: { type: Number, default: Number.NEGATIVE_INFINITY },
    modelValue: Number,
    readonly: Boolean,
    disabled: Boolean,
    size: Kn,
    controls: { type: Boolean, default: !0 },
    controlsPosition: { type: String, default: "", values: ["", "right"] },
    valueOnClear: {
      type: [String, Number, null],
      validator: (e) => e === null || Ye(e) || ["min", "max"].includes(e),
      default: null,
    },
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      validator: (e) => e >= 0 && e === Number.parseInt(`${e}`, 10),
    },
    validateEvent: { type: Boolean, default: !0 },
  }),
  _E = {
    [An]: (e, t) => e !== t,
    blur: (e) => e instanceof FocusEvent,
    focus: (e) => e instanceof FocusEvent,
    [Sn]: (e) => Ye(e) || zn(e),
    [Xe]: (e) => Ye(e) || zn(e),
  },
  xE = ["aria-label", "onKeydown"],
  CE = ["aria-label", "onKeydown"],
  SE = se({ name: "ElInputNumber" }),
  EE = se({
    ...SE,
    props: wE,
    emits: _E,
    setup(e, { expose: t, emit: n }) {
      const r = e,
        { t: o } = Jr(),
        i = Ee("input-number"),
        l = B(),
        a = Et({ currentValue: r.modelValue, userInput: null }),
        { formItem: s } = On(),
        u = A(() => Ye(r.modelValue) && x(r.modelValue, -1) < r.min),
        c = A(() => Ye(r.modelValue) && x(r.modelValue) > r.max),
        f = A(() => {
          const S = _(r.step);
          return xn(r.precision)
            ? Math.max(_(r.modelValue), S)
            : (S > r.precision, r.precision);
        }),
        d = A(() => r.controls && r.controlsPosition === "right"),
        h = jt(),
        p = Gr(),
        b = A(() => {
          if (a.userInput !== null) return a.userInput;
          let S = a.currentValue;
          if (zn(S)) return "";
          if (Ye(S)) {
            if (Number.isNaN(S)) return "";
            xn(r.precision) || (S = S.toFixed(r.precision));
          }
          return S;
        }),
        v = (S, N) => {
          if ((xn(N) && (N = f.value), N === 0)) return Math.round(S);
          let X = String(S);
          const K = X.indexOf(".");
          if (K === -1 || !X.replace(".", "").split("")[K + N]) return S;
          const R = X.length;
          return (
            X.charAt(R - 1) === "5" &&
              (X = `${X.slice(0, Math.max(0, R - 1))}6`),
            Number.parseFloat(Number(X).toFixed(N))
          );
        },
        _ = (S) => {
          if (zn(S)) return 0;
          const N = S.toString(),
            X = N.indexOf(".");
          let K = 0;
          return X !== -1 && (K = N.length - X - 1), K;
        },
        x = (S, N = 1) => (Ye(S) ? v(S + r.step * N) : a.currentValue),
        g = () => {
          if (r.readonly || p.value || c.value) return;
          const S = r.modelValue || 0,
            N = x(S);
          C(N), n(Sn, a.currentValue);
        },
        y = () => {
          if (r.readonly || p.value || u.value) return;
          const S = r.modelValue || 0,
            N = x(S, -1);
          C(N), n(Sn, a.currentValue);
        },
        w = (S, N) => {
          const {
            max: X,
            min: K,
            step: q,
            precision: V,
            stepStrictly: R,
            valueOnClear: ne,
          } = r;
          let ie = Number(S);
          if (zn(S) || Number.isNaN(ie)) return null;
          if (S === "") {
            if (ne === null) return null;
            ie = Be(ne) ? { min: K, max: X }[ne] : ne;
          }
          return (
            R && (ie = v(Math.round(ie / q) * q, V)),
            xn(V) || (ie = v(ie, V)),
            (ie > X || ie < K) && ((ie = ie > X ? X : K), N && n(Xe, ie)),
            ie
          );
        },
        C = (S) => {
          var N;
          const X = a.currentValue,
            K = w(S);
          X !== K &&
            ((a.userInput = null),
            n(Xe, K),
            n(An, K, X),
            r.validateEvent &&
              ((N = s == null ? void 0 : s.validate) == null ||
                N.call(s, "change").catch((q) => void 0)),
            (a.currentValue = K));
        },
        E = (S) => {
          (a.userInput = S), n(Sn, S === "" ? null : Number(S));
        },
        $ = (S) => {
          const N = S !== "" ? Number(S) : "";
          ((Ye(N) && !Number.isNaN(N)) || S === "") && C(N),
            (a.userInput = null);
        },
        I = () => {
          var S, N;
          (N = (S = l.value) == null ? void 0 : S.focus) == null || N.call(S);
        },
        D = () => {
          var S, N;
          (N = (S = l.value) == null ? void 0 : S.blur) == null || N.call(S);
        },
        P = (S) => {
          n("focus", S);
        },
        O = (S) => {
          var N;
          n("blur", S),
            r.validateEvent &&
              ((N = s == null ? void 0 : s.validate) == null ||
                N.call(s, "blur").catch((X) => void 0));
        };
      return (
        me(
          () => r.modelValue,
          (S) => {
            (a.currentValue = w(S, !0)), (a.userInput = null);
          },
          { immediate: !0 }
        ),
        rt(() => {
          var S;
          const { min: N, max: X, modelValue: K } = r,
            q = (S = l.value) == null ? void 0 : S.input;
          if (
            (q.setAttribute("role", "spinbutton"),
            Number.isFinite(X)
              ? q.setAttribute("aria-valuemax", String(X))
              : q.removeAttribute("aria-valuemax"),
            Number.isFinite(N)
              ? q.setAttribute("aria-valuemin", String(N))
              : q.removeAttribute("aria-valuemin"),
            q.setAttribute("aria-valuenow", String(a.currentValue)),
            q.setAttribute("aria-disabled", String(p.value)),
            !Ye(K) && K != null)
          ) {
            let V = Number(K);
            Number.isNaN(V) && (V = null), n(Xe, V);
          }
        }),
        Ti(() => {
          var S;
          const N = (S = l.value) == null ? void 0 : S.input;
          N == null || N.setAttribute("aria-valuenow", `${a.currentValue}`);
        }),
        t({ focus: I, blur: D }),
        (S, N) => (
          L(),
          te(
            "div",
            {
              class: W([
                m(i).b(),
                m(i).m(m(h)),
                m(i).is("disabled", m(p)),
                m(i).is("without-controls", !S.controls),
                m(i).is("controls-right", m(d)),
              ]),
              onDragstart: N[0] || (N[0] = it(() => {}, ["prevent"])),
            },
            [
              S.controls
                ? ot(
                    (L(),
                    te(
                      "span",
                      {
                        key: 0,
                        role: "button",
                        "aria-label": m(o)("el.inputNumber.decrease"),
                        class: W([
                          m(i).e("decrease"),
                          m(i).is("disabled", m(u)),
                        ]),
                        onKeydown: _t(y, ["enter"]),
                      },
                      [
                        oe(m(at), null, {
                          default: re(() => [
                            m(d)
                              ? (L(), he(m(Yu), { key: 0 }))
                              : (L(), he(m(EC), { key: 1 })),
                          ]),
                          _: 1,
                        }),
                      ],
                      42,
                      xE
                    )),
                    [[m(Ad), y]]
                  )
                : ge("v-if", !0),
              S.controls
                ? ot(
                    (L(),
                    te(
                      "span",
                      {
                        key: 1,
                        role: "button",
                        "aria-label": m(o)("el.inputNumber.increase"),
                        class: W([
                          m(i).e("increase"),
                          m(i).is("disabled", m(c)),
                        ]),
                        onKeydown: _t(g, ["enter"]),
                      },
                      [
                        oe(m(at), null, {
                          default: re(() => [
                            m(d)
                              ? (L(), he(m(Qh), { key: 0 }))
                              : (L(), he(m(OC), { key: 1 })),
                          ]),
                          _: 1,
                        }),
                      ],
                      42,
                      CE
                    )),
                    [[m(Ad), g]]
                  )
                : ge("v-if", !0),
              oe(
                m(tc),
                {
                  id: S.id,
                  ref_key: "input",
                  ref: l,
                  type: "number",
                  step: S.step,
                  "model-value": m(b),
                  placeholder: S.placeholder,
                  readonly: S.readonly,
                  disabled: m(p),
                  size: m(h),
                  max: S.max,
                  min: S.min,
                  name: S.name,
                  label: S.label,
                  "validate-event": !1,
                  onKeydown: [
                    _t(it(g, ["prevent"]), ["up"]),
                    _t(it(y, ["prevent"]), ["down"]),
                  ],
                  onBlur: O,
                  onFocus: P,
                  onInput: E,
                  onChange: $,
                },
                null,
                8,
                [
                  "id",
                  "step",
                  "model-value",
                  "placeholder",
                  "readonly",
                  "disabled",
                  "size",
                  "max",
                  "min",
                  "name",
                  "label",
                  "onKeydown",
                ]
              ),
            ],
            34
          )
        )
      );
    },
  });
var TE = De(EE, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/input-number/src/input-number.vue",
  ],
]);
const sg = pt(TE),
  ug = "ElSelectGroup",
  xa = "ElSelect";
function $E(e, t) {
  const n = Ie(xa),
    r = Ie(ug, { disabled: !1 }),
    o = A(
      () =>
        Object.prototype.toString.call(e.value).toLowerCase() ===
        "[object object]"
    ),
    i = A(() =>
      n.props.multiple
        ? f(n.props.modelValue, e.value)
        : d(e.value, n.props.modelValue)
    ),
    l = A(() => {
      if (n.props.multiple) {
        const b = n.props.modelValue || [];
        return (
          !i.value &&
          b.length >= n.props.multipleLimit &&
          n.props.multipleLimit > 0
        );
      } else return !1;
    }),
    a = A(() => e.label || (o.value ? "" : e.value)),
    s = A(() => e.value || e.label || ""),
    u = A(() => e.disabled || t.groupDisabled || l.value),
    c = et(),
    f = (b = [], v) => {
      if (o.value) {
        const _ = n.props.valueKey;
        return b && b.some((x) => Ve(Mt(x, _)) === Mt(v, _));
      } else return b && b.includes(v);
    },
    d = (b, v) => {
      if (o.value) {
        const { valueKey: _ } = n.props;
        return Mt(b, _) === Mt(v, _);
      } else return b === v;
    },
    h = () => {
      !e.disabled &&
        !r.disabled &&
        (n.hoverIndex = n.optionsArray.indexOf(c.proxy));
    };
  me(
    () => a.value,
    () => {
      !e.created && !n.props.remote && n.setSelected();
    }
  ),
    me(
      () => e.value,
      (b, v) => {
        const { remote: _, valueKey: x } = n.props;
        if (
          (Object.is(b, v) ||
            (n.onOptionDestroy(v, c.proxy), n.onOptionCreate(c.proxy)),
          !e.created && !_)
        ) {
          if (
            x &&
            typeof b == "object" &&
            typeof v == "object" &&
            b[x] === v[x]
          )
            return;
          n.setSelected();
        }
      }
    ),
    me(
      () => r.disabled,
      () => {
        t.groupDisabled = r.disabled;
      },
      { immediate: !0 }
    );
  const { queryChange: p } = Ve(n);
  return (
    me(p, (b) => {
      const { query: v } = m(b),
        _ = new RegExp(Tx(v), "i");
      (t.visible = _.test(a.value) || e.created),
        t.visible || n.filteredOptionsCount--;
    }),
    {
      select: n,
      currentLabel: a,
      currentValue: s,
      itemSelected: i,
      isDisabled: u,
      hoverItem: h,
    }
  );
}
const ME = se({
  name: "ElOption",
  componentName: "ElOption",
  props: {
    value: { required: !0, type: [String, Number, Boolean, Object] },
    label: [String, Number],
    created: Boolean,
    disabled: { type: Boolean, default: !1 },
  },
  setup(e) {
    const t = Ee("select"),
      n = Et({
        index: -1,
        groupDisabled: !1,
        visible: !0,
        hitState: !1,
        hover: !1,
      }),
      {
        currentLabel: r,
        itemSelected: o,
        isDisabled: i,
        select: l,
        hoverItem: a,
      } = $E(e, n),
      { visible: s, hover: u } = Xt(n),
      c = et().proxy;
    l.onOptionCreate(c),
      Bt(() => {
        const d = c.value,
          { selected: h } = l,
          b = (l.props.multiple ? h : [h]).some((v) => v.value === c.value);
        Le(() => {
          l.cachedOptions.get(d) === c && !b && l.cachedOptions.delete(d);
        }),
          l.onOptionDestroy(d, c);
      });
    function f() {
      e.disabled !== !0 &&
        n.groupDisabled !== !0 &&
        l.handleOptionSelect(c, !0);
    }
    return {
      ns: t,
      currentLabel: r,
      itemSelected: o,
      isDisabled: i,
      select: l,
      hoverItem: a,
      visible: s,
      hover: u,
      selectOptionClick: f,
      states: n,
    };
  },
});
function AE(e, t, n, r, o, i) {
  return ot(
    (L(),
    te(
      "li",
      {
        class: W([
          e.ns.be("dropdown", "item"),
          e.ns.is("disabled", e.isDisabled),
          { selected: e.itemSelected, hover: e.hover },
        ]),
        onMouseenter:
          t[0] || (t[0] = (...l) => e.hoverItem && e.hoverItem(...l)),
        onClick:
          t[1] ||
          (t[1] = it(
            (...l) => e.selectOptionClick && e.selectOptionClick(...l),
            ["stop"]
          )),
      },
      [
        Oe(e.$slots, "default", {}, () => [
          ae("span", null, Je(e.currentLabel), 1),
        ]),
      ],
      34
    )),
    [[cn, e.visible]]
  );
}
var mc = De(ME, [
  ["render", AE],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/select/src/option.vue",
  ],
]);
const kE = se({
  name: "ElSelectDropdown",
  componentName: "ElSelectDropdown",
  setup() {
    const e = Ie(xa),
      t = Ee("select"),
      n = A(() => e.props.popperClass),
      r = A(() => e.props.multiple),
      o = A(() => e.props.fitInputWidth),
      i = B("");
    function l() {
      var a;
      i.value = `${(a = e.selectWrapper) == null ? void 0 : a.offsetWidth}px`;
    }
    return (
      rt(() => {
        l(), Dr(e.selectWrapper, l);
      }),
      { ns: t, minWidth: i, popperClass: n, isMultiple: r, isFitInputWidth: o }
    );
  },
});
function OE(e, t, n, r, o, i) {
  return (
    L(),
    te(
      "div",
      {
        class: W([
          e.ns.b("dropdown"),
          e.ns.is("multiple", e.isMultiple),
          e.popperClass,
        ]),
        style: He({ [e.isFitInputWidth ? "width" : "minWidth"]: e.minWidth }),
      },
      [Oe(e.$slots, "default")],
      6
    )
  );
}
var PE = De(kE, [
  ["render", OE],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/select/src/select-dropdown.vue",
  ],
]);
function NE(e) {
  const { t } = Jr();
  return Et({
    options: new Map(),
    cachedOptions: new Map(),
    createdLabel: null,
    createdSelected: !1,
    selected: e.multiple ? [] : {},
    inputLength: 20,
    inputWidth: 0,
    optionsCount: 0,
    filteredOptionsCount: 0,
    visible: !1,
    softFocus: !1,
    selectedLabel: "",
    hoverIndex: -1,
    query: "",
    previousQuery: null,
    inputHovering: !1,
    cachedPlaceHolder: "",
    currentPlaceholder: t("el.select.placeholder"),
    menuVisibleOnFocus: !1,
    isOnComposition: !1,
    isSilentBlur: !1,
    prefixWidth: 11,
    tagInMultiLine: !1,
    mouseEnter: !1,
  });
}
const IE = (e, t, n) => {
    const { t: r } = Jr(),
      o = Ee("select");
    Zu(
      {
        from: "suffixTransition",
        replacement: "override style scheme",
        version: "2.3.0",
        scope: "props",
        ref: "https://element-plus.org/en-US/component/select.html#select-attributes",
      },
      A(() => e.suffixTransition === !1)
    );
    const i = B(null),
      l = B(null),
      a = B(null),
      s = B(null),
      u = B(null),
      c = B(null),
      f = B(-1),
      d = uo({ query: "" }),
      h = uo(""),
      { form: p, formItem: b } = On(),
      v = A(() => !e.filterable || e.multiple || !t.visible),
      _ = A(() => e.disabled || (p == null ? void 0 : p.disabled)),
      x = A(() => {
        const F = e.multiple
          ? Array.isArray(e.modelValue) && e.modelValue.length > 0
          : e.modelValue !== void 0 &&
            e.modelValue !== null &&
            e.modelValue !== "";
        return e.clearable && !_.value && t.inputHovering && F;
      }),
      g = A(() =>
        e.remote && e.filterable && !e.remoteShowSuffix ? "" : e.suffixIcon
      ),
      y = A(() => o.is("reverse", g.value && t.visible && e.suffixTransition)),
      w = A(() => (e.remote ? 300 : 0)),
      C = A(() =>
        e.loading
          ? e.loadingText || r("el.select.loading")
          : e.remote && t.query === "" && t.options.size === 0
          ? !1
          : e.filterable &&
            t.query &&
            t.options.size > 0 &&
            t.filteredOptionsCount === 0
          ? e.noMatchText || r("el.select.noMatch")
          : t.options.size === 0
          ? e.noDataText || r("el.select.noData")
          : null
      ),
      E = A(() => Array.from(t.options.values())),
      $ = A(() => Array.from(t.cachedOptions.values())),
      I = A(() => {
        const F = E.value
          .filter((G) => !G.created)
          .some((G) => G.currentLabel === t.query);
        return e.filterable && e.allowCreate && t.query !== "" && !F;
      }),
      D = jt(),
      P = A(() => (["small"].includes(D.value) ? "small" : "default")),
      O = A({
        get() {
          return t.visible && C.value !== !1;
        },
        set(F) {
          t.visible = F;
        },
      });
    me(
      [() => _.value, () => D.value, () => (p == null ? void 0 : p.size)],
      () => {
        Le(() => {
          S();
        });
      }
    ),
      me(
        () => e.placeholder,
        (F) => {
          t.cachedPlaceHolder = t.currentPlaceholder = F;
        }
      ),
      me(
        () => e.modelValue,
        (F, G) => {
          e.multiple &&
            (S(),
            (F && F.length > 0) || (l.value && t.query !== "")
              ? (t.currentPlaceholder = "")
              : (t.currentPlaceholder = t.cachedPlaceHolder),
            e.filterable && !e.reserveKeyword && ((t.query = ""), N(t.query))),
            q(),
            e.filterable && !e.multiple && (t.inputLength = 20),
            !qf(F, G) &&
              e.validateEvent &&
              (b == null || b.validate("change").catch((ye) => void 0));
        },
        { flush: "post", deep: !0 }
      ),
      me(
        () => t.visible,
        (F) => {
          var G, ye, xe;
          F
            ? ((ye = (G = a.value) == null ? void 0 : G.updatePopper) == null ||
                ye.call(G),
              e.filterable &&
                ((t.filteredOptionsCount = t.optionsCount),
                (t.query = e.remote ? "" : t.selectedLabel),
                e.multiple
                  ? (xe = l.value) == null || xe.focus()
                  : t.selectedLabel &&
                    ((t.currentPlaceholder = `${t.selectedLabel}`),
                    (t.selectedLabel = "")),
                N(t.query),
                !e.multiple &&
                  !e.remote &&
                  ((d.value.query = ""), Ro(d), Ro(h))))
            : (e.filterable &&
                (Te(e.filterMethod) && e.filterMethod(),
                Te(e.remoteMethod) && e.remoteMethod()),
              l.value && l.value.blur(),
              (t.query = ""),
              (t.previousQuery = null),
              (t.selectedLabel = ""),
              (t.inputLength = 20),
              (t.menuVisibleOnFocus = !1),
              R(),
              Le(() => {
                l.value &&
                  l.value.value === "" &&
                  t.selected.length === 0 &&
                  (t.currentPlaceholder = t.cachedPlaceHolder);
              }),
              e.multiple ||
                (t.selected &&
                  (e.filterable &&
                  e.allowCreate &&
                  t.createdSelected &&
                  t.createdLabel
                    ? (t.selectedLabel = t.createdLabel)
                    : (t.selectedLabel = t.selected.currentLabel),
                  e.filterable && (t.query = t.selectedLabel)),
                e.filterable && (t.currentPlaceholder = t.cachedPlaceHolder))),
            n.emit("visible-change", F);
        }
      ),
      me(
        () => t.options.entries(),
        () => {
          var F, G, ye;
          if (!lt) return;
          (G = (F = a.value) == null ? void 0 : F.updatePopper) == null ||
            G.call(F),
            e.multiple && S();
          const xe =
            ((ye = u.value) == null ? void 0 : ye.querySelectorAll("input")) ||
            [];
          Array.from(xe).includes(document.activeElement) || q(),
            e.defaultFirstOption &&
              (e.filterable || e.remote) &&
              t.filteredOptionsCount &&
              K();
        },
        { flush: "post" }
      ),
      me(
        () => t.hoverIndex,
        (F) => {
          typeof F == "number" && F > -1
            ? (f.value = E.value[F] || {})
            : (f.value = {}),
            E.value.forEach((G) => {
              G.hover = f.value === G;
            });
        }
      );
    const S = () => {
        (e.collapseTags && !e.filterable) ||
          Le(() => {
            var F, G;
            if (!i.value) return;
            const ye = i.value.$el.querySelector("input"),
              xe = s.value,
              ze = HC(D.value || (p == null ? void 0 : p.size));
            (ye.style.height = `${
              (t.selected.length === 0
                ? ze
                : Math.max(
                    xe ? xe.clientHeight + (xe.clientHeight > ze ? 6 : 0) : 0,
                    ze
                  )) - 2
            }px`),
              (t.tagInMultiLine = Number.parseFloat(ye.style.height) >= ze),
              t.visible &&
                C.value !== !1 &&
                ((G = (F = a.value) == null ? void 0 : F.updatePopper) ==
                  null ||
                  G.call(F));
          });
      },
      N = async (F) => {
        if (!(t.previousQuery === F || t.isOnComposition)) {
          if (
            t.previousQuery === null &&
            (typeof e.filterMethod == "function" ||
              typeof e.remoteMethod == "function")
          ) {
            t.previousQuery = F;
            return;
          }
          (t.previousQuery = F),
            Le(() => {
              var G, ye;
              t.visible &&
                ((ye = (G = a.value) == null ? void 0 : G.updatePopper) ==
                  null ||
                  ye.call(G));
            }),
            (t.hoverIndex = -1),
            e.multiple &&
              e.filterable &&
              Le(() => {
                const G = l.value.value.length * 15 + 20;
                (t.inputLength = e.collapseTags ? Math.min(50, G) : G),
                  X(),
                  S();
              }),
            e.remote && typeof e.remoteMethod == "function"
              ? ((t.hoverIndex = -1), e.remoteMethod(F))
              : typeof e.filterMethod == "function"
              ? (e.filterMethod(F), Ro(h))
              : ((t.filteredOptionsCount = t.optionsCount),
                (d.value.query = F),
                Ro(d),
                Ro(h)),
            e.defaultFirstOption &&
              (e.filterable || e.remote) &&
              t.filteredOptionsCount &&
              (await Le(), K());
        }
      },
      X = () => {
        t.currentPlaceholder !== "" &&
          (t.currentPlaceholder = l.value.value ? "" : t.cachedPlaceHolder);
      },
      K = () => {
        const F = E.value.filter(
            (xe) => xe.visible && !xe.disabled && !xe.states.groupDisabled
          ),
          G = F.find((xe) => xe.created),
          ye = F[0];
        t.hoverIndex = _e(E.value, G || ye);
      },
      q = () => {
        var F;
        if (e.multiple) t.selectedLabel = "";
        else {
          const ye = V(e.modelValue);
          (F = ye.props) != null && F.created
            ? ((t.createdLabel = ye.props.value), (t.createdSelected = !0))
            : (t.createdSelected = !1),
            (t.selectedLabel = ye.currentLabel),
            (t.selected = ye),
            e.filterable && (t.query = t.selectedLabel);
          return;
        }
        const G = [];
        Array.isArray(e.modelValue) &&
          e.modelValue.forEach((ye) => {
            G.push(V(ye));
          }),
          (t.selected = G),
          Le(() => {
            S();
          });
      },
      V = (F) => {
        let G;
        const ye = ul(F).toLowerCase() === "object",
          xe = ul(F).toLowerCase() === "null",
          ze = ul(F).toLowerCase() === "undefined";
        for (let Qt = t.cachedOptions.size - 1; Qt >= 0; Qt--) {
          const bt = $.value[Qt];
          if (
            ye ? Mt(bt.value, e.valueKey) === Mt(F, e.valueKey) : bt.value === F
          ) {
            G = {
              value: F,
              currentLabel: bt.currentLabel,
              isDisabled: bt.isDisabled,
            };
            break;
          }
        }
        if (G) return G;
        const Vt = ye ? F.label : !xe && !ze ? F : "",
          vn = { value: F, currentLabel: Vt };
        return e.multiple && (vn.hitState = !1), vn;
      },
      R = () => {
        setTimeout(() => {
          const F = e.valueKey;
          e.multiple
            ? t.selected.length > 0
              ? (t.hoverIndex = Math.min.apply(
                  null,
                  t.selected.map((G) =>
                    E.value.findIndex((ye) => Mt(ye, F) === Mt(G, F))
                  )
                ))
              : (t.hoverIndex = -1)
            : (t.hoverIndex = E.value.findIndex(
                (G) => Ke(G) === Ke(t.selected)
              ));
        }, 300);
      },
      ne = () => {
        var F, G;
        ie(),
          (G = (F = a.value) == null ? void 0 : F.updatePopper) == null ||
            G.call(F),
          e.multiple && !e.filterable && S();
      },
      ie = () => {
        var F;
        t.inputWidth =
          (F = i.value) == null ? void 0 : F.$el.getBoundingClientRect().width;
      },
      J = () => {
        e.filterable &&
          t.query !== t.selectedLabel &&
          ((t.query = t.selectedLabel), N(t.query));
      },
      ve = Mn(() => {
        J();
      }, w.value),
      $e = Mn((F) => {
        N(F.target.value);
      }, w.value),
      Ce = (F) => {
        qf(e.modelValue, F) || n.emit(An, F);
      },
      ue = (F) => {
        if (F.target.value.length <= 0 && !U()) {
          const G = e.modelValue.slice();
          G.pop(), n.emit(Xe, G), Ce(G);
        }
        F.target.value.length === 1 &&
          e.modelValue.length === 0 &&
          (t.currentPlaceholder = t.cachedPlaceHolder);
      },
      Q = (F, G) => {
        const ye = t.selected.indexOf(G);
        if (ye > -1 && !_.value) {
          const xe = e.modelValue.slice();
          xe.splice(ye, 1),
            n.emit(Xe, xe),
            Ce(xe),
            n.emit("remove-tag", G.value);
        }
        F.stopPropagation();
      },
      ce = (F) => {
        F.stopPropagation();
        const G = e.multiple ? [] : "";
        if (typeof G != "string")
          for (const ye of t.selected) ye.isDisabled && G.push(ye.value);
        n.emit(Xe, G),
          Ce(G),
          (t.hoverIndex = -1),
          (t.visible = !1),
          n.emit("clear");
      },
      Me = (F, G) => {
        var ye;
        if (e.multiple) {
          const xe = (e.modelValue || []).slice(),
            ze = _e(xe, F.value);
          ze > -1
            ? xe.splice(ze, 1)
            : (e.multipleLimit <= 0 || xe.length < e.multipleLimit) &&
              xe.push(F.value),
            n.emit(Xe, xe),
            Ce(xe),
            F.created && ((t.query = ""), N(""), (t.inputLength = 20)),
            e.filterable && ((ye = l.value) == null || ye.focus());
        } else n.emit(Xe, F.value), Ce(F.value), (t.visible = !1);
        (t.isSilentBlur = G),
          je(),
          !t.visible &&
            Le(() => {
              T(F);
            });
      },
      _e = (F = [], G) => {
        if (!We(G)) return F.indexOf(G);
        const ye = e.valueKey;
        let xe = -1;
        return (
          F.some((ze, Vt) =>
            Ve(Mt(ze, ye)) === Mt(G, ye) ? ((xe = Vt), !0) : !1
          ),
          xe
        );
      },
      je = () => {
        t.softFocus = !0;
        const F = l.value || i.value;
        F && (F == null || F.focus());
      },
      T = (F) => {
        var G, ye, xe, ze, Vt;
        const vn = Array.isArray(F) ? F[0] : F;
        let Qt = null;
        if (vn != null && vn.value) {
          const bt = E.value.filter((Zr) => Zr.value === vn.value);
          bt.length > 0 && (Qt = bt[0].$el);
        }
        if (a.value && Qt) {
          const bt =
            (ze =
              (xe =
                (ye = (G = a.value) == null ? void 0 : G.popperRef) == null
                  ? void 0
                  : ye.contentRef) == null
                ? void 0
                : xe.querySelector) == null
              ? void 0
              : ze.call(xe, `.${o.be("dropdown", "wrap")}`);
          bt && Mx(bt, Qt);
        }
        (Vt = c.value) == null || Vt.handleScroll();
      },
      M = (F) => {
        t.optionsCount++,
          t.filteredOptionsCount++,
          t.options.set(F.value, F),
          t.cachedOptions.set(F.value, F);
      },
      H = (F, G) => {
        t.options.get(F) === G &&
          (t.optionsCount--, t.filteredOptionsCount--, t.options.delete(F));
      },
      Y = (F) => {
        F.code !== wo.backspace && U(!1),
          (t.inputLength = l.value.value.length * 15 + 20),
          S();
      },
      U = (F) => {
        if (!Array.isArray(t.selected)) return;
        const G = t.selected[t.selected.length - 1];
        if (!!G)
          return F === !0 || F === !1
            ? ((G.hitState = F), F)
            : ((G.hitState = !G.hitState), G.hitState);
      },
      z = (F) => {
        const G = F.target.value;
        if (F.type === "compositionend")
          (t.isOnComposition = !1), Le(() => N(G));
        else {
          const ye = G[G.length - 1] || "";
          t.isOnComposition = !nm(ye);
        }
      },
      ee = () => {
        Le(() => T(t.selected));
      },
      Z = (F) => {
        t.softFocus
          ? (t.softFocus = !1)
          : ((e.automaticDropdown || e.filterable) &&
              (e.filterable && !t.visible && (t.menuVisibleOnFocus = !0),
              (t.visible = !0)),
            n.emit("focus", F));
      },
      k = () => {
        var F;
        (t.visible = !1), (F = i.value) == null || F.blur();
      },
      j = (F) => {
        Le(() => {
          t.isSilentBlur ? (t.isSilentBlur = !1) : n.emit("blur", F);
        }),
          (t.softFocus = !1);
      },
      de = (F) => {
        ce(F);
      },
      fe = () => {
        t.visible = !1;
      },
      be = (F) => {
        t.visible &&
          (F.preventDefault(), F.stopPropagation(), (t.visible = !1));
      },
      Se = (F) => {
        var G;
        (F && !t.mouseEnter) ||
          _.value ||
          (t.menuVisibleOnFocus
            ? (t.menuVisibleOnFocus = !1)
            : (!a.value || !a.value.isFocusInsideContent()) &&
              (t.visible = !t.visible),
          t.visible && ((G = l.value || i.value) == null || G.focus()));
      },
      Pe = () => {
        t.visible
          ? E.value[t.hoverIndex] && Me(E.value[t.hoverIndex], void 0)
          : Se();
      },
      Ke = (F) => (We(F.value) ? Mt(F.value, e.valueKey) : F.value),
      le = A(() => E.value.filter((F) => F.visible).every((F) => F.disabled)),
      pe = (F) => {
        if (!t.visible) {
          t.visible = !0;
          return;
        }
        if (
          !(t.options.size === 0 || t.filteredOptionsCount === 0) &&
          !t.isOnComposition &&
          !le.value
        ) {
          F === "next"
            ? (t.hoverIndex++,
              t.hoverIndex === t.options.size && (t.hoverIndex = 0))
            : F === "prev" &&
              (t.hoverIndex--,
              t.hoverIndex < 0 && (t.hoverIndex = t.options.size - 1));
          const G = E.value[t.hoverIndex];
          (G.disabled === !0 || G.states.groupDisabled === !0 || !G.visible) &&
            pe(F),
            Le(() => T(f.value));
        }
      };
    return {
      optionsArray: E,
      selectSize: D,
      handleResize: ne,
      debouncedOnInputChange: ve,
      debouncedQueryChange: $e,
      deletePrevTag: ue,
      deleteTag: Q,
      deleteSelected: ce,
      handleOptionSelect: Me,
      scrollToOption: T,
      readonly: v,
      resetInputHeight: S,
      showClose: x,
      iconComponent: g,
      iconReverse: y,
      showNewOption: I,
      collapseTagSize: P,
      setSelected: q,
      managePlaceholder: X,
      selectDisabled: _,
      emptyText: C,
      toggleLastOptionHitState: U,
      resetInputState: Y,
      handleComposition: z,
      onOptionCreate: M,
      onOptionDestroy: H,
      handleMenuEnter: ee,
      handleFocus: Z,
      blur: k,
      handleBlur: j,
      handleClearClick: de,
      handleClose: fe,
      handleKeydownEscape: be,
      toggleMenu: Se,
      selectOption: Pe,
      getValueKey: Ke,
      navigateOptions: pe,
      dropMenuVisible: O,
      queryChange: d,
      groupQueryChange: h,
      reference: i,
      input: l,
      tooltipRef: a,
      tags: s,
      selectWrapper: u,
      scrollbar: c,
      handleMouseEnter: () => {
        t.mouseEnter = !0;
      },
      handleMouseLeave: () => {
        t.mouseEnter = !1;
      },
    };
  },
  Dd = "ElSelect",
  LE = se({
    name: Dd,
    componentName: Dd,
    components: {
      ElInput: tc,
      ElSelectMenu: PE,
      ElOption: mc,
      ElTag: s6,
      ElScrollbar: nc,
      ElTooltip: hc,
      ElIcon: at,
    },
    directives: { ClickOutside: Lm },
    props: {
      name: String,
      id: String,
      modelValue: {
        type: [Array, String, Number, Boolean, Object],
        default: void 0,
      },
      autocomplete: { type: String, default: "off" },
      automaticDropdown: Boolean,
      size: { type: String, validator: tm },
      effect: { type: String, default: "light" },
      disabled: Boolean,
      clearable: Boolean,
      filterable: Boolean,
      allowCreate: Boolean,
      loading: Boolean,
      popperClass: { type: String, default: "" },
      remote: Boolean,
      loadingText: String,
      noMatchText: String,
      noDataText: String,
      remoteMethod: Function,
      filterMethod: Function,
      multiple: Boolean,
      multipleLimit: { type: Number, default: 0 },
      placeholder: { type: String },
      defaultFirstOption: Boolean,
      reserveKeyword: { type: Boolean, default: !0 },
      valueKey: { type: String, default: "value" },
      collapseTags: Boolean,
      collapseTagsTooltip: { type: Boolean, default: !1 },
      teleported: pc.teleported,
      persistent: { type: Boolean, default: !0 },
      clearIcon: { type: dr, default: Xu },
      fitInputWidth: { type: Boolean, default: !1 },
      suffixIcon: { type: dr, default: Yu },
      tagType: { ...Qm.type, default: "info" },
      validateEvent: { type: Boolean, default: !0 },
      remoteShowSuffix: { type: Boolean, default: !1 },
      suffixTransition: { type: Boolean, default: !0 },
      placement: { type: String, values: Fo, default: "bottom-start" },
    },
    emits: [Xe, An, "remove-tag", "clear", "visible-change", "focus", "blur"],
    setup(e, t) {
      const n = Ee("select"),
        r = Ee("input"),
        { t: o } = Jr(),
        i = NE(e),
        {
          optionsArray: l,
          selectSize: a,
          readonly: s,
          handleResize: u,
          collapseTagSize: c,
          debouncedOnInputChange: f,
          debouncedQueryChange: d,
          deletePrevTag: h,
          deleteTag: p,
          deleteSelected: b,
          handleOptionSelect: v,
          scrollToOption: _,
          setSelected: x,
          resetInputHeight: g,
          managePlaceholder: y,
          showClose: w,
          selectDisabled: C,
          iconComponent: E,
          iconReverse: $,
          showNewOption: I,
          emptyText: D,
          toggleLastOptionHitState: P,
          resetInputState: O,
          handleComposition: S,
          onOptionCreate: N,
          onOptionDestroy: X,
          handleMenuEnter: K,
          handleFocus: q,
          blur: V,
          handleBlur: R,
          handleClearClick: ne,
          handleClose: ie,
          handleKeydownEscape: J,
          toggleMenu: ve,
          selectOption: $e,
          getValueKey: Ce,
          navigateOptions: ue,
          dropMenuVisible: Q,
          reference: ce,
          input: Me,
          tooltipRef: _e,
          tags: je,
          selectWrapper: T,
          scrollbar: M,
          queryChange: H,
          groupQueryChange: Y,
          handleMouseEnter: U,
          handleMouseLeave: z,
        } = IE(e, i, t),
        { focus: ee } = UC(ce),
        {
          inputWidth: Z,
          selected: k,
          inputLength: j,
          filteredOptionsCount: de,
          visible: fe,
          softFocus: be,
          selectedLabel: Se,
          hoverIndex: Pe,
          query: Ke,
          inputHovering: le,
          currentPlaceholder: pe,
          menuVisibleOnFocus: ke,
          isOnComposition: Ae,
          isSilentBlur: F,
          options: G,
          cachedOptions: ye,
          optionsCount: xe,
          prefixWidth: ze,
          tagInMultiLine: Vt,
        } = Xt(i),
        vn = A(() => {
          const en = [n.b()],
            gr = m(a);
          return (
            gr && en.push(n.m(gr)), e.disabled && en.push(n.m("disabled")), en
          );
        }),
        Qt = A(() => ({ maxWidth: `${m(Z) - 32}px`, width: "100%" })),
        bt = A(() => ({
          maxWidth: `${m(Z) > 123 ? m(Z) - 123 : m(Z) - 75}px`,
        }));
      dt(
        xa,
        Et({
          props: e,
          options: G,
          optionsArray: l,
          cachedOptions: ye,
          optionsCount: xe,
          filteredOptionsCount: de,
          hoverIndex: Pe,
          handleOptionSelect: v,
          onOptionCreate: N,
          onOptionDestroy: X,
          selectWrapper: T,
          selected: k,
          setSelected: x,
          queryChange: H,
          groupQueryChange: Y,
        })
      ),
        rt(() => {
          (i.cachedPlaceHolder = pe.value =
            e.placeholder || o("el.select.placeholder")),
            e.multiple &&
              Array.isArray(e.modelValue) &&
              e.modelValue.length > 0 &&
              (pe.value = ""),
            Dr(T, u),
            e.remote && e.multiple && g(),
            Le(() => {
              const en = ce.value && ce.value.$el;
              if (
                !!en &&
                ((Z.value = en.getBoundingClientRect().width), t.slots.prefix)
              ) {
                const gr = en.querySelector(`.${r.e("prefix")}`);
                ze.value = Math.max(gr.getBoundingClientRect().width + 5, 30);
              }
            }),
            x();
        }),
        e.multiple && !Array.isArray(e.modelValue) && t.emit(Xe, []),
        !e.multiple && Array.isArray(e.modelValue) && t.emit(Xe, "");
      const Zr = A(() => {
        var en, gr;
        return (gr = (en = _e.value) == null ? void 0 : en.popperRef) == null
          ? void 0
          : gr.contentRef;
      });
      return {
        tagInMultiLine: Vt,
        prefixWidth: ze,
        selectSize: a,
        readonly: s,
        handleResize: u,
        collapseTagSize: c,
        debouncedOnInputChange: f,
        debouncedQueryChange: d,
        deletePrevTag: h,
        deleteTag: p,
        deleteSelected: b,
        handleOptionSelect: v,
        scrollToOption: _,
        inputWidth: Z,
        selected: k,
        inputLength: j,
        filteredOptionsCount: de,
        visible: fe,
        softFocus: be,
        selectedLabel: Se,
        hoverIndex: Pe,
        query: Ke,
        inputHovering: le,
        currentPlaceholder: pe,
        menuVisibleOnFocus: ke,
        isOnComposition: Ae,
        isSilentBlur: F,
        options: G,
        resetInputHeight: g,
        managePlaceholder: y,
        showClose: w,
        selectDisabled: C,
        iconComponent: E,
        iconReverse: $,
        showNewOption: I,
        emptyText: D,
        toggleLastOptionHitState: P,
        resetInputState: O,
        handleComposition: S,
        handleMenuEnter: K,
        handleFocus: q,
        blur: V,
        handleBlur: R,
        handleClearClick: ne,
        handleClose: ie,
        handleKeydownEscape: J,
        toggleMenu: ve,
        selectOption: $e,
        getValueKey: Ce,
        navigateOptions: ue,
        dropMenuVisible: Q,
        focus: ee,
        reference: ce,
        input: Me,
        tooltipRef: _e,
        popperPaneRef: Zr,
        tags: je,
        selectWrapper: T,
        scrollbar: M,
        wrapperKls: vn,
        selectTagsStyle: Qt,
        nsSelect: n,
        tagTextStyle: bt,
        handleMouseEnter: U,
        handleMouseLeave: z,
      };
    },
  }),
  FE = ["disabled", "autocomplete"],
  RE = {
    style: {
      height: "100%",
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
    },
  };
function BE(e, t, n, r, o, i) {
  const l = ut("el-tag"),
    a = ut("el-tooltip"),
    s = ut("el-icon"),
    u = ut("el-input"),
    c = ut("el-option"),
    f = ut("el-scrollbar"),
    d = ut("el-select-menu"),
    h = Tu("click-outside");
  return ot(
    (L(),
    te(
      "div",
      {
        ref: "selectWrapper",
        class: W(e.wrapperKls),
        onMouseenter:
          t[22] ||
          (t[22] = (...p) => e.handleMouseEnter && e.handleMouseEnter(...p)),
        onMouseleave:
          t[23] ||
          (t[23] = (...p) => e.handleMouseLeave && e.handleMouseLeave(...p)),
        onClick:
          t[24] ||
          (t[24] = it((...p) => e.toggleMenu && e.toggleMenu(...p), ["stop"])),
      },
      [
        oe(
          a,
          {
            ref: "tooltipRef",
            visible: e.dropMenuVisible,
            placement: e.placement,
            teleported: e.teleported,
            "popper-class": [e.nsSelect.e("popper"), e.popperClass],
            "fallback-placements": [
              "bottom-start",
              "top-start",
              "right",
              "left",
            ],
            effect: e.effect,
            pure: "",
            trigger: "click",
            transition: `${e.nsSelect.namespace.value}-zoom-in-top`,
            "stop-popper-mouse-event": !1,
            "gpu-acceleration": !1,
            persistent: e.persistent,
            onShow: e.handleMenuEnter,
          },
          {
            default: re(() => [
              ae(
                "div",
                {
                  class: "select-trigger",
                  onMouseenter:
                    t[20] || (t[20] = (p) => (e.inputHovering = !0)),
                  onMouseleave:
                    t[21] || (t[21] = (p) => (e.inputHovering = !1)),
                },
                [
                  e.multiple
                    ? (L(),
                      te(
                        "div",
                        {
                          key: 0,
                          ref: "tags",
                          class: W(e.nsSelect.e("tags")),
                          style: He(e.selectTagsStyle),
                        },
                        [
                          e.collapseTags && e.selected.length
                            ? (L(),
                              te(
                                "span",
                                {
                                  key: 0,
                                  class: W([
                                    e.nsSelect.b("tags-wrapper"),
                                    {
                                      "has-prefix":
                                        e.prefixWidth && e.selected.length,
                                    },
                                  ]),
                                },
                                [
                                  oe(
                                    l,
                                    {
                                      closable:
                                        !e.selectDisabled &&
                                        !e.selected[0].isDisabled,
                                      size: e.collapseTagSize,
                                      hit: e.selected[0].hitState,
                                      type: e.tagType,
                                      "disable-transitions": "",
                                      onClose:
                                        t[0] ||
                                        (t[0] = (p) =>
                                          e.deleteTag(p, e.selected[0])),
                                    },
                                    {
                                      default: re(() => [
                                        ae(
                                          "span",
                                          {
                                            class: W(e.nsSelect.e("tags-text")),
                                            style: He(e.tagTextStyle),
                                          },
                                          Je(e.selected[0].currentLabel),
                                          7
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["closable", "size", "hit", "type"]
                                  ),
                                  e.selected.length > 1
                                    ? (L(),
                                      he(
                                        l,
                                        {
                                          key: 0,
                                          closable: !1,
                                          size: e.collapseTagSize,
                                          type: e.tagType,
                                          "disable-transitions": "",
                                        },
                                        {
                                          default: re(() => [
                                            e.collapseTagsTooltip
                                              ? (L(),
                                                he(
                                                  a,
                                                  {
                                                    key: 0,
                                                    disabled: e.dropMenuVisible,
                                                    "fallback-placements": [
                                                      "bottom",
                                                      "top",
                                                      "right",
                                                      "left",
                                                    ],
                                                    effect: e.effect,
                                                    placement: "bottom",
                                                    teleported: e.teleported,
                                                  },
                                                  {
                                                    default: re(() => [
                                                      ae(
                                                        "span",
                                                        {
                                                          class: W(
                                                            e.nsSelect.e(
                                                              "tags-text"
                                                            )
                                                          ),
                                                        },
                                                        "+ " +
                                                          Je(
                                                            e.selected.length -
                                                              1
                                                          ),
                                                        3
                                                      ),
                                                    ]),
                                                    content: re(() => [
                                                      ae(
                                                        "div",
                                                        {
                                                          class: W(
                                                            e.nsSelect.e(
                                                              "collapse-tags"
                                                            )
                                                          ),
                                                        },
                                                        [
                                                          (L(!0),
                                                          te(
                                                            Ue,
                                                            null,
                                                            Cn(
                                                              e.selected.slice(
                                                                1
                                                              ),
                                                              (p, b) => (
                                                                L(),
                                                                te(
                                                                  "div",
                                                                  {
                                                                    key: b,
                                                                    class: W(
                                                                      e.nsSelect.e(
                                                                        "collapse-tag"
                                                                      )
                                                                    ),
                                                                  },
                                                                  [
                                                                    (L(),
                                                                    he(
                                                                      l,
                                                                      {
                                                                        key: e.getValueKey(
                                                                          p
                                                                        ),
                                                                        class:
                                                                          "in-tooltip",
                                                                        closable:
                                                                          !e.selectDisabled &&
                                                                          !p.isDisabled,
                                                                        size: e.collapseTagSize,
                                                                        hit: p.hitState,
                                                                        type: e.tagType,
                                                                        "disable-transitions":
                                                                          "",
                                                                        style: {
                                                                          margin:
                                                                            "2px",
                                                                        },
                                                                        onClose:
                                                                          (v) =>
                                                                            e.deleteTag(
                                                                              v,
                                                                              p
                                                                            ),
                                                                      },
                                                                      {
                                                                        default:
                                                                          re(
                                                                            () => [
                                                                              ae(
                                                                                "span",
                                                                                {
                                                                                  class:
                                                                                    W(
                                                                                      e.nsSelect.e(
                                                                                        "tags-text"
                                                                                      )
                                                                                    ),
                                                                                  style:
                                                                                    He(
                                                                                      {
                                                                                        maxWidth:
                                                                                          e.inputWidth -
                                                                                          75 +
                                                                                          "px",
                                                                                      }
                                                                                    ),
                                                                                },
                                                                                Je(
                                                                                  p.currentLabel
                                                                                ),
                                                                                7
                                                                              ),
                                                                            ]
                                                                          ),
                                                                        _: 2,
                                                                      },
                                                                      1032,
                                                                      [
                                                                        "closable",
                                                                        "size",
                                                                        "hit",
                                                                        "type",
                                                                        "onClose",
                                                                      ]
                                                                    )),
                                                                  ],
                                                                  2
                                                                )
                                                              )
                                                            ),
                                                            128
                                                          )),
                                                        ],
                                                        2
                                                      ),
                                                    ]),
                                                    _: 1,
                                                  },
                                                  8,
                                                  [
                                                    "disabled",
                                                    "effect",
                                                    "teleported",
                                                  ]
                                                ))
                                              : (L(),
                                                te(
                                                  "span",
                                                  {
                                                    key: 1,
                                                    class: W(
                                                      e.nsSelect.e("tags-text")
                                                    ),
                                                  },
                                                  "+ " +
                                                    Je(e.selected.length - 1),
                                                  3
                                                )),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["size", "type"]
                                      ))
                                    : ge("v-if", !0),
                                ],
                                2
                              ))
                            : ge("v-if", !0),
                          ge(" <div> "),
                          e.collapseTags
                            ? ge("v-if", !0)
                            : (L(),
                              he(
                                hr,
                                { key: 1, onAfterLeave: e.resetInputHeight },
                                {
                                  default: re(() => [
                                    ae(
                                      "span",
                                      {
                                        class: W([
                                          e.nsSelect.b("tags-wrapper"),
                                          {
                                            "has-prefix":
                                              e.prefixWidth &&
                                              e.selected.length,
                                          },
                                        ]),
                                      },
                                      [
                                        (L(!0),
                                        te(
                                          Ue,
                                          null,
                                          Cn(
                                            e.selected,
                                            (p) => (
                                              L(),
                                              he(
                                                l,
                                                {
                                                  key: e.getValueKey(p),
                                                  closable:
                                                    !e.selectDisabled &&
                                                    !p.isDisabled,
                                                  size: e.collapseTagSize,
                                                  hit: p.hitState,
                                                  type: e.tagType,
                                                  "disable-transitions": "",
                                                  onClose: (b) =>
                                                    e.deleteTag(b, p),
                                                },
                                                {
                                                  default: re(() => [
                                                    ae(
                                                      "span",
                                                      {
                                                        class: W(
                                                          e.nsSelect.e(
                                                            "tags-text"
                                                          )
                                                        ),
                                                        style: He({
                                                          maxWidth:
                                                            e.inputWidth -
                                                            75 +
                                                            "px",
                                                        }),
                                                      },
                                                      Je(p.currentLabel),
                                                      7
                                                    ),
                                                  ]),
                                                  _: 2,
                                                },
                                                1032,
                                                [
                                                  "closable",
                                                  "size",
                                                  "hit",
                                                  "type",
                                                  "onClose",
                                                ]
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                      ],
                                      2
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["onAfterLeave"]
                              )),
                          ge(" </div> "),
                          e.filterable
                            ? ot(
                                (L(),
                                te(
                                  "input",
                                  {
                                    key: 2,
                                    ref: "input",
                                    "onUpdate:modelValue":
                                      t[1] || (t[1] = (p) => (e.query = p)),
                                    type: "text",
                                    class: W([
                                      e.nsSelect.e("input"),
                                      e.nsSelect.is(e.selectSize),
                                    ]),
                                    disabled: e.selectDisabled,
                                    autocomplete: e.autocomplete,
                                    style: He({
                                      marginLeft:
                                        (e.prefixWidth && !e.selected.length) ||
                                        e.tagInMultiLine
                                          ? `${e.prefixWidth}px`
                                          : "",
                                      flexGrow: 1,
                                      width: `${
                                        e.inputLength / (e.inputWidth - 32)
                                      }%`,
                                      maxWidth: `${e.inputWidth - 42}px`,
                                    }),
                                    onFocus:
                                      t[2] ||
                                      (t[2] = (...p) =>
                                        e.handleFocus && e.handleFocus(...p)),
                                    onBlur:
                                      t[3] ||
                                      (t[3] = (...p) =>
                                        e.handleBlur && e.handleBlur(...p)),
                                    onKeyup:
                                      t[4] ||
                                      (t[4] = (...p) =>
                                        e.managePlaceholder &&
                                        e.managePlaceholder(...p)),
                                    onKeydown: [
                                      t[5] ||
                                        (t[5] = (...p) =>
                                          e.resetInputState &&
                                          e.resetInputState(...p)),
                                      t[6] ||
                                        (t[6] = _t(
                                          it(
                                            (p) => e.navigateOptions("next"),
                                            ["prevent"]
                                          ),
                                          ["down"]
                                        )),
                                      t[7] ||
                                        (t[7] = _t(
                                          it(
                                            (p) => e.navigateOptions("prev"),
                                            ["prevent"]
                                          ),
                                          ["up"]
                                        )),
                                      t[8] ||
                                        (t[8] = _t(
                                          (...p) =>
                                            e.handleKeydownEscape &&
                                            e.handleKeydownEscape(...p),
                                          ["esc"]
                                        )),
                                      t[9] ||
                                        (t[9] = _t(
                                          it(
                                            (...p) =>
                                              e.selectOption &&
                                              e.selectOption(...p),
                                            ["stop", "prevent"]
                                          ),
                                          ["enter"]
                                        )),
                                      t[10] ||
                                        (t[10] = _t(
                                          (...p) =>
                                            e.deletePrevTag &&
                                            e.deletePrevTag(...p),
                                          ["delete"]
                                        )),
                                      t[11] ||
                                        (t[11] = _t(
                                          (p) => (e.visible = !1),
                                          ["tab"]
                                        )),
                                    ],
                                    onCompositionstart:
                                      t[12] ||
                                      (t[12] = (...p) =>
                                        e.handleComposition &&
                                        e.handleComposition(...p)),
                                    onCompositionupdate:
                                      t[13] ||
                                      (t[13] = (...p) =>
                                        e.handleComposition &&
                                        e.handleComposition(...p)),
                                    onCompositionend:
                                      t[14] ||
                                      (t[14] = (...p) =>
                                        e.handleComposition &&
                                        e.handleComposition(...p)),
                                    onInput:
                                      t[15] ||
                                      (t[15] = (...p) =>
                                        e.debouncedQueryChange &&
                                        e.debouncedQueryChange(...p)),
                                  },
                                  null,
                                  46,
                                  FE
                                )),
                                [[Ib, e.query]]
                              )
                            : ge("v-if", !0),
                        ],
                        6
                      ))
                    : ge("v-if", !0),
                  oe(
                    u,
                    {
                      id: e.id,
                      ref: "reference",
                      modelValue: e.selectedLabel,
                      "onUpdate:modelValue":
                        t[16] || (t[16] = (p) => (e.selectedLabel = p)),
                      type: "text",
                      placeholder: e.currentPlaceholder,
                      name: e.name,
                      autocomplete: e.autocomplete,
                      size: e.selectSize,
                      disabled: e.selectDisabled,
                      readonly: e.readonly,
                      "validate-event": !1,
                      class: W([e.nsSelect.is("focus", e.visible)]),
                      tabindex: e.multiple && e.filterable ? -1 : void 0,
                      onFocus: e.handleFocus,
                      onBlur: e.handleBlur,
                      onInput: e.debouncedOnInputChange,
                      onPaste: e.debouncedOnInputChange,
                      onCompositionstart: e.handleComposition,
                      onCompositionupdate: e.handleComposition,
                      onCompositionend: e.handleComposition,
                      onKeydown: [
                        t[17] ||
                          (t[17] = _t(
                            it(
                              (p) => e.navigateOptions("next"),
                              ["stop", "prevent"]
                            ),
                            ["down"]
                          )),
                        t[18] ||
                          (t[18] = _t(
                            it(
                              (p) => e.navigateOptions("prev"),
                              ["stop", "prevent"]
                            ),
                            ["up"]
                          )),
                        _t(it(e.selectOption, ["stop", "prevent"]), ["enter"]),
                        _t(e.handleKeydownEscape, ["esc"]),
                        t[19] || (t[19] = _t((p) => (e.visible = !1), ["tab"])),
                      ],
                    },
                    O0(
                      {
                        suffix: re(() => [
                          e.iconComponent && !e.showClose
                            ? (L(),
                              he(
                                s,
                                {
                                  key: 0,
                                  class: W([
                                    e.nsSelect.e("caret"),
                                    e.nsSelect.e("icon"),
                                    e.iconReverse,
                                  ]),
                                },
                                {
                                  default: re(() => [
                                    (L(), he(mt(e.iconComponent))),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["class"]
                              ))
                            : ge("v-if", !0),
                          e.showClose && e.clearIcon
                            ? (L(),
                              he(
                                s,
                                {
                                  key: 1,
                                  class: W([
                                    e.nsSelect.e("caret"),
                                    e.nsSelect.e("icon"),
                                  ]),
                                  onClick: e.handleClearClick,
                                },
                                {
                                  default: re(() => [
                                    (L(), he(mt(e.clearIcon))),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["class", "onClick"]
                              ))
                            : ge("v-if", !0),
                        ]),
                        _: 2,
                      },
                      [
                        e.$slots.prefix
                          ? {
                              name: "prefix",
                              fn: re(() => [
                                ae("div", RE, [Oe(e.$slots, "prefix")]),
                              ]),
                            }
                          : void 0,
                      ]
                    ),
                    1032,
                    [
                      "id",
                      "modelValue",
                      "placeholder",
                      "name",
                      "autocomplete",
                      "size",
                      "disabled",
                      "readonly",
                      "class",
                      "tabindex",
                      "onFocus",
                      "onBlur",
                      "onInput",
                      "onPaste",
                      "onCompositionstart",
                      "onCompositionupdate",
                      "onCompositionend",
                      "onKeydown",
                    ]
                  ),
                ],
                32
              ),
            ]),
            content: re(() => [
              oe(d, null, {
                default: re(() => [
                  ot(
                    oe(
                      f,
                      {
                        ref: "scrollbar",
                        tag: "ul",
                        "wrap-class": e.nsSelect.be("dropdown", "wrap"),
                        "view-class": e.nsSelect.be("dropdown", "list"),
                        class: W([
                          e.nsSelect.is(
                            "empty",
                            !e.allowCreate &&
                              Boolean(e.query) &&
                              e.filteredOptionsCount === 0
                          ),
                        ]),
                      },
                      {
                        default: re(() => [
                          e.showNewOption
                            ? (L(),
                              he(
                                c,
                                { key: 0, value: e.query, created: !0 },
                                null,
                                8,
                                ["value"]
                              ))
                            : ge("v-if", !0),
                          Oe(e.$slots, "default"),
                        ]),
                        _: 3,
                      },
                      8,
                      ["wrap-class", "view-class", "class"]
                    ),
                    [[cn, e.options.size > 0 && !e.loading]]
                  ),
                  e.emptyText &&
                  (!e.allowCreate ||
                    e.loading ||
                    (e.allowCreate && e.options.size === 0))
                    ? (L(),
                      te(
                        Ue,
                        { key: 0 },
                        [
                          e.$slots.empty
                            ? Oe(e.$slots, "empty", { key: 0 })
                            : (L(),
                              te(
                                "p",
                                {
                                  key: 1,
                                  class: W(e.nsSelect.be("dropdown", "empty")),
                                },
                                Je(e.emptyText),
                                3
                              )),
                        ],
                        64
                      ))
                    : ge("v-if", !0),
                ]),
                _: 3,
              }),
            ]),
            _: 3,
          },
          8,
          [
            "visible",
            "placement",
            "teleported",
            "popper-class",
            "effect",
            "transition",
            "persistent",
            "onShow",
          ]
        ),
      ],
      34
    )),
    [[h, e.handleClose, e.popperPaneRef]]
  );
}
var VE = De(LE, [
  ["render", BE],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/select/src/select.vue",
  ],
]);
const DE = se({
  name: "ElOptionGroup",
  componentName: "ElOptionGroup",
  props: { label: String, disabled: { type: Boolean, default: !1 } },
  setup(e) {
    const t = Ee("select"),
      n = B(!0),
      r = et(),
      o = B([]);
    dt(ug, Et({ ...Xt(e) }));
    const i = Ie(xa);
    rt(() => {
      o.value = l(r.subTree);
    });
    const l = (s) => {
        const u = [];
        return (
          Array.isArray(s.children) &&
            s.children.forEach((c) => {
              var f;
              c.type &&
              c.type.name === "ElOption" &&
              c.component &&
              c.component.proxy
                ? u.push(c.component.proxy)
                : (f = c.children) != null && f.length && u.push(...l(c));
            }),
          u
        );
      },
      { groupQueryChange: a } = Ve(i);
    return (
      me(
        a,
        () => {
          n.value = o.value.some((s) => s.visible === !0);
        },
        { flush: "post" }
      ),
      { visible: n, ns: t }
    );
  },
});
function HE(e, t, n, r, o, i) {
  return ot(
    (L(),
    te(
      "ul",
      { class: W(e.ns.be("group", "wrap")) },
      [
        ae("li", { class: W(e.ns.be("group", "title")) }, Je(e.label), 3),
        ae("li", null, [
          ae("ul", { class: W(e.ns.b("group")) }, [Oe(e.$slots, "default")], 2),
        ]),
      ],
      2
    )),
    [[cn, e.visible]]
  );
}
var cg = De(DE, [
  ["render", HE],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/select/src/option-group.vue",
  ],
]);
const zE = pt(VE, { Option: mc, OptionGroup: cg }),
  WE = Kt(mc);
Kt(cg);
const jE = [
    "start",
    "center",
    "end",
    "space-around",
    "space-between",
    "space-evenly",
  ],
  KE = ["top", "middle", "bottom"],
  qE = Ge({
    tag: { type: String, default: "div" },
    gutter: { type: Number, default: 0 },
    justify: { type: String, values: jE, default: "start" },
    align: { type: String, values: KE, default: "top" },
  }),
  UE = se({ name: "ElRow" }),
  YE = se({
    ...UE,
    props: qE,
    setup(e) {
      const t = e,
        n = Ee("row"),
        r = A(() => t.gutter);
      dt(im, { gutter: r });
      const o = A(() => {
        const i = {};
        return (
          t.gutter && (i.marginRight = i.marginLeft = `-${t.gutter / 2}px`), i
        );
      });
      return (i, l) => (
        L(),
        he(
          mt(i.tag),
          {
            class: W([
              m(n).b(),
              m(n).is(`justify-${t.justify}`, i.justify !== "start"),
              m(n).is(`align-${t.align}`, i.align !== "top"),
            ]),
            style: He(m(o)),
          },
          { default: re(() => [Oe(i.$slots, "default")]), _: 3 },
          8,
          ["class", "style"]
        )
      );
    },
  });
var XE = De(YE, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue",
  ],
]);
const GE = pt(XE),
  JE = Ge({
    modelValue: { type: Fe([Number, Array]), default: 0 },
    id: { type: String, default: void 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    showInput: Boolean,
    showInputControls: { type: Boolean, default: !0 },
    size: Kn,
    inputSize: Kn,
    showStops: Boolean,
    showTooltip: { type: Boolean, default: !0 },
    formatTooltip: { type: Fe(Function), default: void 0 },
    disabled: Boolean,
    range: Boolean,
    vertical: Boolean,
    height: String,
    debounce: { type: Number, default: 300 },
    label: { type: String, default: void 0 },
    rangeStartLabel: { type: String, default: void 0 },
    rangeEndLabel: { type: String, default: void 0 },
    formatValueText: { type: Fe(Function), default: void 0 },
    tooltipClass: { type: String, default: void 0 },
    placement: { type: String, values: Fo, default: "top" },
    marks: { type: Fe(Object) },
    validateEvent: { type: Boolean, default: !0 },
  }),
  qa = (e) => Ye(e) || (we(e) && e.every(Ye)),
  ZE = { [Xe]: qa, [Sn]: qa, [An]: qa },
  QE = (e, t, n) => {
    const r = B();
    return (
      rt(async () => {
        e.range
          ? (Array.isArray(e.modelValue)
              ? ((t.firstValue = Math.max(e.min, e.modelValue[0])),
                (t.secondValue = Math.min(e.max, e.modelValue[1])))
              : ((t.firstValue = e.min), (t.secondValue = e.max)),
            (t.oldValue = [t.firstValue, t.secondValue]))
          : (typeof e.modelValue != "number" || Number.isNaN(e.modelValue)
              ? (t.firstValue = e.min)
              : (t.firstValue = Math.min(e.max, Math.max(e.min, e.modelValue))),
            (t.oldValue = t.firstValue)),
          _n(window, "resize", n),
          await Le(),
          n();
      }),
      { sliderWrapper: r }
    );
  },
  e5 = (e) =>
    A(() =>
      e.marks
        ? Object.keys(e.marks)
            .map(Number.parseFloat)
            .sort((n, r) => n - r)
            .filter((n) => n <= e.max && n >= e.min)
            .map((n) => ({
              point: n,
              position: ((n - e.min) * 100) / (e.max - e.min),
              mark: e.marks[n],
            }))
        : []
    ),
  t5 = (e, t, n) => {
    const { form: r, formItem: o } = On(),
      i = uo(),
      l = B(),
      a = B(),
      s = { firstButton: l, secondButton: a },
      u = A(() => e.disabled || (r == null ? void 0 : r.disabled) || !1),
      c = A(() => Math.min(t.firstValue, t.secondValue)),
      f = A(() => Math.max(t.firstValue, t.secondValue)),
      d = A(() =>
        e.range
          ? `${(100 * (f.value - c.value)) / (e.max - e.min)}%`
          : `${(100 * (t.firstValue - e.min)) / (e.max - e.min)}%`
      ),
      h = A(() =>
        e.range ? `${(100 * (c.value - e.min)) / (e.max - e.min)}%` : "0%"
      ),
      p = A(() => (e.vertical ? { height: e.height } : {})),
      b = A(() =>
        e.vertical
          ? { height: d.value, bottom: h.value }
          : { width: d.value, left: h.value }
      ),
      v = () => {
        i.value &&
          (t.sliderSize = i.value[`client${e.vertical ? "Height" : "Width"}`]);
      },
      _ = (P) => {
        const O = e.min + (P * (e.max - e.min)) / 100;
        if (!e.range) return l;
        let S;
        return (
          Math.abs(c.value - O) < Math.abs(f.value - O)
            ? (S =
                t.firstValue < t.secondValue ? "firstButton" : "secondButton")
            : (S =
                t.firstValue > t.secondValue ? "firstButton" : "secondButton"),
          s[S]
        );
      },
      x = (P) => {
        const O = _(P);
        return O.value.setPosition(P), O;
      },
      g = (P) => {
        (t.firstValue = P), w(e.range ? [c.value, f.value] : P);
      },
      y = (P) => {
        (t.secondValue = P), e.range && w([c.value, f.value]);
      },
      w = (P) => {
        n(Xe, P), n(Sn, P);
      },
      C = async () => {
        await Le(), n(An, e.range ? [c.value, f.value] : e.modelValue);
      },
      E = (P) => {
        var O, S, N, X, K, q;
        if (u.value || t.dragging) return;
        v();
        let V = 0;
        if (e.vertical) {
          const R =
            (N =
              (S = (O = P.touches) == null ? void 0 : O.item(0)) == null
                ? void 0
                : S.clientY) != null
              ? N
              : P.clientY;
          V =
            ((i.value.getBoundingClientRect().bottom - R) / t.sliderSize) * 100;
        } else {
          const R =
              (q =
                (K = (X = P.touches) == null ? void 0 : X.item(0)) == null
                  ? void 0
                  : K.clientX) != null
                ? q
                : P.clientX,
            ne = i.value.getBoundingClientRect().left;
          V = ((R - ne) / t.sliderSize) * 100;
        }
        if (!(V < 0 || V > 100)) return x(V);
      };
    return {
      elFormItem: o,
      slider: i,
      firstButton: l,
      secondButton: a,
      sliderDisabled: u,
      minValue: c,
      maxValue: f,
      runwayStyle: p,
      barStyle: b,
      resetSize: v,
      setPosition: x,
      emitChange: C,
      onSliderWrapperPrevent: (P) => {
        var O, S;
        (((O = s.firstButton.value) == null ? void 0 : O.dragging) ||
          ((S = s.secondButton.value) == null ? void 0 : S.dragging)) &&
          P.preventDefault();
      },
      onSliderClick: (P) => {
        E(P) && C();
      },
      onSliderDown: async (P) => {
        const O = E(P);
        O && (await Le(), O.value.onButtonDown(P));
      },
      setFirstValue: g,
      setSecondValue: y,
    };
  },
  {
    left: n5,
    down: r5,
    right: o5,
    up: i5,
    home: l5,
    end: a5,
    pageUp: s5,
    pageDown: u5,
  } = wo,
  c5 = (e, t, n) => {
    const r = B(),
      o = B(!1),
      i = A(() => t.value instanceof Function),
      l = A(() => (i.value && t.value(e.modelValue)) || e.modelValue),
      a = Mn(() => {
        n.value && (o.value = !0);
      }, 50),
      s = Mn(() => {
        n.value && (o.value = !1);
      }, 50);
    return {
      tooltip: r,
      tooltipVisible: o,
      formatValue: l,
      displayTooltip: a,
      hideTooltip: s,
    };
  },
  f5 = (e, t, n) => {
    const {
        disabled: r,
        min: o,
        max: i,
        step: l,
        showTooltip: a,
        precision: s,
        sliderSize: u,
        formatTooltip: c,
        emitChange: f,
        resetSize: d,
        updateDragging: h,
      } = Ie(am),
      {
        tooltip: p,
        tooltipVisible: b,
        formatValue: v,
        displayTooltip: _,
        hideTooltip: x,
      } = c5(e, c, a),
      g = B(),
      y = A(() => `${((e.modelValue - o.value) / (i.value - o.value)) * 100}%`),
      w = A(() => (e.vertical ? { bottom: y.value } : { left: y.value })),
      C = () => {
        (t.hovering = !0), _();
      },
      E = () => {
        (t.hovering = !1), t.dragging || x();
      },
      $ = (J) => {
        r.value ||
          (J.preventDefault(),
          V(J),
          window.addEventListener("mousemove", R),
          window.addEventListener("touchmove", R),
          window.addEventListener("mouseup", ne),
          window.addEventListener("touchend", ne),
          window.addEventListener("contextmenu", ne),
          g.value.focus());
      },
      I = (J) => {
        r.value ||
          ((t.newPosition =
            Number.parseFloat(y.value) + (J / (i.value - o.value)) * 100),
          ie(t.newPosition),
          f());
      },
      D = () => {
        I(-l.value);
      },
      P = () => {
        I(l.value);
      },
      O = () => {
        I(-l.value * 4);
      },
      S = () => {
        I(l.value * 4);
      },
      N = () => {
        r.value || (ie(0), f());
      },
      X = () => {
        r.value || (ie(100), f());
      },
      K = (J) => {
        let ve = !0;
        [n5, r5].includes(J.key)
          ? D()
          : [o5, i5].includes(J.key)
          ? P()
          : J.key === l5
          ? N()
          : J.key === a5
          ? X()
          : J.key === u5
          ? O()
          : J.key === s5
          ? S()
          : (ve = !1),
          ve && J.preventDefault();
      },
      q = (J) => {
        let ve, $e;
        return (
          J.type.startsWith("touch")
            ? (($e = J.touches[0].clientY), (ve = J.touches[0].clientX))
            : (($e = J.clientY), (ve = J.clientX)),
          { clientX: ve, clientY: $e }
        );
      },
      V = (J) => {
        (t.dragging = !0), (t.isClick = !0);
        const { clientX: ve, clientY: $e } = q(J);
        e.vertical ? (t.startY = $e) : (t.startX = ve),
          (t.startPosition = Number.parseFloat(y.value)),
          (t.newPosition = t.startPosition);
      },
      R = (J) => {
        if (t.dragging) {
          (t.isClick = !1), _(), d();
          let ve;
          const { clientX: $e, clientY: Ce } = q(J);
          e.vertical
            ? ((t.currentY = Ce),
              (ve = ((t.startY - t.currentY) / u.value) * 100))
            : ((t.currentX = $e),
              (ve = ((t.currentX - t.startX) / u.value) * 100)),
            (t.newPosition = t.startPosition + ve),
            ie(t.newPosition);
        }
      },
      ne = () => {
        t.dragging &&
          (setTimeout(() => {
            (t.dragging = !1),
              t.hovering || x(),
              t.isClick || ie(t.newPosition),
              f();
          }, 0),
          window.removeEventListener("mousemove", R),
          window.removeEventListener("touchmove", R),
          window.removeEventListener("mouseup", ne),
          window.removeEventListener("touchend", ne),
          window.removeEventListener("contextmenu", ne));
      },
      ie = async (J) => {
        if (J === null || Number.isNaN(+J)) return;
        J < 0 ? (J = 0) : J > 100 && (J = 100);
        const ve = 100 / ((i.value - o.value) / l.value);
        let Ce = Math.round(J / ve) * ve * (i.value - o.value) * 0.01 + o.value;
        (Ce = Number.parseFloat(Ce.toFixed(s.value))),
          Ce !== e.modelValue && n(Xe, Ce),
          !t.dragging &&
            e.modelValue !== t.oldValue &&
            (t.oldValue = e.modelValue),
          await Le(),
          t.dragging && _(),
          p.value.updatePopper();
      };
    return (
      me(
        () => t.dragging,
        (J) => {
          h(J);
        }
      ),
      {
        disabled: r,
        button: g,
        tooltip: p,
        tooltipVisible: b,
        showTooltip: a,
        wrapperStyle: w,
        formatValue: v,
        handleMouseEnter: C,
        handleMouseLeave: E,
        onButtonDown: $,
        onKeyDown: K,
        setPosition: ie,
      }
    );
  },
  d5 = (e, t, n, r) => ({
    stops: A(() => {
      if (!e.showStops || e.min > e.max) return [];
      if (e.step === 0) return [];
      const l = (e.max - e.min) / e.step,
        a = (100 * e.step) / (e.max - e.min),
        s = Array.from({ length: l - 1 }).map((u, c) => (c + 1) * a);
      return e.range
        ? s.filter(
            (u) =>
              u < (100 * (n.value - e.min)) / (e.max - e.min) ||
              u > (100 * (r.value - e.min)) / (e.max - e.min)
          )
        : s.filter((u) => u > (100 * (t.firstValue - e.min)) / (e.max - e.min));
    }),
    getStopStyle: (l) => (e.vertical ? { bottom: `${l}%` } : { left: `${l}%` }),
  }),
  p5 = (e, t, n, r, o, i) => {
    const l = (u) => {
        o(Xe, u), o(Sn, u);
      },
      a = () =>
        e.range
          ? ![n.value, r.value].every((u, c) => u === t.oldValue[c])
          : e.modelValue !== t.oldValue,
      s = () => {
        var u, c;
        if (e.min > e.max) {
          Ai("Slider", "min should not be greater than max.");
          return;
        }
        const f = e.modelValue;
        e.range && Array.isArray(f)
          ? f[1] < e.min
            ? l([e.min, e.min])
            : f[0] > e.max
            ? l([e.max, e.max])
            : f[0] < e.min
            ? l([e.min, f[1]])
            : f[1] > e.max
            ? l([f[0], e.max])
            : ((t.firstValue = f[0]),
              (t.secondValue = f[1]),
              a() &&
                (e.validateEvent &&
                  ((u = i == null ? void 0 : i.validate) == null ||
                    u.call(i, "change").catch((d) => void 0)),
                (t.oldValue = f.slice())))
          : !e.range &&
            typeof f == "number" &&
            !Number.isNaN(f) &&
            (f < e.min
              ? l(e.min)
              : f > e.max
              ? l(e.max)
              : ((t.firstValue = f),
                a() &&
                  (e.validateEvent &&
                    ((c = i == null ? void 0 : i.validate) == null ||
                      c.call(i, "change").catch((d) => void 0)),
                  (t.oldValue = f))));
      };
    s(),
      me(
        () => t.dragging,
        (u) => {
          u || s();
        }
      ),
      me(
        () => e.modelValue,
        (u, c) => {
          t.dragging ||
            (Array.isArray(u) &&
              Array.isArray(c) &&
              u.every((f, d) => f === c[d]) &&
              t.firstValue === u[0] &&
              t.secondValue === u[1]) ||
            s();
        },
        { deep: !0 }
      ),
      me(
        () => [e.min, e.max],
        () => {
          s();
        }
      );
  },
  h5 = Ge({
    modelValue: { type: Number, default: 0 },
    vertical: Boolean,
    tooltipClass: String,
    placement: { type: String, values: Fo, default: "top" },
  }),
  m5 = { [Xe]: (e) => Ye(e) },
  g5 = ["tabindex"],
  v5 = se({ name: "ElSliderButton" }),
  b5 = se({
    ...v5,
    props: h5,
    emits: m5,
    setup(e, { expose: t, emit: n }) {
      const r = e,
        o = Ee("slider"),
        i = Et({
          hovering: !1,
          dragging: !1,
          isClick: !1,
          startX: 0,
          currentX: 0,
          startY: 0,
          currentY: 0,
          startPosition: 0,
          newPosition: 0,
          oldValue: r.modelValue,
        }),
        {
          disabled: l,
          button: a,
          tooltip: s,
          showTooltip: u,
          tooltipVisible: c,
          wrapperStyle: f,
          formatValue: d,
          handleMouseEnter: h,
          handleMouseLeave: p,
          onButtonDown: b,
          onKeyDown: v,
          setPosition: _,
        } = f5(r, i, n),
        { hovering: x, dragging: g } = Xt(i);
      return (
        t({
          onButtonDown: b,
          onKeyDown: v,
          setPosition: _,
          hovering: x,
          dragging: g,
        }),
        (y, w) => (
          L(),
          te(
            "div",
            {
              ref_key: "button",
              ref: a,
              class: W([
                m(o).e("button-wrapper"),
                { hover: m(x), dragging: m(g) },
              ]),
              style: He(m(f)),
              tabindex: m(l) ? -1 : 0,
              onMouseenter: w[0] || (w[0] = (...C) => m(h) && m(h)(...C)),
              onMouseleave: w[1] || (w[1] = (...C) => m(p) && m(p)(...C)),
              onMousedown: w[2] || (w[2] = (...C) => m(b) && m(b)(...C)),
              onTouchstart: w[3] || (w[3] = (...C) => m(b) && m(b)(...C)),
              onFocus: w[4] || (w[4] = (...C) => m(h) && m(h)(...C)),
              onBlur: w[5] || (w[5] = (...C) => m(p) && m(p)(...C)),
              onKeydown: w[6] || (w[6] = (...C) => m(v) && m(v)(...C)),
            },
            [
              oe(
                m(hc),
                {
                  ref_key: "tooltip",
                  ref: s,
                  visible: m(c),
                  placement: y.placement,
                  "fallback-placements": ["top", "bottom", "right", "left"],
                  "stop-popper-mouse-event": !1,
                  "popper-class": y.tooltipClass,
                  disabled: !m(u),
                  persistent: "",
                },
                {
                  content: re(() => [ae("span", null, Je(m(d)), 1)]),
                  default: re(() => [
                    ae(
                      "div",
                      {
                        class: W([
                          m(o).e("button"),
                          { hover: m(x), dragging: m(g) },
                        ]),
                      },
                      null,
                      2
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["visible", "placement", "popper-class", "disabled"]
              ),
            ],
            46,
            g5
          )
        )
      );
    },
  });
var Hd = De(b5, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/slider/src/button.vue",
  ],
]);
const y5 = Ge({ mark: { type: Fe([String, Object]), default: void 0 } });
var w5 = se({
  name: "ElSliderMarker",
  props: y5,
  setup(e) {
    const t = Ee("slider"),
      n = A(() => (Be(e.mark) ? e.mark : e.mark.label)),
      r = A(() => (Be(e.mark) ? void 0 : e.mark.style));
    return () =>
      Ne("div", { class: t.e("marks-text"), style: r.value }, n.value);
  },
});
const _5 = ["id", "role", "aria-label", "aria-labelledby"],
  x5 = { key: 1 },
  C5 = se({ name: "ElSlider" }),
  S5 = se({
    ...C5,
    props: JE,
    emits: ZE,
    setup(e, { expose: t, emit: n }) {
      const r = e,
        o = Ee("slider"),
        { t: i } = Jr(),
        l = Et({
          firstValue: 0,
          secondValue: 0,
          oldValue: 0,
          dragging: !1,
          sliderSize: 1,
        }),
        {
          elFormItem: a,
          slider: s,
          firstButton: u,
          secondButton: c,
          sliderDisabled: f,
          minValue: d,
          maxValue: h,
          runwayStyle: p,
          barStyle: b,
          resetSize: v,
          emitChange: _,
          onSliderWrapperPrevent: x,
          onSliderClick: g,
          onSliderDown: y,
          setFirstValue: w,
          setSecondValue: C,
        } = t5(r, l, n),
        { stops: E, getStopStyle: $ } = d5(r, l, d, h),
        { inputId: I, isLabeledByFormItem: D } = Lo(r, { formItemContext: a }),
        P = jt(),
        O = A(() => r.inputSize || P.value),
        S = A(
          () =>
            r.label || i("el.slider.defaultLabel", { min: r.min, max: r.max })
        ),
        N = A(() =>
          r.range
            ? r.rangeStartLabel || i("el.slider.defaultRangeStartLabel")
            : S.value
        ),
        X = A(() =>
          r.formatValueText ? r.formatValueText(J.value) : `${J.value}`
        ),
        K = A(() => r.rangeEndLabel || i("el.slider.defaultRangeEndLabel")),
        q = A(() =>
          r.formatValueText ? r.formatValueText(ve.value) : `${ve.value}`
        ),
        V = A(() => [
          o.b(),
          o.m(P.value),
          o.is("vertical", r.vertical),
          { [o.m("with-input")]: r.showInput },
        ]),
        R = e5(r);
      p5(r, l, d, h, n, a);
      const ne = A(() => {
          const ue = [r.min, r.max, r.step].map((Q) => {
            const ce = `${Q}`.split(".")[1];
            return ce ? ce.length : 0;
          });
          return Math.max.apply(null, ue);
        }),
        { sliderWrapper: ie } = QE(r, l, v),
        { firstValue: J, secondValue: ve, sliderSize: $e } = Xt(l),
        Ce = (ue) => {
          l.dragging = ue;
        };
      return (
        dt(am, {
          ...Xt(r),
          sliderSize: $e,
          disabled: f,
          precision: ne,
          emitChange: _,
          resetSize: v,
          updateDragging: Ce,
        }),
        t({ onSliderClick: g }),
        (ue, Q) => {
          var ce, Me;
          return (
            L(),
            te(
              "div",
              {
                id: ue.range ? m(I) : void 0,
                ref_key: "sliderWrapper",
                ref: ie,
                class: W(m(V)),
                role: ue.range ? "group" : void 0,
                "aria-label": ue.range && !m(D) ? m(S) : void 0,
                "aria-labelledby":
                  ue.range && m(D)
                    ? (ce = m(a)) == null
                      ? void 0
                      : ce.labelId
                    : void 0,
                onTouchstart: Q[2] || (Q[2] = (..._e) => m(x) && m(x)(..._e)),
                onTouchmove: Q[3] || (Q[3] = (..._e) => m(x) && m(x)(..._e)),
              },
              [
                ae(
                  "div",
                  {
                    ref_key: "slider",
                    ref: s,
                    class: W([
                      m(o).e("runway"),
                      { "show-input": ue.showInput && !ue.range },
                      m(o).is("disabled", m(f)),
                    ]),
                    style: He(m(p)),
                    onMousedown:
                      Q[0] || (Q[0] = (..._e) => m(y) && m(y)(..._e)),
                    onTouchstart:
                      Q[1] || (Q[1] = (..._e) => m(y) && m(y)(..._e)),
                  },
                  [
                    ae(
                      "div",
                      { class: W(m(o).e("bar")), style: He(m(b)) },
                      null,
                      6
                    ),
                    oe(
                      Hd,
                      {
                        id: ue.range ? void 0 : m(I),
                        ref_key: "firstButton",
                        ref: u,
                        "model-value": m(J),
                        vertical: ue.vertical,
                        "tooltip-class": ue.tooltipClass,
                        placement: ue.placement,
                        role: "slider",
                        "aria-label": ue.range || !m(D) ? m(N) : void 0,
                        "aria-labelledby":
                          !ue.range && m(D)
                            ? (Me = m(a)) == null
                              ? void 0
                              : Me.labelId
                            : void 0,
                        "aria-valuemin": ue.min,
                        "aria-valuemax": ue.range ? m(ve) : ue.max,
                        "aria-valuenow": m(J),
                        "aria-valuetext": m(X),
                        "aria-orientation": ue.vertical
                          ? "vertical"
                          : "horizontal",
                        "aria-disabled": m(f),
                        "onUpdate:modelValue": m(w),
                      },
                      null,
                      8,
                      [
                        "id",
                        "model-value",
                        "vertical",
                        "tooltip-class",
                        "placement",
                        "aria-label",
                        "aria-labelledby",
                        "aria-valuemin",
                        "aria-valuemax",
                        "aria-valuenow",
                        "aria-valuetext",
                        "aria-orientation",
                        "aria-disabled",
                        "onUpdate:modelValue",
                      ]
                    ),
                    ue.range
                      ? (L(),
                        he(
                          Hd,
                          {
                            key: 0,
                            ref_key: "secondButton",
                            ref: c,
                            "model-value": m(ve),
                            vertical: ue.vertical,
                            "tooltip-class": ue.tooltipClass,
                            placement: ue.placement,
                            role: "slider",
                            "aria-label": m(K),
                            "aria-valuemin": m(J),
                            "aria-valuemax": ue.max,
                            "aria-valuenow": m(ve),
                            "aria-valuetext": m(q),
                            "aria-orientation": ue.vertical
                              ? "vertical"
                              : "horizontal",
                            "aria-disabled": m(f),
                            "onUpdate:modelValue": m(C),
                          },
                          null,
                          8,
                          [
                            "model-value",
                            "vertical",
                            "tooltip-class",
                            "placement",
                            "aria-label",
                            "aria-valuemin",
                            "aria-valuemax",
                            "aria-valuenow",
                            "aria-valuetext",
                            "aria-orientation",
                            "aria-disabled",
                            "onUpdate:modelValue",
                          ]
                        ))
                      : ge("v-if", !0),
                    ue.showStops
                      ? (L(),
                        te("div", x5, [
                          (L(!0),
                          te(
                            Ue,
                            null,
                            Cn(
                              m(E),
                              (_e, je) => (
                                L(),
                                te(
                                  "div",
                                  {
                                    key: je,
                                    class: W(m(o).e("stop")),
                                    style: He(m($)(_e)),
                                  },
                                  null,
                                  6
                                )
                              )
                            ),
                            128
                          )),
                        ]))
                      : ge("v-if", !0),
                    m(R).length > 0
                      ? (L(),
                        te(
                          Ue,
                          { key: 2 },
                          [
                            ae("div", null, [
                              (L(!0),
                              te(
                                Ue,
                                null,
                                Cn(
                                  m(R),
                                  (_e, je) => (
                                    L(),
                                    te(
                                      "div",
                                      {
                                        key: je,
                                        style: He(m($)(_e.position)),
                                        class: W([
                                          m(o).e("stop"),
                                          m(o).e("marks-stop"),
                                        ]),
                                      },
                                      null,
                                      6
                                    )
                                  )
                                ),
                                128
                              )),
                            ]),
                            ae(
                              "div",
                              { class: W(m(o).e("marks")) },
                              [
                                (L(!0),
                                te(
                                  Ue,
                                  null,
                                  Cn(
                                    m(R),
                                    (_e, je) => (
                                      L(),
                                      he(
                                        m(w5),
                                        {
                                          key: je,
                                          mark: _e.mark,
                                          style: He(m($)(_e.position)),
                                        },
                                        null,
                                        8,
                                        ["mark", "style"]
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ],
                              2
                            ),
                          ],
                          64
                        ))
                      : ge("v-if", !0),
                  ],
                  38
                ),
                ue.showInput && !ue.range
                  ? (L(),
                    he(
                      m(sg),
                      {
                        key: 0,
                        ref: "input",
                        "model-value": m(J),
                        class: W(m(o).e("input")),
                        step: ue.step,
                        disabled: m(f),
                        controls: ue.showInputControls,
                        min: ue.min,
                        max: ue.max,
                        debounce: ue.debounce,
                        size: m(O),
                        "onUpdate:modelValue": m(w),
                        onChange: m(_),
                      },
                      null,
                      8,
                      [
                        "model-value",
                        "class",
                        "step",
                        "disabled",
                        "controls",
                        "min",
                        "max",
                        "debounce",
                        "size",
                        "onUpdate:modelValue",
                        "onChange",
                      ]
                    ))
                  : ge("v-if", !0),
              ],
              42,
              _5
            )
          );
        }
      );
    },
  });
var E5 = De(S5, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/slider/src/slider.vue",
  ],
]);
const fg = pt(E5),
  T5 = Ge({
    modelValue: { type: [Boolean, String, Number], default: !1 },
    value: { type: [Boolean, String, Number], default: !1 },
    disabled: { type: Boolean, default: !1 },
    width: { type: [String, Number], default: "" },
    inlinePrompt: { type: Boolean, default: !1 },
    activeIcon: { type: dr },
    inactiveIcon: { type: dr },
    activeText: { type: String, default: "" },
    inactiveText: { type: String, default: "" },
    activeColor: { type: String, default: "" },
    inactiveColor: { type: String, default: "" },
    borderColor: { type: String, default: "" },
    activeValue: { type: [Boolean, String, Number], default: !0 },
    inactiveValue: { type: [Boolean, String, Number], default: !1 },
    name: { type: String, default: "" },
    validateEvent: { type: Boolean, default: !0 },
    id: String,
    loading: { type: Boolean, default: !1 },
    beforeChange: { type: Fe(Function) },
    size: { type: String, validator: tm },
    tabindex: { type: [String, Number] },
  }),
  $5 = {
    [Xe]: (e) => Lt(e) || Be(e) || Ye(e),
    [An]: (e) => Lt(e) || Be(e) || Ye(e),
    [Sn]: (e) => Lt(e) || Be(e) || Ye(e),
  },
  M5 = ["onClick"],
  A5 = [
    "id",
    "aria-checked",
    "aria-disabled",
    "name",
    "true-value",
    "false-value",
    "disabled",
    "tabindex",
    "onKeydown",
  ],
  k5 = ["aria-hidden"],
  O5 = ["aria-hidden"],
  P5 = ["aria-hidden"],
  Ws = "ElSwitch",
  N5 = se({ name: Ws }),
  I5 = se({
    ...N5,
    props: T5,
    emits: $5,
    setup(e, { expose: t, emit: n }) {
      const r = e,
        o = et(),
        { formItem: i } = On(),
        l = jt(),
        a = Ee("switch");
      Zu(
        {
          from: '"value"',
          replacement: '"model-value" or "v-model"',
          scope: Ws,
          version: "2.3.0",
          ref: "https://element-plus.org/en-US/component/switch.html#attributes",
          type: "Attribute",
        },
        A(() => {
          var w;
          return !!((w = o.vnode.props) != null && w.value);
        })
      );
      const { inputId: s } = Lo(r, { formItemContext: i }),
        u = Gr(A(() => r.loading)),
        c = B(r.modelValue !== !1),
        f = B(),
        d = B(),
        h = A(() => [
          a.b(),
          a.m(l.value),
          a.is("disabled", u.value),
          a.is("checked", v.value),
        ]),
        p = A(() => ({ width: yo(r.width) }));
      me(
        () => r.modelValue,
        () => {
          c.value = !0;
        }
      ),
        me(
          () => r.value,
          () => {
            c.value = !1;
          }
        );
      const b = A(() => (c.value ? r.modelValue : r.value)),
        v = A(() => b.value === r.activeValue);
      [r.activeValue, r.inactiveValue].includes(b.value) ||
        (n(Xe, r.inactiveValue),
        n(An, r.inactiveValue),
        n(Sn, r.inactiveValue)),
        me(v, (w) => {
          var C;
          (f.value.checked = w),
            r.validateEvent &&
              ((C = i == null ? void 0 : i.validate) == null ||
                C.call(i, "change").catch((E) => void 0));
        });
      const _ = () => {
          const w = v.value ? r.inactiveValue : r.activeValue;
          n(Xe, w),
            n(An, w),
            n(Sn, w),
            Le(() => {
              f.value.checked = v.value;
            });
        },
        x = () => {
          if (u.value) return;
          const { beforeChange: w } = r;
          if (!w) {
            _();
            return;
          }
          const C = w();
          [Ml(C), Lt(C)].includes(!0) ||
            Ai(
              Ws,
              "beforeChange must return type `Promise<boolean>` or `boolean`"
            ),
            Ml(C)
              ? C.then(($) => {
                  $ && _();
                }).catch(($) => {})
              : C && _();
        },
        g = A(() =>
          a.cssVarBlock({
            ...(r.activeColor ? { "on-color": r.activeColor } : null),
            ...(r.inactiveColor ? { "off-color": r.inactiveColor } : null),
            ...(r.borderColor ? { "border-color": r.borderColor } : null),
          })
        ),
        y = () => {
          var w, C;
          (C = (w = f.value) == null ? void 0 : w.focus) == null || C.call(w);
        };
      return (
        rt(() => {
          f.value.checked = v.value;
        }),
        t({ focus: y, checked: v }),
        (w, C) => (
          L(),
          te(
            "div",
            { class: W(m(h)), style: He(m(g)), onClick: it(x, ["prevent"]) },
            [
              ae(
                "input",
                {
                  id: m(s),
                  ref_key: "input",
                  ref: f,
                  class: W(m(a).e("input")),
                  type: "checkbox",
                  role: "switch",
                  "aria-checked": m(v),
                  "aria-disabled": m(u),
                  name: w.name,
                  "true-value": w.activeValue,
                  "false-value": w.inactiveValue,
                  disabled: m(u),
                  tabindex: w.tabindex,
                  onChange: _,
                  onKeydown: _t(x, ["enter"]),
                },
                null,
                42,
                A5
              ),
              !w.inlinePrompt && (w.inactiveIcon || w.inactiveText)
                ? (L(),
                  te(
                    "span",
                    {
                      key: 0,
                      class: W([
                        m(a).e("label"),
                        m(a).em("label", "left"),
                        m(a).is("active", !m(v)),
                      ]),
                    },
                    [
                      w.inactiveIcon
                        ? (L(),
                          he(
                            m(at),
                            { key: 0 },
                            {
                              default: re(() => [
                                (L(), he(mt(w.inactiveIcon))),
                              ]),
                              _: 1,
                            }
                          ))
                        : ge("v-if", !0),
                      !w.inactiveIcon && w.inactiveText
                        ? (L(),
                          te(
                            "span",
                            { key: 1, "aria-hidden": m(v) },
                            Je(w.inactiveText),
                            9,
                            k5
                          ))
                        : ge("v-if", !0),
                    ],
                    2
                  ))
                : ge("v-if", !0),
              ae(
                "span",
                {
                  ref_key: "core",
                  ref: d,
                  class: W(m(a).e("core")),
                  style: He(m(p)),
                },
                [
                  w.inlinePrompt
                    ? (L(),
                      te(
                        "div",
                        { key: 0, class: W(m(a).e("inner")) },
                        [
                          w.activeIcon || w.inactiveIcon
                            ? (L(),
                              he(
                                m(at),
                                { key: 0, class: W(m(a).is("icon")) },
                                {
                                  default: re(() => [
                                    (L(),
                                    he(
                                      mt(m(v) ? w.activeIcon : w.inactiveIcon)
                                    )),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["class"]
                              ))
                            : w.activeText || w.inactiveText
                            ? (L(),
                              te(
                                "span",
                                {
                                  key: 1,
                                  class: W(m(a).is("text")),
                                  "aria-hidden": !m(v),
                                },
                                Je(m(v) ? w.activeText : w.inactiveText),
                                11,
                                O5
                              ))
                            : ge("v-if", !0),
                        ],
                        2
                      ))
                    : ge("v-if", !0),
                  ae(
                    "div",
                    { class: W(m(a).e("action")) },
                    [
                      w.loading
                        ? (L(),
                          he(
                            m(at),
                            { key: 0, class: W(m(a).is("loading")) },
                            { default: re(() => [oe(m(va))]), _: 1 },
                            8,
                            ["class"]
                          ))
                        : ge("v-if", !0),
                    ],
                    2
                  ),
                ],
                6
              ),
              !w.inlinePrompt && (w.activeIcon || w.activeText)
                ? (L(),
                  te(
                    "span",
                    {
                      key: 1,
                      class: W([
                        m(a).e("label"),
                        m(a).em("label", "right"),
                        m(a).is("active", m(v)),
                      ]),
                    },
                    [
                      w.activeIcon
                        ? (L(),
                          he(
                            m(at),
                            { key: 0 },
                            {
                              default: re(() => [(L(), he(mt(w.activeIcon)))]),
                              _: 1,
                            }
                          ))
                        : ge("v-if", !0),
                      !w.activeIcon && w.activeText
                        ? (L(),
                          te(
                            "span",
                            { key: 1, "aria-hidden": !m(v) },
                            Je(w.activeText),
                            9,
                            P5
                          ))
                        : ge("v-if", !0),
                    ],
                    2
                  ))
                : ge("v-if", !0),
            ],
            14,
            M5
          )
        )
      );
    },
  });
var L5 = De(I5, [
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/switch/src/switch.vue",
  ],
]);
const F5 = pt(L5);
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */ var R5 = /["'&<>]/,
  B5 = V5;
function V5(e) {
  var t = "" + e,
    n = R5.exec(t);
  if (!n) return t;
  var r,
    o = "",
    i = 0,
    l = 0;
  for (i = n.index; i < t.length; i++) {
    switch (t.charCodeAt(i)) {
      case 34:
        r = "&quot;";
        break;
      case 38:
        r = "&amp;";
        break;
      case 39:
        r = "&#39;";
        break;
      case 60:
        r = "&lt;";
        break;
      case 62:
        r = "&gt;";
        break;
      default:
        continue;
    }
    l !== i && (o += t.substring(l, i)), (l = i + 1), (o += r);
  }
  return l !== i ? o + t.substring(l, i) : o;
}
const Ua = function (e) {
    var t;
    return (t = e.target) == null ? void 0 : t.closest("td");
  },
  zd = function (e) {
    return e !== null && typeof e == "object";
  },
  D5 = function (e, t, n, r, o) {
    if (!t && !r && (!o || (Array.isArray(o) && !o.length))) return e;
    typeof n == "string"
      ? (n = n === "descending" ? -1 : 1)
      : (n = n && n < 0 ? -1 : 1);
    const i = r
        ? null
        : function (a, s) {
            return o
              ? (Array.isArray(o) || (o = [o]),
                o.map((u) => (typeof u == "string" ? Mt(a, u) : u(a, s, e))))
              : (t !== "$key" && zd(a) && "$value" in a && (a = a.$value),
                [zd(a) ? Mt(a, t) : a]);
          },
      l = function (a, s) {
        if (r) return r(a.value, s.value);
        for (let u = 0, c = a.key.length; u < c; u++) {
          if (a.key[u] < s.key[u]) return -1;
          if (a.key[u] > s.key[u]) return 1;
        }
        return 0;
      };
    return e
      .map((a, s) => ({ value: a, index: s, key: i ? i(a, s) : null }))
      .sort((a, s) => {
        let u = l(a, s);
        return u || (u = a.index - s.index), u * +n;
      })
      .map((a) => a.value);
  },
  dg = function (e, t) {
    let n = null;
    return (
      e.columns.forEach((r) => {
        r.id === t && (n = r);
      }),
      n
    );
  },
  H5 = function (e, t) {
    let n = null;
    for (let r = 0; r < e.columns.length; r++) {
      const o = e.columns[r];
      if (o.columnKey === t) {
        n = o;
        break;
      }
    }
    return n || Ai("ElTable", `No column matching with column-key: ${t}`), n;
  },
  Wd = function (e, t, n) {
    const r = (t.className || "").match(new RegExp(`${n}-table_[^\\s]+`, "gm"));
    return r ? dg(e, r[0]) : null;
  },
  ht = (e, t) => {
    if (!e) throw new Error("Row is required when get row identity");
    if (typeof t == "string") {
      if (!t.includes(".")) return `${e[t]}`;
      const n = t.split(".");
      let r = e;
      for (const o of n) r = r[o];
      return `${r}`;
    } else if (typeof t == "function") return t.call(null, e);
  },
  Pr = function (e, t) {
    const n = {};
    return (
      (e || []).forEach((r, o) => {
        n[ht(r, t)] = { row: r, index: o };
      }),
      n
    );
  };
function z5(e, t) {
  const n = {};
  let r;
  for (r in e) n[r] = e[r];
  for (r in t)
    if (Re(t, r)) {
      const o = t[r];
      typeof o < "u" && (n[r] = o);
    }
  return n;
}
function gc(e) {
  return (
    e === "" ||
      (e !== void 0 &&
        ((e = Number.parseInt(e, 10)), Number.isNaN(e) && (e = ""))),
    e
  );
}
function pg(e) {
  return (
    e === "" || (e !== void 0 && ((e = gc(e)), Number.isNaN(e) && (e = 80))), e
  );
}
function W5(e) {
  return typeof e == "number"
    ? e
    : typeof e == "string"
    ? /^\d+(?:px)?$/.test(e)
      ? Number.parseInt(e, 10)
      : e
    : null;
}
function j5(...e) {
  return e.length === 0
    ? (t) => t
    : e.length === 1
    ? e[0]
    : e.reduce(
        (t, n) =>
          (...r) =>
            t(n(...r))
      );
}
function _l(e, t, n) {
  let r = !1;
  const o = e.indexOf(t),
    i = o !== -1,
    l = () => {
      e.push(t), (r = !0);
    },
    a = () => {
      e.splice(o, 1), (r = !0);
    };
  return (
    typeof n == "boolean" ? (n && !i ? l() : !n && i && a()) : i ? a() : l(), r
  );
}
function K5(e, t, n = "children", r = "hasChildren") {
  const o = (l) => !(Array.isArray(l) && l.length);
  function i(l, a, s) {
    t(l, a, s),
      a.forEach((u) => {
        if (u[r]) {
          t(u, null, s + 1);
          return;
        }
        const c = u[n];
        o(c) || i(u, c, s + 1);
      });
  }
  e.forEach((l) => {
    if (l[r]) {
      t(l, null, 0);
      return;
    }
    const a = l[n];
    o(a) || i(l, a, 0);
  });
}
let Rn;
function q5(e, t, n, r, o) {
  const { nextZIndex: i } = ec(),
    l = e == null ? void 0 : e.dataset.prefix,
    a = e == null ? void 0 : e.querySelector(`.${l}-scrollbar__wrap`);
  function s() {
    const p = o === "light",
      b = document.createElement("div");
    return (
      (b.className = `${l}-popper ${p ? "is-light" : "is-dark"}`),
      (n = B5(n)),
      (b.innerHTML = n),
      (b.style.zIndex = String(i())),
      e == null || e.appendChild(b),
      b
    );
  }
  function u() {
    const p = document.createElement("div");
    return (p.className = `${l}-popper__arrow`), p;
  }
  function c() {
    f && f.update();
  }
  Rn == null || Rn(),
    (Rn = () => {
      try {
        f && f.destroy(),
          d && (e == null || e.removeChild(d)),
          t.removeEventListener("mouseenter", c),
          t.removeEventListener("mouseleave", Rn),
          a == null || a.removeEventListener("scroll", Rn),
          (Rn = void 0);
      } catch {}
    });
  let f = null;
  const d = s(),
    h = u();
  return (
    d.appendChild(h),
    (f = Mm(t, d, {
      strategy: "absolute",
      modifiers: [
        { name: "offset", options: { offset: [0, 8] } },
        { name: "arrow", options: { element: h, padding: 10 } },
      ],
      ...r,
    })),
    t.addEventListener("mouseenter", c),
    t.addEventListener("mouseleave", Rn),
    a == null || a.addEventListener("scroll", Rn),
    f
  );
}
const hg = (e, t, n, r) => {
    let o = 0,
      i = e;
    if (r) {
      if (r[e].colSpan > 1) return {};
      for (let s = 0; s < e; s++) o += r[s].colSpan;
      i = o + r[e].colSpan - 1;
    } else o = e;
    let l;
    const a = n.states.columns;
    switch (t) {
      case "left":
        i < n.states.fixedLeafColumnsLength.value && (l = "left");
        break;
      case "right":
        o >= a.value.length - n.states.rightFixedLeafColumnsLength.value &&
          (l = "right");
        break;
      default:
        i < n.states.fixedLeafColumnsLength.value
          ? (l = "left")
          : o >= a.value.length - n.states.rightFixedLeafColumnsLength.value &&
            (l = "right");
    }
    return l ? { direction: l, start: o, after: i } : {};
  },
  vc = (e, t, n, r, o, i = 0) => {
    const l = [],
      { direction: a, start: s } = hg(t, n, r, o);
    if (a) {
      const u = a === "left";
      l.push(`${e}-fixed-column--${a}`),
        u && s + i === r.states.fixedLeafColumnsLength.value - 1
          ? l.push("is-last-column")
          : !u &&
            s - i ===
              r.states.columns.value.length -
                r.states.rightFixedLeafColumnsLength.value &&
            l.push("is-first-column");
    }
    return l;
  };
function jd(e, t) {
  return (
    e +
    (t.realWidth === null || Number.isNaN(t.realWidth)
      ? Number(t.width)
      : t.realWidth)
  );
}
const bc = (e, t, n, r) => {
    const { direction: o, start: i = 0 } = hg(e, t, n, r);
    if (!o) return;
    const l = {},
      a = o === "left",
      s = n.states.columns.value;
    return (
      a
        ? (l.left = s.slice(0, e).reduce(jd, 0))
        : (l.right = s
            .slice(i + 1)
            .reverse()
            .reduce(jd, 0)),
      l
    );
  },
  $o = (e, t) => {
    !e || Number.isNaN(e[t]) || (e[t] = `${e[t]}px`);
  };
function U5(e) {
  const t = et(),
    n = B(!1),
    r = B([]);
  return {
    updateExpandRows: () => {
      const s = e.data.value || [],
        u = e.rowKey.value;
      if (n.value) r.value = s.slice();
      else if (u) {
        const c = Pr(r.value, u);
        r.value = s.reduce((f, d) => {
          const h = ht(d, u);
          return c[h] && f.push(d), f;
        }, []);
      } else r.value = [];
    },
    toggleRowExpansion: (s, u) => {
      _l(r.value, s, u) && t.emit("expand-change", s, r.value.slice());
    },
    setExpandRowKeys: (s) => {
      t.store.assertRowKey();
      const u = e.data.value || [],
        c = e.rowKey.value,
        f = Pr(u, c);
      r.value = s.reduce((d, h) => {
        const p = f[h];
        return p && d.push(p.row), d;
      }, []);
    },
    isRowExpanded: (s) => {
      const u = e.rowKey.value;
      return u ? !!Pr(r.value, u)[ht(s, u)] : r.value.includes(s);
    },
    states: { expandRows: r, defaultExpandAll: n },
  };
}
function Y5(e) {
  const t = et(),
    n = B(null),
    r = B(null),
    o = (u) => {
      t.store.assertRowKey(), (n.value = u), l(u);
    },
    i = () => {
      n.value = null;
    },
    l = (u) => {
      const { data: c, rowKey: f } = e;
      let d = null;
      f.value && (d = (m(c) || []).find((h) => ht(h, f.value) === u)),
        (r.value = d),
        t.emit("current-change", r.value, null);
    };
  return {
    setCurrentRowKey: o,
    restoreCurrentRowKey: i,
    setCurrentRowByKey: l,
    updateCurrentRow: (u) => {
      const c = r.value;
      if (u && u !== c) {
        (r.value = u), t.emit("current-change", r.value, c);
        return;
      }
      !u && c && ((r.value = null), t.emit("current-change", null, c));
    },
    updateCurrentRowData: () => {
      const u = e.rowKey.value,
        c = e.data.value || [],
        f = r.value;
      if (!c.includes(f) && f) {
        if (u) {
          const d = ht(f, u);
          l(d);
        } else r.value = null;
        r.value === null && t.emit("current-change", null, f);
      } else n.value && (l(n.value), i());
    },
    states: { _currentRowKey: n, currentRow: r },
  };
}
function X5(e) {
  const t = B([]),
    n = B({}),
    r = B(16),
    o = B(!1),
    i = B({}),
    l = B("hasChildren"),
    a = B("children"),
    s = et(),
    u = A(() => {
      if (!e.rowKey.value) return {};
      const _ = e.data.value || [];
      return f(_);
    }),
    c = A(() => {
      const _ = e.rowKey.value,
        x = Object.keys(i.value),
        g = {};
      return (
        x.length &&
          x.forEach((y) => {
            if (i.value[y].length) {
              const w = { children: [] };
              i.value[y].forEach((C) => {
                const E = ht(C, _);
                w.children.push(E),
                  C[l.value] && !g[E] && (g[E] = { children: [] });
              }),
                (g[y] = w);
            }
          }),
        g
      );
    }),
    f = (_) => {
      const x = e.rowKey.value,
        g = {};
      return (
        K5(
          _,
          (y, w, C) => {
            const E = ht(y, x);
            Array.isArray(w)
              ? (g[E] = { children: w.map(($) => ht($, x)), level: C })
              : o.value && (g[E] = { children: [], lazy: !0, level: C });
          },
          a.value,
          l.value
        ),
        g
      );
    },
    d = (
      _ = !1,
      x = ((g) =>
        (g = s.store) == null ? void 0 : g.states.defaultExpandAll.value)()
    ) => {
      var g;
      const y = u.value,
        w = c.value,
        C = Object.keys(y),
        E = {};
      if (C.length) {
        const $ = m(n),
          I = [],
          D = (O, S) => {
            if (_)
              return t.value
                ? x || t.value.includes(S)
                : !!(x || (O == null ? void 0 : O.expanded));
            {
              const N = x || (t.value && t.value.includes(S));
              return !!((O == null ? void 0 : O.expanded) || N);
            }
          };
        C.forEach((O) => {
          const S = $[O],
            N = { ...y[O] };
          if (((N.expanded = D(S, O)), N.lazy)) {
            const { loaded: X = !1, loading: K = !1 } = S || {};
            (N.loaded = !!X), (N.loading = !!K), I.push(O);
          }
          E[O] = N;
        });
        const P = Object.keys(w);
        o.value &&
          P.length &&
          I.length &&
          P.forEach((O) => {
            const S = $[O],
              N = w[O].children;
            if (I.includes(O)) {
              if (E[O].children.length !== 0)
                throw new Error("[ElTable]children must be an empty array.");
              E[O].children = N;
            } else {
              const { loaded: X = !1, loading: K = !1 } = S || {};
              E[O] = {
                lazy: !0,
                loaded: !!X,
                loading: !!K,
                expanded: D(S, O),
                children: N,
                level: "",
              };
            }
          });
      }
      (n.value = E), (g = s.store) == null || g.updateTableScrollY();
    };
  me(
    () => t.value,
    () => {
      d(!0);
    }
  ),
    me(
      () => u.value,
      () => {
        d();
      }
    ),
    me(
      () => c.value,
      () => {
        d();
      }
    );
  const h = (_) => {
      (t.value = _), d();
    },
    p = (_, x) => {
      s.store.assertRowKey();
      const g = e.rowKey.value,
        y = ht(_, g),
        w = y && n.value[y];
      if (y && w && "expanded" in w) {
        const C = w.expanded;
        (x = typeof x > "u" ? !w.expanded : x),
          (n.value[y].expanded = x),
          C !== x && s.emit("expand-change", _, x),
          s.store.updateTableScrollY();
      }
    },
    b = (_) => {
      s.store.assertRowKey();
      const x = e.rowKey.value,
        g = ht(_, x),
        y = n.value[g];
      o.value && y && "loaded" in y && !y.loaded ? v(_, g, y) : p(_, void 0);
    },
    v = (_, x, g) => {
      const { load: y } = s.props;
      y &&
        !n.value[x].loaded &&
        ((n.value[x].loading = !0),
        y(_, g, (w) => {
          if (!Array.isArray(w))
            throw new TypeError("[ElTable] data must be an array");
          (n.value[x].loading = !1),
            (n.value[x].loaded = !0),
            (n.value[x].expanded = !0),
            w.length && (i.value[x] = w),
            s.emit("expand-change", _, !0);
        }));
    };
  return {
    loadData: v,
    loadOrToggle: b,
    toggleTreeExpansion: p,
    updateTreeExpandKeys: h,
    updateTreeData: d,
    normalize: f,
    states: {
      expandRowKeys: t,
      treeData: n,
      indent: r,
      lazy: o,
      lazyTreeNodeMap: i,
      lazyColumnIdentifier: l,
      childrenColumnName: a,
    },
  };
}
const G5 = (e, t) => {
    const n = t.sortingColumn;
    return !n || typeof n.sortable == "string"
      ? e
      : D5(e, t.sortProp, t.sortOrder, n.sortMethod, n.sortBy);
  },
  xl = (e) => {
    const t = [];
    return (
      e.forEach((n) => {
        n.children ? t.push.apply(t, xl(n.children)) : t.push(n);
      }),
      t
    );
  };
function J5() {
  var e;
  const t = et(),
    { size: n } = Xt((e = t.proxy) == null ? void 0 : e.$props),
    r = B(null),
    o = B([]),
    i = B([]),
    l = B(!1),
    a = B([]),
    s = B([]),
    u = B([]),
    c = B([]),
    f = B([]),
    d = B([]),
    h = B([]),
    p = B([]),
    b = B(0),
    v = B(0),
    _ = B(0),
    x = B(!1),
    g = B([]),
    y = B(!1),
    w = B(!1),
    C = B(null),
    E = B({}),
    $ = B(null),
    I = B(null),
    D = B(null),
    P = B(null),
    O = B(null);
  me(o, () => t.state && X(!1), { deep: !0 });
  const S = () => {
      if (!r.value) throw new Error("[ElTable] prop row-key is required");
    },
    N = () => {
      (c.value = a.value.filter((F) => F.fixed === !0 || F.fixed === "left")),
        (f.value = a.value.filter((F) => F.fixed === "right")),
        c.value.length > 0 &&
          a.value[0] &&
          a.value[0].type === "selection" &&
          !a.value[0].fixed &&
          ((a.value[0].fixed = !0), c.value.unshift(a.value[0]));
      const le = a.value.filter((F) => !F.fixed);
      s.value = [].concat(c.value).concat(le).concat(f.value);
      const pe = xl(le),
        ke = xl(c.value),
        Ae = xl(f.value);
      (b.value = pe.length),
        (v.value = ke.length),
        (_.value = Ae.length),
        (u.value = [].concat(ke).concat(pe).concat(Ae)),
        (l.value = c.value.length > 0 || f.value.length > 0);
    },
    X = (le, pe = !1) => {
      le && N(), pe ? t.state.doLayout() : t.state.debouncedUpdateLayout();
    },
    K = (le) => g.value.includes(le),
    q = () => {
      (x.value = !1),
        g.value.length && ((g.value = []), t.emit("selection-change", []));
    },
    V = () => {
      let le;
      if (r.value) {
        le = [];
        const pe = Pr(g.value, r.value),
          ke = Pr(o.value, r.value);
        for (const Ae in pe) Re(pe, Ae) && !ke[Ae] && le.push(pe[Ae].row);
      } else le = g.value.filter((pe) => !o.value.includes(pe));
      if (le.length) {
        const pe = g.value.filter((ke) => !le.includes(ke));
        (g.value = pe), t.emit("selection-change", pe.slice());
      }
    },
    R = () => (g.value || []).slice(),
    ne = (le, pe = void 0, ke = !0) => {
      if (_l(g.value, le, pe)) {
        const F = (g.value || []).slice();
        ke && t.emit("select", F, le), t.emit("selection-change", F);
      }
    },
    ie = () => {
      var le, pe;
      const ke = w.value ? !x.value : !(x.value || g.value.length);
      x.value = ke;
      let Ae = !1,
        F = 0;
      const G =
        (pe =
          (le = t == null ? void 0 : t.store) == null ? void 0 : le.states) ==
        null
          ? void 0
          : pe.rowKey.value;
      o.value.forEach((ye, xe) => {
        const ze = xe + F;
        C.value
          ? C.value.call(null, ye, ze) && _l(g.value, ye, ke) && (Ae = !0)
          : _l(g.value, ye, ke) && (Ae = !0),
          (F += $e(ht(ye, G)));
      }),
        Ae && t.emit("selection-change", g.value ? g.value.slice() : []),
        t.emit("select-all", g.value);
    },
    J = () => {
      const le = Pr(g.value, r.value);
      o.value.forEach((pe) => {
        const ke = ht(pe, r.value),
          Ae = le[ke];
        Ae && (g.value[Ae.index] = pe);
      });
    },
    ve = () => {
      var le, pe, ke;
      if (((le = o.value) == null ? void 0 : le.length) === 0) {
        x.value = !1;
        return;
      }
      let Ae;
      r.value && (Ae = Pr(g.value, r.value));
      const F = function (ze) {
        return Ae ? !!Ae[ht(ze, r.value)] : g.value.includes(ze);
      };
      let G = !0,
        ye = 0,
        xe = 0;
      for (let ze = 0, Vt = (o.value || []).length; ze < Vt; ze++) {
        const vn =
            (ke =
              (pe = t == null ? void 0 : t.store) == null
                ? void 0
                : pe.states) == null
              ? void 0
              : ke.rowKey.value,
          Qt = ze + xe,
          bt = o.value[ze],
          Zr = C.value && C.value.call(null, bt, Qt);
        if (F(bt)) ye++;
        else if (!C.value || Zr) {
          G = !1;
          break;
        }
        xe += $e(ht(bt, vn));
      }
      ye === 0 && (G = !1), (x.value = G);
    },
    $e = (le) => {
      var pe;
      if (!t || !t.store) return 0;
      const { treeData: ke } = t.store.states;
      let Ae = 0;
      const F = (pe = ke.value[le]) == null ? void 0 : pe.children;
      return (
        F &&
          ((Ae += F.length),
          F.forEach((G) => {
            Ae += $e(G);
          })),
        Ae
      );
    },
    Ce = (le, pe) => {
      Array.isArray(le) || (le = [le]);
      const ke = {};
      return (
        le.forEach((Ae) => {
          (E.value[Ae.id] = pe), (ke[Ae.columnKey || Ae.id] = pe);
        }),
        ke
      );
    },
    ue = (le, pe, ke) => {
      I.value && I.value !== le && (I.value.order = null),
        (I.value = le),
        (D.value = pe),
        (P.value = ke);
    },
    Q = () => {
      let le = m(i);
      Object.keys(E.value).forEach((pe) => {
        const ke = E.value[pe];
        if (!ke || ke.length === 0) return;
        const Ae = dg({ columns: u.value }, pe);
        Ae &&
          Ae.filterMethod &&
          (le = le.filter((F) =>
            ke.some((G) => Ae.filterMethod.call(null, G, F, Ae))
          ));
      }),
        ($.value = le);
    },
    ce = () => {
      o.value = G5($.value, {
        sortingColumn: I.value,
        sortProp: D.value,
        sortOrder: P.value,
      });
    },
    Me = (le = void 0) => {
      (le && le.filter) || Q(), ce();
    },
    _e = (le) => {
      const { tableHeaderRef: pe } = t.refs;
      if (!pe) return;
      const ke = Object.assign({}, pe.filterPanels),
        Ae = Object.keys(ke);
      if (!!Ae.length)
        if ((typeof le == "string" && (le = [le]), Array.isArray(le))) {
          const F = le.map((G) => H5({ columns: u.value }, G));
          Ae.forEach((G) => {
            const ye = F.find((xe) => xe.id === G);
            ye && (ye.filteredValue = []);
          }),
            t.store.commit("filterChange", {
              column: F,
              values: [],
              silent: !0,
              multi: !0,
            });
        } else
          Ae.forEach((F) => {
            const G = u.value.find((ye) => ye.id === F);
            G && (G.filteredValue = []);
          }),
            (E.value = {}),
            t.store.commit("filterChange", {
              column: {},
              values: [],
              silent: !0,
            });
    },
    je = () => {
      !I.value ||
        (ue(null, null, null),
        t.store.commit("changeSortCondition", { silent: !0 }));
    },
    {
      setExpandRowKeys: T,
      toggleRowExpansion: M,
      updateExpandRows: H,
      states: Y,
      isRowExpanded: U,
    } = U5({ data: o, rowKey: r }),
    {
      updateTreeExpandKeys: z,
      toggleTreeExpansion: ee,
      updateTreeData: Z,
      loadOrToggle: k,
      states: j,
    } = X5({ data: o, rowKey: r }),
    {
      updateCurrentRowData: de,
      updateCurrentRow: fe,
      setCurrentRowKey: be,
      states: Se,
    } = Y5({ data: o, rowKey: r });
  return {
    assertRowKey: S,
    updateColumns: N,
    scheduleLayout: X,
    isSelected: K,
    clearSelection: q,
    cleanSelection: V,
    getSelectionRows: R,
    toggleRowSelection: ne,
    _toggleAllSelection: ie,
    toggleAllSelection: null,
    updateSelectionByRowKey: J,
    updateAllSelected: ve,
    updateFilters: Ce,
    updateCurrentRow: fe,
    updateSort: ue,
    execFilter: Q,
    execSort: ce,
    execQuery: Me,
    clearFilter: _e,
    clearSort: je,
    toggleRowExpansion: M,
    setExpandRowKeysAdapter: (le) => {
      T(le), z(le);
    },
    setCurrentRowKey: be,
    toggleRowExpansionAdapter: (le, pe) => {
      u.value.some(({ type: Ae }) => Ae === "expand") ? M(le, pe) : ee(le, pe);
    },
    isRowExpanded: U,
    updateExpandRows: H,
    updateCurrentRowData: de,
    loadOrToggle: k,
    updateTreeData: Z,
    states: {
      tableSize: n,
      rowKey: r,
      data: o,
      _data: i,
      isComplex: l,
      _columns: a,
      originColumns: s,
      columns: u,
      fixedColumns: c,
      rightFixedColumns: f,
      leafColumns: d,
      fixedLeafColumns: h,
      rightFixedLeafColumns: p,
      leafColumnsLength: b,
      fixedLeafColumnsLength: v,
      rightFixedLeafColumnsLength: _,
      isAllSelected: x,
      selection: g,
      reserveSelection: y,
      selectOnIndeterminate: w,
      selectable: C,
      filters: E,
      filteredData: $,
      sortingColumn: I,
      sortProp: D,
      sortOrder: P,
      hoverRow: O,
      ...Y,
      ...j,
      ...Se,
    },
  };
}
function js(e, t) {
  return e.map((n) => {
    var r;
    return n.id === t.id
      ? t
      : ((r = n.children) != null &&
          r.length &&
          (n.children = js(n.children, t)),
        n);
  });
}
function mg(e) {
  e.forEach((t) => {
    var n, r;
    (t.no = (n = t.getColumnIndex) == null ? void 0 : n.call(t)),
      (r = t.children) != null && r.length && mg(t.children);
  }),
    e.sort((t, n) => t.no - n.no);
}
function Z5() {
  const e = et(),
    t = J5();
  return {
    ns: Ee("table"),
    ...t,
    mutations: {
      setData(l, a) {
        const s = m(l._data) !== a;
        (l.data.value = a),
          (l._data.value = a),
          e.store.execQuery(),
          e.store.updateCurrentRowData(),
          e.store.updateExpandRows(),
          e.store.updateTreeData(e.store.states.defaultExpandAll.value),
          m(l.reserveSelection)
            ? (e.store.assertRowKey(), e.store.updateSelectionByRowKey())
            : s
            ? e.store.clearSelection()
            : e.store.cleanSelection(),
          e.store.updateAllSelected(),
          e.$ready && e.store.scheduleLayout();
      },
      insertColumn(l, a, s) {
        const u = m(l._columns);
        let c = [];
        s
          ? (s && !s.children && (s.children = []),
            s.children.push(a),
            (c = js(u, s)))
          : (u.push(a), (c = u)),
          mg(c),
          (l._columns.value = c),
          a.type === "selection" &&
            ((l.selectable.value = a.selectable),
            (l.reserveSelection.value = a.reserveSelection)),
          e.$ready && (e.store.updateColumns(), e.store.scheduleLayout());
      },
      removeColumn(l, a, s) {
        const u = m(l._columns) || [];
        if (s)
          s.children.splice(
            s.children.findIndex((c) => c.id === a.id),
            1
          ),
            s.children.length === 0 && delete s.children,
            (l._columns.value = js(u, s));
        else {
          const c = u.indexOf(a);
          c > -1 && (u.splice(c, 1), (l._columns.value = u));
        }
        e.$ready && (e.store.updateColumns(), e.store.scheduleLayout());
      },
      sort(l, a) {
        const { prop: s, order: u, init: c } = a;
        if (s) {
          const f = m(l.columns).find((d) => d.property === s);
          f &&
            ((f.order = u),
            e.store.updateSort(f, s, u),
            e.store.commit("changeSortCondition", { init: c }));
        }
      },
      changeSortCondition(l, a) {
        const { sortingColumn: s, sortProp: u, sortOrder: c } = l,
          f = m(s),
          d = m(u),
          h = m(c);
        h === null &&
          ((l.sortingColumn.value = null), (l.sortProp.value = null));
        const p = { filter: !0 };
        e.store.execQuery(p),
          (!a || !(a.silent || a.init)) &&
            e.emit("sort-change", { column: f, prop: d, order: h }),
          e.store.updateTableScrollY();
      },
      filterChange(l, a) {
        const { column: s, values: u, silent: c } = a,
          f = e.store.updateFilters(s, u);
        e.store.execQuery(),
          c || e.emit("filter-change", f),
          e.store.updateTableScrollY();
      },
      toggleAllSelection() {
        e.store.toggleAllSelection();
      },
      rowSelectedChanged(l, a) {
        e.store.toggleRowSelection(a), e.store.updateAllSelected();
      },
      setHoverRow(l, a) {
        l.hoverRow.value = a;
      },
      setCurrentRow(l, a) {
        e.store.updateCurrentRow(a);
      },
    },
    commit: function (l, ...a) {
      const s = e.store.mutations;
      if (s[l]) s[l].apply(e, [e.store.states].concat(a));
      else throw new Error(`Action not found: ${l}`);
    },
    updateTableScrollY: function () {
      Le(() => e.layout.updateScrollY.apply(e.layout));
    },
  };
}
const ri = {
  rowKey: "rowKey",
  defaultExpandAll: "defaultExpandAll",
  selectOnIndeterminate: "selectOnIndeterminate",
  indent: "indent",
  lazy: "lazy",
  data: "data",
  ["treeProps.hasChildren"]: {
    key: "lazyColumnIdentifier",
    default: "hasChildren",
  },
  ["treeProps.children"]: { key: "childrenColumnName", default: "children" },
};
function Q5(e, t) {
  if (!e) throw new Error("Table is required.");
  const n = Z5();
  return (
    (n.toggleAllSelection = Mn(n._toggleAllSelection, 10)),
    Object.keys(ri).forEach((r) => {
      gg(vg(t, r), r, n);
    }),
    eT(n, t),
    n
  );
}
function eT(e, t) {
  Object.keys(ri).forEach((n) => {
    me(
      () => vg(t, n),
      (r) => {
        gg(r, n, e);
      }
    );
  });
}
function gg(e, t, n) {
  let r = e,
    o = ri[t];
  typeof ri[t] == "object" && ((o = o.key), (r = r || ri[t].default)),
    (n.states[o].value = r);
}
function vg(e, t) {
  if (t.includes(".")) {
    const n = t.split(".");
    let r = e;
    return (
      n.forEach((o) => {
        r = r[o];
      }),
      r
    );
  } else return e[t];
}
class tT {
  constructor(t) {
    (this.observers = []),
      (this.table = null),
      (this.store = null),
      (this.columns = []),
      (this.fit = !0),
      (this.showHeader = !0),
      (this.height = B(null)),
      (this.scrollX = B(!1)),
      (this.scrollY = B(!1)),
      (this.bodyWidth = B(null)),
      (this.fixedWidth = B(null)),
      (this.rightFixedWidth = B(null)),
      (this.gutterWidth = 0);
    for (const n in t)
      Re(t, n) && (Qe(this[n]) ? (this[n].value = t[n]) : (this[n] = t[n]));
    if (!this.table) throw new Error("Table is required for Table Layout");
    if (!this.store) throw new Error("Store is required for Table Layout");
  }
  updateScrollY() {
    if (this.height.value === null) return !1;
    const n = this.table.refs.scrollBarRef;
    if (this.table.vnode.el && n) {
      let r = !0;
      const o = this.scrollY.value;
      return (
        (r = n.wrap$.scrollHeight > n.wrap$.clientHeight),
        (this.scrollY.value = r),
        o !== r
      );
    }
    return !1;
  }
  setHeight(t, n = "height") {
    if (!lt) return;
    const r = this.table.vnode.el;
    if (((t = W5(t)), (this.height.value = Number(t)), !r && (t || t === 0)))
      return Le(() => this.setHeight(t, n));
    typeof t == "number"
      ? ((r.style[n] = `${t}px`), this.updateElsHeight())
      : typeof t == "string" && ((r.style[n] = t), this.updateElsHeight());
  }
  setMaxHeight(t) {
    this.setHeight(t, "max-height");
  }
  getFlattenColumns() {
    const t = [];
    return (
      this.table.store.states.columns.value.forEach((r) => {
        r.isColumnGroup ? t.push.apply(t, r.columns) : t.push(r);
      }),
      t
    );
  }
  updateElsHeight() {
    this.updateScrollY(), this.notifyObservers("scrollable");
  }
  headerDisplayNone(t) {
    if (!t) return !0;
    let n = t;
    for (; n.tagName !== "DIV"; ) {
      if (getComputedStyle(n).display === "none") return !0;
      n = n.parentElement;
    }
    return !1;
  }
  updateColumnsWidth() {
    if (!lt) return;
    const t = this.fit,
      n = this.table.vnode.el.clientWidth;
    let r = 0;
    const o = this.getFlattenColumns(),
      i = o.filter((s) => typeof s.width != "number");
    if (
      (o.forEach((s) => {
        typeof s.width == "number" && s.realWidth && (s.realWidth = null);
      }),
      i.length > 0 && t)
    ) {
      if (
        (o.forEach((s) => {
          r += Number(s.width || s.minWidth || 80);
        }),
        r <= n)
      ) {
        this.scrollX.value = !1;
        const s = n - r;
        if (i.length === 1) i[0].realWidth = Number(i[0].minWidth || 80) + s;
        else {
          const u = i.reduce((d, h) => d + Number(h.minWidth || 80), 0),
            c = s / u;
          let f = 0;
          i.forEach((d, h) => {
            if (h === 0) return;
            const p = Math.floor(Number(d.minWidth || 80) * c);
            (f += p), (d.realWidth = Number(d.minWidth || 80) + p);
          }),
            (i[0].realWidth = Number(i[0].minWidth || 80) + s - f);
        }
      } else
        (this.scrollX.value = !0),
          i.forEach((s) => {
            s.realWidth = Number(s.minWidth);
          });
      (this.bodyWidth.value = Math.max(r, n)),
        (this.table.state.resizeState.value.width = this.bodyWidth.value);
    } else
      o.forEach((s) => {
        !s.width && !s.minWidth
          ? (s.realWidth = 80)
          : (s.realWidth = Number(s.width || s.minWidth)),
          (r += s.realWidth);
      }),
        (this.scrollX.value = r > n),
        (this.bodyWidth.value = r);
    const l = this.store.states.fixedColumns.value;
    if (l.length > 0) {
      let s = 0;
      l.forEach((u) => {
        s += Number(u.realWidth || u.width);
      }),
        (this.fixedWidth.value = s);
    }
    const a = this.store.states.rightFixedColumns.value;
    if (a.length > 0) {
      let s = 0;
      a.forEach((u) => {
        s += Number(u.realWidth || u.width);
      }),
        (this.rightFixedWidth.value = s);
    }
    this.notifyObservers("columns");
  }
  addObserver(t) {
    this.observers.push(t);
  }
  removeObserver(t) {
    const n = this.observers.indexOf(t);
    n !== -1 && this.observers.splice(n, 1);
  }
  notifyObservers(t) {
    this.observers.forEach((r) => {
      var o, i;
      switch (t) {
        case "columns":
          (o = r.state) == null || o.onColumnsChange(this);
          break;
        case "scrollable":
          (i = r.state) == null || i.onScrollableChange(this);
          break;
        default:
          throw new Error(`Table Layout don't have event ${t}.`);
      }
    });
  }
}
const { CheckboxGroup: nT } = To,
  rT = se({
    name: "ElTableFilterPanel",
    components: {
      ElCheckbox: To,
      ElCheckboxGroup: nT,
      ElScrollbar: nc,
      ElTooltip: hc,
      ElIcon: at,
      ArrowDown: Yu,
      ArrowUp: Qh,
    },
    directives: { ClickOutside: Lm },
    props: {
      placement: { type: String, default: "bottom-start" },
      store: { type: Object },
      column: { type: Object },
      upDataColumn: { type: Function },
    },
    setup(e) {
      const t = et(),
        { t: n } = Jr(),
        r = Ee("table-filter"),
        o = t == null ? void 0 : t.parent;
      o.filterPanels.value[e.column.id] ||
        (o.filterPanels.value[e.column.id] = t);
      const i = B(!1),
        l = B(null),
        a = A(() => e.column && e.column.filters),
        s = A({
          get: () => {
            var y;
            return (((y = e.column) == null ? void 0 : y.filteredValue) ||
              [])[0];
          },
          set: (y) => {
            u.value &&
              (typeof y < "u" && y !== null
                ? u.value.splice(0, 1, y)
                : u.value.splice(0, 1));
          },
        }),
        u = A({
          get() {
            return e.column ? e.column.filteredValue || [] : [];
          },
          set(y) {
            e.column && e.upDataColumn("filteredValue", y);
          },
        }),
        c = A(() => (e.column ? e.column.filterMultiple : !0)),
        f = (y) => y.value === s.value,
        d = () => {
          i.value = !1;
        },
        h = (y) => {
          y.stopPropagation(), (i.value = !i.value);
        },
        p = () => {
          i.value = !1;
        },
        b = () => {
          x(u.value), d();
        },
        v = () => {
          (u.value = []), x(u.value), d();
        },
        _ = (y) => {
          (s.value = y), x(typeof y < "u" && y !== null ? u.value : []), d();
        },
        x = (y) => {
          e.store.commit("filterChange", { column: e.column, values: y }),
            e.store.updateAllSelected();
        };
      me(
        i,
        (y) => {
          e.column && e.upDataColumn("filterOpened", y);
        },
        { immediate: !0 }
      );
      const g = A(() => {
        var y, w;
        return (w = (y = l.value) == null ? void 0 : y.popperRef) == null
          ? void 0
          : w.contentRef;
      });
      return {
        tooltipVisible: i,
        multiple: c,
        filteredValue: u,
        filterValue: s,
        filters: a,
        handleConfirm: b,
        handleReset: v,
        handleSelect: _,
        isActive: f,
        t: n,
        ns: r,
        showFilterPanel: h,
        hideFilterPanel: p,
        popperPaneRef: g,
        tooltip: l,
      };
    },
  }),
  oT = { key: 0 },
  iT = ["disabled"],
  lT = ["label", "onClick"];
function aT(e, t, n, r, o, i) {
  const l = ut("el-checkbox"),
    a = ut("el-checkbox-group"),
    s = ut("el-scrollbar"),
    u = ut("arrow-up"),
    c = ut("arrow-down"),
    f = ut("el-icon"),
    d = ut("el-tooltip"),
    h = Tu("click-outside");
  return (
    L(),
    he(
      d,
      {
        ref: "tooltip",
        visible: e.tooltipVisible,
        offset: 0,
        placement: e.placement,
        "show-arrow": !1,
        "stop-popper-mouse-event": !1,
        teleported: "",
        effect: "light",
        pure: "",
        "popper-class": e.ns.b(),
        persistent: "",
      },
      {
        content: re(() => [
          e.multiple
            ? (L(),
              te("div", oT, [
                ae(
                  "div",
                  { class: W(e.ns.e("content")) },
                  [
                    oe(
                      s,
                      { "wrap-class": e.ns.e("wrap") },
                      {
                        default: re(() => [
                          oe(
                            a,
                            {
                              modelValue: e.filteredValue,
                              "onUpdate:modelValue":
                                t[0] || (t[0] = (p) => (e.filteredValue = p)),
                              class: W(e.ns.e("checkbox-group")),
                            },
                            {
                              default: re(() => [
                                (L(!0),
                                te(
                                  Ue,
                                  null,
                                  Cn(
                                    e.filters,
                                    (p) => (
                                      L(),
                                      he(
                                        l,
                                        { key: p.value, label: p.value },
                                        {
                                          default: re(() => [
                                            It(Je(p.text), 1),
                                          ]),
                                          _: 2,
                                        },
                                        1032,
                                        ["label"]
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ]),
                              _: 1,
                            },
                            8,
                            ["modelValue", "class"]
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["wrap-class"]
                    ),
                  ],
                  2
                ),
                ae(
                  "div",
                  { class: W(e.ns.e("bottom")) },
                  [
                    ae(
                      "button",
                      {
                        class: W({
                          [e.ns.is("disabled")]: e.filteredValue.length === 0,
                        }),
                        disabled: e.filteredValue.length === 0,
                        type: "button",
                        onClick:
                          t[1] ||
                          (t[1] = (...p) =>
                            e.handleConfirm && e.handleConfirm(...p)),
                      },
                      Je(e.t("el.table.confirmFilter")),
                      11,
                      iT
                    ),
                    ae(
                      "button",
                      {
                        type: "button",
                        onClick:
                          t[2] ||
                          (t[2] = (...p) =>
                            e.handleReset && e.handleReset(...p)),
                      },
                      Je(e.t("el.table.resetFilter")),
                      1
                    ),
                  ],
                  2
                ),
              ]))
            : (L(),
              te(
                "ul",
                { key: 1, class: W(e.ns.e("list")) },
                [
                  ae(
                    "li",
                    {
                      class: W([
                        e.ns.e("list-item"),
                        {
                          [e.ns.is("active")]:
                            e.filterValue === void 0 || e.filterValue === null,
                        },
                      ]),
                      onClick: t[3] || (t[3] = (p) => e.handleSelect(null)),
                    },
                    Je(e.t("el.table.clearFilter")),
                    3
                  ),
                  (L(!0),
                  te(
                    Ue,
                    null,
                    Cn(
                      e.filters,
                      (p) => (
                        L(),
                        te(
                          "li",
                          {
                            key: p.value,
                            class: W([
                              e.ns.e("list-item"),
                              e.ns.is("active", e.isActive(p)),
                            ]),
                            label: p.value,
                            onClick: (b) => e.handleSelect(p.value),
                          },
                          Je(p.text),
                          11,
                          lT
                        )
                      )
                    ),
                    128
                  )),
                ],
                2
              )),
        ]),
        default: re(() => [
          ot(
            (L(),
            te(
              "span",
              {
                class: W([
                  `${e.ns.namespace.value}-table__column-filter-trigger`,
                  `${e.ns.namespace.value}-none-outline`,
                ]),
                onClick:
                  t[4] ||
                  (t[4] = (...p) =>
                    e.showFilterPanel && e.showFilterPanel(...p)),
              },
              [
                oe(f, null, {
                  default: re(() => [
                    e.column.filterOpened
                      ? (L(), he(u, { key: 0 }))
                      : (L(), he(c, { key: 1 })),
                  ]),
                  _: 1,
                }),
              ],
              2
            )),
            [[h, e.hideFilterPanel, e.popperPaneRef]]
          ),
        ]),
        _: 1,
      },
      8,
      ["visible", "placement", "popper-class"]
    )
  );
}
var sT = De(rT, [
  ["render", aT],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/table/src/filter-panel.vue",
  ],
]);
function bg(e) {
  const t = et();
  ua(() => {
    n.value.addObserver(t);
  }),
    rt(() => {
      r(n.value), o(n.value);
    }),
    Ti(() => {
      r(n.value), o(n.value);
    }),
    $i(() => {
      n.value.removeObserver(t);
    });
  const n = A(() => {
      const i = e.layout;
      if (!i) throw new Error("Can not find table layout.");
      return i;
    }),
    r = (i) => {
      var l;
      const a =
        ((l = e.vnode.el) == null
          ? void 0
          : l.querySelectorAll("colgroup > col")) || [];
      if (!a.length) return;
      const s = i.getFlattenColumns(),
        u = {};
      s.forEach((c) => {
        u[c.id] = c;
      });
      for (let c = 0, f = a.length; c < f; c++) {
        const d = a[c],
          h = d.getAttribute("name"),
          p = u[h];
        p && d.setAttribute("width", p.realWidth || p.width);
      }
    },
    o = (i) => {
      var l, a;
      const s =
        ((l = e.vnode.el) == null
          ? void 0
          : l.querySelectorAll("colgroup > col[name=gutter]")) || [];
      for (let c = 0, f = s.length; c < f; c++)
        s[c].setAttribute("width", i.scrollY.value ? i.gutterWidth : "0");
      const u =
        ((a = e.vnode.el) == null ? void 0 : a.querySelectorAll("th.gutter")) ||
        [];
      for (let c = 0, f = u.length; c < f; c++) {
        const d = u[c];
        (d.style.width = i.scrollY.value ? `${i.gutterWidth}px` : "0"),
          (d.style.display = i.scrollY.value ? "" : "none");
      }
    };
  return { tableLayout: n.value, onColumnsChange: r, onScrollableChange: o };
}
const Pn = Symbol("ElTable");
function uT(e, t) {
  const n = et(),
    r = Ie(Pn),
    o = (b) => {
      b.stopPropagation();
    },
    i = (b, v) => {
      !v.filters && v.sortable
        ? p(b, v, !1)
        : v.filterable && !v.sortable && o(b),
        r == null || r.emit("header-click", v, b);
    },
    l = (b, v) => {
      r == null || r.emit("header-contextmenu", v, b);
    },
    a = B(null),
    s = B(!1),
    u = B({}),
    c = (b, v) => {
      if (
        !!lt &&
        !(v.children && v.children.length > 0) &&
        a.value &&
        e.border
      ) {
        s.value = !0;
        const _ = r;
        t("set-drag-visible", !0);
        const g = (_ == null ? void 0 : _.vnode.el).getBoundingClientRect()
            .left,
          y = n.vnode.el.querySelector(`th.${v.id}`),
          w = y.getBoundingClientRect(),
          C = w.left - g + 30;
        Hl(y, "noclick"),
          (u.value = {
            startMouseLeft: b.clientX,
            startLeft: w.right - g,
            startColumnLeft: w.left - g,
            tableLeft: g,
          });
        const E = _ == null ? void 0 : _.refs.resizeProxy;
        (E.style.left = `${u.value.startLeft}px`),
          (document.onselectstart = function () {
            return !1;
          }),
          (document.ondragstart = function () {
            return !1;
          });
        const $ = (D) => {
            const P = D.clientX - u.value.startMouseLeft,
              O = u.value.startLeft + P;
            E.style.left = `${Math.max(C, O)}px`;
          },
          I = () => {
            if (s.value) {
              const { startColumnLeft: D, startLeft: P } = u.value,
                S = Number.parseInt(E.style.left, 10) - D;
              (v.width = v.realWidth = S),
                _ == null || _.emit("header-dragend", v.width, P - D, v, b),
                requestAnimationFrame(() => {
                  e.store.scheduleLayout(!1, !0);
                }),
                (document.body.style.cursor = ""),
                (s.value = !1),
                (a.value = null),
                (u.value = {}),
                t("set-drag-visible", !1);
            }
            document.removeEventListener("mousemove", $),
              document.removeEventListener("mouseup", I),
              (document.onselectstart = null),
              (document.ondragstart = null),
              setTimeout(() => {
                Hr(y, "noclick");
              }, 0);
          };
        document.addEventListener("mousemove", $),
          document.addEventListener("mouseup", I);
      }
    },
    f = (b, v) => {
      var _;
      if (v.children && v.children.length > 0) return;
      const x = (_ = b.target) == null ? void 0 : _.closest("th");
      if (!(!v || !v.resizable) && !s.value && e.border) {
        const g = x.getBoundingClientRect(),
          y = document.body.style;
        g.width > 12 && g.right - b.pageX < 8
          ? ((y.cursor = "col-resize"),
            ml(x, "is-sortable") && (x.style.cursor = "col-resize"),
            (a.value = v))
          : s.value ||
            ((y.cursor = ""),
            ml(x, "is-sortable") && (x.style.cursor = "pointer"),
            (a.value = null));
      }
    },
    d = () => {
      !lt || (document.body.style.cursor = "");
    },
    h = ({ order: b, sortOrders: v }) => {
      if (b === "") return v[0];
      const _ = v.indexOf(b || null);
      return v[_ > v.length - 2 ? 0 : _ + 1];
    },
    p = (b, v, _) => {
      var x;
      b.stopPropagation();
      const g = v.order === _ ? null : _ || h(v),
        y = (x = b.target) == null ? void 0 : x.closest("th");
      if (y && ml(y, "noclick")) {
        Hr(y, "noclick");
        return;
      }
      if (!v.sortable) return;
      const w = e.store.states;
      let C = w.sortProp.value,
        E;
      const $ = w.sortingColumn.value;
      ($ !== v || ($ === v && $.order === null)) &&
        ($ && ($.order = null), (w.sortingColumn.value = v), (C = v.property)),
        g ? (E = v.order = g) : (E = v.order = null),
        (w.sortProp.value = C),
        (w.sortOrder.value = E),
        r == null || r.store.commit("changeSortCondition");
    };
  return {
    handleHeaderClick: i,
    handleHeaderContextMenu: l,
    handleMouseDown: c,
    handleMouseMove: f,
    handleMouseOut: d,
    handleSortClick: p,
    handleFilterClick: o,
  };
}
function cT(e) {
  const t = Ie(Pn),
    n = Ee("table");
  return {
    getHeaderRowStyle: (a) => {
      const s = t == null ? void 0 : t.props.headerRowStyle;
      return typeof s == "function" ? s.call(null, { rowIndex: a }) : s;
    },
    getHeaderRowClass: (a) => {
      const s = [],
        u = t == null ? void 0 : t.props.headerRowClassName;
      return (
        typeof u == "string"
          ? s.push(u)
          : typeof u == "function" && s.push(u.call(null, { rowIndex: a })),
        s.join(" ")
      );
    },
    getHeaderCellStyle: (a, s, u, c) => {
      var f;
      let d =
        (f = t == null ? void 0 : t.props.headerCellStyle) != null ? f : {};
      typeof d == "function" &&
        (d = d.call(null, { rowIndex: a, columnIndex: s, row: u, column: c }));
      const h = c.isSubColumn ? null : bc(s, c.fixed, e.store, u);
      return $o(h, "left"), $o(h, "right"), Object.assign({}, d, h);
    },
    getHeaderCellClass: (a, s, u, c) => {
      const f = c.isSubColumn ? [] : vc(n.b(), s, c.fixed, e.store, u),
        d = [c.id, c.order, c.headerAlign, c.className, c.labelClassName, ...f];
      c.children || d.push("is-leaf"), c.sortable && d.push("is-sortable");
      const h = t == null ? void 0 : t.props.headerCellClassName;
      return (
        typeof h == "string"
          ? d.push(h)
          : typeof h == "function" &&
            d.push(
              h.call(null, { rowIndex: a, columnIndex: s, row: u, column: c })
            ),
        d.push(n.e("cell")),
        d.filter((p) => Boolean(p)).join(" ")
      );
    },
  };
}
const yg = (e) => {
    const t = [];
    return (
      e.forEach((n) => {
        n.children ? (t.push(n), t.push.apply(t, yg(n.children))) : t.push(n);
      }),
      t
    );
  },
  fT = (e) => {
    let t = 1;
    const n = (i, l) => {
      if (
        (l && ((i.level = l.level + 1), t < i.level && (t = i.level)),
        i.children)
      ) {
        let a = 0;
        i.children.forEach((s) => {
          n(s, i), (a += s.colSpan);
        }),
          (i.colSpan = a);
      } else i.colSpan = 1;
    };
    e.forEach((i) => {
      (i.level = 1), n(i, void 0);
    });
    const r = [];
    for (let i = 0; i < t; i++) r.push([]);
    return (
      yg(e).forEach((i) => {
        i.children
          ? ((i.rowSpan = 1), i.children.forEach((l) => (l.isSubColumn = !0)))
          : (i.rowSpan = t - i.level + 1),
          r[i.level - 1].push(i);
      }),
      r
    );
  };
function dT(e) {
  const t = Ie(Pn),
    n = A(() => fT(e.store.states.originColumns.value));
  return {
    isGroup: A(() => {
      const i = n.value.length > 1;
      return i && t && (t.state.isGroup.value = !0), i;
    }),
    toggleAllSelection: (i) => {
      i.stopPropagation(), t == null || t.store.commit("toggleAllSelection");
    },
    columnRows: n,
  };
}
var pT = se({
  name: "ElTableHeader",
  components: { ElCheckbox: To },
  props: {
    fixed: { type: String, default: "" },
    store: { required: !0, type: Object },
    border: Boolean,
    defaultSort: { type: Object, default: () => ({ prop: "", order: "" }) },
  },
  setup(e, { emit: t }) {
    const n = et(),
      r = Ie(Pn),
      o = Ee("table"),
      i = B({}),
      { onColumnsChange: l, onScrollableChange: a } = bg(r);
    rt(async () => {
      await Le(), await Le();
      const { prop: C, order: E } = e.defaultSort;
      r == null || r.store.commit("sort", { prop: C, order: E, init: !0 });
    });
    const {
        handleHeaderClick: s,
        handleHeaderContextMenu: u,
        handleMouseDown: c,
        handleMouseMove: f,
        handleMouseOut: d,
        handleSortClick: h,
        handleFilterClick: p,
      } = uT(e, t),
      {
        getHeaderRowStyle: b,
        getHeaderRowClass: v,
        getHeaderCellStyle: _,
        getHeaderCellClass: x,
      } = cT(e),
      { isGroup: g, toggleAllSelection: y, columnRows: w } = dT(e);
    return (
      (n.state = { onColumnsChange: l, onScrollableChange: a }),
      (n.filterPanels = i),
      {
        ns: o,
        filterPanels: i,
        onColumnsChange: l,
        onScrollableChange: a,
        columnRows: w,
        getHeaderRowClass: v,
        getHeaderRowStyle: b,
        getHeaderCellClass: x,
        getHeaderCellStyle: _,
        handleHeaderClick: s,
        handleHeaderContextMenu: u,
        handleMouseDown: c,
        handleMouseMove: f,
        handleMouseOut: d,
        handleSortClick: h,
        handleFilterClick: p,
        isGroup: g,
        toggleAllSelection: y,
      }
    );
  },
  render() {
    const {
      ns: e,
      isGroup: t,
      columnRows: n,
      getHeaderCellStyle: r,
      getHeaderCellClass: o,
      getHeaderRowClass: i,
      getHeaderRowStyle: l,
      handleHeaderClick: a,
      handleHeaderContextMenu: s,
      handleMouseDown: u,
      handleMouseMove: c,
      handleSortClick: f,
      handleMouseOut: d,
      store: h,
      $parent: p,
    } = this;
    let b = 1;
    return Ne(
      "thead",
      { class: { [e.is("group")]: t } },
      n.map((v, _) =>
        Ne(
          "tr",
          { class: i(_), key: _, style: l(_) },
          v.map(
            (x, g) => (
              x.rowSpan > b && (b = x.rowSpan),
              Ne(
                "th",
                {
                  class: o(_, g, v, x),
                  colspan: x.colSpan,
                  key: `${x.id}-thead`,
                  rowspan: x.rowSpan,
                  style: r(_, g, v, x),
                  onClick: (y) => a(y, x),
                  onContextmenu: (y) => s(y, x),
                  onMousedown: (y) => u(y, x),
                  onMousemove: (y) => c(y, x),
                  onMouseout: d,
                },
                [
                  Ne(
                    "div",
                    {
                      class: [
                        "cell",
                        x.filteredValue && x.filteredValue.length > 0
                          ? "highlight"
                          : "",
                      ],
                    },
                    [
                      x.renderHeader
                        ? x.renderHeader({
                            column: x,
                            $index: g,
                            store: h,
                            _self: p,
                          })
                        : x.label,
                      x.sortable &&
                        Ne(
                          "span",
                          { onClick: (y) => f(y, x), class: "caret-wrapper" },
                          [
                            Ne("i", {
                              onClick: (y) => f(y, x, "ascending"),
                              class: "sort-caret ascending",
                            }),
                            Ne("i", {
                              onClick: (y) => f(y, x, "descending"),
                              class: "sort-caret descending",
                            }),
                          ]
                        ),
                      x.filterable &&
                        Ne(sT, {
                          store: h,
                          placement: x.filterPlacement || "bottom-start",
                          column: x,
                          upDataColumn: (y, w) => {
                            x[y] = w;
                          },
                        }),
                    ]
                  ),
                ]
              )
            )
          )
        )
      )
    );
  },
});
function hT(e) {
  const t = Ie(Pn),
    n = B(""),
    r = B(Ne("div")),
    o = (d, h, p) => {
      var b;
      const v = t,
        _ = Ua(d);
      let x;
      const g =
        (b = v == null ? void 0 : v.vnode.el) == null
          ? void 0
          : b.dataset.prefix;
      _ &&
        ((x = Wd({ columns: e.store.states.columns.value }, _, g)),
        x && (v == null || v.emit(`cell-${p}`, h, x, _, d))),
        v == null || v.emit(`row-${p}`, h, x, d);
    },
    i = (d, h) => {
      o(d, h, "dblclick");
    },
    l = (d, h) => {
      e.store.commit("setCurrentRow", h), o(d, h, "click");
    },
    a = (d, h) => {
      o(d, h, "contextmenu");
    },
    s = Mn((d) => {
      e.store.commit("setHoverRow", d);
    }, 30),
    u = Mn(() => {
      e.store.commit("setHoverRow", null);
    }, 30);
  return {
    handleDoubleClick: i,
    handleClick: l,
    handleContextMenu: a,
    handleMouseEnter: s,
    handleMouseLeave: u,
    handleCellMouseEnter: (d, h, p) => {
      var b;
      const v = t,
        _ = Ua(d),
        x =
          (b = v == null ? void 0 : v.vnode.el) == null
            ? void 0
            : b.dataset.prefix;
      if (_) {
        const E = Wd({ columns: e.store.states.columns.value }, _, x),
          $ = (v.hoverState = { cell: _, column: E, row: h });
        v == null || v.emit("cell-mouse-enter", $.row, $.column, $.cell, d);
      }
      const g = d.target.querySelector(".cell");
      if (!(ml(g, `${x}-tooltip`) && g.childNodes.length)) return;
      const y = document.createRange();
      y.setStart(g, 0), y.setEnd(g, g.childNodes.length);
      const w = y.getBoundingClientRect().width,
        C =
          (Number.parseInt($r(g, "paddingLeft"), 10) || 0) +
          (Number.parseInt($r(g, "paddingRight"), 10) || 0);
      (w + C > g.offsetWidth || g.scrollWidth > g.offsetWidth) &&
        q5(
          t == null ? void 0 : t.refs.tableWrapper,
          _,
          _.innerText || _.textContent,
          { placement: "top", strategy: "fixed" },
          p
        );
    },
    handleCellMouseLeave: (d) => {
      if (!Ua(d)) return;
      const p = t == null ? void 0 : t.hoverState;
      t == null ||
        t.emit(
          "cell-mouse-leave",
          p == null ? void 0 : p.row,
          p == null ? void 0 : p.column,
          p == null ? void 0 : p.cell,
          d
        );
    },
    tooltipContent: n,
    tooltipTrigger: r,
  };
}
function mT(e) {
  const t = Ie(Pn),
    n = Ee("table");
  return {
    getRowStyle: (u, c) => {
      const f = t == null ? void 0 : t.props.rowStyle;
      return typeof f == "function"
        ? f.call(null, { row: u, rowIndex: c })
        : f || null;
    },
    getRowClass: (u, c) => {
      const f = [n.e("row")];
      (t == null ? void 0 : t.props.highlightCurrentRow) &&
        u === e.store.states.currentRow.value &&
        f.push("current-row"),
        e.stripe && c % 2 === 1 && f.push(n.em("row", "striped"));
      const d = t == null ? void 0 : t.props.rowClassName;
      return (
        typeof d == "string"
          ? f.push(d)
          : typeof d == "function" &&
            f.push(d.call(null, { row: u, rowIndex: c })),
        f
      );
    },
    getCellStyle: (u, c, f, d) => {
      const h = t == null ? void 0 : t.props.cellStyle;
      let p = h != null ? h : {};
      typeof h == "function" &&
        (p = h.call(null, { rowIndex: u, columnIndex: c, row: f, column: d }));
      const b = d.isSubColumn
        ? null
        : bc(c, e == null ? void 0 : e.fixed, e.store);
      return $o(b, "left"), $o(b, "right"), Object.assign({}, p, b);
    },
    getCellClass: (u, c, f, d, h) => {
      const p = d.isSubColumn
          ? []
          : vc(n.b(), c, e == null ? void 0 : e.fixed, e.store, void 0, h),
        b = [d.id, d.align, d.className, ...p],
        v = t == null ? void 0 : t.props.cellClassName;
      return (
        typeof v == "string"
          ? b.push(v)
          : typeof v == "function" &&
            b.push(
              v.call(null, { rowIndex: u, columnIndex: c, row: f, column: d })
            ),
        b.push(n.e("cell")),
        b.filter((_) => Boolean(_)).join(" ")
      );
    },
    getSpan: (u, c, f, d) => {
      let h = 1,
        p = 1;
      const b = t == null ? void 0 : t.props.spanMethod;
      if (typeof b == "function") {
        const v = b({ row: u, column: c, rowIndex: f, columnIndex: d });
        Array.isArray(v)
          ? ((h = v[0]), (p = v[1]))
          : typeof v == "object" && ((h = v.rowspan), (p = v.colspan));
      }
      return { rowspan: h, colspan: p };
    },
    getColspanRealWidth: (u, c, f) => {
      if (c < 1) return u[f].realWidth;
      const d = u.map(({ realWidth: h, width: p }) => h || p).slice(f, f + c);
      return Number(d.reduce((h, p) => Number(h) + Number(p), -1));
    },
  };
}
function gT(e) {
  const t = Ie(Pn),
    n = Ee("table"),
    {
      handleDoubleClick: r,
      handleClick: o,
      handleContextMenu: i,
      handleMouseEnter: l,
      handleMouseLeave: a,
      handleCellMouseEnter: s,
      handleCellMouseLeave: u,
      tooltipContent: c,
      tooltipTrigger: f,
    } = hT(e),
    {
      getRowStyle: d,
      getRowClass: h,
      getCellStyle: p,
      getCellClass: b,
      getSpan: v,
      getColspanRealWidth: _,
    } = mT(e),
    x = A(() =>
      e.store.states.columns.value.findIndex(({ type: E }) => E === "default")
    ),
    g = (E, $) => {
      const I = t.props.rowKey;
      return I ? ht(E, I) : $;
    },
    y = (E, $, I, D = !1) => {
      const { tooltipEffect: P, store: O } = e,
        { indent: S, columns: N } = O.states,
        X = h(E, $);
      let K = !0;
      return (
        I && (X.push(n.em("row", `level-${I.level}`)), (K = I.display)),
        Ne(
          "tr",
          {
            style: [K ? null : { display: "none" }, d(E, $)],
            class: X,
            key: g(E, $),
            onDblclick: (V) => r(V, E),
            onClick: (V) => o(V, E),
            onContextmenu: (V) => i(V, E),
            onMouseenter: () => l($),
            onMouseleave: a,
          },
          N.value.map((V, R) => {
            const { rowspan: ne, colspan: ie } = v(E, V, $, R);
            if (!ne || !ie) return null;
            const J = { ...V };
            J.realWidth = _(N.value, ie, R);
            const ve = {
              store: e.store,
              _self: e.context || t,
              column: J,
              row: E,
              $index: $,
              cellIndex: R,
              expanded: D,
            };
            R === x.value &&
              I &&
              ((ve.treeNode = { indent: I.level * S.value, level: I.level }),
              typeof I.expanded == "boolean" &&
                ((ve.treeNode.expanded = I.expanded),
                "loading" in I && (ve.treeNode.loading = I.loading),
                "noLazyChildren" in I &&
                  (ve.treeNode.noLazyChildren = I.noLazyChildren)));
            const $e = `${$},${R}`,
              Ce = J.columnKey || J.rawColumnKey || "",
              ue = w(R, V, ve);
            return Ne(
              "td",
              {
                style: p($, R, E, V),
                class: b($, R, E, V, ie - 1),
                key: `${Ce}${$e}`,
                rowspan: ne,
                colspan: ie,
                onMouseenter: (Q) => s(Q, E, P),
                onMouseleave: u,
              },
              [ue]
            );
          })
        )
      );
    },
    w = (E, $, I) => $.renderCell(I);
  return {
    wrappedRowRender: (E, $) => {
      const I = e.store,
        { isRowExpanded: D, assertRowKey: P } = I,
        {
          treeData: O,
          lazyTreeNodeMap: S,
          childrenColumnName: N,
          rowKey: X,
        } = I.states,
        K = I.states.columns.value;
      if (K.some(({ type: V }) => V === "expand")) {
        const V = D(E),
          R = y(E, $, void 0, V),
          ne = t.renderExpanded;
        return V
          ? ne
            ? [
                [
                  R,
                  Ne("tr", { key: `expanded-row__${R.key}` }, [
                    Ne(
                      "td",
                      {
                        colspan: K.length,
                        class: `${n.e("cell")} ${n.e("expanded-cell")}`,
                      },
                      [ne({ row: E, $index: $, store: I, expanded: V })]
                    ),
                  ]),
                ],
              ]
            : (console.error("[Element Error]renderExpanded is required."), R)
          : [[R]];
      } else if (Object.keys(O.value).length) {
        P();
        const V = ht(E, X.value);
        let R = O.value[V],
          ne = null;
        R &&
          ((ne = { expanded: R.expanded, level: R.level, display: !0 }),
          typeof R.lazy == "boolean" &&
            (typeof R.loaded == "boolean" &&
              R.loaded &&
              (ne.noLazyChildren = !(R.children && R.children.length)),
            (ne.loading = R.loading)));
        const ie = [y(E, $, ne)];
        if (R) {
          let J = 0;
          const ve = (Ce, ue) => {
            !(Ce && Ce.length && ue) ||
              Ce.forEach((Q) => {
                const ce = {
                    display: ue.display && ue.expanded,
                    level: ue.level + 1,
                    expanded: !1,
                    noLazyChildren: !1,
                    loading: !1,
                  },
                  Me = ht(Q, X.value);
                if (Me == null)
                  throw new Error("For nested data item, row-key is required.");
                if (
                  ((R = { ...O.value[Me] }),
                  R &&
                    ((ce.expanded = R.expanded),
                    (R.level = R.level || ce.level),
                    (R.display = !!(R.expanded && ce.display)),
                    typeof R.lazy == "boolean" &&
                      (typeof R.loaded == "boolean" &&
                        R.loaded &&
                        (ce.noLazyChildren = !(
                          R.children && R.children.length
                        )),
                      (ce.loading = R.loading))),
                  J++,
                  ie.push(y(Q, $ + J, ce)),
                  R)
                ) {
                  const _e = S.value[Me] || Q[N.value];
                  ve(_e, R);
                }
              });
          };
          R.display = !0;
          const $e = S.value[V] || E[N.value];
          ve($e, R);
        }
        return ie;
      } else return y(E, $, void 0);
    },
    tooltipContent: c,
    tooltipTrigger: f,
  };
}
const vT = {
  store: { required: !0, type: Object },
  stripe: Boolean,
  tooltipEffect: String,
  context: { default: () => ({}), type: Object },
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  fixed: { type: String, default: "" },
  highlight: Boolean,
};
var bT = se({
  name: "ElTableBody",
  props: vT,
  setup(e) {
    const t = et(),
      n = Ie(Pn),
      r = Ee("table"),
      { wrappedRowRender: o, tooltipContent: i, tooltipTrigger: l } = gT(e),
      { onColumnsChange: a, onScrollableChange: s } = bg(n);
    return (
      me(e.store.states.hoverRow, (u, c) => {
        if (!e.store.states.isComplex.value || !lt) return;
        let f = window.requestAnimationFrame;
        f || (f = (d) => window.setTimeout(d, 16)),
          f(() => {
            const d = t == null ? void 0 : t.vnode.el,
              h = Array.from((d == null ? void 0 : d.children) || []).filter(
                (v) =>
                  v == null ? void 0 : v.classList.contains(`${r.e("row")}`)
              ),
              p = h[c],
              b = h[u];
            p && Hr(p, "hover-row"), b && Hl(b, "hover-row");
          });
      }),
      $i(() => {
        var u;
        (u = Rn) == null || u();
      }),
      {
        ns: r,
        onColumnsChange: a,
        onScrollableChange: s,
        wrappedRowRender: o,
        tooltipContent: i,
        tooltipTrigger: l,
      }
    );
  },
  render() {
    const { wrappedRowRender: e, store: t } = this,
      n = t.states.data.value || [];
    return Ne("tbody", {}, [n.reduce((r, o) => r.concat(e(o, r.length)), [])]);
  },
});
function yc(e) {
  const t = e.tableLayout === "auto";
  let n = e.columns || [];
  t && n.every((o) => o.width === void 0) && (n = []);
  const r = (o) => {
    const i = { key: `${e.tableLayout}_${o.id}`, style: {}, name: void 0 };
    return t ? (i.style = { width: `${o.width}px` }) : (i.name = o.id), i;
  };
  return Ne(
    "colgroup",
    {},
    n.map((o) => Ne("col", r(o)))
  );
}
yc.props = ["columns", "tableLayout"];
function yT() {
  const e = Ie(Pn),
    t = e == null ? void 0 : e.store,
    n = A(() => t.states.fixedLeafColumnsLength.value),
    r = A(() => t.states.rightFixedColumns.value.length),
    o = A(() => t.states.columns.value.length),
    i = A(() => t.states.fixedColumns.value.length),
    l = A(() => t.states.rightFixedColumns.value.length);
  return {
    leftFixedLeafCount: n,
    rightFixedLeafCount: r,
    columnsCount: o,
    leftFixedCount: i,
    rightFixedCount: l,
    columns: t.states.columns,
  };
}
function wT(e) {
  const { columns: t } = yT(),
    n = Ee("table");
  return {
    getCellClasses: (i, l) => {
      const a = i[l],
        s = [
          n.e("cell"),
          a.id,
          a.align,
          a.labelClassName,
          ...vc(n.b(), l, a.fixed, e.store),
        ];
      return (
        a.className && s.push(a.className),
        a.children || s.push(n.is("leaf")),
        s
      );
    },
    getCellStyles: (i, l) => {
      const a = bc(l, i.fixed, e.store);
      return $o(a, "left"), $o(a, "right"), a;
    },
    columns: t,
  };
}
var _T = se({
  name: "ElTableFooter",
  props: {
    fixed: { type: String, default: "" },
    store: { required: !0, type: Object },
    summaryMethod: Function,
    sumText: String,
    border: Boolean,
    defaultSort: { type: Object, default: () => ({ prop: "", order: "" }) },
  },
  setup(e) {
    const { getCellClasses: t, getCellStyles: n, columns: r } = wT(e);
    return { ns: Ee("table"), getCellClasses: t, getCellStyles: n, columns: r };
  },
  render() {
    const {
        columns: e,
        getCellStyles: t,
        getCellClasses: n,
        summaryMethod: r,
        sumText: o,
        ns: i,
      } = this,
      l = this.store.states.data.value;
    let a = [];
    return (
      r
        ? (a = r({ columns: e, data: l }))
        : e.forEach((s, u) => {
            if (u === 0) {
              a[u] = o;
              return;
            }
            const c = l.map((p) => Number(p[s.property])),
              f = [];
            let d = !0;
            c.forEach((p) => {
              if (!Number.isNaN(+p)) {
                d = !1;
                const b = `${p}`.split(".")[1];
                f.push(b ? b.length : 0);
              }
            });
            const h = Math.max.apply(null, f);
            d
              ? (a[u] = "")
              : (a[u] = c.reduce((p, b) => {
                  const v = Number(b);
                  return Number.isNaN(+v)
                    ? p
                    : Number.parseFloat((p + b).toFixed(Math.min(h, 20)));
                }, 0));
          }),
      Ne(
        "table",
        {
          class: i.e("footer"),
          cellspacing: "0",
          cellpadding: "0",
          border: "0",
        },
        [
          yc({ columns: e }),
          Ne("tbody", [
            Ne("tr", {}, [
              ...e.map((s, u) =>
                Ne(
                  "td",
                  {
                    key: u,
                    colspan: s.colSpan,
                    rowspan: s.rowSpan,
                    class: n(e, u),
                    style: t(s, u),
                  },
                  [Ne("div", { class: ["cell", s.labelClassName] }, [a[u]])]
                )
              ),
            ]),
          ]),
        ]
      )
    );
  },
});
function xT(e) {
  return {
    setCurrentRow: (c) => {
      e.commit("setCurrentRow", c);
    },
    getSelectionRows: () => e.getSelectionRows(),
    toggleRowSelection: (c, f) => {
      e.toggleRowSelection(c, f, !1), e.updateAllSelected();
    },
    clearSelection: () => {
      e.clearSelection();
    },
    clearFilter: (c) => {
      e.clearFilter(c);
    },
    toggleAllSelection: () => {
      e.commit("toggleAllSelection");
    },
    toggleRowExpansion: (c, f) => {
      e.toggleRowExpansionAdapter(c, f);
    },
    clearSort: () => {
      e.clearSort();
    },
    sort: (c, f) => {
      e.commit("sort", { prop: c, order: f });
    },
  };
}
function CT(e, t, n, r) {
  const o = B(!1),
    i = B(null),
    l = B(!1),
    a = (V) => {
      l.value = V;
    },
    s = B({ width: null, height: null, headerHeight: null }),
    u = B(!1),
    c = { display: "inline-block", verticalAlign: "middle" },
    f = B(),
    d = B(0),
    h = B(0),
    p = B(0),
    b = B(0);
  Xo(() => {
    t.setHeight(e.height);
  }),
    Xo(() => {
      t.setMaxHeight(e.maxHeight);
    }),
    me(
      () => [e.currentRowKey, n.states.rowKey],
      ([V, R]) => {
        !m(R) || !m(V) || n.setCurrentRowKey(`${V}`);
      },
      { immediate: !0 }
    ),
    me(
      () => e.data,
      (V) => {
        r.store.commit("setData", V);
      },
      { immediate: !0, deep: !0 }
    ),
    Xo(() => {
      e.expandRowKeys && n.setExpandRowKeysAdapter(e.expandRowKeys);
    });
  const v = () => {
      r.store.commit("setHoverRow", null),
        r.hoverState && (r.hoverState = null);
    },
    _ = (V, R) => {
      const { pixelX: ne, pixelY: ie } = R;
      Math.abs(ne) >= Math.abs(ie) &&
        (r.refs.bodyWrapper.scrollLeft += R.pixelX / 5);
    },
    x = A(
      () =>
        e.height ||
        e.maxHeight ||
        n.states.fixedColumns.value.length > 0 ||
        n.states.rightFixedColumns.value.length > 0
    ),
    g = A(() => ({ width: t.bodyWidth.value ? `${t.bodyWidth.value}px` : "" })),
    y = () => {
      x.value && t.updateElsHeight(),
        t.updateColumnsWidth(),
        requestAnimationFrame($);
    };
  rt(async () => {
    await Le(), n.updateColumns(), I(), requestAnimationFrame(y);
    const V = r.vnode.el,
      R = r.refs.headerWrapper;
    e.flexible &&
      V &&
      V.parentElement &&
      (V.parentElement.style.minWidth = "0"),
      (s.value = {
        width: (f.value = V.offsetWidth),
        height: V.offsetHeight,
        headerHeight: e.showHeader && R ? R.offsetHeight : null,
      }),
      n.states.columns.value.forEach((ne) => {
        ne.filteredValue &&
          ne.filteredValue.length &&
          r.store.commit("filterChange", {
            column: ne,
            values: ne.filteredValue,
            silent: !0,
          });
      }),
      (r.$ready = !0);
  });
  const w = (V, R) => {
      if (!V) return;
      const ne = Array.from(V.classList).filter(
        (ie) => !ie.startsWith("is-scrolling-")
      );
      ne.push(t.scrollX.value ? R : "is-scrolling-none"),
        (V.className = ne.join(" "));
    },
    C = (V) => {
      const { tableWrapper: R } = r.refs;
      w(R, V);
    },
    E = (V) => {
      const { tableWrapper: R } = r.refs;
      return !!(R && R.classList.contains(V));
    },
    $ = function () {
      if (!r.refs.scrollBarRef) return;
      if (!t.scrollX.value) {
        const Ce = "is-scrolling-none";
        E(Ce) || C(Ce);
        return;
      }
      const V = r.refs.scrollBarRef.wrap$;
      if (!V) return;
      const { scrollLeft: R, offsetWidth: ne, scrollWidth: ie } = V,
        { headerWrapper: J, footerWrapper: ve } = r.refs;
      J && (J.scrollLeft = R), ve && (ve.scrollLeft = R);
      const $e = ie - ne - 1;
      R >= $e
        ? C("is-scrolling-right")
        : C(R === 0 ? "is-scrolling-left" : "is-scrolling-middle");
    },
    I = () => {
      !r.refs.scrollBarRef ||
        (r.refs.scrollBarRef.wrap$ &&
          _n(r.refs.scrollBarRef.wrap$, "scroll", $, { passive: !0 }),
        e.fit ? Dr(r.vnode.el, D) : _n(window, "resize", D),
        Dr(r.refs.bodyWrapper, () => {
          var V, R;
          D(),
            (R = (V = r.refs) == null ? void 0 : V.scrollBarRef) == null ||
              R.update();
        }));
    },
    D = () => {
      var V, R, ne;
      const ie = r.vnode.el;
      if (!r.$ready || !ie) return;
      let J = !1;
      const { width: ve, height: $e, headerHeight: Ce } = s.value,
        ue = (f.value = ie.offsetWidth);
      ve !== ue && (J = !0);
      const Q = ie.offsetHeight;
      (e.height || x.value) && $e !== Q && (J = !0);
      const ce =
        e.tableLayout === "fixed"
          ? r.refs.headerWrapper
          : (V = r.refs.tableHeaderRef) == null
          ? void 0
          : V.$el;
      e.showHeader &&
        (ce == null ? void 0 : ce.offsetHeight) !== Ce &&
        (J = !0),
        (d.value =
          ((R = r.refs.tableWrapper) == null ? void 0 : R.scrollHeight) || 0),
        (p.value = (ce == null ? void 0 : ce.scrollHeight) || 0),
        (b.value =
          ((ne = r.refs.footerWrapper) == null ? void 0 : ne.offsetHeight) ||
          0),
        (h.value = d.value - p.value - b.value),
        J &&
          ((s.value = {
            width: ue,
            height: Q,
            headerHeight:
              (e.showHeader && (ce == null ? void 0 : ce.offsetHeight)) || 0,
          }),
          y());
    },
    P = jt(),
    O = A(() => {
      const { bodyWidth: V, scrollY: R, gutterWidth: ne } = t;
      return V.value ? `${V.value - (R.value ? ne : 0)}px` : "";
    }),
    S = A(() => (e.maxHeight ? "fixed" : e.tableLayout)),
    N = A(() => {
      if (e.data && e.data.length) return null;
      let V = "100%";
      e.height && h.value && (V = `${h.value}px`);
      const R = f.value;
      return { width: R ? `${R}px` : "", height: V };
    }),
    X = A(() =>
      e.height
        ? {
            height: Number.isNaN(Number(e.height)) ? e.height : `${e.height}px`,
          }
        : e.maxHeight
        ? {
            maxHeight: Number.isNaN(Number(e.maxHeight))
              ? e.maxHeight
              : `${e.maxHeight}px`,
          }
        : {}
    ),
    K = A(() => {
      if (e.height) return { height: "100%" };
      if (e.maxHeight) {
        if (Number.isNaN(Number(e.maxHeight)))
          return { maxHeight: `calc(${e.maxHeight} - ${p.value + b.value}px)` };
        {
          const V = e.maxHeight;
          if (d.value >= Number(V))
            return { maxHeight: `${d.value - p.value - b.value}px` };
        }
      }
      return {};
    });
  return {
    isHidden: o,
    renderExpanded: i,
    setDragVisible: a,
    isGroup: u,
    handleMouseLeave: v,
    handleHeaderFooterMousewheel: _,
    tableSize: P,
    emptyBlockStyle: N,
    handleFixedMousewheel: (V, R) => {
      const ne = r.refs.bodyWrapper;
      if (Math.abs(R.spinY) > 0) {
        const ie = ne.scrollTop;
        R.pixelY < 0 && ie !== 0 && V.preventDefault(),
          R.pixelY > 0 &&
            ne.scrollHeight - ne.clientHeight > ie &&
            V.preventDefault(),
          (ne.scrollTop += Math.ceil(R.pixelY / 5));
      } else ne.scrollLeft += Math.ceil(R.pixelX / 5);
    },
    resizeProxyVisible: l,
    bodyWidth: O,
    resizeState: s,
    doLayout: y,
    tableBodyStyles: g,
    tableLayout: S,
    scrollbarViewStyle: c,
    tableInnerStyle: X,
    scrollbarStyle: K,
  };
}
var ST = {
  data: { type: Array, default: () => [] },
  size: String,
  width: [String, Number],
  height: [String, Number],
  maxHeight: [String, Number],
  fit: { type: Boolean, default: !0 },
  stripe: Boolean,
  border: Boolean,
  rowKey: [String, Function],
  showHeader: { type: Boolean, default: !0 },
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  cellClassName: [String, Function],
  cellStyle: [Object, Function],
  headerRowClassName: [String, Function],
  headerRowStyle: [Object, Function],
  headerCellClassName: [String, Function],
  headerCellStyle: [Object, Function],
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  emptyText: String,
  expandRowKeys: Array,
  defaultExpandAll: Boolean,
  defaultSort: Object,
  tooltipEffect: String,
  spanMethod: Function,
  selectOnIndeterminate: { type: Boolean, default: !0 },
  indent: { type: Number, default: 16 },
  treeProps: {
    type: Object,
    default: () => ({ hasChildren: "hasChildren", children: "children" }),
  },
  lazy: Boolean,
  load: Function,
  style: { type: Object, default: () => ({}) },
  className: { type: String, default: "" },
  tableLayout: { type: String, default: "fixed" },
  scrollbarAlwaysOn: { type: Boolean, default: !1 },
  flexible: Boolean,
};
const ET = () => {
  const e = B(),
    t = (i, l) => {
      const a = e.value;
      a && a.scrollTo(i, l);
    },
    n = (i, l) => {
      const a = e.value;
      a && Ye(l) && ["Top", "Left"].includes(i) && a[`setScroll${i}`](l);
    };
  return {
    scrollBarRef: e,
    scrollTo: t,
    setScrollTop: (i) => n("Top", i),
    setScrollLeft: (i) => n("Left", i),
  };
};
let TT = 1;
const $T = se({
    name: "ElTable",
    directives: { Mousewheel: x3 },
    components: {
      TableHeader: pT,
      TableBody: bT,
      TableFooter: _T,
      ElScrollbar: nc,
      hColgroup: yc,
    },
    props: ST,
    emits: [
      "select",
      "select-all",
      "selection-change",
      "cell-mouse-enter",
      "cell-mouse-leave",
      "cell-contextmenu",
      "cell-click",
      "cell-dblclick",
      "row-click",
      "row-contextmenu",
      "row-dblclick",
      "header-click",
      "header-contextmenu",
      "sort-change",
      "filter-change",
      "current-change",
      "header-dragend",
      "expand-change",
    ],
    setup(e) {
      const { t } = Jr(),
        n = Ee("table"),
        r = et();
      dt(Pn, r);
      const o = Q5(r, e);
      r.store = o;
      const i = new tT({
        store: r.store,
        table: r,
        fit: e.fit,
        showHeader: e.showHeader,
      });
      r.layout = i;
      const l = A(() => (o.states.data.value || []).length === 0),
        {
          setCurrentRow: a,
          getSelectionRows: s,
          toggleRowSelection: u,
          clearSelection: c,
          clearFilter: f,
          toggleAllSelection: d,
          toggleRowExpansion: h,
          clearSort: p,
          sort: b,
        } = xT(o),
        {
          isHidden: v,
          renderExpanded: _,
          setDragVisible: x,
          isGroup: g,
          handleMouseLeave: y,
          handleHeaderFooterMousewheel: w,
          tableSize: C,
          emptyBlockStyle: E,
          handleFixedMousewheel: $,
          resizeProxyVisible: I,
          bodyWidth: D,
          resizeState: P,
          doLayout: O,
          tableBodyStyles: S,
          tableLayout: N,
          scrollbarViewStyle: X,
          tableInnerStyle: K,
          scrollbarStyle: q,
        } = CT(e, i, o, r),
        {
          scrollBarRef: V,
          scrollTo: R,
          setScrollLeft: ne,
          setScrollTop: ie,
        } = ET(),
        J = Mn(O, 50),
        ve = `${n.namespace.value}-table_${TT++}`;
      (r.tableId = ve),
        (r.state = {
          isGroup: g,
          resizeState: P,
          doLayout: O,
          debouncedUpdateLayout: J,
        });
      const $e = A(() => e.sumText || t("el.table.sumText")),
        Ce = A(() => e.emptyText || t("el.table.emptyText"));
      return {
        ns: n,
        layout: i,
        store: o,
        handleHeaderFooterMousewheel: w,
        handleMouseLeave: y,
        tableId: ve,
        tableSize: C,
        isHidden: v,
        isEmpty: l,
        renderExpanded: _,
        resizeProxyVisible: I,
        resizeState: P,
        isGroup: g,
        bodyWidth: D,
        tableBodyStyles: S,
        emptyBlockStyle: E,
        debouncedUpdateLayout: J,
        handleFixedMousewheel: $,
        setCurrentRow: a,
        getSelectionRows: s,
        toggleRowSelection: u,
        clearSelection: c,
        clearFilter: f,
        toggleAllSelection: d,
        toggleRowExpansion: h,
        clearSort: p,
        doLayout: O,
        sort: b,
        t,
        setDragVisible: x,
        context: r,
        computedSumText: $e,
        computedEmptyText: Ce,
        tableLayout: N,
        scrollbarViewStyle: X,
        tableInnerStyle: K,
        scrollbarStyle: q,
        scrollBarRef: V,
        scrollTo: R,
        setScrollLeft: ne,
        setScrollTop: ie,
      };
    },
  }),
  MT = ["data-prefix"],
  AT = { ref: "hiddenColumns", class: "hidden-columns" };
function kT(e, t, n, r, o, i) {
  const l = ut("hColgroup"),
    a = ut("table-header"),
    s = ut("table-body"),
    u = ut("el-scrollbar"),
    c = ut("table-footer"),
    f = Tu("mousewheel");
  return (
    L(),
    te(
      "div",
      {
        ref: "tableWrapper",
        class: W([
          {
            [e.ns.m("fit")]: e.fit,
            [e.ns.m("striped")]: e.stripe,
            [e.ns.m("border")]: e.border || e.isGroup,
            [e.ns.m("hidden")]: e.isHidden,
            [e.ns.m("group")]: e.isGroup,
            [e.ns.m("fluid-height")]: e.maxHeight,
            [e.ns.m("scrollable-x")]: e.layout.scrollX.value,
            [e.ns.m("scrollable-y")]: e.layout.scrollY.value,
            [e.ns.m("enable-row-hover")]: !e.store.states.isComplex.value,
            [e.ns.m("enable-row-transition")]:
              (e.store.states.data.value || []).length !== 0 &&
              (e.store.states.data.value || []).length < 100,
            "has-footer": e.showSummary,
          },
          e.ns.m(e.tableSize),
          e.className,
          e.ns.b(),
          e.ns.m(`layout-${e.tableLayout}`),
        ]),
        style: He(e.style),
        "data-prefix": e.ns.namespace.value,
        onMouseleave: t[0] || (t[0] = (d) => e.handleMouseLeave()),
      },
      [
        ae(
          "div",
          { class: W(e.ns.e("inner-wrapper")), style: He(e.tableInnerStyle) },
          [
            ae("div", AT, [Oe(e.$slots, "default")], 512),
            e.showHeader && e.tableLayout === "fixed"
              ? ot(
                  (L(),
                  te(
                    "div",
                    {
                      key: 0,
                      ref: "headerWrapper",
                      class: W(e.ns.e("header-wrapper")),
                    },
                    [
                      ae(
                        "table",
                        {
                          ref: "tableHeader",
                          class: W(e.ns.e("header")),
                          style: He(e.tableBodyStyles),
                          border: "0",
                          cellpadding: "0",
                          cellspacing: "0",
                        },
                        [
                          oe(
                            l,
                            {
                              columns: e.store.states.columns.value,
                              "table-layout": e.tableLayout,
                            },
                            null,
                            8,
                            ["columns", "table-layout"]
                          ),
                          oe(
                            a,
                            {
                              ref: "tableHeaderRef",
                              border: e.border,
                              "default-sort": e.defaultSort,
                              store: e.store,
                              onSetDragVisible: e.setDragVisible,
                            },
                            null,
                            8,
                            [
                              "border",
                              "default-sort",
                              "store",
                              "onSetDragVisible",
                            ]
                          ),
                        ],
                        6
                      ),
                    ],
                    2
                  )),
                  [[f, e.handleHeaderFooterMousewheel]]
                )
              : ge("v-if", !0),
            ae(
              "div",
              { ref: "bodyWrapper", class: W(e.ns.e("body-wrapper")) },
              [
                oe(
                  u,
                  {
                    ref: "scrollBarRef",
                    "view-style": e.scrollbarViewStyle,
                    "wrap-style": e.scrollbarStyle,
                    always: e.scrollbarAlwaysOn,
                  },
                  {
                    default: re(() => [
                      ae(
                        "table",
                        {
                          ref: "tableBody",
                          class: W(e.ns.e("body")),
                          cellspacing: "0",
                          cellpadding: "0",
                          border: "0",
                          style: He({
                            width: e.bodyWidth,
                            tableLayout: e.tableLayout,
                          }),
                        },
                        [
                          oe(
                            l,
                            {
                              columns: e.store.states.columns.value,
                              "table-layout": e.tableLayout,
                            },
                            null,
                            8,
                            ["columns", "table-layout"]
                          ),
                          e.showHeader && e.tableLayout === "auto"
                            ? (L(),
                              he(
                                a,
                                {
                                  key: 0,
                                  ref: "tableHeaderRef",
                                  border: e.border,
                                  "default-sort": e.defaultSort,
                                  store: e.store,
                                  onSetDragVisible: e.setDragVisible,
                                },
                                null,
                                8,
                                [
                                  "border",
                                  "default-sort",
                                  "store",
                                  "onSetDragVisible",
                                ]
                              ))
                            : ge("v-if", !0),
                          oe(
                            s,
                            {
                              context: e.context,
                              highlight: e.highlightCurrentRow,
                              "row-class-name": e.rowClassName,
                              "tooltip-effect": e.tooltipEffect,
                              "row-style": e.rowStyle,
                              store: e.store,
                              stripe: e.stripe,
                            },
                            null,
                            8,
                            [
                              "context",
                              "highlight",
                              "row-class-name",
                              "tooltip-effect",
                              "row-style",
                              "store",
                              "stripe",
                            ]
                          ),
                        ],
                        6
                      ),
                      e.isEmpty
                        ? (L(),
                          te(
                            "div",
                            {
                              key: 0,
                              ref: "emptyBlock",
                              style: He(e.emptyBlockStyle),
                              class: W(e.ns.e("empty-block")),
                            },
                            [
                              ae(
                                "span",
                                { class: W(e.ns.e("empty-text")) },
                                [
                                  Oe(e.$slots, "empty", {}, () => [
                                    It(Je(e.computedEmptyText), 1),
                                  ]),
                                ],
                                2
                              ),
                            ],
                            6
                          ))
                        : ge("v-if", !0),
                      e.$slots.append
                        ? (L(),
                          te(
                            "div",
                            {
                              key: 1,
                              ref: "appendWrapper",
                              class: W(e.ns.e("append-wrapper")),
                            },
                            [Oe(e.$slots, "append")],
                            2
                          ))
                        : ge("v-if", !0),
                    ]),
                    _: 3,
                  },
                  8,
                  ["view-style", "wrap-style", "always"]
                ),
              ],
              2
            ),
            e.showSummary
              ? ot(
                  (L(),
                  te(
                    "div",
                    {
                      key: 1,
                      ref: "footerWrapper",
                      class: W(e.ns.e("footer-wrapper")),
                    },
                    [
                      oe(
                        c,
                        {
                          border: e.border,
                          "default-sort": e.defaultSort,
                          store: e.store,
                          style: He(e.tableBodyStyles),
                          "sum-text": e.computedSumText,
                          "summary-method": e.summaryMethod,
                        },
                        null,
                        8,
                        [
                          "border",
                          "default-sort",
                          "store",
                          "style",
                          "sum-text",
                          "summary-method",
                        ]
                      ),
                    ],
                    2
                  )),
                  [
                    [cn, !e.isEmpty],
                    [f, e.handleHeaderFooterMousewheel],
                  ]
                )
              : ge("v-if", !0),
            e.border || e.isGroup
              ? (L(),
                te(
                  "div",
                  { key: 2, class: W(e.ns.e("border-left-patch")) },
                  null,
                  2
                ))
              : ge("v-if", !0),
          ],
          6
        ),
        ot(
          ae(
            "div",
            { ref: "resizeProxy", class: W(e.ns.e("column-resize-proxy")) },
            null,
            2
          ),
          [[cn, e.resizeProxyVisible]]
        ),
      ],
      46,
      MT
    )
  );
}
var OT = De($T, [
  ["render", kT],
  [
    "__file",
    "/home/runner/work/element-plus/element-plus/packages/components/table/src/table.vue",
  ],
]);
const PT = {
    selection: "table-column--selection",
    expand: "table__expand-column",
  },
  NT = {
    default: { order: "" },
    selection: { width: 48, minWidth: 48, realWidth: 48, order: "" },
    expand: { width: 48, minWidth: 48, realWidth: 48, order: "" },
    index: { width: 48, minWidth: 48, realWidth: 48, order: "" },
  },
  IT = (e) => PT[e] || "",
  LT = {
    selection: {
      renderHeader({ store: e }) {
        function t() {
          return e.states.data.value && e.states.data.value.length === 0;
        }
        return Ne(To, {
          disabled: t(),
          size: e.states.tableSize.value,
          indeterminate:
            e.states.selection.value.length > 0 &&
            !e.states.isAllSelected.value,
          "onUpdate:modelValue": e.toggleAllSelection,
          modelValue: e.states.isAllSelected.value,
        });
      },
      renderCell({ row: e, column: t, store: n, $index: r }) {
        return Ne(To, {
          disabled: t.selectable ? !t.selectable.call(null, e, r) : !1,
          size: n.states.tableSize.value,
          onChange: () => {
            n.commit("rowSelectedChanged", e);
          },
          onClick: (o) => o.stopPropagation(),
          modelValue: n.isSelected(e),
        });
      },
      sortable: !1,
      resizable: !1,
    },
    index: {
      renderHeader({ column: e }) {
        return e.label || "#";
      },
      renderCell({ column: e, $index: t }) {
        let n = t + 1;
        const r = e.index;
        return (
          typeof r == "number"
            ? (n = t + r)
            : typeof r == "function" && (n = r(t)),
          Ne("div", {}, [n])
        );
      },
      sortable: !1,
    },
    expand: {
      renderHeader({ column: e }) {
        return e.label || "";
      },
      renderCell({ row: e, store: t, expanded: n }) {
        const { ns: r } = t,
          o = [r.e("expand-icon")];
        return (
          n && o.push(r.em("expand-icon", "expanded")),
          Ne(
            "div",
            {
              class: o,
              onClick: function (l) {
                l.stopPropagation(), t.toggleRowExpansion(e);
              },
            },
            { default: () => [Ne(at, null, { default: () => [Ne(Zh)] })] }
          )
        );
      },
      sortable: !1,
      resizable: !1,
    },
  };
function FT({ row: e, column: t, $index: n }) {
  var r;
  const o = t.property,
    i = o && hl(e, o).value;
  return t && t.formatter
    ? t.formatter(e, t, i, n)
    : ((r = i == null ? void 0 : i.toString) == null ? void 0 : r.call(i)) ||
        "";
}
function RT({ row: e, treeNode: t, store: n }, r = !1) {
  const { ns: o } = n;
  if (!t) return r ? [Ne("span", { class: o.e("placeholder") })] : null;
  const i = [],
    l = function (a) {
      a.stopPropagation(), !t.loading && n.loadOrToggle(e);
    };
  if (
    (t.indent &&
      i.push(
        Ne("span", {
          class: o.e("indent"),
          style: { "padding-left": `${t.indent}px` },
        })
      ),
    typeof t.expanded == "boolean" && !t.noLazyChildren)
  ) {
    const a = [
      o.e("expand-icon"),
      t.expanded ? o.em("expand-icon", "expanded") : "",
    ];
    let s = Zh;
    t.loading && (s = va),
      i.push(
        Ne(
          "div",
          { class: a, onClick: l },
          {
            default: () => [
              Ne(
                at,
                { class: { [o.is("loading")]: t.loading } },
                { default: () => [Ne(s)] }
              ),
            ],
          }
        )
      );
  } else i.push(Ne("span", { class: o.e("placeholder") }));
  return i;
}
function Kd(e, t) {
  return e.reduce((n, r) => ((n[r] = r), n), t);
}
function BT(e, t) {
  const n = et();
  return {
    registerComplexWatchers: () => {
      const i = ["fixed"],
        l = { realWidth: "width", realMinWidth: "minWidth" },
        a = Kd(i, l);
      Object.keys(a).forEach((s) => {
        const u = l[s];
        Re(t, u) &&
          me(
            () => t[u],
            (c) => {
              let f = c;
              u === "width" && s === "realWidth" && (f = gc(c)),
                u === "minWidth" && s === "realMinWidth" && (f = pg(c)),
                (n.columnConfig.value[u] = f),
                (n.columnConfig.value[s] = f);
              const d = u === "fixed";
              e.value.store.scheduleLayout(d);
            }
          );
      });
    },
    registerNormalWatchers: () => {
      const i = [
          "label",
          "filters",
          "filterMultiple",
          "sortable",
          "index",
          "formatter",
          "className",
          "labelClassName",
          "showOverflowTooltip",
        ],
        l = {
          property: "prop",
          align: "realAlign",
          headerAlign: "realHeaderAlign",
        },
        a = Kd(i, l);
      Object.keys(a).forEach((s) => {
        const u = l[s];
        Re(t, u) &&
          me(
            () => t[u],
            (c) => {
              n.columnConfig.value[s] = c;
            }
          );
      });
    },
  };
}
function VT(e, t, n) {
  const r = et(),
    o = B(""),
    i = B(!1),
    l = B(),
    a = B(),
    s = Ee("table");
  Xo(() => {
    (l.value = e.align ? `is-${e.align}` : null), l.value;
  }),
    Xo(() => {
      (a.value = e.headerAlign ? `is-${e.headerAlign}` : l.value), a.value;
    });
  const u = A(() => {
      let g = r.vnode.vParent || r.parent;
      for (; g && !g.tableId && !g.columnId; ) g = g.vnode.vParent || g.parent;
      return g;
    }),
    c = A(() => {
      const { store: g } = r.parent;
      if (!g) return !1;
      const { treeData: y } = g.states,
        w = y.value;
      return w && Object.keys(w).length > 0;
    }),
    f = B(gc(e.width)),
    d = B(pg(e.minWidth)),
    h = (g) => (
      f.value && (g.width = f.value),
      d.value && (g.minWidth = d.value),
      !f.value && d.value && (g.width = void 0),
      g.minWidth || (g.minWidth = 80),
      (g.realWidth = Number(g.width === void 0 ? g.minWidth : g.width)),
      g
    ),
    p = (g) => {
      const y = g.type,
        w = LT[y] || {};
      Object.keys(w).forEach((E) => {
        const $ = w[E];
        E !== "className" && $ !== void 0 && (g[E] = $);
      });
      const C = IT(y);
      if (C) {
        const E = `${m(s.namespace)}-${C}`;
        g.className = g.className ? `${g.className} ${E}` : E;
      }
      return g;
    },
    b = (g) => {
      Array.isArray(g) ? g.forEach((w) => y(w)) : y(g);
      function y(w) {
        var C;
        ((C = w == null ? void 0 : w.type) == null ? void 0 : C.name) ===
          "ElTableColumn" && (w.vParent = r);
      }
    };
  return {
    columnId: o,
    realAlign: l,
    isSubColumn: i,
    realHeaderAlign: a,
    columnOrTableParent: u,
    setColumnWidth: h,
    setColumnForcedProps: p,
    setColumnRenders: (g) => {
      e.renderHeader ||
        (g.type !== "selection" &&
          (g.renderHeader = (w) => {
            r.columnConfig.value.label;
            const C = t.header;
            return C ? C(w) : g.label;
          }));
      let y = g.renderCell;
      return (
        g.type === "expand"
          ? ((g.renderCell = (w) => Ne("div", { class: "cell" }, [y(w)])),
            (n.value.renderExpanded = (w) =>
              t.default ? t.default(w) : t.default))
          : ((y = y || FT),
            (g.renderCell = (w) => {
              let C = null;
              if (t.default) {
                const D = t.default(w);
                C = D.some((P) => P.type !== Nt) ? D : y(w);
              } else C = y(w);
              const E =
                  c.value && w.cellIndex === 0 && w.column.type !== "selection",
                $ = RT(w, E),
                I = { class: "cell", style: {} };
              return (
                g.showOverflowTooltip &&
                  ((I.class = `${I.class} ${m(s.namespace)}-tooltip`),
                  (I.style = {
                    width: `${
                      (w.column.realWidth || Number(w.column.width)) - 1
                    }px`,
                  })),
                b(C),
                Ne("div", I, [$, C])
              );
            })),
        g
      );
    },
    getPropsData: (...g) =>
      g.reduce(
        (y, w) => (
          Array.isArray(w) &&
            w.forEach((C) => {
              y[C] = e[C];
            }),
          y
        ),
        {}
      ),
    getColumnElIndex: (g, y) => Array.prototype.indexOf.call(g, y),
  };
}
var DT = {
  type: { type: String, default: "default" },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: { type: [String, Number], default: "" },
  minWidth: { type: [String, Number], default: "" },
  renderHeader: Function,
  sortable: { type: [Boolean, String], default: !1 },
  sortMethod: Function,
  sortBy: [String, Function, Array],
  resizable: { type: Boolean, default: !0 },
  columnKey: String,
  align: String,
  headerAlign: String,
  showTooltipWhenOverflow: Boolean,
  showOverflowTooltip: Boolean,
  fixed: [Boolean, String],
  formatter: Function,
  selectable: Function,
  reserveSelection: Boolean,
  filterMethod: Function,
  filteredValue: Array,
  filters: Array,
  filterPlacement: String,
  filterMultiple: { type: Boolean, default: !0 },
  index: [Number, Function],
  sortOrders: {
    type: Array,
    default: () => ["ascending", "descending", null],
    validator: (e) =>
      e.every((t) => ["ascending", "descending", null].includes(t)),
  },
};
let HT = 1;
var wg = se({
  name: "ElTableColumn",
  components: { ElCheckbox: To },
  props: DT,
  setup(e, { slots: t }) {
    const n = et(),
      r = B({}),
      o = A(() => {
        let x = n.parent;
        for (; x && !x.tableId; ) x = x.parent;
        return x;
      }),
      { registerNormalWatchers: i, registerComplexWatchers: l } = BT(o, e),
      {
        columnId: a,
        isSubColumn: s,
        realHeaderAlign: u,
        columnOrTableParent: c,
        setColumnWidth: f,
        setColumnForcedProps: d,
        setColumnRenders: h,
        getPropsData: p,
        getColumnElIndex: b,
        realAlign: v,
      } = VT(e, t, o),
      _ = c.value;
    (a.value = `${_.tableId || _.columnId}_column_${HT++}`),
      ua(() => {
        s.value = o.value !== _;
        const x = e.type || "default",
          g = e.sortable === "" ? !0 : e.sortable,
          y = {
            ...NT[x],
            id: a.value,
            type: x,
            property: e.prop || e.property,
            align: v,
            headerAlign: u,
            showOverflowTooltip:
              e.showOverflowTooltip || e.showTooltipWhenOverflow,
            filterable: e.filters || e.filterMethod,
            filteredValue: [],
            filterPlacement: "",
            isColumnGroup: !1,
            isSubColumn: !1,
            filterOpened: !1,
            sortable: g,
            index: e.index,
            rawColumnKey: n.vnode.key,
          };
        let I = p(
          [
            "columnKey",
            "label",
            "className",
            "labelClassName",
            "type",
            "renderHeader",
            "formatter",
            "fixed",
            "resizable",
          ],
          ["sortMethod", "sortBy", "sortOrders"],
          ["selectable", "reserveSelection"],
          [
            "filterMethod",
            "filters",
            "filterMultiple",
            "filterOpened",
            "filteredValue",
            "filterPlacement",
          ]
        );
        (I = z5(y, I)), (I = j5(h, f, d)(I)), (r.value = I), i(), l();
      }),
      rt(() => {
        var x;
        const g = c.value,
          y = s.value
            ? g.vnode.el.children
            : (x = g.refs.hiddenColumns) == null
            ? void 0
            : x.children,
          w = () => b(y || [], n.vnode.el);
        (r.value.getColumnIndex = w),
          w() > -1 &&
            o.value.store.commit(
              "insertColumn",
              r.value,
              s.value ? g.columnConfig.value : null
            );
      }),
      Bt(() => {
        o.value.store.commit(
          "removeColumn",
          r.value,
          s.value ? _.columnConfig.value : null
        );
      }),
      (n.columnId = a.value),
      (n.columnConfig = r);
  },
  render() {
    var e, t, n;
    try {
      const r =
          (t = (e = this.$slots).default) == null
            ? void 0
            : t.call(e, { row: {}, column: {}, $index: -1 }),
        o = [];
      if (Array.isArray(r))
        for (const l of r)
          ((n = l.type) == null ? void 0 : n.name) === "ElTableColumn" ||
          l.shapeFlag & 2
            ? o.push(l)
            : l.type === Ue &&
              Array.isArray(l.children) &&
              l.children.forEach((a) => {
                (a == null ? void 0 : a.patchFlag) !== 1024 &&
                  !Be(a == null ? void 0 : a.children) &&
                  o.push(a);
              });
      return Ne("div", o);
    } catch {
      return Ne("div", []);
    }
  },
});
const zT = pt(OT, { TableColumn: wg }),
  WT = Kt(wg);
function jT(e) {
  let t;
  const n = Ee("loading"),
    r = B(!1),
    o = Et({ ...e, originalPosition: "", originalOverflow: "", visible: !1 });
  function i(h) {
    o.text = h;
  }
  function l() {
    const h = o.parent;
    if (!h.vLoadingAddClassList) {
      let p = h.getAttribute("loading-number");
      (p = Number.parseInt(p) - 1),
        p
          ? h.setAttribute("loading-number", p.toString())
          : (Hr(h, n.bm("parent", "relative")),
            h.removeAttribute("loading-number")),
        Hr(h, n.bm("parent", "hidden"));
    }
    a(), f.unmount();
  }
  function a() {
    var h, p;
    (p = (h = d.$el) == null ? void 0 : h.parentNode) == null ||
      p.removeChild(d.$el);
  }
  function s() {
    var h;
    (e.beforeClose && !e.beforeClose()) ||
      ((r.value = !0),
      clearTimeout(t),
      (t = window.setTimeout(u, 400)),
      (o.visible = !1),
      (h = e.closed) == null || h.call(e));
  }
  function u() {
    if (!r.value) return;
    const h = o.parent;
    (r.value = !1), (h.vLoadingAddClassList = void 0), l();
  }
  const f = Sh({
      name: "ElLoading",
      setup() {
        return () => {
          const h = o.spinner || o.svg,
            p = Ne(
              "svg",
              {
                class: "circular",
                viewBox: o.svgViewBox ? o.svgViewBox : "0 0 50 50",
                ...(h ? { innerHTML: h } : {}),
              },
              [
                Ne("circle", {
                  class: "path",
                  cx: "25",
                  cy: "25",
                  r: "20",
                  fill: "none",
                }),
              ]
            ),
            b = o.text ? Ne("p", { class: n.b("text") }, [o.text]) : void 0;
          return Ne(
            hr,
            { name: n.b("fade"), onAfterLeave: u },
            {
              default: re(() => [
                ot(
                  oe(
                    "div",
                    {
                      style: { backgroundColor: o.background || "" },
                      class: [
                        n.b("mask"),
                        o.customClass,
                        o.fullscreen ? "is-fullscreen" : "",
                      ],
                    },
                    [Ne("div", { class: n.b("spinner") }, [p, b])]
                  ),
                  [[cn, o.visible]]
                ),
              ]),
            }
          );
        };
      },
    }),
    d = f.mount(document.createElement("div"));
  return {
    ...Xt(o),
    setText: i,
    removeElLoadingChild: a,
    close: s,
    handleAfterLeave: u,
    vm: d,
    get $el() {
      return d.$el;
    },
  };
}
let el;
const Ks = function (e = {}) {
    if (!lt) return;
    const t = KT(e);
    if (t.fullscreen && el) return el;
    const n = jT({
      ...t,
      closed: () => {
        var o;
        (o = t.closed) == null || o.call(t), t.fullscreen && (el = void 0);
      },
    });
    qT(t, t.parent, n),
      qd(t, t.parent, n),
      (t.parent.vLoadingAddClassList = () => qd(t, t.parent, n));
    let r = t.parent.getAttribute("loading-number");
    return (
      r ? (r = `${Number.parseInt(r) + 1}`) : (r = "1"),
      t.parent.setAttribute("loading-number", r),
      t.parent.appendChild(n.$el),
      Le(() => (n.visible.value = t.visible)),
      t.fullscreen && (el = n),
      n
    );
  },
  KT = (e) => {
    var t, n, r, o;
    let i;
    return (
      Be(e.target)
        ? (i =
            (t = document.querySelector(e.target)) != null ? t : document.body)
        : (i = e.target || document.body),
      {
        parent: i === document.body || e.body ? document.body : i,
        background: e.background || "",
        svg: e.svg || "",
        svgViewBox: e.svgViewBox || "",
        spinner: e.spinner || !1,
        text: e.text || "",
        fullscreen:
          i === document.body && ((n = e.fullscreen) != null ? n : !0),
        lock: (r = e.lock) != null ? r : !1,
        customClass: e.customClass || "",
        visible: (o = e.visible) != null ? o : !0,
        target: i,
      }
    );
  },
  qT = async (e, t, n) => {
    const { nextZIndex: r } = ec(),
      o = {};
    if (e.fullscreen)
      (n.originalPosition.value = $r(document.body, "position")),
        (n.originalOverflow.value = $r(document.body, "overflow")),
        (o.zIndex = r());
    else if (e.parent === document.body) {
      (n.originalPosition.value = $r(document.body, "position")), await Le();
      for (const i of ["top", "left"]) {
        const l = i === "top" ? "scrollTop" : "scrollLeft";
        o[i] = `${
          e.target.getBoundingClientRect()[i] +
          document.body[l] +
          document.documentElement[l] -
          Number.parseInt($r(document.body, `margin-${i}`), 10)
        }px`;
      }
      for (const i of ["height", "width"])
        o[i] = `${e.target.getBoundingClientRect()[i]}px`;
    } else n.originalPosition.value = $r(t, "position");
    for (const [i, l] of Object.entries(o)) n.$el.style[i] = l;
  },
  qd = (e, t, n) => {
    const r = Ee("loading");
    ["absolute", "fixed", "sticky"].includes(n.originalPosition.value)
      ? Hr(t, r.bm("parent", "relative"))
      : Hl(t, r.bm("parent", "relative")),
      e.fullscreen && e.lock
        ? Hl(t, r.bm("parent", "hidden"))
        : Hr(t, r.bm("parent", "hidden"));
  },
  qs = Symbol("ElLoading"),
  Ud = (e, t) => {
    var n, r, o, i;
    const l = t.instance,
      a = (d) => (We(t.value) ? t.value[d] : void 0),
      s = (d) => {
        const h = (Be(d) && (l == null ? void 0 : l[d])) || d;
        return h && B(h);
      },
      u = (d) => s(a(d) || e.getAttribute(`element-loading-${pr(d)}`)),
      c = (n = a("fullscreen")) != null ? n : t.modifiers.fullscreen,
      f = {
        text: u("text"),
        svg: u("svg"),
        svgViewBox: u("svgViewBox"),
        spinner: u("spinner"),
        background: u("background"),
        customClass: u("customClass"),
        fullscreen: c,
        target: (r = a("target")) != null ? r : c ? void 0 : e,
        body: (o = a("body")) != null ? o : t.modifiers.body,
        lock: (i = a("lock")) != null ? i : t.modifiers.lock,
      };
    e[qs] = { options: f, instance: Ks(f) };
  },
  UT = (e, t) => {
    for (const n of Object.keys(t)) Qe(t[n]) && (t[n].value = e[n]);
  },
  Yd = {
    mounted(e, t) {
      t.value && Ud(e, t);
    },
    updated(e, t) {
      const n = e[qs];
      t.oldValue !== t.value &&
        (t.value && !t.oldValue
          ? Ud(e, t)
          : t.value && t.oldValue
          ? We(t.value) && UT(t.value, n.options)
          : n == null || n.instance.close());
    },
    unmounted(e) {
      var t;
      (t = e[qs]) == null || t.instance.close();
    },
  },
  _g = {
    install(e) {
      e.directive("loading", Yd), (e.config.globalProperties.$loading = Ks);
    },
    directive: Yd,
    service: Ks,
  };
function Ii(e) {
  for (var t = (e.length / 6) | 0, n = new Array(t), r = 0; r < t; )
    n[r] = "#" + e.slice(r * 6, ++r * 6);
  return n;
}
function wc(e, t, n) {
  (e.prototype = t.prototype = n), (n.constructor = e);
}
function xg(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function Li() {}
var bi = 0.7,
  Wl = 1 / bi,
  fo = "\\s*([+-]?\\d+)\\s*",
  yi = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
  Tn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
  YT = /^#([0-9a-f]{3,8})$/,
  XT = new RegExp(`^rgb\\(${fo},${fo},${fo}\\)$`),
  GT = new RegExp(`^rgb\\(${Tn},${Tn},${Tn}\\)$`),
  JT = new RegExp(`^rgba\\(${fo},${fo},${fo},${yi}\\)$`),
  ZT = new RegExp(`^rgba\\(${Tn},${Tn},${Tn},${yi}\\)$`),
  QT = new RegExp(`^hsl\\(${yi},${Tn},${Tn}\\)$`),
  e$ = new RegExp(`^hsla\\(${yi},${Tn},${Tn},${yi}\\)$`),
  Xd = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
wc(Li, Wr, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Gd,
  formatHex: Gd,
  formatHex8: t$,
  formatHsl: n$,
  formatRgb: Jd,
  toString: Jd,
});
function Gd() {
  return this.rgb().formatHex();
}
function t$() {
  return this.rgb().formatHex8();
}
function n$() {
  return Cg(this).formatHsl();
}
function Jd() {
  return this.rgb().formatRgb();
}
function Wr(e) {
  var t, n;
  return (
    (e = (e + "").trim().toLowerCase()),
    (t = YT.exec(e))
      ? ((n = t[1].length),
        (t = parseInt(t[1], 16)),
        n === 6
          ? Zd(t)
          : n === 3
          ? new Pt(
              ((t >> 8) & 15) | ((t >> 4) & 240),
              ((t >> 4) & 15) | (t & 240),
              ((t & 15) << 4) | (t & 15),
              1
            )
          : n === 8
          ? tl(
              (t >> 24) & 255,
              (t >> 16) & 255,
              (t >> 8) & 255,
              (t & 255) / 255
            )
          : n === 4
          ? tl(
              ((t >> 12) & 15) | ((t >> 8) & 240),
              ((t >> 8) & 15) | ((t >> 4) & 240),
              ((t >> 4) & 15) | (t & 240),
              (((t & 15) << 4) | (t & 15)) / 255
            )
          : null)
      : (t = XT.exec(e))
      ? new Pt(t[1], t[2], t[3], 1)
      : (t = GT.exec(e))
      ? new Pt((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, 1)
      : (t = JT.exec(e))
      ? tl(t[1], t[2], t[3], t[4])
      : (t = ZT.exec(e))
      ? tl((t[1] * 255) / 100, (t[2] * 255) / 100, (t[3] * 255) / 100, t[4])
      : (t = QT.exec(e))
      ? tp(t[1], t[2] / 100, t[3] / 100, 1)
      : (t = e$.exec(e))
      ? tp(t[1], t[2] / 100, t[3] / 100, t[4])
      : Xd.hasOwnProperty(e)
      ? Zd(Xd[e])
      : e === "transparent"
      ? new Pt(NaN, NaN, NaN, 0)
      : null
  );
}
function Zd(e) {
  return new Pt((e >> 16) & 255, (e >> 8) & 255, e & 255, 1);
}
function tl(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new Pt(e, t, n, r);
}
function r$(e) {
  return (
    e instanceof Li || (e = Wr(e)),
    e ? ((e = e.rgb()), new Pt(e.r, e.g, e.b, e.opacity)) : new Pt()
  );
}
function wi(e, t, n, r) {
  return arguments.length === 1 ? r$(e) : new Pt(e, t, n, r == null ? 1 : r);
}
function Pt(e, t, n, r) {
  (this.r = +e), (this.g = +t), (this.b = +n), (this.opacity = +r);
}
wc(
  Pt,
  wi,
  xg(Li, {
    brighter(e) {
      return (
        (e = e == null ? Wl : Math.pow(Wl, e)),
        new Pt(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? bi : Math.pow(bi, e)),
        new Pt(this.r * e, this.g * e, this.b * e, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Pt(Br(this.r), Br(this.g), Br(this.b), jl(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: Qd,
    formatHex: Qd,
    formatHex8: o$,
    formatRgb: ep,
    toString: ep,
  })
);
function Qd() {
  return `#${Nr(this.r)}${Nr(this.g)}${Nr(this.b)}`;
}
function o$() {
  return `#${Nr(this.r)}${Nr(this.g)}${Nr(this.b)}${Nr(
    (isNaN(this.opacity) ? 1 : this.opacity) * 255
  )}`;
}
function ep() {
  const e = jl(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Br(this.r)}, ${Br(this.g)}, ${Br(
    this.b
  )}${e === 1 ? ")" : `, ${e})`}`;
}
function jl(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Br(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Nr(e) {
  return (e = Br(e)), (e < 16 ? "0" : "") + e.toString(16);
}
function tp(e, t, n, r) {
  return (
    r <= 0
      ? (e = t = n = NaN)
      : n <= 0 || n >= 1
      ? (e = t = NaN)
      : t <= 0 && (e = NaN),
    new an(e, t, n, r)
  );
}
function Cg(e) {
  if (e instanceof an) return new an(e.h, e.s, e.l, e.opacity);
  if ((e instanceof Li || (e = Wr(e)), !e)) return new an();
  if (e instanceof an) return e;
  e = e.rgb();
  var t = e.r / 255,
    n = e.g / 255,
    r = e.b / 255,
    o = Math.min(t, n, r),
    i = Math.max(t, n, r),
    l = NaN,
    a = i - o,
    s = (i + o) / 2;
  return (
    a
      ? (t === i
          ? (l = (n - r) / a + (n < r) * 6)
          : n === i
          ? (l = (r - t) / a + 2)
          : (l = (t - n) / a + 4),
        (a /= s < 0.5 ? i + o : 2 - i - o),
        (l *= 60))
      : (a = s > 0 && s < 1 ? 0 : l),
    new an(l, a, s, e.opacity)
  );
}
function i$(e, t, n, r) {
  return arguments.length === 1 ? Cg(e) : new an(e, t, n, r == null ? 1 : r);
}
function an(e, t, n, r) {
  (this.h = +e), (this.s = +t), (this.l = +n), (this.opacity = +r);
}
wc(
  an,
  i$,
  xg(Li, {
    brighter(e) {
      return (
        (e = e == null ? Wl : Math.pow(Wl, e)),
        new an(this.h, this.s, this.l * e, this.opacity)
      );
    },
    darker(e) {
      return (
        (e = e == null ? bi : Math.pow(bi, e)),
        new an(this.h, this.s, this.l * e, this.opacity)
      );
    },
    rgb() {
      var e = (this.h % 360) + (this.h < 0) * 360,
        t = isNaN(e) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < 0.5 ? n : 1 - n) * t,
        o = 2 * n - r;
      return new Pt(
        Ya(e >= 240 ? e - 240 : e + 120, o, r),
        Ya(e, o, r),
        Ya(e < 120 ? e + 240 : e - 120, o, r),
        this.opacity
      );
    },
    clamp() {
      return new an(np(this.h), nl(this.s), nl(this.l), jl(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const e = jl(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${np(this.h)}, ${
        nl(this.s) * 100
      }%, ${nl(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    },
  })
);
function np(e) {
  return (e = (e || 0) % 360), e < 0 ? e + 360 : e;
}
function nl(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ya(e, t, n) {
  return (
    (e < 60
      ? t + ((n - t) * e) / 60
      : e < 180
      ? n
      : e < 240
      ? t + ((n - t) * (240 - e)) / 60
      : t) * 255
  );
}
function l$(e, t, n, r, o) {
  var i = e * e,
    l = i * e;
  return (
    ((1 - 3 * e + 3 * i - l) * t +
      (4 - 6 * i + 3 * l) * n +
      (1 + 3 * e + 3 * i - 3 * l) * r +
      l * o) /
    6
  );
}
function a$(e) {
  var t = e.length - 1;
  return function (n) {
    var r = n <= 0 ? (n = 0) : n >= 1 ? ((n = 1), t - 1) : Math.floor(n * t),
      o = e[r],
      i = e[r + 1],
      l = r > 0 ? e[r - 1] : 2 * o - i,
      a = r < t - 1 ? e[r + 2] : 2 * i - o;
    return l$((n - r / t) * t, l, o, i, a);
  };
}
const _c = (e) => () => e;
function s$(e, t) {
  return function (n) {
    return e + n * t;
  };
}
function u$(e, t, n) {
  return (
    (e = Math.pow(e, n)),
    (t = Math.pow(t, n) - e),
    (n = 1 / n),
    function (r) {
      return Math.pow(e + r * t, n);
    }
  );
}
function c$(e) {
  return (e = +e) == 1
    ? Sg
    : function (t, n) {
        return n - t ? u$(t, n, e) : _c(isNaN(t) ? n : t);
      };
}
function Sg(e, t) {
  var n = t - e;
  return n ? s$(e, n) : _c(isNaN(e) ? t : e);
}
const Kl = (function e(t) {
  var n = c$(t);
  function r(o, i) {
    var l = n((o = wi(o)).r, (i = wi(i)).r),
      a = n(o.g, i.g),
      s = n(o.b, i.b),
      u = Sg(o.opacity, i.opacity);
    return function (c) {
      return (
        (o.r = l(c)), (o.g = a(c)), (o.b = s(c)), (o.opacity = u(c)), o + ""
      );
    };
  }
  return (r.gamma = e), r;
})(1);
function f$(e) {
  return function (t) {
    var n = t.length,
      r = new Array(n),
      o = new Array(n),
      i = new Array(n),
      l,
      a;
    for (l = 0; l < n; ++l)
      (a = wi(t[l])), (r[l] = a.r || 0), (o[l] = a.g || 0), (i[l] = a.b || 0);
    return (
      (r = e(r)),
      (o = e(o)),
      (i = e(i)),
      (a.opacity = 1),
      function (s) {
        return (a.r = r(s)), (a.g = o(s)), (a.b = i(s)), a + "";
      }
    );
  };
}
var d$ = f$(a$);
function p$(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0,
    r = t.slice(),
    o;
  return function (i) {
    for (o = 0; o < n; ++o) r[o] = e[o] * (1 - i) + t[o] * i;
    return r;
  };
}
function h$(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function m$(e, t) {
  var n = t ? t.length : 0,
    r = e ? Math.min(n, e.length) : 0,
    o = new Array(r),
    i = new Array(n),
    l;
  for (l = 0; l < r; ++l) o[l] = Fi(e[l], t[l]);
  for (; l < n; ++l) i[l] = t[l];
  return function (a) {
    for (l = 0; l < r; ++l) i[l] = o[l](a);
    return i;
  };
}
function g$(e, t) {
  var n = new Date();
  return (
    (e = +e),
    (t = +t),
    function (r) {
      return n.setTime(e * (1 - r) + t * r), n;
    }
  );
}
function on(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return e * (1 - n) + t * n;
    }
  );
}
function v$(e, t) {
  var n = {},
    r = {},
    o;
  (e === null || typeof e != "object") && (e = {}),
    (t === null || typeof t != "object") && (t = {});
  for (o in t) o in e ? (n[o] = Fi(e[o], t[o])) : (r[o] = t[o]);
  return function (i) {
    for (o in n) r[o] = n[o](i);
    return r;
  };
}
var Us = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  Xa = new RegExp(Us.source, "g");
function b$(e) {
  return function () {
    return e;
  };
}
function y$(e) {
  return function (t) {
    return e(t) + "";
  };
}
function Eg(e, t) {
  var n = (Us.lastIndex = Xa.lastIndex = 0),
    r,
    o,
    i,
    l = -1,
    a = [],
    s = [];
  for (e = e + "", t = t + ""; (r = Us.exec(e)) && (o = Xa.exec(t)); )
    (i = o.index) > n &&
      ((i = t.slice(n, i)), a[l] ? (a[l] += i) : (a[++l] = i)),
      (r = r[0]) === (o = o[0])
        ? a[l]
          ? (a[l] += o)
          : (a[++l] = o)
        : ((a[++l] = null), s.push({ i: l, x: on(r, o) })),
      (n = Xa.lastIndex);
  return (
    n < t.length && ((i = t.slice(n)), a[l] ? (a[l] += i) : (a[++l] = i)),
    a.length < 2
      ? s[0]
        ? y$(s[0].x)
        : b$(t)
      : ((t = s.length),
        function (u) {
          for (var c = 0, f; c < t; ++c) a[(f = s[c]).i] = f.x(u);
          return a.join("");
        })
  );
}
function Fi(e, t) {
  var n = typeof t,
    r;
  return t == null || n === "boolean"
    ? _c(t)
    : (n === "number"
        ? on
        : n === "string"
        ? (r = Wr(t))
          ? ((t = r), Kl)
          : Eg
        : t instanceof Wr
        ? Kl
        : t instanceof Date
        ? g$
        : h$(t)
        ? p$
        : Array.isArray(t)
        ? m$
        : (typeof t.valueOf != "function" && typeof t.toString != "function") ||
          isNaN(t)
        ? v$
        : on)(e, t);
}
function Tg(e, t) {
  return (
    (e = +e),
    (t = +t),
    function (n) {
      return Math.round(e * (1 - n) + t * n);
    }
  );
}
var rp = 180 / Math.PI,
  Ys = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function $g(e, t, n, r, o, i) {
  var l, a, s;
  return (
    (l = Math.sqrt(e * e + t * t)) && ((e /= l), (t /= l)),
    (s = e * n + t * r) && ((n -= e * s), (r -= t * s)),
    (a = Math.sqrt(n * n + r * r)) && ((n /= a), (r /= a), (s /= a)),
    e * r < t * n && ((e = -e), (t = -t), (s = -s), (l = -l)),
    {
      translateX: o,
      translateY: i,
      rotate: Math.atan2(t, e) * rp,
      skewX: Math.atan(s) * rp,
      scaleX: l,
      scaleY: a,
    }
  );
}
var rl;
function w$(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(
    e + ""
  );
  return t.isIdentity ? Ys : $g(t.a, t.b, t.c, t.d, t.e, t.f);
}
function _$(e) {
  return e == null ||
    (rl || (rl = document.createElementNS("http://www.w3.org/2000/svg", "g")),
    rl.setAttribute("transform", e),
    !(e = rl.transform.baseVal.consolidate()))
    ? Ys
    : ((e = e.matrix), $g(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Mg(e, t, n, r) {
  function o(u) {
    return u.length ? u.pop() + " " : "";
  }
  function i(u, c, f, d, h, p) {
    if (u !== f || c !== d) {
      var b = h.push("translate(", null, t, null, n);
      p.push({ i: b - 4, x: on(u, f) }, { i: b - 2, x: on(c, d) });
    } else (f || d) && h.push("translate(" + f + t + d + n);
  }
  function l(u, c, f, d) {
    u !== c
      ? (u - c > 180 ? (c += 360) : c - u > 180 && (u += 360),
        d.push({ i: f.push(o(f) + "rotate(", null, r) - 2, x: on(u, c) }))
      : c && f.push(o(f) + "rotate(" + c + r);
  }
  function a(u, c, f, d) {
    u !== c
      ? d.push({ i: f.push(o(f) + "skewX(", null, r) - 2, x: on(u, c) })
      : c && f.push(o(f) + "skewX(" + c + r);
  }
  function s(u, c, f, d, h, p) {
    if (u !== f || c !== d) {
      var b = h.push(o(h) + "scale(", null, ",", null, ")");
      p.push({ i: b - 4, x: on(u, f) }, { i: b - 2, x: on(c, d) });
    } else (f !== 1 || d !== 1) && h.push(o(h) + "scale(" + f + "," + d + ")");
  }
  return function (u, c) {
    var f = [],
      d = [];
    return (
      (u = e(u)),
      (c = e(c)),
      i(u.translateX, u.translateY, c.translateX, c.translateY, f, d),
      l(u.rotate, c.rotate, f, d),
      a(u.skewX, c.skewX, f, d),
      s(u.scaleX, u.scaleY, c.scaleX, c.scaleY, f, d),
      (u = c = null),
      function (h) {
        for (var p = -1, b = d.length, v; ++p < b; ) f[(v = d[p]).i] = v.x(h);
        return f.join("");
      }
    );
  };
}
var x$ = Mg(w$, "px, ", "px)", "deg)"),
  C$ = Mg(_$, ", ", ")", ")");
const S$ = (e) => d$(e[e.length - 1]);
var E$ = new Array(3)
  .concat(
    "f0f0f0bdbdbd636363",
    "f7f7f7cccccc969696525252",
    "f7f7f7cccccc969696636363252525",
    "f7f7f7d9d9d9bdbdbd969696636363252525",
    "f7f7f7d9d9d9bdbdbd969696737373525252252525",
    "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
    "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
  )
  .map(Ii);
const T$ = S$(E$);
function $$(e) {
  return (
    (e = Math.max(0, Math.min(1, e))),
    "rgb(" +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            -4.54 -
              e *
                (35.34 -
                  e * (2381.73 - e * (6402.7 - e * (7024.72 - e * 2710.57))))
          )
        )
      ) +
      ", " +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            32.49 +
              e *
                (170.73 + e * (52.82 - e * (131.46 - e * (176.58 - e * 67.37))))
          )
        )
      ) +
      ", " +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            81.24 +
              e *
                (442.36 -
                  e * (2482.43 - e * (6167.24 - e * (6614.94 - e * 2475.67))))
          )
        )
      ) +
      ")"
  );
}
var ol = wi(),
  M$ = Math.PI / 3,
  A$ = (Math.PI * 2) / 3;
function k$(e) {
  var t;
  return (
    (e = (0.5 - e) * Math.PI),
    (ol.r = 255 * (t = Math.sin(e)) * t),
    (ol.g = 255 * (t = Math.sin(e + M$)) * t),
    (ol.b = 255 * (t = Math.sin(e + A$)) * t),
    ol + ""
  );
}
function O$(e) {
  return (
    (e = Math.max(0, Math.min(1, e))),
    "rgb(" +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            34.61 +
              e *
                (1172.33 -
                  e *
                    (10793.56 - e * (33300.12 - e * (38394.49 - e * 14825.05))))
          )
        )
      ) +
      ", " +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            23.31 +
              e *
                (557.33 +
                  e * (1225.33 - e * (3574.96 - e * (1073.77 + e * 707.56))))
          )
        )
      ) +
      ", " +
      Math.max(
        0,
        Math.min(
          255,
          Math.round(
            27.2 +
              e *
                (3211.1 -
                  e * (15327.97 - e * (27814 - e * (22569.18 - e * 6838.66))))
          )
        )
      ) +
      ")"
  );
}
function Ca(e) {
  var t = e.length;
  return function (n) {
    return e[Math.max(0, Math.min(t - 1, Math.floor(n * t)))];
  };
}
const P$ = Ca(
  Ii(
    "44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"
  )
);
Ca(
  Ii(
    "00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"
  )
);
var N$ = Ca(
    Ii(
      "00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"
    )
  ),
  op = Ca(
    Ii(
      "0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"
    )
  );
function I$(e) {
  return e
    .trim()
    .split(
      `\r
`
    )
    .map((t) => t.split(",").map((n) => parseInt(n)));
}
function L$(e) {
  return fetch(e)
    .then((t) => t.text())
    .then((t) => I$(t))
    .catch((t) => console.log(t.message));
}
function F$(e, t) {
  let n = e.getContext("2d");
  n &&
    (n.clearRect(0, 0, e.width, e.height),
    (e.width = t.width),
    (e.height = t.height),
    n.putImageData(t, 0, 0));
}
function R$(e) {
  switch (e) {
    case "linear":
      return (t) => t;
    case "log":
      return Math.log1p;
    case "pow":
      return (t) => Math.pow(t, 2);
    case "sqrt":
      return Math.sqrt;
    case "cbrt":
      return Math.cbrt;
    default:
      throw new Error("Invalid tranform type");
  }
}
function B$(e) {
  switch (e) {
    case "linear":
      return (t) => t;
    case "log":
      return (t) => Math.pow(Math.E, t) - 1;
    case "pow":
      return Math.sqrt;
    case "sqrt":
      return (t) => Math.pow(t, 2);
    case "cbrt":
      return (t) => Math.pow(t, 3);
    default:
      throw new Error("Invalid tranform type");
  }
}
function V$(e, t, n) {
  let r = t - e,
    o = 1;
  for (; r / o > 10; ) o *= 10;
  let i = [],
    l = Math.ceil(e / o);
  for (let s = l, u = Math.ceil(t / o); s < u; ++s) i.push(s * o);
  i[0] > e && i.unshift(e);
  let a = [e, i[1], i[i.length - 1], t].map(n);
  if (
    (i[i.length - 1] < t && (a[3] - a[2]) / (a[3] - a[0]) > 0.02 && i.push(t),
    o > 1 && (a[1] - a[0]) / (a[3] - a[0]) > 0.5)
  ) {
    (o /= 10), (l = Math.ceil(i[1] / o) - 1);
    for (let s = l, u = Math.ceil(e / o); s > u; --s) i.push(s * o);
  }
  return i;
}
function D$(e) {
  switch (e) {
    case "Plamsa":
      return op;
    case "Viridis":
      return P$;
    case "Inferno":
      return N$;
    case "Turbo":
      return O$;
    case "Cividis":
      return $$;
    case "Greys":
      return (t) => T$(1 - t);
    default:
      return op;
  }
}
function H$(e) {
  let t = 1 / 0,
    n = -1 / 0;
  return (
    e.map((r) => {
      r.map((o) => {
        o < t && (t = o), o > n && (n = o);
      });
    }),
    [t, n]
  );
}
function z$(e, t, n) {
  let r = Math.round((e / n.params.width) * n.level0_Width),
    o = Math.round((1 - t / n.params.height) * n.level0_Height),
    i = Math.pow(2, n.zoomLevel - n.previousZoomLevel),
    l = (n.bottomLeftPosition[0] + r) * i,
    a = (n.bottomLeftPosition[1] + o) * i;
  function s(p, b, v) {
    return p < b ? b : p > v ? v : p;
  }
  let u = n.level0_Width / 2,
    c = n.level0_Height / 2,
    f = Math.pow(2, n.zoomLevel),
    d = s(l - u, 0, n.level0_Width * (f - 1)),
    h = s(a - c, 0, n.level0_Height * (f - 1));
  (n.bottomLeftPosition[0] = d), (n.bottomLeftPosition[1] = h);
}
const $t = {
  fetchData: L$,
  drawImageData: F$,
  getTransformFunction: R$,
  getTickValues: V$,
  getInverseTransformFunction: B$,
  getInterpolateFunc: D$,
  extent: H$,
  translateBottomLeftPosition: z$,
};
class W$ {
  _dispatch(t) {
    return this._status
      ? new Promise((n, r) => {
          setTimeout((o) => this._dispatch(o).then(n).catch(r), 100, t);
        })
      : ((this._status = ["loading"]),
        this.worker.postMessage(t),
        new Promise((n, r) => {
          let o = setInterval(() => {
            const i = this._status;
            if (!i) {
              r(new Error("tasks conflict")), clearInterval(o);
              return;
            }
            i[0] === "done" && n(i[1]),
              i[0] === "error" && r(i[1]),
              i[0] !== "loading" && (delete this._status, clearInterval(o));
          }, 50);
        }));
  }
  load() {
    if (this.worker) return new Promise((n) => n());
    const t =
      "/Filter-basedDensityMapEnhancement" +
      (import.meta.url.includes("src") ? "/src" : "");
    return (
      (this.worker = new Worker(`${t}/worker/cv.worker.js`)),
      this.load2DColormap(t),
      (this.worker.onmessage = (n) => (this._status = ["done", n])),
      (this.worker.onerror = (n) => (this._status = ["error", n])),
      this._dispatch({
        msg: "load",
        openCvPath: `${t}/worker/opencv.js`,
      })
    );
  }
  enhanceDensityMap(t, n, r) {
    let o = JSON.stringify(n),
      i = JSON.stringify(r),
      l = t.map((s) => s.map($t.getTransformFunction(n.type))),
      a = n.colormap.startsWith("2D") ? Ve(t) : void 0;
    return this._dispatch({
      msg: "enhancing",
      densitymap: l,
      originalData: a,
      paramStr: o,
      regionLensStr: i,
    });
  }
  load2DColormap(t) {
    let n = 300,
      r = 300;
    const o = document.getElementById("2d_colormap");
    (o.width = n), (o.height = r);
    const i = o.getContext("2d", { willReadFrequently: !0 }),
      l = new Image();
    console.log("load 2d colormap"),
      (l.onload = () => {
        i.drawImage(l, 0, 0, n, r),
          this._dispatch({
            msg: "sending2d",
            imgData: i.getImageData(0, 0, n, r),
          });
      }),
      (l.src = `${t}/assets/2d_colormap.png`);
  }
  redraw2DColormap(t) {
    return this._dispatch({ msg: "adjusting2d", locsStr: t });
  }
}
const il = new W$();
function Cl(e, t) {
  return e == null || t == null
    ? NaN
    : e < t
    ? -1
    : e > t
    ? 1
    : e >= t
    ? 0
    : NaN;
}
function j$(e, t) {
  return e == null || t == null
    ? NaN
    : t < e
    ? -1
    : t > e
    ? 1
    : t >= e
    ? 0
    : NaN;
}
function Ag(e) {
  let t, n, r;
  e.length !== 2
    ? ((t = Cl), (n = (a, s) => Cl(e(a), s)), (r = (a, s) => e(a) - s))
    : ((t = e === Cl || e === j$ ? e : K$), (n = e), (r = e));
  function o(a, s, u = 0, c = a.length) {
    if (u < c) {
      if (t(s, s) !== 0) return c;
      do {
        const f = (u + c) >>> 1;
        n(a[f], s) < 0 ? (u = f + 1) : (c = f);
      } while (u < c);
    }
    return u;
  }
  function i(a, s, u = 0, c = a.length) {
    if (u < c) {
      if (t(s, s) !== 0) return c;
      do {
        const f = (u + c) >>> 1;
        n(a[f], s) <= 0 ? (u = f + 1) : (c = f);
      } while (u < c);
    }
    return u;
  }
  function l(a, s, u = 0, c = a.length) {
    const f = o(a, s, u, c - 1);
    return f > u && r(a[f - 1], s) > -r(a[f], s) ? f - 1 : f;
  }
  return { left: o, center: l, right: i };
}
function K$() {
  return 0;
}
function q$(e) {
  return e === null ? NaN : +e;
}
const U$ = Ag(Cl),
  Y$ = U$.right;
Ag(q$).center;
const X$ = Y$;
var Xs = Math.sqrt(50),
  Gs = Math.sqrt(10),
  Js = Math.sqrt(2);
function G$(e, t, n) {
  var r,
    o = -1,
    i,
    l,
    a;
  if (((t = +t), (e = +e), (n = +n), e === t && n > 0)) return [e];
  if (
    ((r = t < e) && ((i = e), (e = t), (t = i)),
    (a = kg(e, t, n)) === 0 || !isFinite(a))
  )
    return [];
  if (a > 0) {
    let s = Math.round(e / a),
      u = Math.round(t / a);
    for (
      s * a < e && ++s, u * a > t && --u, l = new Array((i = u - s + 1));
      ++o < i;

    )
      l[o] = (s + o) * a;
  } else {
    a = -a;
    let s = Math.round(e * a),
      u = Math.round(t * a);
    for (
      s / a < e && ++s, u / a > t && --u, l = new Array((i = u - s + 1));
      ++o < i;

    )
      l[o] = (s + o) / a;
  }
  return r && l.reverse(), l;
}
function kg(e, t, n) {
  var r = (t - e) / Math.max(0, n),
    o = Math.floor(Math.log(r) / Math.LN10),
    i = r / Math.pow(10, o);
  return o >= 0
    ? (i >= Xs ? 10 : i >= Gs ? 5 : i >= Js ? 2 : 1) * Math.pow(10, o)
    : -Math.pow(10, -o) / (i >= Xs ? 10 : i >= Gs ? 5 : i >= Js ? 2 : 1);
}
function J$(e, t, n) {
  var r = Math.abs(t - e) / Math.max(0, n),
    o = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
    i = r / o;
  return (
    i >= Xs ? (o *= 10) : i >= Gs ? (o *= 5) : i >= Js && (o *= 2),
    t < e ? -o : o
  );
}
function Z$(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Q$(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e),
        typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
function eM(e) {
  return function () {
    return e;
  };
}
function tM(e) {
  return +e;
}
var ip = [0, 1];
function sr(e) {
  return e;
}
function Zs(e, t) {
  return (t -= e = +e)
    ? function (n) {
        return (n - e) / t;
      }
    : eM(isNaN(t) ? NaN : 0.5);
}
function nM(e, t) {
  var n;
  return (
    e > t && ((n = e), (e = t), (t = n)),
    function (r) {
      return Math.max(e, Math.min(t, r));
    }
  );
}
function rM(e, t, n) {
  var r = e[0],
    o = e[1],
    i = t[0],
    l = t[1];
  return (
    o < r ? ((r = Zs(o, r)), (i = n(l, i))) : ((r = Zs(r, o)), (i = n(i, l))),
    function (a) {
      return i(r(a));
    }
  );
}
function oM(e, t, n) {
  var r = Math.min(e.length, t.length) - 1,
    o = new Array(r),
    i = new Array(r),
    l = -1;
  for (
    e[r] < e[0] && ((e = e.slice().reverse()), (t = t.slice().reverse()));
    ++l < r;

  )
    (o[l] = Zs(e[l], e[l + 1])), (i[l] = n(t[l], t[l + 1]));
  return function (a) {
    var s = X$(e, a, 1, r) - 1;
    return i[s](o[s](a));
  };
}
function iM(e, t) {
  return t
    .domain(e.domain())
    .range(e.range())
    .interpolate(e.interpolate())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function lM() {
  var e = ip,
    t = ip,
    n = Fi,
    r,
    o,
    i,
    l = sr,
    a,
    s,
    u;
  function c() {
    var d = Math.min(e.length, t.length);
    return (
      l !== sr && (l = nM(e[0], e[d - 1])),
      (a = d > 2 ? oM : rM),
      (s = u = null),
      f
    );
  }
  function f(d) {
    return d == null || isNaN((d = +d))
      ? i
      : (s || (s = a(e.map(r), t, n)))(r(l(d)));
  }
  return (
    (f.invert = function (d) {
      return l(o((u || (u = a(t, e.map(r), on)))(d)));
    }),
    (f.domain = function (d) {
      return arguments.length ? ((e = Array.from(d, tM)), c()) : e.slice();
    }),
    (f.range = function (d) {
      return arguments.length ? ((t = Array.from(d)), c()) : t.slice();
    }),
    (f.rangeRound = function (d) {
      return (t = Array.from(d)), (n = Tg), c();
    }),
    (f.clamp = function (d) {
      return arguments.length ? ((l = d ? !0 : sr), c()) : l !== sr;
    }),
    (f.interpolate = function (d) {
      return arguments.length ? ((n = d), c()) : n;
    }),
    (f.unknown = function (d) {
      return arguments.length ? ((i = d), f) : i;
    }),
    function (d, h) {
      return (r = d), (o = h), c();
    }
  );
}
function aM() {
  return lM()(sr, sr);
}
function sM(e) {
  return Math.abs((e = Math.round(e))) >= 1e21
    ? e.toLocaleString("en").replace(/,/g, "")
    : e.toString(10);
}
function ql(e, t) {
  if (
    (n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0
  )
    return null;
  var n,
    r = e.slice(0, n);
  return [r.length > 1 ? r[0] + r.slice(2) : r, +e.slice(n + 1)];
}
function Mo(e) {
  return (e = ql(Math.abs(e))), e ? e[1] : NaN;
}
function uM(e, t) {
  return function (n, r) {
    for (
      var o = n.length, i = [], l = 0, a = e[0], s = 0;
      o > 0 &&
      a > 0 &&
      (s + a + 1 > r && (a = Math.max(1, r - s)),
      i.push(n.substring((o -= a), o + a)),
      !((s += a + 1) > r));

    )
      a = e[(l = (l + 1) % e.length)];
    return i.reverse().join(t);
  };
}
function cM(e) {
  return function (t) {
    return t.replace(/[0-9]/g, function (n) {
      return e[+n];
    });
  };
}
var fM =
  /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Ul(e) {
  if (!(t = fM.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new xc({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10],
  });
}
Ul.prototype = xc.prototype;
function xc(e) {
  (this.fill = e.fill === void 0 ? " " : e.fill + ""),
    (this.align = e.align === void 0 ? ">" : e.align + ""),
    (this.sign = e.sign === void 0 ? "-" : e.sign + ""),
    (this.symbol = e.symbol === void 0 ? "" : e.symbol + ""),
    (this.zero = !!e.zero),
    (this.width = e.width === void 0 ? void 0 : +e.width),
    (this.comma = !!e.comma),
    (this.precision = e.precision === void 0 ? void 0 : +e.precision),
    (this.trim = !!e.trim),
    (this.type = e.type === void 0 ? "" : e.type + "");
}
xc.prototype.toString = function () {
  return (
    this.fill +
    this.align +
    this.sign +
    this.symbol +
    (this.zero ? "0" : "") +
    (this.width === void 0 ? "" : Math.max(1, this.width | 0)) +
    (this.comma ? "," : "") +
    (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) +
    (this.trim ? "~" : "") +
    this.type
  );
};
function dM(e) {
  e: for (var t = e.length, n = 1, r = -1, o; n < t; ++n)
    switch (e[n]) {
      case ".":
        r = o = n;
        break;
      case "0":
        r === 0 && (r = n), (o = n);
        break;
      default:
        if (!+e[n]) break e;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? e.slice(0, r) + e.slice(o + 1) : e;
}
var Og;
function pM(e, t) {
  var n = ql(e, t);
  if (!n) return e + "";
  var r = n[0],
    o = n[1],
    i = o - (Og = Math.max(-8, Math.min(8, Math.floor(o / 3))) * 3) + 1,
    l = r.length;
  return i === l
    ? r
    : i > l
    ? r + new Array(i - l + 1).join("0")
    : i > 0
    ? r.slice(0, i) + "." + r.slice(i)
    : "0." + new Array(1 - i).join("0") + ql(e, Math.max(0, t + i - 1))[0];
}
function lp(e, t) {
  var n = ql(e, t);
  if (!n) return e + "";
  var r = n[0],
    o = n[1];
  return o < 0
    ? "0." + new Array(-o).join("0") + r
    : r.length > o + 1
    ? r.slice(0, o + 1) + "." + r.slice(o + 1)
    : r + new Array(o - r.length + 2).join("0");
}
const ap = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: sM,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => lp(e * 100, t),
  r: lp,
  s: pM,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16),
};
function sp(e) {
  return e;
}
var up = Array.prototype.map,
  cp = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "\xB5",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y",
  ];
function hM(e) {
  var t =
      e.grouping === void 0 || e.thousands === void 0
        ? sp
        : uM(up.call(e.grouping, Number), e.thousands + ""),
    n = e.currency === void 0 ? "" : e.currency[0] + "",
    r = e.currency === void 0 ? "" : e.currency[1] + "",
    o = e.decimal === void 0 ? "." : e.decimal + "",
    i = e.numerals === void 0 ? sp : cM(up.call(e.numerals, String)),
    l = e.percent === void 0 ? "%" : e.percent + "",
    a = e.minus === void 0 ? "\u2212" : e.minus + "",
    s = e.nan === void 0 ? "NaN" : e.nan + "";
  function u(f) {
    f = Ul(f);
    var d = f.fill,
      h = f.align,
      p = f.sign,
      b = f.symbol,
      v = f.zero,
      _ = f.width,
      x = f.comma,
      g = f.precision,
      y = f.trim,
      w = f.type;
    w === "n"
      ? ((x = !0), (w = "g"))
      : ap[w] || (g === void 0 && (g = 12), (y = !0), (w = "g")),
      (v || (d === "0" && h === "=")) && ((v = !0), (d = "0"), (h = "="));
    var C =
        b === "$"
          ? n
          : b === "#" && /[boxX]/.test(w)
          ? "0" + w.toLowerCase()
          : "",
      E = b === "$" ? r : /[%p]/.test(w) ? l : "",
      $ = ap[w],
      I = /[defgprs%]/.test(w);
    g =
      g === void 0
        ? 6
        : /[gprs]/.test(w)
        ? Math.max(1, Math.min(21, g))
        : Math.max(0, Math.min(20, g));
    function D(P) {
      var O = C,
        S = E,
        N,
        X,
        K;
      if (w === "c") (S = $(P) + S), (P = "");
      else {
        P = +P;
        var q = P < 0 || 1 / P < 0;
        if (
          ((P = isNaN(P) ? s : $(Math.abs(P), g)),
          y && (P = dM(P)),
          q && +P == 0 && p !== "+" && (q = !1),
          (O = (q ? (p === "(" ? p : a) : p === "-" || p === "(" ? "" : p) + O),
          (S =
            (w === "s" ? cp[8 + Og / 3] : "") +
            S +
            (q && p === "(" ? ")" : "")),
          I)
        ) {
          for (N = -1, X = P.length; ++N < X; )
            if (((K = P.charCodeAt(N)), 48 > K || K > 57)) {
              (S = (K === 46 ? o + P.slice(N + 1) : P.slice(N)) + S),
                (P = P.slice(0, N));
              break;
            }
        }
      }
      x && !v && (P = t(P, 1 / 0));
      var V = O.length + P.length + S.length,
        R = V < _ ? new Array(_ - V + 1).join(d) : "";
      switch (
        (x && v && ((P = t(R + P, R.length ? _ - S.length : 1 / 0)), (R = "")),
        h)
      ) {
        case "<":
          P = O + P + S + R;
          break;
        case "=":
          P = O + R + P + S;
          break;
        case "^":
          P = R.slice(0, (V = R.length >> 1)) + O + P + S + R.slice(V);
          break;
        default:
          P = R + O + P + S;
          break;
      }
      return i(P);
    }
    return (
      (D.toString = function () {
        return f + "";
      }),
      D
    );
  }
  function c(f, d) {
    var h = u(((f = Ul(f)), (f.type = "f"), f)),
      p = Math.max(-8, Math.min(8, Math.floor(Mo(d) / 3))) * 3,
      b = Math.pow(10, -p),
      v = cp[8 + p / 3];
    return function (_) {
      return h(b * _) + v;
    };
  }
  return { format: u, formatPrefix: c };
}
var ll, Pg, Ng;
mM({ thousands: ",", grouping: [3], currency: ["$", ""] });
function mM(e) {
  return (ll = hM(e)), (Pg = ll.format), (Ng = ll.formatPrefix), ll;
}
function gM(e) {
  return Math.max(0, -Mo(Math.abs(e)));
}
function vM(e, t) {
  return Math.max(
    0,
    Math.max(-8, Math.min(8, Math.floor(Mo(t) / 3))) * 3 - Mo(Math.abs(e))
  );
}
function bM(e, t) {
  return (
    (e = Math.abs(e)), (t = Math.abs(t) - e), Math.max(0, Mo(t) - Mo(e)) + 1
  );
}
function yM(e, t, n, r) {
  var o = J$(e, t, n),
    i;
  switch (((r = Ul(r == null ? ",f" : r)), r.type)) {
    case "s": {
      var l = Math.max(Math.abs(e), Math.abs(t));
      return (
        r.precision == null && !isNaN((i = vM(o, l))) && (r.precision = i),
        Ng(r, l)
      );
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null &&
        !isNaN((i = bM(o, Math.max(Math.abs(e), Math.abs(t))))) &&
        (r.precision = i - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null &&
        !isNaN((i = gM(o))) &&
        (r.precision = i - (r.type === "%") * 2);
      break;
    }
  }
  return Pg(r);
}
function Ig(e) {
  var t = e.domain;
  return (
    (e.ticks = function (n) {
      var r = t();
      return G$(r[0], r[r.length - 1], n == null ? 10 : n);
    }),
    (e.tickFormat = function (n, r) {
      var o = t();
      return yM(o[0], o[o.length - 1], n == null ? 10 : n, r);
    }),
    (e.nice = function (n) {
      n == null && (n = 10);
      var r = t(),
        o = 0,
        i = r.length - 1,
        l = r[o],
        a = r[i],
        s,
        u,
        c = 10;
      for (
        a < l && ((u = l), (l = a), (a = u), (u = o), (o = i), (i = u));
        c-- > 0;

      ) {
        if (((u = kg(l, a, n)), u === s)) return (r[o] = l), (r[i] = a), t(r);
        if (u > 0) (l = Math.floor(l / u) * u), (a = Math.ceil(a / u) * u);
        else if (u < 0) (l = Math.ceil(l * u) / u), (a = Math.floor(a * u) / u);
        else break;
        s = u;
      }
      return e;
    }),
    e
  );
}
function _i() {
  var e = aM();
  return (
    (e.copy = function () {
      return iM(e, _i());
    }),
    Z$.apply(e, arguments),
    Ig(e)
  );
}
function wM() {
  var e = 0,
    t = 1,
    n,
    r,
    o,
    i,
    l = sr,
    a = !1,
    s;
  function u(f) {
    return f == null || isNaN((f = +f))
      ? s
      : l(
          o === 0
            ? 0.5
            : ((f = (i(f) - n) * o), a ? Math.max(0, Math.min(1, f)) : f)
        );
  }
  (u.domain = function (f) {
    return arguments.length
      ? (([e, t] = f),
        (n = i((e = +e))),
        (r = i((t = +t))),
        (o = n === r ? 0 : 1 / (r - n)),
        u)
      : [e, t];
  }),
    (u.clamp = function (f) {
      return arguments.length ? ((a = !!f), u) : a;
    }),
    (u.interpolator = function (f) {
      return arguments.length ? ((l = f), u) : l;
    });
  function c(f) {
    return function (d) {
      var h, p;
      return arguments.length ? (([h, p] = d), (l = f(h, p)), u) : [l(0), l(1)];
    };
  }
  return (
    (u.range = c(Fi)),
    (u.rangeRound = c(Tg)),
    (u.unknown = function (f) {
      return arguments.length ? ((s = f), u) : s;
    }),
    function (f) {
      return (
        (i = f), (n = f(e)), (r = f(t)), (o = n === r ? 0 : 1 / (r - n)), u
      );
    }
  );
}
function _M(e, t) {
  return t
    .domain(e.domain())
    .interpolator(e.interpolator())
    .clamp(e.clamp())
    .unknown(e.unknown());
}
function Lg() {
  var e = Ig(wM()(sr));
  return (
    (e.copy = function () {
      return _M(e, Lg());
    }),
    Q$.apply(e, arguments)
  );
}
function xM(e) {
  return e;
}
var Ga = 1,
  Sl = 2,
  Qs = 3,
  al = 4,
  fp = 1e-6;
function CM(e) {
  return "translate(" + e + ",0)";
}
function SM(e) {
  return "translate(0," + e + ")";
}
function EM(e) {
  return (t) => +e(t);
}
function TM(e, t) {
  return (
    (t = Math.max(0, e.bandwidth() - t * 2) / 2),
    e.round() && (t = Math.round(t)),
    (n) => +e(n) + t
  );
}
function $M() {
  return !this.__axis;
}
function Fg(e, t) {
  var n = [],
    r = null,
    o = null,
    i = 6,
    l = 6,
    a = 3,
    s = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5,
    u = e === Ga || e === al ? -1 : 1,
    c = e === al || e === Sl ? "x" : "y",
    f = e === Ga || e === Qs ? CM : SM;
  function d(h) {
    var p = r == null ? (t.ticks ? t.ticks.apply(t, n) : t.domain()) : r,
      b = o == null ? (t.tickFormat ? t.tickFormat.apply(t, n) : xM) : o,
      v = Math.max(i, 0) + a,
      _ = t.range(),
      x = +_[0] + s,
      g = +_[_.length - 1] + s,
      y = (t.bandwidth ? TM : EM)(t.copy(), s),
      w = h.selection ? h.selection() : h,
      C = w.selectAll(".domain").data([null]),
      E = w.selectAll(".tick").data(p, t).order(),
      $ = E.exit(),
      I = E.enter().append("g").attr("class", "tick"),
      D = E.select("line"),
      P = E.select("text");
    (C = C.merge(
      C.enter()
        .insert("path", ".tick")
        .attr("class", "domain")
        .attr("stroke", "currentColor")
    )),
      (E = E.merge(I)),
      (D = D.merge(
        I.append("line")
          .attr("stroke", "currentColor")
          .attr(c + "2", u * i)
      )),
      (P = P.merge(
        I.append("text")
          .attr("fill", "currentColor")
          .attr(c, u * v)
          .attr("dy", e === Ga ? "0em" : e === Qs ? "0.71em" : "0.32em")
      )),
      h !== w &&
        ((C = C.transition(h)),
        (E = E.transition(h)),
        (D = D.transition(h)),
        (P = P.transition(h)),
        ($ = $.transition(h)
          .attr("opacity", fp)
          .attr("transform", function (O) {
            return isFinite((O = y(O)))
              ? f(O + s)
              : this.getAttribute("transform");
          })),
        I.attr("opacity", fp).attr("transform", function (O) {
          var S = this.parentNode.__axis;
          return f((S && isFinite((S = S(O))) ? S : y(O)) + s);
        })),
      $.remove(),
      C.attr(
        "d",
        e === al || e === Sl
          ? l
            ? "M" + u * l + "," + x + "H" + s + "V" + g + "H" + u * l
            : "M" + s + "," + x + "V" + g
          : l
          ? "M" + x + "," + u * l + "V" + s + "H" + g + "V" + u * l
          : "M" + x + "," + s + "H" + g
      ),
      E.attr("opacity", 1).attr("transform", function (O) {
        return f(y(O) + s);
      }),
      D.attr(c + "2", u * i),
      P.attr(c, u * v).text(b),
      w
        .filter($M)
        .attr("fill", "none")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", e === Sl ? "start" : e === al ? "end" : "middle"),
      w.each(function () {
        this.__axis = y;
      });
  }
  return (
    (d.scale = function (h) {
      return arguments.length ? ((t = h), d) : t;
    }),
    (d.ticks = function () {
      return (n = Array.from(arguments)), d;
    }),
    (d.tickArguments = function (h) {
      return arguments.length
        ? ((n = h == null ? [] : Array.from(h)), d)
        : n.slice();
    }),
    (d.tickValues = function (h) {
      return arguments.length
        ? ((r = h == null ? null : Array.from(h)), d)
        : r && r.slice();
    }),
    (d.tickFormat = function (h) {
      return arguments.length ? ((o = h), d) : o;
    }),
    (d.tickSize = function (h) {
      return arguments.length ? ((i = l = +h), d) : i;
    }),
    (d.tickSizeInner = function (h) {
      return arguments.length ? ((i = +h), d) : i;
    }),
    (d.tickSizeOuter = function (h) {
      return arguments.length ? ((l = +h), d) : l;
    }),
    (d.tickPadding = function (h) {
      return arguments.length ? ((a = +h), d) : a;
    }),
    (d.offset = function (h) {
      return arguments.length ? ((s = +h), d) : s;
    }),
    d
  );
}
function Rg(e) {
  return Fg(Sl, e);
}
function Bg(e) {
  return Fg(Qs, e);
}
let MM = 1,
  rn = 2;
function AM(e, t, n, r) {
  let o = t.domain(),
    i = (d) => d,
    l = _i()
      .domain(t.domain())
      .range(e === rn ? [0, n] : [r, 0]),
    a = e === rn ? r : n,
    s = e === rn ? n : r;
  function u(d) {
    let p = Math.floor(s / 2),
      b = [],
      v = (s * 1) / p;
    for (let g = 0; g < p; g++) b.push(g * v);
    let _ = _i()
      .domain(e === rn ? [0, s] : [s, 0])
      .range(t.domain());
    d.selectAll("rect")
      .data(b)
      .enter()
      .append("rect")
      .attr("x", c)
      .attr("y", f)
      .attr("width", e === rn ? v : a)
      .attr("height", e === rn ? a : v)
      .style("stroke-width", "0px")
      .style("fill", function (g) {
        return t(_(g));
      });
    let x = e === rn ? Bg(l) : Rg(l);
    o == null ? (o = x.tickValues()) : x.tickValues(o),
      x.tickFormat(i),
      d
        .append("g")
        .attr("class", "colorbar axis")
        .attr("transform", "translate(" + kM(e, n, r) + ")")
        .call(x);
  }
  (u.tickValues = function (d) {
    return arguments.length ? ((o = d), u) : o;
  }),
    (u.tickFormat = function (d) {
      return arguments.length ? ((i = d), u) : i;
    });
  function c(d, h) {
    return e === rn ? d : 0;
  }
  function f(d, h) {
    return e === rn ? 0 : d;
  }
  return u;
}
function kM(e, t, n) {
  let r = e === rn ? 0 : t,
    o = e === rn ? n : 0;
  return r + "," + o;
}
function OM(e, t, n) {
  return AM(MM, e, t, n);
}
var eu = "http://www.w3.org/1999/xhtml";
const dp = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: eu,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
function Sa(e) {
  var t = (e += ""),
    n = t.indexOf(":");
  return (
    n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)),
    dp.hasOwnProperty(t) ? { space: dp[t], local: e } : e
  );
}
function PM(e) {
  return function () {
    var t = this.ownerDocument,
      n = this.namespaceURI;
    return n === eu && t.documentElement.namespaceURI === eu
      ? t.createElement(e)
      : t.createElementNS(n, e);
  };
}
function NM(e) {
  return function () {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Vg(e) {
  var t = Sa(e);
  return (t.local ? NM : PM)(t);
}
function IM() {}
function Cc(e) {
  return e == null
    ? IM
    : function () {
        return this.querySelector(e);
      };
}
function LM(e) {
  typeof e != "function" && (e = Cc(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (
      var i = t[o], l = i.length, a = (r[o] = new Array(l)), s, u, c = 0;
      c < l;
      ++c
    )
      (s = i[c]) &&
        (u = e.call(s, s.__data__, c, i)) &&
        ("__data__" in s && (u.__data__ = s.__data__), (a[c] = u));
  return new At(r, this._parents);
}
function Dg(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function FM() {
  return [];
}
function Hg(e) {
  return e == null
    ? FM
    : function () {
        return this.querySelectorAll(e);
      };
}
function RM(e) {
  return function () {
    return Dg(e.apply(this, arguments));
  };
}
function BM(e) {
  typeof e == "function" ? (e = RM(e)) : (e = Hg(e));
  for (var t = this._groups, n = t.length, r = [], o = [], i = 0; i < n; ++i)
    for (var l = t[i], a = l.length, s, u = 0; u < a; ++u)
      (s = l[u]) && (r.push(e.call(s, s.__data__, u, l)), o.push(s));
  return new At(r, o);
}
function zg(e) {
  return function () {
    return this.matches(e);
  };
}
function Wg(e) {
  return function (t) {
    return t.matches(e);
  };
}
var VM = Array.prototype.find;
function DM(e) {
  return function () {
    return VM.call(this.children, e);
  };
}
function HM() {
  return this.firstElementChild;
}
function zM(e) {
  return this.select(e == null ? HM : DM(typeof e == "function" ? e : Wg(e)));
}
var WM = Array.prototype.filter;
function jM() {
  return Array.from(this.children);
}
function KM(e) {
  return function () {
    return WM.call(this.children, e);
  };
}
function qM(e) {
  return this.selectAll(
    e == null ? jM : KM(typeof e == "function" ? e : Wg(e))
  );
}
function UM(e) {
  typeof e != "function" && (e = zg(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = t[o], l = i.length, a = (r[o] = []), s, u = 0; u < l; ++u)
      (s = i[u]) && e.call(s, s.__data__, u, i) && a.push(s);
  return new At(r, this._parents);
}
function jg(e) {
  return new Array(e.length);
}
function YM() {
  return new At(this._enter || this._groups.map(jg), this._parents);
}
function Yl(e, t) {
  (this.ownerDocument = e.ownerDocument),
    (this.namespaceURI = e.namespaceURI),
    (this._next = null),
    (this._parent = e),
    (this.__data__ = t);
}
Yl.prototype = {
  constructor: Yl,
  appendChild: function (e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function (e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function (e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function (e) {
    return this._parent.querySelectorAll(e);
  },
};
function XM(e) {
  return function () {
    return e;
  };
}
function GM(e, t, n, r, o, i) {
  for (var l = 0, a, s = t.length, u = i.length; l < u; ++l)
    (a = t[l]) ? ((a.__data__ = i[l]), (r[l] = a)) : (n[l] = new Yl(e, i[l]));
  for (; l < s; ++l) (a = t[l]) && (o[l] = a);
}
function JM(e, t, n, r, o, i, l) {
  var a,
    s,
    u = new Map(),
    c = t.length,
    f = i.length,
    d = new Array(c),
    h;
  for (a = 0; a < c; ++a)
    (s = t[a]) &&
      ((d[a] = h = l.call(s, s.__data__, a, t) + ""),
      u.has(h) ? (o[a] = s) : u.set(h, s));
  for (a = 0; a < f; ++a)
    (h = l.call(e, i[a], a, i) + ""),
      (s = u.get(h))
        ? ((r[a] = s), (s.__data__ = i[a]), u.delete(h))
        : (n[a] = new Yl(e, i[a]));
  for (a = 0; a < c; ++a) (s = t[a]) && u.get(d[a]) === s && (o[a] = s);
}
function ZM(e) {
  return e.__data__;
}
function QM(e, t) {
  if (!arguments.length) return Array.from(this, ZM);
  var n = t ? JM : GM,
    r = this._parents,
    o = this._groups;
  typeof e != "function" && (e = XM(e));
  for (
    var i = o.length,
      l = new Array(i),
      a = new Array(i),
      s = new Array(i),
      u = 0;
    u < i;
    ++u
  ) {
    var c = r[u],
      f = o[u],
      d = f.length,
      h = eA(e.call(c, c && c.__data__, u, r)),
      p = h.length,
      b = (a[u] = new Array(p)),
      v = (l[u] = new Array(p)),
      _ = (s[u] = new Array(d));
    n(c, f, b, v, _, h, t);
    for (var x = 0, g = 0, y, w; x < p; ++x)
      if ((y = b[x])) {
        for (x >= g && (g = x + 1); !(w = v[g]) && ++g < p; );
        y._next = w || null;
      }
  }
  return (l = new At(l, r)), (l._enter = a), (l._exit = s), l;
}
function eA(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function tA() {
  return new At(this._exit || this._groups.map(jg), this._parents);
}
function nA(e, t, n) {
  var r = this.enter(),
    o = this,
    i = this.exit();
  return (
    typeof e == "function"
      ? ((r = e(r)), r && (r = r.selection()))
      : (r = r.append(e + "")),
    t != null && ((o = t(o)), o && (o = o.selection())),
    n == null ? i.remove() : n(i),
    r && o ? r.merge(o).order() : o
  );
}
function rA(e) {
  for (
    var t = e.selection ? e.selection() : e,
      n = this._groups,
      r = t._groups,
      o = n.length,
      i = r.length,
      l = Math.min(o, i),
      a = new Array(o),
      s = 0;
    s < l;
    ++s
  )
    for (
      var u = n[s], c = r[s], f = u.length, d = (a[s] = new Array(f)), h, p = 0;
      p < f;
      ++p
    )
      (h = u[p] || c[p]) && (d[p] = h);
  for (; s < o; ++s) a[s] = n[s];
  return new At(a, this._parents);
}
function oA() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], o = r.length - 1, i = r[o], l; --o >= 0; )
      (l = r[o]) &&
        (i &&
          l.compareDocumentPosition(i) ^ 4 &&
          i.parentNode.insertBefore(l, i),
        (i = l));
  return this;
}
function iA(e) {
  e || (e = lA);
  function t(f, d) {
    return f && d ? e(f.__data__, d.__data__) : !f - !d;
  }
  for (
    var n = this._groups, r = n.length, o = new Array(r), i = 0;
    i < r;
    ++i
  ) {
    for (
      var l = n[i], a = l.length, s = (o[i] = new Array(a)), u, c = 0;
      c < a;
      ++c
    )
      (u = l[c]) && (s[c] = u);
    s.sort(t);
  }
  return new At(o, this._parents).order();
}
function lA(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function aA() {
  var e = arguments[0];
  return (arguments[0] = this), e.apply(null, arguments), this;
}
function sA() {
  return Array.from(this);
}
function uA() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], o = 0, i = r.length; o < i; ++o) {
      var l = r[o];
      if (l) return l;
    }
  return null;
}
function cA() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function fA() {
  return !this.node();
}
function dA(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var o = t[n], i = 0, l = o.length, a; i < l; ++i)
      (a = o[i]) && e.call(a, a.__data__, i, o);
  return this;
}
function pA(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function hA(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function mA(e, t) {
  return function () {
    this.setAttribute(e, t);
  };
}
function gA(e, t) {
  return function () {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function vA(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function bA(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null
      ? this.removeAttributeNS(e.space, e.local)
      : this.setAttributeNS(e.space, e.local, n);
  };
}
function yA(e, t) {
  var n = Sa(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each(
    (t == null
      ? n.local
        ? hA
        : pA
      : typeof t == "function"
      ? n.local
        ? bA
        : vA
      : n.local
      ? gA
      : mA)(n, t)
  );
}
function Kg(e) {
  return (
    (e.ownerDocument && e.ownerDocument.defaultView) ||
    (e.document && e) ||
    e.defaultView
  );
}
function wA(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function _A(e, t, n) {
  return function () {
    this.style.setProperty(e, t, n);
  };
}
function xA(e, t, n) {
  return function () {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function CA(e, t, n) {
  return arguments.length > 1
    ? this.each(
        (t == null ? wA : typeof t == "function" ? xA : _A)(
          e,
          t,
          n == null ? "" : n
        )
      )
    : Ao(this.node(), e);
}
function Ao(e, t) {
  return (
    e.style.getPropertyValue(t) ||
    Kg(e).getComputedStyle(e, null).getPropertyValue(t)
  );
}
function SA(e) {
  return function () {
    delete this[e];
  };
}
function EA(e, t) {
  return function () {
    this[e] = t;
  };
}
function TA(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : (this[e] = n);
  };
}
function $A(e, t) {
  return arguments.length > 1
    ? this.each((t == null ? SA : typeof t == "function" ? TA : EA)(e, t))
    : this.node()[e];
}
function qg(e) {
  return e.trim().split(/^|\s+/);
}
function Sc(e) {
  return e.classList || new Ug(e);
}
function Ug(e) {
  (this._node = e), (this._names = qg(e.getAttribute("class") || ""));
}
Ug.prototype = {
  add: function (e) {
    var t = this._names.indexOf(e);
    t < 0 &&
      (this._names.push(e),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function (e) {
    var t = this._names.indexOf(e);
    t >= 0 &&
      (this._names.splice(t, 1),
      this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function (e) {
    return this._names.indexOf(e) >= 0;
  },
};
function Yg(e, t) {
  for (var n = Sc(e), r = -1, o = t.length; ++r < o; ) n.add(t[r]);
}
function Xg(e, t) {
  for (var n = Sc(e), r = -1, o = t.length; ++r < o; ) n.remove(t[r]);
}
function MA(e) {
  return function () {
    Yg(this, e);
  };
}
function AA(e) {
  return function () {
    Xg(this, e);
  };
}
function kA(e, t) {
  return function () {
    (t.apply(this, arguments) ? Yg : Xg)(this, e);
  };
}
function OA(e, t) {
  var n = qg(e + "");
  if (arguments.length < 2) {
    for (var r = Sc(this.node()), o = -1, i = n.length; ++o < i; )
      if (!r.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? kA : t ? MA : AA)(n, t));
}
function PA() {
  this.textContent = "";
}
function NA(e) {
  return function () {
    this.textContent = e;
  };
}
function IA(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.textContent = t == null ? "" : t;
  };
}
function LA(e) {
  return arguments.length
    ? this.each(e == null ? PA : (typeof e == "function" ? IA : NA)(e))
    : this.node().textContent;
}
function FA() {
  this.innerHTML = "";
}
function RA(e) {
  return function () {
    this.innerHTML = e;
  };
}
function BA(e) {
  return function () {
    var t = e.apply(this, arguments);
    this.innerHTML = t == null ? "" : t;
  };
}
function VA(e) {
  return arguments.length
    ? this.each(e == null ? FA : (typeof e == "function" ? BA : RA)(e))
    : this.node().innerHTML;
}
function DA() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function HA() {
  return this.each(DA);
}
function zA() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function WA() {
  return this.each(zA);
}
function jA(e) {
  var t = typeof e == "function" ? e : Vg(e);
  return this.select(function () {
    return this.appendChild(t.apply(this, arguments));
  });
}
function KA() {
  return null;
}
function qA(e, t) {
  var n = typeof e == "function" ? e : Vg(e),
    r = t == null ? KA : typeof t == "function" ? t : Cc(t);
  return this.select(function () {
    return this.insertBefore(
      n.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function UA() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function YA() {
  return this.each(UA);
}
function XA() {
  var e = this.cloneNode(!1),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function GA() {
  var e = this.cloneNode(!0),
    t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function JA(e) {
  return this.select(e ? GA : XA);
}
function ZA(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function QA(e) {
  return function (t) {
    e.call(this, t, this.__data__);
  };
}
function ek(e) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (t) {
      var n = "",
        r = t.indexOf(".");
      return (
        r >= 0 && ((n = t.slice(r + 1)), (t = t.slice(0, r))),
        { type: t, name: n }
      );
    });
}
function tk(e) {
  return function () {
    var t = this.__on;
    if (!!t) {
      for (var n = 0, r = -1, o = t.length, i; n < o; ++n)
        (i = t[n]),
          (!e.type || i.type === e.type) && i.name === e.name
            ? this.removeEventListener(i.type, i.listener, i.options)
            : (t[++r] = i);
      ++r ? (t.length = r) : delete this.__on;
    }
  };
}
function nk(e, t, n) {
  return function () {
    var r = this.__on,
      o,
      i = QA(t);
    if (r) {
      for (var l = 0, a = r.length; l < a; ++l)
        if ((o = r[l]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options),
            this.addEventListener(o.type, (o.listener = i), (o.options = n)),
            (o.value = t);
          return;
        }
    }
    this.addEventListener(e.type, i, n),
      (o = { type: e.type, name: e.name, value: t, listener: i, options: n }),
      r ? r.push(o) : (this.__on = [o]);
  };
}
function rk(e, t, n) {
  var r = ek(e + ""),
    o,
    i = r.length,
    l;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var s = 0, u = a.length, c; s < u; ++s)
        for (o = 0, c = a[s]; o < i; ++o)
          if ((l = r[o]).type === c.type && l.name === c.name) return c.value;
    }
    return;
  }
  for (a = t ? nk : tk, o = 0; o < i; ++o) this.each(a(r[o], t, n));
  return this;
}
function Gg(e, t, n) {
  var r = Kg(e),
    o = r.CustomEvent;
  typeof o == "function"
    ? (o = new o(t, n))
    : ((o = r.document.createEvent("Event")),
      n
        ? (o.initEvent(t, n.bubbles, n.cancelable), (o.detail = n.detail))
        : o.initEvent(t, !1, !1)),
    e.dispatchEvent(o);
}
function ok(e, t) {
  return function () {
    return Gg(this, e, t);
  };
}
function ik(e, t) {
  return function () {
    return Gg(this, e, t.apply(this, arguments));
  };
}
function lk(e, t) {
  return this.each((typeof t == "function" ? ik : ok)(e, t));
}
function* ak() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], o = 0, i = r.length, l; o < i; ++o)
      (l = r[o]) && (yield l);
}
var Ec = [null];
function At(e, t) {
  (this._groups = e), (this._parents = t);
}
function Ri() {
  return new At([[document.documentElement]], Ec);
}
function sk() {
  return this;
}
At.prototype = Ri.prototype = {
  constructor: At,
  select: LM,
  selectAll: BM,
  selectChild: zM,
  selectChildren: qM,
  filter: UM,
  data: QM,
  enter: YM,
  exit: tA,
  join: nA,
  merge: rA,
  selection: sk,
  order: oA,
  sort: iA,
  call: aA,
  nodes: sA,
  node: uA,
  size: cA,
  empty: fA,
  each: dA,
  attr: yA,
  style: CA,
  property: $A,
  classed: OA,
  text: LA,
  html: VA,
  raise: HA,
  lower: WA,
  append: jA,
  insert: qA,
  remove: YA,
  clone: JA,
  datum: ZA,
  on: rk,
  dispatch: lk,
  [Symbol.iterator]: ak,
};
function st(e) {
  return typeof e == "string"
    ? new At([[document.querySelector(e)]], [document.documentElement])
    : new At([[e]], Ec);
}
function uk(e) {
  let t;
  for (; (t = e.sourceEvent); ) e = t;
  return e;
}
function Xl(e, t) {
  if (((e = uk(e)), t === void 0 && (t = e.currentTarget), t)) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return (
        (r.x = e.clientX),
        (r.y = e.clientY),
        (r = r.matrixTransform(t.getScreenCTM().inverse())),
        [r.x, r.y]
      );
    }
    if (t.getBoundingClientRect) {
      var o = t.getBoundingClientRect();
      return [
        e.clientX - o.left - t.clientLeft,
        e.clientY - o.top - t.clientTop,
      ];
    }
  }
  return [e.pageX, e.pageY];
}
function ck(e) {
  return typeof e == "string"
    ? new At([document.querySelectorAll(e)], [document.documentElement])
    : new At([Dg(e)], Ec);
}
var fk = { value: () => {} };
function Ea() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new El(n);
}
function El(e) {
  this._ = e;
}
function dk(e, t) {
  return e
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var r = "",
        o = n.indexOf(".");
      if (
        (o >= 0 && ((r = n.slice(o + 1)), (n = n.slice(0, o))),
        n && !t.hasOwnProperty(n))
      )
        throw new Error("unknown type: " + n);
      return { type: n, name: r };
    });
}
El.prototype = Ea.prototype = {
  constructor: El,
  on: function (e, t) {
    var n = this._,
      r = dk(e + "", n),
      o,
      i = -1,
      l = r.length;
    if (arguments.length < 2) {
      for (; ++i < l; )
        if ((o = (e = r[i]).type) && (o = pk(n[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++i < l; )
      if ((o = (e = r[i]).type)) n[o] = pp(n[o], e.name, t);
      else if (t == null) for (o in n) n[o] = pp(n[o], e.name, null);
    return this;
  },
  copy: function () {
    var e = {},
      t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new El(e);
  },
  call: function (e, t) {
    if ((o = arguments.length - 2) > 0)
      for (var n = new Array(o), r = 0, o, i; r < o; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (i = this._[e], r = 0, o = i.length; r < o; ++r) i[r].value.apply(t, n);
  },
  apply: function (e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var r = this._[e], o = 0, i = r.length; o < i; ++o)
      r[o].value.apply(t, n);
  },
};
function pk(e, t) {
  for (var n = 0, r = e.length, o; n < r; ++n)
    if ((o = e[n]).name === t) return o.value;
}
function pp(e, t, n) {
  for (var r = 0, o = e.length; r < o; ++r)
    if (e[r].name === t) {
      (e[r] = fk), (e = e.slice(0, r).concat(e.slice(r + 1)));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const hk = { passive: !1 },
  xi = { capture: !0, passive: !1 };
function Ja(e) {
  e.stopImmediatePropagation();
}
function po(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Jg(e) {
  var t = e.document.documentElement,
    n = st(e).on("dragstart.drag", po, xi);
  "onselectstart" in t
    ? n.on("selectstart.drag", po, xi)
    : ((t.__noselect = t.style.MozUserSelect),
      (t.style.MozUserSelect = "none"));
}
function Zg(e, t) {
  var n = e.document.documentElement,
    r = st(e).on("dragstart.drag", null);
  t &&
    (r.on("click.drag", po, xi),
    setTimeout(function () {
      r.on("click.drag", null);
    }, 0)),
    "onselectstart" in n
      ? r.on("selectstart.drag", null)
      : ((n.style.MozUserSelect = n.__noselect), delete n.__noselect);
}
const sl = (e) => () => e;
function tu(
  e,
  {
    sourceEvent: t,
    subject: n,
    target: r,
    identifier: o,
    active: i,
    x: l,
    y: a,
    dx: s,
    dy: u,
    dispatch: c,
  }
) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: o, enumerable: !0, configurable: !0 },
    active: { value: i, enumerable: !0, configurable: !0 },
    x: { value: l, enumerable: !0, configurable: !0 },
    y: { value: a, enumerable: !0, configurable: !0 },
    dx: { value: s, enumerable: !0, configurable: !0 },
    dy: { value: u, enumerable: !0, configurable: !0 },
    _: { value: c },
  });
}
tu.prototype.on = function () {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function mk(e) {
  return !e.ctrlKey && !e.button;
}
function gk() {
  return this.parentNode;
}
function vk(e, t) {
  return t == null ? { x: e.x, y: e.y } : t;
}
function bk() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function yk() {
  var e = mk,
    t = gk,
    n = vk,
    r = bk,
    o = {},
    i = Ea("start", "drag", "end"),
    l = 0,
    a,
    s,
    u,
    c,
    f = 0;
  function d(y) {
    y.on("mousedown.drag", h)
      .filter(r)
      .on("touchstart.drag", v)
      .on("touchmove.drag", _, hk)
      .on("touchend.drag touchcancel.drag", x)
      .style("touch-action", "none")
      .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(y, w) {
    if (!(c || !e.call(this, y, w))) {
      var C = g(this, t.call(this, y, w), y, w, "mouse");
      !C ||
        (st(y.view).on("mousemove.drag", p, xi).on("mouseup.drag", b, xi),
        Jg(y.view),
        Ja(y),
        (u = !1),
        (a = y.clientX),
        (s = y.clientY),
        C("start", y));
    }
  }
  function p(y) {
    if ((po(y), !u)) {
      var w = y.clientX - a,
        C = y.clientY - s;
      u = w * w + C * C > f;
    }
    o.mouse("drag", y);
  }
  function b(y) {
    st(y.view).on("mousemove.drag mouseup.drag", null),
      Zg(y.view, u),
      po(y),
      o.mouse("end", y);
  }
  function v(y, w) {
    if (!!e.call(this, y, w)) {
      var C = y.changedTouches,
        E = t.call(this, y, w),
        $ = C.length,
        I,
        D;
      for (I = 0; I < $; ++I)
        (D = g(this, E, y, w, C[I].identifier, C[I])) &&
          (Ja(y), D("start", y, C[I]));
    }
  }
  function _(y) {
    var w = y.changedTouches,
      C = w.length,
      E,
      $;
    for (E = 0; E < C; ++E)
      ($ = o[w[E].identifier]) && (po(y), $("drag", y, w[E]));
  }
  function x(y) {
    var w = y.changedTouches,
      C = w.length,
      E,
      $;
    for (
      c && clearTimeout(c),
        c = setTimeout(function () {
          c = null;
        }, 500),
        E = 0;
      E < C;
      ++E
    )
      ($ = o[w[E].identifier]) && (Ja(y), $("end", y, w[E]));
  }
  function g(y, w, C, E, $, I) {
    var D = i.copy(),
      P = Xl(I || C, w),
      O,
      S,
      N;
    if (
      (N = n.call(
        y,
        new tu("beforestart", {
          sourceEvent: C,
          target: d,
          identifier: $,
          active: l,
          x: P[0],
          y: P[1],
          dx: 0,
          dy: 0,
          dispatch: D,
        }),
        E
      )) != null
    )
      return (
        (O = N.x - P[0] || 0),
        (S = N.y - P[1] || 0),
        function X(K, q, V) {
          var R = P,
            ne;
          switch (K) {
            case "start":
              (o[$] = X), (ne = l++);
              break;
            case "end":
              delete o[$], --l;
            case "drag":
              (P = Xl(V || q, w)), (ne = l);
              break;
          }
          D.call(
            K,
            y,
            new tu(K, {
              sourceEvent: q,
              subject: N,
              target: d,
              identifier: $,
              active: ne,
              x: P[0] + O,
              y: P[1] + S,
              dx: P[0] - R[0],
              dy: P[1] - R[1],
              dispatch: D,
            }),
            E
          );
        }
      );
  }
  return (
    (d.filter = function (y) {
      return arguments.length
        ? ((e = typeof y == "function" ? y : sl(!!y)), d)
        : e;
    }),
    (d.container = function (y) {
      return arguments.length
        ? ((t = typeof y == "function" ? y : sl(y)), d)
        : t;
    }),
    (d.subject = function (y) {
      return arguments.length
        ? ((n = typeof y == "function" ? y : sl(y)), d)
        : n;
    }),
    (d.touchable = function (y) {
      return arguments.length
        ? ((r = typeof y == "function" ? y : sl(!!y)), d)
        : r;
    }),
    (d.on = function () {
      var y = i.on.apply(i, arguments);
      return y === i ? d : y;
    }),
    (d.clickDistance = function (y) {
      return arguments.length ? ((f = (y = +y) * y), d) : Math.sqrt(f);
    }),
    d
  );
}
var ko = 0,
  qo = 0,
  zo = 0,
  Qg = 1e3,
  Gl,
  Uo,
  Jl = 0,
  jr = 0,
  Ta = 0,
  Ci = typeof performance == "object" && performance.now ? performance : Date,
  ev =
    typeof window == "object" && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (e) {
          setTimeout(e, 17);
        };
function Tc() {
  return jr || (ev(wk), (jr = Ci.now() + Ta));
}
function wk() {
  jr = 0;
}
function Zl() {
  this._call = this._time = this._next = null;
}
Zl.prototype = tv.prototype = {
  constructor: Zl,
  restart: function (e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    (n = (n == null ? Tc() : +n) + (t == null ? 0 : +t)),
      !this._next &&
        Uo !== this &&
        (Uo ? (Uo._next = this) : (Gl = this), (Uo = this)),
      (this._call = e),
      (this._time = n),
      nu();
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), nu());
  },
};
function tv(e, t, n) {
  var r = new Zl();
  return r.restart(e, t, n), r;
}
function _k() {
  Tc(), ++ko;
  for (var e = Gl, t; e; )
    (t = jr - e._time) >= 0 && e._call.call(void 0, t), (e = e._next);
  --ko;
}
function hp() {
  (jr = (Jl = Ci.now()) + Ta), (ko = qo = 0);
  try {
    _k();
  } finally {
    (ko = 0), Ck(), (jr = 0);
  }
}
function xk() {
  var e = Ci.now(),
    t = e - Jl;
  t > Qg && ((Ta -= t), (Jl = e));
}
function Ck() {
  for (var e, t = Gl, n, r = 1 / 0; t; )
    t._call
      ? (r > t._time && (r = t._time), (e = t), (t = t._next))
      : ((n = t._next), (t._next = null), (t = e ? (e._next = n) : (Gl = n)));
  (Uo = e), nu(r);
}
function nu(e) {
  if (!ko) {
    qo && (qo = clearTimeout(qo));
    var t = e - jr;
    t > 24
      ? (e < 1 / 0 && (qo = setTimeout(hp, e - Ci.now() - Ta)),
        zo && (zo = clearInterval(zo)))
      : (zo || ((Jl = Ci.now()), (zo = setInterval(xk, Qg))), (ko = 1), ev(hp));
  }
}
function mp(e, t, n) {
  var r = new Zl();
  return (
    (t = t == null ? 0 : +t),
    r.restart(
      (o) => {
        r.stop(), e(o + t);
      },
      t,
      n
    ),
    r
  );
}
var Sk = Ea("start", "end", "cancel", "interrupt"),
  Ek = [],
  nv = 0,
  gp = 1,
  ru = 2,
  Tl = 3,
  vp = 4,
  ou = 5,
  $l = 6;
function $a(e, t, n, r, o, i) {
  var l = e.__transition;
  if (!l) e.__transition = {};
  else if (n in l) return;
  Tk(e, n, {
    name: t,
    index: r,
    group: o,
    on: Sk,
    tween: Ek,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: nv,
  });
}
function $c(e, t) {
  var n = gn(e, t);
  if (n.state > nv) throw new Error("too late; already scheduled");
  return n;
}
function Nn(e, t) {
  var n = gn(e, t);
  if (n.state > Tl) throw new Error("too late; already running");
  return n;
}
function gn(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Tk(e, t, n) {
  var r = e.__transition,
    o;
  (r[t] = n), (n.timer = tv(i, 0, n.time));
  function i(u) {
    (n.state = gp),
      n.timer.restart(l, n.delay, n.time),
      n.delay <= u && l(u - n.delay);
  }
  function l(u) {
    var c, f, d, h;
    if (n.state !== gp) return s();
    for (c in r)
      if (((h = r[c]), h.name === n.name)) {
        if (h.state === Tl) return mp(l);
        h.state === vp
          ? ((h.state = $l),
            h.timer.stop(),
            h.on.call("interrupt", e, e.__data__, h.index, h.group),
            delete r[c])
          : +c < t &&
            ((h.state = $l),
            h.timer.stop(),
            h.on.call("cancel", e, e.__data__, h.index, h.group),
            delete r[c]);
      }
    if (
      (mp(function () {
        n.state === Tl &&
          ((n.state = vp), n.timer.restart(a, n.delay, n.time), a(u));
      }),
      (n.state = ru),
      n.on.call("start", e, e.__data__, n.index, n.group),
      n.state === ru)
    ) {
      for (
        n.state = Tl, o = new Array((d = n.tween.length)), c = 0, f = -1;
        c < d;
        ++c
      )
        (h = n.tween[c].value.call(e, e.__data__, n.index, n.group)) &&
          (o[++f] = h);
      o.length = f + 1;
    }
  }
  function a(u) {
    for (
      var c =
          u < n.duration
            ? n.ease.call(null, u / n.duration)
            : (n.timer.restart(s), (n.state = ou), 1),
        f = -1,
        d = o.length;
      ++f < d;

    )
      o[f].call(e, c);
    n.state === ou && (n.on.call("end", e, e.__data__, n.index, n.group), s());
  }
  function s() {
    (n.state = $l), n.timer.stop(), delete r[t];
    for (var u in r) return;
    delete e.__transition;
  }
}
function iu(e, t) {
  var n = e.__transition,
    r,
    o,
    i = !0,
    l;
  if (!!n) {
    t = t == null ? null : t + "";
    for (l in n) {
      if ((r = n[l]).name !== t) {
        i = !1;
        continue;
      }
      (o = r.state > ru && r.state < ou),
        (r.state = $l),
        r.timer.stop(),
        r.on.call(o ? "interrupt" : "cancel", e, e.__data__, r.index, r.group),
        delete n[l];
    }
    i && delete e.__transition;
  }
}
function $k(e) {
  return this.each(function () {
    iu(this, e);
  });
}
function Mk(e, t) {
  var n, r;
  return function () {
    var o = Nn(this, e),
      i = o.tween;
    if (i !== n) {
      r = n = i;
      for (var l = 0, a = r.length; l < a; ++l)
        if (r[l].name === t) {
          (r = r.slice()), r.splice(l, 1);
          break;
        }
    }
    o.tween = r;
  };
}
function Ak(e, t, n) {
  var r, o;
  if (typeof n != "function") throw new Error();
  return function () {
    var i = Nn(this, e),
      l = i.tween;
    if (l !== r) {
      o = (r = l).slice();
      for (var a = { name: t, value: n }, s = 0, u = o.length; s < u; ++s)
        if (o[s].name === t) {
          o[s] = a;
          break;
        }
      s === u && o.push(a);
    }
    i.tween = o;
  };
}
function kk(e, t) {
  var n = this._id;
  if (((e += ""), arguments.length < 2)) {
    for (var r = gn(this.node(), n).tween, o = 0, i = r.length, l; o < i; ++o)
      if ((l = r[o]).name === e) return l.value;
    return null;
  }
  return this.each((t == null ? Mk : Ak)(n, e, t));
}
function Mc(e, t, n) {
  var r = e._id;
  return (
    e.each(function () {
      var o = Nn(this, r);
      (o.value || (o.value = {}))[t] = n.apply(this, arguments);
    }),
    function (o) {
      return gn(o, r).value[t];
    }
  );
}
function rv(e, t) {
  var n;
  return (
    typeof t == "number"
      ? on
      : t instanceof Wr
      ? Kl
      : (n = Wr(t))
      ? ((t = n), Kl)
      : Eg
  )(e, t);
}
function Ok(e) {
  return function () {
    this.removeAttribute(e);
  };
}
function Pk(e) {
  return function () {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Nk(e, t, n) {
  var r,
    o = n + "",
    i;
  return function () {
    var l = this.getAttribute(e);
    return l === o ? null : l === r ? i : (i = t((r = l), n));
  };
}
function Ik(e, t, n) {
  var r,
    o = n + "",
    i;
  return function () {
    var l = this.getAttributeNS(e.space, e.local);
    return l === o ? null : l === r ? i : (i = t((r = l), n));
  };
}
function Lk(e, t, n) {
  var r, o, i;
  return function () {
    var l,
      a = n(this),
      s;
    return a == null
      ? void this.removeAttribute(e)
      : ((l = this.getAttribute(e)),
        (s = a + ""),
        l === s
          ? null
          : l === r && s === o
          ? i
          : ((o = s), (i = t((r = l), a))));
  };
}
function Fk(e, t, n) {
  var r, o, i;
  return function () {
    var l,
      a = n(this),
      s;
    return a == null
      ? void this.removeAttributeNS(e.space, e.local)
      : ((l = this.getAttributeNS(e.space, e.local)),
        (s = a + ""),
        l === s
          ? null
          : l === r && s === o
          ? i
          : ((o = s), (i = t((r = l), a))));
  };
}
function Rk(e, t) {
  var n = Sa(e),
    r = n === "transform" ? C$ : rv;
  return this.attrTween(
    e,
    typeof t == "function"
      ? (n.local ? Fk : Lk)(n, r, Mc(this, "attr." + e, t))
      : t == null
      ? (n.local ? Pk : Ok)(n)
      : (n.local ? Ik : Nk)(n, r, t)
  );
}
function Bk(e, t) {
  return function (n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Vk(e, t) {
  return function (n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Dk(e, t) {
  var n, r;
  function o() {
    var i = t.apply(this, arguments);
    return i !== r && (n = (r = i) && Vk(e, i)), n;
  }
  return (o._value = t), o;
}
function Hk(e, t) {
  var n, r;
  function o() {
    var i = t.apply(this, arguments);
    return i !== r && (n = (r = i) && Bk(e, i)), n;
  }
  return (o._value = t), o;
}
function zk(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var r = Sa(e);
  return this.tween(n, (r.local ? Dk : Hk)(r, t));
}
function Wk(e, t) {
  return function () {
    $c(this, e).delay = +t.apply(this, arguments);
  };
}
function jk(e, t) {
  return (
    (t = +t),
    function () {
      $c(this, e).delay = t;
    }
  );
}
function Kk(e) {
  var t = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? Wk : jk)(t, e))
    : gn(this.node(), t).delay;
}
function qk(e, t) {
  return function () {
    Nn(this, e).duration = +t.apply(this, arguments);
  };
}
function Uk(e, t) {
  return (
    (t = +t),
    function () {
      Nn(this, e).duration = t;
    }
  );
}
function Yk(e) {
  var t = this._id;
  return arguments.length
    ? this.each((typeof e == "function" ? qk : Uk)(t, e))
    : gn(this.node(), t).duration;
}
function Xk(e, t) {
  if (typeof t != "function") throw new Error();
  return function () {
    Nn(this, e).ease = t;
  };
}
function Gk(e) {
  var t = this._id;
  return arguments.length ? this.each(Xk(t, e)) : gn(this.node(), t).ease;
}
function Jk(e, t) {
  return function () {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Nn(this, e).ease = n;
  };
}
function Zk(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Jk(this._id, e));
}
function Qk(e) {
  typeof e != "function" && (e = zg(e));
  for (var t = this._groups, n = t.length, r = new Array(n), o = 0; o < n; ++o)
    for (var i = t[o], l = i.length, a = (r[o] = []), s, u = 0; u < l; ++u)
      (s = i[u]) && e.call(s, s.__data__, u, i) && a.push(s);
  return new Un(r, this._parents, this._name, this._id);
}
function eO(e) {
  if (e._id !== this._id) throw new Error();
  for (
    var t = this._groups,
      n = e._groups,
      r = t.length,
      o = n.length,
      i = Math.min(r, o),
      l = new Array(r),
      a = 0;
    a < i;
    ++a
  )
    for (
      var s = t[a], u = n[a], c = s.length, f = (l[a] = new Array(c)), d, h = 0;
      h < c;
      ++h
    )
      (d = s[h] || u[h]) && (f[h] = d);
  for (; a < r; ++a) l[a] = t[a];
  return new Un(l, this._parents, this._name, this._id);
}
function tO(e) {
  return (e + "")
    .trim()
    .split(/^|\s+/)
    .every(function (t) {
      var n = t.indexOf(".");
      return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
    });
}
function nO(e, t, n) {
  var r,
    o,
    i = tO(t) ? $c : Nn;
  return function () {
    var l = i(this, e),
      a = l.on;
    a !== r && (o = (r = a).copy()).on(t, n), (l.on = o);
  };
}
function rO(e, t) {
  var n = this._id;
  return arguments.length < 2
    ? gn(this.node(), n).on.on(e)
    : this.each(nO(n, e, t));
}
function oO(e) {
  return function () {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function iO() {
  return this.on("end.remove", oO(this._id));
}
function lO(e) {
  var t = this._name,
    n = this._id;
  typeof e != "function" && (e = Cc(e));
  for (var r = this._groups, o = r.length, i = new Array(o), l = 0; l < o; ++l)
    for (
      var a = r[l], s = a.length, u = (i[l] = new Array(s)), c, f, d = 0;
      d < s;
      ++d
    )
      (c = a[d]) &&
        (f = e.call(c, c.__data__, d, a)) &&
        ("__data__" in c && (f.__data__ = c.__data__),
        (u[d] = f),
        $a(u[d], t, n, d, u, gn(c, n)));
  return new Un(i, this._parents, t, n);
}
function aO(e) {
  var t = this._name,
    n = this._id;
  typeof e != "function" && (e = Hg(e));
  for (var r = this._groups, o = r.length, i = [], l = [], a = 0; a < o; ++a)
    for (var s = r[a], u = s.length, c, f = 0; f < u; ++f)
      if ((c = s[f])) {
        for (
          var d = e.call(c, c.__data__, f, s),
            h,
            p = gn(c, n),
            b = 0,
            v = d.length;
          b < v;
          ++b
        )
          (h = d[b]) && $a(h, t, n, b, d, p);
        i.push(d), l.push(c);
      }
  return new Un(i, l, t, n);
}
var sO = Ri.prototype.constructor;
function uO() {
  return new sO(this._groups, this._parents);
}
function cO(e, t) {
  var n, r, o;
  return function () {
    var i = Ao(this, e),
      l = (this.style.removeProperty(e), Ao(this, e));
    return i === l ? null : i === n && l === r ? o : (o = t((n = i), (r = l)));
  };
}
function ov(e) {
  return function () {
    this.style.removeProperty(e);
  };
}
function fO(e, t, n) {
  var r,
    o = n + "",
    i;
  return function () {
    var l = Ao(this, e);
    return l === o ? null : l === r ? i : (i = t((r = l), n));
  };
}
function dO(e, t, n) {
  var r, o, i;
  return function () {
    var l = Ao(this, e),
      a = n(this),
      s = a + "";
    return (
      a == null && (s = a = (this.style.removeProperty(e), Ao(this, e))),
      l === s ? null : l === r && s === o ? i : ((o = s), (i = t((r = l), a)))
    );
  };
}
function pO(e, t) {
  var n,
    r,
    o,
    i = "style." + t,
    l = "end." + i,
    a;
  return function () {
    var s = Nn(this, e),
      u = s.on,
      c = s.value[i] == null ? a || (a = ov(t)) : void 0;
    (u !== n || o !== c) && (r = (n = u).copy()).on(l, (o = c)), (s.on = r);
  };
}
function hO(e, t, n) {
  var r = (e += "") == "transform" ? x$ : rv;
  return t == null
    ? this.styleTween(e, cO(e, r)).on("end.style." + e, ov(e))
    : typeof t == "function"
    ? this.styleTween(e, dO(e, r, Mc(this, "style." + e, t))).each(
        pO(this._id, e)
      )
    : this.styleTween(e, fO(e, r, t), n).on("end.style." + e, null);
}
function mO(e, t, n) {
  return function (r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function gO(e, t, n) {
  var r, o;
  function i() {
    var l = t.apply(this, arguments);
    return l !== o && (r = (o = l) && mO(e, l, n)), r;
  }
  return (i._value = t), i;
}
function vO(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, gO(e, t, n == null ? "" : n));
}
function bO(e) {
  return function () {
    this.textContent = e;
  };
}
function yO(e) {
  return function () {
    var t = e(this);
    this.textContent = t == null ? "" : t;
  };
}
function wO(e) {
  return this.tween(
    "text",
    typeof e == "function"
      ? yO(Mc(this, "text", e))
      : bO(e == null ? "" : e + "")
  );
}
function _O(e) {
  return function (t) {
    this.textContent = e.call(this, t);
  };
}
function xO(e) {
  var t, n;
  function r() {
    var o = e.apply(this, arguments);
    return o !== n && (t = (n = o) && _O(o)), t;
  }
  return (r._value = e), r;
}
function CO(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, xO(e));
}
function SO() {
  for (
    var e = this._name,
      t = this._id,
      n = iv(),
      r = this._groups,
      o = r.length,
      i = 0;
    i < o;
    ++i
  )
    for (var l = r[i], a = l.length, s, u = 0; u < a; ++u)
      if ((s = l[u])) {
        var c = gn(s, t);
        $a(s, e, n, u, l, {
          time: c.time + c.delay + c.duration,
          delay: 0,
          duration: c.duration,
          ease: c.ease,
        });
      }
  return new Un(r, this._parents, e, n);
}
function EO() {
  var e,
    t,
    n = this,
    r = n._id,
    o = n.size();
  return new Promise(function (i, l) {
    var a = { value: l },
      s = {
        value: function () {
          --o === 0 && i();
        },
      };
    n.each(function () {
      var u = Nn(this, r),
        c = u.on;
      c !== e &&
        ((t = (e = c).copy()),
        t._.cancel.push(a),
        t._.interrupt.push(a),
        t._.end.push(s)),
        (u.on = t);
    }),
      o === 0 && i();
  });
}
var TO = 0;
function Un(e, t, n, r) {
  (this._groups = e), (this._parents = t), (this._name = n), (this._id = r);
}
function iv() {
  return ++TO;
}
var Ln = Ri.prototype;
Un.prototype = {
  constructor: Un,
  select: lO,
  selectAll: aO,
  selectChild: Ln.selectChild,
  selectChildren: Ln.selectChildren,
  filter: Qk,
  merge: eO,
  selection: uO,
  transition: SO,
  call: Ln.call,
  nodes: Ln.nodes,
  node: Ln.node,
  size: Ln.size,
  empty: Ln.empty,
  each: Ln.each,
  on: rO,
  attr: Rk,
  attrTween: zk,
  style: hO,
  styleTween: vO,
  text: wO,
  textTween: CO,
  remove: iO,
  tween: kk,
  delay: Kk,
  duration: Yk,
  ease: Gk,
  easeVarying: Zk,
  end: EO,
  [Symbol.iterator]: Ln[Symbol.iterator],
};
function $O(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var MO = { time: null, delay: 0, duration: 250, ease: $O };
function AO(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode)) throw new Error(`transition ${t} not found`);
  return n;
}
function kO(e) {
  var t, n;
  e instanceof Un
    ? ((t = e._id), (e = e._name))
    : ((t = iv()), ((n = MO).time = Tc()), (e = e == null ? null : e + ""));
  for (var r = this._groups, o = r.length, i = 0; i < o; ++i)
    for (var l = r[i], a = l.length, s, u = 0; u < a; ++u)
      (s = l[u]) && $a(s, e, t, u, l, n || AO(s, t));
  return new Un(r, this._parents, e, t);
}
Ri.prototype.interrupt = $k;
Ri.prototype.transition = kO;
const Za = (e) => () => e;
function OO(
  e,
  { sourceEvent: t, target: n, selection: r, mode: o, dispatch: i }
) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    selection: { value: r, enumerable: !0, configurable: !0 },
    mode: { value: o, enumerable: !0, configurable: !0 },
    _: { value: i },
  });
}
function PO(e) {
  e.stopImmediatePropagation();
}
function Qa(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
var bp = { name: "drag" },
  es = { name: "space" },
  to = { name: "handle" },
  no = { name: "center" };
const { abs: yp, max: yt, min: wt } = Math;
function wp(e) {
  return [+e[0], +e[1]];
}
function lu(e) {
  return [wp(e[0]), wp(e[1])];
}
var ts = {
    name: "x",
    handles: ["w", "e"].map(Si),
    input: function (e, t) {
      return e == null
        ? null
        : [
            [+e[0], t[0][1]],
            [+e[1], t[1][1]],
          ];
    },
    output: function (e) {
      return e && [e[0][0], e[1][0]];
    },
  },
  ns = {
    name: "y",
    handles: ["n", "s"].map(Si),
    input: function (e, t) {
      return e == null
        ? null
        : [
            [t[0][0], +e[0]],
            [t[1][0], +e[1]],
          ];
    },
    output: function (e) {
      return e && [e[0][1], e[1][1]];
    },
  },
  NO = {
    name: "xy",
    handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(Si),
    input: function (e) {
      return e == null ? null : lu(e);
    },
    output: function (e) {
      return e;
    },
  },
  Fn = {
    overlay: "crosshair",
    selection: "move",
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize",
  },
  _p = { e: "w", w: "e", nw: "ne", ne: "nw", se: "sw", sw: "se" },
  xp = { n: "s", s: "n", nw: "sw", ne: "se", se: "ne", sw: "nw" },
  IO = {
    overlay: 1,
    selection: 1,
    n: null,
    e: 1,
    s: null,
    w: -1,
    nw: -1,
    ne: 1,
    se: 1,
    sw: -1,
  },
  LO = {
    overlay: 1,
    selection: 1,
    n: -1,
    e: null,
    s: 1,
    w: null,
    nw: -1,
    ne: -1,
    se: 1,
    sw: 1,
  };
function Si(e) {
  return { type: e };
}
function FO(e) {
  return !e.ctrlKey && !e.button;
}
function RO() {
  var e = this.ownerSVGElement || this;
  return e.hasAttribute("viewBox")
    ? ((e = e.viewBox.baseVal),
      [
        [e.x, e.y],
        [e.x + e.width, e.y + e.height],
      ])
    : [
        [0, 0],
        [e.width.baseVal.value, e.height.baseVal.value],
      ];
}
function BO() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function rs(e) {
  for (; !e.__brush; ) if (!(e = e.parentNode)) return;
  return e.__brush;
}
function VO(e) {
  return e[0][0] === e[1][0] || e[0][1] === e[1][1];
}
function DO() {
  return HO(NO);
}
function HO(e) {
  var t = RO,
    n = FO,
    r = BO,
    o = !0,
    i = Ea("start", "brush", "end"),
    l = 6,
    a;
  function s(v) {
    var _ = v
      .property("__brush", b)
      .selectAll(".overlay")
      .data([Si("overlay")]);
    _.enter()
      .append("rect")
      .attr("class", "overlay")
      .attr("pointer-events", "all")
      .attr("cursor", Fn.overlay)
      .merge(_)
      .each(function () {
        var g = rs(this).extent;
        st(this)
          .attr("x", g[0][0])
          .attr("y", g[0][1])
          .attr("width", g[1][0] - g[0][0])
          .attr("height", g[1][1] - g[0][1]);
      }),
      v
        .selectAll(".selection")
        .data([Si("selection")])
        .enter()
        .append("rect")
        .attr("class", "selection")
        .attr("cursor", Fn.selection)
        .attr("fill", "#777")
        .attr("fill-opacity", 0.3)
        .attr("stroke", "#fff")
        .attr("shape-rendering", "crispEdges");
    var x = v.selectAll(".handle").data(e.handles, function (g) {
      return g.type;
    });
    x.exit().remove(),
      x
        .enter()
        .append("rect")
        .attr("class", function (g) {
          return "handle handle--" + g.type;
        })
        .attr("cursor", function (g) {
          return Fn[g.type];
        }),
      v
        .each(u)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mousedown.brush", d)
        .filter(r)
        .on("touchstart.brush", d)
        .on("touchmove.brush", h)
        .on("touchend.brush touchcancel.brush", p)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  (s.move = function (v, _, x) {
    v.tween
      ? v
          .on("start.brush", function (g) {
            c(this, arguments).beforestart().start(g);
          })
          .on("interrupt.brush end.brush", function (g) {
            c(this, arguments).end(g);
          })
          .tween("brush", function () {
            var g = this,
              y = g.__brush,
              w = c(g, arguments),
              C = y.selection,
              E = e.input(
                typeof _ == "function" ? _.apply(this, arguments) : _,
                y.extent
              ),
              $ = Fi(C, E);
            function I(D) {
              (y.selection = D === 1 && E === null ? null : $(D)),
                u.call(g),
                w.brush();
            }
            return C !== null && E !== null ? I : I(1);
          })
      : v.each(function () {
          var g = this,
            y = arguments,
            w = g.__brush,
            C = e.input(typeof _ == "function" ? _.apply(g, y) : _, w.extent),
            E = c(g, y).beforestart();
          iu(g),
            (w.selection = C === null ? null : C),
            u.call(g),
            E.start(x).brush(x).end(x);
        });
  }),
    (s.clear = function (v, _) {
      s.move(v, null, _);
    });
  function u() {
    var v = st(this),
      _ = rs(this).selection;
    _
      ? (v
          .selectAll(".selection")
          .style("display", null)
          .attr("x", _[0][0])
          .attr("y", _[0][1])
          .attr("width", _[1][0] - _[0][0])
          .attr("height", _[1][1] - _[0][1]),
        v
          .selectAll(".handle")
          .style("display", null)
          .attr("x", function (x) {
            return x.type[x.type.length - 1] === "e"
              ? _[1][0] - l / 2
              : _[0][0] - l / 2;
          })
          .attr("y", function (x) {
            return x.type[0] === "s" ? _[1][1] - l / 2 : _[0][1] - l / 2;
          })
          .attr("width", function (x) {
            return x.type === "n" || x.type === "s" ? _[1][0] - _[0][0] + l : l;
          })
          .attr("height", function (x) {
            return x.type === "e" || x.type === "w" ? _[1][1] - _[0][1] + l : l;
          }))
      : v
          .selectAll(".selection,.handle")
          .style("display", "none")
          .attr("x", null)
          .attr("y", null)
          .attr("width", null)
          .attr("height", null);
  }
  function c(v, _, x) {
    var g = v.__brush.emitter;
    return g && (!x || !g.clean) ? g : new f(v, _, x);
  }
  function f(v, _, x) {
    (this.that = v),
      (this.args = _),
      (this.state = v.__brush),
      (this.active = 0),
      (this.clean = x);
  }
  f.prototype = {
    beforestart: function () {
      return (
        ++this.active === 1 &&
          ((this.state.emitter = this), (this.starting = !0)),
        this
      );
    },
    start: function (v, _) {
      return (
        this.starting
          ? ((this.starting = !1), this.emit("start", v, _))
          : this.emit("brush", v),
        this
      );
    },
    brush: function (v, _) {
      return this.emit("brush", v, _), this;
    },
    end: function (v, _) {
      return (
        --this.active === 0 &&
          (delete this.state.emitter, this.emit("end", v, _)),
        this
      );
    },
    emit: function (v, _, x) {
      var g = st(this.that).datum();
      i.call(
        v,
        this.that,
        new OO(v, {
          sourceEvent: _,
          target: s,
          selection: e.output(this.state.selection),
          mode: x,
          dispatch: i,
        }),
        g
      );
    },
  };
  function d(v) {
    if ((a && !v.touches) || !n.apply(this, arguments)) return;
    var _ = this,
      x = v.target.__data__.type,
      g =
        (o && v.metaKey ? (x = "overlay") : x) === "selection"
          ? bp
          : o && v.altKey
          ? no
          : to,
      y = e === ns ? null : IO[x],
      w = e === ts ? null : LO[x],
      C = rs(_),
      E = C.extent,
      $ = C.selection,
      I = E[0][0],
      D,
      P,
      O = E[0][1],
      S,
      N,
      X = E[1][0],
      K,
      q,
      V = E[1][1],
      R,
      ne,
      ie = 0,
      J = 0,
      ve,
      $e = y && w && o && v.shiftKey,
      Ce,
      ue,
      Q = Array.from(v.touches || [v], (z) => {
        const ee = z.identifier;
        return (z = Xl(z, _)), (z.point0 = z.slice()), (z.identifier = ee), z;
      });
    iu(_);
    var ce = c(_, arguments, !0).beforestart();
    if (x === "overlay") {
      $ && (ve = !0);
      const z = [Q[0], Q[1] || Q[0]];
      (C.selection = $ =
        [
          [
            (D = e === ns ? I : wt(z[0][0], z[1][0])),
            (S = e === ts ? O : wt(z[0][1], z[1][1])),
          ],
          [
            (K = e === ns ? X : yt(z[0][0], z[1][0])),
            (R = e === ts ? V : yt(z[0][1], z[1][1])),
          ],
        ]),
        Q.length > 1 && M(v);
    } else (D = $[0][0]), (S = $[0][1]), (K = $[1][0]), (R = $[1][1]);
    (P = D), (N = S), (q = K), (ne = R);
    var Me = st(_).attr("pointer-events", "none"),
      _e = Me.selectAll(".overlay").attr("cursor", Fn[x]);
    if (v.touches) (ce.moved = T), (ce.ended = H);
    else {
      var je = st(v.view)
        .on("mousemove.brush", T, !0)
        .on("mouseup.brush", H, !0);
      o && je.on("keydown.brush", Y, !0).on("keyup.brush", U, !0), Jg(v.view);
    }
    u.call(_), ce.start(v, g.name);
    function T(z) {
      for (const ee of z.changedTouches || [z])
        for (const Z of Q)
          Z.identifier === ee.identifier && (Z.cur = Xl(ee, _));
      if ($e && !Ce && !ue && Q.length === 1) {
        const ee = Q[0];
        yp(ee.cur[0] - ee[0]) > yp(ee.cur[1] - ee[1]) ? (ue = !0) : (Ce = !0);
      }
      for (const ee of Q) ee.cur && ((ee[0] = ee.cur[0]), (ee[1] = ee.cur[1]));
      (ve = !0), Qa(z), M(z);
    }
    function M(z) {
      const ee = Q[0],
        Z = ee.point0;
      var k;
      switch (((ie = ee[0] - Z[0]), (J = ee[1] - Z[1]), g)) {
        case es:
        case bp: {
          y && ((ie = yt(I - D, wt(X - K, ie))), (P = D + ie), (q = K + ie)),
            w && ((J = yt(O - S, wt(V - R, J))), (N = S + J), (ne = R + J));
          break;
        }
        case to: {
          Q[1]
            ? (y &&
                ((P = yt(I, wt(X, Q[0][0]))),
                (q = yt(I, wt(X, Q[1][0]))),
                (y = 1)),
              w &&
                ((N = yt(O, wt(V, Q[0][1]))),
                (ne = yt(O, wt(V, Q[1][1]))),
                (w = 1)))
            : (y < 0
                ? ((ie = yt(I - D, wt(X - D, ie))), (P = D + ie), (q = K))
                : y > 0 &&
                  ((ie = yt(I - K, wt(X - K, ie))), (P = D), (q = K + ie)),
              w < 0
                ? ((J = yt(O - S, wt(V - S, J))), (N = S + J), (ne = R))
                : w > 0 &&
                  ((J = yt(O - R, wt(V - R, J))), (N = S), (ne = R + J)));
          break;
        }
        case no: {
          y && ((P = yt(I, wt(X, D - ie * y))), (q = yt(I, wt(X, K + ie * y)))),
            w &&
              ((N = yt(O, wt(V, S - J * w))), (ne = yt(O, wt(V, R + J * w))));
          break;
        }
      }
      q < P &&
        ((y *= -1),
        (k = D),
        (D = K),
        (K = k),
        (k = P),
        (P = q),
        (q = k),
        x in _p && _e.attr("cursor", Fn[(x = _p[x])])),
        ne < N &&
          ((w *= -1),
          (k = S),
          (S = R),
          (R = k),
          (k = N),
          (N = ne),
          (ne = k),
          x in xp && _e.attr("cursor", Fn[(x = xp[x])])),
        C.selection && ($ = C.selection),
        Ce && ((P = $[0][0]), (q = $[1][0])),
        ue && ((N = $[0][1]), (ne = $[1][1])),
        ($[0][0] !== P || $[0][1] !== N || $[1][0] !== q || $[1][1] !== ne) &&
          ((C.selection = [
            [P, N],
            [q, ne],
          ]),
          u.call(_),
          ce.brush(z, g.name));
    }
    function H(z) {
      if ((PO(z), z.touches)) {
        if (z.touches.length) return;
        a && clearTimeout(a),
          (a = setTimeout(function () {
            a = null;
          }, 500));
      } else
        Zg(z.view, ve),
          je.on(
            "keydown.brush keyup.brush mousemove.brush mouseup.brush",
            null
          );
      Me.attr("pointer-events", "all"),
        _e.attr("cursor", Fn.overlay),
        C.selection && ($ = C.selection),
        VO($) && ((C.selection = null), u.call(_)),
        ce.end(z, g.name);
    }
    function Y(z) {
      switch (z.keyCode) {
        case 16: {
          $e = y && w;
          break;
        }
        case 18: {
          g === to &&
            (y && ((K = q - ie * y), (D = P + ie * y)),
            w && ((R = ne - J * w), (S = N + J * w)),
            (g = no),
            M(z));
          break;
        }
        case 32: {
          (g === to || g === no) &&
            (y < 0 ? (K = q - ie) : y > 0 && (D = P - ie),
            w < 0 ? (R = ne - J) : w > 0 && (S = N - J),
            (g = es),
            _e.attr("cursor", Fn.selection),
            M(z));
          break;
        }
        default:
          return;
      }
      Qa(z);
    }
    function U(z) {
      switch (z.keyCode) {
        case 16: {
          $e && ((Ce = ue = $e = !1), M(z));
          break;
        }
        case 18: {
          g === no &&
            (y < 0 ? (K = q) : y > 0 && (D = P),
            w < 0 ? (R = ne) : w > 0 && (S = N),
            (g = to),
            M(z));
          break;
        }
        case 32: {
          g === es &&
            (z.altKey
              ? (y && ((K = q - ie * y), (D = P + ie * y)),
                w && ((R = ne - J * w), (S = N + J * w)),
                (g = no))
              : (y < 0 ? (K = q) : y > 0 && (D = P),
                w < 0 ? (R = ne) : w > 0 && (S = N),
                (g = to)),
            _e.attr("cursor", Fn[x]),
            M(z));
          break;
        }
        default:
          return;
      }
      Qa(z);
    }
  }
  function h(v) {
    c(this, arguments).moved(v);
  }
  function p(v) {
    c(this, arguments).ended(v);
  }
  function b() {
    var v = this.__brush || { selection: null };
    return (v.extent = lu(t.apply(this, arguments))), (v.dim = e), v;
  }
  return (
    (s.extent = function (v) {
      return arguments.length
        ? ((t = typeof v == "function" ? v : Za(lu(v))), s)
        : t;
    }),
    (s.filter = function (v) {
      return arguments.length
        ? ((n = typeof v == "function" ? v : Za(!!v)), s)
        : n;
    }),
    (s.touchable = function (v) {
      return arguments.length
        ? ((r = typeof v == "function" ? v : Za(!!v)), s)
        : r;
    }),
    (s.handleSize = function (v) {
      return arguments.length ? ((l = +v), s) : l;
    }),
    (s.keyModifiers = function (v) {
      return arguments.length ? ((o = !!v), s) : o;
    }),
    (s.on = function () {
      var v = i.on.apply(i, arguments);
      return v === i ? s : v;
    }),
    s
  );
}
let Wo,
  tr = [[]],
  Cp = [0, 75, 150, 225, 300];
const zO = {
  props: ["params"],
  data() {
    return {
      datasetName: "",
      zoomLevel: 0,
      maxZoomLevel: 2,
      previousZoomLevel: 0,
      level0_Width: 256,
      level0_Height: 256,
      bottomLeftPosition: [0, 0],
      isPanning: !1,
      previousMousePos: [0, 0],
      multiscaleData: new Map(),
      isLensMode: !0,
      is2DColorMap: !1,
      controlPointsLocs: [0, 75, 150, 225, 300],
      regionLensFactor: 0,
      tableData: [],
    };
  },
  methods: {
    createDensityMapWithNewParams() {
      var n;
      if (this.params.dataset === void 0) {
        console.log("is empty");
        return;
      } else if (this.params.dataset !== this.datasetName) {
        this.datasetName = this.params.dataset;
        let r =
          "/Filter-basedDensityMapEnhancement/datasets/" + this.datasetName;
        $t.fetchData(r + "_256x256.csv").then((o) => {
          if (!o) throw new Error("undefined data");
          this.multiscaleData.set(0, o),
            (tr = o),
            this.renderDensityMapAndColorbar(o);
        });
        for (let o = this.maxZoomLevel; o > 0; --o) {
          let i = Math.pow(2, 8 + o);
          $t.fetchData(`${r}_${i}x${i}.csv`).then((l) => {
            l !== void 0 && l.length === i && this.multiscaleData.set(o, l);
          });
        }
      } else
        (tr = this.multiscaleData.get(0)), this.renderDensityMapAndColorbar(tr);
      (this.zoomLevel = 0),
        st(".zoomSlider").style("width", `${this.params.width - 150}px`);
      let e =
          ((n = document.getElementById("densitymap")) == null
            ? void 0
            : n.offsetLeft) +
          Number(this.params.width) +
          20,
        t = document.getElementById("2d_colormap");
      (t.style.left = `${e}px`),
        (t.width != 300 || t.height != 300) &&
          ((this.controlPointsLocs = [0, 75, 150, 225, 300]),
          il
            .redraw2DColormap()
            .then((r) => {
              $t.drawImageData(t, r.data.bi_colormap);
            })
            .catch((r) => {
              console.log(r.message);
            })),
        st("#mapBrushLayer")
          .attr("width", this.params.width)
          .attr("height", this.params.height),
        st("#lensRecords").style(
          "top",
          `${Number(this.params.height) + 200}px`
        );
    },
    createRegionLensBrush() {
      let e = st(".el-main")
        .append("svg")
        .attr("class", "brush")
        .attr("id", "mapBrushLayer")
        .attr("width", this.params.width)
        .attr("height", this.params.height)
        .style("position", "absolute")
        .lower();
      (Wo = DO()
        .extent([
          [0, 0],
          [this.params.width, this.params.height],
        ])
        .on("end", ({ selection: t }) => {
          let n = this.tableData.findIndex((r) => r.type == "Region lens");
          if (t) {
            let r = {
              type: "Region lens",
              range: JSON.stringify(t.map((o) => o.map(Math.round))),
              factor:
                n !== -1 ? this.tableData[n].factor : this.regionLensFactor,
            };
            n === -1 ? this.tableData.push(r) : (this.tableData[n] = r),
              (this.regionLensFactor = r.factor);
          } else n !== -1 && this.tableData.splice(n, 1);
          this.renderDensityMap(tr, this.params);
        })),
        e.append("g").call(Wo);
    },
    renderDensityMap(e, t) {
      let n = this.tableData.find((i) => i.type == "Region lens"),
        r;
      if (n) {
        let i = JSON.parse(n.range);
        r = {
          dataMinX: Math.round(
            (i[0][0] / this.params.width) * this.level0_Width
          ),
          dataMinY: Math.round(
            (1 - i[1][1] / this.params.height) * this.level0_Height
          ),
          dataMaxX: Math.round(
            (i[1][0] / this.params.width) * this.level0_Width
          ),
          dataMaxY: Math.round(
            (1 - i[0][1] / this.params.height) * this.level0_Height
          ),
          factor: Number(n.factor),
        };
      } else
        r = {
          dataMinX: -1,
          dataMinY: -1,
          dataMaxX: -1,
          dataMaxY: -1,
          factor: 0,
        };
      let o = document.getElementById("densitymap");
      il.enhanceDensityMap(e, t, r)
        .then((i) => {
          if (
            ($t.drawImageData(o, i.data.imgData), t.colormap.startsWith("2D"))
          ) {
            let l = st("#colorbar").select("g"),
              a = document.getElementById("2d_colormap").width,
              s = _i().domain([i.data.minVal, i.data.maxVal]).range([a, 0]),
              u = Rg(s);
            l.append("g")
              .attr("class", "colorbar axis")
              .attr("transform", `translate(${a},0)`)
              .call(u);
          }
        })
        .catch((i) => {
          console.log(i.message);
        });
    },
    renderDensityMapAndColorbar(e, t) {
      let n = t || this.params;
      this.renderDensityMap(e, n), this.generateColorbar(e, n);
    },
    generateColorbar(e, t) {
      if (this.params.colormap === void 0) return;
      st("#colorbar").selectAll("g").remove();
      let n = st("#colorbar").attr("height", this.params.height),
        r = n.append("g"),
        o = 20,
        i = this.params.height - 40;
      const [l, a] = $t.extent(e);
      if (t.colormap.startsWith("2D")) {
        (o = 300),
          n.attr("width", o + 100),
          r.attr("transform", "translate(20,40)"),
          (this.is2DColorMap = !0);
        let s = this.controlPointsLocs,
          u = r
            .append("g")
            .selectAll(".control_point")
            .data(s)
            .enter()
            .append("g")
            .attr("id", (h, p) => p)
            .attr("transform", (h) => `translate(${h},0)`);
        u
          .append("line")
          .style("stroke", "black")
          .style("stroke-width", 1)
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", -10),
          u
            .append("rect")
            .attr("x", -7.5)
            .attr("y", -25)
            .attr("width", 15)
            .attr("height", 15)
            .attr("stroke", "black")
            .style("stroke-width", 1)
            .attr("fill", (h, p) => k$(p / (s.length - 1)));
        let c = (h, p, b, v) => {
          let _ = document.getElementById("2d_colormap");
          il
            .redraw2DColormap(JSON.stringify({ s: h, e: p, o: b, n: v }))
            .then((x) => {
              $t.drawImageData(_, x.data.bi_colormap),
                this.renderDensityMap(e, t);
            })
            .catch((x) => {
              console.log(x.message);
            }),
            (Cp = s.slice());
        };
        u.call(
          yk().on("drag end", function (h) {
            let p = +st(this).attr("id");
            p == 0 ||
              p == s.length - 1 ||
              h.x < s[p - 1] + 10 ||
              h.x > s[p + 1] - 10 ||
              ((s[p] = Math.round(h.x)),
              st(this).attr("transform", `translate(${s[p]},0)`),
              h.type == "end" && c(s[p - 1], s[p + 1], Cp[p], s[p]));
          })
        );
        let f = _i().domain([l, a]).range([0, o]),
          d = Bg(f);
        r
          .append("g")
          .attr("class", "colorbar axis")
          .attr("transform", `translate(0,${o})`)
          .call(d),
          r
            .append("text")
            .attr("x", 100)
            .attr("y", o + 30)
            .attr("font-size", 16)
            .text("Input Intensities"),
          r
            .append("text")
            .attr("font-size", 16)
            .attr("transform", "translate(345,200) rotate(270)")
            .text("Output Intensities");
      } else {
        (this.is2DColorMap = !1),
          r.attr("class", "vertical").attr("transform", "translate(20,20)");
        const s = $t.getTransformFunction(t.type);
        let u = Lg($t.getInterpolateFunc(t.colormap)).domain([l, a].map(s)),
          c = $t.getTickValues(l, a, s),
          f = OM(u, o, i)
            .tickValues(c.map(s))
            .tickFormat((d) =>
              $t.getInverseTransformFunction(t.type)(d).toFixed(0)
            );
        r.call(f);
      }
    },
    takeScreenshot() {
      if (!this.datasetName) return;
      let e = document.createElement("a");
      e.setAttribute("download", this.datasetName + ".png"),
        document.getElementById("densitymap").toBlob((n) => {
          let r = URL.createObjectURL(n);
          e.setAttribute("href", r), e.click();
        });
    },
    showOriginalDensityMap() {
      if (this.multiscaleData.get(0) === void 0) return;
      (this.params.type = "linear"), (this.params.detailFactor = 1);
      let e = structuredClone(Ve(this.params));
      (tr = this.multiscaleData.get(0)),
        this.renderDensityMapAndColorbar(tr, e),
        (this.zoomLevel = 0);
    },
    showCDP() {
      if (this.multiscaleData.get(0) === void 0) return;
      (this.params.type = "log"),
        (this.params.filter = "gaussian"),
        (this.params.filterParams.win_size = 20),
        (this.params.filterParams.sigma = 2),
        (this.params.detailFactor = 0);
      let e = structuredClone(Ve(this.params));
      (tr = this.multiscaleData.get(0)),
        this.renderDensityMapAndColorbar(tr, e),
        (this.zoomLevel = 0);
    },
    zoomDensityMap: Mn(
      function (e) {
        var l;
        if (!this.multiscaleData.has(this.zoomLevel)) {
          this.zoomLevel = 0;
          return;
        }
        if (typeof e == "number") {
          for (; !this.multiscaleData.has(this.zoomLevel); )
            this.zoomLevel -= 1;
          if (e !== this.zoomLevel) return;
          $t.translateBottomLeftPosition(
            this.params.width / 2,
            this.params.height / 2,
            this
          );
        } else {
          let a = e.deltaY < 0 ? this.zoomLevel + 1 : this.zoomLevel - 1;
          if (this.multiscaleData.has(a)) this.zoomLevel = a;
          else return;
          e.deltaY < 0
            ? $t.translateBottomLeftPosition(e.offsetX, e.offsetY, this)
            : $t.translateBottomLeftPosition(
                this.params.width / 2,
                this.params.height / 2,
                this
              );
        }
        let t = this.bottomLeftPosition[0],
          n = this.bottomLeftPosition[1],
          r = t + this.level0_Width,
          o = n + this.level0_Height,
          i = this.multiscaleData
            .get(this.zoomLevel)
            .slice(n, o)
            .map((a) => a.slice(t, r));
        this.renderDensityMapAndColorbar(i),
          (l = document.getElementById("densitymap")) == null || l.focus(),
          (this.previousZoomLevel = this.zoomLevel);
      },
      200,
      { leading: !0, trailing: !1 }
    ),
    panDensityMap: sx(function (e) {
      if (this.isPanning && !this.isLensMode) {
        let t = e.offsetX - this.previousMousePos[0],
          n = e.offsetY - this.previousMousePos[1];
        $t.translateBottomLeftPosition(
          this.params.width / 2 - t,
          this.params.height / 2 - n,
          this
        );
        let r = this.bottomLeftPosition[0],
          o = this.bottomLeftPosition[1],
          i = r + this.level0_Width,
          l = o + this.level0_Height,
          a = this.multiscaleData
            .get(this.zoomLevel)
            .slice(o, l)
            .map((s) => s.slice(r, i));
        this.renderDensityMapAndColorbar(a),
          (this.previousMousePos[0] = e.offsetX),
          (this.previousMousePos[1] = e.offsetY);
      }
    }, 200),
  },
  watch: {
    isLensMode(e) {
      !this.multiscaleData.has(this.zoomLevel) ||
        (e
          ? this.createRegionLensBrush()
          : (Wo !== void 0 &&
              (st("#mapBrushLayer > g").call(Wo.clear), (Wo = void 0)),
            ck(".brush").remove()));
    },
  },
  mounted() {
    il.load()
      .then(() => {
        _g.service().close(), console.log("OpenCV.js is ready.");
      })
      .catch((e) => {
        console.log(e.message);
      });
  },
};
const Ac = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, o] of t) n[r] = o;
    return n;
  },
  lv = (e) => (xu("data-v-a49838ac"), (e = e()), Cu(), e),
  WO = lv(() =>
    ae("svg", { id: "colorbar", width: "100", height: "400" }, null, -1)
  ),
  jO = { id: "2d_colormap", style: { position: "absolute", top: "180px" } },
  KO = lv(() =>
    ae(
      "span",
      { style: { "font-size": "16pt", "margin-right": "20px" } },
      "Zoom Level: ",
      -1
    )
  );
function qO(e, t, n, r, o, i) {
  const l = Im,
    a = F5,
    s = ig,
    u = WT,
    c = sg,
    f = zT,
    d = fg,
    h = GE,
    p = T6,
    b = og;
  return (
    L(),
    he(b, null, {
      default: re(() => [
        oe(s, null, {
          default: re(() => [
            oe(
              l,
              { onClick: it(i.takeScreenshot, ["prevent"]) },
              { default: re(() => [It("Download")]), _: 1 },
              8,
              ["onClick"]
            ),
            oe(
              l,
              { onClick: it(i.showOriginalDensityMap, ["prevent"]) },
              { default: re(() => [It("Show input density map")]), _: 1 },
              8,
              ["onClick"]
            ),
            oe(
              l,
              { onClick: it(i.showCDP, ["prevent"]) },
              { default: re(() => [It("Show continuous density map")]), _: 1 },
              8,
              ["onClick"]
            ),
            oe(
              a,
              {
                modelValue: o.isLensMode,
                "onUpdate:modelValue":
                  t[0] || (t[0] = (v) => (o.isLensMode = v)),
                "inline-prompt": "",
                style: {
                  "margin-left": "12px",
                  "--el-switch-off-color": "#ff7f00",
                },
                size: "large",
                "active-text": "Lens mode",
                "inactive-text": "Zoom mode",
              },
              null,
              8,
              ["modelValue"]
            ),
          ]),
          _: 1,
        }),
        oe(p, null, {
          default: re(() => [
            ot(
              oe(
                f,
                {
                  id: "lensRecords",
                  data: o.tableData,
                  "max-height": "250",
                  style: { width: "380px", position: "absolute" },
                  border: "",
                },
                {
                  default: re(() => [
                    oe(u, { prop: "type", label: "Type", width: "105" }),
                    oe(u, {
                      prop: "range",
                      label: "Range",
                      "max-width": "180",
                    }),
                    oe(
                      u,
                      { prop: "factor", label: "Factor", width: "105" },
                      {
                        default: re((v) => [
                          oe(
                            c,
                            {
                              modelValue: v.row.factor,
                              "onUpdate:modelValue": (_) => (v.row.factor = _),
                              min: 0,
                              max: 99,
                              size: "small",
                              style: { width: "80px" },
                            },
                            null,
                            8,
                            ["modelValue", "onUpdate:modelValue"]
                          ),
                        ]),
                        _: 1,
                      }
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["data"]
              ),
              [[cn, o.isLensMode && o.multiscaleData.has(o.zoomLevel)]]
            ),
            ae(
              "canvas",
              {
                id: "densitymap",
                onWheel:
                  t[1] ||
                  (t[1] = it(
                    (...v) => i.zoomDensityMap && i.zoomDensityMap(...v),
                    ["prevent"]
                  )),
                onMousedown:
                  t[2] ||
                  (t[2] = (v) => {
                    (o.isPanning = !0),
                      (o.previousMousePos = [v.offsetX, v.offsetY]);
                  }),
                onMouseup: t[3] || (t[3] = (v) => (o.isPanning = !1)),
                onDblclick:
                  t[4] ||
                  (t[4] = (...v) =>
                    i.createDensityMapWithNewParams &&
                    i.createDensityMapWithNewParams(...v)),
                onMousemove:
                  t[5] ||
                  (t[5] = it(
                    (...v) => i.panDensityMap && i.panDensityMap(...v),
                    ["prevent"]
                  )),
              },
              null,
              32
            ),
            WO,
            ot(ae("canvas", jO, null, 512), [[cn, o.is2DColorMap]]),
            oe(h, null, {
              default: re(() => [
                KO,
                oe(
                  d,
                  {
                    class: "zoomSlider",
                    modelValue: o.zoomLevel,
                    "onUpdate:modelValue":
                      t[6] || (t[6] = (v) => (o.zoomLevel = v)),
                    placement: "bottom",
                    onChange: i.zoomDensityMap,
                    "show-input": "",
                    "show-input-controls": !1,
                    min: 0,
                    max: o.maxZoomLevel,
                  },
                  null,
                  8,
                  ["modelValue", "onChange", "max"]
                ),
              ]),
              _: 1,
            }),
          ]),
          _: 1,
        }),
      ]),
      _: 1,
    })
  );
}
const av = Ac(zO, [
  ["render", qO],
  ["__scopeId", "data-v-a49838ac"],
]);
const UO = { viewBox: "0 0 1024 1024", width: "1.2em", height: "1.2em" },
  YO = ae(
    "path",
    {
      fill: "currentColor",
      d: "M512 896a384 384 0 1 0 0-768a384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896a448 448 0 0 1 0 896z",
    },
    null,
    -1
  ),
  XO = ae(
    "path",
    {
      fill: "currentColor",
      d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z",
    },
    null,
    -1
  ),
  GO = [YO, XO];
function JO(e, t) {
  return L(), te("svg", UO, GO);
}
const ZO = { name: "ep-circle-check", render: JO };
const QO = {
  emits: ["update"],
  data() {
    return {
      settingForm: {
        dataset: "PersonActivity",
        width: 900,
        height: 600,
        type: "log",
        filter: "guided",
        colormap: "Greys",
        filterParams: { sigma: 2, win_size: 20, tau: 0.16 },
        detailFactor: 3,
      },
      datasets: [
        "NYC_Taxis",
        "HR_Diagram",
        "UK_Road_Safety",
        "arXiv",
        "PersonActivity",
        "BostonMarathon",
        "Synthetic",
        "clustMe9",
        "clustMe15",
      ],
      transformTypes: ["linear", "log", "pow", "sqrt", "cbrt"],
      colormaps: [
        "Greys",
        "Plasma",
        "Viridis",
        "Inferno",
        "Turbo",
        "Cividis",
        "2D_CIELch",
      ],
    };
  },
  mounted() {
    this.$emit("update", this.settingForm);
  },
};
const eP = (e) => (xu("data-v-9af4a211"), (e = e()), Cu(), e),
  tP = eP(() => ae("span", null, "Apply", -1));
function nP(e, t, n, r, o, i) {
  const l = WE,
    a = zE,
    s = yE,
    u = tc,
    c = p6,
    f = fg,
    d = n6,
    h = r6,
    p = ZO,
    b = at,
    v = Im,
    _ = bE,
    x = E6;
  return (
    L(),
    he(x, null, {
      default: re(() => [
        oe(
          _,
          {
            "label-position": "top",
            "label-width": "100px",
            model: o.settingForm,
            style: { "max-width": "350px", padding: "15px" },
          },
          {
            default: re(() => [
              oe(
                s,
                { label: "Dataset" },
                {
                  default: re(() => [
                    oe(
                      a,
                      {
                        modelValue: o.settingForm.dataset,
                        "onUpdate:modelValue":
                          t[0] || (t[0] = (g) => (o.settingForm.dataset = g)),
                        placeholder: "Select",
                        class: "fulfill-width",
                      },
                      {
                        default: re(() => [
                          (L(!0),
                          te(
                            Ue,
                            null,
                            Cn(
                              o.datasets,
                              (g) => (
                                L(),
                                he(l, { key: g, label: g, value: g }, null, 8, [
                                  "label",
                                  "value",
                                ])
                              )
                            ),
                            128
                          )),
                        ]),
                        _: 1,
                      },
                      8,
                      ["modelValue"]
                    ),
                  ]),
                  _: 1,
                }
              ),
              oe(
                s,
                { label: "Display size" },
                {
                  default: re(() => [
                    oe(
                      c,
                      { span: 11 },
                      {
                        default: re(() => [
                          oe(
                            u,
                            {
                              modelValue: o.settingForm.width,
                              "onUpdate:modelValue":
                                t[1] ||
                                (t[1] = (g) => (o.settingForm.width = g)),
                              type: "number",
                              step: "100",
                              label: "Display width",
                              placeholder: "Display width",
                            },
                            null,
                            8,
                            ["modelValue"]
                          ),
                        ]),
                        _: 1,
                      }
                    ),
                    oe(
                      c,
                      { class: "text-center", span: 2 },
                      { default: re(() => [It(" \xD7 ")]), _: 1 }
                    ),
                    oe(
                      c,
                      { span: 11 },
                      {
                        default: re(() => [
                          oe(
                            u,
                            {
                              modelValue: o.settingForm.height,
                              "onUpdate:modelValue":
                                t[2] ||
                                (t[2] = (g) => (o.settingForm.height = g)),
                              type: "number",
                              step: "100",
                              label: "Display height",
                              placeholder: "Display height",
                            },
                            null,
                            8,
                            ["modelValue"]
                          ),
                        ]),
                        _: 1,
                      }
                    ),
                  ]),
                  _: 1,
                }
              ),
              oe(
                s,
                { label: "Transformation" },
                {
                  default: re(() => [
                    oe(
                      a,
                      {
                        modelValue: o.settingForm.type,
                        "onUpdate:modelValue":
                          t[3] || (t[3] = (g) => (o.settingForm.type = g)),
                        placeholder: "Select",
                        class: "fulfill-width",
                      },
                      {
                        default: re(() => [
                          (L(!0),
                          te(
                            Ue,
                            null,
                            Cn(
                              o.transformTypes,
                              (g) => (
                                L(),
                                he(l, { key: g, label: g, value: g }, null, 8, [
                                  "label",
                                  "value",
                                ])
                              )
                            ),
                            128
                          )),
                        ]),
                        _: 1,
                      },
                      8,
                      ["modelValue"]
                    ),
                  ]),
                  _: 1,
                }
              ),
              oe(
                s,
                { label: "Colormap" },
                {
                  default: re(() => [
                    oe(
                      a,
                      {
                        modelValue: o.settingForm.colormap,
                        "onUpdate:modelValue":
                          t[4] || (t[4] = (g) => (o.settingForm.colormap = g)),
                        placeholder: "Select",
                        class: "fulfill-width",
                      },
                      {
                        default: re(() => [
                          (L(!0),
                          te(
                            Ue,
                            null,
                            Cn(
                              o.colormaps,
                              (g) => (
                                L(),
                                he(l, { key: g, label: g, value: g }, null, 8, [
                                  "label",
                                  "value",
                                ])
                              )
                            ),
                            128
                          )),
                        ]),
                        _: 1,
                      },
                      8,
                      ["modelValue"]
                    ),
                  ]),
                  _: 1,
                }
              ),
              oe(
                s,
                { label: "Detail enhancement factor - \u03C9" },
                {
                  default: re(() => [
                    oe(
                      f,
                      {
                        modelValue: o.settingForm.detailFactor,
                        "onUpdate:modelValue":
                          t[5] ||
                          (t[5] = (g) => (o.settingForm.detailFactor = g)),
                        step: 0.01,
                        max: 10,
                        "show-input": "",
                      },
                      null,
                      8,
                      ["modelValue", "step"]
                    ),
                  ]),
                  _: 1,
                }
              ),
              oe(
                s,
                { label: "Filter type" },
                {
                  default: re(() => [
                    oe(
                      h,
                      {
                        modelValue: o.settingForm.filter,
                        "onUpdate:modelValue":
                          t[6] || (t[6] = (g) => (o.settingForm.filter = g)),
                      },
                      {
                        default: re(() => [
                          oe(
                            d,
                            { label: "gaussian", size: "large" },
                            { default: re(() => [It("Gaussian Filter")]), _: 1 }
                          ),
                          oe(
                            d,
                            { label: "guided", size: "large" },
                            { default: re(() => [It("Guided Filter")]), _: 1 }
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["modelValue"]
                    ),
                  ]),
                  _: 1,
                }
              ),
              oe(
                s,
                { label: "Filter parameters - Window size" },
                {
                  default: re(() => [
                    oe(
                      f,
                      {
                        modelValue: o.settingForm.filterParams.win_size,
                        "onUpdate:modelValue":
                          t[7] ||
                          (t[7] = (g) =>
                            (o.settingForm.filterParams.win_size = g)),
                        min: 1,
                        max: 40,
                        "show-input": "",
                      },
                      null,
                      8,
                      ["modelValue"]
                    ),
                  ]),
                  _: 1,
                }
              ),
              o.settingForm.filter === "gaussian"
                ? (L(),
                  he(
                    s,
                    { key: 0, label: "Filter parameters - \u03C3" },
                    {
                      default: re(() => [
                        oe(
                          f,
                          {
                            modelValue: o.settingForm.filterParams.sigma,
                            "onUpdate:modelValue":
                              t[8] ||
                              (t[8] = (g) =>
                                (o.settingForm.filterParams.sigma = g)),
                            step: 0.01,
                            max: 10,
                            "show-input": "",
                          },
                          null,
                          8,
                          ["modelValue", "step"]
                        ),
                      ]),
                      _: 1,
                    }
                  ))
                : o.settingForm.filter === "guided"
                ? (L(),
                  he(
                    s,
                    { key: 1, label: "Filter parameters - \u03C4" },
                    {
                      default: re(() => [
                        oe(
                          f,
                          {
                            modelValue: o.settingForm.filterParams.tau,
                            "onUpdate:modelValue":
                              t[9] ||
                              (t[9] = (g) =>
                                (o.settingForm.filterParams.tau = g)),
                            step: 0.01,
                            max: 5,
                            "show-input": "",
                          },
                          null,
                          8,
                          ["modelValue", "step"]
                        ),
                      ]),
                      _: 1,
                    }
                  ))
                : (L(), te(Ue, { key: 2 }, [], 64)),
              oe(s, null, {
                default: re(() => [
                  oe(
                    v,
                    {
                      type: "primary",
                      onClick:
                        t[10] ||
                        (t[10] = (g) => e.$emit("update", o.settingForm)),
                      class: "fulfill-width",
                    },
                    {
                      default: re(() => [
                        oe(b, null, { default: re(() => [oe(p)]), _: 1 }),
                        tP,
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                _: 1,
              }),
            ]),
            _: 1,
          },
          8,
          ["model"]
        ),
      ]),
      _: 1,
    })
  );
}
const sv = Ac(QO, [
  ["render", nP],
  ["__scopeId", "data-v-9af4a211"],
]);
const rP = {
    components: { SettingSidebar: sv, DensityMapViewer: av },
    data() {
      return { settings: {} };
    },
    methods: {
      updateDensityMap(e) {
        (this.settings = e), this.$refs.viewer.createDensityMapWithNewParams();
      },
    },
    mounted() {
      _g.service({
        lock: !0,
        text: "Loading OpenCV.js",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },
  },
  oP =
    "/Filter-basedDensityMapEnhancement/assets/density-plot-logo.764c2348.svg";
const uv = (e) => (xu("data-v-faa139e9"), (e = e()), Cu(), e),
  iP = uv(() =>
    ae(
      "img",
      {
        alt: "Density logo",
        class: "logo",
        src: oP,
        width: "65",
        height: "65",
      },
      null,
      -1
    )
  ),
  lP = uv(() => ae("span", { class: "title" }, "Bi-scale Density Plots", -1));
function aP(e, t, n, r, o, i) {
  const l = ig,
    a = sv,
    s = av,
    u = og;
  return (
    L(),
    he(u, null, {
      default: re(() => [
        oe(l, null, { default: re(() => [iP, lP]), _: 1 }),
        oe(u, null, {
          default: re(() => [
            oe(a, { onUpdate: i.updateDensityMap }, null, 8, ["onUpdate"]),
            oe(s, { params: o.settings, ref: "viewer" }, null, 8, ["params"]),
          ]),
          _: 1,
        }),
      ]),
      _: 1,
    })
  );
}
const sP = Ac(rP, [
  ["render", aP],
  ["__scopeId", "data-v-faa139e9"],
]);
Sh(sP).mount("#app");
