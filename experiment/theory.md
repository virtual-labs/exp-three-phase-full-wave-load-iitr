
<div style="font-family: 'Nunito Sans', sans-serif; font-size: 20px;text-align: justify;">

### **Introduction**

A controlled rectifier is an electronic circuit that converts alternating current (AC) into direct current
          (DC). It consists of power electronic devices, typically thyristors or silicon-controlled rectifiers (SCRs),
          which are controlled to switch the flow of current in a desired manner.
          The main function of a controlled rectifier is to control the magnitude and polarity of the output DC voltage.
          It is commonly used in various applications where precise control over the rectification process is required
          such as power supplies, motor drives, battery chargers, and voltage regulators.<br><br>
          The controlled rectifier operates by using a triggering mechanism to turn on the thyristors at specific points
          in the AC waveform. Once the thyristors are triggered, they conduct current until the AC voltage crosses zero
          or until the thyristor is turned off. By controlling the timing of thyristor firing, the rectifier can vary
          the average DC output voltage.<br>

### **Three Phase Full Wave Controlled Bridge Rectifier**

<center><img src="images\circuit.png" alt="1 phase controlled bridge rectifier" height="225" style="-webkit-filter:contrast(110%);"></center>
<center><b>Fig. 1 Three Phase Full Wave Silicon Controlled Rectifier</b></center>

A three-phase full-wave controlled rectifier, also known as a three-phase thyristor rectifier or six-pulse
rectifier, is a type of rectifier circuit used to convert alternating current (AC) into direct current (DC).
It utilizes six thyristors (also known as silicon-controlled rectifiers or SCR) to control the flow of
current. Here's how a three-phase controlled rectifier works:<br>

1. Kirchhoff’s voltage law around any path shows that only one thyristor in the
top half of the bridge may conduct at one time (S<sub>1</sub>, S<sub>3</sub>, or S<sub>5</sub>). The thyristor that is conducting will have its anode connected to the phase voltage that is highest at that instant.<br>
2. Kirchhoff’s voltage law also shows that only one thyristor in the bottom half of
the bridge may conduct at one time (S<sub>2</sub>, S<sub>4</sub>, or S<sub>6</sub>). The thyristor that is
conducting will have its cathode connected to the phase voltage that is
lowest at that instant.<br>
3. As a consequence of points 1 and 2, S<sub>1</sub> and S<sub>4</sub> cannot conduct at the
same time. Similarly, S<sub>3</sub> and S<sub>6</sub> cannot conduct simultaneously, nor can S<sub>5</sub>
and S<sub>2</sub>.<br>
4. The output voltage across the load is one of the line-to-line voltages of the
source. For example, when S<sub>1</sub> and S<sub>2</sub> are on, the output voltage is V<sub>ac</sub>.
Furthermore, the thyristors that are on are determined by which line-to-line
voltage is the highest at that instant. For example, when V<sub>ac</sub> is the highest
line-to-line voltage, the output is V<sub>ac</sub>.<br>
5. There are six combinations of line-to-line voltages (three phases taken two
at a time). Considering one period of the source to be 360&deg;, a transition of
the highest line-to-line voltage must take place every 360&deg;/6 = 60&deg;. Because
of the six transitions that occur for each period of the source voltage, the
circuit is called a six-pulse rectifier.
The three-phase full-wave controlled rectifier is widely used in applications that require variable DC voltage
and current, such as industrial motor drives, battery charging systems, and power supplies. By adjusting the
firing angle of the thyristors, the rectifier can control the output voltage and power delivered to the load,
enabling precise control of various electrical processes.<br>

### **1. Three Phase Full Wave Controlled Rectifier - R Load**<br>

<center><img src="images\R load circuit.png" alt="R load circuit" height="250" width="450" style="-webkit-filter:contrast(120%);"></center>
<center><b>Fig. 2 Three Phase Full Wave SCR with R Load</b></center><br>

<center><img src="images\R load waveform.png" alt="Input waveform" height="400" width="400"></center>
<center><b>Fig. 3 Waveforms of Three Phase Full Wave SCR with R Load</b></center><br>

