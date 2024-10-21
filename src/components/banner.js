function getColor(type) {
  return (
    {
      error: {
        color: '#FFFFFF',
        background: '#F44336'
      },
      warning: { color: '#111111', background: '#FCCA46' },
      info: { color: '#111111', background: '#FFFFFF' }
    }[type] || getColor('info')
  );
}

export function createEditorBanner({ message, type }) {
  const { color, background } = getColor(type);
  const banner = document.createElement('div');
  banner.style.position = 'fixed';
  banner.style.top = '50%';
  banner.style.left = '50%';
  banner.style.transform = 'translate(-50%, -50%)';
  banner.style.zIndex = '9999';
  banner.style.padding = '10px 20px';
  banner.style.color = color;
  banner.style.backgroundColor = background;
  banner.style.borderRadius = '10px';
  banner.style.fontFamily = 'Arial, sans-serif';
  banner.style.fontSize = '18px';
  banner.style.lineHeight = '24px';
  banner.style.textAlign = 'center';
  banner.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
  banner.textContent = message;
  return banner;
}
