import React, { useEffect, useState } from 'react';

import '../stylesheets/Footer.css';
import Button from './Button';
import ToggleSwitch from './ToggleSwitch';

function Footer() {
  const [prefersColorSchemeDark, setPrefersColorSchemeDark] = useState(localStorage.getItem('prefersColorSchemeDark') ? JSON.parse(localStorage.getItem('prefersColorSchemeDark')) : true);
  useEffect(() => {
    const storageItem = localStorage.getItem('prefersColorSchemeDark');
    if (!storageItem) {
      localStorage.setItem('prefersColorSchemeDark', prefersColorSchemeDark);
      return;
    }

    const storageItemValue = JSON.parse(storageItem);
    if (prefersColorSchemeDark !== storageItemValue) {
      if (prefersColorSchemeDark) {
        localStorage.setItem('prefersColorSchemeDark', 'true');
        document.body.classList.add('dark');
      } else {
        localStorage.setItem('prefersColorSchemeDark', 'false');
        document.body.classList.remove('dark');
      }
    }

    if (prefersColorSchemeDark && !document.body.classList.contains('dark')) {
      document.body.classList.add('dark');
    }
  }, [prefersColorSchemeDark]);

  const handleToggle = () => setPrefersColorSchemeDark(!prefersColorSchemeDark);

  const handleClick = () => window.open('https://github.com', '_blank');

  return (
    <div className="Footer">
      <ToggleSwitch
        states={['☀️', '🌙']}
        isToggled={!prefersColorSchemeDark}
        onToggle={handleToggle}
      />
      <Button
        icon="fa fa-github"
        title="View source code on GitHub"
        onClick={handleClick}
      />
    </div>
  );
}

export default Footer;
