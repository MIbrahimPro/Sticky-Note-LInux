import React, { useRef, useEffect } from 'react';

interface SandboxProps {
  code: string;
}

const Sandbox: React.FC<SandboxProps> = ({ code }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  margin: 0;
                  padding: 12px;
                  color: white;
                  font-family: system-ui, sans-serif;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              </style>
            </head>
            <body>
              ${code}
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [code]);

  return (
    <div className="w-full bg-white/5 border border-white/10 rounded-lg overflow-hidden my-2 resize-y min-h-[150px]">
      <iframe
        ref={iframeRef}
        className="w-full h-full border-none"
        title="Widget Sandbox"
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Sandbox;
