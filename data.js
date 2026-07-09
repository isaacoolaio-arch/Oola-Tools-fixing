// ToolFix — fault content for Oola Garage workshop tools
// Content is grounded in the actual machines on site.
// Schema: tools -> symptoms -> (normalOperation | disambiguate | causes)

const TOOLS = [
  {
    id: "drill-makita-hp1630",
    name: "Makita HP1630",
    type: "Impact Drill",
    brandKnown: true,
    specs: {
      "Power": "710 W",
      "Supply": "220 V, 50/60 Hz, 3.4 A",
      "No-load speed": "0–3200 rpm",
      "Impact rate": "0–48000 bpm",
      "Chuck": "13 mm",
      "Capacity": "16 mm masonry, 13 mm steel",
      "Made": "December 2008"
    },
    photos: [
      { src: "img/drill.webp", cap: "Makita HP1630. Eighteen years old, genuine, and still worth repairing." },
      { src: "img/drill-plate.webp", cap: "710 W, 220 V, 3.4 A, 0\u20133200 rpm. Made 2008.12. Everything on this plate is true." }
    ],
    notes: "Genuine Makita. Parts still available. At this age, brushes and switch are the wear items — and they are connected: carbon dust from worn brushes fouls the switch contacts, and the reverse contacts foul first."
  },
  {
    id: "grinder-lica-asm08-230",
    name: "LICA ASM08-230",
    type: "Angle Grinder, 230 mm",
    brandKnown: true,
    specs: {
      "Disc size": "230 mm (9 in)",
      "Spindle speed": "6600 rpm",
      "Spindle thread": "M14",
      "Supply": "228–240 V, 50/60 Hz",
      "Maker": "Jiangsu Dongcheng M&E Tools",
      "Rim speed at full disc": "79.5 m/s"
    },
    photos: [
      { src: "img/disc-label.webp", cap: "The disc says MAX RPM 6600 and 80 m/s. The grinder says 6600 r/min. They match. This is what a correctly chosen disc looks like — check every new one against the machine." },
      { src: "img/grinder-plate.webp", cap: "\u00d8230mm. n\u2080 6600 r/min. M14 spindle. The 6600 is the number every disc must be rated to match or exceed." },
      { src: "img/grinder-disc.webp", cap: "The gap between disc and guard is the wear. The guard is sized for a full 230 mm disc \u2014 this one is well short of it." }
    ],
    notes: "The 6600 rpm on the plate is not arbitrary. A full 230 mm disc turning at 6600 rpm has a rim speed of 79.5 m/s, just under the 80 m/s limit for bonded abrasive. That number is the entire safety margin of this tool.",
    safety: {
      title: "Every disc must be rated 6600 rpm or higher",
      body: "Read the rpm printed on the disc before fitting it. The Winone disc in the workshop says MAX RPM 6600 and 80 m/s — it matches this machine exactly. A disc rated below 6600 rpm will burst on this grinder. A 230 mm disc fitted to a small 125 mm machine running 11000 rpm reaches 132 m/s, nearly twice the safe limit, and the fragments leave at the speed of a bullet.",
      rule: "Guard on. Guard tight. Guard between the disc and your body. The disc itself says USE A SAFETY GUARD. A 9-inch grinder without one is the most dangerous tool in this workshop."
    }
  },
  {
    id: "welder-mma-650s",
    name: "MMA-650S Inverter",
    type: "Stick Welder (MMA)",
    brandKnown: false,
    specs: {
      "Marked output": "20–650 A",
      "Real output": "≈180 A maximum",
      "Input": "220 V, 1-phase, 24 A",
      "Marked capacity": "27 kVA",
      "Real capacity": "≈5.3 kVA",
      "No-load voltage": "40 V",
      "Cooling": "Air",
      "Protection": "IP21S — keep dry, keep upright"
    },
    photos: [
      { src: "img/welder.webp", cap: "MMA-650S. The 650 is not amps this machine can deliver. The small red lamp between the two meters is O.C — the thermal cut-out." }
    ],
    notes: "The nameplate is not honest. 220 V × 24 A = 5.3 kVA of input. At ~82% efficiency and ~24 V arc voltage, that is about 180 A of real output. It cannot produce 650 A; no 220 V single-phase socket can supply that. The dial numbers and the current meter do not correspond to the amps in the arc."
  }
];

