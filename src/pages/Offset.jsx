import React, { useEffect } from 'react';

function Offset() {
  useEffect(() => {
    const hubspotForm=document.getElementById("hubspotForm")
    const script = document.createElement('script');
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    hubspotForm.append(script);

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '43749994',
          formId: '0059cc69-f4f5-47c2-872f-e5b914381906'
        });
      }
    });
console.log(script)
    return () => {
        hubspotForm.removeChild(script);
    };
  }, []);

  return (
    
    <div id="hubspotForm" className='px-[10%] py-[5.2%]'>
    
    </div>
  );
}

export default Offset;
