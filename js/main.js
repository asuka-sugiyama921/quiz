'use strict';

{
const question = document.getElementById('question');
const choices = document.getElementById('choices');
const btn = document.getElementById('btn');
const result = document.getElementById('result');
const scoreLabel = document.querySelector('#result > p');

const quizSet = shuffle([
  {q: '「千と千尋の神隠し」の主題歌は？'
  ,c: ['いつも何度でも','いつでも誰かが','何度でも']},
  {q: '「天空の城ラピュタ」に登場する大きな飛行船の名前は？'
  ,c: ['ゴリアテ','メーヴェ','サボイア']},
  {q: '「もののけ姫」に出てくる山犬モロの本当の名前は？'
  ,c: ['モロの君','モロの母','モロの神']},
  {q: '「思い出のマーニー」の主題歌は？'
  ,c: ['Fine On The Outside','Stand by Me','Shoot the Moon']},
  {q: '「ハウルの動く城」のヒロイン、ソフィの働いていた帽子屋の名前は？'
  ,c: ['ペンドラゴン','ジェンキンス','カーチス']},
]);

let currentNum = 0;
let isAnswered
let score = 0;


function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j],arr[i]] = [arr[i],arr[j]];
  }
  return arr;
}
function checkAnswer(li){
  if(isAnswered){
    return;
  }
  isAnswered = true;
  if(li.textContent === quizSet[currentNum].c[0]){
    li.classList.add('correct');
    score++;
  }else{
    li.classList.add('wrong');
  }
  btn.classList.remove('disabled');
}


function setQuiz(){
  isAnswered = false;

  question.textContent = quizSet[currentNum].q;

  while(choices.firstChild){
    choices.removeChild(choices.firstChild);
  }

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  shuffledChoices.forEach(choice => {
    const li = document.createElement('li');
    li.textContent = choice;
    li.addEventListener('click',() => {
      checkAnswer(li);
    });
    choices.appendChild(li);
    
  });

  if(currentNum === quizSet.length - 1){
    btn.textContent = 'Show Score';
  }
}

setQuiz();

btn.addEventListener('click',() => {
  if(btn.classList.contains('disabled')){
    return;
  }
  btn.classList.add('disabled');

  if(currentNum === quizSet.length - 1){
    scoreLabel.textContent = `score: ${score} / ${quizSet.length}`;
    result.classList.remove('hidden');
  }else{
    currentNum++;
    setQuiz();
  
  }
});


}
