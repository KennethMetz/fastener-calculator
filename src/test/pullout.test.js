import { pullout } from "../pullout";

//test external thread stripping
const a1 = [
  {
    nomDia: 0.138,
    threadCount: 32,
    threadType: "unc",
    comp2Thick: 0.197,
    comp2Fu: 100000,
    comp2Fy: 100000,
    fastFu: 65000,
    fastFy: 20000,
  },
];
test("external thread stripping - eqn 2 governing", () => {
  expect(Math.round(pullout(a1)[0])).toBeCloseTo(328);
});

const a2 = [
  {
    nomDia: 0.138,
    threadCount: 32,
    threadType: "unc",
    comp2Thick: 0.197,
    comp2Fu: 150000,
    comp2Fy: 150000,
    fastFu: 10000,
    fastFy: 20000,
  },
];
test("external thread stripping - eqn 1 governing", () => {
  expect(Math.round(pullout(a2)[0])).toBeCloseTo(73);
});

//test internal thread stripping errors
const b1 = [
  {
    nomDia: 0.138,
    threadCount: 32,
    threadType: "unc",
    comp2Thick: 0.059,
    comp2Fu: 300000,
    comp2Fy: 25000,
    fastFu: 65000,
    fastFy: 20000,
  },
];
test("error when t2< .06 inch for unc screws", () => {
  expect(pullout(b1)[0]).toMatch(
    /INVALID COMPONENT #2 THICKNESS: t2 must be > 0.06 inches for UNC screws/
  );
});

const b2 = [
  {
    nomDia: 0.138,
    threadCount: 32,
    threadType: "unc",
    comp2Thick: 0.376,
    comp2Fu: 300000,
    comp2Fy: 25000,
    fastFu: 65000,
    fastFy: 20000,
  },
];
test("error when t2> .375 inch for unc screws", () => {
  expect(pullout(b2)[0]).toMatch(
    /INVALID COMPONENT #2 THICKNESS: t2 must be < 0.375 inches for specification to provide pullout values/
  );
});

const b3 = [
  {
    nomDia: 0.138,
    threadCount: 32,
    threadType: "spaced",
    comp2Thick: 0.037,
    comp2Fu: 300000,
    comp2Fy: 25000,
    fastFu: 65000,
    fastFy: 20000,
  },
];
test("error when t2< .038 inch for spaced screws", () => {
  expect(pullout(b3)[0]).toMatch(
    /INVALID COMPONENT #2 THICKNESS: t2 must be > 0.038 inches for SPACED screws/
  );
});

const b4 = [
  {
    nomDia: 0.138,
    threadCount: 32,
    threadType: "spaced",
    comp2Thick: 0.376,
    comp2Fu: 300000,
    comp2Fy: 25000,
    fastFu: 65000,
    fastFy: 20000,
  },
];
test("error when t2> .375 inch for spaced screws", () => {
  expect(pullout(b4)[0]).toMatch(
    /INVALID COMPONENT #2 THICKNESS: t2 must be < 0.375 inches for specification to provide pullout values/
  );
});

//test internal thread stripping values for UNC screws
const c1 = [
  {
    nomDia: 0.138,
    threadCount: 32,
    threadType: "unc",
    comp2Thick: 0.07,
    comp2Fu: 30000,
    comp2Fy: 25000,
    fastFu: 100000,
    fastFy: 200000,
  },
];
test("internal thread stripping - unc thin 1", () => {
  expect(Math.round(pullout(c1)[0])).toBeCloseTo(82);
});

const c2 = [
  {
    nomDia: 0.138,
    threadCount: 32,
    threadType: "unc",
    comp2Thick: 0.1,
    comp2Fu: 30000,
    comp2Fy: 25000,
    fastFu: 1000000,
    fastFy: 2000000,
  },
];
test("internal thread stripping - unc thin 2", () => {
  expect(Math.round(pullout(c2)[0])).toBeCloseTo(139);
});

const c3 = [
  {
    nomDia: 0.138,
    threadCount: 32,
    threadType: "unc",
    comp2Thick: 0.2,
    comp2Fu: 30000,
    comp2Fy: 25000,
    fastFu: 1000000,
    fastFy: 2000000,
  },
];
test("internal thread stripping - unc intermediate", () => {
  expect(Math.round(pullout(c3)[0])).toBeCloseTo(319);
});

const c4 = [
  {
    nomDia: 0.138,
    threadCount: 32,
    threadType: "unc",
    comp2Thick: 0.3,
    comp2Fu: 30000,
    comp2Fy: 25000,
    fastFu: 1000000,
    fastFy: 2000000,
  },
];
test("internal thread stripping - unc thick", () => {
  expect(Math.round(pullout(c4)[0])).toBeCloseTo(499);
});

//test internal thread stripping values for SPACED screws
const d1 = [
  {
    nomDia: 0.138,
    threadCount: 14,
    threadType: "spaced",
    comp2Thick: 0.07,
    comp2Fu: 30000,
    comp2Fy: 25000,
    fastFu: 10000000,
    fastFy: 20000000,
  },
];
test("internal thread stripping - spaced thin 1", () => {
  expect(Math.round(pullout(d1)[0])).toBeCloseTo(82);
});

const d2 = [
  {
    nomDia: 0.138,
    threadCount: 14,
    threadType: "spaced",
    comp2Thick: 0.1,
    comp2Fu: 30000,
    comp2Fy: 25000,
    fastFu: 1000000,
    fastFy: 2000000,
  },
];
test("internal thread stripping - spaced thin 2", () => {
  expect(Math.round(pullout(d2)[0])).toBeCloseTo(139);
});

const d3 = [
  {
    nomDia: 0.138,
    threadCount: 14,
    threadType: "spaced",
    comp2Thick: 0.2,
    comp2Fu: 30000,
    comp2Fy: 25000,
    fastFu: 1000000,
    fastFy: 2000000,
  },
];
test("internal thread stripping - spaced intermediate", () => {
  expect(Math.round(pullout(d3)[0])).toBeCloseTo(376);
});

const d4 = [
  {
    nomDia: 0.138,
    threadCount: 14,
    threadType: "spaced",
    comp2Thick: 0.3,
    comp2Fu: 30000,
    comp2Fy: 25000,
    fastFu: 1000000,
    fastFy: 2000000,
  },
];
test("internal thread stripping - spaced thick", () => {
  expect(Math.round(pullout(d4)[0])).toBeCloseTo(676);
});
