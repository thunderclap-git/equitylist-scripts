console.log("working");

let prefix = "quiz";
const SELECTORS = {
  beginCard: `[${prefix}=begin]`,
  beginBtn: `[${prefix}=begin-btn]`,
  quesCard: `[${prefix}=question]`,
  quesMain: `[${prefix}=question-main]`,
  quesSub: `[${prefix}=question-sub]`,
  quesBtn1: `[${prefix}=question-btn1]`,
  quesBtn2: `[${prefix}=question-btn2]`,
  quesBtn3: `[${prefix}=question-btn3]`,
  quesPrev: `[${prefix}=question-prev]`,
  btnsWrapper: `[${prefix}=ques-btn-wrapper]`,
  formContent: `[${prefix}=form-content]`,
  answerCard: `[${prefix}=answer]`,
  answerCardText: `[${prefix}=answer-mainText]`,
  answerCardBtn: `[${prefix}=answer-btn1]`,
  answerSub: `[${prefix}=answer-sub]`,
  answerEquityBtn: `[${prefix} = answer-showMore]`,
  formCard: `[${prefix}=form]`,
  formCardBtn: `[${prefix}=form-btn]`,
  FormParent: `[${prefix}=form-parent]`,
  //formBlock: `[${prefix}=actual-form]`,
  formBlock: `#wf-form-Demat-quiz-form`,
  // nameInputRef: `[${prefix}=]`,
  // emailInputRef: `[${prefix}=]`,

  quesNo: `[${prefix}=question-no]`,
};

const getElementRef = (selector) => {
  return document.querySelector(selector);
};

const onClickHandler = (ref, callback) => {
  ref?.addEventListener("click", callback);
};

const Questions = {
  annualTY: "What is your company's annual turnover for FY 2023-24?",
  shareholders: "How many shareholders does your company have?",
  raiseFunds: "Do you have plans to raise funds in the next 12 months?",
  foreign: "Do you have any foreign shareholders?",
  certificates: "Where are the share certificates stored?",
};

//Global state
let STATE = {};
let currentNode = 1;
let answers = [];

