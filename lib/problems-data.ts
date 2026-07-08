export type ProblemCategory =
  | "engine"
  | "emissions"
  | "fuel"
  | "sensors"
  | "transmission";

export interface Problem {
  slug: string;
  code: string | null;
  title: string;
  description: string;
  category: ProblemCategory;
  content: string;
  symptoms: string[];
  causes: string[];
  solutions: string[];
  relatedCodes: string[];
  searchVolume: "high" | "medium" | "low";
}

export const categories: Record<
  ProblemCategory,
  { name: string; description: string; icon: string }
> = {
  engine: {
    name: "Engine Problems",
    description: "Common engine issues and misfire codes",
    icon: "engine",
  },
  emissions: {
    name: "Emissions System",
    description: "Catalytic converter and emissions codes",
    icon: "leaf",
  },
  fuel: {
    name: "Fuel System",
    description: "Fuel mixture and injection problems",
    icon: "fuel",
  },
  sensors: {
    name: "Sensors & Electronics",
    description: "O2 sensors, MAF, and electronic issues",
    icon: "cpu",
  },
  transmission: {
    name: "Transmission Issues",
    description: "Automatic and manual transmission codes",
    icon: "cog",
  },
};

export const problems: Problem[] = [
  // Most searched - P0304
  {
    slug: "p0304-misfire-cylinder-4",
    code: "P0304",
    title: "P0304 Code: Cylinder 4 Misfire Detected - Causes & Fixes",
    description:
      "Learn what P0304 means, why cylinder 4 is misfiring, and how to fix it. Complete guide with symptoms, causes, and step-by-step solutions.",
    category: "engine",
    content: `
## What Does P0304 Mean?

The P0304 code indicates that your vehicle's engine control module (ECM) has detected a misfire in cylinder 4. A misfire occurs when the air-fuel mixture in a cylinder fails to ignite properly, leading to reduced engine performance and potential damage if left unaddressed.

## Why Is This Code Important?

Cylinder misfires can cause serious problems including:
- Increased emissions and failed emissions tests
- Damage to the catalytic converter (expensive repair)
- Poor fuel economy
- Engine damage if ignored long-term

## How AI4Car Helps

Our AI-powered diagnostic tool can help you understand the severity of the P0304 code in your specific vehicle, provide personalized recommendations, and track whether the issue returns after repairs.
    `,
    symptoms: [
      "Check engine light flashing or steady",
      "Rough idle or engine vibration",
      "Lack of power during acceleration",
      "Poor fuel economy",
      "Engine hesitation or stumbling",
    ],
    causes: [
      "Worn or fouled spark plug in cylinder 4",
      "Faulty ignition coil on cylinder 4",
      "Damaged spark plug wire or boot",
      "Vacuum leak near cylinder 4",
      "Low fuel pressure or clogged fuel injector",
      "Low compression in cylinder 4",
    ],
    solutions: [
      "Replace the spark plug in cylinder 4",
      "Test and replace the ignition coil if faulty",
      "Inspect and replace spark plug wires if damaged",
      "Check for vacuum leaks and repair",
      "Test fuel injector and clean or replace",
      "Perform a compression test if other fixes fail",
    ],
    relatedCodes: ["P0300", "P0301", "P0302", "P0303"],
    searchVolume: "high",
  },
  // Most searched - P0171
  {
    slug: "p0171-system-too-lean-bank-1",
    code: "P0171",
    title: "P0171 Code: System Too Lean Bank 1 - Complete Guide",
    description:
      "Diagnose and fix P0171 system too lean code. Understand what causes a lean fuel mixture and how to solve it with our comprehensive guide.",
    category: "fuel",
    content: `
## What Does P0171 Mean?

The P0171 code means that the engine control module (ECM) has detected a lean condition on Bank 1 of your engine. A "lean" condition means there is too much air and not enough fuel in the air-fuel mixture.

## Bank 1 Explained

Bank 1 refers to the side of the engine that contains cylinder 1. In inline engines, there is only one bank. In V-type engines, Bank 1 is typically on the side opposite of the harmonic balancer.

## Why This Matters

Running lean can cause:
- Engine overheating
- Pre-ignition and detonation (engine knock)
- Increased NOx emissions
- Potential engine damage over time

## AI4Car Diagnostic Advantage

Use AI4Car to monitor your fuel trims in real-time and identify whether the lean condition is consistent or intermittent, helping pinpoint the exact cause.
    `,
    symptoms: [
      "Check engine light on",
      "Rough idle",
      "Engine hesitation during acceleration",
      "Poor fuel economy",
      "Hard starting, especially when cold",
    ],
    causes: [
      "Vacuum leak (intake manifold, hoses, gaskets)",
      "Dirty or faulty Mass Air Flow (MAF) sensor",
      "Weak fuel pump or clogged fuel filter",
      "Clogged or leaking fuel injectors",
      "Faulty oxygen sensor giving incorrect readings",
      "PCV valve malfunction",
    ],
    solutions: [
      "Inspect for vacuum leaks using smoke test",
      "Clean the MAF sensor with appropriate cleaner",
      "Test fuel pressure and replace pump if low",
      "Clean or replace fuel injectors",
      "Check O2 sensor readings and replace if faulty",
      "Inspect and replace PCV valve if needed",
    ],
    relatedCodes: ["P0174", "P0172", "P0175"],
    searchVolume: "high",
  },
  // Most searched - P0420
  {
    slug: "p0420-catalyst-efficiency-below-threshold",
    code: "P0420",
    title: "P0420 Code: Catalyst System Efficiency Below Threshold",
    description:
      "Everything about P0420 catalytic converter code. Learn if you need a new cat, cheaper fixes, and how to diagnose properly.",
    category: "emissions",
    content: `
## What Does P0420 Mean?

The P0420 code indicates that your catalytic converter is not working as efficiently as it should. The ECM monitors catalyst efficiency by comparing oxygen sensor readings before and after the catalytic converter.

## Is My Catalytic Converter Dead?

Not necessarily! While a failing catalytic converter is a common cause, P0420 can also be triggered by:
- Faulty oxygen sensors
- Exhaust leaks
- Engine misfires damaging the catalyst
- Oil or coolant contamination

## Cost Considerations

Catalytic converters are expensive ($500-$2000+). Before replacing, it's crucial to rule out other causes. Many people waste money replacing a cat when the real problem was a $50 oxygen sensor.

## Smart Diagnostics with AI4Car

AI4Car can help you analyze O2 sensor data patterns to determine if the catalytic converter is truly failing or if another issue is causing the P0420 code.
    `,
    symptoms: [
      "Check engine light on (steady, not flashing)",
      "Failed emissions test",
      "Slight reduction in fuel economy",
      "Rotten egg smell from exhaust (severe cases)",
      "Usually no noticeable driving symptoms",
    ],
    causes: [
      "Worn or failing catalytic converter",
      "Faulty downstream oxygen sensor",
      "Exhaust leak before the catalytic converter",
      "Engine misfire causing catalyst damage",
      "Oil or coolant burning into exhaust",
      "Using leaded fuel or wrong fuel additives",
    ],
    solutions: [
      "First, check for other codes and fix those",
      "Inspect O2 sensors and replace if readings are off",
      "Check for exhaust leaks and repair",
      "Clear code and drive to see if it returns",
      "If confirmed, replace catalytic converter",
      "Consider catalyst cleaning additives as first attempt",
    ],
    relatedCodes: ["P0421", "P0430", "P0431"],
    searchVolume: "high",
  },
  // Most searched - P0130
  {
    slug: "p0130-oxygen-sensor-circuit-malfunction",
    code: "P0130",
    title: "P0130 Code: O2 Sensor Circuit Malfunction Bank 1 Sensor 1",
    description:
      "Fix P0130 oxygen sensor code. Learn about O2 sensor locations, testing procedures, and replacement tips for Bank 1 Sensor 1.",
    category: "sensors",
    content: `
## What Does P0130 Mean?

The P0130 code indicates a malfunction in the oxygen sensor circuit for Bank 1, Sensor 1. This is the upstream O2 sensor located before the catalytic converter on Bank 1.

## O2 Sensor Function

The upstream O2 sensor is critical for fuel management. It measures oxygen content in the exhaust and sends this data to the ECM, which adjusts the fuel mixture for optimal combustion and emissions.

## Sensor Location

Bank 1 Sensor 1 is the first oxygen sensor in the exhaust system on the bank containing cylinder 1. It's typically easy to access from under the hood or underneath the vehicle.

## Using AI4Car for Diagnosis

AI4Car can display live O2 sensor voltage readings, helping you determine if the sensor is responding properly or if the circuit has an issue.
    `,
    symptoms: [
      "Check engine light illuminated",
      "Poor fuel economy",
      "Rough idle",
      "Failed emissions test",
      "Black smoke from exhaust (rich condition)",
    ],
    causes: [
      "Failed oxygen sensor",
      "Damaged wiring or connector",
      "Exhaust leak before the sensor",
      "Short or open in the O2 sensor circuit",
      "ECM/PCM malfunction (rare)",
    ],
    solutions: [
      "Inspect wiring and connector for damage",
      "Check for exhaust leaks near the sensor",
      "Test O2 sensor voltage output with scan tool",
      "Replace oxygen sensor if readings are abnormal",
      "Repair any wiring issues found",
    ],
    relatedCodes: ["P0131", "P0132", "P0133", "P0134"],
    searchVolume: "high",
  },
  // Additional Engine Problems
  {
    slug: "p0300-random-multiple-cylinder-misfire",
    code: "P0300",
    title: "P0300 Code: Random/Multiple Cylinder Misfire Detected",
    description:
      "Diagnose P0300 random misfire code. Learn why multiple cylinders are misfiring and the systematic approach to finding the cause.",
    category: "engine",
    content: `
## What Does P0300 Mean?

The P0300 code indicates that the ECM has detected misfires occurring randomly across multiple cylinders. Unlike specific cylinder misfire codes (P0301-P0312), this code suggests a system-wide issue.

## Why Random Misfires Are Tricky

Because misfires are happening in multiple cylinders, the cause is usually something that affects all cylinders:
- Fuel delivery issues
- Ignition system problems
- Vacuum leaks
- Sensor malfunctions

## Diagnosis Strategy

Start with the basics and work systematically. AI4Car can help you monitor real-time data to see which cylinders are misfiring most frequently.
    `,
    symptoms: [
      "Check engine light flashing",
      "Rough idle affecting multiple cylinders",
      "Significant power loss",
      "Engine may stall",
      "Strong fuel smell from exhaust",
    ],
    causes: [
      "Low fuel pressure",
      "Faulty ignition coil pack",
      "Vacuum leak affecting multiple cylinders",
      "Bad spark plugs (multiple worn)",
      "Failing mass air flow sensor",
      "Timing chain/belt issues",
    ],
    solutions: [
      "Check fuel pressure with gauge",
      "Inspect all spark plugs for wear",
      "Test ignition coils individually",
      "Perform smoke test for vacuum leaks",
      "Check MAF sensor readings",
      "Verify timing is correct",
    ],
    relatedCodes: ["P0301", "P0302", "P0303", "P0304"],
    searchVolume: "medium",
  },
  {
    slug: "p0301-misfire-cylinder-1",
    code: "P0301",
    title: "P0301 Code: Cylinder 1 Misfire Detected - Diagnosis Guide",
    description:
      "Complete guide to P0301 cylinder 1 misfire. Find out what's causing the misfire and how to fix it step by step.",
    category: "engine",
    content: `
## What Does P0301 Mean?

The P0301 code means that cylinder 1 is experiencing a misfire. The engine control module monitors crankshaft speed and detects when a cylinder is not contributing its share of power.

## Cylinder 1 Location

Cylinder 1 is typically at the front of the engine in inline configurations, or follows a specific firing order pattern in V-type engines. Consult your vehicle's service manual for exact location.

## Quick Diagnosis Tip

A simple way to test if it's ignition-related: swap the ignition coil from cylinder 1 with another cylinder. If the misfire follows the coil, you've found your problem.
    `,
    symptoms: [
      "Check engine light on or flashing",
      "Rough idle with engine shake",
      "Loss of power",
      "Increased fuel consumption",
      "Possible backfire",
    ],
    causes: [
      "Worn spark plug in cylinder 1",
      "Faulty ignition coil",
      "Damaged spark plug wire (older vehicles)",
      "Fuel injector problem",
      "Compression loss in cylinder 1",
    ],
    solutions: [
      "Replace cylinder 1 spark plug",
      "Swap coil to test, replace if faulty",
      "Test fuel injector operation",
      "Check compression",
      "Inspect valve train if compression is low",
    ],
    relatedCodes: ["P0300", "P0302", "P0303", "P0304"],
    searchVolume: "medium",
  },
  // Fuel System
  {
    slug: "p0174-system-too-lean-bank-2",
    code: "P0174",
    title: "P0174 Code: System Too Lean Bank 2 - Causes & Solutions",
    description:
      "Fix P0174 lean condition on Bank 2. Often appears with P0171. Learn the common causes and effective repair strategies.",
    category: "fuel",
    content: `
## What Does P0174 Mean?

The P0174 code indicates a lean fuel mixture on Bank 2 of your engine. This code is only possible on V-type or boxer engines that have two cylinder banks.

## P0174 with P0171

If you have both P0171 and P0174, it indicates a lean condition affecting both banks. This usually points to a common cause like:
- Low fuel pressure
- Large vacuum leak
- MAF sensor issues

## Bank 2 Location

Bank 2 is the side of the engine that does NOT contain cylinder 1. The exact location varies by manufacturer.
    `,
    symptoms: [
      "Check engine light on",
      "Rough idle",
      "Hesitation under acceleration",
      "Poor fuel economy",
      "May appear with P0171",
    ],
    causes: [
      "Vacuum leak on Bank 2 side",
      "Low fuel pressure (affects both banks)",
      "MAF sensor contamination",
      "Faulty Bank 2 oxygen sensor",
      "Intake manifold gasket leak",
    ],
    solutions: [
      "If with P0171, focus on common causes first",
      "Check for vacuum leaks on Bank 2",
      "Test fuel pressure",
      "Clean or replace MAF sensor",
      "Inspect intake manifold gaskets",
    ],
    relatedCodes: ["P0171", "P0172", "P0175"],
    searchVolume: "medium",
  },
  // Emissions
  {
    slug: "p0430-catalyst-efficiency-below-threshold-bank-2",
    code: "P0430",
    title: "P0430 Code: Catalyst System Efficiency Below Threshold Bank 2",
    description:
      "P0430 catalytic converter code for Bank 2. Same as P0420 but for the other side. Learn diagnosis and repair options.",
    category: "emissions",
    content: `
## What Does P0430 Mean?

The P0430 code is identical to P0420 but for Bank 2 of your engine. It indicates reduced catalytic converter efficiency on the Bank 2 exhaust.

## V-Engine Considerations

V-type engines have two catalytic converters (one per bank) or a single Y-pipe design. The P0430 specifically monitors Bank 2 catalyst performance.

## Same Diagnostic Approach

The troubleshooting process mirrors P0420 - rule out O2 sensor issues and exhaust leaks before condemning the catalytic converter.
    `,
    symptoms: [
      "Check engine light on",
      "Failed emissions test",
      "May appear with P0420",
      "Minimal drivability symptoms",
    ],
    causes: [
      "Failing Bank 2 catalytic converter",
      "Faulty downstream O2 sensor (Bank 2)",
      "Exhaust leak on Bank 2",
      "Previous engine misfire causing damage",
    ],
    solutions: [
      "Check for P0420 - if both present, look for common cause",
      "Test Bank 2 O2 sensors",
      "Inspect for exhaust leaks",
      "Replace catalytic converter if confirmed bad",
    ],
    relatedCodes: ["P0420", "P0431", "P0421"],
    searchVolume: "medium",
  },
  // Sensors
  {
    slug: "p0101-maf-sensor-range-performance",
    code: "P0101",
    title: "P0101 Code: MAF Sensor Circuit Range/Performance Problem",
    description:
      "Fix P0101 mass air flow sensor code. Learn how to clean, test, and replace your MAF sensor to restore performance.",
    category: "sensors",
    content: `
## What Does P0101 Mean?

The P0101 code indicates that the Mass Air Flow (MAF) sensor is sending readings outside the expected range for current engine conditions.

## MAF Sensor Function

The MAF sensor measures the amount of air entering the engine. This information is critical for the ECM to calculate proper fuel injection amounts.

## Common Fix

Many P0101 codes are solved by simply cleaning the MAF sensor with proper MAF cleaner spray. It's an inexpensive first step before replacement.
    `,
    symptoms: [
      "Check engine light on",
      "Poor acceleration",
      "Rough idle",
      "Stalling",
      "Hard starting",
    ],
    causes: [
      "Dirty MAF sensor element",
      "Air filter restriction",
      "Vacuum leaks after the MAF",
      "Faulty MAF sensor",
      "Wiring/connector issues",
    ],
    solutions: [
      "Clean MAF sensor with MAF cleaner spray",
      "Replace air filter if dirty",
      "Check for vacuum leaks",
      "Inspect wiring and connector",
      "Replace MAF if cleaning doesn't help",
    ],
    relatedCodes: ["P0100", "P0102", "P0103", "P0104"],
    searchVolume: "medium",
  },
  // Transmission
  {
    slug: "p0700-transmission-control-system-malfunction",
    code: "P0700",
    title: "P0700 Code: Transmission Control System Malfunction",
    description:
      "Understand P0700 transmission code. This generic code indicates other transmission codes are stored. Learn how to diagnose.",
    category: "transmission",
    content: `
## What Does P0700 Mean?

The P0700 code is an informational code indicating that the Transmission Control Module (TCM) has detected a fault and stored one or more transmission-related codes.

## Not a Specific Problem

P0700 itself doesn't tell you what's wrong - it's simply a flag that says "check the transmission codes." You need to scan specifically for transmission codes to find the actual problem.

## Using AI4Car

AI4Car can read both engine and transmission codes, helping you identify the specific transmission fault causing the P0700 to appear.
    `,
    symptoms: [
      "Check engine light on",
      "Harsh or delayed shifting",
      "Transmission slipping",
      "Vehicle in limp mode",
      "No symptoms in some cases",
    ],
    causes: [
      "Various transmission issues (see specific codes)",
      "Low transmission fluid",
      "Faulty shift solenoids",
      "Transmission wiring problems",
      "Internal transmission damage",
    ],
    solutions: [
      "Scan for additional transmission codes",
      "Check transmission fluid level and condition",
      "Address specific codes found",
      "May require transmission specialist diagnosis",
    ],
    relatedCodes: ["P0715", "P0720", "P0730", "P0750"],
    searchVolume: "medium",
  },
  {
    slug: "p0730-incorrect-gear-ratio",
    code: "P0730",
    title: "P0730 Code: Incorrect Gear Ratio - Transmission Slipping",
    description:
      "Diagnose P0730 incorrect gear ratio code. Learn what causes transmission gear ratio errors and when repairs are needed.",
    category: "transmission",
    content: `
## What Does P0730 Mean?

The P0730 code indicates that the TCM has detected a gear ratio error - the transmission is not achieving the expected gear ratio for the commanded gear.

## What This Means

In simpler terms, the transmission is slipping. The input and output shaft speeds don't match what they should be for the current gear.

## Serious Code

P0730 often indicates internal transmission problems. While it could be something simple like low fluid, it may require transmission rebuild or replacement.
    `,
    symptoms: [
      "Transmission slipping",
      "RPM flaring between shifts",
      "Harsh or delayed shifts",
      "Reduced fuel economy",
      "Vehicle may go into limp mode",
    ],
    causes: [
      "Low or contaminated transmission fluid",
      "Worn clutch packs",
      "Faulty shift solenoids",
      "Torque converter problems",
      "Internal transmission wear",
    ],
    solutions: [
      "Check transmission fluid level and condition",
      "If fluid is burnt/dark, internal damage likely",
      "Scan for additional codes",
      "May need transmission shop diagnosis",
      "Could require rebuild or replacement",
    ],
    relatedCodes: ["P0700", "P0731", "P0732", "P0733"],
    searchVolume: "low",
  },
  // P0302 - Cylinder 2 Misfire
  {
    slug: "p0302-misfire-cylinder-2",
    code: "P0302",
    title: "P0302 Code: Cylinder 2 Misfire Detected - Causes & Fixes",
    description:
      "Complete guide to P0302 cylinder 2 misfire. Diagnose and fix the misfire with our step-by-step troubleshooting guide.",
    category: "engine",
    content: `
## What Does P0302 Mean?

The P0302 code indicates a misfire detected in cylinder 2. Like other cylinder-specific misfire codes, this points to a problem isolated to that particular cylinder.

## Diagnosis Approach

Start by swapping components between cylinders to isolate the issue - if the misfire moves with the part, you've found the culprit.

## AI4Car Advantage

Use AI4Car to monitor misfire counts in real-time and confirm when the issue is resolved after repairs.
    `,
    symptoms: [
      "Check engine light on or flashing",
      "Rough idle",
      "Loss of power",
      "Engine vibration",
      "Poor fuel economy",
    ],
    causes: [
      "Worn spark plug in cylinder 2",
      "Faulty ignition coil",
      "Fuel injector problem",
      "Vacuum leak near cylinder 2",
      "Low compression",
    ],
    solutions: [
      "Replace spark plug",
      "Test and replace ignition coil",
      "Check fuel injector",
      "Inspect for vacuum leaks",
      "Perform compression test",
    ],
    relatedCodes: ["P0300", "P0301", "P0303", "P0304"],
    searchVolume: "medium",
  },
  // P0303 - Cylinder 3 Misfire
  {
    slug: "p0303-misfire-cylinder-3",
    code: "P0303",
    title: "P0303 Code: Cylinder 3 Misfire Detected - Diagnosis Guide",
    description:
      "Fix P0303 cylinder 3 misfire code. Learn the common causes and proven solutions for cylinder 3 misfiring.",
    category: "engine",
    content: `
## What Does P0303 Mean?

P0303 indicates that cylinder 3 is misfiring. The ECM detects this by monitoring crankshaft position sensor signals for variations in rotational speed.

## Quick Test

Swap the ignition coil from cylinder 3 with another cylinder. If the misfire code changes to follow the coil, replacement is needed.
    `,
    symptoms: [
      "Check engine light flashing or steady",
      "Rough running engine",
      "Power loss",
      "Increased emissions",
      "Hesitation during acceleration",
    ],
    causes: [
      "Bad spark plug",
      "Failed ignition coil",
      "Clogged fuel injector",
      "Vacuum leak",
      "Valve train issues",
    ],
    solutions: [
      "Replace spark plug in cylinder 3",
      "Swap and test ignition coil",
      "Clean or replace fuel injector",
      "Check for vacuum leaks",
      "Test compression",
    ],
    relatedCodes: ["P0300", "P0301", "P0302", "P0304"],
    searchVolume: "medium",
  },
  // P0172 - System Too Rich Bank 1
  {
    slug: "p0172-system-too-rich-bank-1",
    code: "P0172",
    title: "P0172 Code: System Too Rich Bank 1 - Causes & Solutions",
    description:
      "Diagnose P0172 rich fuel mixture code. Learn what causes excess fuel in the air-fuel mixture and how to fix it.",
    category: "fuel",
    content: `
## What Does P0172 Mean?

The P0172 code indicates that Bank 1 of your engine is running rich - there's too much fuel compared to air in the combustion mixture.

## Rich vs Lean

Unlike P0171 (too lean), P0172 means excess fuel is being added. This wastes gas and can damage the catalytic converter over time.

## Common Causes

Often caused by leaking fuel injectors, faulty fuel pressure regulator, or incorrect MAF sensor readings.
    `,
    symptoms: [
      "Check engine light on",
      "Black smoke from exhaust",
      "Poor fuel economy",
      "Fuel smell from exhaust",
      "Rough idle",
    ],
    causes: [
      "Leaking fuel injectors",
      "Faulty fuel pressure regulator",
      "Dirty or faulty MAF sensor",
      "Stuck open EVAP purge valve",
      "Faulty O2 sensor readings",
    ],
    solutions: [
      "Check for leaking fuel injectors",
      "Test fuel pressure regulator",
      "Clean or replace MAF sensor",
      "Inspect EVAP system",
      "Test O2 sensor operation",
    ],
    relatedCodes: ["P0175", "P0171", "P0174"],
    searchVolume: "high",
  },
  // P0175 - System Too Rich Bank 2
  {
    slug: "p0175-system-too-rich-bank-2",
    code: "P0175",
    title: "P0175 Code: System Too Rich Bank 2 - Complete Guide",
    description:
      "Fix P0175 rich condition on Bank 2. Often appears with P0172. Learn causes and repair strategies.",
    category: "fuel",
    content: `
## What Does P0175 Mean?

P0175 indicates a rich fuel condition on Bank 2, meaning too much fuel in the air-fuel mixture on the side of the engine opposite cylinder 1.

## Both Banks Rich?

If you have both P0172 and P0175, look for causes affecting the entire fuel system like fuel pressure or MAF sensor issues.
    `,
    symptoms: [
      "Check engine light on",
      "Black exhaust smoke",
      "Fuel odor",
      "Reduced fuel economy",
      "May appear with P0172",
    ],
    causes: [
      "Leaking fuel injectors on Bank 2",
      "High fuel pressure",
      "MAF sensor issues",
      "O2 sensor malfunction",
      "EVAP system problems",
    ],
    solutions: [
      "If with P0172, check common causes first",
      "Test fuel injectors for leaks",
      "Check fuel pressure",
      "Clean MAF sensor",
      "Inspect O2 sensors",
    ],
    relatedCodes: ["P0172", "P0171", "P0174"],
    searchVolume: "medium",
  },
  // P0131 - O2 Sensor Low Voltage Bank 1 Sensor 1
  {
    slug: "p0131-o2-sensor-low-voltage-bank-1-sensor-1",
    code: "P0131",
    title: "P0131 Code: O2 Sensor Low Voltage Bank 1 Sensor 1",
    description:
      "Diagnose P0131 oxygen sensor low voltage code. Learn why the upstream O2 sensor is reading low and how to fix it.",
    category: "sensors",
    content: `
## What Does P0131 Mean?

P0131 indicates that the upstream oxygen sensor (Bank 1, Sensor 1) is outputting a voltage below the expected range, typically staying below 0.45 volts.

## What Low Voltage Means

A persistently low O2 sensor voltage usually indicates a lean exhaust condition or a failing sensor that can't respond to changes.

## Verify Before Replacing

Don't just replace the sensor - first check for vacuum leaks or other issues causing actual lean conditions.
    `,
    symptoms: [
      "Check engine light on",
      "Poor fuel economy",
      "Rough idle",
      "Hesitation on acceleration",
      "Failed emissions test",
    ],
    causes: [
      "Vacuum leak causing lean condition",
      "Failing O2 sensor",
      "Exhaust leak before sensor",
      "Wiring issues",
      "Low fuel pressure",
    ],
    solutions: [
      "Check for vacuum leaks first",
      "Inspect wiring and connector",
      "Check for exhaust leaks",
      "Test O2 sensor response",
      "Replace sensor if confirmed faulty",
    ],
    relatedCodes: ["P0130", "P0132", "P0133", "P0134"],
    searchVolume: "medium",
  },
  // P0133 - O2 Sensor Slow Response Bank 1 Sensor 1
  {
    slug: "p0133-o2-sensor-slow-response-bank-1-sensor-1",
    code: "P0133",
    title: "P0133 Code: O2 Sensor Slow Response Bank 1 Sensor 1",
    description:
      "Fix P0133 slow responding oxygen sensor. Learn why the O2 sensor is responding slowly and repair options.",
    category: "sensors",
    content: `
## What Does P0133 Mean?

P0133 indicates that the upstream oxygen sensor on Bank 1 is responding too slowly to changes in the exhaust oxygen content.

## Why Response Time Matters

O2 sensors need to switch rapidly between rich and lean readings for proper fuel control. A slow sensor leads to poor fuel economy and increased emissions.

## Common Fix

This code usually means the O2 sensor is worn out and needs replacement. It's a wear item that degrades over time.
    `,
    symptoms: [
      "Check engine light on",
      "Reduced fuel economy",
      "Rough idle",
      "Slight hesitation",
      "Failed emissions test",
    ],
    causes: [
      "Worn O2 sensor",
      "Contaminated sensor element",
      "Exhaust leaks",
      "Wiring deterioration",
      "Engine running issues affecting readings",
    ],
    solutions: [
      "Usually requires O2 sensor replacement",
      "Check for exhaust leaks first",
      "Inspect wiring condition",
      "Address any engine running issues",
      "Clear code and verify fix",
    ],
    relatedCodes: ["P0130", "P0131", "P0132", "P0134"],
    searchVolume: "medium",
  },
  // P0141 - O2 Sensor Heater Circuit Bank 1 Sensor 2
  {
    slug: "p0141-o2-sensor-heater-circuit-bank-1-sensor-2",
    code: "P0141",
    title: "P0141 Code: O2 Sensor Heater Circuit Bank 1 Sensor 2",
    description:
      "Diagnose P0141 oxygen sensor heater code. Learn about the downstream O2 sensor heater circuit and repair options.",
    category: "sensors",
    content: `
## What Does P0141 Mean?

P0141 indicates a problem with the heater circuit for the downstream oxygen sensor (Bank 1, Sensor 2), located after the catalytic converter.

## Why O2 Sensors Have Heaters

O2 sensors need to reach operating temperature (600°F+) to work properly. The heater gets them up to temperature quickly after cold starts.

## Heater Circuit Issues

Problems are usually the heater element inside the sensor failing, or wiring/fuse issues in the heater circuit.
    `,
    symptoms: [
      "Check engine light on",
      "Slight decrease in fuel economy",
      "May take longer to warm up properly",
      "Usually minimal drivability symptoms",
      "Failed emissions test",
    ],
    causes: [
      "Failed O2 sensor heater element",
      "Blown fuse for O2 heater circuit",
      "Wiring or connector issues",
      "ECM/PCM driver circuit problem (rare)",
    ],
    solutions: [
      "Check O2 heater fuse first",
      "Test heater circuit resistance",
      "Inspect wiring and connector",
      "Replace O2 sensor if heater failed",
    ],
    relatedCodes: ["P0140", "P0136", "P0137"],
    searchVolume: "medium",
  },
  // P0442 - EVAP Small Leak
  {
    slug: "p0442-evap-system-small-leak-detected",
    code: "P0442",
    title: "P0442 Code: EVAP System Small Leak Detected",
    description:
      "Fix P0442 evaporative emission system leak. Learn common causes of small EVAP leaks and how to find them.",
    category: "emissions",
    content: `
## What Does P0442 Mean?

P0442 indicates that a small leak has been detected in the EVAP (Evaporative Emission Control) system, which captures fuel vapors from the tank.

## Common Culprit

The most common cause is a loose or damaged gas cap. Always check this first before more extensive diagnosis.

## Finding Small Leaks

Small EVAP leaks can be challenging to find. Smoke testing is the most effective method for locating the source.
    `,
    symptoms: [
      "Check engine light on",
      "Fuel smell near vehicle",
      "Usually no drivability symptoms",
      "Failed emissions test",
    ],
    causes: [
      "Loose or damaged gas cap",
      "Cracked EVAP hoses",
      "Faulty purge valve",
      "Leaking charcoal canister",
      "Fuel tank leak",
    ],
    solutions: [
      "Check and tighten gas cap first",
      "Replace gas cap if damaged",
      "Smoke test EVAP system",
      "Inspect all EVAP hoses",
      "Test purge and vent valves",
    ],
    relatedCodes: ["P0440", "P0441", "P0443", "P0455"],
    searchVolume: "high",
  },
  // P0455 - EVAP Large Leak
  {
    slug: "p0455-evap-system-large-leak-detected",
    code: "P0455",
    title: "P0455 Code: EVAP System Large Leak Detected",
    description:
      "Diagnose P0455 large EVAP leak code. Find out what causes large evaporative system leaks and how to repair.",
    category: "emissions",
    content: `
## What Does P0455 Mean?

P0455 indicates a large leak in the EVAP system - larger than what P0442 detects. This usually means something is significantly wrong or disconnected.

## Easier to Find

Unlike small leaks, large EVAP leaks are usually easier to locate because the problem is more obvious - often a disconnected hose or missing cap.

## Start Simple

Check the gas cap first. A missing or very loose cap will trigger this code immediately.
    `,
    symptoms: [
      "Check engine light on",
      "Strong fuel odor possible",
      "No drivability symptoms typically",
      "Failed emissions test",
    ],
    causes: [
      "Missing or very loose gas cap",
      "Disconnected EVAP hose",
      "Cracked charcoal canister",
      "Stuck open purge or vent valve",
      "Major fuel system leak",
    ],
    solutions: [
      "Verify gas cap is present and tight",
      "Replace gas cap if needed",
      "Visually inspect EVAP hoses",
      "Check charcoal canister",
      "Test purge and vent valves",
    ],
    relatedCodes: ["P0440", "P0441", "P0442", "P0443"],
    searchVolume: "high",
  },
  // P0401 - EGR Insufficient Flow
  {
    slug: "p0401-egr-insufficient-flow-detected",
    code: "P0401",
    title: "P0401 Code: EGR Insufficient Flow Detected",
    description:
      "Fix P0401 EGR flow code. Learn about the exhaust gas recirculation system and how to restore proper flow.",
    category: "emissions",
    content: `
## What Does P0401 Mean?

P0401 indicates that the EGR (Exhaust Gas Recirculation) system is not flowing enough exhaust gas back into the intake manifold.

## EGR Purpose

The EGR system reduces NOx emissions by recirculating a small amount of exhaust gas to lower combustion temperatures.

## Common Issue

Carbon buildup is the most frequent cause. EGR passages and valves get clogged with carbon deposits over time.
    `,
    symptoms: [
      "Check engine light on",
      "Engine knock or ping under load",
      "Rough idle in some cases",
      "Failed emissions test",
      "Slight performance decrease",
    ],
    causes: [
      "Clogged EGR passages",
      "Carbon buildup on EGR valve",
      "Faulty EGR valve",
      "EGR position sensor failure",
      "Vacuum supply issues",
    ],
    solutions: [
      "Clean EGR valve and passages",
      "Replace EGR valve if damaged",
      "Clean intake manifold EGR ports",
      "Check EGR position sensor",
      "Verify vacuum supply to EGR",
    ],
    relatedCodes: ["P0400", "P0402", "P0403", "P0404"],
    searchVolume: "medium",
  },
  // P0505 - Idle Control System
  {
    slug: "p0505-idle-control-system-malfunction",
    code: "P0505",
    title: "P0505 Code: Idle Air Control System Malfunction",
    description:
      "Diagnose P0505 idle control code. Learn about the IAC valve and how to fix idle speed problems.",
    category: "engine",
    content: `
## What Does P0505 Mean?

P0505 indicates a malfunction in the Idle Air Control (IAC) system, which regulates engine idle speed by controlling airflow bypassing the throttle plate.

## IAC Function

The IAC valve opens and closes to adjust idle speed based on engine load (AC, power steering, electrical loads, etc.).

## Symptoms Pattern

Problems typically show up most during transitions - the idle may hang high after deceleration or drop too low and stall.
    `,
    symptoms: [
      "Erratic idle speed",
      "Stalling at idle",
      "High idle speed",
      "Idle hanging after acceleration",
      "Check engine light on",
    ],
    causes: [
      "Dirty IAC valve",
      "Failed IAC valve",
      "Vacuum leaks",
      "Throttle body carbon buildup",
      "Wiring/connector issues",
    ],
    solutions: [
      "Clean IAC valve",
      "Clean throttle body",
      "Check for vacuum leaks",
      "Inspect wiring and connector",
      "Replace IAC valve if needed",
    ],
    relatedCodes: ["P0506", "P0507", "P0508"],
    searchVolume: "medium",
  },
  // P0507 - Idle RPM Higher Than Expected
  {
    slug: "p0507-idle-rpm-higher-than-expected",
    code: "P0507",
    title: "P0507 Code: Idle Control System RPM Higher Than Expected",
    description:
      "Fix P0507 high idle code. Learn why your engine idle speed is too high and how to correct it.",
    category: "engine",
    content: `
## What Does P0507 Mean?

P0507 indicates that the engine idle speed is higher than the ECM's target range, typically more than 200 RPM above the desired idle.

## Why Idle Runs High

High idle is often caused by extra air entering the engine through vacuum leaks, or a stuck IAC valve allowing too much airflow.

## Safety Note

High idle can cause the vehicle to creep forward unexpectedly when in gear. Address this code promptly.
    `,
    symptoms: [
      "High idle speed (over normal)",
      "Vehicle creeps forward in gear",
      "Check engine light on",
      "Idle doesn't drop after warm-up",
      "RPM hangs high after acceleration",
    ],
    causes: [
      "Vacuum leak",
      "IAC valve stuck open",
      "Dirty throttle body",
      "Air intake leak after MAF",
      "Throttle position sensor issues",
    ],
    solutions: [
      "Check for vacuum leaks thoroughly",
      "Clean throttle body and IAC",
      "Inspect intake system for leaks",
      "Test IAC valve operation",
      "Check TPS readings",
    ],
    relatedCodes: ["P0505", "P0506", "P0508"],
    searchVolume: "medium",
  },
  // P0113 - IAT Sensor High Input
  {
    slug: "p0113-iat-sensor-high-input",
    code: "P0113",
    title: "P0113 Code: Intake Air Temperature Sensor High Input",
    description:
      "Fix P0113 IAT sensor code. Learn about intake air temperature sensor problems and solutions.",
    category: "sensors",
    content: `
## What Does P0113 Mean?

P0113 indicates that the Intake Air Temperature (IAT) sensor is sending a voltage signal indicating extremely cold air temperatures (usually below -40°F).

## What This Really Means

In most cases, the sensor isn't actually detecting -40°F air - instead, there's an open circuit in the sensor or wiring causing the high voltage reading.

## IAT Function

The IAT sensor helps the ECM adjust fuel mixture based on incoming air temperature. Cold air is denser and requires more fuel.
    `,
    symptoms: [
      "Check engine light on",
      "Hard starting in warm weather",
      "Rich running condition",
      "Poor fuel economy",
      "Black exhaust smoke possible",
    ],
    causes: [
      "Open circuit in IAT sensor",
      "Damaged wiring or connector",
      "Failed IAT sensor",
      "Corroded connector pins",
      "Poor ground connection",
    ],
    solutions: [
      "Inspect wiring and connector",
      "Check for corrosion",
      "Test sensor resistance",
      "Repair wiring if damaged",
      "Replace IAT sensor if faulty",
    ],
    relatedCodes: ["P0110", "P0111", "P0112", "P0114"],
    searchVolume: "low",
  },
  // P0128 - Coolant Thermostat
  {
    slug: "p0128-coolant-thermostat-below-regulating-temperature",
    code: "P0128",
    title: "P0128 Code: Coolant Thermostat Below Regulating Temperature",
    description:
      "Diagnose P0128 thermostat code. Learn why your engine isn't reaching operating temperature.",
    category: "engine",
    content: `
## What Does P0128 Mean?

P0128 indicates that the engine is not reaching its proper operating temperature quickly enough, or not maintaining temperature under normal driving conditions.

## Usually the Thermostat

In most cases, this code means the thermostat is stuck open, allowing coolant to flow through the radiator constantly and preventing proper warm-up.

## Why Temperature Matters

Modern engines are designed to run at specific temperatures for optimal efficiency and emissions. Running too cool wastes fuel and increases wear.
    `,
    symptoms: [
      "Check engine light on",
      "Temperature gauge reads low",
      "Heater doesn't get hot",
      "Poor fuel economy",
      "Longer warm-up time",
    ],
    causes: [
      "Thermostat stuck open",
      "Faulty coolant temperature sensor",
      "Low coolant level",
      "Thermostat installed incorrectly",
      "Cooling system leak",
    ],
    solutions: [
      "Replace thermostat (most common fix)",
      "Check coolant level",
      "Test coolant temperature sensor",
      "Verify proper thermostat installation",
      "Check for cooling system leaks",
    ],
    relatedCodes: ["P0115", "P0116", "P0117", "P0118"],
    searchVolume: "high",
  },
  // P0340 - Camshaft Position Sensor
  {
    slug: "p0340-camshaft-position-sensor-circuit-malfunction",
    code: "P0340",
    title: "P0340 Code: Camshaft Position Sensor Circuit Malfunction",
    description:
      "Fix P0340 camshaft sensor code. Learn about cam position sensor function and replacement.",
    category: "sensors",
    content: `
## What Does P0340 Mean?

P0340 indicates a malfunction in the camshaft position sensor circuit. This sensor tells the ECM the position of the camshaft for fuel injection and ignition timing.

## Critical Sensor

Without a proper camshaft position signal, the engine may not start at all, or may run very poorly with misfires.

## Sensor Location

The cam sensor is typically located near the camshaft, either in the valve cover area or near the timing cover, depending on engine design.
    `,
    symptoms: [
      "Check engine light on",
      "Engine won't start or hard starting",
      "Engine stalling",
      "Rough running",
      "Misfires",
    ],
    causes: [
      "Failed camshaft position sensor",
      "Damaged wiring or connector",
      "Timing belt/chain jumped",
      "Damaged reluctor wheel",
      "ECM issue (rare)",
    ],
    solutions: [
      "Inspect wiring and connector first",
      "Test sensor output signal",
      "Check timing belt/chain condition",
      "Replace cam sensor if faulty",
      "Verify reluctor wheel integrity",
    ],
    relatedCodes: ["P0341", "P0342", "P0343", "P0345"],
    searchVolume: "high",
  },
  // P0335 - Crankshaft Position Sensor
  {
    slug: "p0335-crankshaft-position-sensor-circuit-malfunction",
    code: "P0335",
    title: "P0335 Code: Crankshaft Position Sensor Circuit Malfunction",
    description:
      "Diagnose P0335 crank sensor code. Learn about the crankshaft position sensor and no-start conditions.",
    category: "sensors",
    content: `
## What Does P0335 Mean?

P0335 indicates a problem with the crankshaft position sensor circuit. This sensor provides critical timing information to the ECM for fuel injection and ignition.

## No-Start Potential

This is one of the sensors that can cause a complete no-start condition. Without a crank signal, the ECM doesn't know the engine position.

## Heat Sensitivity

Crank sensors often fail when hot and work again when cooled. If your car won't restart when hot but starts fine cold, suspect this sensor.
    `,
    symptoms: [
      "Engine won't start",
      "Engine stalls randomly",
      "Check engine light on",
      "Intermittent starting problems",
      "Rough running or misfires",
    ],
    causes: [
      "Failed crankshaft position sensor",
      "Damaged sensor wiring",
      "Damaged reluctor ring",
      "Excessive sensor gap",
      "Connector issues",
    ],
    solutions: [
      "Check wiring and connector",
      "Test sensor output with scope",
      "Check sensor air gap",
      "Inspect reluctor ring",
      "Replace sensor if confirmed bad",
    ],
    relatedCodes: ["P0336", "P0337", "P0338", "P0340"],
    searchVolume: "high",
  },
  // P0715 - Input/Turbine Speed Sensor
  {
    slug: "p0715-input-turbine-speed-sensor-circuit-malfunction",
    code: "P0715",
    title: "P0715 Code: Input/Turbine Speed Sensor Circuit Malfunction",
    description:
      "Fix P0715 transmission speed sensor code. Learn about input shaft speed monitoring and repair options.",
    category: "transmission",
    content: `
## What Does P0715 Mean?

P0715 indicates a problem with the input/turbine speed sensor circuit in the automatic transmission. This sensor monitors the speed of the transmission input shaft.

## Transmission Control

The TCM uses input speed data along with output speed to determine gear ratios and shift timing. Without it, shifting becomes erratic.

## Internal Sensor

On most transmissions, this sensor is internal and requires transmission pan removal or more extensive work to access.
    `,
    symptoms: [
      "Check engine light on",
      "Harsh or erratic shifting",
      "Transmission stuck in one gear",
      "Speedometer issues",
      "Vehicle in limp mode",
    ],
    causes: [
      "Failed input speed sensor",
      "Damaged sensor wiring",
      "Connector issues",
      "TCM malfunction",
      "Low transmission fluid affecting sensor",
    ],
    solutions: [
      "Check transmission fluid level first",
      "Inspect sensor connector",
      "Test sensor resistance and output",
      "Replace sensor if faulty",
      "Scan for additional trans codes",
    ],
    relatedCodes: ["P0700", "P0720", "P0717", "P0716"],
    searchVolume: "medium",
  },
  // P0420 Related - P0421
  {
    slug: "p0421-warm-up-catalyst-efficiency-below-threshold",
    code: "P0421",
    title: "P0421 Code: Warm Up Catalyst Efficiency Below Threshold Bank 1",
    description:
      "Understand P0421 catalyst code. Learn about warm-up catalyst monitoring and efficiency testing.",
    category: "emissions",
    content: `
## What Does P0421 Mean?

P0421 is similar to P0420 but specifically monitors the catalyst efficiency during the warm-up period. It indicates the catalyst isn't heating up or performing properly during this critical phase.

## Warm-Up Monitoring

Modern vehicles monitor catalyst performance as it warms up. If efficiency is poor during this phase, it may indicate a dying catalyst.

## Similar Diagnosis

Troubleshoot P0421 the same way as P0420 - check O2 sensors and exhaust leaks before replacing the catalytic converter.
    `,
    symptoms: [
      "Check engine light on",
      "Failed emissions test",
      "Usually no drivability symptoms",
      "May appear with P0420",
    ],
    causes: [
      "Failing catalytic converter",
      "Faulty oxygen sensor",
      "Exhaust leak",
      "Engine misfire damaging catalyst",
    ],
    solutions: [
      "Check for other codes first",
      "Test O2 sensor operation",
      "Inspect for exhaust leaks",
      "Replace catalyst if confirmed bad",
    ],
    relatedCodes: ["P0420", "P0430", "P0431"],
    searchVolume: "low",
  },
  // P0011 - Camshaft Position Timing Over-Advanced Bank 1
  {
    slug: "p0011-camshaft-position-timing-over-advanced-bank-1",
    code: "P0011",
    title: "P0011 Code: Camshaft Position Timing Over-Advanced Bank 1",
    description:
      "Fix P0011 variable valve timing code. Learn what causes over-advanced cam timing on Bank 1 and how to repair it.",
    category: "engine",
    content: `
## What Does P0011 Mean?

The P0011 code indicates that the camshaft timing on Bank 1 is more advanced than what the ECM commanded. This is part of the Variable Valve Timing (VVT) or VCT system that adjusts cam timing for performance and efficiency.

## How VVT Works

The ECM uses an oil control valve (solenoid) to adjust camshaft position. When the actual timing doesn't match the commanded position, P0011 is set.

## Common Culprit

Dirty engine oil is the number one cause. The VVT system relies on clean oil at proper pressure to function correctly.

## How AI4Car Helps

AI4Car can monitor live camshaft timing data and oil control valve duty cycles to confirm whether the VVT system is responding correctly.
    `,
    symptoms: [
      "Check engine light on",
      "Rough idle or stalling",
      "Reduced engine performance",
      "Poor fuel economy",
      "Engine noise or rattling at startup",
    ],
    causes: [
      "Dirty or low engine oil",
      "Faulty camshaft oil control valve (VVT solenoid)",
      "Clogged VVT solenoid screen",
      "Worn camshaft phaser/actuator",
      "Wiring or connector issues",
    ],
    solutions: [
      "Change engine oil and filter with correct grade",
      "Clean or replace the VVT/oil control solenoid",
      "Inspect solenoid screen for debris",
      "Check wiring and connector to the solenoid",
      "Replace camshaft phaser if actuator is worn",
    ],
    relatedCodes: ["P0010", "P0012", "P0021", "P0014"],
    searchVolume: "medium",
  },
  // P0016 - Crankshaft/Camshaft Position Correlation
  {
    slug: "p0016-crankshaft-camshaft-position-correlation-bank-1",
    code: "P0016",
    title:
      "P0016 Code: Crankshaft/Camshaft Position Correlation Bank 1 Sensor A",
    description:
      "Diagnose P0016 timing correlation code. Learn why the crank and cam signals are out of sync and how to fix it.",
    category: "engine",
    content: `
## What Does P0016 Mean?

The P0016 code indicates that the crankshaft and camshaft position sensors are out of correlation - the timing relationship between them is not what the ECM expects.

## Why This Matters

Proper crank-to-cam timing is essential for fuel injection and ignition. When they're out of sync, the engine may run poorly or not start at all.

## Common Causes

This code is often caused by a stretched timing chain, a faulty VVT actuator, or oil flow problems affecting cam timing.

## AI4Car Diagnostic Advantage

AI4Car can compare crankshaft and camshaft sensor data to help pinpoint whether the issue is mechanical timing or a sensor fault.
    `,
    symptoms: [
      "Check engine light on",
      "Hard starting or no-start",
      "Rough idle",
      "Rattling noise from timing cover",
      "Reduced power",
    ],
    causes: [
      "Stretched or worn timing chain",
      "Faulty VVT actuator or phaser",
      "Low or dirty engine oil",
      "Failed crankshaft or camshaft sensor",
      "Jumped timing or worn guides/tensioner",
    ],
    solutions: [
      "Check oil level and condition first",
      "Inspect timing chain for stretch and slack",
      "Test camshaft and crankshaft sensors",
      "Replace VVT solenoid if sticking",
      "Replace timing chain, guides, and tensioner if worn",
    ],
    relatedCodes: ["P0017", "P0008", "P0009", "P0340"],
    searchVolume: "medium",
  },
  // P0102 - MAF Sensor Low Input
  {
    slug: "p0102-maf-sensor-circuit-low-input",
    code: "P0102",
    title: "P0102 Code: Mass Air Flow Sensor Circuit Low Input",
    description:
      "Fix P0102 MAF low input code. Learn why your mass air flow sensor reads low and how to clean, test, or replace it.",
    category: "sensors",
    content: `
## What Does P0102 Mean?

The P0102 code indicates that the Mass Air Flow (MAF) sensor signal is lower than the expected range. The ECM relies on the MAF to measure incoming air and calculate fuel delivery.

## Low Reading Effects

A low MAF reading makes the ECM think less air is entering than actually is, which can cause a lean condition and poor performance.

## Start With Cleaning

A dirty MAF sensor element is a frequent cause. Cleaning with proper MAF cleaner is an inexpensive first step before replacement.

## Using AI4Car

AI4Car can display live MAF readings in grams per second, helping you confirm if the sensor output is realistic for engine RPM and load.
    `,
    symptoms: [
      "Check engine light on",
      "Lack of power or hesitation",
      "Rough or stalling idle",
      "Hard starting",
      "Poor fuel economy",
    ],
    causes: [
      "Dirty MAF sensor element",
      "Air intake leak or restriction",
      "Faulty MAF sensor",
      "Damaged wiring or connector",
      "Clogged air filter",
    ],
    solutions: [
      "Clean the MAF sensor with MAF-specific cleaner",
      "Inspect intake ducting for leaks or cracks",
      "Replace a dirty air filter",
      "Check wiring and connector for damage",
      "Replace the MAF sensor if cleaning fails",
    ],
    relatedCodes: ["P0100", "P0101", "P0103", "P0104"],
    searchVolume: "medium",
  },
  // P0135 - O2 Sensor Heater Circuit Bank 1 Sensor 1
  {
    slug: "p0135-o2-sensor-heater-circuit-bank-1-sensor-1",
    code: "P0135",
    title: "P0135 Code: O2 Sensor Heater Circuit Malfunction Bank 1 Sensor 1",
    description:
      "Diagnose P0135 oxygen sensor heater code. Learn about the upstream O2 sensor heater circuit and repair options.",
    category: "sensors",
    content: `
## What Does P0135 Mean?

The P0135 code indicates a malfunction in the heater circuit of the upstream oxygen sensor (Bank 1, Sensor 1), located before the catalytic converter.

## Why O2 Heaters Matter

The heater brings the sensor up to operating temperature quickly so it can provide accurate readings shortly after a cold start, reducing emissions during warm-up.

## Typical Failure

The most common cause is the heater element inside the sensor failing, though blown fuses and wiring problems can also trigger it.

## AI4Car Diagnostic Help

AI4Car can monitor O2 sensor activity to confirm whether the sensor is heating up and switching properly, helping distinguish a heater fault from a wiring issue.
    `,
    symptoms: [
      "Check engine light on",
      "Poor fuel economy",
      "Failed emissions test",
      "Longer time to enter closed loop",
      "Usually minimal drivability symptoms",
    ],
    causes: [
      "Failed O2 sensor heater element",
      "Blown O2 heater fuse",
      "Damaged wiring or connector",
      "Corroded connector pins",
      "ECM driver circuit fault (rare)",
    ],
    solutions: [
      "Check the O2 heater fuse first",
      "Measure heater circuit resistance",
      "Inspect wiring and connector for damage",
      "Repair corroded or damaged wiring",
      "Replace the O2 sensor if the heater has failed",
    ],
    relatedCodes: ["P0130", "P0131", "P0141", "P0155"],
    searchVolume: "medium",
  },
  // P0299 - Turbocharger/Supercharger Underboost
  {
    slug: "p0299-turbocharger-underboost-condition",
    code: "P0299",
    title: "P0299 Code: Turbocharger/Supercharger Underboost Condition",
    description:
      "Fix P0299 turbo underboost code. Learn why your turbo isn't making enough boost and how to diagnose the cause.",
    category: "engine",
    content: `
## What Does P0299 Mean?

The P0299 code indicates that the turbocharger or supercharger is producing less boost pressure than the ECM commanded - an underboost condition.

## Why Boost Drops

Underboost is commonly caused by boost leaks, a stuck wastegate, or failing turbo components. Even a small leak in the charge piping can trigger this code.

## Performance Impact

You'll usually notice a clear loss of power and the vehicle may enter a reduced-power "limp" mode to protect the engine.

## How AI4Car Helps

AI4Car can monitor commanded versus actual boost pressure in real time, helping you confirm whether the turbo is underperforming and when.
    `,
    symptoms: [
      "Check engine light on",
      "Noticeable loss of power",
      "Vehicle enters limp mode",
      "Hissing sound from boost leak",
      "Hesitation under acceleration",
    ],
    causes: [
      "Boost/charge pipe leak or loose clamp",
      "Stuck or faulty wastegate",
      "Failing turbocharger",
      "Faulty boost pressure sensor",
      "Clogged or restricted intake",
    ],
    solutions: [
      "Inspect all charge pipes and clamps for leaks",
      "Test wastegate and actuator operation",
      "Check the boost pressure sensor reading",
      "Inspect turbo for shaft play or damage",
      "Verify diverter/blow-off valve seals properly",
    ],
    relatedCodes: ["P0234", "P0238", "P00AF", "P2263"],
    searchVolume: "medium",
  },
  // P0325 - Knock Sensor Circuit Malfunction
  {
    slug: "p0325-knock-sensor-circuit-malfunction-bank-1",
    code: "P0325",
    title: "P0325 Code: Knock Sensor 1 Circuit Malfunction Bank 1",
    description:
      "Diagnose P0325 knock sensor code. Learn what the knock sensor does and how to test and replace it.",
    category: "sensors",
    content: `
## What Does P0325 Mean?

The P0325 code indicates a fault in the knock sensor circuit on Bank 1. The knock sensor detects engine detonation (pinging) so the ECM can retard ignition timing to protect the engine.

## Why It Matters

Without a working knock sensor, the ECM may pull timing as a precaution, reducing power and fuel economy, or fail to protect the engine from damaging detonation.

## Common Causes

Failed sensors, damaged wiring, and loose mounting are typical. On many engines the knock sensor sits under the intake manifold, making access labor-intensive.

## Using AI4Car

AI4Car can read knock sensor activity and ignition timing corrections to help confirm whether the sensor circuit is functioning.
    `,
    symptoms: [
      "Check engine light on",
      "Reduced power or sluggish acceleration",
      "Engine ping or knock under load",
      "Slightly reduced fuel economy",
      "Higher engine temperatures in some cases",
    ],
    causes: [
      "Failed knock sensor",
      "Damaged wiring or connector",
      "Loose sensor mounting bolt",
      "Corrosion at the connector",
      "ECM fault (rare)",
    ],
    solutions: [
      "Inspect wiring and connector for damage",
      "Verify the sensor is torqued to spec",
      "Test knock sensor resistance",
      "Repair corroded or damaged wiring",
      "Replace the knock sensor if faulty",
    ],
    relatedCodes: ["P0326", "P0327", "P0328", "P0330"],
    searchVolume: "low",
  },
  // P0440 - EVAP System Malfunction
  {
    slug: "p0440-evap-system-malfunction",
    code: "P0440",
    title: "P0440 Code: Evaporative Emission Control System Malfunction",
    description:
      "Fix P0440 EVAP system code. Learn what triggers a general EVAP fault and how to track down the source.",
    category: "emissions",
    content: `
## What Does P0440 Mean?

The P0440 code indicates a general malfunction in the EVAP (Evaporative Emission Control) system, which captures and recycles fuel vapors from the tank instead of releasing them into the atmosphere.

## A Broad Code

Unlike specific leak codes, P0440 is a general fault. It often points to a leak, a faulty valve, or a sealing problem somewhere in the EVAP system.

## Start With the Gas Cap

As with most EVAP codes, a loose or worn gas cap is the easiest and most common cause to check first.

## How AI4Car Helps

AI4Car can read EVAP system monitor status and related codes, helping you narrow down whether the fault is a leak, a valve, or a sensor.
    `,
    symptoms: [
      "Check engine light on",
      "Fuel odor near the vehicle",
      "Failed emissions test",
      "Usually no drivability symptoms",
    ],
    causes: [
      "Loose, damaged, or missing gas cap",
      "Cracked or disconnected EVAP hose",
      "Faulty purge or vent valve",
      "Leaking charcoal canister",
      "Faulty pressure sensor",
    ],
    solutions: [
      "Inspect and tighten or replace the gas cap",
      "Smoke test the EVAP system for leaks",
      "Inspect EVAP hoses and connections",
      "Test purge and vent valve operation",
      "Inspect the charcoal canister for cracks",
    ],
    relatedCodes: ["P0441", "P0442", "P0446", "P0455"],
    searchVolume: "medium",
  },
  // P0446 - EVAP Vent Control Circuit
  {
    slug: "p0446-evap-vent-control-circuit-malfunction",
    code: "P0446",
    title: "P0446 Code: EVAP Vent Control Circuit Malfunction",
    description:
      "Diagnose P0446 EVAP vent valve code. Learn about the vent control valve and how to fix circuit problems.",
    category: "emissions",
    content: `
## What Does P0446 Mean?

The P0446 code indicates a problem with the EVAP vent control valve circuit. The vent valve allows fresh air into the charcoal canister during purge and seals the system for leak testing.

## Why the Vent Valve Matters

If the vent valve sticks or its circuit fails, the EVAP system can't properly seal or vent, which prevents accurate leak testing and triggers this code.

## Common Cause

The vent valve is often mounted near the charcoal canister under the vehicle, where dirt, debris, and corrosion can cause it to stick.

## AI4Car Diagnostic Advantage

AI4Car can command and monitor the EVAP vent valve, helping you confirm whether the valve and its circuit respond correctly.
    `,
    symptoms: [
      "Check engine light on",
      "Failed emissions test",
      "Fuel odor in some cases",
      "Difficulty refueling (pump clicks off)",
      "Usually no drivability symptoms",
    ],
    causes: [
      "Faulty EVAP vent control valve",
      "Debris or dirt blocking the valve",
      "Damaged wiring or connector",
      "Corroded valve or connector",
      "Faulty charcoal canister",
    ],
    solutions: [
      "Inspect the vent valve for debris and corrosion",
      "Check wiring and connector at the valve",
      "Test the valve for proper opening and closing",
      "Clean or replace the vent valve",
      "Inspect the charcoal canister if needed",
    ],
    relatedCodes: ["P0440", "P0441", "P0449", "P0455"],
    searchVolume: "low",
  },
  // P0456 - EVAP Very Small Leak
  {
    slug: "p0456-evap-system-very-small-leak-detected",
    code: "P0456",
    title: "P0456 Code: EVAP System Very Small Leak Detected",
    description:
      "Fix P0456 very small EVAP leak code. Learn how to find tiny evaporative system leaks and common fixes.",
    category: "emissions",
    content: `
## What Does P0456 Mean?

The P0456 code indicates a very small leak detected in the EVAP system - even smaller than the leak that triggers P0442. These tiny leaks can be tricky to locate.

## The Usual Suspect

A loose or imperfectly sealing gas cap is by far the most common cause. The cap seal hardens and shrinks with age, allowing tiny leaks.

## Finding Tiny Leaks

Smoke testing is the most reliable way to find very small leaks, since they're often too small to detect by sight or smell.

## How AI4Car Helps

AI4Car can read EVAP monitor readiness and confirm whether the code returns after a repair, so you know if the leak is truly fixed.
    `,
    symptoms: [
      "Check engine light on",
      "Usually no drivability symptoms",
      "Failed emissions test",
      "Occasional faint fuel odor",
    ],
    causes: [
      "Loose or worn gas cap seal",
      "Small crack in an EVAP hose",
      "Aged O-rings or seals",
      "Hairline crack in the charcoal canister",
      "Leaking purge or vent valve seal",
    ],
    solutions: [
      "Tighten or replace the gas cap first",
      "Smoke test the EVAP system",
      "Inspect hoses and seals for tiny cracks",
      "Replace aged O-rings and seals",
      "Test purge and vent valves for leak-tight sealing",
    ],
    relatedCodes: ["P0442", "P0455", "P0440", "P0457"],
    searchVolume: "medium",
  },
  // P0500 - Vehicle Speed Sensor
  {
    slug: "p0500-vehicle-speed-sensor-malfunction",
    code: "P0500",
    title: "P0500 Code: Vehicle Speed Sensor A Malfunction",
    description:
      "Diagnose P0500 vehicle speed sensor code. Learn how the VSS works and how to fix speedometer and shift issues.",
    category: "sensors",
    content: `
## What Does P0500 Mean?

The P0500 code indicates a malfunction with the Vehicle Speed Sensor (VSS). The VSS measures how fast the vehicle is traveling and sends that data to the ECM and TCM.

## Why Speed Data Matters

Vehicle speed affects shift timing, cruise control, the speedometer, and even fuel delivery. A bad VSS signal can cause multiple drivability issues.

## Common Causes

A failed sensor, damaged wiring, or a bad connector are typical. On many vehicles the VSS is mounted on the transmission or transfer case.

## Using AI4Car

AI4Car can display live vehicle speed data, helping you confirm whether the sensor signal is present and accurate while driving.
    `,
    symptoms: [
      "Speedometer not working or erratic",
      "Check engine light on",
      "Harsh or erratic shifting",
      "Cruise control won't engage",
      "ABS or traction control warnings in some cases",
    ],
    causes: [
      "Failed vehicle speed sensor",
      "Damaged wiring or connector",
      "Faulty reluctor/tone ring",
      "Loose or corroded connections",
      "ECM/TCM fault (rare)",
    ],
    solutions: [
      "Inspect VSS wiring and connector",
      "Test the sensor signal output",
      "Check the reluctor ring for damage",
      "Repair any wiring or connector faults",
      "Replace the speed sensor if faulty",
    ],
    relatedCodes: ["P0501", "P0502", "P0503", "P0720"],
    searchVolume: "medium",
  },
  // P0521 - Oil Pressure Sensor Range/Performance
  {
    slug: "p0521-engine-oil-pressure-sensor-range-performance",
    code: "P0521",
    title: "P0521 Code: Engine Oil Pressure Sensor/Switch Range/Performance",
    description:
      "Fix P0521 oil pressure sensor code. Learn what causes oil pressure sensor faults and when low oil pressure is real.",
    category: "engine",
    content: `
## What Does P0521 Mean?

The P0521 code indicates that the engine oil pressure sensor or switch is reading outside its expected range, or the signal doesn't match actual engine conditions.

## Important Safety Note

While this is often a sensor fault, it can also indicate genuinely low oil pressure - which is serious. Always verify actual oil pressure with a mechanical gauge before assuming it's just a sensor.

## Common Causes

A faulty oil pressure sensor, low oil level, dirty oil, or wiring problems are typical. VVT-equipped engines are especially sensitive to oil condition.

## How AI4Car Helps

AI4Car can display the oil pressure sensor reading, helping you compare it against a mechanical gauge to determine if the problem is the sensor or actual oil pressure.
    `,
    symptoms: [
      "Check engine light on",
      "Oil pressure warning light or gauge fluctuation",
      "Erratic oil pressure readings",
      "Possible engine noise if pressure is truly low",
      "VVT-related codes may accompany it",
    ],
    causes: [
      "Faulty oil pressure sensor/switch",
      "Low or dirty engine oil",
      "Damaged wiring or connector",
      "Clogged oil passages",
      "Worn oil pump (if pressure is genuinely low)",
    ],
    solutions: [
      "Check oil level and condition first",
      "Verify actual pressure with a mechanical gauge",
      "Inspect wiring and connector to the sensor",
      "Replace the oil pressure sensor if faulty",
      "Address oil pump or passage issues if pressure is truly low",
    ],
    relatedCodes: ["P0520", "P0522", "P0523", "P0524"],
    searchVolume: "medium",
  },
  // P0606 - PCM Processor Fault
  {
    slug: "p0606-pcm-processor-fault",
    code: "P0606",
    title: "P0606 Code: ECM/PCM Processor Fault",
    description:
      "Diagnose P0606 PCM processor code. Learn what an internal control module fault means and how to address it.",
    category: "engine",
    content: `
## What Does P0606 Mean?

The P0606 code indicates an internal processor fault within the Powertrain Control Module (PCM) or Engine Control Module (ECM) - essentially the computer has detected an internal performance problem.

## Not Always the Computer

Before condemning the PCM, it's important to rule out power supply and ground issues. Poor grounds, low battery voltage, and corroded connectors can trigger this code.

## Why It's Serious

Because the PCM controls the engine, a genuine internal fault can cause stalling, no-start, or erratic operation, and may require reprogramming or replacement.

## How AI4Car Helps

AI4Car can read all stored codes and monitor module data, helping you identify accompanying power or ground issues before assuming the PCM has failed.
    `,
    symptoms: [
      "Check engine light on",
      "Engine stalling or no-start",
      "Erratic engine behavior",
      "Multiple unrelated codes stored",
      "Reduced power mode",
    ],
    causes: [
      "Poor PCM ground connection",
      "Low battery or charging voltage",
      "Corroded PCM connectors",
      "Water intrusion or wiring damage",
      "Internal PCM failure",
    ],
    solutions: [
      "Inspect and clean PCM grounds",
      "Test battery and charging system voltage",
      "Inspect PCM connectors for corrosion",
      "Check for water intrusion near the module",
      "Reprogram or replace the PCM if confirmed faulty",
    ],
    relatedCodes: ["P0605", "P0607", "P0601", "P0604"],
    searchVolume: "low",
  },
  // P0720 - Output Speed Sensor Circuit
  {
    slug: "p0720-output-speed-sensor-circuit-malfunction",
    code: "P0720",
    title: "P0720 Code: Output Speed Sensor Circuit Malfunction",
    description:
      "Fix P0720 transmission output speed sensor code. Learn how it affects shifting and the speedometer.",
    category: "transmission",
    content: `
## What Does P0720 Mean?

The P0720 code indicates a problem with the output speed sensor circuit in the automatic transmission. This sensor measures the rotational speed of the transmission output shaft.

## How It's Used

The TCM compares output speed with input speed to calculate gear ratios and control shift timing. The output speed signal also frequently feeds the speedometer.

## Common Causes

A failed sensor, damaged wiring, or low transmission fluid affecting the sensor are typical causes. Connector corrosion is also common.

## Using AI4Car

AI4Car can display live transmission output speed data, helping you confirm whether the sensor signal is present and accurate.
    `,
    symptoms: [
      "Check engine light on",
      "Erratic or harsh shifting",
      "Speedometer inaccurate or not working",
      "Transmission stuck in one gear",
      "Vehicle in limp mode",
    ],
    causes: [
      "Failed output speed sensor",
      "Damaged wiring or connector",
      "Low or dirty transmission fluid",
      "Connector corrosion",
      "TCM fault (rare)",
    ],
    solutions: [
      "Check transmission fluid level and condition",
      "Inspect the sensor connector and wiring",
      "Test the sensor's signal output",
      "Replace the output speed sensor if faulty",
      "Scan for additional transmission codes",
    ],
    relatedCodes: ["P0700", "P0715", "P0717", "P0500"],
    searchVolume: "medium",
  },
  // P0740 - Torque Converter Clutch Circuit
  {
    slug: "p0740-torque-converter-clutch-circuit-malfunction",
    code: "P0740",
    title: "P0740 Code: Torque Converter Clutch Circuit Malfunction",
    description:
      "Diagnose P0740 torque converter clutch code. Learn about TCC operation and what causes lockup problems.",
    category: "transmission",
    content: `
## What Does P0740 Mean?

The P0740 code indicates a malfunction in the Torque Converter Clutch (TCC) circuit. The TCC locks the torque converter at cruising speeds to improve fuel economy by eliminating slippage.

## Symptoms of TCC Problems

When the TCC doesn't engage or disengages improperly, you may notice higher RPM at cruising speed, shuddering, or stalling when coming to a stop.

## Common Causes

A faulty TCC solenoid, low or contaminated fluid, or internal torque converter problems are typical. Wiring issues can also trigger this code.

## How AI4Car Helps

AI4Car can monitor TCC lockup status and slip data, helping you determine whether the converter clutch is engaging when commanded.
    `,
    symptoms: [
      "Check engine light on",
      "Higher RPM at highway speeds",
      "Shuddering during light acceleration",
      "Stalling when coming to a stop",
      "Reduced fuel economy",
    ],
    causes: [
      "Faulty torque converter clutch solenoid",
      "Low or contaminated transmission fluid",
      "Damaged wiring or connector",
      "Internal torque converter problems",
      "Valve body or pressure issues",
    ],
    solutions: [
      "Check transmission fluid level and condition",
      "Inspect TCC solenoid wiring and connector",
      "Test the TCC solenoid operation",
      "Replace the TCC solenoid if faulty",
      "Inspect the torque converter if problems persist",
    ],
    relatedCodes: ["P0741", "P0742", "P0743", "P0700"],
    searchVolume: "medium",
  },
  // P0750 - Shift Solenoid A Malfunction
  {
    slug: "p0750-shift-solenoid-a-malfunction",
    code: "P0750",
    title: "P0750 Code: Shift Solenoid A Malfunction",
    description:
      "Fix P0750 shift solenoid code. Learn how shift solenoids control gear changes and how to diagnose failures.",
    category: "transmission",
    content: `
## What Does P0750 Mean?

The P0750 code indicates a malfunction with Shift Solenoid A in the automatic transmission. Shift solenoids control the flow of transmission fluid to engage different gears.

## How Shift Solenoids Work

The TCM energizes solenoids to direct hydraulic pressure, engaging the correct gear. When a solenoid sticks or fails electrically, shifting problems occur.

## Common Causes

A failed solenoid, dirty fluid, or wiring problems are typical. Old, contaminated fluid is a frequent contributor to solenoid sticking.

## Using AI4Car

AI4Car can read transmission codes and monitor shift behavior, helping you confirm whether the solenoid is responding to commands.
    `,
    symptoms: [
      "Check engine light on",
      "Harsh, delayed, or no shifting",
      "Transmission stuck in one gear",
      "Vehicle in limp mode",
      "Erratic shift patterns",
    ],
    causes: [
      "Failed shift solenoid",
      "Dirty or contaminated transmission fluid",
      "Damaged wiring or connector",
      "Clogged solenoid or valve body passages",
      "TCM fault (rare)",
    ],
    solutions: [
      "Check transmission fluid level and condition",
      "Inspect solenoid wiring and connector",
      "Test the shift solenoid resistance and operation",
      "Replace the shift solenoid if faulty",
      "Service or replace fluid if contaminated",
    ],
    relatedCodes: ["P0751", "P0752", "P0753", "P0700"],
    searchVolume: "medium",
  },
  // P0122 - Throttle Position Sensor Low Input
  {
    slug: "p0122-throttle-position-sensor-low-input",
    code: "P0122",
    title: "P0122 Code: Throttle/Pedal Position Sensor A Circuit Low Input",
    description:
      "Diagnose P0122 throttle position sensor code. Learn why the TPS reads low and how to test and replace it.",
    category: "sensors",
    content: `
## What Does P0122 Mean?

The P0122 code indicates that the Throttle Position Sensor (TPS) circuit is sending a voltage signal that is lower than the expected range. The TPS tells the ECM how far the throttle is open.

## Why TPS Data Matters

The ECM uses throttle position to control fuel delivery, ignition timing, and shifting. A low or erratic signal can cause hesitation, surging, and shifting problems.

## Common Causes

A faulty TPS, worn throttle body, or wiring problems are typical. On electronic throttle systems, this may involve the accelerator pedal sensor as well.

## How AI4Car Helps

AI4Car can display live throttle position as a percentage, helping you confirm whether the signal tracks smoothly as the throttle opens and closes.
    `,
    symptoms: [
      "Check engine light on",
      "Hesitation or stumbling on acceleration",
      "Surging or erratic idle",
      "Reduced power or limp mode",
      "Harsh or delayed shifting",
    ],
    causes: [
      "Faulty throttle position sensor",
      "Damaged or shorted wiring",
      "Poor connector contact or corrosion",
      "Worn throttle body",
      "Bad ground or reference voltage",
    ],
    solutions: [
      "Inspect TPS wiring and connector",
      "Check reference voltage and ground",
      "Test the TPS signal through its range",
      "Clean or replace the throttle body if worn",
      "Replace the TPS or throttle body if faulty",
    ],
    relatedCodes: ["P0120", "P0121", "P0123", "P0124"],
    searchVolume: "low",
  },
  // P2195 - O2 Sensor Signal Stuck Lean Bank 1 Sensor 1
  {
    slug: "p2195-o2-sensor-signal-stuck-lean-bank-1-sensor-1",
    code: "P2195",
    title: "P2195 Code: O2 Sensor Signal Stuck Lean Bank 1 Sensor 1",
    description:
      "Fix P2195 oxygen sensor stuck lean code. Learn why the upstream O2 sensor reads stuck lean and how to fix it.",
    category: "sensors",
    content: `
## What Does P2195 Mean?

The P2195 code indicates that the upstream oxygen sensor (Bank 1, Sensor 1) signal is stuck indicating a lean condition - the sensor reports lean even when the ECM adds fuel.

## Sensor Fault or Real Lean?

This code can mean the sensor itself has failed, or that the engine is genuinely running lean due to a vacuum leak, fuel delivery problem, or unmetered air.

## Don't Just Replace the Sensor

Always rule out vacuum leaks and fuel pressure problems before replacing the O2 sensor, since a real lean condition will set the same code.

## How AI4Car Helps

AI4Car can display live O2 sensor voltage and fuel trim data, helping you tell the difference between a lazy sensor and an actual lean condition.
    `,
    symptoms: [
      "Check engine light on",
      "Rough idle",
      "Hesitation on acceleration",
      "Poor fuel economy",
      "May appear with lean codes like P0171",
    ],
    causes: [
      "Failed or contaminated O2 sensor",
      "Vacuum or intake leak (real lean condition)",
      "Low fuel pressure or weak fuel pump",
      "Exhaust leak before the sensor",
      "Dirty MAF sensor skewing readings",
    ],
    solutions: [
      "Check fuel trims and look for vacuum leaks",
      "Test fuel pressure",
      "Inspect for exhaust leaks near the sensor",
      "Clean the MAF sensor",
      "Replace the O2 sensor if confirmed faulty",
    ],
    relatedCodes: ["P0171", "P0174", "P2196", "P0131"],
    searchVolume: "low",
  },
  // P0651 - Sensor Reference Voltage B Circuit
  {
    slug: "p0117-engine-coolant-temperature-sensor-low-input",
    code: "P0117",
    title: "P0117 Code: Engine Coolant Temperature Sensor Low Input",
    description:
      "Diagnose P0117 coolant temperature sensor code. Learn why the ECT reads low and how to test and replace it.",
    category: "sensors",
    content: `
## What Does P0117 Mean?

The P0117 code indicates that the Engine Coolant Temperature (ECT) sensor is sending a signal indicating an extremely high temperature (low voltage), often beyond what's realistically possible.

## What This Usually Means

Rather than the engine actually being that hot, P0117 typically points to a short to ground in the sensor or wiring, or a failed sensor reading incorrectly.

## Why ECT Data Matters

The ECM uses coolant temperature to control fuel mixture, fan operation, and ignition timing. A bad reading can cause a rich condition, poor starts, and cooling fan issues.

## How AI4Car Helps

AI4Car can display the live coolant temperature reading, letting you compare it to the actual engine temperature to confirm whether the sensor is reading correctly.
    `,
    symptoms: [
      "Check engine light on",
      "Cooling fans running constantly",
      "Rich running condition",
      "Poor fuel economy",
      "Possible black smoke from exhaust",
    ],
    causes: [
      "Short to ground in the ECT circuit",
      "Failed coolant temperature sensor",
      "Damaged wiring or connector",
      "Corroded connector pins",
      "ECM fault (rare)",
    ],
    solutions: [
      "Inspect ECT wiring for shorts to ground",
      "Check the connector for corrosion",
      "Test the sensor resistance against spec",
      "Repair damaged wiring",
      "Replace the coolant temperature sensor if faulty",
    ],
    relatedCodes: ["P0115", "P0116", "P0118", "P0128"],
    searchVolume: "low",
  },
  // P0223 - Throttle/Pedal Position Sensor B High Input
  {
    slug: "p0223-throttle-pedal-position-sensor-b-high-input",
    code: "P0223",
    title: "P0223 Code: Throttle/Pedal Position Sensor B Circuit High Input",
    description:
      "Fix P0223 throttle/pedal position sensor B code. Learn about dual TPS circuits and how to diagnose a high signal.",
    category: "sensors",
    content: `
## What Does P0223 Mean?

The P0223 code indicates that the "B" throttle or accelerator pedal position sensor circuit is reading higher than expected. Electronic throttle systems use redundant sensors for safety, and B is the second channel.

## Why There Are Two Sensors

Drive-by-wire systems use two position signals that track each other. If one disagrees or reads out of range, the ECM sets a code and often enters reduced-power mode.

## Common Causes

A faulty pedal or throttle sensor, wiring shorts, or connector problems are typical. A short to voltage will push the signal high.

## How AI4Car Helps

AI4Car can show both throttle/pedal sensor signals, helping you confirm whether channel B is tracking correctly with channel A.
    `,
    symptoms: [
      "Check engine light on",
      "Reduced power or limp mode",
      "Hesitation or surging",
      "Unresponsive throttle",
      "Erratic idle",
    ],
    causes: [
      "Faulty accelerator pedal or throttle sensor",
      "Short to voltage in the wiring",
      "Damaged connector or corrosion",
      "Bad ground or reference voltage",
      "ECM fault (rare)",
    ],
    solutions: [
      "Inspect sensor wiring for shorts to voltage",
      "Check the connector for damage and corrosion",
      "Verify reference voltage and ground",
      "Test both sensor channels through their range",
      "Replace the pedal or throttle sensor if faulty",
    ],
    relatedCodes: ["P0220", "P0222", "P0123", "P2135"],
    searchVolume: "low",
  },
  // P0341 - Camshaft Position Sensor A Range/Performance
  {
    slug: "p0341-camshaft-position-sensor-range-performance-bank-1",
    code: "P0341",
    title:
      "P0341 Code: Camshaft Position Sensor A Circuit Range/Performance Bank 1",
    description:
      "Diagnose P0341 camshaft position sensor code. Learn what causes range/performance faults and how to fix them.",
    category: "sensors",
    content: `
## What Does P0341 Mean?

The P0341 code indicates that the camshaft position sensor signal on Bank 1 is out of its expected range or doesn't correlate properly with the crankshaft signal.

## Why Cam Position Matters

The ECM uses camshaft position for fuel injection sequencing and ignition timing. An out-of-range signal can cause starting and performance problems.

## Common Causes

A failing sensor, damaged reluctor wheel, wiring issues, or timing chain problems can all set this code. Metal debris on the sensor tip is also common.

## How AI4Car Helps

AI4Car can monitor camshaft and crankshaft sensor data together, helping you confirm whether the cam signal is intermittent or misaligned.
    `,
    symptoms: [
      "Check engine light on",
      "Hard starting or extended cranking",
      "Intermittent stalling",
      "Rough running or misfire",
      "Reduced power",
    ],
    causes: [
      "Failing camshaft position sensor",
      "Damaged reluctor/tone wheel",
      "Metal debris on the sensor tip",
      "Damaged wiring or connector",
      "Timing chain stretch affecting cam timing",
    ],
    solutions: [
      "Inspect the sensor tip for debris",
      "Check wiring and connector for damage",
      "Test the sensor signal and air gap",
      "Inspect the reluctor wheel for damage",
      "Replace the camshaft position sensor if faulty",
    ],
    relatedCodes: ["P0340", "P0342", "P0343", "P0016"],
    searchVolume: "low",
  },
  // P0463 - Fuel Level Sensor High Input
  {
    slug: "p0463-fuel-level-sensor-high-input",
    code: "P0463",
    title: "P0463 Code: Fuel Level Sensor A Circuit High Input",
    description:
      "Diagnose P0463 fuel level sensor code. Learn why the fuel gauge reads wrong and how to fix the sending unit.",
    category: "sensors",
    content: `
## What Does P0463 Mean?

The P0463 code indicates that the fuel level sensor circuit is reading higher than expected. This sensor (the sending unit in the fuel tank) tells the ECM and gauge how much fuel is present.

## Why It Matters Beyond the Gauge

Some systems use fuel level data for EVAP monitoring, so a bad reading can affect emissions diagnostics in addition to the fuel gauge.

## Common Causes

A faulty sending unit, wiring problems, or a stuck float are typical. Worn sender resistor cards are common on older vehicles.

## How AI4Car Helps

AI4Car can display the fuel level sensor reading, helping you confirm whether the signal matches the actual amount of fuel in the tank.
    `,
    symptoms: [
      "Check engine light on",
      "Inaccurate or stuck fuel gauge",
      "Fuel gauge reads full or empty incorrectly",
      "EVAP monitor may not complete",
      "Erratic gauge needle",
    ],
    causes: [
      "Faulty fuel level sending unit",
      "Stuck or damaged float",
      "Damaged wiring or connector",
      "Worn sender resistor card",
      "Open circuit in the sensor wiring",
    ],
    solutions: [
      "Inspect wiring and connector to the sender",
      "Test the sending unit resistance",
      "Check the float for sticking or damage",
      "Repair any wiring faults",
      "Replace the fuel level sending unit if faulty",
    ],
    relatedCodes: ["P0460", "P0461", "P0462", "P0464"],
    searchVolume: "low",
  },
  // P0562 - System Voltage Low
  {
    slug: "p0562-system-voltage-low",
    code: "P0562",
    title: "P0562 Code: System Voltage Low",
    description:
      "Fix P0562 system voltage low code. Learn what causes low charging voltage and how to test the battery and alternator.",
    category: "sensors",
    content: `
## What Does P0562 Mean?

The P0562 code indicates that the system (charging) voltage is lower than the ECM expects. This usually points to a charging system problem rather than the ECM itself.

## Why Voltage Matters

Modern vehicles need stable voltage for the ECM, sensors, and actuators to work correctly. Low voltage can cause a wide range of erratic electrical symptoms.

## Common Causes

A weak alternator, failing battery, corroded connections, or a loose belt are typical. Bad grounds and corroded battery terminals are frequent culprits.

## How AI4Car Helps

AI4Car can display live system voltage, helping you see whether charging voltage stays in the normal 13.5-14.7V range while running.
    `,
    symptoms: [
      "Check engine light on",
      "Dim or flickering lights",
      "Battery or charging warning light",
      "Hard starting or stalling",
      "Erratic electrical behavior",
    ],
    causes: [
      "Failing alternator",
      "Weak or failing battery",
      "Corroded battery terminals or grounds",
      "Loose or worn drive belt",
      "Damaged charging system wiring",
    ],
    solutions: [
      "Test battery condition and state of charge",
      "Test alternator output voltage",
      "Clean and tighten battery terminals and grounds",
      "Inspect and adjust the drive belt",
      "Repair charging system wiring as needed",
    ],
    relatedCodes: ["P0560", "P0561", "P0563", "P0620"],
    searchVolume: "medium",
  },
  // P0700 - Transmission Control System Malfunction
  {
    slug: "p0700-transmission-control-system-malfunction",
    code: "P0700",
    title: "P0700 Code: Transmission Control System Malfunction",
    description:
      "Diagnose P0700 transmission control code. Learn why this informational code appears and how to find the real fault.",
    category: "transmission",
    content: `
## What Does P0700 Mean?

The P0700 code is an informational code indicating that the Transmission Control Module (TCM) has detected a fault and turned on the check engine light. It points you to look deeper into the transmission system.

## A Pointer, Not the Problem

P0700 itself doesn't tell you the specific fault. It signals that one or more transmission-specific codes are stored in the TCM that need to be read.

## How to Diagnose

You must read the manufacturer-specific transmission codes (often P07xx or P27xx) to find the actual problem behind P0700.

## How AI4Car Helps

AI4Car can read transmission-specific codes alongside P0700, helping you identify the underlying solenoid, sensor, or shift fault that triggered it.
    `,
    symptoms: [
      "Check engine light on",
      "Harsh, delayed, or erratic shifting",
      "Transmission in limp mode",
      "Stuck in a single gear",
      "Accompanied by other transmission codes",
    ],
    causes: [
      "Underlying transmission code stored in the TCM",
      "Faulty shift or pressure solenoid",
      "Low or contaminated transmission fluid",
      "Speed sensor faults",
      "Wiring or connector issues",
    ],
    solutions: [
      "Scan for transmission-specific codes",
      "Check transmission fluid level and condition",
      "Diagnose the specific underlying code",
      "Inspect transmission wiring and connectors",
      "Repair the root-cause fault, then clear codes",
    ],
    relatedCodes: ["P0720", "P0740", "P0750", "P0715"],
    searchVolume: "high",
  },
  // P0507 - Idle Air Control System RPM Higher Than Expected
  {
    slug: "p0507-idle-control-system-rpm-higher-than-expected",
    code: "P0507",
    title: "P0507 Code: Idle Air Control System RPM Higher Than Expected",
    description:
      "Fix P0507 high idle code. Learn what causes idle RPM higher than commanded and how to find vacuum leaks.",
    category: "engine",
    content: `
## What Does P0507 Mean?

The P0507 code indicates that the engine's idle speed is higher than the ECM commanded. The ECM controls idle through the idle air control valve or electronic throttle, and a higher idle suggests extra unmetered air.

## The Most Common Cause

Vacuum leaks are the leading cause. Any unmetered air entering after the throttle plate raises idle above the target.

## Other Contributors

A dirty throttle body, sticking IAC valve, or a throttle body that needs relearning can also cause high idle.

## How AI4Car Helps

AI4Car can display commanded versus actual idle RPM and fuel trims, helping you spot a vacuum leak or a throttle body that needs cleaning.
    `,
    symptoms: [
      "Check engine light on",
      "Idle higher than normal",
      "Idle doesn't return to normal when stopping",
      "Slight surging at idle",
      "Hissing sound from a vacuum leak",
    ],
    causes: [
      "Vacuum leak (hoses, gaskets, intake)",
      "Dirty throttle body or IAC valve",
      "Sticking idle air control valve",
      "Throttle body needs relearn procedure",
      "Faulty PCV system",
    ],
    solutions: [
      "Inspect for vacuum leaks and smoke test",
      "Clean the throttle body and IAC valve",
      "Check the PCV valve and hoses",
      "Perform the throttle relearn procedure",
      "Replace the IAC valve if sticking",
    ],
    relatedCodes: ["P0505", "P0506", "P0508", "P0171"],
    searchVolume: "medium",
  },
  // P0455 already exists? No - P0455 large leak. Use P0457 loose cap
  {
    slug: "p0457-evap-leak-detected-fuel-cap-loose-off",
    code: "P0457",
    title: "P0457 Code: EVAP System Leak Detected (Fuel Cap Loose/Off)",
    description:
      "Fix P0457 EVAP fuel cap code. Learn why a loose or worn gas cap triggers this code and how to fix it fast.",
    category: "emissions",
    content: `
## What Does P0457 Mean?

The P0457 code specifically indicates an EVAP system leak caused by a loose, damaged, or missing fuel cap. It's one of the most driver-friendly codes because the fix is often simple.

## Start With the Cap

Before anything else, remove and reinstall the fuel cap until it clicks. A cap that isn't fully seated is the most common trigger.

## When It's Not the Cap

If the code returns with a properly tightened cap, the cap's seal may be worn, or the filler neck or EVAP hoses may have a leak.

## How AI4Car Helps

AI4Car can confirm whether the EVAP code clears after tightening or replacing the cap, so you know if the simple fix worked.
    `,
    symptoms: [
      "Check engine light on",
      "Fuel cap warning message in some vehicles",
      "Faint fuel odor",
      "Usually no drivability symptoms",
    ],
    causes: [
      "Loose or improperly seated fuel cap",
      "Worn or cracked gas cap seal",
      "Missing fuel cap",
      "Damaged filler neck",
      "EVAP hose leak near the tank",
    ],
    solutions: [
      "Remove and reseat the fuel cap until it clicks",
      "Inspect the cap seal for wear or damage",
      "Replace the gas cap if the seal is bad",
      "Inspect the filler neck for damage",
      "Smoke test the EVAP system if the code returns",
    ],
    relatedCodes: ["P0455", "P0456", "P0440", "P0442"],
    searchVolume: "medium",
  },
  // P0010 - Camshaft Position Actuator Circuit Bank 1
  {
    slug: "p0010-camshaft-position-actuator-circuit-bank-1",
    code: "P0010",
    title: "P0010 Code: Camshaft Position Actuator A Circuit Bank 1",
    description:
      "Diagnose P0010 camshaft actuator circuit code. Learn about the VVT solenoid circuit and how to repair it.",
    category: "engine",
    content: `
## What Does P0010 Mean?

The P0010 code indicates an electrical fault in the camshaft position actuator (VVT solenoid) circuit on Bank 1. This solenoid controls oil flow to adjust camshaft timing.

## Circuit vs. Mechanical

Unlike timing codes, P0010 is specifically about the electrical circuit - the solenoid, wiring, or connector - rather than the actual cam timing being off.

## Common Causes

A failed VVT solenoid, damaged wiring, or a poor connector are typical. Dirty oil can also cause the solenoid to stick and set the code.

## How AI4Car Helps

AI4Car can monitor the VVT solenoid command and camshaft timing data, helping you confirm whether the circuit is responding.
    `,
    symptoms: [
      "Check engine light on",
      "Rough idle in some cases",
      "Reduced performance",
      "Slightly reduced fuel economy",
      "Possible rattling at startup",
    ],
    causes: [
      "Faulty camshaft actuator (VVT) solenoid",
      "Damaged wiring or connector",
      "Dirty or low engine oil",
      "Clogged solenoid screen",
      "ECM driver fault (rare)",
    ],
    solutions: [
      "Check oil level and condition",
      "Inspect the solenoid wiring and connector",
      "Test the VVT solenoid resistance",
      "Clean or replace the solenoid",
      "Repair damaged wiring as needed",
    ],
    relatedCodes: ["P0011", "P0012", "P0020", "P0013"],
    searchVolume: "low",
  },
  // P0303 - Cylinder 3 Misfire
  {
    slug: "p0303-cylinder-3-misfire-detected",
    code: "P0303",
    title: "P0303 Code: Cylinder 3 Misfire Detected",
    description:
      "Fix P0303 cylinder 3 misfire code. Learn how to diagnose a single-cylinder misfire from ignition to fuel to compression.",
    category: "engine",
    content: `
## What Does P0303 Mean?

The P0303 code indicates that the ECM detected a misfire in cylinder 3 specifically. A misfire means that cylinder isn't burning the air/fuel mixture properly.

## A Targeted Diagnosis

Because P0303 points to one cylinder, you can swap components like the coil or injector to that cylinder and see if the misfire follows - a quick way to isolate the cause.

## The Three Pillars

Misfires come down to spark, fuel, or compression. Check ignition components first, then the injector, then mechanical compression.

## How AI4Car Helps

AI4Car can show misfire counts per cylinder and fuel trim data, helping you confirm cylinder 3 and watch whether the misfire moves after a repair.
    `,
    symptoms: [
      "Check engine light on (may flash)",
      "Rough idle and vibration",
      "Hesitation or stumbling",
      "Loss of power",
      "Poor fuel economy",
    ],
    causes: [
      "Faulty spark plug or ignition coil on cylinder 3",
      "Clogged or failed fuel injector",
      "Vacuum leak affecting that cylinder",
      "Low compression (valve or ring issue)",
      "Damaged wiring to the coil or injector",
    ],
    solutions: [
      "Inspect and replace the spark plug for cylinder 3",
      "Swap the coil to another cylinder to test",
      "Test the fuel injector operation",
      "Check compression on cylinder 3",
      "Inspect wiring and connectors to the cylinder",
    ],
    relatedCodes: ["P0300", "P0301", "P0302", "P0304"],
    searchVolume: "high",
  },
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}

export function getProblemsByCategory(category: ProblemCategory): Problem[] {
  return problems.filter((p) => p.category === category);
}

export function getMostSearchedProblems(): Problem[] {
  return problems.filter((p) => p.searchVolume === "high");
}

export function searchProblems(query: string): Problem[] {
  const lowerQuery = query.toLowerCase();
  return problems.filter(
    (p) =>
      p.code?.toLowerCase().includes(lowerQuery) ||
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery),
  );
}

export const PROBLEMS_PER_PAGE = 12;

export function getPaginatedProblems(page: number): {
  problems: Problem[];
  totalPages: number;
  totalCount: number;
} {
  const totalCount = problems.length;
  const totalPages = Math.ceil(totalCount / PROBLEMS_PER_PAGE);
  const startIndex = (page - 1) * PROBLEMS_PER_PAGE;
  const paginatedProblems = problems.slice(
    startIndex,
    startIndex + PROBLEMS_PER_PAGE,
  );

  return { problems: paginatedProblems, totalPages, totalCount };
}

export function getAllProblemSlugs(): string[] {
  return problems.map((p) => p.slug);
}
