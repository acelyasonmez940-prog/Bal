function send(){

let input=document.getElementById("text");

if(input.value.trim()=="") return;

let chat=document.getElementById("chat");

chat.innerHTML+=`
<div class="message user">
${input.value}
</div>
`;

input.value="";

chat.scrollTop=chat.scrollHeight;

let typing=document.createElement("div");

typing.className="message bal";

typing.id="typing";

typing.innerHTML="🐝 Bal yazıyor...";

chat.appendChild(typing);

chat.scrollTop=chat.scrollHeight;

setTimeout(()=>{

typing.remove();

chat.innerHTML+=`
<div class="message bal">
🐝 Seni dinliyorum 💗<br>
Bana biraz daha anlatır mısın? 🍯
</div>
`;

chat.scrollTop=chat.scrollHeight;

},1500);

}

let input=document.getElementById("text");

if(input.value.trim()=="") return;

let chat=document.getElementById("chat");

chat.innerHTML+=`
<div class="message user">
${input.value}
</div>
`;

input.value="";

chat.scrollTop=chat.scrollHeight;

// Yazıyor animasyonu

let typing=document.createElement("div");

typing.className="message bal";

typing.id="typing";

typing.innerHTML="🐝 Bal yazıyor...";

chat.appendChild(typing);

chat.scrollTop=chat.scrollHeight;

setTimeout(()=>{

typing.remove();

chat.innerHTML+=`
<div class="message bal">
🐝 Seni dinliyorum 💗<br>
Bana biraz daha anlatır mısın? 🍯
</div>
`;

chat.scrollTop=chat.scrollHeight;

},1500);

}