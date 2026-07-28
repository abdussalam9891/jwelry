 

export const SIZE_GUIDE_DATA = {
  rings: {
    title: "Ring Size Guide",

    subtitle:
      "Find your perfect ring size using the measurement guide and size chart below.",

    tips: [
      "Measure your finger at the end of the day when it is at its largest.",
      "Avoid measuring immediately after exercise or when your hands are cold.",
      "If your measurement falls between two sizes, choose the larger size.",
      "Wider rings usually feel tighter, so consider going up one size.",
    ],

    measurementSteps: [
      {
        title: "Wrap",
        description:
          "Wrap a thin strip of paper or a piece of string around the base of your finger.",
      },
      {
        title: "Mark",
        description:
          "Mark the point where the strip overlaps without pulling it too tightly.",
      },
      {
        title: "Measure",
        description:
          "Measure the length in millimetres and compare it with the chart below.",
      },
    ],

    columns: [
      "India",
      "US",
      "Diameter (mm)",
      "Circumference (mm)",
    ],

    sizes: [
      ["6", "3.5", "14.6", "46"],
      ["7", "4", "14.9", "47"],
      ["8", "4.5", "15.3", "48"],
      ["9", "5", "15.6", "49"],
      ["10", "5.5", "15.9", "50"],
      ["11", "6", "16.3", "51"],
      ["12", "6.5", "16.6", "52"],
      ["13", "7", "17.0", "53"],
      ["14", "7.5", "17.3", "54"],
      ["15", "8", "17.7", "55"],
      ["16", "8.5", "18.0", "56"],
      ["17", "9", "18.3", "57"],
      ["18", "9.5", "18.7", "58"],
      ["19", "10", "19.0", "59"],
      ["20", "10.5", "19.3", "60"],
    ],
  },

  bracelets: {
    title: "Bracelet Size Guide",

    subtitle:
      "Measure your wrist for a comfortable everyday fit.",

    tips: [
      "Measure your wrist with a soft measuring tape.",
      "Do not pull the tape tightly.",
      "Add 1–2 cm depending on how loose you prefer your bracelet.",
      "Chunky bracelets usually require a slightly larger size.",
    ],

    measurementSteps: [
      {
        title: "Wrap",
        description:
          "Wrap a measuring tape around your wrist just below the wrist bone.",
      },
      {
        title: "Record",
        description:
          "Record the wrist measurement without tightening the tape.",
      },
      {
        title: "Choose",
        description:
          "Select the bracelet size that best matches your wrist measurement.",
      },
    ],

    columns: [
      "Wrist Size",
      "Bracelet Size",
      "Fit",
    ],

    sizes: [
      ["14–15 cm", "Small (S)", "Slim"],
      ["15–16 cm", "Medium (M)", "Comfort"],
      ["16–17 cm", "Large (L)", "Comfort"],
      ["17–18 cm", "XL", "Relaxed"],
      ["18–19 cm", "XXL", "Relaxed"],
    ],
  },

  bangles: {
    title: "Bangle Size Guide",

    subtitle:
      "Measure the widest part of your hand to find the correct bangle size.",

    tips: [
      "Bring your thumb and little finger together while measuring.",
      "Measure the widest part of your hand instead of your wrist.",
      "If your hand measurement falls between sizes, choose the larger one.",
      "Different bangle styles may fit slightly differently.",
    ],

    measurementSteps: [
      {
        title: "Bring Fingers Together",
        description:
          "Touch your thumb to your little finger as if you're wearing a bangle.",
      },
      {
        title: "Measure",
        description:
          "Measure around the widest part of your hand.",
      },
      {
        title: "Match",
        description:
          "Compare your measurement with the diameter chart below.",
      },
    ],

    columns: [
      "Indian Size",
      "Diameter (mm)",
      "Circumference (mm)",
    ],

    sizes: [
      ["2-2", "57.2", "180"],
      ["2-4", "60.3", "189"],
      ["2-6", "63.5", "199"],
      ["2-8", "66.7", "209"],
      ["2-10", "69.9", "220"],
      ["2-12", "73.0", "229"],
    ],
  },
};

/**
 * Returns the correct guide based on category.
 */
export function getSizeGuide(category = "") {
  const key = category.toLowerCase();

  if (key.includes("ring")) {
    return SIZE_GUIDE_DATA.rings;
  }

  if (key.includes("bracelet")) {
    return SIZE_GUIDE_DATA.bracelets;
  }

  if (key.includes("bangle")) {
    return SIZE_GUIDE_DATA.bangles;
  }

  return SIZE_GUIDE_DATA.rings;
}
