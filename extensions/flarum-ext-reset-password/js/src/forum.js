import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import ResetPasswordPage from 'flarum/forum/components/ResetPasswordPage';
import LogInModal from 'flarum/forum/components/LogInModal';
import Button from 'flarum/common/components/Button';
import classList from 'flarum/common/utils/classList';
import Stream from 'flarum/common/utils/Stream';

// Override the ResetPasswordPage component completely
override(ResetPasswordPage.prototype, 'view', function(original) {
  const token = m.route.param('token');

  return (
    <div className="ResetPasswordPage--redesign">
      <div className="rp-bg-mesh" />
      <div className="rp-grid-overlay" />
      <div className="rp-orb rp-orb1" />
      <div className="rp-orb rp-orb2" />

      <div className="rp-card">
        {/* Icon */}
        <div className="rp-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <h1 className="rp-title">{app.translator.trans('miforums-reset-password.forum.title')}</h1>
        <p className="rp-subtitle">{app.translator.trans('miforums-reset-password.forum.subtitle')}</p>

        {/* Requirements box */}
        <div className="rp-rules">
          <div className="rp-rules-title">{app.translator.trans('miforums-reset-password.forum.requirements_title')}</div>
          <ul>
            <li>{app.translator.trans('miforums-reset-password.forum.req1')}</li>
            <li>{app.translator.trans('miforums-reset-password.forum.req2')}</li>
            <li>{app.translator.trans('miforums-reset-password.forum.req3')}</li>
            <li>{app.translator.trans('miforums-reset-password.forum.req4')}</li>
          </ul>
        </div>

        {/* Password field */}
        <div className="rp-field">
          <label htmlFor="rp-password">{app.translator.trans('miforums-reset-password.forum.new_password')}</label>
          <div className="rp-input-wrap">
            <input
              id="rp-password"
              type={this.showPassword1 ? 'text' : 'password'}
              className="rp-input"
              placeholder={app.translator.trans('miforums-reset-password.forum.new_password_placeholder')}
              autocomplete="new-password"
              oninput={(e) => { this.password(e.target.value); this.checkStrength(); this.checkMatch(); m.redraw(); }}
            />
            <button
              type="button"
              className="rp-eye-btn"
              onclick={() => { this.showPassword1 = !this.showPassword1; m.redraw(); }}
            >
              {this.showPassword1 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          {/* Strength meter */}
          {this.password() && (
            <div className="rp-strength-wrap">
              <div className="rp-strength-bars">
                {[1, 2, 3, 4].map(i => (
                  <div className={classList('rp-strength-bar', {
                    'rp-weak':   i <= this.strengthScore && this.strengthScore <= 1,
                    'rp-medium': i <= this.strengthScore && this.strengthScore === 2,
                    'rp-strong': i <= this.strengthScore && this.strengthScore >= 3,
                  })} />
                ))}
              </div>
              <div className="rp-strength-label">
                {app.translator.trans('miforums-reset-password.forum.strength_label')}{' '}
                <span className={`rp-strength-text rp-${this.strengthClass}`}>
                  {app.translator.trans(`miforums-reset-password.forum.strength_${this.strengthClass}`)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirm field */}
        <div className="rp-field">
          <label htmlFor="rp-confirm">{app.translator.trans('miforums-reset-password.forum.confirm_password')}</label>
          <div className="rp-input-wrap">
            <input
              id="rp-confirm"
              type={this.showPassword2 ? 'text' : 'password'}
              className="rp-input"
              placeholder={app.translator.trans('miforums-reset-password.forum.confirm_placeholder')}
              autocomplete="new-password"
              oninput={(e) => { this.passwordConfirmation(e.target.value); this.checkMatch(); m.redraw(); }}
            />
            <button
              type="button"
              className="rp-eye-btn"
              onclick={() => { this.showPassword2 = !this.showPassword2; m.redraw(); }}
            >
              {this.showPassword2 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          {/* Match hint */}
          {this.passwordConfirmation() && (
            <div className={classList('rp-match-hint', {
              'rp-match-ok':  this.passwordsMatch,
              'rp-match-bad': !this.passwordsMatch,
            })}>
              {this.passwordsMatch ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              )}
              <span>
                {this.passwordsMatch
                  ? app.translator.trans('miforums-reset-password.forum.passwords_match')
                  : app.translator.trans('miforums-reset-password.forum.passwords_no_match')}
              </span>
            </div>
          )}
        </div>

        {/* Submit button */}
        <Button
          className={classList('rp-btn', { 'rp-btn--success': this.success })}
          loading={this.loading}
          disabled={!this.isValid() || this.loading}
          onclick={() => this.onsubmit()}
        >
          {this.success
            ? app.translator.trans('miforums-reset-password.forum.saved')
            : app.translator.trans('miforums-reset-password.forum.save_button')}
        </Button>

        {/* Back link */}
        <div className="rp-back">
          <a href="#" onclick={(e) => { e.preventDefault(); app.modal.show(LogInModal); }}>
            ← {app.translator.trans('miforums-reset-password.forum.back_to_login')}
          </a>
        </div>
      </div>
    </div>
  );
});

// Patch oninit to add our state
extend(ResetPasswordPage.prototype, 'oninit', function() {
  this.password = Stream('');
  this.passwordConfirmation = Stream('');
  this.showPassword1 = false;
  this.showPassword2 = false;
  this.strengthScore = 0;
  this.strengthClass = 'weak';
  this.passwordsMatch = false;
  this.success = false;
  this.loading = false;
});

// Patch onsubmit
override(ResetPasswordPage.prototype, 'onsubmit', function(original) {
  if (!this.isValid()) return;
  this.loading = true;
  m.redraw();

  const token = m.route.param('token');

  app.request({
    method: 'POST',
    url: app.forum.attribute('apiUrl') + '/forgot',
    body: {
      data: {
        attributes: {
          token,
          password: this.password(),
        },
      },
    },
  }).then(() => {
    this.success = true;
    this.loading = false;
    m.redraw();
    setTimeout(() => app.modal.show(LogInModal), 2000);
  }).catch((e) => {
    this.loading = false;
    m.redraw();
    throw e;
  });
});

// Helper methods
extend(ResetPasswordPage.prototype, 'oninit', function() {
  this.checkStrength = function() {
    const p = this.password();
    let s = 0;
    if (p.length >= 8) s++;
    if (p.length >= 12) s++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
    if (/[0-9]/.test(p) || /[^A-Za-z0-9]/.test(p)) s++;
    this.strengthScore = s;
    this.strengthClass = s <= 1 ? 'weak' : s <= 2 ? 'medium' : 'strong';
  };

  this.checkMatch = function() {
    this.passwordsMatch = this.password() === this.passwordConfirmation() && this.password().length > 0;
  };

  this.isValid = function() {
    return this.password().length >= 8 && this.passwordsMatch && this.strengthScore >= 2;
  };
});
