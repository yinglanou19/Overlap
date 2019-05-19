const canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext("2d");
ctx.globalCompositeOperation = "xor";
const backgroundcanvas = document.getElementById("background-canvas");
backgroundcanvas.width = 600;
backgroundcanvas.height = 600;
const bgrctx = backgroundcanvas.getContext("2d");
let gridSpacing = 30;
let angleSpacing = 45;
drawGrid(gridSpacing);

let rectObj = {
  x: 90,
  y: 30,
  w: 90,
  h: 90,
  centerX: 135,
  centerY: 75,
  color: "red",
  angle: 0,
  type: "rectangle"
};

let triObj = {
  a: { x: 210, y: 210 }, // right angle..
  b: { x: 300, y: 210 },
  c: { x: 210, y: 300 },
  centerX: 255, // center is calculated by [(ax+bx+cx)/3 , (ay+by+cy)/3]
  centerY: 255,
  color: "red",
  angle: 0,
  type: "triangle"
};

let rectObj2 = {
  x: 210,
  y: 210,
  w: 90,
  h: 90,
  centerX: 255,
  centerY: 255,
  color: "blue",
  angle: 0,
  type: "rectangle"
};

let shapeArr = [rectObj2, rectObj, triObj];
let selectedShape;

let isRotate = false;
let previousX;
let previousY;

