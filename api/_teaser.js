const RS="मेष,वृषभ,मिथुन,कर्क,सिंह,कन्या,तुला,वृश्चिक,धनु,मकर,कुंभ,मीन".split(","),MW=["","कमज़ोर","सावधानी वाला","ठीक","अच्छा","बेहतरीन"],GH=[[4,3,4,3],[2,2,3,2],[3,4,4,4],[2,2,2,3],[2,3,3,2],[3,4,5,4],[5,4,4,4],[2,2,1,2],[3,2,3,2],[3,5,4,4],[4,4,4,5],[3,2,2,1]];
const R=x=>x*Math.PI/180,N=x=>((x%360)+360)%360,JD=t=>t/864e5+2440587.5;
const moonL=d=>{const D=R(297.85+12.190749*d),M=R(134.963+13.064993*d),S=R(357.528+.9856003*d);return N(218.316+13.176396*d+6.289*Math.sin(M)+1.274*Math.sin(2*D-M)+.658*Math.sin(2*D)-.186*Math.sin(S))};
const ay=d=>23.85+d/365.25*.01397;
// Indian date (year, month 0-11, day), same calendar day the browser sees in India
const istYMD=(now=Date.now())=>{const d=new Date(now+19800000);return[d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()]};
function teaser(r,ymd){const d=JD(Date.UTC(ymd[0],ymd[1],ymd[2],6,30))-2451545,ms=Math.floor(N(moonL(d)-ay(d))/30),sc=GH[(ms-r+12)%12],m=Math.round(sc.reduce((a,b)=>a+b)/4);
return{title:`🪔 ${RS[r]} राशि · आज का दिन ${MW[m]}`,body:m<=2?"आज थोड़ा संभलकर चलने का दिन है। क्या न करें और राहु काल कब है, साइट पर देखें।":m==3?"आज का दिन मिला-जुला है। शुभ समय और पूरा हाल साइट पर देखें।":"आज का दिन अच्छा संकेत दे रहा है! शुभ रंग, शुभ समय और पूरा हाल साइट पर देखें।",url:`/?r=${r}#naam`}}
module.exports={teaser,istYMD};