One thyristor of the conducting pair powers the positive side of load, while the other thyristor powers the
negative side of the load. Thyristors T<sub>1</sub>, T<sub>3</sub>, T<sub>2</sub>, and T<sub>4</sub> form a
bridge rectifier network between phases A and
B, similary thyristors T<sub>3</sub>, T<sub>5</sub>, T<sub>4</sub>, and T<sub>6</sub> between phases B and C
and T<sub>5</sub>, T<sub>1</sub>, T<sub>6</sub>, and T<sub>2</sub> between phases C and A.
Thyristors T<sub>1</sub>, T<sub>3</sub> and T<sub>5</sub> feed the positive rail. The thyristor which has a
more positive voltage at its anode terminal
conducts. Likewise, thyristors T<sub>2</sub>, T<sub>4</sub> and T<sub>6</sub> feed the negative rail and
whichever thyristor has a more negative voltage
at its cathode terminal conducts.<br>
Let,<br>

<center>

$V_{an} = V_{m} sinwt$

</center>

<center>

$V_{bn} = V_{m} sin(wt - \frac {2\pi}{3})$

</center>

<center>

$V_{cn} = V_{m} sin(wt - \frac {4\pi}{3})$

</center>

<center>

$V_{ab} = \sqrt 3 V_{m} sin(wt + \frac {\pi}{6})$

</center>

<center>

$V_{bc} = \sqrt 3 V_{m} sin(wt - \frac {\pi}{2})$

</center>

<center>

$V_{ca} = \sqrt 3 V_{m} sin(wt - \frac {7\pi}{6})$

</center>

The average of output voltage and current is,<br>

<center>

$V_{o} = \frac {3\sqrt 3}{\pi} V_{mp} cos\alpha .......(1)$<br>

</center>

<center>

$I_{o} = \frac {3\sqrt 3}{\pi R} V_{mp} cos⁡\alpha .......(2)$<br>

</center>

$For$ $ \alpha>60^{\circ} $ <br>

<center>

$V_{o} = \frac {3}{\pi}\int_{\frac {\pi}{6} + \alpha}^{\frac {\pi}{2} + \alpha} \sqrt {3} V_{m} sin⁡(wt + \frac {\pi}{6}) dwt = \frac 
{3\sqrt 3V_{m}}{\pi} cos(\frac {\pi}{3} + \alpha).......(3)$

</center>

<center>

$I_{o} = \frac {V_{dc}}{R} = \frac {3\sqrt {3}V_{m}}{\pi R} cos(\frac {\pi}{3} + \alpha).......(4)$

</center>


### **2. Three Phase Full Wave Controlled Rectifier - RL Load**

<center><img src="images\RL load circuit.png" alt="1 phase controlled bridge rectifier" height="250"
            width="500" style="-webkit-filter:contrast(120%);"></center>
        
<center><b>Fig. 4 Three Phase Full Wave SCR with RL Load</b></center><br>

<center><img src="images\RL load waveform.png" alt="Input waveform" height="600" width="550" style="-webkit-filter:contrast(120%);"></center>
<center><b>Fig. 5 Waveforms of Three Phase Full Wave SCR with RL Load</b></center><br>

The thyristors are triggered at an interval of &pi;/3 radians i.e., at an interval of 30°. The
frequency of output ripple voltage is 6 fs and the filtering requirement is less than that of three
phase semi and half wave converters.<br>
At ωt = &pi;/6 + α , thyristor T<sub>6</sub> is already conducting when the T<sub>1</sub> thyristor is turned
on by applying the
gating signal to the gate of T<sub>1</sub>. During the time period ωt = (&pi;/6 +α) to (&pi;/2 +α), thyristors
T<sub>1</sub> and T<sub>6</sub> conduct together and the line to line supply voltage v<sub>ab</sub> appears across the
load.
At ωt = &pi;/2 +α, the thyristor T<sub>2</sub> is triggered and T<sub>6</sub> is reverse biased immediately
and T<sub>6</sub> turns
off due to natural commutation. The thyristors are numbered in the circuit diagram corresponding to the order
in which they are
triggered. The trigger sequence (firing sequence) of the thyristors is 12, 23, 34, 45, 56, 61, 12,
23, and so on. The figure shows the waveforms of three phase input supply voltages, output
voltage, the thyristor current through T<sub>1</sub> and T<sub>4</sub>, the supply current through the line
'a'.<br>
The average bridge output voltage is,<br>
<center>

