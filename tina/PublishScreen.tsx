import React, { useEffect, useState } from 'react';
import type { TinaCMS } from 'tinacms';
export function PublishIcon() { return <span aria-hidden="true">↑</span>; }
export function PublishScreen({ cms }: { cms: TinaCMS }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  async function publish() {
    if (cms.forms.all().some(form => form.dirty || form.submitting)) {
      setMessage('Save your changes before publishing.'); return;
    }
    setBusy(true); setMessage('');
    try {
      if (!cms.api.tina.isLocalMode) {
        if (cms.api.tina.getBranch() !== 'main') throw new Error('Publishing is only available from main.');
        await cms.api.tina.request(`mutation PublishFullPsych($revision: Float!) {
          updatePublishRequest(relativePath: "publish.json", params: { revision: $revision }) { revision }
        }`, { variables: { revision: Date.now() } });
        setMessage('Publish requested. GitHub Actions is building and deploying your saved changes.');
        return;
      }
      const response = await fetch('/api/fullpsych/publish', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Publishing failed.');
      setMessage(result.message);
    } catch (error: any) { setMessage(error.message || 'Publishing failed. Please try again.'); }
    finally { setBusy(false); }
  }
  return <div style={{ padding: '36px', maxWidth: '680px', fontFamily: 'inherit' }}>
    <h1 style={{ fontSize: '28px', fontWeight: 600 }}>Publish FullPsych</h1>
    <p style={{ margin: '18px 0', lineHeight: 1.6 }}>Save your edits, preview them, then publish when you are ready. This publishes all saved changes to fullpsych.com.</p>
    <button type="button" disabled={busy} onClick={publish} style={{ background: '#2563eb', color: 'white', border: 0, borderRadius: '7px', padding: '12px 22px', fontWeight: 600, cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.65 : 1 }}>{busy ? 'Requesting publish…' : 'Publish FullPsych'}</button>
    {message && <p role="status" style={{ margin: '20px 0', lineHeight: 1.6 }}>{message}</p>}
    <p style={{ marginTop: '24px' }}><a href="https://github.com/nathanpuls/fullpsych-site/actions/workflows/publish.yml" target="_blank" rel="noreferrer">View deployment status ↗</a></p>
  </div>;
}

export function ViewSiteIcon() { return <span aria-hidden="true">↗</span>; }
export function ViewSiteScreen() {
  useEffect(() => { window.location.assign('/admin'); }, []);
  return <p style={{ padding: '24px' }}>Opening site…</p>;
}
