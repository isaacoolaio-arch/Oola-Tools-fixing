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
      { src: "img/grinder-plate.webp", cap: "\u00d8230mm. n\u2080 6600 r/min. M14 spindle. The 6600 is the number every disc must be rated to match or exceed." },
      { src: "img/grinder-disc.webp", cap: "The gap between disc and guard is the wear. The guard is sized for a full 230 mm disc \u2014 this one is well short of it." }
    ],
    notes: "The 6600 rpm on the plate is not arbitrary. A full 230 mm disc turning at 6600 rpm has a rim speed of 79.5 m/s, just under the 80 m/s limit for bonded abrasive. That number is the entire safety margin of this tool.",
    safety: {
      title: "Every disc must be rated 6600 rpm or higher",
      body: "Read the rpm printed on the disc label before fitting it. If the disc's maximum speed is lower than 6600 rpm, it will burst. A 230 mm disc rated 6600 rpm fitted to a small 125 mm grinder running 11000 rpm reaches 132 m/s — nearly twice the safe limit. The fragments leave at the speed of a bullet.",
      rule: "Guard on. Guard tight. Guard between the disc and your body. A 9-inch grinder without its guard is the most dangerous tool in this workshop."
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
    symptom: "Turns clockwise, will not turn anti-clockwise",
    plain: "Forward works. Reverse does nothing.",
    severity: "caution",
    gate: null,
    firstCheck: {
      title: "What the fault already tells you",
      body: "The drill turns. That proves the motor, the brushes, the cord and the chuck are all doing their job. Whatever is wrong is inside the reversing mechanism only. Do not look anywhere else."
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
        parts: ["Makita HP1630 trigger switch assembly"]
      },
      {
        cause: "Brushes worn unevenly",
        likelihood: "occasional",
        check: "Unplug. Remove both brush caps. Compare the two brushes — a brush worn to a slant, or worn to under 6 mm, is finished.",
        fix: "Replace both brushes as a pair, never one. Then clean the switch, because the dust that wore them is inside it.",
        difficulty: "workshop",
        parts: ["Makita CB-411 carbon brushes (pair)"]
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
    symptom: "Spins normally, bogs down under load",
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
  }
];
