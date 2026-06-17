const countries=['Finland','Sweden','Norway','Denmark','Iceland','Estonia','Latvia','Lithuania','Germany','France','Spain','Italy','United Kingdom','Ireland','Netherlands','Belgium','Poland','Czechia','Austria','Switzerland','Greece','Cyprus','Portugal','Croatia','Serbia','Slovenia'];
const app=document.getElementById('app');
let own='',votes={};
app.innerHTML=`<div class=card><input id=u placeholder=Username><select id=c></select><button onclick=start()>Start Voting</button></div>`;
countries.forEach(x=>c.innerHTML+=`<option>${x}</option>`);

function start(){
own=c.value;
if(!u.value.trim()) return alert('Enter username');
render();
}
function render(){
let html='<div class=card><h2 id=r></h2></div><div class=grid>';
countries.filter(x=>x!==own).forEach(x=>{
votes[x]=votes[x]||0;
html+=`<div class=card>${x}<br><button onclick="chg('${x}',-1)">-</button> ${votes[x]} <button onclick="chg('${x}',1)">+</button></div>`;
});
html+='</div><div class=card><button onclick=sub()>Submit</button></div>';
app.innerHTML=html; update();
}
function chg(c,n){votes[c]=Math.max(0,Math.min(10,(votes[c]||0)+n));render();}
function update(){let t=Object.values(votes).reduce((a,b)=>a+b,0);r.innerText='Votes remaining: '+(20-t);}
function sub(){
let total=0,diff=0;
for(let v of Object.values(votes)){total+=v;if(v>0)diff++;}
if(total!==20)return alert('Need exactly 20 votes');
if(diff<5)return alert('Need at least 5 countries');
let arr=JSON.parse(localStorage.getItem('ssc21Votes')||'[]');
arr.push({username:u?.value||'User',home:own,votes,date:new Date().toISOString()});
localStorage.setItem('ssc21Votes',JSON.stringify(arr));
alert('Submitted');
location.reload();
}