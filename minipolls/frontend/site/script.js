const $ = (id) => document.getElementById(id);

$('createBtn').onclick = async () => {
  const question = $('q').value.trim();
  const options = $('opts').value.split(',').map(s => s.trim()).filter(Boolean);
  $('createMsg').textContent = '';
  if (!question || options.length < 2) { $('createMsg').textContent='Enter a question and at least two options.'; return; }
  try {
    const r = await fetch('/api/v1/polls', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({question, options}) });
    const data = await r.json(); if(!r.ok) throw new Error(data.error||'Failed');
    $('createMsg').textContent = `✅ Poll created with ID: ${data.pollId}`;
    $('pollId').value = data.pollId;
  } catch(e){ $('createMsg').textContent = `❌ ${e.message}`; }
};

$('loadBtn').onclick = async () => {
  $('voteMsg').textContent = '';
  const id = Number($('pollId').value); if(!id) return;
  try {
    const r = await fetch(`/api/v1/polls/${id}`); const data = await r.json(); if(!r.ok) throw new Error(data.error||'Not found');
    $('pollArea').classList.remove('hidden'); $('pollQuestion').textContent = data.question;
    const wrap = $('options'); wrap.innerHTML='';
    data.options.forEach(o => {
      const div = document.createElement('div'); div.className='option';
      const btn = document.createElement('button'); btn.textContent='Vote'; btn.onclick=()=>vote(id, o.id);
      const span = document.createElement('span'); span.textContent=o.text;
      div.append(btn, span); wrap.appendChild(div);
    });
  } catch(e){ $('voteMsg').textContent = `❌ ${e.message}`; }
};

async function vote(pollId, optionId){
  $('voteMsg').textContent='';
  try{
    const r = await fetch(`/api/v1/polls/${pollId}/vote`, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({ optionId }) });
    const data = await r.json(); if(!r.ok) throw new Error(data.error||'Failed');
    $('voteMsg').textContent='✅ Vote recorded!'; refreshResults();
  }catch(e){ $('voteMsg').textContent=`❌ ${e.message}`; }
}

$('refreshResultsBtn').onclick = refreshResults;
async function refreshResults(){
  const id = Number($('pollId').value); if(!id) return;
  const box = $('results'); box.innerHTML='';
  try{
    const r = await fetch(`/api/v1/results/${id}/summary`); const data = await r.json(); if(!r.ok) throw new Error(data.error||'Failed');
    const h = document.createElement('h3'); h.textContent = `Results: ${data.question} (${data.totalVotes} votes)`; box.appendChild(h);
    data.totals.forEach(t=>{
      const row=document.createElement('div'); row.style.margin='8px 0';
      const label=document.createElement('div'); label.textContent=`${t.option} — ${t.count} (${t.pct}%)`;
      const prog=document.createElement('div'); prog.className='progress';
      const bar=document.createElement('div'); bar.className='bar'; bar.style.width=`${t.pct}%`;
      prog.appendChild(bar); row.append(label, prog); box.appendChild(row);
    });
  }catch(e){ box.textContent=`❌ ${e.message}`; }
}
