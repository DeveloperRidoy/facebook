import { useState } from 'react';
import DisplayAccessibility from './DisplayAccessibility';
import HelpSupport from './HelpSupport';
import MainOption from './MainOption';
import SettingsPrivacy from './SettingsPrivacy';


export const SETTINGS_PRIVACY = "SETTINGS_PRIVACY";
export const HELP_SUPPORT = "HELP_SUPPORT";
export const DISPLAY_ACCESSIBILITY = "DISPLAY_ACCESSIBILITY";

const AccountBox = () => {

  const [mode, setMode] = useState(null);

    return (
      <div className={mode ? 'overflow-hidden': ''}>
        <div
          className={`transition ${
            mode ? "w-[200%] flex transform -translate-x-1/2" : "w-full"
          }`}
        >
          <div className="w-full">
            {!mode && <MainOption setMode={setMode}/>}
          </div>
          {mode === SETTINGS_PRIVACY ? (
            <SettingsPrivacy setMode={setMode} />
          ) : mode === HELP_SUPPORT ? (
            <HelpSupport setMode={setMode} />
          ) : (
            mode === DISPLAY_ACCESSIBILITY && (
              <DisplayAccessibility setMode={setMode} />
            )
          )}
        </div>
      </div>
    );
}

export default AccountBox