(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  // Tabs (crepe lab)
  var tabs=document.querySelectorAll('[role="tab"]');
  function sel(t){tabs.forEach(function(x){x.setAttribute('aria-selected','false');x.tabIndex=-1;document.getElementById(x.getAttribute('aria-controls')).hidden=true;});t.setAttribute('aria-selected','true');t.tabIndex=0;document.getElementById(t.getAttribute('aria-controls')).hidden=false;}
  tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t);});t.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d)return;var nx=tabs[(i+d+tabs.length)%tabs.length];sel(nx);nx.focus();});});
  // Seasonal edit (by month)
  var E={spring:['Spring','Light layers for cool mornings and bright afternoons: crepe blouses under soft cardigans, midi skirts and loafers.',['Crepe de chine blouse','Fine-knit cardigan','Midi skirt','Light trench']],
    summer:['Summer','Airy, quick-drying fabrics that keep their shape in the heat: georgette, crepon and linen in pale, sun-washed colours.',['Crepon sundress','Georgette shirt','Wide-leg trousers','Woven sandals']],
    autumn:['Autumn','Richer colours and heavier drape: wool crepe trousers, silky shirts and the first knitwear of the season.',['Wool crepe trousers','Satin-finish shirt','Merino knit','Suede ankle boots']],
    winter:['Winter','Chalet-ready warmth with polish: turtlenecks under tailored coats, crepe dresses with tights and boots.',['Wool coat','Turtleneck knit','Crepe jersey dress','Leather boots']]};
  var m=new Date().getMonth()+1,k=m>=3&&m<=5?'spring':m>=6&&m<=8?'summer':m>=9&&m<=11?'autumn':'winter',ed=document.getElementById('edit');
  if(ed){var e=E[k];ed.querySelector('.ssn').firstChild.textContent=e[0];ed.querySelector('[data-k=d]').textContent=e[1];ed.querySelector('ul').innerHTML=e[2].map(function(x){return '<li>'+x+'</li>';}).join('');}
  // Outfit builder
  var O={work:{t:'Polished & easy',top:'Crepe de chine blouse',bot:'Wool crepe tailored trousers',shoe:'Leather loafers'},
    weekend:{t:'Relaxed alpine weekend',top:'Soft knit or crepe jersey tee',bot:'Straight-leg jeans or a midi skirt',shoe:'Clean trainers or ankle boots'},
    evening:{t:'Quietly elegant evening',top:'Georgette or satin-finish blouse',bot:'Fluid crepe midi skirt or a crepe dress',shoe:'Block-heel sandals or sleek boots'},
    travel:{t:'Crease-free travel',top:'Crepe jersey top',bot:'Pull-on crepe trousers',shoe:'Comfortable flats'}};
  var L={spring:['Light trench or fine-knit cardigan','Crepe de chine and georgette resist creasing in a weekend bag.'],
    summer:['Linen overshirt or none at all','Crepon’s crinkled texture breathes well and never needs ironing.'],
    autumn:['Merino knit or a soft blazer','Wool crepe drapes beautifully and warms without bulk.'],
    winter:['Tailored wool coat and a scarf','Layer crepe jersey under knits; add tights and boots.']};
  var bf=document.getElementById('builder');
  function build(){if(!bf)return;var o=bf.querySelector('[name=occ]:checked').value,s=bf.querySelector('[name=ssn]:checked').value,x=O[o],l=L[s];
    document.getElementById('o-title').textContent=x.t;
    document.getElementById('o-list').innerHTML='<li><b>Top</b><span>'+x.top+'</span></li><li><b>Bottom</b><span>'+x.bot+'</span></li><li><b>Layer</b><span>'+l[0]+'</span></li><li><b>Shoes</b><span>'+x.shoe+'</span></li>';
    document.getElementById('o-tip').textContent=l[1];
    document.querySelectorAll('[data-look]').forEach(function(i){i.hidden=i.dataset.look!==s;});}
  if(bf){var r=bf.querySelector('[name=ssn][value='+k+']');if(r)r.checked=true;bf.addEventListener('change',build);build();}
  // Contact form -> email app
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  // Cookie
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('ca_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('ca_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
