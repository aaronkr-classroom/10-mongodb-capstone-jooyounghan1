// seed.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 * 새로운 데이터 생성
 */
// 모듈 가져오기
const mongoose = require("mongoose"),
    Subscriber = require("./models/Subscriber");

// 데이터베이스 연결 설정
mongoose.connect(
    "mongodb+srv://ut-node:bmwbkrGj7SF6V33c@ut-node.034woqa.mongodb.net/?retryWrites=true&w=majority&appName=ut-node"
);
mongoose.connection;
// subscribers 배열 생성 (5개 이상)
var subscribers = [
  {
    name: "sleepy",
    email: "a@b.com",
    newsletter: true,
  },

  {
    name: "tired",
    email: "c@d.com",
    newsletter: false,
  },

  {
    name: "sad",
    email: "e@f.com",
    newsletter: true,
  },

  {
    name: "angry",
    email: "g@h.com",
    newsletter: false,
  },

  {
    name: "depressed",
    email: "I@j.com",
    newsletter: true,
  },
];

// 기존 데이터 제거


var commands = [];

// 프라미스 생성을 위한 구독자 객체 루프
subscribers.forEach(s => {
    commands.push(
        Subscriber.create({
            name: s.name,
            email: s.email,
            newsletter: s.newsletter
        })
        .then(s => {
            console.log(`Created: ${s.name}`);
        })
    );
});

// 프라미스 생성 후 로깅 작업
Promise.all(commands)
    .then(r => {
        console.log(JSON.stringify(r, null, 2));
        mongoose.connection.close(); //오류가 나올수도 있다...
    })
    .catch(e => {
        console.log(e);
    });