$V_{O(dc)} = V_{dc} = \frac {6}{2\pi} \int_{\frac {\pi}{6} + \alpha}^{\frac {\pi}{2} + \alpha} V_{o} d\omega t$<br>

</center>

<center>

$v_{o} = v_{ab} = \sqrt 3 V_{m} sin⁡(wt + \frac {\pi}{6})$<br>

</center>

<center>

$V_{dc} = \frac {3}{\pi} \int_{\frac {\pi}{6} + \alpha}^{\frac {\pi}{2} + \alpha} \sqrt {3} V_{m} sin⁡(wt + \frac {\pi}{6}) d\omega t$<br>

</center>

<center>

$V_{out} = \frac {3\sqrt {3}}{\pi} V_{mp} cos⁡ \alpha .......(5)$<br>

</center>

The maximum average dc output voltage is obtained for a delay angle $\alpha$ = 0,<br>

<center>

$V_{dc(max)} = V_{dm} = \frac {3\sqrt {3}}{\pi} V_{mp} .......(6)$<br>

</center>

The normalized average dc output voltage is<br>

<center>

$V_{dcn} = V_{n} = \frac {V_{dc}}{V_{dm}} = cos\alpha .......(7)$<br>

</center>

The rms value of bridge output voltage is,<br>

<center>

$V_{o(rms)} = \left[\frac {6}{2\pi}\int_{\frac {\pi}{6} + \alpha}^{\frac {\pi}{2} + \alpha} V_{o}^2 dwt\right]^{1/2}$<br>

</center>

<center>

$V_{o(rms)} = \left[\frac {6}{2\pi}\int_{\frac {\pi}{6}+\alpha}^{\frac {\pi}{2}+\alpha} V_{ab}^2 dwt\right]^{1/2}$<br>

</center>

<center>

$V_{o(rms)} = \left[\frac {3}{2\pi}\int_{\frac {\pi}{6}+\alpha}^{\frac {\pi}{2}+\alpha} 3V_{m}^2 sin⁡^2(wt + \frac {\pi}{6} dwt)\right]^{1/2}$<br>

</center>

<center>

$V_{o(rms)} = \left[\sqrt {3} V_{m}(\frac {1}{2} + \frac {3\sqrt {3}}{4\pi}cos⁡2\alpha)\right]^{1/2}.......(8)$<br>

</center>

### 3. Three Phase Full Wave Controlled Rectifier - RLE Load

<center><img src="images\RLE load circuit.png" alt="1 phase controlled bridge rectifier" height="250"
            width="450" style="-webkit-filter:contrast(120%);"></center>
<center><b>Fig. 6 Three Phase Full Wave SCR with RLE Load</b></center><br>
<center><img src="images\RLE load waveform.png" alt="Input waveform" height="700" width="500" style="transform: rotate(0.9deg); -webkit-filter:contrast(150%);"></center><br>
<center><b>Fig. 7 Waveforms of Three Phase Full Wave SCR with RLE Load</b></center><br>

At $\alpha$ = 0$^{\circ}$, T1 is triggered at &omega;t = &pi;/6, T2 at 90&deg;, T3 at 150&deg; and so on. Therefore, Waveform of the load voltage shown in the figure. For &alpha; = 60&deg;, the conduction sequence of thyristors T1 to
T6 is shown in figure.
Here T1 is triggered at &omega;t = 30&deg; + 60&deg; = 90&deg;, T2 at 90&deg; + 60&deg; = 150&deg; and so on. Each
SCR conducts for 120&deg;, when
T1 is triggered, reverse biased thyristor T5 is turned off and T1 is turned on. T6 is already conducting. As
T1 is connected to A and T6 to B,
voltage v<sub>ab</sub> appears across load. When T2 is turned on, T6 is commutated from the negative group. T1
is already conducting. As T1 and T2 are connected
to A and C respectively, voltage v<sub>ac</sub> appears across the load. Positive group of SCRs are fired at
an interval of 120&deg; and similary, negative group
of SCRs are fired at an interval of 120&deg;. But SCRs from both the groups are fired at an interval of
60&deg;.

