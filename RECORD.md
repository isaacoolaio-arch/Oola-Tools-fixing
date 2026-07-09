# ToolFix — build record

**Repository** `isaacoolaio-arch/Oola-Tools-fixing`
**Live** https://isaacoolaio-arch.github.io/Oola-Tools-fixing/
**Built** 9 July 2026
**For** Oola Garage, Gulu

---

## Why this exists

The garage beside the spares shop repairs and modifies motorcycles. Three power tools do most of that work, and each had a fault nobody had diagnosed:

- Drill turns clockwise, not anti-clockwise
- Grinder feels weak
- Welder overheats

The app began as a troubleshooting reference. It ended as something narrower and more useful: **a check on whether the fault is a fault at all.**

Two of the three were not.

---

## What was found

### The grinder is not weak. Its disc is finished.

The nameplate reads `LICA ASM08-230`, made by Jiangsu Dongcheng M&E Tools. A **230 mm** machine — not the 180 mm first assumed — turning at **6600 rpm** on an M14 spindle.

That rpm figure is not arbitrary. Bonded abrasive bursts above roughly 80 m/s at the rim. A full 230 mm disc at 6600 rpm reaches **79.5 m/s**. The manufacturer set the speed to sit just under the limit.

The spindle holds 6600 rpm no matter how small the disc becomes. But rim speed scales with diameter:

| Disc diameter | Rim speed | Cutting power |
|---|---|---|
| 230 mm (new) | 79.5 m/s | 100% |
| 200 mm | 69.1 m/s | 87% |
| 180 mm | 62.2 m/s | 78% |
| 150 mm | 51.8 m/s | 65% |

A disc worn to 180 mm has lost **a fifth** of its cutting speed. At 150 mm, **a third**. It feels like a dying motor. Nothing is wrong with the motor.

**Measure the disc before touching the grinder.**

#### Safety consequence

Every disc fitted to this machine must be rated **6600 rpm or higher**. The rating is printed on the disc label — read it.

The lethal case runs the other way. A 230 mm disc rated 6600 rpm, fitted to a small 125 mm grinder running 11000 rpm, reaches **132 m/s** — 1.7× the burst limit. The disc explodes and the fragments leave at the speed of a bullet.

Guard on. Guard tight. Guard between the disc and the body. A 9-inch grinder without its guard is the most dangerous tool in the workshop, and it is not close.

---

### The welder is not faulty. Its nameplate is false.

Marked `MMA-650S`, "Super Power IGBT Series". The plate claims **650 A output** and **27 kVA capacity**.

The same plate states the input: **220 V, 1-phase, 24 A**.

$$220 \times 24 = 5.3\ \text{kVA}$$

Not 27. The plate is out by a factor of five on its own numbers.

Working from the honest figure — 5.3 kVA in, roughly 82% inverter efficiency, roughly 24 V arc voltage for stick welding:

$$\frac{5300 \times 0.82}{24} \approx 180\ \text{A}$$

Across every reasonable assumption (80–85% efficiency, 22–26 V arc) the answer lands between **162 and 204 A**. Call it 180.

To genuinely deliver 650 A would need **86 A of input current** at 220 V. A domestic socket supplies 24. The machine is short by four times, and no printing on the case changes that.

**The `O.C` lamp is the thermal cut-out, not a fault light.** When it trips, the machine has been asked for more than it can give and is protecting itself. That is the design working.

#### What to do instead

The dial numbers and the current meter read a scale that does not match the amps in the arc. Ignore them. Set current by electrode:

| Electrode | Real current |
|---|---|
| 2.5 mm | 70 – 90 A |
| 3.2 mm | 110 – 140 A |
| 4.0 mm | 150 – 180 A |

4.0 mm is the ceiling, and only in short runs. A job needing 5 mm rod needs a different machine.

**Calibrate once by feel.** Strike an arc with a 3.2 mm rod. Adjust until it runs clean — no sticking, no heavy spatter. That dial position is the 3.2 mm setting, whatever number it displays. Mark it with paint. Repeat for 2.5 mm and 4.0 mm. Three marks replace a dishonest display with an honest one.

