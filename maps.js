const maps = [
  {
    resource: [
      {
        x: 90,
        y: 30,
        w: 90,
        h: 90,
        centerX: 135,
        centerY: 75,
        color: "lightblue",
        angle: 0,
        type: "rectangle"
      },
      {
        x: 210,
        y: 210,
        w: 90,
        h: 90,
        centerX: 255,
        centerY: 255,
        color: "lightblue",
        angle: 0,
        type: "rectangle"
      }
    ],
    answer: [
      { type: "rectangle", x: 0, y: 0, w: 90, h: 90, angle: 0, checked: false },
      {
        type: "rectangle",
        x: 30,
        y: 30,
        w: 90,
        h: 90,
        angle: 0,
        checked: false
      }
    ],
    solutionImg: "images/level1.png"
  },
  {
    resource: [
      {
        x: 90,
        y: 30,
        w: 90,
        h: 90,
        centerX: 135,
        centerY: 75,
        color: "lightblue",
        angle: 0,
        type: "rectangle"
      },
      {
        a: { x: 210, y: 210 }, // right angle..
        b: { x: 300, y: 210 },
        c: { x: 210, y: 300 },
        centerX: 255, // center is calculated by [(ax+bx+cx)/3 , (ay+by+cy)/3]
        centerY: 255,
        color: "lightblue",
        angle: 0,
        type: "triangle"
      },
      {
        x: 90,
        y: 150,
        w: 90,
        h: 90,
        centerX: 135,
        centerY: 195,
        color: "lightblue",
        angle: 0,
        type: "rectangle"
      }
    ],
    answer: [
      { type: "rectangle", x: 0, y: 0, w: 90, h: 90, angle: 0, checked: false },
      {
        type: "rectangle",
        x: 30,
        y: 30,
        w: 90,
        h: 90,
        angle: 0,
        checked: false
      },
      {
        a: { x: 30, y: 30 },
        b: { x: 120, y: 30 },
        c: { x: 30, y: 120 },
        angle: 180,
        type: "triangle",
        checked: false
      }
    ],
    solutionImg: "images/level2.png"
  },
  {
    resource: [
      {
        x: 90,
        y: 30,
        w: 90,
        h: 90,
        centerX: 135,
        centerY: 75,
        color: "lightblue",
        angle: 0,
        type: "rectangle"
      },
      {
        x: 190,
        y: 30,
        w: 90,
        h: 90,
        centerX: 235,
        centerY: 75,
        color: "lightblue",
        angle: 0,
        type: "rectangle"
      },
      {
        x: 90,
        y: 130,
        w: 90,
        h: 90,
        centerX: 135,
        centerY: 175,
        color: "lightblue",
        angle: 0,
        type: "rectangle"
      },
      {
        a: { x: 210, y: 210 }, // right angle..
        b: { x: 300, y: 210 },
        c: { x: 210, y: 300 },
        centerX: 255, // center is calculated by [(ax+bx+cx)/3 , (ay+by+cy)/3]
        centerY: 255,
        color: "lightblue",
        angle: 0,
        type: "triangle"
      }
    ],
    answer: [
      {
        a: { x: 0, y: 0 },
        b: { x: 90, y: 0 },
        c: { x: 0, y: 90 },
        angle: 90,
        type: "triangle",
        checked: false
      },
      {
        type: "rectangle",
        x: 0,
        y: 0,
        w: 90,
        h: 90,
        angle: 0,
        checked: false
      },
      {
        type: "rectangle",
        x: 30,
        y: 0,
        w: 90,
        h: 90,
        angle: 45,
        checked: false
      },
      {
        type: "rectangle",
        x: -30,
        y: 0,
        w: 90,
        h: 90,
        angle: 45,
        checked: false
      }
    ],
    solutionImg: "images/level3.jpeg"
  }
];