const Flow = {
  0: {
    card: SELECTORS.beginCard,
    prevBtn: null,
    btn1: 1,
    btn2: null,
    btn3: null,
  },
  1: {
    card: SELECTORS.quesCard,
    mainText: "What is your company's paid-up capital?",
    subText:
      "The total amount of money your company has received from issuing shares to investors.",
    btn1: "2",
    btn1Text: "Less than 4 crores",
    btn2: "2",
    btn2Text: "More than 4 crores",
    btn3: null,
  },
  2: {
    card: SELECTORS.quesCard,
    mainText: Questions.raiseFunds,
    btn1: "3",
    btn1Text: "Yes",
    btn2: "3",
    btn2Text: "No",
    btn3: null,
    btn3Text: null,
    prevBtn: "1",
  },
  3: {
    card: SELECTORS.quesCard,
    mainText: Questions.annualTY,
    btn1: "4", //f
    btn1Text: "Less than 10 crores",
    btn2: "4",
    btn2Text: "10-39 crores",
    btn3: "4",
    btn3Text: "More than 40 crores",
    prevBtn: 2,
  },
  4: {
    card: SELECTORS.quesCard,
    mainText: Questions.shareholders,
    btn1: "5",
    btn1Text: "less than 30",
    btn2: "5",
    btn2Text: "31-100",
    btn3: "5",
    btn3Text: "more than 100",
    prevBtn: 3,
  },
  5: {
    card: SELECTORS.quesCard,
    mainText: Questions.foreign,
    btn1: "6",
    btn1Text: "Yes",
    btn2: "6",
    btn2Text: "No",
    btn3: null,
    btn3Text: null,
    prevBtn: 4,
  },
  6: {
    card: SELECTORS.quesCard,
    mainText: Questions.certificates,
    btn1: 7,
    btn1Text: "With the company",
    btn2: 7,
    btn2Text: "With the shareholder",
    btn3: 7,
    btn3Text: "Shares are spread across",
    prevBtn: 5,
  },
  7: {
    card: SELECTORS.formCard,
  },
  c1: {
    card: SELECTORS.formCard, //render form & update answer card
    extraQues: null,
    mainText:
      "Currently, you may not need to dematerialise immediately, but keep monitoring your growth and regulatory requirements.",
    prevBtn: null,
    btn1: null,
    btn2: 1,
    btn3: null,
  },
  c2: {
    card: SELECTORS.formCard, //render form & update answer card
    extraQues: {
      mainText: Questions.certificates,
      btn1: 999,
      btn1Text: "With the company",
      btn2: 999,
      btn2Text: "With the shareholder",
      btn3: 999,
      btn3Text: "Shares are spread across",
      prevBtn: currentNode,
    },
    mainText:
      "While not immediately necessary, dematerialisation could benefit your company as you approach higher turnover thresholds.",
    prevBtn: null,
    btn1: null,
    btn2: 1,
    btn3: null,
  },

  c4: {
    card: SELECTORS.formCard, //render form & update answer card
    extraQues: {
      mainText: Questions.certificates,
      btn1: 999,
      btn1Text: "With the company",
      btn2: 999,
      btn2Text: "With the shareholder",
      btn3: 999,
      btn3Text: "Shares are spread across",
      prevBtn: currentNode,
    },
    mainText:
      "You may not need to dematerialise your shares immediately, but it's wise to regularly review your company's situation. Dematerialisation could become more relevant as your business grows or if regulatory requirements change.",
    prevBtn: null,
    btn1: null,
    btn1Text: "Get Started",
    btn2: 1,
    btn3: null,
  },
  c3: {
    card: SELECTORS.formCard, //render form & update answer card
    extraQues: {
      mainText: Questions.certificates,
      btn1: 999,
      btn1Text: "With the company",
      btn2: 999,
      btn2Text: "With the shareholder",
      btn3: 999,
      btn3Text: "Shares are spread across",
      prevBtn: "5",
    },
    mainText:
      "Your turnover and shareholding structure suggest considering dematerialisation to streamline operations and be prepared for future growth.",
    subText:
      "Check your email. An expert from our team will reach out with more details.",
    prevBtn: null,
    //  btn1: 1,
    btn1Text: "Get Started",
    btn2: null,
    btn3: null,
  },

  c6: {
    card: SELECTORS.formCard, //render form & update answer card
    extraQues: {
      mainText: Questions.certificates,
      btn1: 999,
      btn1Text: "With the company",
      btn2: 999,
      btn2Text: "With the shareholder",
      btn3: 999,
      btn3Text: "Shares are spread across",
      prevBtn: currentNode,
    },
    mainText:
      "A large number of shareholders increases administrative complexity. dematerialising shares now could be advantageous for managing your company's shareholding structure more efficiently.",
    subText:
      "Check your email. An expert from our team will reach out with more details.",
    prevBtn: null,
    //  btn1: 1,
    btn1Text: "Get Started",
    btn2: null,
    btn3: null,
  },
  c5: {
    card: SELECTORS.formCard, //render form & update answer card
    extraQues: {
      mainText: Questions.certificates,
      btn1: 999,
      btn1Text: "With the company",
      btn2: 999,
      btn2Text: "With the shareholder",
      btn3: 999,
      btn3Text: "Shares are spread across",
      prevBtn: currentNode,
    },
    mainText:
      "The presence of foreign shareholders adds complexity to managing your shareholding structure. dematerialisation can simplify compliance and share management.",
    subText:
      "Check your email. An expert from our team will reach out with more details.",
    prevBtn: null,
    //  btn1: 1,
    btn1Text: "Get Started",
    btn2: null,
    btn3: null,
  },

  c9: {
    card: SELECTORS.formCard, //render form & update answer card
    extraQues: {
      mainText: Questions.certificates,
      btn1: 999,
      btn1Text: "With the company",
      btn2: 999,
      btn2Text: "With the shareholder",
      btn3: 999,
      btn3Text: "Shares are spread across",
      prevBtn: "10.1",
    },
    mainText:
      "Considering your paid-up capital and plans for fundraising, dematerialising shares could simplify future financial transactions and shareholder management.",
    subText:
      "Check your email. An expert from our team will reach out with more details.",
    prevBtn: null,
    //  btn1: 1,
    btn1Text: "Get Started",
    btn2: null,
    btn3: null,
  },
  c11: {
    card: SELECTORS.formCard, //render form & update answer card
    extraQues: {
      mainText: Questions.certificates,
      btn1: 999,
      btn1Text: "With the company",
      btn2: 999,
      btn2Text: "With the shareholder",
      btn3: 999,
      btn3Text: "Shares are spread across",
      prevBtn: "10.2",
    },
    mainText:
      "You might consider dematerialising your shares to better manage your moderate to large shareholder base, especially if growth is anticipated.",
    subText:
      "Check your email. An expert from our team will reach out with more details.",
    prevBtn: null,
    //   btn1: 1,
    btn1Text: "Get Started",
    btn2: null,
    btn3: null,
  },
  c12: {
    card: SELECTORS.formCard, //render form & update answer card
    extraQues: {
      mainText: Questions.certificates,
      btn1: 999,
      btn1Text: "With the company",
      btn2: 999,
      btn2Text: "With the shareholder",
      btn3: 999,
      btn3Text: "Shares are spread across",
      prevBtn: currentNode,
    },
    mainText:
      "Given the complexity of your shareholding structure, it's advisable to dematerialise your shares to manage future growth and simplify transactions.",
    subText:
      "Check your email. An expert from our team will reach out with more details.",
    prevBtn: null,
    //   btn1: 1,
    btn1Text: "Get Started",
    btn2: null,
    btn3: null,
  },
  // c13: {}, c5
  // c14: {}, c6
  c15: {
    card: SELECTORS.formCard, //render form & update answer card
    extraQues: null,
    mainText:
      "Your company is required to dematerialise its shares due to exceeding regulatory thresholds for paid-up capital and annual turnover.",
    subText:
      "Check your email. An expert from our team will reach out with more details.",
    prevBtn: null,
    //  btn1: 1,
    btn1Text: "Get Started",
    btn2: null,
    btn3: null,
  },
};

