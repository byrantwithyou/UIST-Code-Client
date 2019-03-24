export default [
  {
    name: "减少导线使用",
    detectionMethod: "Peer Review",
    level: "Low",
    goodExample: "/exp/Minimal_Wire_Use_Good.jpg",
    badExample: "/exp/Minimal_Wire_Use_Bad.jpg",
    description:
      "当连接组件时，使用尽可能少的导线。这将使您的面包板更整洁，并减少错误接线的机会。",
    answerSets: [],
    question: ""
  },
  {
    name: "用颜色标注导线",
    description:
      "如果可能的话，用颜色标注导线，并保持一致性。",
    level: "Medium",
    detectionMethod: "Peer Review",
    goodExample: "/exp/Color_Code_Good.jpg",
    badExample: "/exp/Color_Code_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "分离长脚元件",
    description:
      "避免两个长脚部件靠得太近。因为暴露在外的长脚可能会互相接触，导致短路。",
    level: "High",
    detectionMethod: "Peer Review",
    goodExample: "",
    badExample: "/exp/Separate_Long_Leg_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "别让导线跨过IC",
    description:
      "避免使导线或元件跨过IC，尽可能的绕过它。 这将有助于防止您的电路故障。",
    level: "Medium",
    detectionMethod: "Peer Review",
    goodExample: "/exp/Wire_Over_IC_Good.jpg",
    badExample: "/exp/Wire_Over_IC_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "每个插孔一个引脚",
    description:
      "不要将两个不同部件的引脚或两个跳线插入同一个插孔。这将导致你的电路可能出现故障。",
    level: "High",
    detectionMethod: "Peer Review",
    goodExample: "",
    badExample: "/exp/One_Pin_Per_Socket_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "连接电源线",
    description:
      "使用电源轨道连接电源(红色->正极/蓝色->负极)，而不是其他5孔阵列。这将允许更多的插座接入电源，并保持您的电路合理组织。",
    level: "Medium",
    detectionMethod: "Peer Review",
    goodExample: "/exp/Connect_To_Power_Rails_Good.jpg",
    badExample: "/exp/Connect_To_Power_Rails_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "避免导线交叉",
    description:
      "尽可能避免交叉布线。这将有助于保持你的电路合理组织，更易于工作。",
    level: "Medium",
    detectionMethod: "Peer Review",
    goodExample: "/exp/Crossing_Wires_Good.jpg",
    badExample: "/exp/Crossing_Wires_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "修剪长脚元件",
    description:
      "如果您的组件有长脚，请尽量将其剪短。这将允许您的组件更接近面包板。但请记住，组件的脚仍然需要达到面包板的底部(所以不要剪得太短!)",
    level: "Low",
    detectionMethod: "Peer Review",
    goodExample: "/exp/Trim_Component_Good.jpg",
    badExample: "/exp/Trim_Component_Bad.jpg",
    answerSets: [],
    question: ""
  },
  {
    name: "测量元件值",
    description: "在插入面包板之前，使用万用表测量元件的值(电阻/电容/电感)。这将确保组件正常工作。",
    level: "Medium",
    question: "在插入面包板之前，是否检查了组件值?",
    answerSets: [
      {
        check: true,
        question: "是"
      },{
        check: false,
        question: "否"
      }, {
        check: false,
        question: "不确定"
      }
    ],
    detectionMethod: "Quiz",
    goodExample: "/exp/Check_Value_Good.jpg",
    badExample: ""

  }, {
    name: "检查极性",
    description: "在使用极性元件前(如电池、led等)，请用万用表确保它们极性正确。",
    level: "High",
    question: "在插入面包板之前，你检查过你的元件极性了吗？",
    goodExample: "/exp/Check_Polarity_Good.jpg",
    badExample: "",
    detectionMethod: "Quiz",
    answerSets: [
      {
        question: "是",
        check: true
      }, {
        question: "否",
        check: false
      }, {
        question: "不确定",
        check: false
      }
    ]
  }, {
    name: "验证电源",
    description: "在使用电源前，用万用表检查电源电压和输入信号(即函数发生器信号或来自其他模块的信号)",
    level: "High",
    question: "电池箱的供电电压是多少？",
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
        question: "不确定",
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
    name: "检查IC部件号",
    description: "插入前检查IC部件号。这将确保您使用的组件是正确的。IC部件号位于部件的顶部。",
    level: "Medium",
    question: "IC的部件号是多少？",
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
    name: "检查IC的方向",
    description: "插入前检查IC的方向。请确认IC上的小圆点与测试板图形上IC点匹配。点位于组件的顶部",
    level: "Medium",
    question: "插入面包板前，你检查过IC的方向了吗?",
    answerSets: [
      {
        question: "是",
        check: true
      }, {
        question: "否",
        check: false
      }, {
        question: "不确定",
        check: false
      }
    ]
  }
];