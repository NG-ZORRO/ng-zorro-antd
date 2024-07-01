export function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = () => resolve();
    script.onerror = e => reject(e);
    document.head!.appendChild(script);
  });
}
