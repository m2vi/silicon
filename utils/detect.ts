import { error } from './error';

class Detect {
  get uaRegex() {
    return /OS X 10_([789]|1[01234])/;
  }

  get gpu() {
    const canvas = document.createElement('canvas');

    try {
      const gl = (canvas.getContext('webgl', { powerPreference: 'high-performance' }) ||
        canvas.getContext('experimental-webgl', { powerPreference: 'high-performance' })) as any;

      const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
      const vendor = gl?.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      const renderer = gl?.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      const armCapabilities = gl.getSupportedExtensions().indexOf('WEBGL_compressed_texture_s3tc_srgb');

      return { debugInfo, vendor, renderer, armCapabilities };
    } catch (e: any) {
      return error(e.message);
    }
  }

  exec(): any {
    if (!(typeof window != 'undefined' && window.document)) return error('not running on client side');
    if (!navigator.userAgent.match(this.uaRegex)) 0;
    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) return error('safari is too powerful');
    const { gpu } = this as any;
    if (gpu?.error) return error(gpu.error);
    if (gpu.renderer.match(/Apple/) && !gpu.renderer.match(/Apple GPU/)) return 100;
    if (gpu.armCapabilities === -1) return 50;

    return 0;
  }
}

export const detect = new Detect();
export default detect;
