document.addEventListener('submit',event=>{
  const form=event.target;
  if(!form.matches('[data-weight-form]'))return;
  event.preventDefault();
  const values=new FormData(form);
  const [length,width,height,weight,divisor]=['l','w','h','kg','k'].map(k=>Number(values.get(k)));
  const volume=length*width*height/divisor;
  const out=form.querySelector('output');
  if(!Number.isFinite(volume)||![length,width,height,weight,divisor].every(n=>n>0&&Number.isFinite(n))){out.textContent='';return;}
  const number=new Intl.NumberFormat(document.documentElement.lang,{maximumFractionDigits:3});
  out.textContent=out.dataset.volume+' '+number.format(volume)+' kg · '+out.dataset.bill+' '+number.format(Math.max(weight,volume))+' kg';
});