//------------------Helpers----------------------------
const hideElements = (selectors) => {
  selectors.forEach((selector) => {
    const ref = getElementRef(selector);
    ref.style.display = "none";
  });
};

const displayElements = (selectors) => {
  selectors.forEach((selector) => {
    const ref = getElementRef(selector);
    ref.style.display = "flex";
  });
};

const getQuesNo = (ques) => {
  if (ques.includes("turnover")) return 3;
  if (ques.includes("many shareholders")) return 4;
  if (ques.includes("funds")) return 2;
  if (ques.includes("foreign")) return 5;
  if (ques.includes("certificates")) return 6;
  return 1;
};

const generateInputFields = (fields) => {
  console.log("called");
  const inputContainer = getElementRef(SELECTORS.FormParent);
  fields.forEach((field) => {
    console.log("field", field);
    const input = document.createElement("input");
    input.type = "text";
    input.setAttribute("data-name", field.name);
    input.name = field.name;
    input.value = field.value;
    input.hidden = true;
    //input.placeholder = field.placeholder;
    //input.required = true;
    inputContainer.appendChild(input);
  });
};

const displayConclusionCard = () => {
  console.log("Final Answer", answers);
  hideElements([SELECTORS.formCard]);
  displayElements([SELECTORS.answerCard]);
  const A1 = answers[0];
  const A2 = answers[1];
  const A3 = answers[2];
  const A4 = answers[3];
  const A5 = answers[4];
  const A6 = answers[5];
  let cc = "c1";
  let info = Flow[cc];

  console.log("Answers", { A1, A2, A3, A4, A5, A6 });
  if (A1 === 1) {
    if (A2 === 1 && A3 === 2 && A4 === 3 && A5 === 2) cc = "c6";
    if (A2 === 1 && A3 === 3 && A4 === 3 && A5 === 1) cc = "c5";
    if (A2 === 1 && A3 === 2 && A4 === 3 && A5 === 1) cc = "c5";
    if (A2 === 1 && A3 === 2 && A4 === 2 && A5 === 2) cc = "c4";
    if (A2 === 1 && A3 === 2 && A4 === 2 && A5 === 1) cc = "c3";
    if (A2 === 2 && A3 === 2 && A4 === 3) cc = "c6";
    if (A2 === 2 && A3 === 2 && A4 === 2) cc = "c4";
    if (A2 === 1 && A3 === 2 && A4 === 1) cc = "c2";
    // if (A3 === 3 && A4 !== 3) cc = "c7";
    if (A3 === 3 && A4 !== 3) cc = "c3";
    if (A3 === 1) cc = "c1";
  } else {
    if (A2 === 1 && A3 === 2 && A4 === 3 && A5 === 2) cc = "c6";
    if (A2 === 1 && A3 === 2 && A4 === 3 && A5 === 1) cc = "c5";
    if (A2 === 1 && A3 === 2 && A4 === 2 && A5 === 2) cc = "c12";
    if (A2 === 1 && A3 === 2 && A4 === 2 && A5 === 1) cc = "c11";
    if (A2 === 1 && A3 === 2 && A4 === 1 && A5 === 2) cc = "c2";
    if (A2 === 1 && A3 === 2 && A4 === 1 && A5 === 1) cc = "c9";
    if (A2 === 2 && A3 === 2 && A4 === 3) cc = "c6";
    if (A2 === 2 && A3 === 2 && A4 === 2) cc = "c12";
    if (A2 === 2 && A3 === 2 && A4 === 1) cc = "c2";
    if (A3 === 1) cc = "c1";
    if (A3 === 3) cc = "c15";
  }

  console.log("cc", cc);
  console.log("answer", Flow[cc]);
  //updated conclusion card
  const textRef = getElementRef(SELECTORS.answerCardText);
  textRef.textContent = Flow[cc].mainText;
  const ctaRef = getElementRef(SELECTORS.answerCardBtn);
  const answerSubRef = getElementRef(SELECTORS.answerSub);
  const equityLinkRef = getElementRef(SELECTORS.answerEquityBtn);

  if (Flow[cc].btn2) {
    equityLinkRef.style.display = "block";
  } else {
    equityLinkRef.style.display = "none";
  }

  if (Flow[cc].subText) {
    answerSubRef.textContent = Flow[cc].subText;
  } else {
    answerSubRef.textContent = "";
  }

  if (Flow[cc].btn1) {
    ctaRef.style.display = "block";
    ctaRef.textContent = Flow[cc].btn1Text || "Get Started";
  } else {
    ctaRef.style.display = "none";
  }
};