function drawRect(rect) {
  ctx.beginPath();
  ctx.translate(rect.centerX, rect.centerY);
  ctx.rotate((rect.angle * Math.PI) / 180);
  ctx.translate(-rect.centerX, -rect.centerY);
  ctx.fillStyle = rect.color;
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.closePath();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawTri(tri) {
  ctx.beginPath();
  ctx.translate(tri.centerX, tri.centerY);
  ctx.rotate((tri.angle * Math.PI) / 180);
  ctx.translate(-tri.centerX, -tri.centerY);
  ctx.fillStyle = tri.color;
  ctx.moveTo(tri.a.x, tri.a.y);
  ctx.lineTo(tri.b.x, tri.b.y);
  ctx.lineTo(tri.c.x, tri.c.y);
  ctx.fill();
  ctx.closePath();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function rectWrap(rect) {
  ctx.beginPath();
  ctx.translate(rect.centerX, rect.centerY);
  ctx.rotate((rect.angle * Math.PI) / 180);
  ctx.translate(-rect.centerX, -rect.centerY);
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function triWrap(tri) {
  ctx.beginPath();
  ctx.translate(tri.centerX, tri.centerY);
  ctx.rotate((tri.angle * Math.PI) / 180);
  ctx.translate(-tri.centerX, -tri.centerY);
  ctx.moveTo(tri.a.x, tri.a.y);
  ctx.lineTo(tri.b.x, tri.b.y);
  ctx.lineTo(tri.c.x, tri.c.y);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function getSelectedShape(x, y) {
  let s = null;
  shapeArr.forEach(shape => {
    switch (shape.type) {
      case "rectangle":
        rectWrap(shape);

        break;
      case "triangle":
        triWrap(shape);
        break;
    }
    if (ctx.isPointInPath(x, y)) {
      s = shape;
      return;
    }
  });
  return s;
}
let isMouseDown = false;
let offsetx;
let offsety;

canvas.onmousedown = function(e) {
  const x = e.x - canvas.parentElement.getBoundingClientRect().left;
  const y = e.y - canvas.parentElement.getBoundingClientRect().top;
  selectedShape = getSelectedShape(x, y);
  if (selectedShape) {
    switch (selectedShape.type) {
      case "rectangle":
        offsetx = x - selectedShape.x;
        offsety = y - selectedShape.y;
        break;
      case "triangle":
        offsetx = x - selectedShape.a.x;
        offsety = y - selectedShape.a.y;
        break;
    }
  }
  isMouseDown = true;
  previousX = x;
  previousY = y;
};

canvas.onmouseup = function(e) {
  if (!isMouseDown || !selectedShape) {
    return;
  }
  if (isRotate) {
    selectedShape.angle =
      Math.round(selectedShape.angle / angleSpacing) * angleSpacing;
  } else {
    switch (selectedShape.type) {
      case "rectangle":
        selectedShape.x =
          Math.round(selectedShape.x / gridSpacing) * gridSpacing;
        selectedShape.y =
          Math.round(selectedShape.y / gridSpacing) * gridSpacing;
        selectedShape.centerX = selectedShape.x + selectedShape.w / 2;
        selectedShape.centerY = selectedShape.y + selectedShape.h / 2;
        break;
      case "triangle":
        // TODO: need to modify:   selectedShape.a   b   c
        //                   selectedShape.centerX    centerY
        const triangleOffsetX =
          selectedShape.a.x -
          Math.round(selectedShape.a.x / gridSpacing) * gridSpacing;
        const triangleOffsetY =
          selectedShape.a.y -
          Math.round(selectedShape.a.y / gridSpacing) * gridSpacing;
        selectedShape.a.x -= triangleOffsetX;
        selectedShape.a.y -= triangleOffsetY;
        selectedShape.b.x -= triangleOffsetX;
        selectedShape.b.y -= triangleOffsetY;
        selectedShape.c.x -= triangleOffsetX;
        selectedShape.c.y -= triangleOffsetY;
        selectedShape.centerX -= triangleOffsetX;
        selectedShape.centerY -= triangleOffsetY;
        break;
    }
  }
  selectedShape.angle = ((selectedShape.angle % 360) + 360) % 360;
  redraw();
  let topElementIdx = shapeArr.indexOf(selectedShape);
  shapeArr.splice(topElementIdx, 1);
  shapeArr.push(selectedShape);
  // end

  if (checkComplete(shapeArr, l2)) {
    document.getElementById("msg").style.display = "block";
  } else {
    document.getElementById("msg").style.display = "none";
  }
  isMouseDown = false;
  console.log(selectedShape);
};

canvas.onmousemove = function(e) {
  if (!isMouseDown || !selectedShape) {
    return;
  }
  const x = e.x - canvas.parentElement.getBoundingClientRect().left;
  const y = e.y - canvas.parentElement.getBoundingClientRect().top;
  if (isRotate) {
    const b = Math.sqrt(
      Math.pow(Math.abs(previousX - selectedShape.centerX), 2) +
        Math.pow(Math.abs(previousY - selectedShape.centerY), 2)
    );
    const c = Math.sqrt(
      Math.pow(Math.abs(x - selectedShape.centerX), 2) +
        Math.pow(Math.abs(y - selectedShape.centerY), 2)
    );
    const a = Math.sqrt(
      Math.pow(Math.abs(x - previousX), 2) +
        Math.pow(Math.abs(y - previousY), 2)
    );
    const p1 = Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2);
    const p2 = 2 * c * b;
    let ang = Math.acos(p1 / p2) * (180 / Math.PI);
    const m =
      (previousY - selectedShape.centerY) / (previousX - selectedShape.centerX);

    const sb = selectedShape.centerY - m * selectedShape.centerX;
    if (previousX < selectedShape.centerX) {
      if (previousY < selectedShape.centerY) {
        if (y > m * x + sb) {
          ang = -ang;
        }
      } else if (previousY > selectedShape.centerY) {
        if (y > m * x + sb) {
          ang = -ang;
        }
      } else {
        if (y > previousY + sb) {
          ang = -ang;
        }
      }
    } else if (previousX > selectedShape.centerX) {
      if (previousY < selectedShape.centerY) {
        if (y < m * x + sb) {
          ang = -ang;
        }
      } else if (previousY > selectedShape.centerY) {
        if (y < m * x + sb) {
          ang = -ang;
        }
      } else {
        if (y < previousY) {
          ang = -ang;
        }
      }
    } else {
      if (previousY > selectedShape.centerY) {
        if (x > previousX) {
          ang = -ang;
        }
      } else if (previousY < selectedShape.centerY) {
        if (x < previousX) {
          ang = -ang;
        }
      } else {
        return;
      }
    }

    selectedShape.angle = selectedShape.angle + ang;
  } else {
    switch (selectedShape.type) {
      case "rectangle":
        moveRect(selectedShape, x, y);
        break;
      case "triangle":
        moveTriangle(selectedShape, x, y);
        break;
    }
  }
  redraw();
  previousX = x;
  previousY = y;
};

function moveTriangle(tri, x, y) {
  let offsetbx = tri.b.x - tri.a.x;
  let offsetby = tri.b.y - tri.a.y;
  let offsetcx = tri.c.x - tri.a.x;
  let offsetcy = tri.c.y - tri.a.y;
  tri.a.x = x - offsetx;
  tri.a.y = y - offsety;
  tri.b.x = tri.a.x + offsetbx;
  tri.b.y = tri.a.y + offsetby;
  tri.c.x = tri.a.x + offsetcx;
  tri.c.y = tri.a.y + offsetcy;
  tri.centerX = tri.a.x + (tri.b.x - tri.a.x) / 2;
  tri.centerY = tri.a.y + (tri.c.y - tri.a.y) / 2;
}

function moveRect(rect, x, y) {
  rect.x = x - offsetx;
  rect.y = y - offsety;
  rect.centerX = rect.x + rect.w / 2;
  rect.centerY = rect.y + rect.h / 2;
}

function setRotateMode() {
  isRotate = true;
}

function setDragMode() {
  isRotate = false;
}

function drawGrid(gridSpacing) {
  bgrctx.setLineDash([0.5, gridSpacing - 0.5]);
  for (var x = 0; x <= canvas.width; x += gridSpacing) {
    bgrctx.moveTo(x, 0);
    bgrctx.lineTo(x, canvas.height);
  }

  for (var x = 0; x <= canvas.height; x += gridSpacing) {
    bgrctx.moveTo(0, x);
    bgrctx.lineTo(canvas.width, x);
  }

  bgrctx.strokeStyle = "gray";
  bgrctx.stroke();
}

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapeArr.forEach(shape => {
    switch (shape.type) {
      case "rectangle":
        drawRect(shape);
        break;
      case "triangle":
        drawTri(shape);
        break;
    }
  });
}

const ans = [
  { type: "rectangle", x: 0, y: 0, w: 90, h: 90, angle: 0, checked: false },
  { type: "rectangle", x: 30, y: 30, w: 90, h: 90, angle: 0, checked: false }
  // {type:"triangle",}
];

const l2 = [
  { type: "rectangle", x: 0, y: 0, w: 90, h: 90, angle: 0, checked: false },
  { type: "rectangle", x: 30, y: 30, w: 90, h: 90, angle: 0, checked: false },
  {
    a: { x: 30, y: 30 },
    b: { x: 120, y: 30 },
    c: { x: 30, y: 120 },
    angle: 180,
    type: "triangle",
    checked: false
  }
  // {type:"triangle",}
];

function checkComplete(sarr, answer) {
  let ansOffsetX = 0;
  let ansOffsetY = 0;
  for (let i = 0; i < sarr.length; i++) {
    for (let j = 0; j < answer.length; j++) {
      answer[j].checked = false;
    }
    if (sarr[i].type === answer[0].type) {
      let originFound = false;
      switch (answer[0].type) {
        case "rectangle":
          if (sarr[i].w === answer[0].w && sarr[i].h === answer[0].h) {
            if (sarr[i].w !== sarr[i].h) {
              if (
                sarr[i].angle === answer[0].angle ||
                sarr[i].angle === answer[0].angle + 180
              ) {
                originFound = true;
              }
            } else {
              if (sarr[i].angle % 90 === answer[0].angle) {
                originFound = true;
              }
            }
          }
          break;
        case "triangle":
          if (
            sarr[i].b.x - sarr[i].a.x === answer[j].b.x - answer[j].a.x &&
            sarr[i].c.x - sarr[i].a.x === answer[j].c.x - answer[j].a.x &&
            ((sarr[i].angle % 360) + 360) % 360 === answer[0].angle
          ) {
            originFound = true;
          }
          break;
      }

      if (originFound) {
        ansOffsetX = sarr[i].centerX;
        ansOffsetY = sarr[i].centerY;
        sarr.forEach(shape => {
          const relativeX = shape.centerX - ansOffsetX;
          const relativeY = shape.centerY - ansOffsetY;

          // same type, same size, and same position angle
          for (let j = 0; j < answer.length; j++) {
            if (!answer[j].checked && answer[j].type === shape.type) {
              //TODO: need to check the switch here

              if (
                (answer[j].type === "rectangle" &&
                  answer[j].w === shape.w &&
                  answer[j].h === shape.h &&
                  relativeX === answer[j].x &&
                  relativeY === answer[j].y) ||
                (answer[j].type === "triangle" &&
                  shape.b.x - shape.a.x === answer[j].b.x - answer[j].a.x &&
                  shape.c.x - shape.a.x === answer[j].c.x - answer[j].a.x)
              ) {
                switch (answer[j].type) {
                  case "rectangle":
                    if (shape.w !== shape.h) {
                      if (
                        shape.angle === answer[j].angle ||
                        shape.angle === answer[j].angle + 180
                      ) {
                        answer[j].checked = true;
                      }
                    } else {
                      if (shape.angle % 90 === answer[j].angle) {
                        answer[j].checked = true;
                      }
                    }

                    break;
                  case "triangle":
                    if (shape.angle === answer[j].angle) {
                      answer[j].checked = true;
                    }
                    break;
                }

                break;
              }
            }
          }
        });

        let isCompleteTemp = true;
        for (let j = 0; j < answer.length; j++) {
          if (!answer[j].checked) {
            isCompleteTemp = false;
            break;
          }
        }

        if (isCompleteTemp) {
          return true;
        }
      }
    }
  }
  return false;
}

const t = new Timer("timer");
function startGame() {
  redraw();

  t.start();
}
