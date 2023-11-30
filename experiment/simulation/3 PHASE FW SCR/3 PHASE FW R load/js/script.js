var correct_connections = [
  ["AC1R", "THY1B"],
  ["THY5T", "AM1L"],
  ["THY3T", "THY5T"],
  ["THY1T", "THY3T"],
  ["AC1L", "AC2L"],
  ["AC2L", "AC3L"],
  ["AC3L", "GND1T"],
  ["VM2B", "GND1T"],
  ["VM2T", "AC1R"],
  ["AC2R", "VM3T"],
  ["GND1T", "VM3B"],
  ["AC3R", "VM4T"],
  ["VM4B", "GND1T"],
  ["G1L", "THY1R"],
  ["THY3R", "G3L"],
  ["G5L", "THY5R"],
  ["AM1R", "R1T"],
  ["AM1R", "VM1T"],
  ["VM1B", "THY2B"],
  ["R1B", "THY2B"],
  ["THY2B", "THY6B"],
  ["THY6B", "THY4B"],
  ["THY4T", "THY1B"],
  ["THY3B", "THY6T"],
  ["THY5B", "THY2T"],
  ["G4L", "THY4R"],
  ["G6L", "THY6R"],
  ["G2L", "THY2R"],
  ["AC2R", "THY3B"],
  ["AC3R", "THY5B"],
];
var resistorids = ["R1-back"];
var acsourceids = ["AC1-back", "AC2-back", "AC3-back"].reverse();
var groundids = ["GND1-back"];
var voltagemids = ["VM4-back", "VM3-back", "VM2-back", "VM1-back"];
var mosfetids = [
  "THY2-back",
  "THY6-back",
  "THY4-back",
  "THY5-back",
  "THY3-back",
  "THY1-back",
];
var gateids = [
  "G2-back",
  "G6-back",
  "G4-back",
  "G5-back",
  "G3-back",
  "G1-back",
];
var ampids = ["AM1-back"];
var values = {
  R1: {
    name: "Resistor",
    value: 0,
    type: "Resistance: ",
    unit: " Ω",
  },

  AC1: {
    name: "Sine1",
    volt: 0,
    freq: 0,
    type1: "Voltage: ",
    type2: "Frequency: ",
    unitfreq: " Hz",
    unit: " V",
  },
  AC2: {
    name: "Sine2",
    volt: 0,
    freq: 0,
    type1: "Voltage: ",
    type2: "Frequency: ",
    unitfreq: " Hz",
    unit: " V",
  },
  AC3: {
    name: "Sine3",
    volt: 0,
    freq: 0,
    type1: "Voltage: ",
    type2: "Frequency: ",
    unitfreq: " Hz",
    unit: " V",
  },

  VM1: { name: "Load Voltage" },
  VM2: { name: "VR" },
  VM3: { name: "VY" },
  VM4: { name: "VB" },
  AM1: { name: "Load Current" },
  GND1: { name: "Ground" },
  THY1: { name: "THY1" },
  THY2: { name: "THY2" },
  THY3: { name: "THY3" },
  THY4: { name: "THY4" },
  THY5: { name: "THY5" },
  THY6: { name: "THY6" },
  G1: { name: "Gate Pulse 1", fire1: 0, fire2: 0, unit: "\u00B0" },
  G2: { name: "Gate Pulse 2", fire1: 0, fire2: 0, unit: "\u00B0" },
  G3: { name: "Gate Pulse 3", fire1: 0, fire2: 0, unit: "\u00B0" },
  G4: { name: "Gate Pulse 4", fire1: 0, fire2: 0, unit: "\u00B0" },
  G5: { name: "Gate Pulse 5", fire1: 0, fire2: 0, unit: "\u00B0" },
  G6: { name: "Gate Pulse 6", fire1: 0, fire2: 0, unit: "\u00B0" },
  vrms: 0,
  vavg: 0,
  iavg: 0,
};
var endpoints = {};
var user_connection = [];
var wrong_connection = [];
var endpoints_display = [];
var correct_connections_flag = false;
var new_reading = true;
var combination = {
  G1: { fire1: 0, fire2: 0 },
  G3: { fire1: 0, fire2: 0 },
  G5: { fire1: 0, fire2: 0 },
  G4: { fire1: 0, fire2: 0 },
  G6: { fire1: 0, fire2: 0 },
  G2: { fire1: 0, fire2: 0 },
};
var combination_flag = false;