const displayUserDetailsFormCard = (info) => {
  console.log("Final Answer", answers);
  const continueToForm = () => {
    hideElements([SELECTORS.quesCard]);
    displayElements([SELECTORS.formCard]);
    const inputs = [];
    for (item in STATE) {
      inputs.push({ name: item, value: STATE[item] });
    }
    generateInputFields(inputs);
    //TODO: remove
    // displayConclusionCard();

    const formRef = getElementRef(SELECTORS.formBlock);
    const formSubmitBtn = getElementRef(SELECTORS.formCardBtn);
    // formRef?.reset(); //reset form for next iteration

    formRef.addEventListener("submit", (ev) => {
      const isValid = formRef.reportValidity();
      console.log("isValid", isValid);
      if (isValid) {
        ev.preventDefault();
        displayConclusionCard();
      }
    });
  };
  // console.log("Display Form >>>", info);
  continueToForm();
};

const displayQuestionCard = (info) => {
  // console.log("FINAL STATE", STATE);
  console.log("Current node", currentNode);
  console.log("Question Card", info);
  console.log("Answer", answers);

  if (info?.card.includes("form")) {
    displayUserDetailsFormCard(info);
    console.log("FINAL STATE", STATE);
    return;
  }

  const quesNoRef = getElementRef(SELECTORS.quesNo);
  const quesNo = getQuesNo(info.mainText);
  quesNoRef.textContent = `0${quesNo}`;

  const mainTextRef = getElementRef(SELECTORS.quesMain);
  const subTextRef = getElementRef(SELECTORS.quesSub);
  const btnsContainerRef = getElementRef(SELECTORS.btnsWrapper);
  const formContentRef = getElementRef(SELECTORS.formContent);
  const btn1 = getElementRef(SELECTORS.quesBtn1);
  //clone buttons to remove previous eventlisteners
  const btn1Clone = btn1.cloneNode(true);
  btnsContainerRef.appendChild(btn1Clone);
  btn1.remove();
  const btn2 = getElementRef(SELECTORS.quesBtn2);
  const btn2Clone = btn2.cloneNode(true);
  btnsContainerRef.appendChild(btn2Clone);
  btn2.remove();
  const btn3 = getElementRef(SELECTORS.quesBtn3);
  const btn3Clone = btn3.cloneNode(true);
  btnsContainerRef.appendChild(btn3Clone);
  btn3.remove();
  const prevBtn = getElementRef(SELECTORS.quesPrev);
  const prevBtnClone = prevBtn.cloneNode(true);
  prevBtnClone.style.textDecoration = "none";
  formContentRef.appendChild(prevBtnClone);
  prevBtn.remove();

  if (info.mainText) {
    mainTextRef.textContent = info.mainText;
  }

  if (info?.subText) {
    subTextRef.textContent = info.subText;
    subTextRef.style.display = "block";
  } else {
    subTextRef.style.display = "none";
  }

  if (info.btn1) {
    btn1Clone.style.display = "block";
    btn1Clone.textContent = info?.btn1Text;
    onClickHandler(btn1Clone, btn1ClickHandler);
  } else {
    btn1Clone.style.display = "none";
  }

  if (info.btn2) {
    btn2Clone.style.display = "block";
    btn2Clone.textContent = info?.btn2Text;
    onClickHandler(btn2Clone, btn2ClickHandler);
  } else {
    btn2Clone.style.display = "none";
  }

  if (info.btn3) {
    btn3Clone.style.display = "block";
    btn3Clone.textContent = info?.btn3Text;
    onClickHandler(btn3Clone, btn3ClickHandler);
  } else {
    btn3Clone.style.display = "none";
  }

  if (info.prevBtn) {
    prevBtnClone.style.display = "block";
    // prevBtn.textContent = info?.extraQues.btn3Text;
    onClickHandler(prevBtnClone, prevBtnClickHandler);
  } else {
    prevBtnClone.style.display = "none";
  }

  // Event listener functions
  function btn1ClickHandler() {
    currentNode = info.btn1;
    STATE[info.mainText] = info.btn1Text;
    displayQuestionCard(Flow[info.btn1]);
    answers.push(1);
  }

  function btn2ClickHandler() {
    currentNode = info.btn2;
    STATE[info.mainText] = info.btn2Text;
    displayQuestionCard(Flow[info.btn2]);
    answers.push(2);
  }

  function btn3ClickHandler() {
    currentNode = info.btn3;
    STATE[info.mainText] = info.btn3Text;
    displayQuestionCard(Flow[info.btn3]);
    answers.push(3);
  }

  function prevBtnClickHandler() {
    currentNode = info.prevBtn;
    displayQuestionCard(Flow[info.prevBtn]);
    answers.pop();
  }
};

const init = () => {
  hideElements([SELECTORS.answerCard, SELECTORS.quesCard, SELECTORS.formCard]);
  const beginBtnEle = getElementRef(SELECTORS.beginBtn);

  onClickHandler(beginBtnEle, () => {
    hideElements([SELECTORS.beginCard]);
    displayElements([SELECTORS.quesCard]);
    displayQuestionCard(Flow[1]);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
