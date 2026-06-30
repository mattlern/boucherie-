const bbqImg=document.querySelector('#bbq-hero-img');
document.querySelectorAll('.bbq-tag').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.bbq-tag').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    if(bbqImg){bbqImg.src=btn.dataset.img;}
  });
});

const menuButton=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
menuButton?.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks?.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('[data-animal]').forEach(btn=>{
 btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-animal]').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.animal-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(btn.dataset.animal)?.classList.add('active');
 });
});


/* Découpes de viande interactives */
const CUTS = {
  boeuf: [
    ['Collier','decoupe-boeuf-collier.png'],['Épaule','decoupe-boeuf-epaule.png'],
    ['Côte','decoupe-boeuf-cote.png'],['Entrecôte','decoupe-boeuf-entrecote.png'],
    ['Filet','decoupe-boeuf-filet.png'],['Rumsteck','decoupe-boeuf-rumsteck.png'],
    ['Bavette','decoupe-boeuf-bavette.png'],['Poitrine','decoupe-boeuf-poitrine.png'],
    ['Jarret','decoupe-boeuf-jarret.png']
  ],
  veau: [
    ['Collier','decoupe-veau-collier.png'],['Épaule','decoupe-veau-epaule.png'],
    ['Côte','decoupe-veau-cote.png'],['Filet','decoupe-veau-filet.png'],
    ['Noix','decoupe-veau-noix.png'],['Poitrine','decoupe-veau-poitrine.png'],
    ['Jarret','decoupe-veau-jarret.png']
  ],
  porc: [
    ['Palette','decoupe-porc-palette.png'],['Échine','decoupe-porc-echine.png'],
    ['Côtes','decoupe-porc-cotes.png'],['Filet','decoupe-porc-filet.png'],
    ['Poitrine','decoupe-porc-poitrine.png'],['Jambon','decoupe-porc-jambon.png'],
    ['Gorge','decoupe-porc-gorge.png'],['Jarret','decoupe-porc-jarret.png']
  ],
  agneau: [
    ['Collier','decoupe-agneau-collier.png'],['Épaule','decoupe-agneau-epaule.png'],
    ['Carré','decoupe-agneau-carre.png'],['Selle','decoupe-agneau-selle.png'],
    ['Gigot','decoupe-agneau-gigot.png'],['Poitrine','decoupe-agneau-poitrine.png'],
    ['Souris','decoupe-agneau-souris.png']
  ],
  volaille: [
    ['Blanc','decoupe-volaille-blanc.png'],['Ailes','decoupe-volaille-ailes.png'],
    ['Hauts de cuisse','decoupe-volaille-hauts-de-cuisse.png'],
    ['Cuisses','decoupe-volaille-cuisses.png'],['Pilons','decoupe-volaille-pilons.png']
  ]
};

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cette pièce se prête à différentes cuissons et préparations. Nos conseils et recettes seront ajoutés prochainement.';

function loadImage(src){
  return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});
}

async function initCutViewer(panel){
  const animal=panel.dataset.cutAnimal;
  const viewer=panel.querySelector('.cut-viewer');
  const canvas=viewer.querySelector('canvas');
  const ctx=canvas.getContext('2d',{willReadFrequently:true});
  const info=panel.querySelector('.cut-info');
  const title=info.querySelector('h2');
  const text=info.querySelector('.cut-info-text');
  const buttons=info.querySelector('.cut-buttons');
  const base=await loadImage(viewer.dataset.base);
  const pieces=await Promise.all(CUTS[animal].map(async([name,file])=>({name,file,img:await loadImage(`assets/images/cuts/${file}`)})));
  const masks=pieces.map(piece=>{
    const c=document.createElement('canvas');c.width=canvas.width;c.height=canvas.height;
    const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(piece.img,0,0,c.width,c.height);
    return x.getImageData(0,0,c.width,c.height).data;
  });
  let selected=-1;
  let locked=false;

  function draw(index=-1){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha=index<0?1:.17;
    ctx.drawImage(base,0,0,canvas.width,canvas.height);
    ctx.globalAlpha=1;
    if(index>=0)ctx.drawImage(pieces[index].img,0,0,canvas.width,canvas.height);
    viewer.classList.toggle('is-active',index>=0);
  }
  function show(index,lock=false){
    selected=index;locked=lock;
    draw(index);
    buttons.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active',i===index));
    if(index>=0){title.textContent=pieces[index].name;text.textContent=lorem;info.classList.add('is-selected');}
    else{title.textContent='Découvrez les morceaux';text.textContent='Survolez une pièce de l’animal pour afficher son nom et découvrir bientôt nos conseils de cuisson et recettes.';info.classList.remove('is-selected');}
  }
  function pieceAt(clientX,clientY){
    const r=canvas.getBoundingClientRect();
    const x=Math.max(0,Math.min(canvas.width-1,Math.floor((clientX-r.left)*canvas.width/r.width)));
    const y=Math.max(0,Math.min(canvas.height-1,Math.floor((clientY-r.top)*canvas.height/r.height)));
    const px=(y*canvas.width+x)*4+3;
    for(let i=masks.length-1;i>=0;i--)if(masks[i][px]>28)return i;
    return -1;
  }
  pieces.forEach((piece,i)=>{
    const b=document.createElement('button');b.type='button';b.textContent=piece.name;
    b.addEventListener('mouseenter',()=>show(i,false));
    b.addEventListener('focus',()=>show(i,false));
    b.addEventListener('click',()=>show(i,true));buttons.appendChild(b);
  });
  canvas.addEventListener('mousemove',e=>{if(!locked){const i=pieceAt(e.clientX,e.clientY);if(i!==selected)show(i,false);}});
  canvas.addEventListener('mouseleave',()=>{if(!locked)show(-1,false)});
  canvas.addEventListener('click',e=>{const i=pieceAt(e.clientX,e.clientY);show(i,i>=0)});
  canvas.addEventListener('touchstart',e=>{const t=e.touches[0];if(!t)return;const i=pieceAt(t.clientX,t.clientY);show(i,i>=0);},{passive:true});
  info.addEventListener('dblclick',()=>show(-1,false));
  draw();
}

document.querySelectorAll('.interactive-animal').forEach(panel=>initCutViewer(panel).catch(console.error));