The average bridge output voltage is,<br>

<center>

$V_{out} = \frac {3\sqrt {3}}{\pi} V_{mp} cos⁡\alpha .......(9)$<br>

</center>

<center>

$V_{out} = E + I_{out}R .......(10)$<br>

</center>

The Power delivered to load is,<br>

<center>

$P = EI_{out} + I_{r}^{2}R .......(11)$<br>

</center>


### **Advantages of Three Phase Full Wave SCR**

1. A three-phase rectifier allows for higher power handling capability compared to single-phase rectifiers. It utilizes three phases of AC input, enabling the conversion of a larger amount of power.<br>

2. The three-phase rectifier provides a smoother output compared to single-phase rectifiers. With three phases
of AC input, the ripple content in the output DC waveform is significantly reduced, resulting in a more stable
and constant DC voltage.<br>

3. Due to the reduced ripple content, a three-phase rectifier has higher efficiency compared to single-phase
rectifiers. The smoother output waveform leads to lower power losses and improved overall efficiency.<br>

4. In a three-phase system, the load can be distributed more evenly among the three phases. This helps in
maintaining balanced current and voltage levels, reducing stress on individual components and improving the
system's overall reliability.<br>

5. By controlling the switching of the rectifier devices, it is possible to reduce the harmonic distortion in
the output waveform. This is particularly important in applications where harmonics can cause interference or
damage to other sensitive equipment connected to the system.<br>

6. The three-phase full-wave controlled rectifier provides flexibility in control and regulation of the output
DC voltage. By adjusting the firing angles of the rectifier devices, the average output voltage can be
controlled, allowing for precise regulation and adjustment of the DC power.<br>

7. Many industrial and commercial applications utilize three-phase power systems. Using a three-phase
rectifier ensures compatibility and seamless integration with these systems, making it a preferred choice in
many applications.<br>

### **Disadvantages of Three Phase Full Wave SCR**

1. Compared to simpler rectifiers, a three-phase full-wave controlled rectifier requires more complex control
circuitry to regulate the firing angles of the thyristors accurately. This complexity can increase the cost
and complexity of the overall system.<br>

2. The operation of the controlled rectifier introduces significant harmonic distortion in the output voltage
and current waveforms. These harmonics can lead to undesirable effects such as increased losses, decreased
power factor, and electromagnetic interference (EMI) issues. Additional filtering and power factor correction
measures may be required to mitigate these effects.<br>

3. Thyristors used in the controlled rectifier have relatively slow switching speeds compared to other power
electronic devices like MOSFETs or IGBTs. This results in higher switching losses, leading to decreased
overall efficiency of the rectifier.<br>

4. Unlike other rectifier topologies, such as the active power factor correction (PFC) rectifier, a
three-phase full-wave controlled rectifier has limited control over power factor correction. The power factor
of the rectifier may be low, especially at light loads, which can cause additional energy losses and potential
penalties from utility companies.<br>

5. The thyristors in the controlled rectifier experience high voltage stress during commutation due to the
rapid change in voltage across the device when it turns off. This stress can reduce the lifespan of the
thyristors and require additional protection measures such as snubber circuits.<br>

6. The output voltage of a three-phase full-wave controlled rectifier is typically determined by the input
voltage and the modulation index (the ratio of the peak amplitude of the modulating signal to the peak
amplitude of the carrier signal). This limited voltage control can be a disadvantage in applications where
precise voltage regulation is required.<br>

### **Applications of Three Phase Full Wave SCR**

1. Variable Speed Drives<br>

2. Uninterruptible Power Supplies (UPS)<br>

3. HVDC Transmission Systems<br>

4. Battery Charging Systems<br>

5. Power Supplies for Electroplating


</div>