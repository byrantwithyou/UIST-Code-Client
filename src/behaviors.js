export default [
  {
    name: "Minimal Wire Use",
    detectionMethod: "Peer Review",
    level: "Low",
    goodExample: "/exp/Minimal_Wire_Use_Good.jpg",
    badExample: "/exp/Minimal_Wire_Use_Bad.jpg",
    description:
      "Use as little wire as possible when wiring components. This will make your breadboard cleaner to work with and reduce chance of mis-wiring.",
    answerSets: [],
    question: ""
  },
  {
    name: "Color code your wires",
    description:
      "Color coded your circuit wires if possible(e.g., Red for power) and keep the color coding consistent.",
    level: "Medium",
    detectionMethod: "Peer Review",
    goodExample: "/exp/Color_Code_Good.jpg",
    badExample: "/exp/Color_Code_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "Separate Long Leg Components",
    description:
      "Avoid two components with long legs getting too close. The exposed legs may touch each other, resulting in a short circuit.",
    level: "High",
    detectionMethod: "Peer Review",
    goodExample: "",
    badExample: "/exp/Separate_Long_Leg_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "Don't Wire Over ICs",
    description:
      "Avoid laying wires or components over ICs. Go around ICs if at all possible. This will help prevent your circuit from malfunctioning.",
    level: "Medium",
    detectionMethod: "Peer Review",
    goodExample: "/exp/Wire_Over_IC_Good.jpg",
    badExample: "/exp/Wire_Over_IC_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "One Pin Per Socket",
    description:
      "Do not insert two pins of different components or two jumper wires into a same socket. This will cause your circuit to behave unpredictably. Only put one pin or wire into a socket.",
    level: "High",
    detectionMethod: "Peer Review",
    goodExample: "",
    badExample: "/exp/One_Pin_Per_Socket_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "Connect to Power Rails",
    description:
      "Use the power rails to connect power supply (red -> positive/ blue -> negative) instead of other 5-pin arrays. This will allow more sockets to have access to power and keep your circuit organized.",
    level: "Medium",
    detectionMethod: "Peer Review",
    goodExample: "/exp/Connect_To_Power_Rails_Good.jpg",
    badExample: "/exp/Connect_To_Power_Rails_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "Avoid Crossing Wires",
    description:
      "When wiring your circuit, avoid crossing wires if at all possible. This will help keep your circuit organized and easier to work with.",
    level: "Medium",
    detectionMethod: "Peer Review",
    goodExample: "/exp/Crossing_Wires_Good.jpg",
    badExample: "/exp/Crossing_Wires_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "Trim Long-Leg Components",
    description:
      "If your component has long legs, use the wire cutter to clip the legs as short as possible. This will allow your component to be closer to the board. Remember that your legs still need to reach the bottom of the breadboard (so don't trim too short!)",
    level: "Low",
    detectionMethod: "Peer Review",
    goodExample: "/exp/Trim_Component_Good.jpg",
    badExample: "/exp/Trim_Component_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "Check Component’s Value",
    description: "Measure the component's value (resistance/ capacitance/ inductance) using a multimeter before insertion into breadboard. This will ensure that your component is functioning properly.",
    level: "Medium",
    question: "Did you check your component value before inserting into breadboard ?",
    answerSets: [
      {
        check: true,
        question: "Yes"
      },{
        check: false,
        question: "No"
      }, {
        check: false,
        question: "Not Sure"
      }
    ],
    detectionMethod: "Quiz",
    goodExample: "/exp/Check_Value_Good.jpg",
    badExample: ""

  }, {
    name: "Check Polarity",
    description: "Make sure the polarized component's polarity is correct before insertion (e.g., Batteries, LEDs, etc.) using a multimeter. This will ensure that your component is facing the correct direction when inserted.",
    level: "High",
    question: "Did you check your component polarity before inserting into breadboard?",
    goodExample: "/exp/Check_Polarity_Good.jpg",
    badExample: "",
    detectionMethod: "Quiz",
    answerSets: [
      {
        question: "Yes",
        check: true
      }, {
        question: "No",
        check: false
      }, {
        question: "Not Sure",
        check: false
      }
    ]
  }, {
    name: "Verify Power Supply",
    description: "Always verify the power supply voltages and input signals(i.e., function generator signals or signals from other modules) with the multimeter before use.",
    level: "High",
    question: "What is the supply voltage of the battery box?",
    answerSets: [
      {
        question: "3V",
        check: true
      }, {
        question: "5V",
        check: false
      }, {
        question: "9V",
        check: false
      }, {
        question: "Not Sure",
        check: false
      }
    ],
    detectionMethod: "Quiz",
    goodExample: "/exp/Verify_Power_Good.jpg",
    badExample: ""

  }, {
    detectionMethod: "Quiz",
    goodExample: "/exp/Check_IC_Number_Good.jpg",
    badExample: "",
    name: "Check IC Part Number",
    description: "Check IC part number before insertion.This will make sure you are using the correct component.The IC part number is located on the top of the component.",
    level: "Medium",
    question: "What is the part number of the motor driver IC ?",
    answerSets: [
      {
        question: "L293D",
        check: true
      }, {
        question: "S126D",
        check: false
      }, {
        question: "P3N15",
        check: false
      }, {
        question: "L901R",
        check: false
      }
    ]
  }, {
    detectionMethod: "Quiz",
    goodExample: "/exp/Check_IC_Direction_Good.jpg",
    badExample: "",
    name: "Check IC’s Direction",
    description: "Check IC’s direction before insertion.Please make sure the small dot on the IC(e.g., indicating pin 1) matches the IC’s dot on the breadboard figure.The dot is located on the top of the component.",
    level: "Medium",
    question: "Did you check your IC’s direction before inserting into breadboard ?",
    answerSets: [
      {
        question: "Yes",
        check: true
      }, {
        question: "No",
        check: false
      }, {
        question: "Not Sure",
        check: false
      }
    ]
  }
];