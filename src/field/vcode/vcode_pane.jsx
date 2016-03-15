import React from 'react';
import VcodeInput from './vcode_input';
import * as l from '../../lock/index';
import * as c from '../index';
import { isSmallScreen } from '../../utils/media_utils';
import { changeField } from '../actions';
import { validateNotEmptyString } from '../../utils/validation_utils';


// TODO: remove passwordless deps
import { back } from '../../passwordless/actions';

export default class VcodePane extends React.Component {

  handleVcodeChange(e) {
    e.preventDefault();
    changeField(l.id(this.props.lock), "vcode", e.target.value, validateNotEmptyString);
  }

  handleResendClick(e) {
    e.preventDefault();
    back(l.id(this.props.lock), {clearField: ["vcode"]});
  }

  render() {
    const { lock, placeholder, resendLabel } = this.props;

    return (
      <div>
        <VcodeInput value={c.vcode(lock)}
          isValid={!c.isFieldVisiblyInvalid(lock, "vcode") && !l.globalError(lock)}
          onChange={::this.handleVcodeChange}
          autoFocus={!isSmallScreen()}
          placeholder={placeholder}
          disabled={l.submitting(lock)}
        />
        <p className="auth0-lock-alternative">
          <a
            className="auth0-lock-alternative-link"
            href="#"
            onClick={::this.handleResendClick}
          >
            {resendLabel}
          </a>
        </p>
      </div>
    );
  }

}

VcodePane.propTypes = {
  lock: React.PropTypes.object.isRequired,
  placeholder: React.PropTypes.string.isRequired,
  resendLabel: React.PropTypes.string.isRequired
};
