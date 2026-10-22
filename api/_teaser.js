const RS="मेष,वृषभ,मिथुन,कर्क,सिंह,कन्या,तुला,वृश्चिक,धनु,मकर,कुंभ,मीन".split(","),MW=["","कमज़ोर","सावधानी वाला","ठीक","अच्छा","बेहतरीन"],GH=[[4,3,4,3],[2,2,3,2],[3,4,4,4],[2,2,2,3],[2,3,3,2],[3,4,5,4],[5,4,4,4],[2,2,1,2],[3,2,3,2],[3,5,4,4],[4,4,4,5],[3,2,2,1]];
const R=x=>x*Math.PI/180,N=x=>((x%360)+360)%360,JD=t=>t/864e5+2440587.5;
const moonL=d=>{const D=R(297.85+12.190749*d),M=R(134.963+13.064993*d),S=R(357.528+.9856003*d);return N(218.316+13.176396*d+6.289*Math.sin(M)+1.274*Math.sin(2*D-M)+.658*Math.sin(2*D)-.186*Math.sin(S))};
const ay=d=>23.85+d/365.25*.01397;
// Indian date (year, month 0-11, day), same calendar day the browser sees in India
const istYMD=(now=Date.now())=>{const d=new Date(now+19800000);return[d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()]};
function teaser(r,ymd){const d=JD(Date.UTC(ymd[0],ymd[1],ymd[2],6,30))-2451545,ms=Math.floor(N(moonL(d)-ay(d))/30),sc=GH[(ms-r+12)%12],m=Math.round(sc.reduce((a,b)=>a+b)/4);
return{title:`🪔 ${RS[r]} राशि · आज का दिन ${MW[m]}`,body:m<=2?"आज थोड़ा संभलकर चलने का दिन है। क्या न करें और राहु काल कब है, साइट पर देखें।":m==3?"आज का दिन मिला-जुला है। शुभ समय और पूरा हाल साइट पर देखें।":"आज का दिन अच्छा संकेत दे रहा है! शुभ रंग, शुभ समय और पूरा हाल साइट पर देखें।",url:`/?r=${r}#naam`}}

// ---- दिन में 3 अलग सूचनाएं: morning (10 बजे), noon (2 बजे), evening (7 बजे) ----
const NK="अश्विनी,भरणी,कृत्तिका,रोहिणी,मृगशिरा,आर्द्रा,पुनर्वसु,पुष्य,आश्लेषा,मघा,पूर्वा फाल्गुनी,उत्तरा फाल्गुनी,हस्त,चित्रा,स्वाति,विशाखा,अनुराधा,ज्येष्ठा,मूल,पूर्वाषाढ़ा,उत्तराषाढ़ा,श्रवण,धनिष्ठा,शतभिषा,पूर्वा भाद्रपद,उत्तरा भाद्रपद,रेवती".split(","),
 TT="प्रतिपदा,द्वितीया,तृतीया,चतुर्थी,पंचमी,षष्ठी,सप्तमी,अष्टमी,नवमी,दशमी,एकादशी,द्वादशी,त्रयोदशी,चतुर्दशी".split(","),
 DEV=["सूर्य देव","भगवान शिव","हनुमान जी","श्री कृष्ण","बृहस्पति देव","माँ लक्ष्मी","शनि देव"],DAY=["रविवार","सोमवार","मंगलवार","बुधवार","गुरुवार","शुक्रवार","शनिवार"];
const sunL=d=>N(280.46+.9856474*d+1.915*Math.sin(R(357.528+.9856003*d))+.02*Math.sin(R(2*(357.528+.9856003*d))));
const dayJD=ymd=>JD(Date.UTC(ymd[0],ymd[1],ymd[2],6,30))-2451545;
const wdOf=ymd=>new Date(Date.UTC(ymd[0],ymd[1],ymd[2])).getUTCDay();
const nextYMD=ymd=>{const t=new Date(Date.UTC(ymd[0],ymd[1],ymd[2]+1));return[t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]};
function slotMsg(slot,r,ymd){
 if(slot==="noon"){const d=dayJD(ymd),ml=moonL(d),sl=sunL(d),el=N(ml-sl),t=Math.floor(el/12),sm=N(ml-ay(d)),ms=Math.floor(sm/30),hs=(ms-r+12)%12+1,
  tn=t==14?"पूर्णिमा":t==29?"अमावस्या":TT[t%15],pk=t<15?"शुक्ल":"कृष्ण",nk=NK[Math.floor(sm/(360/27))];
  return{title:`📅 ${RS[r]} राशि · आज चंद्रमा ${RS[ms]} में`,body:`आज ${pk} पक्ष ${tn}, नक्षत्र ${nk}। चंद्रमा आपकी राशि से ${hs}वें घर में है। दोपहर बाद का पूरा हाल साइट पर देखें।`,url:`/?r=${r}#panchang`}}
 if(slot==="evening"){const nx=nextYMD(ymd),t=teaser(r,nx),w=wdOf(nx),mm=t.title.split("आज का दिन ")[1]||"";
  return{title:`🌙 ${RS[r]} राशि · कल का दिन ${mm}`,body:`कल ${DAY[w]} है, कल के देव ${DEV[w]} हैं। कल क्या करें और क्या न करें, साइट पर देखें।`,url:`/?r=${r}#dev-${w}`}}
 return teaser(r,ymd)}
module.exports={teaser,istYMD,slotMsg};
