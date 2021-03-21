import localForage from 'localforage';

export function initCache(name: string) {
  return localForage.createInstance({
    name
  });
}

export function escapeCharacters(str: string) {
  return str.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
}

export function cssInjector(css: string) {
  return `const style = document.createElement('style');
          style.innerText = '${css}';
          document.head.appendChild(style);`;
}

export function resolveFileType(path: string, data: string) {
  const css = escapeCharacters(data);
  return path.match(/.css$/) ? cssInjector(css) : data;
}

export function htmlDocument(lang?: string) {
  return `
    <html lang=${lang}>
        <head>
          <title>Code Preview</title>
        </head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener("message", ({ data })=>{
                    try {
                       eval(data);
                    } catch (e) {
                        const root = document.getElementById("root");
                        root.innerHTML = "<div style='color: red'><h4>Runtime Error:</h4>" + e + "</div>";
                        throw e;
                    }
                }, false)
            </script>
        </body>
    </html>
    `;
}