var instance = jsPlumb.getInstance({
  ConnectionsDetachable: false,
  Container: "body",
});
instance.bind("ready", () => {
  $("#symbolpalette .ele-img").draggable({
    helper: "clone",
    containment: "body",
    appendTo: "#diagram",
  });
  $("#diagram").droppable({
    drop: (event, ui) => {
      if ($(ui.helper).hasClass("resistor-sym")) {
        var a = resistorids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("ac-sym")) {
        var a = acsourceids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("thy-sym")) {
        var a = mosfetids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("volt-sym")) {
        var a = voltagemids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("gnd-sym")) {
        var a = groundids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("amp-sym")) {
        var a = ampids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      } else if ($(ui.helper).hasClass("gate-sym")) {
        var a = gateids.pop();
        if (a != null) {
          document.getElementById(a).style.visibility = "unset";
          createParticularEnd(a.split("-")[0]);
          endpoints_display.push(a.split("-")[0]);
        } else {
        }
      }
    },
  });
  function createParticularEnd(element_name) {
    var stokwid = "3.5";
    if (element_name == "THY1") {
      var THY1T = instance.addEndpoint("THY1T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY1T"] = THY1T;

      var THY1B = instance.addEndpoint("THY1B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: "Flowchart",
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY1B"] = THY1B;

      var THY1R = instance.addEndpoint("THY1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY1R"] = THY1R;
    }
    if (element_name == "THY2") {
      var THY2T = instance.addEndpoint("THY2T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY2T"] = THY2T;

      var THY2B = instance.addEndpoint("THY2B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: "Flowchart",
        maxConnections: 3,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY2B"] = THY2B;

      var THY2R = instance.addEndpoint("THY2R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY2R"] = THY2R;
    }
    if (element_name == "THY3") {
      var THY3T = instance.addEndpoint("THY3T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY3T"] = THY3T;

      var THY3B = instance.addEndpoint("THY3B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: "Flowchart",
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY3B"] = THY3B;

      var THY3R = instance.addEndpoint("THY3R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY3R"] = THY3R;
    }
    if (element_name == "THY4") {
      var THY4T = instance.addEndpoint("THY4T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY4T"] = THY4T;

      var THY4B = instance.addEndpoint("THY4B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: "Flowchart",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY4B"] = THY4B;

      var THY4R = instance.addEndpoint("THY4R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY4R"] = THY4R;
    }
    if (element_name == "THY5") {
      var THY5T = instance.addEndpoint("THY5T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY5T"] = THY5T;

      var THY5B = instance.addEndpoint("THY5B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: "Flowchart",
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY5B"] = THY5B;

      var THY5R = instance.addEndpoint("THY5R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY5R"] = THY5R;
    }
    if (element_name == "THY6") {
      var THY6T = instance.addEndpoint("THY6T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY6T"] = THY6T;

      var THY6B = instance.addEndpoint("THY6B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: "Flowchart",
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY6B"] = THY6B;

      var THY6R = instance.addEndpoint("THY6R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["THY6R"] = THY6R;
    }
    if (element_name == "G1") {
      var G1L = instance.addEndpoint("G1L", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G1L"] = G1L;
    }
    if (element_name == "G2") {
      var G2L = instance.addEndpoint("G2L", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G2L"] = G2L;
    }
    if (element_name == "G3") {
      var G3L = instance.addEndpoint("G3L", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G3L"] = G3L;
    }
    if (element_name == "G4") {
      var G4L = instance.addEndpoint("G4L", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G4L"] = G4L;
    }
    if (element_name == "G5") {
      var G5L = instance.addEndpoint("G5L", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G5L"] = G5L;
    }
    if (element_name == "G6") {
      var G6L = instance.addEndpoint("G6L", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [5, 5] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["G6L"] = G6L;
    }
    if (element_name == "AM1") {
      var AM1L = instance.addEndpoint("AM1L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [15, 15] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var AM1R = instance.addEndpoint("AM1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AM1L"] = AM1L;
      endpoints["AM1R"] = AM1R;
    }
    if (element_name == "VM1") {
      var VM1T = instance.addEndpoint("VM1T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM1B = instance.addEndpoint("VM1B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart"],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM1T"] = VM1T;
      endpoints["VM1B"] = VM1B;
    }
    if (element_name == "VM2") {
      var VM2T = instance.addEndpoint("VM2T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM2B = instance.addEndpoint("VM2B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM2T"] = VM2T;
      endpoints["VM2B"] = VM2B;
    }
    if (element_name == "VM3") {
      var VM3T = instance.addEndpoint("VM3T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM3B = instance.addEndpoint("VM3B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM3T"] = VM3T;
      endpoints["VM3B"] = VM3B;
    }
    if (element_name == "VM4") {
      var VM4T = instance.addEndpoint("VM4T", {
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var VM4B = instance.addEndpoint("VM4B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["VM4T"] = VM4T;
      endpoints["VM4B"] = VM4B;
    }
    if (element_name == "GND1") {
      var GND1 = instance.addEndpoint("GND1T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 4,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["GND1T"] = GND1;
    }
    if (element_name == "AC1") {
      var AC1L = instance.addEndpoint("AC1L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        endpoint: "Dot",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      var AC1R = instance.addEndpoint("AC1R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AC1L"] = AC1L;
      endpoints["AC1R"] = AC1R;
    }
    if (element_name == "AC2") {
      var AC2L = instance.addEndpoint("AC2L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
        hoverPaintStyle: { fillStyle: "black" },
      });
      var AC2R = instance.addEndpoint("AC2R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AC2L"] = AC2L;
      endpoints["AC2R"] = AC2R;
    }
    if (element_name == "AC3") {
      var AC3L = instance.addEndpoint("AC3L", {
        anchor: ["Left"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
        hoverPaintStyle: { fillStyle: "black" },
      });
      var AC3R = instance.addEndpoint("AC3R", {
        anchor: ["Right"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10], gap: 0 }],
        maxConnections: 2,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["AC3L"] = AC3L;
      endpoints["AC3R"] = AC3R;
    }
    if (element_name == "R1") {
      var R1T = instance.addEndpoint("R1T", {
        endpoint: "Dot",
        anchor: ["Top"],
        isSource: true,
        isTarget: true,
        connector: ["Flowchart", { stub: [10, 10] }],
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
        radius: 2,
      });

      var R1B = instance.addEndpoint("R1B", {
        anchor: ["Bottom"],
        isSource: true,
        isTarget: true,
        connector: "Flowchart",
        maxConnections: 1,
        connectorStyle: { strokeWidth: stokwid, stroke: "#100" },
        paintStyle: { fillStyle: "red" },
      });
      endpoints["R1T"] = R1T;
      endpoints["R1B"] = R1B;
    }
  }



  window.addEventListener("resize", () => {
    instance.repaintEverything();
      if (correct_connections_flag) {
        plotData();
      }
  });

  instance.bind("connection", (conn, event) => {
    var flag = true;
    let eg1 = [String(conn.sourceId), String(conn.targetId)];

    for (var ele of correct_connections) {
      if (
        (ele[0] == eg1[0] && ele[1] == eg1[1]) ||
        (ele[0] == eg1[1] && ele[1] == eg1[0])
      ) {
        flag = false;

        user_connection.push(eg1);

        break;
      }
    }
    if (flag) {
      conn.connection._jsPlumb.paintStyleInUse.stroke = "red";
      wrong_connection.push(eg1);
      openPopup("new-img/404-error.png", "Wrong Connection", "28px");
    }
  });

  instance.bind("click", function (conn) {
    let eg1 = [String(conn.sourceId), String(conn.targetId)];
    if (!correct_connections_flag) {
      for (var ele of correct_connections) {
        if (
          (ele[0] == eg1[0] && ele[1] == eg1[1]) ||
          (ele[0] == eg1[1] && ele[1] == eg1[0])
        ) {
          user_connection.pop(eg1);
          break;
        }
      }
      for (var ele of wrong_connection) {
        if (
          (ele[0] == eg1[0] && ele[1] == eg1[1]) ||
          (ele[0] == eg1[1] && ele[1] == eg1[0])
        ) {
          wrong_connection.pop(eg1);
          break;
        }
      }
      instance.deleteConnection(conn);
    }
    return false;
  });
  $("body").on("contextmenu", "#components", (event) => {
    event.preventDefault();
  });

  // context menu for resistor
  $("body").on("contextmenu", "#diagram .resistor", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    if (correct_connections_flag) {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="resisSubmited(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 125px;"  maxlength="4" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center;"><label for="value-' +
          window.selectedControl +
          '">Resistance:</label><input type="number" class="set-input" placeholder=" ' +
          values[window.selectedControl]["value"] +
          ' ohm" min="1" max="100"  id="value-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="resisSubmited(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 125px;" maxlength="4"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-' +
          window.selectedControl +
          '">Resistance:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["value"] +
          ' ohm" min="1" max="100"  disabled id="value-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 13px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }

    //context menu for capacitor

    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  // contextmenu for inductor

  //AC Source

  $("body").on("contextmenu", "#diagram .acsource", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");
    if (correct_connections_flag) {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="acSubmited(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 122px;" maxlength="5" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Amplitude:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["volt"] +
          ' Volt" min="1" max="350"  id="value-volt-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Frequency:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["freq"] +
          ' Hz" min="1" max="60"  id="value-freq-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 15px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="acSubmited(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 122px;     height: 24px;" maxlength="5" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Amplitude:</label><input type="number" class="set-input"  placeholder="  ' +
          values[window.selectedControl]["volt"] +
          ' Volt" min="1" max="350" disabled id="value-volt-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Frequency:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["freq"] +
          ' Hz" min="1" max="60" disabled  id="value-freq-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 15px"><button type="submit" class="set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }

    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  $("body").on("contextmenu", "#diagram .other", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text"  id="name-' +
        window.selectedControl +
        '" class="set-input-name" style="width: 125px;" maxlength="5" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
  $("body").on("contextmenu", "#diagram .vload", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text"  id="name-' +
        window.selectedControl +
        '" class="set-input-name" style="width: 125px;" maxlength="6" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
  $("body").on("contextmenu", "#diagram .gatepulse", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    if (combination_flag) {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit=" gateSubmitted(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label style="color:white;" for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><input type="number" min="1" max="999" class="set-input" style="width: 74px;" placeholder="  ' +
          values[window.selectedControl]["fire1"] +
          values[window.selectedControl]["unit"] +
          '" id="value-fire1-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input type="number" min="1" max="999" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '"  id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><input type="number" class="set-input" style="width: 74px;" placeholder="  ' +
          values[window.selectedControl]["fire1"] +
          values[window.selectedControl]["unit"] +
          '" min="1" max="100" disabled id="value-fire1-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '" min="100" max="900" disabled id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
  $("body").on("contextmenu", "#diagram .gatepulse2", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    if (combination_flag) {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit=" gateSubmitted2(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label style="color:white;" for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><input type="number" min="1" max="999" class="set-input" style="width: 74px;" placeholder="  ' +
          values[window.selectedControl]["fire1"] +
          values[window.selectedControl]["unit"] +
          '" id="value-fire1-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input type="number" min="1" max="999" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '"  id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#"><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><input type="number" class="set-input" style="width: 74px;" placeholder="  ' +
          values[window.selectedControl]["fire1"] +
          values[window.selectedControl]["unit"] +
          '" min="1" max="100" disabled id="value-fire1-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '" min="100" max="900" disabled id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  $("body").on("contextmenu", "#diagram .gatepulse1", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    if (correct_connections_flag) {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" onsubmit="firstGateSubmitted(event,' +
          "'" +
          window.selectedControl +
          "'" +
          ')"><div><label style="color:white;" for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5" placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/></div><div    class="value-element" style="display: flex; align-items: center; "><label for="value-fire1-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><input type="number" min="30" max="140" class="set-input" style="width: 74px;" placeholder="  ' +
          values[window.selectedControl]["fire1"] +
          values[window.selectedControl]["unit"] +
          '" id="value-fire1-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-fire2-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input type="number" min="1" max="260" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '" id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="set-value-btn" style="border-radius: 20px">Set Value</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    } else {
      $(
        '<div class="custom-menu" style="width: 193px;"><div class="name-element"><div class="name-element"><div style="display: flex; justify-content: end; position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn" id="submit-' +
          window.selectedControl +
          '"></button></div></div></div><form action="#" ><div><label for="name-' +
          window.selectedControl +
          '">Name:</label><input type="text" class="set-input-name" id="name-' +
          window.selectedControl +
          '" style="border-radius: 20px; padding:2px;width: 140px;" maxlength="5"  placeholder="  ' +
          values[window.selectedControl]["name"] +
          '" onchange="changeName(' +
          "'" +
          window.selectedControl +
          "'" +
          ',this.value)"/><div    class="value-element" style="display: flex; align-items: center; "><label for="value-volt-' +
          window.selectedControl +
          '">Starting&nbsp;Angle:</label><input type="number" class="set-input" style="width: 74px;" placeholder="  ' +
          values[window.selectedControl]["fire1"] +
          values[window.selectedControl]["unit"] +
          '" min="1" max="100" disabled id="value-fire1-' +
          window.selectedControl +
          '" /> </div><div class="value-element" style="display: flex; align-items: center; "><label for="value-freq-' +
          window.selectedControl +
          '">Ending&nbsp;Angle:</label><input type="number" class="set-input" placeholder="  ' +
          values[window.selectedControl]["fire2"] +
          values[window.selectedControl]["unit"] +
          '" min="100" max="900" disabled id="value-fire2-' +
          window.selectedControl +
          '" /> </div><div style="display: flex; justify-content: end; padding-right: 5px"><button type="submit"  class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></form></div>'
      )
        .appendTo("body")
        .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    }
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });

  $("body").on("contextmenu", "#diagram .ground1", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text" maxlength="4" id="name-' +
        window.selectedControl +
        '" class="set-input-name" style="width: 125px;" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
   $("body").on("contextmenu", "#diagram .ground_diag", function (event) {
    event.preventDefault();
    $("div.custom-menu").remove();
    window.selectedControl = $(this).attr("id");

    $(
      '<div class="custom-menu"><div class="name-element"><div style="display: flex; justify-content: end;position: relative;top: -4px;height: 28px;margin-bottom: 2px;"><button class="submit fa fa-times cross-btn"></button></div><label for="name-' +
        window.selectedControl +
        '">Name:</label><input type="text" maxlength="6" id="name-' +
        window.selectedControl +
        '" class="set-input-name" style="width: 125px;" placeholder="   ' +
        values[window.selectedControl]["name"] +
        '" onchange="changeName(' +
        "'" +
        window.selectedControl +
        "'" +
        ',this.value)"/><div style="display: flex; justify-content: end; padding-right: 13px;"><div><button class="submit set-value-btn" style="border-radius: 20px">Set Name</button></div></div>'
    )
      .appendTo("body")
      .css({ top: event.pageY + "px", left: event.pageX + 10 + "px" });
    $(".submit").bind("click", function (event) {
      $("div.custom-menu").remove();
    });
  });
});

function changeName(name, value) {
  values[name]["name"] = value.toUpperCase();
  var ele = name + "-name";
  $("#" + ele).text(values[name]["name"]);
  if (correct_connections_flag) {
    plotData();
  }
}
function makeDefault() {
  values["G1"]["fire1"] = 0;
  values["G2"]["fire1"] = 0;
  values["G2"]["fire2"] = 0;
  values["G3"]["fire1"] = 0;
  values["G3"]["fire2"] = 0;
  values["G4"]["fire1"] = 0;
  values["G4"]["fire2"] = 0;
  values["G5"]["fire1"] = 0;
  values["G5"]["fire2"] = 0;
  values["G6"]["fire1"] = 0;
  values["G6"]["fire2"] = 0;
  $("#" + "G1-value").text("");
  $("#" + "G2-value").text("");
  $("#" + "G3-value").text("");
  $("#" + "G4-value").text("");
  $("#" + "G5-value").text("");
  $("#" + "G6-value").text("");
  var graph = document.getElementById("graph-new");
  graph.innerHTML = "";
}
function makeCombination(alpha) {
  combination["G1"]["fire1"] = alpha;
  combination["G1"]["fire2"] = alpha + 120;
  combination["G2"]["fire1"] = alpha + 60;
  combination["G2"]["fire2"] = alpha + 180;
  combination["G3"]["fire1"] = alpha + 120;
  combination["G3"]["fire2"] = alpha + 240;
  combination["G4"]["fire1"] = alpha + 180;
  combination["G4"]["fire2"] = alpha + 300;
  combination["G5"]["fire1"] = alpha + 240;
  combination["G5"]["fire2"] = alpha + 360;
  combination["G6"]["fire1"] = alpha + 300;
  combination["G6"]["fire2"] = alpha + 420;
}
function firstGateSubmitted(e, name) {
  e.preventDefault();
  var fire1 = parseInt(document.getElementById("value-fire1-" + name).value);
  var fire2 = parseInt(document.getElementById("value-fire2-" + name).value);
  console.log(fire1, fire2);
  if (!Number.isNaN(fire1) && !Number.isNaN(fire2)) {
    if (fire1 >= fire2) {
      openPopup(
        "new-img/404-warning.png",
        "Firing angle must be in increasing order ",
        "25px"
      );
    } else {
      if (fire2 != fire1 + 120) {
        openPopup(
          "new-img/404-warning.png",
          "Firing angle must be at an interval of 120°",
          "23px"
        );
      } else {
        makeDefault();
        var alpha = fire1;
        makeCombination(alpha);
        values["G1"]["fire1"] = fire1;
        values["G1"]["fire2"] = fire2;
        combination_flag = true;
        $("#" + "G1-value").text(
          values[name]["fire1"] +
            values[name]["unit"] +
            " " +
            values[name]["fire2"] +
            values[name]["unit"]
        );
        new_reading = true;
      }
    }
  } else if (!Number.isNaN(fire1)) {
    openPopup("new-img/404-warning.png", "Enter Ending Angle", "28px");
  } else if (!Number.isNaN(fire2)) {
    openPopup("new-img/404-warning.png", "Enter Starting Angle", "28px");
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
}

function gateSubmitted(e, name) {
  e.preventDefault();
  var fire1 = parseInt(document.getElementById("value-fire1-" + name).value);
  var fire2 = parseInt(document.getElementById("value-fire2-" + name).value);
  if (!Number.isNaN(fire1) && !Number.isNaN(fire2)) {
    if (fire1 >= fire2) {
      openPopup(
        "new-img/404-warning.png",
        "Firing angle must be in increasing order ",
        "25px"
      );
    } else {
      if (fire1 == combination[name]["fire1"]) {
        if (fire2 == combination[name]["fire2"]) {
          values[name]["fire1"] = fire1;
          values[name]["fire2"] = fire2;
          $("#" + name + "-value").text(
            values[name]["fire1"] +
              values[name]["unit"] +
              " " +
              values[name]["fire2"] +
              values[name]["unit"]
          );
        } else {
          openPopup(
            "new-img/404-warning.png",
            "Firing angle must be at an interval of 120°",
            "23px"
          );
        }
      } else {
        openPopupbutton(
          "new-img/404-warning.png",
          `Firing angle must be at an interval of 120° w.r.t ${
            values["G" + (parseInt(name[1]) - 2)]["name"]
          }`,
          "21px"
        );
        console.log("hello");
      }
    }
  } else if (!Number.isNaN(fire1)) {
    openPopup("new-img/404-warning.png", "Enter Ending Angle", "28px");
  } else if (!Number.isNaN(fire2)) {
    openPopup("new-img/404-warning.png", "Enter Starting Angle", "28px");
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
}
function acSubmited(e, name) {
  e.preventDefault();
  var volt = document.getElementById("value-volt-" + name).value;
  var ele;
  if (volt != "") {
    new_reading = true;
    values[name]["volt"] = volt;
    ele = name + "-volt";
    $("#" + ele).text(values[name]["volt"] + values[name]["unit"]);
  }
  var freq = document.getElementById("value-freq-" + name).value;
  if (freq != "") {
    new_reading = true;
    values["AC1"]["freq"] = freq;
    values["AC2"]["freq"] = freq;
    values["AC3"]["freq"] = freq;
    $("#" + "AC1-freq").text(values["AC1"]["freq"] + values[name]["unitfreq"]);
    $("#" + "AC2-freq").text(values["AC2"]["freq"] + values[name]["unitfreq"]);
    $("#" + "AC3-freq").text(values["AC3"]["freq"] + values[name]["unitfreq"]);
  }
  document.getElementById("submit-" + name).click();
  if (correct_connections_flag) {
    plotData();
  }
}

function resisSubmited(e, name) {
  e.preventDefault();
  var a = document.getElementById("value-" + name).value;
  if (a != "") {
    values["R1"]["value"] = a;
    new_reading = true;
    $("#" + "R1-value").text(values["R1"]["value"] + values["R1"]["unit"]);
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
  return false;
}
function gateSubmitted2(e, name) {
  e.preventDefault();
  var fire1 = parseInt(document.getElementById("value-fire1-" + name).value);
  var fire2 = parseInt(document.getElementById("value-fire2-" + name).value);
  if (!Number.isNaN(fire1) && !Number.isNaN(fire2)) {
    if (fire1 >= fire2) {
      openPopup(
        "new-img/404-warning.png",
        "Firing angle must be in increasing order ",
        "25px"
      );
    } else {
      if (fire1 == combination[name]["fire1"]) {
        if (fire2 == combination[name]["fire2"]) {
          values[name]["fire1"] = fire1;
          values[name]["fire2"] = fire2;
          $("#" + name + "-value").text(
            values[name]["fire1"] +
              values[name]["unit"] +
              " " +
              values[name]["fire2"] +
              values[name]["unit"]
          );
        } else {
          openPopup(
            "new-img/404-warning.png",
            "Firing angle must be at an interval of 120°",
            "23px"
          );
        }
      } else {
        openPopupbutton(
          "new-img/404-warning.png",
          `Firing angle must be at an interval of 60° w.r.t ${values["G1"]["name"]}`,
          "21px"
        );
      }
    }
  } else if (!Number.isNaN(fire1)) {
    openPopup("new-img/404-warning.png", "Enter Ending Angle", "28px");
  } else if (!Number.isNaN(fire2)) {
    openPopup("new-img/404-warning.png", "Enter Starting Angle", "28px");
  }
  document.getElementById("submit-" + name).click();

  if (correct_connections_flag) {
    plotData();
  }
}
function instchange() {
  document.getElementById("inst").classList.toggle("inst-display");
}

$(document).ready(function () {
  $("#data").on("click", function () {
    $("#readings").show();
  });
});
document.getElementById("check1").addEventListener("click", () => {
  if (wrong_connection.length == 0) {
    if (user_connection.length < 30) {
      openPopup(
        "new-img/404-warning.png",
        "Please make all the connections",
        "28px"
      );
    } else {
      openPopup(
        "new-img/404-tick.png",
        "Well Done! All Connections are Connected",
        "23px"
      );
      correct_connections_flag = true;
    }
  } else {
    openPopup(
      "new-img/404-warning.png",
      "Wrong connection present in the circuit",
      "25px"
    );
  }
});
var count = 1;
function showreadings() {
  if (correct_connections_flag) {
    if (
      values["AC1"]["volt"] != 0 &&
      values["AC1"]["freq"] != 0 &&
      values["AC2"]["volt"] != 0 &&
      values["AC2"]["freq"] != 0 &&
      values["AC3"]["volt"] != 0 &&
      values["AC3"]["freq"] != 0 &&
      values["G2"]["fire1"] != 0 &&
      values["G3"]["fire1"] != 0 &&
      values["G4"]["fire1"] != 0 &&
      values["G5"]["fire1"] != 0 &&
      values["G6"]["fire1"] != 0 &&
      values["R1"]["value"] != 0
    ) {
      if (new_reading) {
        if (count < 11) {
          document.getElementById("Taken_reading").style.display = "block";
          var a = document.getElementById("tab");
          var b = a.innerHTML;
          str = `<tr><td>${count}</td><td>${values["vrms"]}</td><td>${values["irms"]}</td><td>${values["vavg"]}</td><td>${values["iavg"]}</td></tr>`;
          a.innerHTML = b + str;
          count = count + 1;
          new_reading = false;
        } else {
          openPopup(
            "new-img/404-warning.png",
            "You can only add 10 readings in the table",
            "24px"
          );
        }
      }
    }
  }
}