`IP21S` protection means it must stay dry and upright. Grinding dust and a workshop floor are already outside what it protects against.

#### The hard stop

This is an IGBT inverter. Its capacitors hold a lethal charge after it is unplugged — for minutes, sometimes longer. It carries no brand, no manual, no support, so nobody can say how long is long enough.

Every check in the app is done **from outside the case**: duty cycle, vents, fan, supply voltage. If the fault survives all four, the answer is a qualified electrician. There is no next step — not for Isaac, not for Kennedy, not for Kilama.

The app enforces this. Electrician-only causes render as red cards showing the check but not the fix, and `preventDefault` on the summary click means they cannot be collapsed away.

---

### The drill is a real fault, and the fault names itself.

`Makita HP1630`, 710 W, 220 V, manufactured December 2008. Genuine Makita — parts still available.

Forward works. That single fact proves the motor, brushes, cord and chuck are all sound. Whatever is wrong lives inside the reversing mechanism and nowhere else.

Causes, most likely first:

1. **Reverse contacts dirty** — carbon dust from worn brushes fouls the switch, and the reverse contacts foul first. Work the lever twenty times.
2. **Switch assembly worn** — one part, four screws, two spade connectors.
3. **Brushes worn unevenly** — replace as a pair, never one, then clean the switch.
4. **Motor winding** — rare. On an 18-year-old drill, price it against a new tool.

Brushes and switch are the same failure in two places. Fix one, clean the other.

---

## What the app is

Four files. 44 KB. No backend, no database, no login, no camera, no API.

```
index.html    the app — inline CSS and JS
data.js       the content — tools, symptoms, causes
sw.js         service worker, cache toolfix-v2
manifest.json PWA install
```

Fully offline after first load. The garage is where signal goes to die, so the content ships in the cache rather than over the wire.

### The design argument

Every symptom opens with a check that may end the diagnosis before it starts. Cause lists come second. The home screen says it plainly: **before you open anything.**

The welder's spec table strikes through the two lies in red and prints the truth in green beneath. That is the signature element and the reason the app exists.

### Structure

```
tools[]
  id, name, type, brandKnown, specs{}, notes, safety{}

symptoms[]
  id, toolId, symptom, plain, severity
  normalOperation{}   — this is not a fault
  firstCheck{}        — do this before anything
  disambiguate{}      — the symptom is a question, not a cause
  causes[]            — ordered by likelihood
  warning{}           — hard stop
```

Three fields earned their place by contact with real machines:

- **`normalOperation`** — because the welder wasn't broken
- **`disambiguate`** — because "weak grinder" is three different faults
- **`gate`** — because the welder can kill someone who opens it

---

## What is deliberately absent

No camera. No AI identification. No search. No activity log.

Three tools, three faults, one disambiguation branch. Small on purpose: the schema is proved against real machines before two hundred entries get written against imagined ones.

---

## Corrections made during the build

| First assumed | Actually |
|---|---|
| Grinder unbranded | LICA, made by Dongcheng |
| Grinder 180 mm | **230 mm** |
| Grinder no parts channel | Real maker, real parts |
| Welder ~160 A | ~180 A, confirmed by input current |

The size error mattered. The gap between disc and guard read as wear on a small machine; it was a large machine with a worn disc. The photo of the nameplate corrected it, and the corrected numbers made the diagnosis sharper rather than weaker.

**Unverified:** the Makita brush part number `CB-411` is from memory. Check it against the tool before ordering.

---

## What happens next

1. **Measure the grinder disc.** Everything here rests on the claim that most tool faults are not faults. The grinder is the cheapest test of that claim.
2. **Show it to Kilama. Watch. Do not explain.**
3. **Add faults only as they happen.** Fifteen real incidents beat a hundred invented ones.

---

*Content grounded in the three machines on site. Where a number is calculated, the calculation is shown. Where a machine is dangerous, the app stops.*
