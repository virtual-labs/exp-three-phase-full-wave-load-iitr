function plotData() {
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
    values["R1"]["value"] != 0 &&
    values["L1"]["value"] != 0
  ) {
    var graph = document.getElementById("graph-new");
    graph.innerHTML = "";
    a = generateData();
    var mine = document.createElement("div");
    mine.id = "input-waves";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "input-waves",
      [
        {
          x: a[1][1],
          y: a[1][0],
          mode: "lines",
          name: "V<sub>Sin1</sub>",
          marker: {
            color: "Red",
          },
        },

        {
          x: a[2][1],
          y: a[2][0],
          mode: "lines",
          name: "V<sub>Sin2</sub>",
          marker: {
            color: "Green",
          },
        },
        {
          x: a[3][1],
          y: a[3][0],
          mode: "lines",
          name: "V<sub>Sin3</sub>",
          marker: {
            color: "Purple",
          },
        },
      ],
      {
        title:
          "<b>" +
          values["VM2"]["name"] +
          "/" +
          values["VM3"]["name"] +
          "/" +
          values["VM4"]["name"] +
          "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [
            -1 * (a[0][0] + 0.1 * a[0][0] + 1),
            a[0][0] + a[0][0] * 0.1 + 1,
          ],
          title: "<b>Amplitude(V)</b>",
          fixedrange: true,
        },
        margin: { t: 35 },
      },
      { displayModeBar: false }
    );

    mine = document.createElement("div");
    mine.id = "vmab";
    mine.classList.add("graph-style");
    graph.append(mine);

    Plotly.newPlot(
      "vmab",
      [
        {
          x: a[4][1],
          y: a[4][0],
          mode: "lines",
          name: "V<sub>Load</sub>  ",
          marker: {
            color: "red",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["VM1"]["name"] + "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1 * (a[0][1] + 0.1 * a[0][1]+ 1), a[0][1] + 0.1 * a[0][1] + 1],
          title: "<b>Voltage(V)</b>",
          fixedrange: true,
        },
        margin: { t: 30 },
      },
      { displayModeBar: false }
    );

    mine = document.createElement("div");
    mine.id = "vmbc";
    mine.classList.add("graph-style");
    graph.append(mine);
    Plotly.newPlot(
      "vmbc",
      [
        {
          x: a[5][1],
          y: a[5][0],
          mode: "lines",
          name: "I<sub>Load</sub>  ",
          marker: {
            color: "#2886bb",
          },
        },
        {
          x: [0],
          y: [0],
          mode: "lines",
          name: "    ",
          marker: {
            color: "White",
          },
        },
      ],
      {
        title: "<b>" + values["AM1"]["name"] + "</b>",
        xaxis: { range: [0, 0.061], title: "<b>Time(s)</b>", fixedrange: true },
        yaxis: {
          range: [-1 * (0.1 * a[0][2]), a[0][2] + 0.1 * a[0][2]],
          title: "<b>Current(A)</b>",
          fixedrange: true,
        },
        margin: { t: 30 },
      },
      { displayModeBar: false }
    );
  }
}

function Reset() {
  window.location.reload();
}

function showtable() {
  var r = document.getElementById("readings");
  if ((r.style.display = "none")) {
    r.style.display = "block";
  } else {
    r.style.display.toggle();
  }
}

function generateData() {
  const ac1aap = parseInt(values["AC1"]["volt"]);
  const ac2app = parseInt(values["AC2"]["volt"]);
  const ac3app = parseInt(values["AC3"]["volt"]);
  const freq = parseInt(values["AC1"]["freq"]);
  const resistance = parseInt(values["R1"]["value"]);
  const inductance = parseInt(values["L1"]["value"]);
  const g1fire1 = parseInt(values["G1"]["fire1"]);
  var sine1,
    sine2,
    sine3,
    volt = 0,
    current = 0,
    vrms = 0,
    vavg = 0,
    irms = 0,
    iavg = 0,
    max_volt = 0,
    max_current = 0,
    input_sine1 = [],
    input_sine2 = [],
    input_sine3 = [],
    output_voltage = [],
    output_current = [],
    xval = [];
  for (let x = 0; x < 0.06; x += 0.00001) {
    sine1 = ac1aap * Math.sin(2 * Math.PI * freq * x);
    sine2 = ac2app * Math.sin(2 * Math.PI * freq * x - 2 * (Math.PI / 3));
    sine3 = ac3app * Math.sin(2 * Math.PI * freq * x + 2 * (Math.PI / 3));
    input_sine1.push(sine1);
    input_sine2.push(sine2);
    input_sine3.push(sine3);
    xval.push(x);
  }
  var reading = `alpha${g1fire1}r${resistance}l${inductance}`;
  for (let i = 0; i < 6000; i++) {
    volt = data[reading]["vload"][i] * ac1aap;
    current = data[reading]["iload"][i] * ac1aap;
    output_voltage.push(volt);
    output_current.push(current);
    if (max_volt < volt) {
      max_volt = volt;
    }
    if (max_current < current) {
      max_current = current;
    }
    vrms = vrms + volt * volt;
    vavg = vavg + volt;
    irms = irms + current * current;
    iavg = iavg + current;
  }
  vavg = vavg / 6000;
  iavg = iavg / 6000;
  vrms = Math.sqrt(vrms / 6000);
  irms = Math.sqrt(irms / 6000);
  if (vrms < 1) {
    vrms = parseInt(vrms * 1000) / 1000;
  } else {
    vrms = parseInt(vrms * 100) / 100;
  }
  if (irms < 1) {
    irms = parseInt(irms * 1000) / 1000;
  } else {
    irms = parseInt(irms * 100) / 100;
  }
  if (vavg < 1) {
    vavg = parseInt(vavg * 1000) / 1000;
  } else {
    vavg = parseInt(vavg * 100) / 100;
  }
  if (iavg < 1) {
    iavg = parseInt(iavg * 1000) / 1000;
  } else {
    iavg = parseInt(iavg * 100) / 100;
  }
  values["vavg"] = vavg;
  values["iavg"] = iavg;
  values["vrms"] = vrms;
  values["irms"] = irms;
  return [
    [ac1aap, max_volt, max_current],
    [input_sine1, xval],
    [input_sine2, xval],
    [input_sine3, xval],
    [output_voltage, xval],
    [output_current, xval],
  ];
}