const SYMPTOMS = [
  // ─────────────────────────────────────────────────────────────
  {
    id: "drill-no-reverse",
    toolId: "drill-makita-hp1630",
    videos: [{"label": "More videos: drill trigger switch replacement", "url": "https://www.youtube.com/results?search_query=makita+drill+trigger+switch+replacement", "kind": "search"}],
    symptom: "Turns clockwise, will not turn anti-clockwise",
    plain: "Forward works. Reverse does nothing.",
    severity: "caution",
    gate: null,
    firstCheck: {
      title: "Push the reverse lever all the way over",
      body: "Makita's own manual says it: if the trigger will not depress, check the reversing switch is fully set to the A side or the B side. It is a mechanical interlock. A lever stopped halfway locks the trigger, and it feels exactly like a dead reverse. Push it hard until it clicks home.",
      action: "Thirty seconds. Do this before anything else."
    },
    secondCheck: {
      title: "What the fault already tells you",
      body: "The drill turns forward. That proves the motor, the brushes, the cord and the chuck are all doing their job. Whatever is wrong sits in the reversing mechanism alone. Do not look anywhere else."
    },
    causes: [
      {
        cause: "Reverse contacts dirty",
        likelihood: "common",
        check: "Unplug. Work the reverse lever back and forth twenty times. Plug in and try again. If it works intermittently, or works now and fails later, the contacts are fouled, not broken.",
        fix: "Sometimes clears itself with use. If it returns, replace the switch — carbon dust will keep coming back.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Switch assembly worn or broken",
        likelihood: "common",
        check: "Unplug. Open the handle. Test continuity across the switch terminals with the lever in each position. Forward should read closed, reverse open.",
        fix: "Replace the trigger switch module. On the HP1630 this is one part, four screws, two spade connectors.",
        difficulty: "workshop",
        parts: ["Switch DGQ-1104H \u2014 Makita part 650586-0"]
      },
      {
        cause: "Brushes worn unevenly",
        likelihood: "occasional",
        check: "Unplug. Remove both brush caps. Compare the two brushes — a brush worn to a slant, or worn to under 6 mm, is finished.",
        fix: "Replace both brushes as a pair, never one. Then clean the switch, because the dust that wore them is inside it.",
        difficulty: "workshop",
        parts: ["Carbon brush CB-85 \u2014 Makita part 191998-3 (order 2)"]
      },
      {
        cause: "Motor winding fault",
        likelihood: "rare",
        check: "Only after switch and brushes have been ruled out.",
        fix: "Armature or field replacement. On an 18-year-old drill, compare the cost against a new tool before committing.",
        difficulty: "workshop",
        parts: []
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: "grinder-weak",
    toolId: "grinder-lica-asm08-230",
    videos: [{"label": "More videos: angle grinder loses power", "url": "https://www.youtube.com/results?search_query=angle+grinder+weak+loses+power+carbon+brushes", "kind": "search"}],
    sketch: "discAnim",
    symptom: "Grinder feels weak",
    plain: "It runs, but it does not cut the way it used to.",
    severity: "safe",
    gate: null,
    firstCheck: {
      title: "Measure the disc before you touch the grinder",
      body: "This is a 230 mm machine turning at 6600 rpm. Cutting depends on rim speed, and rim speed falls as the disc wears down. The disc keeps turning at 6600 rpm no matter how small it gets — but a smaller circle covers less distance per turn.",
      table: {
        head: ["Disc now", "Rim speed", "Cutting power"],
        rows: [
          ["230 mm (new)", "79.5 m/s", "100%"],
          ["200 mm", "69.1 m/s", "87%"],
          ["180 mm", "62.2 m/s", "78%"],
          ["150 mm", "51.8 m/s", "65%"]
        ]
      },
      after: "At 180 mm you have lost about a fifth of your cutting speed. At 150 mm you have lost a third. Nothing is wrong with the grinder. The disc is finished.",
      action: "Measure across the full width of the disc. Under about 200 mm, fit a new one and try again before reading further."
    },
    disambiguate: {
      question: "With no load — nothing touching the disc — how does it sound and spin?",
      branches: [
        {
          answer: "Normal speed, normal sound. Only weak when I press it into the work.",
          goesTo: "grinder-bogs-under-load"
        },
        {
          answer: "Slow or laboured even with nothing touching it.",
          goesTo: "grinder-slow-freerunning"
        }
      ]
    },
    causes: []
  },

  {
    id: "grinder-bogs-under-load",
    toolId: "grinder-lica-asm08-230",
    videos: [{"label": "More videos: grinder carbon brush replacement", "url": "https://www.youtube.com/results?search_query=angle+grinder+carbon+brush+replacement", "kind": "search"}],
    sketch: "brush",    symptom: "Spins normally, bogs down under load",
    plain: "Full speed in the air. Dies the moment it meets steel.",
    severity: "safe",
    gate: null,
    hidden: true,
    firstCheck: {
      title: "Disc first, still",
      body: "If you have not measured the disc, go back and measure the disc. Also check you are using a cutting disc for cutting and a grinding disc for grinding. They are not interchangeable and using the wrong one feels exactly like a weak motor."
    },
    causes: [
      {
        cause: "Carbon brushes worn",
        likelihood: "common",
        check: "Unplug. Remove the brush caps on either side of the motor housing. A brush shorter than about 6 mm, or one that no longer sits square against the commutator, is done. In a garage that grinds daily, brushes are a consumable — expect to replace them yearly.",
        fix: "Replace both as a pair. LICA is made by Dongcheng — ask for ASM08-230 brushes, or take the old ones to the shop and match the dimensions.",
        difficulty: "workshop",
        parts: ["Carbon brushes — LICA ASM08-230 / Dongcheng"]
      },
      {
        cause: "Mains voltage sagging",
        likelihood: "common",
        check: "Are you on a long extension lead? Is the supply weak at this time of day? A grinder at 190 V instead of 240 V does noticeably less work and nothing is faulty. Try it on a short lead at a socket close to the board.",
        fix: "Shorter, thicker extension lead. This is a supply problem, not a tool problem.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Commutator glazed or scored",
        likelihood: "occasional",
        check: "With brushes out, look at the copper commutator. It should be bright. Black, glazed, or grooved means poor contact.",
        fix: "Clean lightly with fine abrasive paper, turning the armature by hand. Deep grooves need an armature replacement — Dongcheng parts exist, but price them against a new grinder first.",
        difficulty: "workshop",
        parts: []
      },
      {
        cause: "Armature or field winding failing",
        likelihood: "rare",
        check: "Smells hot. Runs hotter than usual for the work done. Only consider after brushes and supply are ruled out.",
        fix: "Armature or field replacement. On a machine this worn, price the parts against a new grinder before committing.",
        difficulty: "workshop",
        parts: []
      }
    ]
  },

  {
    id: "grinder-slow-freerunning",
    toolId: "grinder-lica-asm08-230",
    symptom: "Slow even with nothing touching it",
    plain: "It never reaches full speed, load or no load.",
    severity: "caution",
    gate: null,
    hidden: true,
    firstCheck: {
      title: "Check the supply before the tool",
      body: "A grinder that will not reach speed unloaded is either underfed or mechanically dragging. Rule out the supply first — it costs nothing."
    },
    causes: [
      {
        cause: "Low mains voltage",
        likelihood: "common",
        check: "Try it at a different socket, on a short lead, close to the board. If it comes to life, the tool is fine.",
        fix: "Fix the supply, not the grinder.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Spindle or gearhead bearing dragging",
        likelihood: "common",
        check: "Unplug. Remove the disc. Spin the spindle by hand. It should turn freely and quietly. Grit, roughness, or resistance means a bearing.",
        fix: "Replace the bearing. Standard sizes; take the old one to the shop.",
        difficulty: "workshop",
        parts: ["Spindle bearing — M14 spindle, measure the old one"]
      },
      {
        cause: "Gear damage",
        likelihood: "occasional",
        check: "Grinding or knocking noise from the head that changes with speed.",
        fix: "Gearhead strip. On an unbranded tool, weigh against replacement.",
        difficulty: "workshop",
        parts: []
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: "welder-overheats",
    toolId: "welder-mma-650s",
    videos: [{"label": "More videos: welder duty cycle explained", "url": "https://www.youtube.com/results?search_query=welding+machine+duty+cycle+explained", "kind": "search"}],
    symptom: "Overheats and cuts out",
    plain: "The O.C lamp comes on and it stops welding.",
    severity: "stop-using",
    gate: null,
    normalOperation: {
      title: "This machine is almost certainly working correctly",
      body: "The O.C lamp is the thermal cut-out. It is a protection device, not a fault light. When it trips, the machine has been asked to do more than it can, and it is stopping to save itself. That is the design working.",
      why: "The nameplate says 650 A. It cannot produce 650 A. The input is 220 V at 24 A, which is 5.3 kVA. After efficiency losses, at stick-welding arc voltage, that is about 180 A of real output — and only in bursts. The '27 kVA' and the '650 A' on the case are not true. The dial and the current meter read a scale that does not match the amps in the arc."
    },
    firstCheck: {
      title: "Stop trusting the dial. Set current by electrode.",
      body: "The number on the display is not the amps you are welding at. Ignore it. Choose current by the rod in your hand.",
      table: {
        head: ["Electrode", "Real current"],
        rows: [
          ["2.5 mm", "70 – 90 A"],
          ["3.2 mm", "110 – 140 A"],
          ["4.0 mm", "150 – 180 A"]
        ]
      },
      after: "4.0 mm is this machine's ceiling, and only in short runs. A job needing 5 mm rod needs a different machine.",
      calibrate: "Because the display lies, calibrate once by feel. Strike an arc with a 3.2 mm rod. Adjust until it runs clean — no sticking, no heavy spatter. That dial position is your 3.2 mm setting, whatever number it shows. Mark it with paint. Do the same for 2.5 mm and 4.0 mm. Three marks and you have replaced a dishonest display with an honest one."
    },
    causes: [
      {
        cause: "Duty cycle exceeded",
        likelihood: "common",
        check: "How long were you welding continuously before it tripped? An inverter this size needs to rest. Weld, stop, let the fan run.",
        fix: "Work in bursts. Let it cool with the power on so the fan keeps running. This is not a repair — it is how the machine is meant to be used.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Air vents blocked with grinding dust",
        likelihood: "common",
        check: "Look into the vents front and back. The workshop grinds metal near this machine. Metal dust blocks cooling and it also conducts.",
        fix: "Unplug. Leave it standing at least thirty minutes. Blow the vents out with compressed air from outside the case. Do not open it. Then move the welder away from where grinding happens.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Cooling fan not running",
        likelihood: "occasional",
        check: "Power on, no welding. Stand behind it. You should hear and feel the fan. Silence means the fan has failed and the machine will overheat on any real work.",
        fix: "Stop using it. A fan replacement is inside the case. See the warning below.",
        difficulty: "electrician",
        parts: []
      },
      {
        cause: "Mains voltage sagging under load",
        likelihood: "occasional",
        check: "Does it trip sooner at certain times of day, or on a long lead? Low voltage makes the machine draw more current for the same output, and run hotter.",
        fix: "Short, thick lead. Socket close to the board. Nothing wrong with the welder.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Power components failing",
        likelihood: "rare",
        check: "Only if duty cycle, vents, fan and supply have all been ruled out.",
        fix: "Qualified electrician. Nothing further is shown here, and that is deliberate.",
        difficulty: "electrician",
        parts: []
      }
    ],
    warning: {
      title: "Do not open this machine",
      body: "This is an IGBT inverter. Its capacitors hold a lethal charge after it is unplugged — for minutes, sometimes longer. It carries no brand, no manual, and no support, so nobody can tell you how long is long enough. People have died opening machines like this.",
      rule: "Every check above is done from outside the case. If the fault survives all of them, the answer is a qualified electrician. There is no next step here for you, for Kennedy, or for Kilama."
    }
  },
  // ─────────────────────────────────────────────────────────────
  // Faults common to any brushed tool. Drill and grinder both.
  // ─────────────────────────────────────────────────────────────
  {
    id: "drill-sparking",
    toolId: "drill-makita-hp1630",
    videos: [{"label": "Makita drill: replacing the carbon brushes", "url": "https://www.youtube.com/watch?v=8yID3YWVNq8", "kind": "video"}, {"label": "Drill brush replacement in 3 minutes", "url": "https://www.youtube.com/watch?v=oEMJfhLf9f0", "kind": "video"}, {"label": "More videos: drill carbon brushes", "url": "https://www.youtube.com/results?search_query=drill+carbon+brush+replacement", "kind": "search"}],
    sketch: "brush",    symptom: "Sparks from the motor vents",
    plain: "You can see flashes inside when it runs.",
    severity: "caution",
    normalOperation: {
      title: "Some sparking is normal",
      body: "Sparks come from the carbon brushes rubbing on the spinning commutator. That contact is how current reaches the motor. A brushed tool sparks a little, always, and has done since 2008.",
      why: "What matters is how much. Faint, steady, even sparking is the tool working. Bright flashing, sparks that ring right around the commutator, smoke, or a burning smell is not."
    },
    firstCheck: {
      title: "Which kind of sparking is it?",
      body: "Run the drill in a dim corner with no load. Look through the vents. Faint and even — carry on working. Bright, flashing, or smoking — unplug it now and read on.",
      action: "Smoke or a burning smell: stop. Do not finish the job."
    },
    causes: [
      {
        cause: "Brushes worn short",
        likelihood: "common",
        check: "Unplug. Remove both brush caps. A brush under about 6 mm, worn at a slant, or with a weak spring behind it, is finished. Look at the copper commutator too: bright is good, blackened and grooved is not.",
        fix: "Replace both brushes. Never one. The worn one tells you the other is nearly there.",
        difficulty: "workshop",
        parts: ["Carbon brush CB-85 — Makita part 191998-3 (order 2)"]
      },
      {
        cause: "Commutator damaged by running on worn brushes",
        likelihood: "occasional",
        check: "Blackened segments with visible grooves. This is what happens when brushes are run past the end of their life.",
        fix: "Light clean with fine abrasive paper, armature turned by hand. Deep grooves mean the armature is done — and an armature costs many times what a pair of brushes costs. That is the whole argument for changing brushes early.",
        difficulty: "workshop",
        parts: ["Armature assembly 240V — Makita part 515309-2"]
      },
      {
        cause: "Armature winding shorted",
        likelihood: "rare",
        check: "Heavy sparking that continues with new brushes. Smell of hot varnish.",
        fix: "Armature replacement. On an eighteen-year-old drill, price it against a new tool first.",
        difficulty: "workshop",
        parts: ["Armature assembly 240V — Makita part 515309-2"]
      }
    ]
  },

  {
    id: "drill-chuck-slips",
    toolId: "drill-makita-hp1630",
    videos: [{"label": "More videos: keyed chuck tightening and replacement", "url": "https://www.youtube.com/results?search_query=keyed+drill+chuck+bit+slipping+fix", "kind": "search"}],
    sketch: "chuck",    symptom: "Bit slips or falls out of the chuck",
    plain: "The drill turns but the bit does not.",
    severity: "caution",
    firstCheck: {
      title: "Tighten all three holes, not one",
      body: "The HP1630 has a keyed chuck. Makita's manual is specific: place the chuck key in each of the three holes and tighten each one. Most people tighten one hole and stop. That grips on one jaw and the bit slips under load.",
      action: "Three holes. Every time."
    },
    causes: [
      {
        cause: "Only one hole tightened",
        likelihood: "common",
        check: "Ask whoever last fitted the bit how many holes they used.",
        fix: "Tighten all three, evenly. This is technique, not a fault.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Chuck jaws worn or full of dust",
        likelihood: "common",
        check: "Open the chuck fully. Look into the jaws. Concrete dust packs in and stops them closing square.",
        fix: "Blow out with compressed air. A drop of light oil on the jaw threads. If the jaws are rounded or chipped, replace the chuck.",
        difficulty: "field",
        parts: ["Drill chuck S13 — Makita part 763161-4"]
      },
      {
        cause: "Bit shank chewed",
        likelihood: "occasional",
        check: "Look at the bit, not the drill. A shank already scored by slipping will keep slipping.",
        fix: "Replace the bit. Then tighten three holes.",
        difficulty: "field",
        parts: []
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: "grinder-wrong-disc",
    toolId: "grinder-lica-asm08-230",
    videos: [{"label": "Changing an angle grinder disc, step by step", "url": "https://www.youtube.com/watch?v=YPy6U3ERZ9w", "kind": "video"}, {"label": "Removing a disc safely with the lock button", "url": "https://www.youtube.com/shorts/zA3gIH8QTA0", "kind": "video"}, {"label": "More videos: angle grinder disc change", "url": "https://www.youtube.com/results?search_query=angle+grinder+disc+change+flange+spanner", "kind": "search"}],
    sketch: "flangeExploded",    symptom: "Am I using the right disc?",
    plain: "Cutting disc, grinding wheel. They are not the same.",
    severity: "stop-using",
    firstCheck: {
      title: "Look at the thickness and the centre",
      body: "A cutting disc is thin and flat. A grinding wheel is thick with a raised, depressed centre. They do different jobs and they are not interchangeable. Using one for the other feels exactly like a weak grinder \u2014 and one of the two mistakes will get somebody hurt.",
      table: {
        head: ["Disc", "Thickness", "Use it"],
        rows: [
          ["Cutting (A30TBF)", "3 mm, flat", "Edge-on, to part metal"],
          ["Grinding", "6 mm, raised centre", "Flat, shallow angle, to remove metal"]
        ]
      },
      after: "The Winone disc in the workshop is A30TBF, 230\u00d73\u00d722.23 \u2014 a cutting disc. If it is mounted and someone is grinding flat with it, that is the fault.",
      action: "Never grind flat with a cutting disc. 3 mm has almost no sideways strength. It will shatter."
    },
    causes: [
      {
        cause: "Cutting disc used flat for grinding",
        likelihood: "common",
        check: "Thin disc, held at an angle, sparks flying from the face rather than the edge. Look for a disc worn unevenly or with chips out of the rim.",
        fix: "Stop. Fit a grinding wheel. A cutting disc loaded sideways breaks, and it breaks at 6600 rpm.",
        difficulty: "field",
        parts: ["Grinding wheel, 230 mm, rated \u2265 6600 rpm"]
      },
      {
        cause: "Grinding wheel used edge-on to cut",
        likelihood: "common",
        check: "Thick disc with a raised centre, being used to part steel. It cuts slowly and feels gutless.",
        fix: "Not dangerous, just wrong and slow. Fit a cutting disc.",
        difficulty: "field",
        parts: ["Cutting disc, 230\u00d73\u00d722.23, rated \u2265 6600 rpm"]
      },
      {
        cause: "Disc rated below 6600 rpm",
        likelihood: "occasional",
        check: "Read the label. Every disc prints its maximum rpm. The Winone says 6600 and 80 m/s.",
        fix: "Do not fit it. A disc spun past its rated speed bursts. There is no version of this that is worth the saving.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Flanges wrong way round or missing",
        likelihood: "occasional",
        check: "Inner flange seats on the spindle shoulder, then disc, then outer flange, then nut. A depressed-centre wheel and a flat cutting disc sit differently.",
        fix: "Refit correctly. A disc clamped on a burred or dished flange runs out of true and can crack.",
        difficulty: "field",
        parts: []
      }
    ],
    warning: {
      title: "A 9-inch disc bursting is not a small event",
      body: "At 6600 rpm the rim moves at 80 metres per second. A fragment leaving that disc travels faster than most air rifle pellets, and there is no guard on earth that catches all of it.",
      rule: "Right disc. Right rpm. Guard on. Stand out of the plane of the disc, never in line with it."
    }
  },
  {
    id: "grinder-noise",
    toolId: "grinder-lica-asm08-230",
    videos: [{"label": "3D animation: inside an angle grinder (gears, armature, fan)", "url": "https://www.youtube.com/watch?v=XmKWRtqBKlc", "kind": "video"},{"label": "More videos: grinder bearing and gearbox repair", "url": "https://www.youtube.com/results?search_query=angle+grinder+bearing+gearbox+noise+repair", "kind": "search"}],
    symptom: "Screeching, grinding or rattling noise",
    plain: "It sounds wrong, disc or no disc.",
    severity: "stop-using",
    firstCheck: {
      title: "Take the disc off first",
      body: "Unplug. Remove the disc. Spin the spindle by hand. A good spindle turns freely, quietly, with no grit and no side-to-side play. If the noise is gone with the disc off, the disc or its flanges are the problem, not the grinder.",
      action: "A screeching 230 mm grinder with a disc fitted is not something to keep testing. Disc off, then diagnose."
    },
    causes: [
      {
        cause: "Bearing worn",
        likelihood: "common",
        check: "Spin the spindle by hand. Rumbling, growling, roughness, or any play means a bearing. Grinding dust is what kills them: it gets past the seals and behaves like lapping paste.",
        fix: "Replace with a sealed bearing of the correct size. Take the old one to the shop. Grease it lightly before fitting.",
        difficulty: "workshop",
        parts: ["Sealed spindle bearing — measure the old one"]
      },
      {
        cause: "Gearbox grease dried out or contaminated",
        likelihood: "common",
        check: "Metal-on-metal grinding from the head that changes with speed. On a grinder used daily in a dusty garage, the grease is old.",
        fix: "Open the gear head. Clean out the old grease. Repack with fresh high-temperature grease made for power tool gearboxes. Do this yearly.",
        difficulty: "workshop",
        parts: ["High-temperature gearbox grease"]
      },
      {
        cause: "Bevel gear teeth chipped",
        likelihood: "occasional",
        check: "Rattling or knocking rather than a smooth growl. Inspect the teeth once the head is open.",
        fix: "Replace the gear pair. Never one gear alone — they wear as a matched set.",
        difficulty: "workshop",
        parts: []
      },
      {
        cause: "Disc mounted wrong or flanges damaged",
        likelihood: "common",
        check: "Noise vanishes with the disc removed. Look at the inner and outer flanges: burred, dished, or the wrong way round.",
        fix: "Refit correctly. Inner flange seats on the spindle shoulder, disc, then outer flange. Replace burred flanges.",
        difficulty: "field",
        parts: []
      }
    ]
  },

  {
    id: "grinder-hot",
    toolId: "grinder-lica-asm08-230",
    videos: [{"label": "More videos: grinder overheating causes", "url": "https://www.youtube.com/results?search_query=angle+grinder+overheating+causes", "kind": "search"}],
    symptom: "Gets too hot to hold",
    plain: "Five minutes of work and you cannot touch it.",
    severity: "caution",
    firstCheck: {
      title: "Look at the vents",
      body: "This grinder lives in a garage that makes metal dust for a living. Dust packs into the vents, blankets the motor, and stops it cooling. Heat then kills the insulation, the bearings and the windings — slowly, so nobody notices until it dies.",
      action: "Unplug. Blow the vents out with compressed air after every heavy day. It takes a minute and it is the single best thing you can do for this tool."
    },
    causes: [
      {
        cause: "Vents blocked with grinding dust",
        likelihood: "common",
        check: "Look into the vents front and back.",
        fix: "Compressed air, unplugged. Then do it regularly, not once.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Pushing too hard",
        likelihood: "common",
        check: "Are you leaning on it? A grinder cuts with speed, not force. Pressing harder makes the motor draw more current, heat up, and wear the brushes faster — and it cuts no quicker.",
        fix: "Let the disc do the work. If it will not cut at light pressure, the disc is worn. Change it.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Bearing dragging",
        likelihood: "occasional",
        check: "Spin the spindle by hand, disc off. Resistance means friction, and friction means heat.",
        fix: "Replace the bearing.",
        difficulty: "workshop",
        parts: ["Sealed spindle bearing — measure the old one"]
      },
      {
        cause: "Gearbox grease gone",
        likelihood: "occasional",
        check: "Head noticeably hotter than the motor body.",
        fix: "Repack the gear head.",
        difficulty: "workshop",
        parts: ["High-temperature gearbox grease"]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  {
    id: "welder-rod-sticks",
    toolId: "welder-mma-650s",
    videos: [{"label": "More videos: stick welding, stop electrode sticking", "url": "https://www.youtube.com/results?search_query=stick+welding+electrode+sticking+beginners", "kind": "search"}],
    symptom: "Rod sticks to the work every time",
    plain: "You strike, it welds itself to the plate, you wrench it off.",
    severity: "safe",
    normalOperation: {
      title: "This is almost never the machine",
      body: "Sticking is a setup problem, not a fault. The rod must touch the work to start the arc — there is no voltage on earth that jumps an air gap at 40 V. If the current is too low, or the return path is poor, the rod fuses to the plate before the arc gets going.",
      why: "Small inverters make this worse. This machine's open-circuit voltage is 40 V, which is modest. It needs a clean circuit and enough current to strike reliably."
    },
    firstCheck: {
      title: "The earth clamp, first and always",
      body: "Clamp it to bare, clean metal. Not paint. Not rust. Not mill scale. Not the workbench. Wire-brush a patch and clamp to that. A clamp caked in rust looks fine and blocks the circuit completely. This is the most common cause and it costs nothing to fix.",
      action: "If you can only weld with the earth clamped inches from the rod, the earth path is bad. That is the whole diagnosis."
    },
    causes: [
      {
        cause: "Earth clamp on paint, rust, or scale",
        likelihood: "common",
        check: "Look at where the clamp bites. Wire-brush a patch of bare metal and clamp there.",
        fix: "Clean metal, tight clamp. Check the clamp's own jaws and its cable lug for corrosion.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Current set too low",
        likelihood: "common",
        check: "Dial numbers on this machine mean nothing. Match the rod: 2.5 mm wants 70–90 A, 3.2 mm wants 110–140 A. Too cold and the rod sticks.",
        fix: "Turn it up in small steps until the arc runs clean and steady. Mark that dial position with paint.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Damp or damaged rods",
        likelihood: "common",
        check: "Gulu is humid. Rods left in the open absorb moisture. Chipped or missing flux at the tip will not strike.",
        fix: "Store rods dry and sealed. Grind or snap off a chipped tip. Damp rods also cause porosity in the weld.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Technique — holding the rod down",
        likelihood: "common",
        check: "Scratch like striking a match, then lift immediately to a short arc about the thickness of the rod core. Do not press and hold.",
        fix: "Practice on scrap. Do not twist a stuck rod until the flux breaks off — break the arc, free it, chip the end clean, restart on clean steel.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Polarity reversed",
        likelihood: "occasional",
        check: "The machine has + and − terminals on the front. Most rods want the holder on + and the earth on −. Check the rod box.",
        fix: "Swap the leads. Wrong polarity gives instability, spatter and poor penetration.",
        difficulty: "field",
        parts: []
      },
      {
        cause: "Mains voltage sagging",
        likelihood: "occasional",
        check: "Does it strike at some hours and not others? On a long lead? The machine holds enough to strike, then runs out, and the rod sticks.",
        fix: "Short thick lead, socket near the board. Nothing wrong with the welder.",
        difficulty: "field",
        parts: []
      }
    ]
  },

  {
    id: "welder-knobs",
    toolId: "welder-mma-650s",
    videos: [{"label": "More videos: arc force and hot start explained", "url": "https://www.youtube.com/results?search_query=welder+arc+force+hot+start+explained", "kind": "search"}],
    symptom: "What do the three knobs actually do?",
    plain: "Current, Arc Force, Hot Start. Nobody set them.",
    severity: "safe",
    firstCheck: {
      title: "Three knobs, three jobs",
      body: "Most people in most garages turn Current and ignore the other two. They are not decoration, and on a machine with a dishonest display they matter more, not less.",
      table: {
        head: ["Knob", "What it does", "Where to set it"],
        rows: [
          ["Current", "How much heat the arc makes", "By rod size, not by the number"],
          ["Arc Force", "Kicks current up when the rod nears the plate, stopping it sticking", "Low-mid. Raise if the rod keeps sticking"],
          ["Hot Start", "Extra current for a moment at strike, so the arc lights", "Mid. Raise if it is hard to start"]
        ]
      },
      after: "Arc Force and Hot Start exist to cure exactly the sticking problem above. If a rod sticks, turn Arc Force up before you blame the machine.",
      calibrate: "Set Current by rod. Then adjust Arc Force until the rod stops sticking when you push in close. Then adjust Hot Start until the arc lights on the first scratch. Mark all three with paint once they are right."
    },
    causes: []
  }
];
